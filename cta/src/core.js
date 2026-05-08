function cleanUpTriggers() {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
}

function cleanUpPageListeners() {
  if (!Array.isArray(window.pageSpecificListeners)) {
    window.pageSpecificListeners = [];
    window.customCursor?.reset?.();
    return;
  }

  window.pageSpecificListeners.forEach((entry) => {
    if (!entry) return;

    if (typeof entry.cleanup === "function") {
      try {
        entry.cleanup();
      } catch (err) {
        console.warn("cleanUpPageListeners: errore in entry.cleanup()", err);
      }
      return;
    }

    const { element, event, handler, options } = entry;
    element?.removeEventListener?.(event, handler, options);
  });

  window.pageSpecificListeners = [];
  window.customCursor?.reset?.();
}

// Funzione principale per gestire le azioni specifiche della pagina

function handlePageSpecificActions() {
  const currentPageID = document.documentElement.getAttribute("data-wf-page");

  // Recupera i dati della pagina corrente dalla mappa
  const pageData = window.pageSpecificFunctionsMap[currentPageID];

  if (!pageData) {
    console.warn(
      `Nessuna mappatura trovata per data-wf-page: ${currentPageID}`
    );
    return;
  }

  // Pulizia della pagina precedente
  if (
    window.previousPageID &&
    window.pageSpecificFunctionsMap[window.previousPageID]
  ) {
    const prevPageData = window.pageSpecificFunctionsMap[window.previousPageID];
    const prevFunctionName = prevPageData.name; // Usa il nome della funzione dalla mappa
    if (window.pageFunctions[prevFunctionName]?.cleanup) {
      window.pageFunctions[prevFunctionName].cleanup();
    }
  }

  // Iniezione del JSON-LD, se disponibile
  const jsonData = window.jsonPageMap[pageData.jsonKey];
  if (jsonData?.active && jsonData.json) {
    document
      .querySelectorAll('script[type="application/ld+json"]')
      .forEach((el) => el.remove());

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = jsonData.json;
    document.head.appendChild(script);
  }

  // Caricamento risorse e esecuzione delle funzioni specifiche
  const currentFunction = window.pageFunctions[pageData.name];

  if (pageData.scripts || pageData.styles) {
    loadResources(pageData)
      .then(() => {
        currentFunction?.execute();
        window.previousPageID = currentPageID; // Aggiorna la pagina corrente
      })
      .catch((error) => {
        console.error(
          `Errore durante il caricamento delle risorse per: ${pageData.name}`,
          error
        );
      });
  } else {
    console.log(`Nessuna risorsa aggiuntiva per: ${pageData.name}`);
    console.log(`Eseguendo funzione specifica per: ${pageData.name}`);
    currentFunction?.execute();
    window.previousPageID = currentPageID; // Aggiorna la pagina corrente
  }
}

// Funzione per caricare script e stili specifici
function loadResources(pageData) {
  const scriptPromises = (pageData.scripts || []).map((src) => loadScript(src));
  const stylePromises = (pageData.styles || []).map((href) => loadCSS(href));

  return Promise.all([...scriptPromises, ...stylePromises]);
}

function loadScript(src) {
  return new Promise((resolve, reject) => {
    if (!document.querySelector(`script[src="${src}"]`)) {
      const script = document.createElement("script");
      script.src = src;
      script.defer = true;
      script.onload = () => resolve();
      script.onerror = (error) => {
        console.error(` Errore nel caricamento dello script: ${src}`);
        reject(error);
      };
      document.head.appendChild(script);
    } else {
      resolve();
    }
  });
}

// Funzione per caricare un file CSS dinamicamente
function loadCSS(href) {
  return new Promise((resolve, reject) => {
    if (!document.querySelector(`link[href="${href}"]`)) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = href;
      link.onload = () => {
        //console.log(`CSS caricato: ${href}`);
        resolve();
      };
      link.onerror = (error) => {
        console.error(`Errore nel caricamento del CSS: ${href}`);
        reject(error);
      };
      document.head.appendChild(link);
    } else {
      console.log(`CSS già presente: ${href}`);
      resolve();
    }
  });
}

function updatePageMetaAndInteractions(newPageHTML) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(newPageHTML, "text/html");

  // 1. Titolo
  const newTitle = doc.querySelector("title");
  if (newTitle) document.title = newTitle.textContent;

  // 2. data-wf-page
  const newDataWfPage = doc.documentElement.getAttribute("data-wf-page");
  if (newDataWfPage) {
    document.documentElement.setAttribute("data-wf-page", newDataWfPage);
  }

  // 3. Meta description
  updateOrCreateMetaFromDoc(doc, "name", "description");

  // 4. Meta standard social
  const socialMetaProps = [
    "og:title",
    "og:description",
    "og:image",
    "og:url",
    "og:locale",
    "twitter:title",
    "twitter:description",
    "twitter:image",
  ];
  socialMetaProps.forEach((prop) => {
    updateOrCreateMetaFromDoc(doc, "property", prop);
  });

  // 5. Meta extra SEO
  updateOrCreateMetaFromDoc(doc, "name", "image");
  updateOrCreateMetaFromDoc(doc, "itemprop", "image");
  updateOrCreateMetaFromDoc(doc, "name", "url");
  updateOrCreateMetaFromDoc(doc, "name", "robots");

  // 6. <link rel="image_src">
  updateOrCreateLinkFromDoc(doc, "image_src");

  // 7. <link rel="canonical">
  updateOrCreateLinkFromDoc(doc, "canonical");

  // 8. <meta property="og:locale:alternate"> (tutti, se presenti)
  const alternateLocales = doc.querySelectorAll(
    'meta[property="og:locale:alternate"]'
  );

  document
    .querySelectorAll('meta[property="og:locale:alternate"]')
    .forEach((el) => el.remove());
  alternateLocales.forEach((meta) => {
    const clone = meta.cloneNode(true);
    document.head.appendChild(clone);
  });

  // 9. Interazioni Webflow
  restartWebflowInteractions();
}

// Meta tag: aggiorna o crea
function updateOrCreateMetaFromDoc(doc, attrType, attrValue) {
  const newMeta = doc.querySelector(`meta[${attrType}="${attrValue}"]`);
  if (newMeta) {
    let existing = document.head.querySelector(
      `meta[${attrType}="${attrValue}"]`
    );
    if (!existing) {
      existing = document.createElement("meta");
      existing.setAttribute(attrType, attrValue);
      document.head.appendChild(existing);
    }
    existing.setAttribute("content", newMeta.getAttribute("content"));
  }
}

// Link tag: aggiorna o crea
function updateOrCreateLinkFromDoc(doc, relValue) {
  const newLink = doc.querySelector(`link[rel="${relValue}"]`);
  if (newLink) {
    let existing = document.head.querySelector(`link[rel="${relValue}"]`);
    if (!existing) {
      existing = document.createElement("link");
      existing.setAttribute("rel", relValue);
      document.head.appendChild(existing);
    }
    existing.setAttribute("href", newLink.getAttribute("href"));
  }
}

function updateCmsMetaTags(doc) {
  const cmsMetaProps = [
    "og:url",
    "fb:app_id",
    "article:author",
    "article:published_time",
  ];

  cmsMetaProps.forEach((prop) => {
    const newMeta = doc.querySelector(`meta[property="${prop}"]`);
    if (newMeta && newMeta.getAttribute("content")) {
      let existingMeta = document.head.querySelector(
        `meta[property="${prop}"]`
      );
      if (!existingMeta) {
        existingMeta = document.createElement("meta");
        existingMeta.setAttribute("property", prop);
        document.head.appendChild(existingMeta);
      }
      existingMeta.setAttribute("content", newMeta.getAttribute("content"));
    }
  });
}

function restartWebflowInteractions() {
  try {
    if (typeof Webflow !== "undefined") {
      Webflow.destroy();
      // Forza il riavvio asincrono
      setTimeout(() => {
        requestAnimationFrame(() => {
          Webflow.ready();
          if (Webflow.require) {
            Webflow.require("ix2").init();
          }
        });
      }, 100);
    } else {
      console.warn("Webflow non è definito.");
    }
  } catch (error) {
    console.error("Errore nel riavvio delle interazioni Webflow:", error);
  }
}

function trackPageView() {
  if (window.dataLayer) {
    window.dataLayer.push({
      event: "page_view",
      page_path: window.location.pathname,
      page_title: document.title,
    });
  } else {
    console.warn("Data Layer non è disponibile.");
  }
}

//Funzioni per lo Scroll

const body = document.querySelector("body");

function blockScroll() {
  if (!body) return;
  if (body.getAttribute("data-lock") === "true") return;
  body.setAttribute("data-lock", "true");
}

function unblockScroll() {
  if (!body) return;
  if (body.getAttribute("data-lock") !== "true") return;
  body.setAttribute("data-lock", "false");
}

window.scrollLock =
  window.scrollLock ||
  (function () {
    let scrollPosition = { top: 0, left: 0 };
    let isLocked = false;

    const getScrollContainers = () =>
      document.querySelectorAll("[data-scroll-container]");

    function savePosition() {
      scrollPosition.top =
        window.scrollY || document.documentElement.scrollTop || 0;
      scrollPosition.left =
        window.scrollX || document.documentElement.scrollLeft || 0;
    }

    function restorePosition() {
      window.scrollTo(scrollPosition.left, scrollPosition.top);
    }

    function applyNoScroll() {
      document.documentElement.classList.add("no-scroll");
      getScrollContainers().forEach((container) => {
        container.classList.add("scrollable");
      });
    }

    function removeNoScroll() {
      document.documentElement.classList.remove("no-scroll");
      getScrollContainers().forEach((container) => {
        container.classList.remove("scrollable");
      });
    }

    function stopLenis() {
      const lenis = window.lenisInstance;
      if (lenis && typeof lenis.stop === "function") {
        lenis.stop();
      }
    }

    function startLenis() {
      const lenis = window.lenisInstance;
      if (lenis && typeof lenis.start === "function") {
        lenis.start();
      }
    }

    /**
     * Blocca lo scroll.
     * @param {Object} options
     * @param {boolean} [options.savePosition=true] - salva o meno la posizione corrente
     */
    function block(options = {}) {
      const { savePosition: doSave = true } = options;

      if (isLocked) return;

      if (doSave) {
        savePosition();
      }

      applyNoScroll();
      stopLenis();
      isLocked = true;
    }

    /**
     * Sblocca lo scroll.
     * @param {Object} options
     * @param {boolean} [options.restorePosition=true] - ripristina o meno la posizione salvata
     */
    function unblock(options = {}) {
      const { restorePosition: doRestore = true } = options;

      if (!isLocked) return;

      if (doRestore) {
        restorePosition();
      }

      removeNoScroll();
      startLenis();
      isLocked = false;
    }

    return {
      // API principale
      block,
      unblock,

      // Utility se ti servono a mano
      save: savePosition,
      restore: restorePosition,
      getPosition() {
        return { ...scrollPosition };
      },
      setPosition(pos = {}) {
        if (typeof pos.top === "number") scrollPosition.top = pos.top;
        if (typeof pos.left === "number") scrollPosition.left = pos.left;
      },
      isLocked() {
        return isLocked;
      },
    };
  })();

window.lenisInstance = window.lenisInstance || {
  instance: null,
  isStopped: false,

  initialize() {
    if (this.instance) {
      this.instance.destroy();
      this.instance = null;
    }

    this.instance = new Lenis({
      restoreScrollPosition: false,
      duration: 2,
      orientation: "vertical",
      smoothWheel: true,
      smoothTouch: false,
      wheelMultiplier: 2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      infinite: false,
      prevent: (node) => node.id === "calendar",
    });

    this.instance.on("scroll", ScrollTrigger.update);

    this._lenisTick = (time) => {
      this.instance?.raf(time * 1000);
    };

    gsap.ticker.add(this._lenisTick);
    gsap.ticker.lagSmoothing(0);

    document.addEventListener(
      "wheel",
      (event) => {
        if (event.target.closest("[data-lenis-prevent]")) {
          event.stopPropagation();
        }
      },
      { passive: false }
    );

    document.addEventListener(
      "touchmove",
      (event) => {
        if (event.target.closest("[data-lenis-prevent]")) {
          event.stopPropagation();
        }
      },
      { passive: false }
    );

    setTimeout(() => {
      this.update();
    }, 300);
  },

  stop() {
    if (this.instance && !this.isStopped) {
      this.instance.stop();
      this.isStopped = true;
    }
  },

  start() {
    if (this.instance && this.isStopped) {
      this.instance.start();
      this.isStopped = false;
    }
  },

  update() {
    if (typeof ScrollTrigger !== "undefined") {
      ScrollTrigger.refresh(); // Forza un refresh completo
    }

    if (this.instance) {
      this.instance.raf(performance.now());
    }
  },

  scrollTo(target, options = {}) {
    if (this.instance) {
      this.instance.scrollTo(target, options);
    } else {
      window.scrollTo({
        top: target,
        left: 0,
        behavior: options.immediate ? "instant" : "smooth",
      });
    }
  },
  pauseForCalendar() {
    if (this.instance && !this.isPausedForCalendar) {
      this.instance.stop();
      this.isPausedForCalendar = true;
    }
  },

  resumeAfterCalendar() {
    if (this.instance && this.isPausedForCalendar) {
      this.instance.start();
      this.isPausedForCalendar = false;
    }
  },
  forceScrollToTop() {
    if (!this.instance) {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      return;
    }

    this.instance.scrollTo(0, {
      immediate: true,
      force: true,
      lock: true,
    });
  },
};

window.FirebaseAppManager = window.FirebaseAppManager || {
  configUrl:
    "https://us-central1-webflow-project---calltoaction.cloudfunctions.net/getFirebaseConfig",
  firebaseApp: null,
  auth: null,
  database: null,
  userStatus: { loggedIn: null, approved: null },

  init: async function () {
    try {
      await this.loadFirebaseScripts();

      if (typeof firebase === "undefined") {
        throw new Error("Firebase non è stato caricato correttamente!");
      }
      const response = await fetch(this.configUrl);
      let config = await response.json();
      config = this.cleanFirebaseConfig(config);

      if (!firebase.apps.length) {
        this.firebaseApp = firebase.initializeApp(config);
      } else {
        this.firebaseApp = firebase.app();
      }

      this.auth = firebase.auth();
      this.database = firebase.database();

      // ** Monitoraggio dello stato utente**
      firebase.auth().onAuthStateChanged(async (user) => {
        this.userStatus.loggedIn = !!user;
        this.updateLoginLinks();
        this.updateDashboardLinks();

        if (user) {
          const token = await user.getIdToken();
          const response = await fetch(
            "https://us-central1-webflow-project---calltoaction.cloudfunctions.net/getUserCmsPage",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({ uid: user.uid, token }),
            }
          );

          const data = await response.json();
          this.userStatus.approved = !!(data.success && data.approved);
        } else {
          this.userStatus.approved = false;
        }
      });
    } catch (error) {
      console.error("❌ Errore durante l'inizializzazione di Firebase:", error);
    }
  },

  cleanFirebaseConfig: function (config) {
    Object.keys(config).forEach((key) => {
      if (typeof config[key] === "string") {
        config[key] = config[key].replace(/[\r\n]/g, "").trim();
      }
    });
    return config;
  },

  loadFirebaseScripts: async function () {
    try {
      await loadScript(
        "https://www.gstatic.com/firebasejs/10.0.0/firebase-app-compat.js"
      );
      await loadScript(
        "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth-compat.js"
      );
      await loadScript(
        "https://www.gstatic.com/firebasejs/10.0.0/firebase-database-compat.js"
      );

      await new Promise((resolve) => {
        const checkFirebase = setInterval(() => {
          if (typeof firebase !== "undefined") {
            clearInterval(checkFirebase);
            resolve();
          }
        }, 100);
      });
    } catch (error) {
      console.error("Errore nel caricamento degli script Firebase:", error);
      throw error;
    }
  },

  updateLoginLinks: function () {
    firebase.auth().onAuthStateChanged((user) => {
      const logLinks = document.querySelectorAll("[log-link]");

      logLinks.forEach((link) => {
        if (user) {
          link.textContent = "Logout";
          link.href = "#";
          link.onclick = (event) => {
            event.preventDefault();
            FirebaseAppManager.logoutUser();
          };
        } else {
          link.textContent = "Login";
          link.href = "/log-in";
          link.onclick = null;
        }
      });
    });
  },

  updateDashboardLinks: async function () {
    try {
      const user = firebase.auth().currentUser;
      const dashboardLinks = document.querySelectorAll("[dashboard-link]");

      // Reset iniziale del link
      dashboardLinks.forEach((link) => (link.href = "/user-pending-approval"));

      if (!user) {
        return;
      }

      const token = await user.getIdToken();
      if (!token) {
        console.error("Token non generato, impossibile procedere.");
        return;
      }

      const response = await fetch(
        "https://us-central1-webflow-project---calltoaction.cloudfunctions.net/getUserCmsPage",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ uid: user.uid, token }),
        }
      );

      if (!response.ok) {
        throw new Error(
          `Errore HTTP: ${response.status} - ${await response.text()}`
        );
      }

      const data = await response.json();

      if (data?.cmsPage && data.approved) {
        const currentHostname = window.location.hostname;
        const baseDomain = currentHostname.includes("webflow.io")
          ? "https://ctastudio.webflow.io"
          : "https://www.ctastudio.it";

        const userDashboardLink = `${baseDomain}${data.cmsPage.toLowerCase()}`;

        // 🔗 Aggiorna i link con il nuovo percorso
        dashboardLinks.forEach((link) => (link.href = userDashboardLink));
      }
    } catch (error) {
      console.error("❌ Errore in updateDashboardLinks:", error);
    }
  },

  initLoginForm: function () {
    const loginForm = document.getElementById("login-form");

    if (!loginForm) {
      return;
    }

    loginForm.removeAttribute("action");
    loginForm.setAttribute("method", "POST");

    loginForm.addEventListener("submit", async function (event) {
      event.preventDefault();
      event.stopImmediatePropagation();

      const email = document.getElementById("loginEmail").value.trim();
      const password = document.getElementById("loginPassword").value.trim();
      const loginWrapper = document.getElementById("login-wrapper");
      const successMessage = document.querySelector(".w-form-done");
      const errorMessage = document.querySelector(".w-form-fail");
      const dashboardButton = document.querySelector("[dashboard-link]");
      const lottieWaiting = document.querySelector(".lottie-waiting");

      // Nascondiamo i messaggi all'inizio
      if (errorMessage) errorMessage.style.display = "none";
      if (successMessage) successMessage.style.display = "none";

      // Mostriamo il loader Lottie
      if (lottieWaiting) {
        lottieWaiting.style.visibility = "visible";
        lottieWaiting.style.opacity = "1";
      }

      if (!email || !password) {
        if (errorMessage) errorMessage.style.display = "block";
        if (lottieWaiting) {
          lottieWaiting.style.visibility = "hidden";
          lottieWaiting.style.opacity = "0";
        }
        return;
      }

      try {
        const userCredential = await firebase
          .auth()
          .signInWithEmailAndPassword(email, password);
        const user = userCredential.user;

        // Aggiorniamo i link e aspettiamo il completamento
        await FirebaseAppManager.updateDashboardLinks();

        // Mostriamo il messaggio di successo solo dopo aver aggiornato il link
        if (loginWrapper) loginWrapper.style.display = "none";
        if (successMessage) successMessage.style.display = "block";

        // Assicuriamo che il bottone diventi visibile
        if (dashboardButton) dashboardButton.style.display = "block";
      } catch (error) {
        console.error("❌ Errore di login:", error);
        if (errorMessage) errorMessage.style.display = "block";
      } finally {
        // Nascondiamo il loader Lottie alla fine della richiesta
        if (lottieWaiting) {
          lottieWaiting.style.visibility = "hidden";
          lottieWaiting.style.opacity = "0";
        }
      }
    });
  },

  logoutUser: function () {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log("👋 Logout effettuato con successo!");
        FirebaseAppManager.updateLoginLinks();
        window.location.reload();
      })
      .catch((error) => {
        console.error("Errore durante il logout:", error);
      });
  },
};

window.DashboardManager = window.DashboardManager || {
  initialized: false,

  async init() {
    try {
      // Aspetta FirebaseAppManager
      await this.waitForFirebase();

      // Controllo accesso utente prima di caricare la dashboard
      await this.checkUserAccess();

      // Se l'utente è approvato, aggiorniamo gli assessment
      await this.updateAssessmentStatusUI();
      this.updateLogoutButton();

      this.initAssessmentPanelHandlers();

      this.initialized = true;
      console.log("✅ CTA DashboardManager");
    } catch (error) {
      console.error(
        "❌ Errore durante l'inizializzazione della Dashboard:",
        error
      );
    }
  },

  async waitForFirebase() {
    return new Promise((resolve) => {
      const checkFirebase = setInterval(() => {
        if (
          window.FirebaseAppManager &&
          FirebaseAppManager.auth &&
          FirebaseAppManager.userStatus.loggedIn !== null &&
          FirebaseAppManager.userStatus.approved !== null
        ) {
          clearInterval(checkFirebase);
          resolve();
        }
      }, 100);
    });
  },

  async checkUserAccess() {
    const { loggedIn, approved } = FirebaseAppManager.userStatus;

    // Se i dati non sono ancora disponibili, attendiamo fino a 2 secondi
    let attempts = 0;
    while ((loggedIn === null || approved === null) && attempts < 20) {
      await new Promise((r) => setTimeout(r, 100));
      attempts++;
    }

    if (!loggedIn) {
      console.warn("🚫 Utente non autenticato, reindirizzamento a Login...");
      this.showAccessDenied(true);
      throw new Error("Utente non autenticato.");
    }

    if (!approved) {
      console.warn(" Utente non approvato, reindirizzamento...");
      this.showAccessDenied();
      throw new Error("Utente non approvato.");
    }

    this.showAccessApproved();
  },

  showAccessApproved() {
    const overlay = document.getElementById("protect-page-cover");
    const waitingWrap = document.getElementById("waiting-wrap");
    const waitingApproved = document.getElementById("waiting-wrap-approved");

    if (overlay && waitingWrap && waitingApproved) {
      gsap.set(waitingApproved, { display: "flex" });

      gsap
        .timeline()
        .to(waitingWrap, { y: "100%", duration: 0.8, ease: "power2.out" })
        .to(
          overlay,
          {
            opacity: 0,
            duration: 0.6,
            ease: "power2.out",
            onComplete: () => gsap.set(overlay, { display: "none" }),
          },
          "+=0.4"
        );
    }
  },

  showAccessDenied(isLogout = false) {
    const overlay = document.getElementById("protect-page-cover");
    const waitingWrap = document.getElementById("waiting-wrap");
    const waitingDenied = document.getElementById("waiting-wrap-denied");

    if (overlay && waitingWrap && waitingDenied) {
      gsap.set(waitingDenied, { display: "flex" });

      gsap.to(waitingWrap, {
        y: "100%",
        duration: 0.8,
        ease: "power2.out",
        onComplete: () => {
          const redirectURL = isLogout ? "/log-in" : "/user-pending-approval";
          setTimeout(() => {
            window.location.href = redirectURL;
          }, 1000);
        },
      });
    }
  },
  async updateAssessmentStatusUI() {
    try {
      const user = firebase.auth().currentUser;
      if (!user) return;

      const userId = user.uid;

      const db = firebase
        .database()
        .ref(`/userRegistrations/${userId}/assessments`);

      db.once("value", (snapshot) => {
        const assessmentsData = snapshot.val();

        // 🔹 Lista degli assessment con ID corretti
        const assessments = [
          { id: "1-Assessment-Branding-Valori", divId: "assessment-1" },
          { id: "2-Assessment-Personalita", divId: "assessment-2" },
          { id: "3-Assessment-Target-Brand", divId: "assessment-3" },
          { id: "4-Assessment-Visual-Identity", divId: "assessment-4" },
          { id: "5-Assessment-User-Persona", divId: "assessment-5" },
        ];

        assessments.forEach(({ id, divId }) => {
          const assessmentDiv = document.getElementById(divId);

          // 🔹 Se il div non esiste, ignoriamo e passiamo al prossimo
          if (!assessmentDiv) return;

          if (assessmentsData && assessmentsData[id]?.completed) {
            //  Se l'assessment è completato → Mostriamo la cover con animazione
            gsap.set(assessmentDiv, { display: "flex" });
            gsap.to(assessmentDiv, { opacity: 1, duration: 0.5 });
            assessmentDiv.classList.add("completed");
            assessmentDiv.style.pointerEvents = "auto";
          } else {
            // Se l'assessment NON è completato → Nascondiamo la cover
            gsap.to(assessmentDiv, {
              opacity: 0,
              duration: 0.3,
              onComplete: () => gsap.set(assessmentDiv, { display: "none" }),
            });
            assessmentDiv.classList.remove("completed");
            assessmentDiv.style.pointerEvents = "auto";
          }
        });
      });
    } catch (error) {
      console.error(
        " Errore nell'aggiornamento della UI degli assessment:",
        error
      );
    }
  },
  updateLogoutButton: function () {
    const logoutButton = document.getElementById("logout-button");

    if (!logoutButton) {
      return;
    }

    logoutButton.onclick = async () => {
      try {
        await firebase.auth().signOut();
        console.log("👋 Logout effettuato con successo!");
        window.location.reload(); // Ricarichiamo la pagina per aggiornare lo stato
      } catch (error) {
        console.error("❌ Errore durante il logout:", error);
      }
    };
  },
  initAssessmentResetButtons: function () {
    const totalAssessments = 5; // Numero totale degli assessment

    for (let i = 1; i <= totalAssessments; i++) {
      const resetButton = document.getElementById(`reset-assessment-${i}`);
      const assessmentId = `${i}-Assessment-${this.getAssessmentName(i)}`;

      if (resetButton) {
        // 🔹 Definisci il nuovo handler
        const handler = async () => {
          resetButton.disabled = true;
          await this.resetSingleAssessment(assessmentId);
          resetButton.disabled = false;
        };

        // 🔹 Aggiungi l'event listener
        resetButton.addEventListener("click", handler);

        // 🔹 Aggiungi il listener all'array globale
        window.pageSpecificListeners.push({
          element: resetButton,
          event: "click",
          handler: handler,
        });
      }
    }
  },

  getAssessmentName: function (index) {
    const assessmentNames = [
      "Branding-Valori",
      "Personalita",
      "Target-Brand",
      "Visual-Identity",
      "User-Persona",
    ];
    return assessmentNames[index - 1] || "Unknown";
  },
  async resetSingleAssessment(assessmentId) {
    try {
      const user = firebase.auth().currentUser;
      if (!user) {
        console.error("❌ Utente non autenticato.");
        return;
      }

      const userId = user.uid;

      // 🔹 Effettua la richiesta al backend
      const response = await fetch(
        `https://us-central1-webflow-project---calltoaction.cloudfunctions.net/resetSingleAssessmentStatus`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            clientpageId: userId,
            assessment: assessmentId,
          }),
        }
      );

      const result = await response.json();

      if (response.ok && result.success) {
        console.log(`✅ Assessment ${assessmentId} resettato con successo.`);
        // Aggiorna la UI per riflettere il reset
        this.updateSingleAssessmentUI(assessmentId, false);
        const panel = document.querySelector(
          `#assessment-${assessmentId.split("-")[0]} .reset-assessment-panel`
        );
        if (panel) {
          this.closeResetPanel(panel);
        }
      } else {
        console.error(`❌ Errore nel reset dell'assessment:`, result.error);
      }
    } catch (error) {
      console.error("❌ Errore nella richiesta di reset:", error);
    }
  },
  updateSingleAssessmentUI: function (assessmentId, completed) {
    const divId = `assessment-${assessmentId.split("-")[0]}`; // Estrarre il numero dall'ID
    const assessmentDiv = document.getElementById(divId);

    if (!assessmentDiv) return;

    if (completed) {
      // 🔹 Mostra il completamento
      gsap.set(assessmentDiv, { display: "flex" });
      gsap.to(assessmentDiv, { opacity: 1, duration: 0.5 });
      assessmentDiv.classList.add("completed");
      assessmentDiv.style.pointerEvents = "auto";
    } else {
      // 🔹 Resetta la visualizzazione
      gsap.to(assessmentDiv, {
        opacity: 0,
        duration: 0.3,
        onComplete: () => gsap.set(assessmentDiv, { display: "none" }),
      });
      assessmentDiv.classList.remove("completed");
      assessmentDiv.style.pointerEvents = "auto";
    }
  },
  initAssessmentPanelHandlers: function () {
    const assessmentContainers = document.querySelectorAll(
      ".link-assessment-dashboard-cover"
    );

    if (!assessmentContainers.length) {
      console.warn("🚫 Nessun elemento degli assessment trovato.");
      return;
    }

    assessmentContainers.forEach((container) => {
      const assessmentId = container.id;
      const openButton = container.querySelector(".link-menu-assessment");
      const panel = container.querySelector(".reset-assessment-panel");
      const cancelButton = panel.querySelector(".cancel-reset-button");

      if (!openButton || !panel) {
        console.error(`Problema con la selezione per ${assessmentId}`);
        return;
      }

      // 🔹 Listener per aprire il pannello
      const openHandler = () => {
        gsap.to(panel, { scale: 1, duration: 0.3, ease: "power2.out" });

        // Inizializza i pulsanti di reset quando il pannello è aperto
        this.initAssessmentResetButtons();
      };

      openButton.addEventListener("click", openHandler);

      // 🔹 Aggiungi il listener all'array globale per Barba
      window.pageSpecificListeners.push({
        element: openButton,
        event: "click",
        handler: openHandler,
      });

      // 🔹 Listener per chiudere il pannello con il bottone "Annulla"
      if (cancelButton) {
        const closeHandler = () => {
          this.closeResetPanel(panel);
        };

        cancelButton.addEventListener("click", closeHandler);

        // 🔹 Aggiungi il listener all'array globale per Barba
        window.pageSpecificListeners.push({
          element: cancelButton,
          event: "click",
          handler: closeHandler,
        });
      } else {
        console.warn(`⚠️ Nessun pulsante di annullamento trovato`);
      }
    });
  },

  // 🔹 Funzione per chiudere il pannello di reset
  closeResetPanel: function (panel) {
    gsap.to(panel, { scale: 0, duration: 0.3, ease: "power2.in" });
  },
};

window.AssessmentManager = window.AssessmentManager || {
  initialized: false,

  async init() {
    try {
      //  Aspetta che Firebase sia pronto
      await this.waitForFirebase();

      //  Controllo accesso utente prima di caricare la pagina assessment
      await this.checkUserAccess();

      //  Aggiorna il pulsante "Torna alla Dashboard" con il link dinamico
      await this.updateDashboardLinks();

      this.initialized = true;
      console.log("✅ CTA AssessmentManager inizializzato con successo.");
    } catch (error) {
      console.error(
        "❌ Errore durante l'inizializzazione di AssessmentManager:",
        error
      );
    }
  },

  async waitForFirebase() {
    return new Promise((resolve) => {
      const checkFirebase = setInterval(() => {
        if (
          window.FirebaseAppManager &&
          FirebaseAppManager.auth &&
          FirebaseAppManager.userStatus.loggedIn !== null &&
          FirebaseAppManager.userStatus.approved !== null
        ) {
          clearInterval(checkFirebase);
          resolve();
        }
      }, 100);
    });
  },

  async checkUserAccess() {
    const { loggedIn, approved } = FirebaseAppManager.userStatus;

    // Se i dati non sono ancora disponibili, attendiamo fino a 2 secondi
    let attempts = 0;
    while ((loggedIn === null || approved === null) && attempts < 20) {
      await new Promise((r) => setTimeout(r, 100));
      attempts++;
    }

    if (!loggedIn) {
      console.warn("🚫 Utente non autenticato, reindirizzamento a Login...");
      this.showAccessDenied(true);
      throw new Error("Utente non autenticato.");
    }

    if (!approved) {
      console.warn(" Utente non approvato, reindirizzamento...");
      this.showAccessDenied();
      throw new Error("Utente non approvato.");
    }

    this.showAccessApproved();
  },

  showAccessApproved() {
    const overlay = document.getElementById("protect-page-cover");
    const waitingWrap = document.getElementById("waiting-wrap");
    const waitingApproved = document.getElementById("waiting-wrap-approved");

    if (overlay && waitingWrap && waitingApproved) {
      gsap.set(waitingApproved, { display: "flex" });

      gsap
        .timeline()
        .to(waitingWrap, { y: "100%", duration: 0.8, ease: "power2.out" })
        .to(
          overlay,
          {
            opacity: 0,
            duration: 0.6,
            ease: "power2.out",
            onComplete: () => gsap.set(overlay, { display: "none" }),
          },
          "+=0.4"
        );
    }
  },

  showAccessDenied(isLogout = false) {
    console.log("🚫 Accesso negato, redirect...");
    const overlay = document.getElementById("protect-page-cover");
    const waitingWrap = document.getElementById("waiting-wrap");
    const waitingDenied = document.getElementById("waiting-wrap-denied");

    if (overlay && waitingWrap && waitingDenied) {
      gsap.set(waitingDenied, { display: "flex" });

      gsap.to(waitingWrap, {
        y: "100%",
        duration: 0.8,
        ease: "power2.out",
        onComplete: () => {
          const redirectURL = isLogout ? "/log-in" : "/user-pending-approval";
          setTimeout(() => {
            window.location.href = redirectURL;
          }, 1000);
        },
      });
    }
  },

  async updateDashboardLinks() {
    try {
      const user = firebase.auth().currentUser;
      const dashboardLinks = document.querySelectorAll("[dashboard-link]");

      // ** Reset iniziale (pagina di attesa predefinita)**
      dashboardLinks.forEach((link) => (link.href = "/user-pending-approval"));

      if (!user) {
        console.warn("⚠️ Nessun utente autenticato trovato.");
        return;
      }

      const token = await user.getIdToken();
      if (!token) {
        console.error("❌ Token non generato, impossibile aggiornare i link.");
        return;
      }

      const response = await fetch(
        "https://us-central1-webflow-project---calltoaction.cloudfunctions.net/getUserCmsPage",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ uid: user.uid, token }),
        }
      );

      if (!response.ok) {
        throw new Error(
          `❌ Errore HTTP: ${response.status} - ${await response.text()}`
        );
      }

      const data = await response.json();

      if (data?.cmsPage && data.approved) {
        const currentHostname = window.location.hostname;
        const baseDomain = currentHostname.includes("webflow.io")
          ? "https://ctastudio.webflow.io"
          : "https://www.ctastudio.it";

        const userDashboardLink = `${baseDomain}${data.cmsPage.toLowerCase()}`;

        // ** Aggiorna tutti i link alla Dashboard**
        dashboardLinks.forEach((link) => (link.href = userDashboardLink));
      }
    } catch (error) {
      console.error("❌ Errore in updateDashboardLinks:", error);
    }
  },
};


Object.assign(window, {
  cleanUpTriggers,
  cleanUpPageListeners,
  handlePageSpecificActions,
  loadResources,
  loadScript,
  loadCSS,
  updatePageMetaAndInteractions,
  updateOrCreateMetaFromDoc,
  updateOrCreateLinkFromDoc,
  updateCmsMetaTags,
  restartWebflowInteractions,
  trackPageView,
  blockScroll,
  unblockScroll,
});
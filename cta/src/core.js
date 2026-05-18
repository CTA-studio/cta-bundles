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
      `Nessuna mappatura trovata per data-wf-page: ${currentPageID}`,
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
      .querySelectorAll(
        'script[type="application/ld+json"]:not([data-schema-global])',
      )
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
          error,
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
    'meta[property="og:locale:alternate"]',
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
  // 10. Invia page_view virtuale a GTM / GA4 dopo transizione Barba
   trackPageView();
}

// Meta tag: aggiorna o crea
function updateOrCreateMetaFromDoc(doc, attrType, attrValue) {
  const newMeta = doc.querySelector(`meta[${attrType}="${attrValue}"]`);
  if (newMeta) {
    let existing = document.head.querySelector(
      `meta[${attrType}="${attrValue}"]`,
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
        `meta[property="${prop}"]`,
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
    if (typeof window.Webflow === "undefined") return;

    window.Webflow.destroy?.();

    setTimeout(() => {
      requestAnimationFrame(() => {
        window.Webflow.ready?.();
      });
    }, 100);
  } catch (error) {
    console.error("Errore nel riavvio delle interazioni Webflow:", error);
  }
}

function trackPageView() {
  if (!window.dataLayer) {
    console.warn("Data Layer non è disponibile.");
    return;
  }

  window.dataLayer.push({
    event: "virtual_page_view",
    page_path: window.location.pathname,
    page_location: window.location.href,
    page_title: document.title,
  });
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
      { passive: false },
    );

    document.addEventListener(
      "touchmove",
      (event) => {
        if (event.target.closest("[data-lenis-prevent]")) {
          event.stopPropagation();
        }
      },
      { passive: false },
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

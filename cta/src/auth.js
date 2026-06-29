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

      // fallback immediati
      this.updateLoginLinks(null);
      await this.updateDashboardLinks(null);

      firebase.auth().onAuthStateChanged(async (user) => {
        this.userStatus.loggedIn = !!user;
        this.userStatus.approved = user ? null : false;

        this.updateLoginLinks(user);
        await this.updateDashboardLinks(user);

        if (user) {
          try {
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
              },
            );

            const data = await response.json();
            this.userStatus.approved = !!(data.success && data.approved);
          } catch (error) {
            console.error("❌ Errore nel controllo approved:", error);
            this.userStatus.approved = false;
          }
        }
      });
    } catch (error) {
      console.error("❌ Errore durante l'inizializzazione di Firebase:", error);

      // fallback anche in caso di errore
      this.updateLoginLinks(null);
      await this.updateDashboardLinks(null);
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
        "https://www.gstatic.com/firebasejs/10.0.0/firebase-app-compat.js",
      );
      await loadScript(
        "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth-compat.js",
      );
      await loadScript(
        "https://www.gstatic.com/firebasejs/10.0.0/firebase-database-compat.js",
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

  updateLoginLinks: function (user) {
    const logLinks = document.querySelectorAll("[log-link]");

    logLinks.forEach((link) => {
      if (user) {
        link.textContent = "Logout";
        link.href = "#";
        link.onclick = (event) => {
          event.preventDefault();
          window.FirebaseAppManager.logoutUser();
        };
      } else {
        link.textContent = "Login";
        link.href = "/log-in";
        link.onclick = null;
      }
    });
  },

  updateDashboardLinks: async function (userArg = null) {
    try {
      const user = userArg || firebase.auth().currentUser;
      const dashboardLinks = document.querySelectorAll("[dashboard-link]");

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
        },
      );

      if (!response.ok) {
        throw new Error(
          `Errore HTTP: ${response.status} - ${await response.text()}`,
        );
      }

      const data = await response.json();

      if (data?.cmsPage && data.approved) {
        const currentHostname = window.location.hostname;
        const baseDomain = currentHostname.includes("webflow.io")
          ? "https://ctastudio-v3.webflow.io"
          : "https://www.ctastudio.it";

        const userDashboardLink = `${baseDomain}${data.cmsPage.toLowerCase()}`;
        dashboardLinks.forEach((link) => (link.href = userDashboardLink));
      }
    } catch (error) {
      console.error("❌ Errore in updateDashboardLinks:", error);
    }
  },

  initLoginForm: function () {
    const loginForm = document.getElementById("login-form");
    if (!loginForm) return;
    if (loginForm.dataset.firebaseLoginBound === "1") return;

    loginForm.dataset.firebaseLoginBound = "1";
    loginForm.removeAttribute("action");
    loginForm.setAttribute("method", "POST");

    const submitHandler = async function (event) {
      event.preventDefault();
      event.stopImmediatePropagation();

      if (window.isFormSubmitting) return;
      window.isFormSubmitting = true;

      const email = document.getElementById("loginEmail")?.value?.trim() || "";
      const password =
        document.getElementById("loginPassword")?.value?.trim() || "";

      const loginWrapper = document.getElementById("login-wrapper");
      const successMessage = document.querySelector(".w-form-done");
      const errorMessage = document.querySelector(".w-form-fail");
      const dashboardButton = document.querySelector("[dashboard-link]");

      if (errorMessage) errorMessage.style.display = "none";
      if (successMessage) successMessage.style.display = "none";

      if (!email || !password) {
        if (errorMessage) errorMessage.style.display = "block";
        window.isFormSubmitting = false;
        return;
      }

      window.FormSubmitOverlay?.show?.();
      window.FormSubmitLock?.lock?.();

      try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
        await window.FirebaseAppManager.updateDashboardLinks();

        if (loginWrapper) loginWrapper.style.display = "none";
        if (successMessage) successMessage.style.display = "block";
        if (dashboardButton) dashboardButton.style.display = "block";
      } catch (error) {
        console.error("❌ Errore di login:", error);
        if (errorMessage) errorMessage.style.display = "block";
      } finally {
        window.FormSubmitLock?.unlock?.();
        window.FormSubmitOverlay?.hide?.();
        window.isFormSubmitting = false;
      }
    };

    loginForm.addEventListener("submit", submitHandler);

    if (!Array.isArray(window.pageSpecificListeners)) {
      window.pageSpecificListeners = [];
    }

    window.pageSpecificListeners.push({
      element: loginForm,
      event: "submit",
      handler: submitHandler,
    });
  },

  logoutUser: function () {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log("👋 Logout effettuato con successo!");
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
      await this.waitForFirebase();
      await this.checkUserAccess();

      await this.waitForAssessmentElements();
      await this.updateAssessmentStatusUI();

      this.updateLogoutButton();
      this.initAssessmentPanelHandlers();
      this.initAssessmentResetButtons();

      this.initialized = true;
    } catch (error) {
      console.error(
        "Errore durante l'inizializzazione della Dashboard:",
        error,
      );

      const isAccessError =
        error?.message === "Utente non autenticato." ||
        error?.message === "Utente non approvato.";

      if (!isAccessError) {
        window.FormSubmitOverlay?.showDashboardTechError?.();
      }
    }
  },

  async waitForFirebase(maxWait = 10000) {
    const start = Date.now();

    while (Date.now() - start < maxWait) {
      const manager = window.FirebaseAppManager;
      const authReady = !!manager?.auth;
      const statusReady =
        manager?.userStatus?.loggedIn !== null &&
        manager?.userStatus?.approved !== null;

      if (authReady && statusReady) {
        return true;
      }

      await new Promise((resolve) => setTimeout(resolve, 150));
    }

    throw new Error("Timeout attesa FirebaseAppManager");
  },

  async checkUserAccess() {
    let attempts = 0;

    while (
      (FirebaseAppManager.userStatus.loggedIn === null ||
        FirebaseAppManager.userStatus.approved === null) &&
      attempts < 20
    ) {
      await new Promise((r) => setTimeout(r, 100));
      attempts++;
    }

    const { loggedIn, approved } = FirebaseAppManager.userStatus;

    if (!loggedIn) {
      console.warn("🚫 Utente non autenticato, reindirizzamento a Login...");
      this.showAccessDenied(true);
      throw new Error("Utente non autenticato.");
    }

    if (!approved) {
      console.warn("🚫 Utente non approvato, reindirizzamento...");
      this.showAccessDenied(false);
      throw new Error("Utente non approvato.");
    }

    this.showAccessApproved();
  },

  showAccessApproved() {
    window.FormSubmitOverlay?.showDashboardSuccess?.();

    setTimeout(() => {
      window.FormSubmitOverlay?.hide?.();
    }, 2500);
  },

  showAccessDenied(isLogout = false) {
    window.FormSubmitOverlay?.showDashboardError?.();

    const redirectURL = isLogout ? "/log-in" : "/user-pending-approval";

    setTimeout(() => {
      window.location.href = redirectURL;
    }, 1800);
  },

  async waitForAssessmentElements(maxWait = 3000) {
    const start = Date.now();

    while (Date.now() - start < maxWait) {
      const found = document.querySelectorAll(
        ".link-assessment-dashboard-cover",
      );
      if (found.length) return true;
      await new Promise((resolve) => setTimeout(resolve, 100));
    }

    console.warn("Pannelli assessment non trovati entro il timeout.");
    return false;
  },

  applyLocalAssessmentState: function () {
    try {
      const localUpdates = JSON.parse(
        sessionStorage.getItem("cta_assessment_updates") || "{}",
      );

      const assessments = [
        { id: "1-Assessment-Branding-Valori", divId: "assessment-1" },
        { id: "2-Assessment-Personalita", divId: "assessment-2" },
        { id: "3-Assessment-Target-Brand", divId: "assessment-3" },
        { id: "4-Assessment-Visual-Identity", divId: "assessment-4" },
        { id: "5-Assessment-User-Persona", divId: "assessment-5" },
      ];

      assessments.forEach(({ id, divId }) => {
        if (!localUpdates[id]) return;

        const assessmentDiv = document.getElementById(divId);
        if (!assessmentDiv) return;

        gsap.set(assessmentDiv, {
          display: "flex",
          pointerEvents: "auto",
        });
        assessmentDiv.classList.add("completed");
      });
    } catch (error) {
      console.error("Errore applyLocalAssessmentState:", error);
    }
  },

  async updateAssessmentStatusUI() {
    try {
      const user = firebase.auth().currentUser;
      if (!user) return;

      const userId = user.uid;
      const dbRef = firebase
        .database()
        .ref(`/userRegistrations/${userId}/assessments`);
      const snapshot = await dbRef.once("value");
      const assessmentsData = snapshot.val();

      const assessments = [
        { id: "1-Assessment-Branding-Valori", divId: "assessment-1" },
        { id: "2-Assessment-Personalita", divId: "assessment-2" },
        { id: "3-Assessment-Target-Brand", divId: "assessment-3" },
        { id: "4-Assessment-Visual-Identity", divId: "assessment-4" },
        { id: "5-Assessment-User-Persona", divId: "assessment-5" },
      ];

      const completedMap = {};

      assessments.forEach(({ id, divId }) => {
        const assessmentDiv = document.getElementById(divId);
        if (!assessmentDiv) return;

        const isCompleted = !!(
          assessmentsData && assessmentsData[id]?.completed
        );

        if (isCompleted) {
          gsap.set(assessmentDiv, {
            display: "flex",
            pointerEvents: "auto",
          });
          gsap.to(assessmentDiv, { opacity: 1, duration: 0.35 });
          assessmentDiv.classList.add("completed");

          completedMap[id] = true;
        } else {
          gsap.set(assessmentDiv, {
            display: "none",
            opacity: 0,
            pointerEvents: "none",
          });
          assessmentDiv.classList.remove("completed");
        }
      });

      sessionStorage.setItem(
        "cta_assessment_updates",
        JSON.stringify(completedMap),
      );
    } catch (error) {
      console.error(
        "Errore nell'aggiornamento della UI degli assessment:",
        error,
      );
    }
  },

  updateLogoutButton: function () {
    const logoutButton = document.getElementById("logout-button");
    if (!logoutButton) return;

    const handler = async (e) => {
      e.preventDefault();

      try {
        await firebase.auth().signOut();
        console.log("👋 Logout effettuato con successo!");
        this.showAccessDenied(true);
      } catch (error) {
        console.error("❌ Errore durante il logout:", error);
      }
    };

    logoutButton.addEventListener("click", handler);

    window.pageSpecificListeners.push({
      element: logoutButton,
      event: "click",
      handler,
    });
  },

  showResetLoadingState: function (panel) {
    if (!panel || !window.gsap) return null;

    const loadingPanel = panel.querySelector(".reset-loading-panel");
    const dots = panel.querySelectorAll(".reset-dot");

    if (!loadingPanel) return null;

    gsap.set(loadingPanel, {
      visibility: "visible",
      opacity: 1,
      pointerEvents: "auto",
    });

    gsap.set(dots, { opacity: 0.25 });

    const dotsTween = gsap.to(dots, {
      opacity: 1,
      duration: 0.45,
      stagger: 0.15,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });

    return { dotsTween, loadingPanel };
  },

  async resetSingleAssessment(assessmentId) {
    try {
      const user = firebase.auth().currentUser;
      if (!user) {
        console.error("❌ Utente non autenticato.");
        return false;
      }

      const userId = user.uid;

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
        },
      );

      const result = await response.json();

      if (response.ok && result.success) {
        console.log(`Assessment ${assessmentId} resettato con successo.`);
        this.updateSingleAssessmentUI(assessmentId, false);

        const panel = document.querySelector(
          `#assessment-${assessmentId.split("-")[0]} .reset-assessment-panel`,
        );

        if (panel) {
          this.closeResetPanel(panel);
        }

        const current = JSON.parse(
          sessionStorage.getItem("cta_assessment_updates") || "{}",
        );

        delete current[assessmentId];

        sessionStorage.setItem(
          "cta_assessment_updates",
          JSON.stringify(current),
        );

        return true;
      } else {
        console.error(`Errore nel reset dell'assessment:`, result.error);
        return false;
      }
    } catch (error) {
      console.error("Errore nella richiesta di reset:", error);
      return false;
    }
  },

  initAssessmentResetButtons: function () {
    const totalAssessments = 5;

    for (let i = 1; i <= totalAssessments; i++) {
      const resetButton = document.getElementById(`reset-assessment-${i}`);
      const assessmentId = `${i}-Assessment-${this.getAssessmentName(i)}`;

      if (!resetButton) continue;
      if (resetButton.dataset.resetBound === "1") continue;

      resetButton.dataset.resetBound = "1";

      const handler = async (e) => {
        e.preventDefault();

        const panel = resetButton.closest(".reset-assessment-panel");
        let loadingState = null;
        let success = false;

        try {
          loadingState = this.showResetLoadingState(panel);
          success = await this.resetSingleAssessment(assessmentId);
        } catch (error) {
          console.error("Errore reset assessment:", error);
          success = false;
        } finally {
          if (loadingState?.dotsTween) {
            loadingState.dotsTween.kill();
          }
        }

        if (!success) {
          this.resetResetPanelState(panel);
        } else {
          setTimeout(() => {
            this.resetResetPanelState(panel);
          }, 400);
        }
      };

      resetButton.addEventListener("click", handler);

      window.pageSpecificListeners.push({
        element: resetButton,
        event: "click",
        handler,
      });
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
        return false;
      }

      const userId = user.uid;

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
        },
      );

      const result = await response.json();

      if (response.ok && result.success) {
        console.log(`✅ Assessment ${assessmentId} resettato con successo.`);
        this.updateSingleAssessmentUI(assessmentId, false);

        const panel = document.querySelector(
          `#assessment-${assessmentId.split("-")[0]} .reset-assessment-panel`,
        );

        if (panel) {
          this.closeResetPanel(panel);
        }

        const current = JSON.parse(
          sessionStorage.getItem("cta_assessment_updates") || "{}",
        );

        delete current[assessmentId];

        sessionStorage.setItem(
          "cta_assessment_updates",
          JSON.stringify(current),
        );

        console.log(
          "🧩 Dashboard sessionStorage AFTER RESET:",
          sessionStorage.getItem("cta_assessment_updates"),
        );

        return true;
      } else {
        console.error(`❌ Errore nel reset dell'assessment:`, result.error);
        return false;
      }
    } catch (error) {
      console.error("❌ Errore nella richiesta di reset:", error);
      return false;
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
      ".link-assessment-dashboard-cover",
    );

    if (!assessmentContainers.length) {
      console.warn("🚫 Nessun elemento degli assessment trovato.");
      return;
    }

    assessmentContainers.forEach((container) => {
      const assessmentId = container.id;
      const openButton = container.querySelector(".link-menu-assessment");
      const panel = container.querySelector(".reset-assessment-panel");
      const cancelButton = panel?.querySelector(".cancel-reset-button");

      if (!openButton || !panel) {
        console.error(`Problema con la selezione per ${assessmentId}`);
        return;
      }

      if (openButton.dataset.panelBound !== "1") {
        openButton.dataset.panelBound = "1";

        const openHandler = (e) => {
          e.preventDefault();

          gsap.set(panel, {
            "--clip-start": "100%",
            "--clip-end": "0%",
            pointerEvents: "auto",
          });

          gsap.to(panel, {
            "--clip-start": "0%",
            duration: 0.45,
            ease: "power2.out",
          });
        };

        openButton.addEventListener("click", openHandler);

        window.pageSpecificListeners.push({
          element: openButton,
          event: "click",
          handler: openHandler,
        });
      }

      if (cancelButton && cancelButton.dataset.panelBound !== "1") {
        cancelButton.dataset.panelBound = "1";

        const closeHandler = () => {
          this.closeResetPanel(panel);
        };

        cancelButton.addEventListener("click", closeHandler);

        window.pageSpecificListeners.push({
          element: cancelButton,
          event: "click",
          handler: closeHandler,
        });
      }
    });
  },

  // Funzione per chiudere il pannello di reset
  closeResetPanel: function (panel) {
    if (!panel) return;

    gsap.to(panel, {
      "--clip-end": "100%",
      duration: 0.35,
      ease: "power2.in",
      onComplete: () => {
        gsap.set(panel, {
          "--clip-start": "100%",
          "--clip-end": "0%",
          pointerEvents: "none",
        });
      },
    });
  },
};

window.AssessmentManager = window.AssessmentManager || {
  initialized: false,

  async init() {
    try {
      await this.waitForFirebase();
      await this.checkUserAccess();
      await this.updateDashboardLinks();

      this.initialized = true;
      console.log("✅ CTA AssessmentManager inizializzato con successo.");
    } catch (error) {
      console.error(
        "❌ Errore durante l'inizializzazione di AssessmentManager:",
        error,
      );
    }
  },

  async waitForFirebase(maxWait = 10000) {
    const start = Date.now();

    while (Date.now() - start < maxWait) {
      if (
        window.FirebaseAppManager &&
        FirebaseAppManager.auth &&
        FirebaseAppManager.userStatus.loggedIn !== null &&
        FirebaseAppManager.userStatus.approved !== null
      ) {
        return true;
      }

      await new Promise((resolve) => setTimeout(resolve, 150));
    }

    throw new Error("Timeout attesa FirebaseAppManager");
  },

  async checkUserAccess() {
    let attempts = 0;

    while (
      (FirebaseAppManager.userStatus.loggedIn === null ||
        FirebaseAppManager.userStatus.approved === null) &&
      attempts < 20
    ) {
      await new Promise((r) => setTimeout(r, 100));
      attempts++;
    }

    const { loggedIn, approved } = FirebaseAppManager.userStatus;

    if (!loggedIn) {
      window.location.href = "/log-in";
      throw new Error("Utente non autenticato.");
    }

    if (!approved) {
      window.location.href = "/user-pending-approval";
      throw new Error("Utente non approvato.");
    }
  },

  async updateDashboardLinks() {
    try {
      const user = firebase.auth().currentUser;
      const dashboardLinks = document.querySelectorAll("[dashboard-link]");

      dashboardLinks.forEach((link) => (link.href = "/user-pending-approval"));

      if (!user) return;

      const token = await user.getIdToken();
      if (!token) return;

      const response = await fetch(
        "https://us-central1-webflow-project---calltoaction.cloudfunctions.net/getUserCmsPage",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ uid: user.uid, token }),
        },
      );

      if (!response.ok) {
        throw new Error(
          `❌ Errore HTTP: ${response.status} - ${await response.text()}`,
        );
      }

      const data = await response.json();

      if (data?.cmsPage && data.approved) {
        const currentHostname = window.location.hostname;
        const baseDomain = currentHostname.includes("webflow.io")
          ? "https://ctastudio-v3.webflow.io"
          : "https://www.ctastudio.it";

        const userDashboardLink = `${baseDomain}${data.cmsPage.toLowerCase()}`;
        dashboardLinks.forEach((link) => (link.href = userDashboardLink));
      }
    } catch (error) {
      console.error("❌ Errore in updateDashboardLinks:", error);
    }
  },
};

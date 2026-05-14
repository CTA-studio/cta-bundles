"use strict";

// Configurazione di base
const cookieConfig = {
  mode: "opt-in",
  cookieMaxAge: 180,
  debugMode: false,
  consentMode: true,
  categories: {
    essential: true,
    analytics: false,
    marketing: false,
    personalization: false,
    uncategorized: false,
  },
};

// Inizializza Google Consent Mode V2 con le impostazioni predefinite
window.dataLayer = window.dataLayer || [];
function gtag() {
  window.dataLayer.push(arguments);
}
window.gtag = gtag;

gtag("consent", "default", {
  ad_storage: "denied",
  analytics_storage: "denied",
  functionality_storage: "denied",
  ad_personalization: "denied",
  ad_user_data: "denied",
  security_storage: "denied",
  personalization_storage: "denied",
  wait_for_update: 500,
});

// Modulo cookie
window.cookieManager = window.cookieManager || {
  setCookie: (name, value, days) => {
    let expires = "";
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + days * 86400000);
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = `${name}=${
      value || ""
    }${expires}; path=/; SameSite=None; Secure`;
  },
  getCookie: (name) => {
    const nameEQ = `${name}=`;
    return (
      document.cookie
        .split("; ")
        .find((c) => c.indexOf(nameEQ) === 0)
        ?.substring(nameEQ.length) || null
    );
  },
  eraseCookie: (name) => {
    document.cookie = `${name}=; Max-Age=-99999999; path=/; SameSite=None; Secure`;
  },
  clearAllCookies: () => {
    document.cookie.split("; ").forEach((cookie) => {
      const name = cookie.split("=")[0];
      document.cookie = `${name}=; Max-Age=-99999999; path=/; SameSite=None; Secure`;
    });
  },
  clearTrackingCookies: () => {
    const trackingCookies = ["_ga", "_gid", "_gat", "_gac_", "_gtm", "_gcl_au"];
    const domain = window.location.hostname.split(".").slice(-2).join(".");
    trackingCookies.forEach((name) => {
      document.cookie = `${name}=; Max-Age=0; path=/; domain=${domain}; SameSite=None; Secure`;
      document.cookie = `${name}=; Max-Age=0; path=/; SameSite=None; Secure`;
    });
  },
};

function getSavedConsent() {
  try {
    return JSON.parse(window.cookieManager.getCookie("cta")) || {};
  } catch {
    return {};
  }
}

function applyConsentMode(consents = {}) {
  if (!cookieConfig.consentMode || !window.gtag) return;

  gtag("consent", "update", {
    ad_storage: consents.marketing ? "granted" : "denied",
    analytics_storage: consents.analytics ? "granted" : "denied",
    functionality_storage: consents.personalization ? "granted" : "denied",
    ad_personalization: consents.marketing ? "granted" : "denied",
    ad_user_data: consents.marketing ? "granted" : "denied",
    security_storage: consents.essential !== false ? "granted" : "denied",
    personalization_storage: consents.personalization ? "granted" : "denied",
  });
}

window.resetCookies = () => {
  window.cookieManager.clearAllCookies();
  window.cookieManager.clearTrackingCookies();
  closeCookiePreferences();
  setTimeout(() => location.reload(), 100);
};

// UI Manager
window.uiManager = window.uiManager || {
  showBanner: () => animateBanner(),
  hideBanner: () => animateBannerClose(),
  closeBannerWithoutConsent: () => animateBannerClose(),
  handlePreferences: () => {
    cookiePreferences();
    const saved = getSavedConsent();
    window.toggleCheckboxAnimation?.(
      "#cookie-marketing",
      "marketing",
      "marketing",
      "marketing",
      saved.marketing,
      true,
    );
    window.toggleCheckboxAnimation?.(
      "#cookie-analytics",
      "analytics",
      "analytics",
      "analytics",
      saved.analytics,
      true,
    );
    window.toggleCheckboxAnimation?.(
      "#cookie-personalization",
      "personalization",
      "personalization",
      "personalization",
      saved.personalization,
      true,
    );
  },
};

// Init post-load

// Consent Manager
const consentManager = {
  allowAll: () => {
    const allTrue = {
      essential: true,
      analytics: true,
      marketing: true,
      personalization: true,
    };
    applyConsentMode(allTrue);
    window.cookieManager.setCookie(
      "cta",
      JSON.stringify(allTrue),
      cookieConfig.cookieMaxAge,
    );
    gtmManager.fireGTMEvent("allCookiesAccepted");
    activateScripts();
    window.uiManager.hideBanner();
    closeCookiePreferences();
  },
  denyAll: () => {
    const defaults = {
      essential: true,
      analytics: false,
      marketing: false,
      personalization: false,
    };
    applyConsentMode(defaults);
    window.cookieManager.setCookie(
      "cta",
      JSON.stringify(defaults),
      cookieConfig.cookieMaxAge,
    );
    window.cookieManager.clearTrackingCookies();
    gtmManager.fireGTMEvent("allCookiesDenied");
    window.uiManager.hideBanner();
    closeCookiePreferences();
  },
  handleFormSubmit: (e) => {
    e.preventDefault();
    const c = (id) => document.querySelector(id)?.checked || false;
    const consents = {
      essential: true,
      analytics: c("#cookie-analytics"),
      marketing: c("#cookie-marketing"),
      personalization: c("#cookie-personalization"),
    };
    window.cookieManager.setCookie(
      "cta",
      JSON.stringify(consents),
      cookieConfig.cookieMaxAge,
    );
    applyConsentMode(consents);

    if (consents.analytics || consents.marketing) {
      activateScripts();
    }

    closeCookiePreferences();
  },
};

const gtmManager = {
  fireGTMEvent: (event) => {
    window.dataLayer.push({ event });
    if (cookieConfig.debugMode) console.log(`Evento GTM ${event} inviato.`);
  },
  updateConsentMode: (c) => {
    applyConsentMode(c);
  },
};

window.__cookieManagerStarted = false;

window.startCookieManager = function () {
  if (window.__cookieManagerStarted) return;
  window.__cookieManagerStarted = true;

  const safeIdle =
    window.safeRequestIdleCallback ||
    function (cb) {
      setTimeout(cb, 50);
    };

  const resetButton = document.querySelector("[cta='reset']");
  if (resetButton && resetButton.dataset.cookieResetBound !== "1") {
    resetButton.dataset.cookieResetBound = "1";
    resetButton.addEventListener("click", window.resetCookies);
  }

  ["[cta='allow']", "[cta='deny']"].forEach((sel) => {
    document.querySelectorAll(sel).forEach((button) => {
      if (button.dataset.cookieActionBound === "1") return;
      button.dataset.cookieActionBound = "1";

      button.addEventListener(
        "click",
        sel.includes("allow")
          ? consentManager.allowAll
          : consentManager.denyAll,
      );
    });
  });

  document.querySelectorAll("[cta='open-preferences']").forEach((button) => {
    if (button.dataset.cookiePrefsBound === "1") return;
    button.dataset.cookiePrefsBound = "1";

    button.addEventListener("click", () => {
      window.uiManager.closeBannerWithoutConsent();
      window.uiManager.handlePreferences();
    });
  });

  const preferencesForm = document.querySelector(
    "#wf-form-Cookie-Preferences-form",
  );

  if (preferencesForm && preferencesForm.dataset.cookieFormBound !== "1") {
    preferencesForm.dataset.cookieFormBound = "1";
    preferencesForm.addEventListener("submit", consentManager.handleFormSubmit);
  }

  const preferencesClose = document.querySelector("#preferences-close");

  if (preferencesClose && preferencesClose.dataset.cookieCloseBound !== "1") {
    preferencesClose.dataset.cookieCloseBound = "1";
    preferencesClose.addEventListener("click", closeCookiePreferences);
  }

  const submitBtn = document.querySelector("[cta='submit']");

  if (submitBtn && submitBtn.dataset.cookieSubmitBound !== "1") {
    submitBtn.dataset.cookieSubmitBound = "1";
    submitBtn.addEventListener("click", (e) => {
      e.preventDefault();
      consentManager.handleFormSubmit(e);
    });
  }

  const bannerClose = document.querySelector("#banner-close");

  if (bannerClose && bannerClose.dataset.cookieBannerCloseBound !== "1") {
    bannerClose.dataset.cookieBannerCloseBound = "1";
    bannerClose.addEventListener(
      "click",
      window.uiManager.closeBannerWithoutConsent,
    );
  }

  const raw = window.cookieManager.getCookie("cta");

  if (!raw) {
    safeIdle(() => {
      window.uiManager.showBanner();
    });
    return;
  }

  safeIdle(() => {
    try {
      const saved = getSavedConsent();

      applyConsentMode(saved);

      if (saved.analytics || saved.marketing) {
        activateScripts();
      }
    } catch (err) {
      console.warn("Errore lettura consenso cookie:", err);
    }
  });
};

function activateScripts() {
  document.querySelectorAll('script[cta="activate"]').forEach((script) => {
    if (script.dataset.activated === "1") return;
    script.dataset.activated = "1";

    script.removeAttribute("type");

    if (script.src) {
      const s = document.createElement("script");
      s.async = true;
      s.src = script.src;
      document.head.appendChild(s);
    } else {
      eval(script.innerText);
    }
  });
}

window.toggleCheckboxAnimation = function (
  id,
  attr,
  toggleAttr,
  category,
  checked,
  skipAnim = false,
) {
  if (!window.gsap) return;

  const { gsap } = window;

  const box = document.querySelector(id);
  const container = document.querySelector(`[cta-checkbox='${attr}']`);
  const toggle = container?.querySelector(`[cta-toggle='${toggleAttr}']`);

  if (!box || !container || !toggle) return;

  box.checked = checked;

  if (skipAnim) {
    gsap.set(toggle, {
      x: checked ? 20 : 0,
      backgroundColor: checked ? "#f9f9f7" : "",
    });

    gsap.set(container, {
      backgroundColor: checked ? "#ff006e" : "",
    });
  } else {
    gsap.to(toggle, {
      x: checked ? 20 : 0,
      backgroundColor: checked ? "#f9f9f7" : "",
      duration: 0.3,
      ease: "power2.inOut",
    });

    gsap.to(container, {
      backgroundColor: checked ? "#ff006e" : "",
      duration: 0.3,
      ease: "power2.inOut",
    });
  }

  if (box.dataset.listenerAttached === "1") return;

  box.addEventListener("click", () => {
    const state = box.checked;

    gsap.to(toggle, {
      x: state ? 20 : 0,
      backgroundColor: state ? "#f9f9f7" : "",
      duration: 0.3,
      ease: "power2.inOut",
    });

    gsap.to(container, {
      backgroundColor: state ? "#ff006e" : "",
      duration: 0.3,
      ease: "power2.inOut",
    });

    const current = getSavedConsent();
    current[category] = state;

    window.cookieManager.setCookie(
      "cta",
      JSON.stringify(current),
      cookieConfig.cookieMaxAge,
    );

    applyConsentMode(current);
  });

  box.dataset.listenerAttached = "1";
};

function animateBanner() {
  if (!window.gsap) return;
  const { gsap } = window;
  const container = document.getElementById("cta-cookie-wrap");
  const banner = document.getElementById("banner-cookie");
  if (!banner || !container) return;
  container.classList.add("is-active");
  gsap.to(banner, { y: 0, duration: 0.6, ease: "power2.inOut" });
}

function animateBannerClose() {
  if (!window.gsap) return;
  const { gsap } = window;
  const container = document.getElementById("cta-cookie-wrap");
  const banner = document.getElementById("banner-cookie");
  if (!banner || !container) return;

  gsap.to(banner, {
    yPercent: 110,
    duration: 0.5,
    ease: "power2.inOut",
    onComplete: () => container.classList.remove("is-active"),
  });
}

function cookiePreferences() {
  if (!window.gsap) return;
  const { gsap } = window;
  const preferences = document.querySelector("#cookie-preferences");
  if (preferences) {
    preferences.style.display = "flex";
    gsap.to(preferences, { opacity: 1, duration: 0.5, ease: "power2.inOut" });
  }
}

function closeCookiePreferences() {
  if (!window.gsap) return;
  const { gsap } = window;
  const preferences = document.querySelector("#cookie-preferences");
  if (preferences) {
    gsap.to(preferences, {
      opacity: 0,
      duration: 0.5,
      ease: "power2.inOut",
      onComplete: () => (preferences.style.display = "none"),
    });
  }
}

Object.assign(window, {
  animateBanner,
  animateBannerClose,
  cookiePreferences,
  closeCookiePreferences,
  activateScripts,
  startCookieManager,
});

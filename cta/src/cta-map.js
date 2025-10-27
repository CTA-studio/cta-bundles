  // Assicuriamoci che le variabili globali esistano
if (typeof window.previousPageID === "undefined") {
    window.previousPageID = null;
}

if (!window.pageSpecificListeners) {
    window.pageSpecificListeners = [];
}

if (!window.pageSpecificFunctionsMap) {
    window.pageSpecificFunctionsMap = {};
}

if (!window.jsonPageMap) {
    window.jsonPageMap = {};
}

if (!window.pageFunctions) {
    window.pageFunctions = {};
}

// Creiamo un oggetto unico per la gestione di tutte le funzioni e mappe
const CTAMap = {
    previousPageID: window.previousPageID,
    pageSpecificListeners: window.pageSpecificListeners,
    pageSpecificFunctionsMap: window.pageSpecificFunctionsMap,
    jsonPageMap: window.jsonPageMap,
    pageFunctions: window.pageFunctions,
    safeRequestIdleCallback: window.safeRequestIdleCallback,
};

// Manteniamo la compatibilità con `window`
window.CTAMap = CTAMap;

// Esportiamo per poterlo importare nel bundle
export default CTAMap;


  // Unico oggetto per fare riferimento a JSON e Funzioni
  window.pageSpecificFunctionsMap = {
    "665f0ffe1215c488346c8ab3": {
      name: "home", // Nome descrittivo della pagina
      jsonKey: "665f0ffe1215c488346c8ab3", // Riferimento al JSON
      scripts: [],
      styles: [],
    },
    "66744f8d053fecc97b97583d": {
      name: "branding",
      jsonKey: "66744f8d053fecc97b97583d",
      scripts: [],
      styles: [],
    },
    "66867d874ba89152319da959": {
      name: "webDesign",
      jsonKey: "66867d874ba89152319da959",
      scripts: [
        "https://cdn.jsdelivr.net/npm/swiper@11.0.0/swiper-bundle.min.js",
      ],
      styles: [],
    },
    "668f9954462592963808160a": {
      name: "marketing",
      jsonKey: "668f9954462592963808160a",
      scripts: [],
      styles: [],
    },
    "668d2fd112a8bfdeeafaf3ab": {
      name: "womenEmpowerment",
      jsonKey: "66915e3b438ce5a4581f2015",
      scripts: [],
      styles: [],
    },
    "669a76c86192d8683021fdef": {
      name: "contatti",
      jsonKey: "669a76c86192d8683021fdef",
      scripts: ["https://cdn.jsdelivr.net/npm/fullcalendar@5.10.1/main.min.js"],
      styles: ["https://cdn.jsdelivr.net/npm/fullcalendar@5.10.1/main.min.css"],
    },
    "66915e3b438ce5a4581f2015": {
      name: "about",
      jsonKey: "66915e3b438ce5a4581f2015",
      scripts: [],
      styles: [],
    },
    "669e49419a3d3f013cf0d7f6": {
      name: "portfolio",
      jsonKey: "",
      scripts: [],
      styles: [],
    },
    "66d584f1d3fbec73d80a4bb7": {
      name: "Proposito",
      jsonKey: "66d584f1d3fbec73d80a4bb7",
      scripts: [
        "https://cdn.jsdelivr.net/npm/swiper@11.0.0/swiper-bundle.min.js",
      ],
      styles: [],
    },
    "669fc7cde0b5ab984579b364": {
      name: "privacy",
      jsonKey: "",
      scripts: [],
      styles: [],
    },
    "66a390d69447021f1a7db484": {
      name: "essential",
      jsonKey: "",
      scripts: ["https://cdn.jsdelivr.net/npm/fullcalendar@5.10.1/main.min.js"],
      styles: ["https://cdn.jsdelivr.net/npm/fullcalendar@5.10.1/main.min.css"],
    },
    "66a39b4bfe2e62a6a4973146": {
      name: "professional",
      jsonKey: "",
      scripts: ["https://cdn.jsdelivr.net/npm/fullcalendar@5.10.1/main.min.js"],
      styles: ["https://cdn.jsdelivr.net/npm/fullcalendar@5.10.1/main.min.css"],
    },
    "66a39c1dd1d0b5d470d77eac": {
      name: "custom",
      jsonKey: "",
      scripts: ["https://cdn.jsdelivr.net/npm/fullcalendar@5.10.1/main.min.js"],
      styles: ["https://cdn.jsdelivr.net/npm/fullcalendar@5.10.1/main.min.css"],
    },
    "67efed3d2ac67086280f4cdb": {
      name: "valutazione",
      jsonKey: "",
      scripts: [],
      styles: [],
    },
    "66dade8f8f33db9a444e4160": {
      name: "blogPost",
      jsonKey: "",
      scripts: [
        "https://cdn.jsdelivr.net/npm/swiper@11.0.0/swiper-bundle.min.js",
      ],
      styles: [],
    },
    "66dac73a5d98bf188436e598": {
      name: "blogCategory",
      jsonKey: "",
      scripts: [
        "https://cdn.jsdelivr.net/npm/swiper@11.0.0/swiper-bundle.min.js",
      ],
      styles: [],
    },
    "66db1c6723125d80453701fa": {
      name: "blogTag",
      jsonKey: "",
      scripts: [
        "https://cdn.jsdelivr.net/npm/swiper@11.0.0/swiper-bundle.min.js",
      ],
      styles: [],
    },
    "669fb3e0600cede93cc38166": {
      name: "quattroZeroQuattro",
      jsonKey: "",
      scripts: [],
      styles: [],
    },
    "66f3d3297e30e8efc28593a6": {
      name: "loginPage",
      jsonKey: "",
      scripts: [],
      styles: [],
    },
    "66f3d3297e30e8efc2859421": {
      name: "registrazione",
      jsonKey: "",
      scripts: [],
      styles: [],
    },
    "66f3d3297e30e8efc285944b": {
      name: "resetPassword",
      jsonKey: "",
      scripts: [],
      styles: [],
    },
    "66f3d3297e30e8efc2859461": {
      name: "updatePassword",
      jsonKey: "",
      scripts: [],
      styles: [],
    },
    "67af596455154a4f0335f5e0": {
      name: "verify",
      jsonKey: "",
      scripts: [],
      styles: [],
    },
    "67af7c07d4dd5a54a5116da1": {
      name: "userPendingApproval",
      jsonKey: "",
      scripts: [],
      styles: [],
    },
    "66f3c6fe1fbe616545b964bd": {
      name: "dashboard",
      jsonKey: "",
      scripts: [],
      styles: [],
    },
    "66f3c74d69405c8d610cb8ed": {
      name: "assessment",
      jsonKey: "",
      scripts: [],
      styles: [],
    },
    "67c1d32756c59e9d2516b8bb": {
      name: "landing",
      jsonKey: "",
      scripts: ["https://cdn.jsdelivr.net/npm/swiper@11.0.0/swiper-bundle.min.js"],
      styles: [],
    },
    "67c7f9c8a98df18e2f28db62": {
      name: "gazzetta",
      jsonKey: "",
      scripts: [],
      styles: [],
    },
    "67cc5b0b3748d7a57404ad00": {
      name: "soltufo",
      jsonKey: "",
      scripts: [],
      styles: [],
    },
    "67d6fad0a3893fbe1ba0b5ef": {
      name: "catheclisma",
      jsonKey: "",
      scripts: ["https://cdn.jsdelivr.net/npm/swiper@11.0.0/swiper-bundle.min.js"],
      styles: [],
    },
    "67cec17bd767578bfa128b0f": {
      name: "falletta",
      jsonKey: "",
      scripts: ["https://cdn.jsdelivr.net/npm/swiper@11.0.0/swiper-bundle.min.js"],
      styles: [],
    },
    "67d7f564b0d1e409254555c9": {
      name: "amotea",
      jsonKey: "",
      scripts: ["https://cdn.jsdelivr.net/npm/swiper@11.0.0/swiper-bundle.min.js"],
      styles: [],
    },
    "67d7f850e11eca0af3bd939b": {
      name: "lavoce",
      jsonKey: "",
      scripts: ["https://cdn.jsdelivr.net/npm/swiper@11.0.0/swiper-bundle.min.js"],
      styles: [],
    },
    "67db09fa49d1825ccef118aa": {
      name: "converse",
      jsonKey: "",
      scripts: [],
      styles: [],
    },
    "67f0f11dbe1df2493a54daef": {
      name: "mati",
      jsonKey: "",
      scripts: [],
      styles: [],
    },
    "67e28c0b752118d3d4f58118": {
      name: "contattaci",
      jsonKey: "",
      scripts: ["https://cdn.jsdelivr.net/npm/fullcalendar@5.10.1/main.min.js"],
      styles: ["https://cdn.jsdelivr.net/npm/fullcalendar@5.10.1/main.min.css"],
    },
  };
  window.jsonPageMap = {
    "665f0ffe1215c488346c8ab3": {
      active: true,
      json: `{
        "@context": "https://schema.org",
        "@type": "WebPage",
        "url": "https://www.ctastudio.it",
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
               "@type": "ListItem",
              "position": 1,
              "name": "CTA Studio | Branding e Web Design per Umane Emozioni",
              "item": "https://www.ctastudio.it/"
            }
          ]
        }
      }`,
    },
    "66744f8d053fecc97b97583d": {
      active: true,
      json: `{
        "@context": "https://schema.org",
        "@type": "WebPage",
        "url": "https://www.ctastudio.it/branding-e-graphic-design",
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "CTA Studio | Branding e Web Design per Umane Emozioni",
              "item": "https://www.ctastudio.it"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "CTA Studio | Branding, Visual e Logo Design Emozionale",
              "item": "https://www.ctastudio.it/branding-e-graphic-design"
            }
          ]
        }
      }`,
    },
    "66867d874ba89152319da959": {
      active: true,
      json: `{
        "@context": "https://schema.org",
        "@type": "WebPage",
        "url": "https://www.ctastudio.it/ui-ux-design",
        "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "CTA Studio | Branding e Web Design per Umane Emozioni",
            "item": "https://www.ctastudio.it"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "CTA Studio | Web Design, UI/UX e Sviluppo Siti Web",
            "item": "https://www.ctastudio.it/ui-ux-design"
          }
        ]
      }
      }`,
    },
    "668f9954462592963808160a": {
      active: true,
      json: `{
        "@context": "https://schema.org",
        "@type": "WebPage",
        "url": "https://www.ctastudio.it/web-marketing",
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "CTA Studio | Branding e Web Design per Umane Emozioni",
              "item": "https://www.ctastudio.it"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "CTA Studio | Web Booster & SEO AI Ready",
              "item": "https://www.ctastudio.it/web-marketing"
            }
          ]
        }
      }`,
    },
    "669a76c86192d8683021fdef": {
      active: true,
      json: `{
        "@context": "https://schema.org",
        "@type": "WebPage",
        "url": "https://www.ctastudio.it/contatti",
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "CTA Studio | Branding e Web Design per Umane Emozioni",
              "item": "https://www.ctastudio.it"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "CTA Studio | Contatti - Parlaci del tuo Progetto",
              "item": "https://www.ctastudio.it/contatti"
            }
          ]
        }
      }`,
    },
    "66915e3b438ce5a4581f2015": {
      active: true,
      json: `{
        "@context": "https://schema.org",
        "@type": "WebPage",
         "url": "https://www.ctastudio.it/about",
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "CTA Studio | Branding e Web Design per Umane Emozioni",
              "item": "https://www.ctastudio.it"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "CTA Studio | Chi siamo e la nostra visione",
              "item": "https://www.ctastudio.it/about"
            }
          ]
        }
      }`,
    },
    "66d584f1d3fbec73d80a4bb7": {
      active: true,
      json: `{
        "@context": "https://schema.org",
        "@type": "WebPage",
         "url": "https://www.ctastudio.it/proposito/home",
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "CTA Studio | Branding e Web Design per Umane Emozioni",
              "item": "https://www.ctastudio.it"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "PROPOSITO - Il Web Magazine per ispirare, crescere e realizzare",
              "item": "https://www.ctastudio.it/proposito/home"
            }
          ]
        }
      }`,
    },
  };
  
  // Funzioni specifiche per ciascuna pagina
  window.pageFunctions = {
    home: {
      execute: function () {
        if (!window.isBarbaTransition) {
          transitionOnLoadHero();
        } else {
          transitionOnLoadHeroDefault();
        }
        window.menuNavigation.animateUSPLinks();
  
        if (window.matchMedia("(min-width: 992px)").matches) {          
          window.safeRequestIdleCallback(() => {
            ctaStickyTransition.reset();
            window.menuNavigation.handleLinkMenuHover();
            scrollProgressLine();           
          });
        } else {
          window.safeRequestIdleCallback(() => {
            showcasePanelsScrollMobile();
            showcaseTextContentMobile();
          });
        }
  
        // 🔹 PRIORITÀ MEDIA - idle
        window.safeRequestIdleCallback(() => {
          if (shouldEnableCustomCursor()) {
            initCustomCursor();
          } else {
            document.body.classList.add("no-cursor"); 
          }
          createScrollTriggerScrollWrapper();
          createScrollTriggerHero();
          setupShowcaseButtons();
          setupVerticalShowcaseButtons();
          setupVerticalContatti();
          genericPageTitleAnimations();
          ctaAnimations();
          globalCtaButton();
          serviceWrapper();
        });
        // 🔹 PRIORITÀ BASSA - differita dopo load + verifica swiper
        setTimeout(async () => {
          await loadScript(
            "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"
          ).catch((err) => console.error("❌ Errore caricamento Swiper:", err));
  
          try {
            setupScrollColorChange();
            info();            
            propositoAnimation.btnReadAnimation?.();
            propositoAnimation.btnCategoryAnimation?.();
            propositoAnimation.initializeSwiper?.();  
            propositoHomePage?.();
            studioAnimations?.();
          } catch (err) {
            console.error("❌ Errore esecuzione funzioni differite:", err);
          }
        }, 2500);
      },
  
      cleanup: function () {
        cleanUpTriggers();
        cleanUpPageListeners();
      },
    },
    branding: {
      execute: function () {
        if (!window.isBarbaTransition) {
          defaultEnterTransition();
        }
        animationPageEnterDesign();
        pageServiceScrollTriggerDesign();
        if (shouldEnableCustomCursor()) {
          initCustomCursor();
        } else {
          document.body.classList.add("no-cursor"); 
        }
        window.safeRequestIdleCallback(() => {
          setupScrollColorChange();
          logoAnima();
          toggleFaq();
          servicePageWrapper();
          ctaAnimations();
          globalCtaButton();
          info();
        });
      },
      cleanup: function () {
        cleanUpTriggers();
        cleanUpPageListeners();
      },
    },
    webDesign: {
      execute: function () {
        if (!window.isBarbaTransition) {
          defaultEnterTransition();
        }
        animationPageEnterWebDesign();
        pageServiceScrollTriggerWeb();
        if (window.matchMedia("(min-width: 992px)").matches) {
          window.safeRequestIdleCallback(() => {
            ctaStickyLastWork.reset();           
          });
        }  
        if (shouldEnableCustomCursor()) {
          initCustomCursor();
        } else {
          document.body.classList.add("no-cursor"); 
        }  
        window.safeRequestIdleCallback(() => {
          setupScrollColorChange();
          setupPageShowcaseButtons();
          videoPause();
          swiperUI();
          logoAnima();
          toggleFaq();
          servicePageWrapper();
          ctaAnimations();
          globalCtaButton();
          info();
        });
      },
      cleanup: function () {
        cleanUpTriggers();
        cleanUpPageListeners();
      },
    },
    marketing: {
      execute: function () {
        if (!window.isBarbaTransition) {
          defaultEnterTransition();
        }
        animationPageEnterMarketing();
        pageServiceScrollTriggerSeo();
        if (shouldEnableCustomCursor()) {
          initCustomCursor();
        } else {
          document.body.classList.add("no-cursor"); 
        }
        window.safeRequestIdleCallback(() => {
          setupScrollColorChange();
          changePrice();
          toggleServiceSection();
          toggleButtonAnimation();
          toggleFaq();
          secondSection(false);         
          globalCtaButton();
          info();
        });
      },
      cleanup: function () {
        cleanUpTriggers();
        cleanUpPageListeners();
      },
    },
    womenEmpowerment: {
      execute: function () {
        if (!window.isBarbaTransition) {
          defaultEnterTransition();
        }
        animationPageEnterWomen();
        videoPause();
        pageServiceScrollTriggerWomen();
        if (shouldEnableCustomCursor()) {
          initCustomCursor();
        } else {
          document.body.classList.add("no-cursor"); 
        }
        window.safeRequestIdleCallback(() => {
          setupScrollColorChange();
          toggleFaq();
          servicePageWrapper();
          ctaAnimations();
          globalCtaButton();
          info();
        });
      },
      cleanup: function () {
        cleanUpTriggers();
        cleanUpPageListeners();
      },
    },
    about: {
      execute: function () {
        if (!window.isBarbaTransition) {
          defaultEnterTransition();
        }
        animationPageEnterAbout();
        startInfiniteMarquee();
        if (shouldEnableCustomCursor()) {
          initCustomCursor();
        } else {
          document.body.classList.add("no-cursor"); 
        }
        window.safeRequestIdleCallback(() => { 
          setupScrollColorChange();      
          studioAnimations();
          genericPageTitleAnimations();
          serviceWrapper();
          ctaAnimations();
          globalCtaButton();
          pageServiceScrollTriggerAbout();
          info();
        });
      },
      cleanup: function () {
        cleanUpTriggers();
        cleanUpPageListeners();
      },
    },
    portfolio:{
      execute: function () {
        defaultSimpleTransition();
        if (shouldEnableCustomCursor()) {
          initCustomCursor();
        } else {
          document.body.classList.add("no-cursor"); 
        }
      },
      cleanup: function () {
        cleanUpTriggers();
        cleanUpPageListeners();
      },
    },
    contatti: {
      execute: function () {
        if (!window.isBarbaTransition) {
          defaultEnterTransition();
        }
        if (shouldEnableCustomCursor()) {
          initCustomCursor();
        } else {
          document.body.classList.add("no-cursor"); 
        }
        MultiStepForm.init();
        window.AppGeneralForms.init();
        calendar();
      },
      cleanup: function () {
        cleanUpTriggers();
        cleanUpPageListeners();
      },
    },
    essential: {
      execute: function () {
        if (!window.isBarbaTransition) {
          defaultSimpleTransition();
        }
        if (shouldEnableCustomCursor()) {
          initCustomCursor();
        } else {
          document.body.classList.add("no-cursor"); 
        }
        MultiStepForm.init();
        window.AppGeneralForms.init();
        calendar();
      },
      cleanup: function () {
        cleanUpTriggers();
        cleanUpPageListeners();
      },
    },
    professional: {
      execute: function () {
        if (!window.isBarbaTransition) {
          defaultSimpleTransition();
        }
        if (shouldEnableCustomCursor()) {
          initCustomCursor();
        } else {
          document.body.classList.add("no-cursor"); 
        }
        MultiStepForm.init();
        window.AppGeneralForms.init();
        calendar();
      },
      cleanup: function () {
        cleanUpTriggers();
        cleanUpPageListeners();
      },
    },
    custom: {
      execute: function () {
        if (!window.isBarbaTransition) {
          defaultSimpleTransition();
        }
        if (shouldEnableCustomCursor()) {
          initCustomCursor();
        } else {
          document.body.classList.add("no-cursor"); 
        }
        MultiStepForm.init();
        window.AppGeneralForms.init();
        calendar();
      },
      cleanup: function () {
        cleanUpTriggers();
        cleanUpPageListeners();
      },
    },
    Proposito: {
      execute: function () {
        if (!window.isBarbaTransition) {
          defaultEnterTransition();
        }
        if (shouldEnableCustomCursor()) {
          initCustomCursor();
        } else {
          document.body.classList.add("no-cursor"); 
        }
        setupScrollColorChange();      
        propositoAnimation.btnReadAnimation();
        propositoAnimation.NewsLetterAnimation();
        propositoAnimation.btnCategoryAnimation();
        propositoAnimation.thumbnailImageAnimation();
        propositoAnimation.postEntry();
        propositoAnimation.initializeSwiper();
        startMarquee();
        window.AppGeneralForms.init();
      },
      cleanup: function () {
        cleanUpTriggers();
        cleanUpPageListeners();
      },
    },
    privacy: {
      execute: function () {
        if (!window.isBarbaTransition) {
          defaultEnterTransition();
        }
        if (shouldEnableCustomCursor()) {
          initCustomCursor();
        } else {
          document.body.classList.add("no-cursor"); 
        }
        setupScrollColorChange();      
      },
      cleanup: function () {
        cleanUpTriggers();
        cleanUpPageListeners();
      },
    },
    blogPost: {
      execute: function () {
        if (!window.isBarbaTransition) {
          blogTransition();
        }          
        if (shouldEnableCustomCursor()) {
          initCustomCursor();
        } else {
          document.body.classList.add("no-cursor"); 
        }
        setupScrollColorChange();
        videoPause();      
        propositoAnimation.initializeSwiper();
        propositoAnimation.categoryLabel();
        propositoAnimation.tagLinkAnimation();
        propositoAnimation.btnReadAnimation();
        propositoAnimation.NewsLetterAnimation();
        propositoAnimation.btnCategoryAnimation();
        propositoAnimation.shareBtnAnimation();
        window.AppGeneralForms.init();
      },
      cleanup: function () {
        cleanUpTriggers();
        cleanUpPageListeners();
      },
    },
    blogCategory: {
      execute: function () {
        if (!window.isBarbaTransition) {
          blogTransition();
        }          
        if (shouldEnableCustomCursor()) {
          initCustomCursor();
        } else {
          document.body.classList.add("no-cursor"); 
        }  
        setupScrollColorChange();   
        propositoAnimation.initializeSwiper();
        propositoAnimation.categoryLabel();
        propositoAnimation.tagLinkAnimation();
        propositoAnimation.btnReadAnimation();
        propositoAnimation.NewsLetterAnimation();
        propositoAnimation.btnCategoryAnimation();
        propositoAnimation.thumbnailImageAnimation();
        propositoAnimation.postEntry();
        window.AppGeneralForms.init();
      },
      cleanup: function () {
        cleanUpTriggers();
        cleanUpPageListeners();
      },
    },
    blogTag: {
      execute: function () {
        if (!window.isBarbaTransition) {
          blogTransition();
        }          
        if (shouldEnableCustomCursor()) {
          initCustomCursor();
        } else {
          document.body.classList.add("no-cursor"); 
        }  
        setupScrollColorChange();    
        propositoAnimation.initializeSwiper();
        propositoAnimation.categoryLabel();
        propositoAnimation.tagLinkAnimation();
        propositoAnimation.btnReadAnimation();
        propositoAnimation.NewsLetterAnimation();
        propositoAnimation.btnCategoryAnimation();
        window.AppGeneralForms.init();
      },
      cleanup: function () {
        cleanUpTriggers();
        cleanUpPageListeners();
      },
    },
    quattroZeroQuattro: {
      execute: function () {
        defaultSimpleTransition();
        if (shouldEnableCustomCursor()) {
          initCustomCursor();
        } else {
          document.body.classList.add("no-cursor"); 
        }
      },
      cleanup: function () {
        cleanUpTriggers();
        cleanUpPageListeners();
      },
    },
    loginPage: {
      execute: function () {
        if (!window.isBarbaTransition) {
          defaultSimpleTransition();
        }
        if (shouldEnableCustomCursor()) {
          initCustomCursor();
        } else {
          document.body.classList.add("no-cursor"); 
        }
        MultiStepForm.init();
        FirebaseAppManager.initLoginForm();
        window.AppPasswordToggleLogin.init();
      },
      cleanup: function () {
        cleanUpTriggers();
        cleanUpPageListeners();
      },
    },
    registrazione: {
      execute: function () {
        if (!window.isBarbaTransition) {
          defaultSimpleTransition();
        }
        if (shouldEnableCustomCursor()) {
          initCustomCursor();
        } else {
          document.body.classList.add("no-cursor"); 
        }
        MultiStepForm.init();
        window.AppForms.init();
        window.AppPasswordToggle.init();
      },
      cleanup: function () {
        cleanUpTriggers();
        cleanUpPageListeners();
      },
    },
    resetPassword: {
      execute: function () {
        if (!window.isBarbaTransition) {
          defaultSimpleTransition();
        }
        if (shouldEnableCustomCursor()) {
          initCustomCursor();
        } else {
          document.body.classList.add("no-cursor"); 
        }
        MultiStepForm.init();
        window.AppResetPassword.init();
      },
      cleanup: function () {
        cleanUpTriggers();
        cleanUpPageListeners();
      },
    },
    updatePassword: {
      execute: function () {
        if (!window.isBarbaTransition) {
          defaultSimpleTransition();
        }
        if (shouldEnableCustomCursor()) {
          initCustomCursor();
        } else {
          document.body.classList.add("no-cursor"); 
        }
        MultiStepForm.init();
        window.AppUpdatePassword.init();
        window.AppPasswordToggle.init();
      },
      cleanup: function () {
        cleanUpTriggers();
        cleanUpPageListeners();
      },
    },
    verify: {
      execute: function () {
        if (!window.isBarbaTransition) {
          defaultSimpleTransition();
        }
        if (shouldEnableCustomCursor()) {
          initCustomCursor();
        } else {
          document.body.classList.add("no-cursor"); 
        }
      },
      cleanup: function () {
        cleanUpTriggers();
        cleanUpPageListeners();
      },
    },
    userPendingApproval: {
      execute: function () {
        if (!window.isBarbaTransition) {
          defaultSimpleTransition();
        }
        if (shouldEnableCustomCursor()) {
          initCustomCursor();
        } else {
          document.body.classList.add("no-cursor"); 
        }
      },
      cleanup: function () {
        cleanUpTriggers();
        cleanUpPageListeners();
      },
    },
    dashboard: {
      execute: function () {
        if (!window.isBarbaTransition) {
          defaultSimpleTransition();
        }
        if (shouldEnableCustomCursor()) {
          initCustomCursor();
        } else {
          document.body.classList.add("no-cursor"); 
        }
        DashboardManager.init();
        toggleFaq();
      },
      cleanup: function () {
        cleanUpTriggers();
        cleanUpPageListeners();
      },
    },
    assessment: {
      execute: function () {
        if (!window.isBarbaTransition) {
          defaultSimpleTransition();
        }
        if (shouldEnableCustomCursor()) {
          initCustomCursor();
        } else {
          document.body.classList.add("no-cursor"); 
        }
        AssessmentManager.init();
        MultiStepForm.init();
        window.AppAssessmentForms.init();
        toggleFaq();
      },
      cleanup: function () {
        cleanUpTriggers();
        cleanUpPageListeners();
      },
    },
    landing: {
      execute: function () {
        if (!window.isBarbaTransition) {
          transitionOnLoadHero();
        } else {
          transitionOnLoadHeroDefault();
        }
        window.menuNavigation.animateUSPLinks();
  
        if (window.matchMedia("(min-width: 992px)").matches) {          
          window.safeRequestIdleCallback(() => {
            ctaStickyTransition.reset();
            window.menuNavigation.handleLinkMenuHover();
            scrollProgressLine();            
          });
        } else {
          window.safeRequestIdleCallback(() => {
            showcasePanelsScrollMobile();
            showcaseTextContentMobile();
          });
        }
        if (shouldEnableCustomCursor()) {
          initCustomCursor();
        } else {
          document.body.classList.add("no-cursor"); 
        }
        // 🔹 PRIORITÀ MEDIA - idle
        window.safeRequestIdleCallback(() => {
          createScrollTriggerScrollWrapper();
          createScrollTriggerHero();
          setupShowcaseButtons();
          setupVerticalShowcaseButtons();
          setupVerticalContatti();
          genericPageTitleAnimations();
          ctaAnimations();
          globalCtaButton();
          serviceWrapper();
        });
        // 🔹 PRIORITÀ BASSA - differita dopo load + verifica swiper
        setTimeout(async () => {
          await loadScript(
            "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"
          ).catch((err) => console.error("❌ Errore caricamento Swiper:", err));
  
          try {
            setupScrollColorChange();
            info();            
            propositoAnimation.btnReadAnimation?.();
            propositoAnimation.btnCategoryAnimation?.();
            propositoAnimation.initializeSwiper?.();  
            propositoHomePage?.();
            studioAnimations?.();
          } catch (err) {
            console.error("❌ Errore esecuzione funzioni differite:", err);
          }
        }, 2500);
      },
  
      cleanup: function () {
        cleanUpTriggers();
        cleanUpPageListeners();
      },
    },
    gazzetta:{
      execute: function () {
        if (!window.isBarbaTransition) {
          showcaseTransition();
        }
        if (shouldEnableCustomCursor()) {
          initCustomCursor();
        } else {
          document.body.classList.add("no-cursor"); 
        }
        setupGenericButtons();
        setupGenericCloseButtons();
        startMarquee();
      },
      cleanup: function () {
        cleanUpTriggers();
        cleanUpPageListeners();
      },
    },
    lavoce:{
      execute: function () {
        if (!window.isBarbaTransition) {
          showcaseTransition();
        }
        if (shouldEnableCustomCursor()) {
          initCustomCursor();
        } else {
          document.body.classList.add("no-cursor"); 
        }
        setupGenericButtons();
        setupGenericCloseButtons();
        initSliderCTA();        
      },
      cleanup: function () {
        cleanUpTriggers();
        cleanUpPageListeners();
      },
    },
    catheclisma:{
      execute: function () {
        if (!window.isBarbaTransition) {
          showcaseTransition();
        }
        if (shouldEnableCustomCursor()) {
          initCustomCursor();
        } else {
          document.body.classList.add("no-cursor"); 
        }
        setupGenericButtons();
        setupGenericCloseButtons();
        initSliderCTA();        
      },
      cleanup: function () {
        cleanUpTriggers();
        cleanUpPageListeners();
      },
    },
    soltufo:{
      execute: function () {
        if (!window.isBarbaTransition) {
          showcaseTransition();
        }
        if (shouldEnableCustomCursor()) {
          initCustomCursor();
        } else {
          document.body.classList.add("no-cursor"); 
        }    
        setupGenericCloseButtons();             
      },
      cleanup: function () {
        cleanUpTriggers();
        cleanUpPageListeners();
      },
    },
    falletta:{
      execute: function () {
        if (!window.isBarbaTransition) {
          showcaseTransition();
        }
        if (shouldEnableCustomCursor()) {
          initCustomCursor();
        } else {
          document.body.classList.add("no-cursor"); 
        }
        setupGenericButtons();
        setupGenericCloseButtons();
        initSliderCTA();        
      },
      cleanup: function () {
        cleanUpTriggers();
        cleanUpPageListeners();
      },
    },
    amotea:{
      execute: function () {
        if (!window.isBarbaTransition) {
          showcaseTransition();
        }
        if (shouldEnableCustomCursor()) {
          initCustomCursor();
        } else {
          document.body.classList.add("no-cursor"); 
        }
        setupGenericButtons();
        setupGenericCloseButtons();
        initSliderCTA();        
      },
      cleanup: function () {
        cleanUpTriggers();
        cleanUpPageListeners();
      },
    },
    converse:{
      execute: function () {
        if (!window.isBarbaTransition) {
          showcaseTransition();
        }
        if (shouldEnableCustomCursor()) {
          initCustomCursor();
        } else {
          document.body.classList.add("no-cursor"); 
        }
        setupGenericCloseButtons();                     
      },
      cleanup: function () {
        cleanUpTriggers();
        cleanUpPageListeners();
      },
    },
    mati:{
      execute: function () {
        if (!window.isBarbaTransition) {
          showcaseTransition();
        }
        if (shouldEnableCustomCursor()) {
          initCustomCursor();
        } else {
          document.body.classList.add("no-cursor"); 
        }
        setupGenericCloseButtons();                     
      },
      cleanup: function () {
        cleanUpTriggers();
        cleanUpPageListeners();
      },
    },
    contattaci: {
      execute: function () {
        if (!window.isBarbaTransition) {
          defaultEnterTransition();
        }
        if (shouldEnableCustomCursor()) {
          initCustomCursor();
        } else {
          document.body.classList.add("no-cursor"); 
        }
        MultiStepForm.init();
        window.AppGeneralForms.init();
        calendar();
      },
      cleanup: function () {
        cleanUpTriggers();
        cleanUpPageListeners();
      },
    },
    valutazione: {
      execute: function () {
        if (!window.isBarbaTransition) {
          defaultEnterTransition();
        }
        if (shouldEnableCustomCursor()) {
          initCustomCursor();
        } else {
          document.body.classList.add("no-cursor"); 
        }
        MultiStepForm.init();
        window.AppGeneralForms.init();        
      },
      cleanup: function () {
        cleanUpTriggers();
        cleanUpPageListeners();
      },
    },
  };

  window.safeRequestIdleCallback = window.safeRequestIdleCallback || function (cb) {
    setTimeout(cb, 50);
};

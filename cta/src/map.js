const CTA_BUNDLE_VER = "v-3.228";
const CTA_CDN = `https://cdn.jsdelivr.net/gh/CTA-studio/cta-bundles@${CTA_BUNDLE_VER}/cta/dist`;

window.safeRequestIdleCallback =
  window.safeRequestIdleCallback ||
  function (cb) {
    setTimeout(cb, 50);
  };

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

// Unico oggetto per fare riferimento a JSON e Funzioni
window.pageSpecificFunctionsMap = {
  //home
  "68b2e6c65a7f2a0ef027f544": {
    name: "home", // Nome descrittivo della pagina
    jsonKey: "68b2e6c65a7f2a0ef027f544", // Riferimento al JSON
    scripts: [],
    styles: [],
  },
  //competenze
  "69e73f5e181c527386af4272": {
    name: "competenze",
    jsonKey: "69e73f5e181c527386af4272",
    scripts: [],
    styles: [],
  },
  //siti WEB
  "69e7b9cf98343dd874c7f1e4": {
    name: "sitiWeb",
    jsonKey: "69e7b9cf98343dd874c7f1e4",
    scripts: [],
    styles: [],
  },
  //siti WEB / SITI VETRINA
  "69f4d2f18a7b4ccc15b480e0": {
    name: "sitiVetrina",
    jsonKey: "69f4d2f18a7b4ccc15b480e0",
    scripts: [],
    styles: [],
  },
  //siti WEB / SITI E-COMMERCE
  "69f8927640f544f41a0d88ac": {
    name: "sitiEcommerce",
    jsonKey: "69f8927640f544f41a0d88ac",
    scripts: [],
    styles: [],
  },
  //siti WEB / webapp
  "69f8b3cc0310547fd0d5178d": {
    name: "webApp",
    jsonKey: "69f8b3cc0310547fd0d5178d",
    scripts: [],
    styles: [],
  },
  //design
  "69ef91c66b6ff4580d64fb0e": {
    name: "design",
    jsonKey: "69ef91c66b6ff4580d64fb0e",
    scripts: [],
    styles: [],
  },
  //design / brand identity
  "69f8c2d7833bddcdc45fcb08": {
    name: "brandIdentity",
    jsonKey: "69f8c2d7833bddcdc45fcb08",
    scripts: [],
    styles: [],
  },
  //design / visual identity
  "69f9ae70e72a1a5569b5fcd9": {
    name: "visualIdentity",
    jsonKey: "69f9ae70e72a1a5569b5fcd9",
    scripts: [],
    styles: [],
  },
  //design / visual identity
  "69f9debcd358d5504e0ddfdb": {
    name: "logoDesign",
    jsonKey: "69f9debcd358d5504e0ddfdb",
    scripts: [],
    styles: [],
  },

  //Direzione Artistica
  "69f1db4d0bc3f2a13ffe24e4": {
    name: "direzioneArtistica",
    jsonKey: "69f1db4d0bc3f2a13ffe24e4",
    scripts: [],
    styles: [],
  },
  //progetti
  "69fb4ddff499fbbabf81ec26": {
    name: "progetti",
    jsonKey: "69fb4ddff499fbbabf81ec26",
    scripts: [],
    styles: [],
  },
  //contatti
  "68b2e6c65a7f2a0ef027f54b": {
    name: "contatti",
    jsonKey: "68b2e6c65a7f2a0ef027f54b",
    scripts: [
      `${CTA_CDN}/cta-form.js`,
      "https://cdn.jsdelivr.net/npm/fullcalendar@5.10.1/main.min.js",
    ],
    styles: ["https://cdn.jsdelivr.net/npm/fullcalendar@5.10.1/main.min.css"],
  },
  //studio
  "69e23192e5a6a6ccf16b5c2a": {
    name: "studio",
    jsonKey: "69e23192e5a6a6ccf16b5c2a",
    scripts: [],
    styles: [],
  },
  //PROPOSITO
  "68b2e6c65a7f2a0ef027f553": {
    name: "Proposito",
    jsonKey: "68b2e6c65a7f2a0ef027f553",
    scripts: [
      `${CTA_CDN}/cta-proposito.js`,
      "https://cdn.jsdelivr.net/npm/swiper@12/swiper-bundle.min.js",
      `${CTA_CDN}/cta-form.js`,
    ],
    styles: [],
  },
  //blog
  "68b2e6c65a7f2a0ef027f556": {
    name: "blogPost",
    jsonKey: "",
    scripts: [
      `${CTA_CDN}/cta-proposito.js`,
      "https://cdn.jsdelivr.net/npm/swiper@12/swiper-bundle.min.js",
      `${CTA_CDN}/cta-form.js`,
    ],
    styles: [],
  },
  //blog Category
  "68b2e6c65a7f2a0ef027f555": {
    name: "blogCategory",
    jsonKey: "",
    scripts: [
      `${CTA_CDN}/cta-proposito.js`,
      "https://cdn.jsdelivr.net/npm/swiper@12/swiper-bundle.min.js",
      `${CTA_CDN}/cta-form.js`,
    ],
    styles: [],
  },
  //blog Tag
  "68b2e6c65a7f2a0ef027f557": {
    name: "blogTag",
    jsonKey: "",
    scripts: [
      `${CTA_CDN}/cta-proposito.js`,
      "https://cdn.jsdelivr.net/npm/swiper@12/swiper-bundle.min.js",
      `${CTA_CDN}/cta-form.js`,
    ],
    styles: [],
  },
  //PRIVACY
  "68b2e6c65a7f2a0ef027f54e": {
    name: "privacy",
    jsonKey: "",
    scripts: [],
    styles: [],
  },
  "67af596455154a4f0335f5e0": {
    name: "verify",
    jsonKey: "",
    scripts: [`${CTA_CDN}/cta-auth.js`],
    styles: [],
  },
  "68b2e6c65a7f2a0ef027f562": {
    name: "userPendingApproval",
    jsonKey: "",
    scripts: [`${CTA_CDN}/cta-auth.js`],
    styles: [],
  },
  "66f3c6fe1fbe616545b964bd": {
    name: "dashboard",
    jsonKey: "",
    scripts: [`${CTA_CDN}/cta-auth.js`, `${CTA_CDN}/cta-form.js`],
    styles: [],
  },
  "66f3c74d69405c8d610cb8ed": {
    name: "assessment",
    jsonKey: "",
    scripts: [`${CTA_CDN}/cta-auth.js`, `${CTA_CDN}/cta-form.js`],
    styles: [],
  },
  //LANDING
  "68b2e6c65a7f2a0ef027f563": {
    name: "landing",
    jsonKey: "",
    scripts: [],
    styles: [],
  },
  // PROJECT art director
  "69767f28c6a346ad03662e70": {
    name: "projectsArtDirector",
    jsonKey: "",
    scripts: [
      `${CTA_CDN}/cta-projects.js`,
      "https://cdn.jsdelivr.net/npm/swiper@12/swiper-bundle.min.js",
    ],
    styles: [],
  },
  // PROJECT E-Commerce
  "69cce4d0b7ddc43dd0d96fd1": {
    name: "projectsEcommerce",
    jsonKey: "",
    scripts: [
      `${CTA_CDN}/cta-projects.js`,
      "https://cdn.jsdelivr.net/npm/swiper@12/swiper-bundle.min.js",
    ],
    styles: [],
  },
  // PROJECT art Design
  "69cce3290aa8b51fa9c61554": {
    name: "projectsDesign",
    jsonKey: "",
    scripts: [
      `${CTA_CDN}/cta-projects.js`,
      "https://cdn.jsdelivr.net/npm/swiper@12/swiper-bundle.min.js",
    ],
    styles: [],
  },
  // login
  "68b2e6c65a7f2a0ef027f55a": {
    name: "loginPage",
    jsonKey: "",
    scripts: [`${CTA_CDN}/cta-auth.js`, `${CTA_CDN}/cta-form.js`],
    styles: [],
  },
  //Regiistrazione
  "68b2e6c65a7f2a0ef027f55b": {
    name: "registrazione",
    jsonKey: "",
    scripts: [`${CTA_CDN}/cta-auth.js`, `${CTA_CDN}/cta-form.js`],
    styles: [],
  },
  //Reset Password
  "68b2e6c65a7f2a0ef027f55c": {
    name: "resetPassword",
    jsonKey: "",
    scripts: [`${CTA_CDN}/cta-auth.js`, `${CTA_CDN}/cta-form.js`],
    styles: [],
  },
  //Update Password
  "68b2e6c65a7f2a0ef027f55d": {
    name: "updatePassword",
    jsonKey: "",
    scripts: [`${CTA_CDN}/cta-auth.js`, `${CTA_CDN}/cta-form.js`],
    styles: [],
  },
  //valutazione
  "68b2e6c65a7f2a0ef027f599": {
    name: "valutazione",
    jsonKey: "",
    scripts: [`${CTA_CDN}/cta-form.js`],
    styles: [],
  },
  // 404
  "68b2e6c65a7f2a0ef027f54d": {
    name: "quattroZeroQuattro",
    jsonKey: "",
    scripts: [],
    styles: [],
  },
};

window.jsonPageMap = {
  //1 HOME
  "68b2e6c65a7f2a0ef027f544": {
    active: true,
    json: `{
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": "https://www.ctastudio.it#webpage",
      "url": "https://www.ctastudio.it",
      "name": "Home",
      "isPartOf": {
        "@id": "https://www.ctastudio.it#website"
      },
      "about": {
        "@id": "https://www.ctastudio.it#organization"
      },
      "description": "Progettiamo siti web professionali ed esperienze digitali su misura, con forte competenza in brand identity e direzione artistica.",
      "image": {
        "@type": "ImageObject",
        "url": "https://cdn.prod.website-files.com/68b2e6c65a7f2a0ef027f56f/69eb73731d1319d61fc41f4b_cta-search-image-standard.jpg"
      },
      "primaryImageOfPage": {
        "@type": "ImageObject",
        "url": "https://cdn.prod.website-files.com/68b2e6c65a7f2a0ef027f56f/69eb73731d1319d61fc41f4b_cta-search-image-standard.jpg"
      },
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://www.ctastudio.it"
          }
        ]
      }
    }`,
  },
  //2 COMPETENZE
  "69e73f5e181c527386af4272": {
    active: true,
    json: `{
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": "https://www.ctastudio.it/competenze#webpage",
      "url": "https://www.ctastudio.it/competenze",
      "name": "Competenze",
      "isPartOf": {
        "@id": "https://www.ctastudio.it#website"
      },
      "about": {
        "@id": "https://www.ctastudio.it#organization"
      },
      "description": "Scopri le tre aree creative di CTA Studio: progettiamo brand identity, siti web e direzione visiva per brand capaci di emozionare e durare nel tempo.",
      "image": {
        "@type": "ImageObject",
        "url": "https://cdn.prod.website-files.com/68b2e6c65a7f2a0ef027f56f/69eb7441343c5d4dd3f507bf_cta%20studio%20competeenze.jpg"
      },
      "primaryImageOfPage": {
        "@type": "ImageObject",
        "url": "https://cdn.prod.website-files.com/68b2e6c65a7f2a0ef027f56f/69eb7441343c5d4dd3f507bf_cta%20studio%20competeenze.jpg"
      },
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://www.ctastudio.it"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Competenze",
            "item": "https://www.ctastudio.it/competenze"
          }
        ]
      }
    }`,
  },
  //2-a Siti web
  "69e7b9cf98343dd874c7f1e4": {
    active: true,
    json: `{
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebPage",
          "@id": "https://www.ctastudio.it/siti-web#webpage",
          "url": "https://www.ctastudio.it/siti-web",
          "name": "Realizzazione siti web professionali ed e-commerce",
          "isPartOf": {
            "@id": "https://www.ctastudio.it#website"
          },
          "about": {
            "@id": "https://www.ctastudio.it/siti-web#service"
          },
          "description": "CTA Studio realizza siti web professionali, siti vetrina ed e-commerce su misura, pensati per dare struttura, carattere e direzione al tuo progetto online.",
          "image": {
            "@type": "ImageObject",
            "url": "https://cdn.prod.website-files.com/68b2e6c65a7f2a0ef027f56f/69ef13908ac71f04f999b5ce_siti-web.jpg"
          },
          "primaryImageOfPage": {
            "@type": "ImageObject",
            "url": "https://cdn.prod.website-files.com/68b2e6c65a7f2a0ef027f56f/69ef13908ac71f04f999b5ce_siti-web.jpg"
          },
          "breadcrumb": {
            "@id": "https://www.ctastudio.it/siti-web#breadcrumb"
          }
        },
        {
          "@type": "Service",
          "@id": "https://www.ctastudio.it/siti-web#service",
          "name": "Realizzazione siti web professionali ed e-commerce",
          "serviceType": "Realizzazione siti web, siti vetrina, e-commerce e web app",
          "description": "CTA Studio progetta e realizza siti web professionali, siti vetrina, e-commerce ed esperienze digitali su misura, unendo design, identità di marca, esperienza utente e funzionalità.",
          "provider": {
            "@id": "https://www.ctastudio.it#organization"
          },
          "areaServed": {
            "@type": "Country",
            "name": "Italia"
          },
          "url": "https://www.ctastudio.it/siti-web",
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Soluzioni per siti web e progetti digitali",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Siti web vetrina",
                  "description": "Progettazione di siti web vetrina professionali, pensati per raccontare il brand, presentare servizi e creare una presenza digitale chiara e riconoscibile."
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "E-commerce",
                  "description": "Progettazione di e-commerce su misura, con attenzione a struttura del catalogo, percorsi utente, shop experience, conversione e gestione dei contenuti."
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Web app e SPA",
                  "description": "Progettazione di interfacce, piattaforme, aree riservate, logiche dinamiche e soluzioni digitali personalizzate tramite custom code."
                }
              }
            ]
          }
        },
        {
          "@type": "BreadcrumbList",
          "@id": "https://www.ctastudio.it/siti-web#breadcrumb",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://www.ctastudio.it"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Siti Web",
              "item": "https://www.ctastudio.it/siti-web"
            }
          ]
        }
      ]
    }`,
  },
  //2A-1 Siti web vetrina
  "69f4d2f18a7b4ccc15b480e0": {
    active: true,
    json: `{
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebPage",
          "@id": "https://www.ctastudio.it/siti-web/siti-web-vetrina#webpage",
          "url": "https://www.ctastudio.it/siti-web/siti-web-vetrina",
          "name": "Siti Web Vetrina | Siti professionali su misura",
          "isPartOf": {
            "@id": "https://www.ctastudio.it#website"
          },
          "about": {
            "@id": "https://www.ctastudio.it/siti-web/siti-web-vetrina#service"
          },
          "description": "In CTA Studio lavoriamo su struttura, design e interazioni per realizzare siti web vetrina capaci di guidare, coinvolgere e convertire.",
          "image": {
            "@type": "ImageObject",
            "url": "https://cdn.prod.website-files.com/68b2e6c65a7f2a0ef027f56f/69f4b980ea12f00417cd25b9_cta-studio.jpg"
          },
          "primaryImageOfPage": {
            "@type": "ImageObject",
            "url": "https://cdn.prod.website-files.com/68b2e6c65a7f2a0ef027f56f/69f4b980ea12f00417cd25b9_cta-studio.jpg"
          },
          "breadcrumb": {
            "@id": "https://www.ctastudio.it/siti-web/siti-web-vetrina#breadcrumb"
          }
        },
        {
          "@type": "Service",
          "@id": "https://www.ctastudio.it/siti-web/siti-web-vetrina#service",
          "name": "Realizzazione siti web vetrina professionali",
          "serviceType": "Siti web vetrina, siti professionali su misura, siti responsive",
          "description": "CTA Studio progetta e realizza siti web vetrina professionali e su misura, curando struttura, design, contenuti, interazioni, esperienza utente e attenzione al posizionamento.",
          "provider": {
            "@id": "https://www.ctastudio.it#organization"
          },
          "areaServed": {
            "@type": "Country",
            "name": "Italia"
          },
          "url": "https://www.ctastudio.it/siti-web/siti-web-vetrina"
        },
        {
          "@type": "BreadcrumbList",
          "@id": "https://www.ctastudio.it/siti-web/siti-web-vetrina#breadcrumb",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://www.ctastudio.it"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Siti Web",
              "item": "https://www.ctastudio.it/siti-web"
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": "Siti Web Vetrina",
              "item": "https://www.ctastudio.it/siti-web/siti-web-vetrina"
            }
          ]
        }
      ]
    }`,
  },
  //2A-2 Siti web e-commerce
  "69f8927640f544f41a0d88ac": {
    active: true,
    json: `{
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "WebPage",
            "@id": "https://www.ctastudio.it/siti-web/e-commerce#webpage",
            "url": "https://www.ctastudio.it/siti-web/e-commerce",
            "name": "Siti Web E-Commerce | Shop online su misura",
            "isPartOf": {
              "@id": "https://www.ctastudio.it#website"
            },
            "about": {
              "@id": "https://www.ctastudio.it/siti-web/e-commerce#service"
            },
            "description": "Progettiamo e-commerce custom in Webflow e Shopify, curando struttura, design e percorsi d’acquisto per valorizzare i prodotti e favorire la conversione.",
            "image": {
              "@type": "ImageObject",
              "url": "https://cdn.prod.website-files.com/68b2e6c65a7f2a0ef027f56f/69f4b980ea12f00417cd25b9_cta-studio.jpg"
            },
            "primaryImageOfPage": {
              "@type": "ImageObject",
              "url": "https://cdn.prod.website-files.com/68b2e6c65a7f2a0ef027f56f/69f4b980ea12f00417cd25b9_cta-studio.jpg"
            },
            "breadcrumb": {
              "@id": "https://www.ctastudio.it/siti-web/e-commerce#breadcrumb"
            }
          },
          {
            "@type": "Service",
            "@id": "https://www.ctastudio.it/siti-web/e-commerce#service",
            "name": "Realizzazione siti e-commerce su misura",
            "serviceType": "Siti e-commerce, shop online su misura, Webflow e Shopify",
            "description": "CTA Studio progetta e realizza siti e-commerce su misura in Webflow e Shopify, curando struttura, design, catalogo prodotti, esperienza utente, percorsi d’acquisto e conversione.",
            "provider": {
              "@id": "https://www.ctastudio.it#organization"
            },
            "areaServed": {
              "@type": "Country",
              "name": "Italia"
            },
            "url": "https://www.ctastudio.it/siti-web/e-commerce"
          },
          {
            "@type": "BreadcrumbList",
            "@id": "https://www.ctastudio.it/siti-web/e-commerce#breadcrumb",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://www.ctastudio.it"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Siti Web",
                "item": "https://www.ctastudio.it/siti-web"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": "E-commerce",
                "item": "https://www.ctastudio.it/siti-web/e-commerce"
              }
            ]
          }
        ]
      }`,
  },
  //2A-3 Web App
  "69f8b3cc0310547fd0d5178d": {
    active: true,
    json: `{
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebPage",
                "@id": "https://www.ctastudio.it/siti-web/web-app-spa#webpage",
                "url": "https://www.ctastudio.it/siti-web/web-app-spa",
                "name": "Web App e SPA | Interfacce digitali su misura",
                "isPartOf": {
                  "@id": "https://www.ctastudio.it#website"
                },
                "about": {
                  "@id": "https://www.ctastudio.it/siti-web/web-app-spa#service"
                },
                "description": "Realizziamo interfacce digitali, dashboard e piattaforme web, pensate per offrire navigazioni fluide, logiche custom e un’esperienza più continua.",
                "image": {
                  "@type": "ImageObject",
                  "url": "https://cdn.prod.website-files.com/68b2e6c65a7f2a0ef027f56f/69f4b980ea12f00417cd25b9_cta-studio.jpg"
                },
                "primaryImageOfPage": {
                  "@type": "ImageObject",
                  "url": "https://cdn.prod.website-files.com/68b2e6c65a7f2a0ef027f56f/69f4b980ea12f00417cd25b9_cta-studio.jpg"
                },
                "breadcrumb": {
                  "@id": "https://www.ctastudio.it/siti-web/web-app-spa#breadcrumb"
                }
              },
              {
                "@type": "Service",
                "@id": "https://www.ctastudio.it/siti-web/web-app-spa#service",
                "name": "Realizzazione web app e SPA su misura",
                "serviceType": "Web app, SPA, interfacce digitali, dashboard e piattaforme web",
                "description": "CTA Studio progetta e realizza web app, SPA, dashboard, aree riservate e interfacce digitali su misura, integrando design, UI/UX, custom code, animazioni, logiche dinamiche e tecnologie adatte al livello di complessità richiesto.",
                "provider": {
                  "@id": "https://www.ctastudio.it#organization"
                },
                "areaServed": {
                  "@type": "Country",
                  "name": "Italia"
                },
                "url": "https://www.ctastudio.it/siti-web/web-app-spa"
              },
              {
                "@type": "BreadcrumbList",
                "@id": "https://www.ctastudio.it/siti-web/web-app-spa#breadcrumb",
                "itemListElement": [
                  {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Home",
                    "item": "https://www.ctastudio.it"
                  },
                  {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "Siti Web",
                    "item": "https://www.ctastudio.it/siti-web"
                  },
                  {
                    "@type": "ListItem",
                    "position": 3,
                    "name": "Web App e SPA",
                    "item": "https://www.ctastudio.it/siti-web/web-app-spa"
                  }
                ]
              }
            ]
          }`,
  },
  //2-b Design
  "69ef91c66b6ff4580d64fb0e": {
    active: true,
    json: `{
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebPage",
          "@id": "https://www.ctastudio.it/design#webpage",
          "url": "https://www.ctastudio.it/design",
          "name": "Design | Brand identity, visual identity e logo design",
          "isPartOf": {
            "@id": "https://www.ctastudio.it#website"
          },
          "about": {
            "@id": "https://www.ctastudio.it/design#service"
          },
          "description": "Con un approccio psicologico e creativo, progettiamo brand identity, visual identity e logo design per dare forma alla personalità del tuo marchio.",
          "image": {
            "@type": "ImageObject",
            "url": "https://cdn.prod.website-files.com/68b2e6c65a7f2a0ef027f56f/69eb73731d1319d61fc41f4b_cta-search-image-standard.jpg"
          },
          "primaryImageOfPage": {
            "@type": "ImageObject",
            "url": "https://cdn.prod.website-files.com/68b2e6c65a7f2a0ef027f56f/69eb73731d1319d61fc41f4b_cta-search-image-standard.jpg"
          },
          "breadcrumb": {
            "@id": "https://www.ctastudio.it/design#breadcrumb"
          }
        },
        {
          "@type": "Service",
          "@id": "https://www.ctastudio.it/design#service",
          "name": "Brand identity, visual identity e logo design",
          "serviceType": "Brand identity, visual identity e logo design",
          "description": "CTA Studio progetta brand identity, visual identity e logo design per costruire sistemi visivi digitali solidi, riconoscibili e pensati per durare.",
          "provider": {
            "@id": "https://www.ctastudio.it#organization"
          },
          "areaServed": {
            "@type": "Country",
            "name": "Italia"
          },
          "url": "https://www.ctastudio.it/design",
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Soluzioni per identità visiva e design del brand",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Brand identity",
                  "description": "Progettazione dell’identità strategica e visiva del brand, a partire da valori, tono, personalità, direzione e coerenza complessiva."
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Visual identity",
                  "description": "Costruzione del linguaggio visivo del brand attraverso codici grafici, palette, tipografia, stile, applicazioni e sistemi visivi coerenti."
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Logo design",
                  "description": "Progettazione del logo, del segno e degli elementi principali che rappresentano il marchio in modo riconoscibile e coerente."
                }
              }
            ]
          }
        },
        {
          "@type": "BreadcrumbList",
          "@id": "https://www.ctastudio.it/design#breadcrumb",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://www.ctastudio.it"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Design",
              "item": "https://www.ctastudio.it/design"
            }
          ]
        }
      ]
    }`,
  },
  //2B-1 Brand identity
  "69f8c2d7833bddcdc45fcb08": {
    active: true,
    json: `{
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebPage",
          "@id": "https://www.ctastudio.it/design/brand-identity#webpage",
          "url": "https://www.ctastudio.it/design/brand-identity",
          "name": "Brand Identity | Branding e identità di marca",
          "isPartOf": {
            "@id": "https://www.ctastudio.it#website"
          },
          "about": {
            "@id": "https://www.ctastudio.it/design/brand-identity#service"
          },
          "description": "Con un approccio psicologico e creativo, trasformiamo personalità, valori e visione in un’identità di marca chiara, riconoscibile e capace di durare.",
          "image": {
            "@type": "ImageObject",
            "url": "https://cdn.prod.website-files.com/68b2e6c65a7f2a0ef027f56f/69f4b980ea12f00417cd25b9_cta-studio.jpg"
          },
          "primaryImageOfPage": {
            "@type": "ImageObject",
            "url": "https://cdn.prod.website-files.com/68b2e6c65a7f2a0ef027f56f/69f4b980ea12f00417cd25b9_cta-studio.jpg"
          },
          "breadcrumb": {
            "@id": "https://www.ctastudio.it/design/brand-identity#breadcrumb"
          }
        },
        {
          "@type": "Service",
          "@id": "https://www.ctastudio.it/design/brand-identity#service",
          "name": "Brand identity, branding e identità di marca",
          "serviceType": "Brand identity, branding, identità di marca e personal branding",
          "description": "CTA Studio progetta brand identity e percorsi di branding, lavorando su valori, personalità, tono, immaginario, codici visivi e identità di marca.",
          "provider": {
            "@id": "https://www.ctastudio.it#organization"
          },
          "areaServed": {
            "@type": "Country",
            "name": "Italia"
          },
          "url": "https://www.ctastudio.it/design/brand-identity"
        },
        {
          "@type": "BreadcrumbList",
          "@id": "https://www.ctastudio.it/design/brand-identity#breadcrumb",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://www.ctastudio.it"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Design",
              "item": "https://www.ctastudio.it/design"
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": "Brand Identity",
              "item": "https://www.ctastudio.it/design/brand-identity"
            }
          ]
        }
      ]
    }`,
  },
  //2B-2 Visual identity
  "69f9ae70e72a1a5569b5fcd9": {
    active: true,
    json: `{
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "WebPage",
            "@id": "https://www.ctastudio.it/design/visual-identity#webpage",
            "url": "https://www.ctastudio.it/design/visual-identity",
            "name": "Visual Identity | Identità visiva per brand riconoscibili",
            "isPartOf": {
              "@id": "https://www.ctastudio.it#website"
            },
            "about": {
              "@id": "https://www.ctastudio.it/design/visual-identity#service"
            },
            "description": "Progettiamo la visual identity del tuo brand: logo, colori, tipografia e immagini per tradurre valori e personalità in un linguaggio visivo coerente.",
            "image": {
              "@type": "ImageObject",
              "url": "https://cdn.prod.website-files.com/68b2e6c65a7f2a0ef027f56f/69f4b980ea12f00417cd25b9_cta-studio.jpg"
            },
            "primaryImageOfPage": {
              "@type": "ImageObject",
              "url": "https://cdn.prod.website-files.com/68b2e6c65a7f2a0ef027f56f/69f4b980ea12f00417cd25b9_cta-studio.jpg"
            },
            "breadcrumb": {
              "@id": "https://www.ctastudio.it/design/visual-identity#breadcrumb"
            }
          },
          {
            "@type": "Service",
            "@id": "https://www.ctastudio.it/design/visual-identity#service",
            "name": "Visual identity e identità visiva per brand riconoscibili",
            "serviceType": "Visual identity, identità visiva, sistemi visivi e immagine coordinata",
            "description": "CTA Studio progetta visual identity e identità visive per brand riconoscibili, lavorando su logo, colori, tipografia, immagini, segni grafici, layout, applicazioni digitali e materiali coordinati.",
            "provider": {
              "@id": "https://www.ctastudio.it#organization"
            },
            "areaServed": {
              "@type": "Country",
              "name": "Italia"
            },
            "url": "https://www.ctastudio.it/design/visual-identity"
          },
          {
            "@type": "BreadcrumbList",
            "@id": "https://www.ctastudio.it/design/visual-identity#breadcrumb",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://www.ctastudio.it"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Design",
                "item": "https://www.ctastudio.it/design"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": "Visual Identity",
                "item": "https://www.ctastudio.it/design/visual-identity"
              }
            ]
          }
        ]
      }`,
  },
  //2B-3 Logo Design
  "69f9debcd358d5504e0ddfdb": {
    active: true,
    json: `{
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebPage",
                "@id": "https://www.ctastudio.it/design/logo-design#webpage",
                "url": "https://www.ctastudio.it/design/logo-design",
                "name": "Logo Design | Logo professionali per brand",
                "isPartOf": {
                  "@id": "https://www.ctastudio.it#website"
                },
                "about": {
                  "@id": "https://www.ctastudio.it/design/logo-design#service"
                },
                "description": "Progettiamo logo professionali per brand e progetti che cercano un segno creativo, distintivo e riconoscibile, costruito con cura e visione.",
                "image": {
                  "@type": "ImageObject",
                  "url": "https://cdn.prod.website-files.com/68b2e6c65a7f2a0ef027f56f/69f4b980ea12f00417cd25b9_cta-studio.jpg"
                },
                "primaryImageOfPage": {
                  "@type": "ImageObject",
                  "url": "https://cdn.prod.website-files.com/68b2e6c65a7f2a0ef027f56f/69f4b980ea12f00417cd25b9_cta-studio.jpg"
                },
                "breadcrumb": {
                  "@id": "https://www.ctastudio.it/design/logo-design#breadcrumb"
                }
              },
              {
                "@type": "Service",
                "@id": "https://www.ctastudio.it/design/logo-design#service",
                "name": "Logo design e progettazione logo professionali",
                "serviceType": "Logo design, progettazione logo, marchio e identità visiva",
                "description": "CTA Studio progetta logo professionali, marchi e segni visivi per brand e progetti, curando creatività, forme, spazi, proporzioni, applicazioni digitali e materiali coordinati.",
                "provider": {
                  "@id": "https://www.ctastudio.it#organization"
                },
                "areaServed": {
                  "@type": "Country",
                  "name": "Italia"
                },
                "url": "https://www.ctastudio.it/design/logo-design"
              },
              {
                "@type": "BreadcrumbList",
                "@id": "https://www.ctastudio.it/design/logo-design#breadcrumb",
                "itemListElement": [
                  {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Home",
                    "item": "https://www.ctastudio.it"
                  },
                  {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "Design",
                    "item": "https://www.ctastudio.it/design"
                  },
                  {
                    "@type": "ListItem",
                    "position": 3,
                    "name": "Logo Design",
                    "item": "https://www.ctastudio.it/design/logo-design"
                  }
                ]
              }
            ]
          }`,
  },
  //2-c Direzione artistica
  "69f1db4d0bc3f2a13ffe24e4": {
    active: true,
    json: `{
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebPage",
          "@id": "https://www.ctastudio.it/direzione-artistica#webpage",
          "url": "https://www.ctastudio.it/direzione-artistica",
          "name": "Direzione Artistica | Art direction per brand e siti web",
          "isPartOf": {
            "@id": "https://www.ctastudio.it#website"
          },
          "about": {
            "@id": "https://www.ctastudio.it/direzione-artistica#service"
          },
          "description": "CTA Studio cura la direzione artistica di brand, siti web e progetti digitali, trasformando identità, tono e visione in un linguaggio visivo coerente.",
          "image": {
            "@type": "ImageObject",
            "url": "https://cdn.prod.website-files.com/68b2e6c65a7f2a0ef027f56f/69f2226289bf4d196315b4a2_art-director.jpg"
          },
          "primaryImageOfPage": {
            "@type": "ImageObject",
            "url": "https://cdn.prod.website-files.com/68b2e6c65a7f2a0ef027f56f/69f2226289bf4d196315b4a2_art-director.jpg"
          },
          "breadcrumb": {
            "@id": "https://www.ctastudio.it/direzione-artistica#breadcrumb"
          }
        },
        {
          "@type": "Service",
          "@id": "https://www.ctastudio.it/direzione-artistica#service",
          "name": "Direzione artistica e art direction per brand e siti web",
          "serviceType": "Direzione artistica, art direction, direzione visiva, UI/UX design e design system",
          "description": "CTA Studio cura la direzione artistica di brand, siti web e progetti digitali, guidando visione creativa, identità visiva, interfacce, wireframe, prototipi e sistemi visivi coerenti.",
          "provider": {
            "@id": "https://www.ctastudio.it#organization"
          },
          "areaServed": {
            "@type": "Country",
            "name": "Italia"
          },
          "url": "https://www.ctastudio.it/direzione-artistica",
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Ambiti della direzione artistica",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Direzione visiva e identità coordinata",
                  "description": "Definizione della direzione visiva del brand attraverso concept, riferimenti, mood, linguaggio grafico e coerenza complessiva."
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Wireframe e prototipi in Figma",
                  "description": "Progettazione di wireframe, moodboard e prototipi in Figma per definire gerarchie, ritmo, atmosfera e prime soluzioni visive prima dello sviluppo."
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "UI/UX, design system e interfacce digitali",
                  "description": "Progettazione di interfacce, componenti riutilizzabili e sistemi visivi scalabili per esperienze digitali coerenti, leggibili e funzionali."
                }
              }
            ]
          }
        },
        {
          "@type": "BreadcrumbList",
          "@id": "https://www.ctastudio.it/direzione-artistica#breadcrumb",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://www.ctastudio.it"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Direzione Artistica",
              "item": "https://www.ctastudio.it/direzione-artistica"
            }
          ]
        }
      ]
    }`,
  },
  //contatti
  "68b2e6c65a7f2a0ef027f54b": {
    active: true,
    json: `{
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": "https://www.ctastudio.it/contatti#webpage",
      "url": "https://www.ctastudio.it/contatti",
      "name": "Contatti",
      "isPartOf": {
        "@id": "https://www.ctastudio.it#website"
      },
      "about": {
        "@id": "https://www.ctastudio.it#organization"
      },
      "description": "Raccontaci cosa vuoi costruire. CTA Studio progetta siti web professionali, brand identity e direzione artistica per progetti autentici. Inizia da qui.",
      "image": {
        "@type": "ImageObject",
        "url": "https://cdn.prod.website-files.com/68b2e6c65a7f2a0ef027f56f/69f4b980ea12f00417cd25b9_cta-studio.jpg"
      },
      "primaryImageOfPage": {
        "@type": "ImageObject",
        "url": "https://cdn.prod.website-files.com/68b2e6c65a7f2a0ef027f56f/69f4b980ea12f00417cd25b9_cta-studio.jpg"
      },
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://www.ctastudio.it"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Contatti",
            "item": "https://www.ctastudio.it/contatti"
          }
        ]
      }
    }`,
  },
  // studio
  "69e23192e5a6a6ccf16b5c2a": {
    active: true,
    json: `{
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "@id": "https://www.ctastudio.it/studio#webpage",
      "url": "https://www.ctastudio.it/studio",
      "name": "CTA Studio | Studio creativo digitale",
      "isPartOf": {
        "@id": "https://www.ctastudio.it#website"
      },
      "about": {
        "@id": "https://www.ctastudio.it#organization"
      },
      "mainEntity": {
        "@id": "https://www.ctastudio.it#organization"
      },
      "description": "CTA Studio è uno studio creativo indipendente che unisce strategia, design e sviluppo web per dare forma a progetti digitali umani, curati e riconoscibili.",
      "image": {
        "@type": "ImageObject",
        "url": "https://cdn.prod.website-files.com/68b2e6c65a7f2a0ef027f56f/69f4b980ea12f00417cd25b9_cta-studio.jpg"
      },
      "primaryImageOfPage": {
        "@type": "ImageObject",
        "url": "https://cdn.prod.website-files.com/68b2e6c65a7f2a0ef027f56f/69f4b980ea12f00417cd25b9_cta-studio.jpg"
      },
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://www.ctastudio.it"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Studio",
            "item": "https://www.ctastudio.it/studio"
          }
        ]
      }
    }`,
  },
  // progetti
  "69fb4ddff499fbbabf81ec26": {
    active: true,
    json: `  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://www.ctastudio.it/progetti#webpage",
    "url": "https://www.ctastudio.it/progetti",
    "name": "Progetti | Siti web, branding e design",
    "isPartOf": {
      "@id": "https://www.ctastudio.it#website"
    },
    "about": {
      "@id": "https://www.ctastudio.it#organization"
    },
    "description": "La nostra selezione di progetti di design, branding, siti web ed e-commerce, costruiti con strategia, cura visiva e attenzione all’esperienza utente.",
    "image": {
      "@type": "ImageObject",
      "url": "https://cdn.prod.website-files.com/68b2e6c65a7f2a0ef027f56f/69f4b980ea12f00417cd25b9_cta-studio.jpg"
    },
    "primaryImageOfPage": {
      "@type": "ImageObject",
      "url": "https://cdn.prod.website-files.com/68b2e6c65a7f2a0ef027f56f/69f4b980ea12f00417cd25b9_cta-studio.jpg"
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://www.ctastudio.it"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Progetti",
          "item": "https://www.ctastudio.it/progetti"
        }
      ]
    }
  }`,
  },
  // proposito
  "68b2e6c65a7f2a0ef027f553": {
    active: true,
    json: `{
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": "https://www.ctastudio.it/proposito/home#webpage",
  "url": "https://www.ctastudio.it/proposito/home",
  "name": "PROPOSITO - Il Web Magazine per ispirare, crescere e realizzare",
  "isPartOf": {
    "@id": "https://www.ctastudio.it#website"
  },
  "about": {
    "@id": "https://www.ctastudio.it#organization"
  },
  "publisher": {
    "@id": "https://www.ctastudio.it#organization"
  },
  "description": "Libero da pubblicità, promuove la libertà di pensiero e offre contenuti di qualità su marketing, design, innovazione e benessere.",
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.ctastudio.it"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Proposito",
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
        OnLoadHeroDefault();
      }

      const bp = window.bp;
      const isDesktop = !!bp?.is?.("lgUp");
      const isTouchDown = !!bp?.is?.("touchDown");

      function setupHomeSwiperLazyLoad() {
        const trigger = document.querySelector("#studio-wrapper");
        if (!trigger) return;

        let hasLoaded = false;
        let loadPromise = null;

        const loadSwiper = async () => {
          if (hasLoaded) return;
          hasLoaded = true;

          try {
            if (!loadPromise) {
              loadPromise = (async () => {
                if (!window.propositoAnimation) {
                  await loadScript(`${CTA_CDN}/cta-proposito.js`);
                }

                if (!window.Swiper) {
                  await loadScript(
                    "https://cdn.jsdelivr.net/npm/swiper@12/swiper-bundle.min.js",
                  );
                }
              })();
            }

            await loadPromise;

            window.propositoAnimation?.initializeSwiper?.();
          } catch (err) {
            console.error("Errore caricamento Proposito/Swiper Home:", err);
          }
        };

        if (!("IntersectionObserver" in window)) {
          setTimeout(loadSwiper, 8000);
          return;
        }

        const observer = new IntersectionObserver(
          (entries) => {
            if (!entries.some((entry) => entry.isIntersecting)) return;

            observer.disconnect();
            loadSwiper();
          },
          {
            rootMargin: "900px 0px",
            threshold: 0,
          },
        );

        observer.observe(trigger);

        window.pageSpecificListeners?.push(() => {
          observer.disconnect();
        });
      }

      if (isDesktop) {
        window.safeRequestIdleCallback(() => {
          ctaStickyTransition.reset();
          window.menuNavigation.heroMenuHover();
          scrollProgressLine();
        });
      } else if (isTouchDown) {
        window.safeRequestIdleCallback(() => {
          showcasePanelsScrollMobile();
          showcaseTextContentMobile();
          setupVerticalShowcaseButtons();
        });
      }

      window.safeRequestIdleCallback(() => {
        setupPrimaryButtons();
        setupShowcaseButtons();
      });

      setTimeout(() => {
        window.safeRequestIdleCallback(() => {
          try {
            window.serviceIntroAnimation?.init();
            initStudioWrapperIntro();
            initCtaContactsIntro();
            initPropositoHeaderIntro();

            setupHomeSwiperLazyLoad();

            window.footerManager?.refresh?.();
          } catch (err) {
            console.error("Errore esecuzione funzioni differite:", err);
          } finally {
            window.runFinalBoot?.();
          }
        });
      }, 2500);
    },

    cleanup: function () {
      cleanUpTriggers();
      cleanUpPageListeners();
    },
  },
  competenze: {
    execute: function () {
      if (!window.isBarbaTransition) {
        window.pageEnterFx?.introExpertise?.();
      }
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setupPrimaryButtons();
          initSkillWrapperIntro();
          expertisePanelsReveal();
        });
      });
      setTimeout(async () => {
        try {
          initSectionEmo();
          window.expertiseMarquee.init();
          if (
            window.footerManager &&
            typeof window.footerManager.refresh === "function"
          ) {
            window.footerManager?.refresh?.();
          }
        } catch (err) {
          console.error("Errore esecuzione funzioni differite:", err);
        } finally {
          window.runFinalBoot?.();
        }
      }, 2000);
    },
    cleanup: function () {
      cleanUpTriggers();
      cleanUpPageListeners();
    },
  },
  sitiWeb: {
    execute: function () {
      if (!window.isBarbaTransition) {
        window.pageEnterFx?.introExpertise?.();
      }
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          initProcessAccordion();
          setupPrimaryButtons();
          initSkillWrapperIntro();
          expertisePanelsReveal();
        });
      });
      setTimeout(async () => {
        try {
          initCtaContactsIntro();
          if (
            window.footerManager &&
            typeof window.footerManager.refresh === "function"
          ) {
            window.footerManager?.refresh?.();
          }
        } catch (err) {
          console.error("Errore esecuzione funzioni differite:", err);
        } finally {
          window.runFinalBoot?.();
        }
      }, 2000);
    },
    cleanup: function () {
      cleanUpTriggers();
      cleanUpPageListeners();
    },
  },
  sitiVetrina: {
    execute: function () {
      if (!window.isBarbaTransition) {
        window.pageEnterFx?.introExpertiseSub?.();
      }
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          initParallaxImages();
          initProcessAccordion();
          setupPrimaryButtons();
        });
      });
      setTimeout(async () => {
        try {
          initCtaContactsIntro();
          if (
            window.footerManager &&
            typeof window.footerManager.refresh === "function"
          ) {
            window.footerManager?.refresh?.();
          }
        } catch (err) {
          console.error("Errore esecuzione funzioni differite:", err);
        } finally {
          window.runFinalBoot?.();
        }
      }, 2000);
    },
    cleanup: function () {
      cleanUpTriggers();
      cleanUpPageListeners();
    },
  },
  sitiEcommerce: {
    execute: function () {
      if (!window.isBarbaTransition) {
        window.pageEnterFx?.introExpertiseSub?.();
      }
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          initParallaxImages();
          initProcessAccordion();
          setupPrimaryButtons();
        });
      });
      setTimeout(async () => {
        try {
          initCtaContactsIntro();
          if (
            window.footerManager &&
            typeof window.footerManager.refresh === "function"
          ) {
            window.footerManager?.refresh?.();
          }
        } catch (err) {
          console.error("Errore esecuzione funzioni differite:", err);
        } finally {
          window.runFinalBoot?.();
        }
      }, 2000);
    },
    cleanup: function () {
      cleanUpTriggers();
      cleanUpPageListeners();
    },
  },
  webApp: {
    execute: function () {
      if (!window.isBarbaTransition) {
        window.pageEnterFx?.introExpertiseSub?.();
      }
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          initParallaxImages();
          initProcessAccordion();
          setupPrimaryButtons();
        });
      });
      setTimeout(async () => {
        try {
          initCtaContactsIntro();
          if (
            window.footerManager &&
            typeof window.footerManager.refresh === "function"
          ) {
            window.footerManager?.refresh?.();
          }
        } catch (err) {
          console.error("Errore esecuzione funzioni differite:", err);
        } finally {
          window.runFinalBoot?.();
        }
      }, 2000);
    },
    cleanup: function () {
      cleanUpTriggers();
      cleanUpPageListeners();
    },
  },
  design: {
    execute: function () {
      if (!window.isBarbaTransition) {
        window.pageEnterFx?.introExpertise?.();
      }
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          initProcessAccordion();
          setupPrimaryButtons();
          initSkillWrapperIntro();
          expertisePanelsReveal();
        });
      });
      setTimeout(async () => {
        try {
          window.expertiseMarquee.init();
          initCtaContactsIntro();
          if (
            window.footerManager &&
            typeof window.footerManager.refresh === "function"
          ) {
            window.footerManager?.refresh?.();
          }
        } catch (err) {
          console.error("Errore esecuzione funzioni differite:", err);
        } finally {
          window.runFinalBoot?.();
        }
      }, 2000);
    },
    cleanup: function () {
      cleanUpTriggers();
      cleanUpPageListeners();
    },
  },
  brandIdentity: {
    execute: function () {
      if (!window.isBarbaTransition) {
        window.pageEnterFx?.introExpertiseSub?.();
      }
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          initParallaxImages();
          initProcessAccordion();
          setupPrimaryButtons();
        });
      });
      setTimeout(async () => {
        try {
          initCtaContactsIntro();
          if (
            window.footerManager &&
            typeof window.footerManager.refresh === "function"
          ) {
            window.footerManager?.refresh?.();
          }
        } catch (err) {
          console.error("Errore esecuzione funzioni differite:", err);
        } finally {
          window.runFinalBoot?.();
        }
      }, 2000);
    },
    cleanup: function () {
      cleanUpTriggers();
      cleanUpPageListeners();
    },
  },
  visualIdentity: {
    execute: function () {
      if (!window.isBarbaTransition) {
        window.pageEnterFx?.introExpertiseSub?.();
      }
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          initParallaxImages();
          initProcessAccordion();
          setupPrimaryButtons();
        });
      });
      setTimeout(async () => {
        try {
          initCtaContactsIntro();
          if (
            window.footerManager &&
            typeof window.footerManager.refresh === "function"
          ) {
            window.footerManager?.refresh?.();
          }
        } catch (err) {
          console.error("Errore esecuzione funzioni differite:", err);
        } finally {
          window.runFinalBoot?.();
        }
      }, 2000);
    },
    cleanup: function () {
      cleanUpTriggers();
      cleanUpPageListeners();
    },
  },
  logoDesign: {
    execute: function () {
      if (!window.isBarbaTransition) {
        window.pageEnterFx?.introExpertiseSub?.();
      }
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          initParallaxImages();
          initProcessAccordion();
          setupPrimaryButtons();
        });
      });
      setTimeout(async () => {
        try {
          initCtaContactsIntro();
          if (
            window.footerManager &&
            typeof window.footerManager.refresh === "function"
          ) {
            window.footerManager?.refresh?.();
          }
        } catch (err) {
          console.error("Errore esecuzione funzioni differite:", err);
        } finally {
          window.runFinalBoot?.();
        }
      }, 2000);
    },
    cleanup: function () {
      cleanUpTriggers();
      cleanUpPageListeners();
    },
  },
  direzioneArtistica: {
    execute: function () {
      if (!window.isBarbaTransition) {
        window.pageEnterFx?.introExpertise?.();
      }
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setupPrimaryButtons();
          initProcessAccordion();
        });
      });
      setTimeout(async () => {
        try {
          initCtaContactsIntro();
          if (
            window.footerManager &&
            typeof window.footerManager.refresh === "function"
          ) {
            window.footerManager?.refresh?.();
          }
        } catch (err) {
          console.error("Errore esecuzione funzioni differite:", err);
        } finally {
          window.runFinalBoot?.();
        }
      }, 2000);
    },
    cleanup: function () {
      cleanUpTriggers();
      cleanUpPageListeners();
    },
  },
  studio: {
    execute: function () {
      if (!window.isBarbaTransition) {
        window.pageEnterFx?.introExpertise?.();
      }
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setupPrimaryButtons();
          initStudioMsBlocks();
          initTeamCards();
          expertisePanelsReveal();
        });
      });
      setTimeout(async () => {
        try {
          initSectionEmo();
          window.expertiseMarquee.init();
          if (
            window.footerManager &&
            typeof window.footerManager.refresh === "function"
          ) {
            window.footerManager?.refresh?.();
          }
        } catch (err) {
          console.error("Errore esecuzione funzioni differite:", err);
        } finally {
          window.runFinalBoot?.();
        }
      }, 2000);
    },
    cleanup: function () {
      cleanUpTriggers();
      cleanUpPageListeners();
    },
  },
  progetti: {
    execute: function () {
      if (!window.isBarbaTransition) {
        window.pageEnterFx?.introProgetti?.();
      }
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setupPrimaryButtons();
          initProjectGridDirectionalHover();
        });
      });
      setTimeout(async () => {
        try {
          initCtaContactsIntro();
          if (
            window.footerManager &&
            typeof window.footerManager.refresh === "function"
          ) {
            window.footerManager?.refresh?.();
          }
        } catch (err) {
          console.error("Errore esecuzione funzioni differite:", err);
        } finally {
          window.runFinalBoot?.();
        }
      }, 2000);
    },
    cleanup: function () {
      cleanUpTriggers();
      cleanUpPageListeners();
    },
  },
  projectsDesign: {
    execute: function () {
      if (!window.isBarbaTransition) {
        window.pageEnterFx?.introProject?.();
      }
      projectCloseBtn();
      setupPrimaryButtons();
      setTimeout(async () => {
        try {
          if (
            window.footerManager &&
            typeof window.footerManager.refresh === "function"
          ) {
            window.footerManager?.refresh?.();
          }
        } catch (err) {
          console.error("Errore esecuzione funzioni differite:", err);
        } finally {
          window.runFinalBoot?.();
        }
      }, 2000);
    },
    cleanup: function () {
      cleanUpTriggers();
      cleanUpPageListeners();
    },
  },
  projectsArtDirector: {
    execute: function () {
      if (!window.isBarbaTransition) {
        window.pageEnterFx?.introProject?.();
      }
      projectCloseBtn();
      setupPrimaryButtons();
      initSliderCTA();
      setTimeout(async () => {
        try {
          if (
            window.footerManager &&
            typeof window.footerManager.refresh === "function"
          ) {
            window.footerManager?.refresh?.();
          }
        } catch (err) {
          console.error("Errore esecuzione funzioni differite:", err);
        } finally {
          window.runFinalBoot?.();
        }
      }, 2000);
    },
    cleanup: function () {
      cleanUpTriggers();
      cleanUpPageListeners();
    },
  },
  projectsEcommerce: {
    execute: function () {
      if (!window.isBarbaTransition) {
        window.pageEnterFx?.introProject?.();
      }
      projectCloseBtn();
      setupPrimaryButtons();
      initSliderCTA();
      setTimeout(async () => {
        try {
          if (
            window.footerManager &&
            typeof window.footerManager.refresh === "function"
          ) {
            window.footerManager?.refresh?.();
          }
        } catch (err) {
          console.error("Errore esecuzione funzioni differite:", err);
        } finally {
          window.runFinalBoot?.();
        }
      }, 2000);
    },
    cleanup: function () {
      cleanUpTriggers();
      cleanUpPageListeners();
    },
  },
  contatti: {
    execute: function () {
      if (!window.isBarbaTransition) {
        window.pageEnterFx?.introContact?.();
      }
      window.MultiStepForm?.init?.();
      window.AppGeneralForms?.init?.();
      calendar();
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setupPrimaryButtons();
          setupContactLinkButtons();
          setupContactFormModal();
        });
      });
      setTimeout(async () => {
        try {
          if (
            window.footerManager &&
            typeof window.footerManager.refresh === "function"
          ) {
            window.footerManager?.refresh?.();
            window.pageSpecificListeners.push({
              cleanup: () => {
                window.FormSubmitLock?.unlock?.();
                window.MultiStepForm?.closeCalendarOverlay?.();
                window.__calendarCleanup?.();
              },
            });
          }
        } catch (err) {
          console.error("Errore esecuzione funzioni differite:", err);
        } finally {
          window.runFinalBoot?.();
        }
      }, 2000);
    },
    cleanup: function () {
      cleanUpTriggers();
      cleanUpPageListeners();
    },
  },
  Proposito: {
    execute: function () {
      if (!window.isBarbaTransition) {
        window.pageEnterFx?.introProposito?.();
      }
      propositoAnimation.initializeSwiper();
      initPropositoMarquee();
      window.AppGeneralForms.init();
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setupPrimaryButtons();
        });
      });
      setTimeout(async () => {
        try {
          if (
            window.footerManager &&
            typeof window.footerManager.refresh === "function"
          ) {
            window.footerManager?.refresh?.();
          }
        } catch (err) {
          console.error("Errore esecuzione funzioni differite:", err);
        } finally {
          window.runFinalBoot?.();
        }
      }, 2000);
    },
    cleanup: function () {
      cleanUpTriggers();
      cleanUpPageListeners();
    },
  },
  blogPost: {
    execute: function () {
      if (!window.isBarbaTransition) {
        window.pageEnterFx?.introProposito?.();
      }
      setupScrollColorChange();
      videoPause();
      propositoAnimation.initializeSwiper();
      propositoAnimation.tagLinkAnimation();
      propositoAnimation.shareBtnAnimation();
      window.AppGeneralForms.init();
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setupPrimaryButtons();
        });
      });
      setTimeout(async () => {
        try {
          if (
            window.footerManager &&
            typeof window.footerManager.refresh === "function"
          ) {
            window.footerManager?.refresh?.();
          }
        } catch (err) {
          console.error("Errore esecuzione funzioni differite:", err);
        } finally {
          window.runFinalBoot?.();
        }
      }, 2000);
    },
    cleanup: function () {
      cleanUpTriggers();
      cleanUpPageListeners();
    },
  },
  blogCategory: {
    execute: function () {
      if (!window.isBarbaTransition) {
        window.pageEnterFx?.introProposito?.();
      }
      window.AppGeneralForms.init();
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setupPrimaryButtons();
        });
      });
      setTimeout(async () => {
        try {
          if (
            window.footerManager &&
            typeof window.footerManager.refresh === "function"
          ) {
            window.footerManager?.refresh?.();
          }
        } catch (err) {
          console.error("Errore esecuzione funzioni differite:", err);
        } finally {
          window.runFinalBoot?.();
        }
      }, 2000);
    },
    cleanup: function () {
      cleanUpTriggers();
      cleanUpPageListeners();
    },
  },
  blogTag: {
    execute: function () {
      if (!window.isBarbaTransition) {
        window.pageEnterFx?.introProposito?.();
      }
      window.AppGeneralForms.init();
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setupPrimaryButtons();
        });
      });
      setTimeout(async () => {
        try {
          if (
            window.footerManager &&
            typeof window.footerManager.refresh === "function"
          ) {
            window.footerManager?.refresh?.();
          }
        } catch (err) {
          console.error("Errore esecuzione funzioni differite:", err);
        } finally {
          window.runFinalBoot?.();
        }
      }, 2000);
    },
    cleanup: function () {
      cleanUpTriggers();
      cleanUpPageListeners();
    },
  },
  privacy: {
    execute: function () {
      if (!window.isBarbaTransition) {
        window.pageEnterFx?.introGenericPage?.();
      }
      setTimeout(async () => {
        try {
          if (
            window.footerManager &&
            typeof window.footerManager.refresh === "function"
          ) {
            window.footerManager?.refresh?.();
          }
        } catch (err) {
          console.error("Errore esecuzione funzioni differite:", err);
        } finally {
          window.runFinalBoot?.();
        }
      }, 2000);
    },
    cleanup: function () {
      cleanUpTriggers();
      cleanUpPageListeners();
    },
  },
  loginPage: {
    execute: function () {
      if (!window.isBarbaTransition) {
        window.pageEnterFx?.introGenericPage?.();
      }
      MultiStepForm.init();
      FirebaseAppManager.initLoginForm();
      window.AppPasswordToggleLogin.init();
      setupPrimaryButtons();
      setTimeout(() => {
        window.runFinalBoot?.();
      }, 2000);
      window.pageSpecificListeners.push({
        cleanup: () => {
          window.FormSubmitLock?.unlock?.();
        },
      });
    },
    cleanup: function () {
      cleanUpTriggers();
      cleanUpPageListeners();
    },
  },
  registrazione: {
    execute: function () {
      if (!window.isBarbaTransition) {
        window.pageEnterFx?.introGenericPage?.();
      }
      MultiStepForm.init();
      window.AppForms.init();
      window.AppPasswordToggle.init();
      setupPrimaryButtons();
      setTimeout(() => {
        window.runFinalBoot?.();
      }, 2000);
      window.pageSpecificListeners.push({
        cleanup: () => {
          window.FormSubmitLock?.unlock?.();
        },
      });
    },
    cleanup: function () {
      cleanUpTriggers();
      cleanUpPageListeners();
    },
  },
  resetPassword: {
    execute: function () {
      if (!window.isBarbaTransition) {
        window.pageEnterFx?.introGenericPage?.();
      }
      MultiStepForm.init();
      window.AppResetPassword.init();
      setupPrimaryButtons();
      setTimeout(() => {
        window.runFinalBoot?.();
      }, 2000);
      window.pageSpecificListeners.push({
        cleanup: () => {
          window.FormSubmitLock?.unlock?.();
        },
      });
    },
    cleanup: function () {
      cleanUpTriggers();
      cleanUpPageListeners();
    },
  },
  updatePassword: {
    execute: function () {
      if (!window.isBarbaTransition) {
        window.pageEnterFx?.introGenericPage?.();
      }
      MultiStepForm.init();
      window.AppUpdatePassword.init();
      window.AppPasswordToggle.init();
      setupPrimaryButtons();
      setTimeout(() => {
        window.runFinalBoot?.();
      }, 2000);
      window.pageSpecificListeners.push({
        cleanup: () => {
          window.FormSubmitLock?.unlock?.();
        },
      });
    },
    cleanup: function () {
      cleanUpTriggers();
      cleanUpPageListeners();
    },
  },
  verify: {
    execute: function () {
      if (!window.isBarbaTransition) {
        window.pageEnterFx?.introGenericPage?.();
      }
      setTimeout(() => {
        window.runFinalBoot?.();
      }, 2000);
    },
    cleanup: function () {
      cleanUpTriggers();
      cleanUpPageListeners();
    },
  },
  userPendingApproval: {
    execute: function () {
      if (!window.isBarbaTransition) {
        window.pageEnterFx?.introGenericPage?.();
      }
      setTimeout(() => {
        window.runFinalBoot?.();
      }, 2000);
    },
    cleanup: function () {
      cleanUpTriggers();
      cleanUpPageListeners();
    },
  },
  dashboard: {
    execute: function () {
      if (!window.isBarbaTransition) {
        window.pageEnterFx?.introGenericPage?.();
      }
      window.DashboardManager.init();
      setTimeout(() => {
        window.runFinalBoot?.();
      }, 2000);
      //toggleFaq();
    },
    cleanup: function () {
      cleanUpTriggers();
      cleanUpPageListeners();
    },
  },
  assessment: {
    execute: function () {
      if (!window.isBarbaTransition) {
        window.pageEnterFx?.introGenericPage?.();
      }
      window.AssessmentManager.init();
      window.MultiStepForm.init();
      window.AppAssessmentForms.init();
      setTimeout(() => {
        window.runFinalBoot?.();
      }, 2000);
      //toggleFaq();
    },
    cleanup: function () {
      cleanUpTriggers();
      cleanUpPageListeners();
    },
  },
  landing: {
    execute: function () {
      if (!window.isBarbaTransition) {
        window.pageEnterFx?.introExpertise?.();
      }
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setupPrimaryButtons();
          initSkillWrapperIntro();
          expertisePanelsReveal();
        });
      });
      setTimeout(async () => {
        try {
          initSectionEmo();
          window.expertiseMarquee.init();
          if (
            window.footerManager &&
            typeof window.footerManager.refresh === "function"
          ) {
            window.footerManager?.refresh?.();
          }
        } catch (err) {
          console.error("Errore esecuzione funzioni differite:", err);
        } finally {
          window.runFinalBoot?.();
        }
      }, 2000);
    },
    cleanup: function () {
      cleanUpTriggers();
      cleanUpPageListeners();
    },
  },
  valutazione: {
    execute: function () {
      if (!window.isBarbaTransition) {
        window.pageEnterFx?.introGenericPage?.();
      }
      MultiStepForm.init();
      window.AppGeneralForms.init();
      setupPrimaryButtons();
      setTimeout(() => {
        window.runFinalBoot?.();
      }, 2000);
      window.pageSpecificListeners.push({
        cleanup: () => {
          window.FormSubmitLock?.unlock?.();
        },
      });
    },
  },
  quattroZeroQuattro: {
    execute: function () {
      if (!window.isBarbaTransition) {
        window.pageEnterFx?.introGenericPage?.();
      }
      setupPrimaryButtons();
      setTimeout(() => {
        window.runFinalBoot?.();
      }, 2000);
    },
    cleanup: function () {
      cleanUpTriggers();
      cleanUpPageListeners();
    },
  },
};

window.__finalBootStarted = window.__finalBootStarted || false;
window.__authLoadPromise = window.__authLoadPromise || null;

window.runFinalBoot = function () {
  if (window.__finalBootStarted) return;
  window.__finalBootStarted = true;

  window.safeRequestIdleCallback(() => {
    setTimeout(async () => {
      try {
        if (!window.FirebaseAppManager) {
          window.__authLoadPromise =
            window.__authLoadPromise ||
            window.loadScript(`${CTA_CDN}/cta-auth.js`);

          await window.__authLoadPromise;
        }

        window.FirebaseAppManager?.init?.();
      } catch (err) {
        console.error("Errore caricamento/init cta-auth:", err);
      } finally {
        window.startCookieManager?.();
      }
    }, 1000);
  });
};

(function () {
  if (window.bp) return;

  const queries = {
    // atomic
    xsMax: "(max-width: 479px)",
    smMin: "(min-width: 480px)",
    mdMin: "(min-width: 768px)",
    lgMin: "(min-width: 992px)",

    // range (exclusive)
    xsOnly: "(max-width: 479px)",
    smOnly: "(min-width: 480px) and (max-width: 767px)",
    mdOnly: "(min-width: 768px) and (max-width: 991px)",
    lgUp: "(min-width: 992px)",

    // trasversali
    touchDown: "(max-width: 991px)", // sotto desktop (tablet+phone)
    phoneDown: "(max-width: 767px)", // phone
  };

  let mm = null;
  const flags = {};
  let initialized = false;

  function seed() {
    for (const [k, q] of Object.entries(queries)) {
      try {
        flags[k] = window.matchMedia(q).matches;
      } catch {
        flags[k] = false;
      }
    }
  }

  function init() {
    if (initialized) return;
    if (!window.gsap) {
      console.warn(
        "[bp] GSAP non trovato; inizializza GSAP prima di bp.init()",
      );
      return;
    }

    seed();

    mm = gsap.matchMedia();
    mm.add(queries, (ctx) => {
      for (const k in queries) flags[k] = !!ctx.conditions[k];
      document.dispatchEvent(
        new CustomEvent("breakpoints:change", { detail: { ...flags } }),
      );
    });

    initialized = true;
  }

  function destroy() {
    mm?.revert();
    mm = null;
    initialized = false;
  }

  function is(key) {
    return !!flags[key];
  }
  function use(map, cb) {
    return mm?.add(map, cb);
  }
  function get() {
    return { ...flags };
  }
  function onChange(fn) {
    const h = (e) => fn(e.detail);
    document.addEventListener("breakpoints:change", h);
    return () => document.removeEventListener("breakpoints:change", h);
  }

  window.bp = { init, destroy, is, use, get, onChange, queries };
})();

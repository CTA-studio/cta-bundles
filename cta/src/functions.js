const functions = {
    initBarbaWithGSAP,
    scrollToTopInstant,
    resetTransitionElementsButton,
    resetTransitionElementsButtonMenu,
    defaultEnterTransition,
    defaultSimpleTransition,
    transitionOnLoadHero,
    transitionOnLoadHeroDefault,
    animationPageEnterDesign,
    animationPageEnterWebDesign,
    animationPageEnterMarketing,
    animationPageEnterAbout,
    animationPageEnterWomen,
    createScrollTriggerScrollWrapper,
    showcasePanelsScrollMobile,
    showcaseTextContentMobile,
    propositoHomePage,   
    createScrollTriggerHero,
    pageServiceScrollTriggerDesign,
    pageServiceScrollTriggerWeb,
    pageServiceScrollTriggerSeo,
    pageServiceScrollTriggerAbout,
    pageServiceScrollTriggerWomen,
    ctaAnimations,
    serviceWrapper,
    servicePageWrapper,
    blogTransition,
    smoothScrollToTop,
    setupScrollToTop,
    setupScrollColorChange,
    secondSection,
    info,
    videoPause,
    toggleFaq,
    toggleButtonAnimation,
    toggleServiceSection,
    logoAnima,
    swiperUI,
    calendar,
    studioAnimations,
    startMarquee,
    startInfiniteMarquee,
    changePrice,
    initSliderCTA,
    setupGenericButtons,
    setupVerticalShowcaseButtons,
    setupShowcaseButtons,
    showcaseTransition,
    genericPageTitleAnimations,
    setupGenericCloseButtons,
    setupPageShowcaseButtons,
    setupVerticalContatti,
    globalCtaButton,
    scrollProgressLine,
    initCustomCursor,
    resetCustomCursor,    
  };

  Object.keys(functions).forEach(fn => {
    window[fn] = functions[fn];
  });

  export default { BurgerMenu: window.BurgerMenu, menuNavigation: window.menuNavigation, ctaStickyTransition: window.ctaStickyTransition, 
    propositoAnimation: window.propositoAnimation, ctaStickyLastWork: window.ctaStickyLastWork, };


  //Oggetti e Array Transition
  const transitionElementsObj = {
    transitionWrapper: document.querySelector(".transition-wrapper") || null, // Mantienilo per classi
    colorScuro: document.getElementById("color-scuro") || null,
    colorTransition: document.getElementById("color-transition") || null,
    brandScuro: document.getElementById("colore-punto-brand-scuro") || null,
    colorBackground:
      document.querySelectorAll(".color-background-transition") || null, // Mantienilo per NodeList
    brandLetters: {
      c: document.getElementById("brand-trans-c") || null,
      t: document.getElementById("brand-trans-t") || null,
      a: document.getElementById("brand-trans-a") || null,
    },
    brandSymbols: {
      puntoTrans: document.getElementById("colore-punto-brand-trans") || null,
      freccia: document.getElementById("brand-trans-freccia") || null,
      punto: document.getElementById("brand-trans-punto") || null,
    },
    colorDestinations: {
      destination: document.getElementById("color-destination") || null,
      background: document.getElementById("color-background-transition") || null,
    },
  };
  
  const transitionElements = [
    transitionElementsObj.transitionWrapper,
    transitionElementsObj.colorScuro,
    transitionElementsObj.colorTransition,
    transitionElementsObj.brandScuro,
    transitionElementsObj.colorBackground,
  ].filter((el) => el); // 🔹 Filtra elementi nulli
  
  const brandLetters = [
    transitionElementsObj.brandLetters.c,
    transitionElementsObj.brandLetters.t,
    transitionElementsObj.brandLetters.a,
  ].filter((el) => el);
  
  const brandSymbols = [
    transitionElementsObj.brandSymbols.puntoTrans,
    transitionElementsObj.brandSymbols.freccia,
    transitionElementsObj.brandSymbols.punto,
  ].filter((el) => el);
  
  const colorTransitions = [
    transitionElementsObj.colorDestinations.destination,
    transitionElementsObj.colorDestinations.background,
  ].filter((el) => el);
  //-----------------------------------------

//Oggetti e Array showcase Transition

const showcaseElementsObj = {
  transitionWrapper: document.getElementById("transition-wrapper-show") || null, // Mantienilo per classi
  colorTransition: document.getElementById("color-background-tshow") || null,
  brandLetters: {
    c: document.getElementById("brand-show-c") || null,
    t: document.getElementById("brand-show-t") || null,
    a: document.getElementById("brand-show-a") || null,
  },
};

const showElementsLetters = [
  showcaseElementsObj.brandLetters.c,
  showcaseElementsObj.brandLetters.t,
  showcaseElementsObj.brandLetters.a,
].filter((el) => el);

const showElements = [
  showcaseElementsObj.transitionWrapper,
  showcaseElementsObj.colorTransition,
  showcaseElementsObj.brandLetters.c,
  showcaseElementsObj.brandLetters.t,
  showcaseElementsObj.brandLetters.a,
].filter((el) => el);

  
  //Oggetti e Array Menu Transition
  const transitionElementMenuObj = {
    transitionMenuWrapper: document.querySelector(".transition-wrapper-menu") || null,
    puntoLogoNav: document.getElementById("colore-punto-brand-logoNav") || null,
    puntoChiaroMenu: document.getElementById("colore-punto-brand-chiaro-menu") || null,
    brandLettersMenu: {
      c: document.getElementById("brand-trans-c-menu") || null,
      t: document.getElementById("brand-trans-t-menu") || null,
      a: document.getElementById("brand-trans-a-menu") || null,
    },
    brandSymbolsMenu: {
      puntoMenu: document.getElementById("colore-punto-brand-menu") || null,
      frecciaMenu: document.getElementById("brand-trans-freccia-menu") || null,
      puntoTransMenu: document.getElementById("brand-trans-punto-menu") || null,
    },
    backgroundMenu: document.querySelector(".color-background-menu") || null, 
  };
  
  const transitionMenuArray = [
    transitionElementMenuObj.transitionMenuWrapper,
    transitionElementMenuObj.backgroundMenu,
    transitionElementMenuObj.brandSymbolsMenu.puntoMenu,
    transitionElementMenuObj.brandSymbolsMenu.frecciaMenu,
    transitionElementMenuObj.brandSymbolsMenu.puntoTransMenu,
    transitionElementMenuObj.brandLettersMenu.c,
    transitionElementMenuObj.brandLettersMenu.t,
    transitionElementMenuObj.brandLettersMenu.a,
    transitionElementMenuObj.puntoChiaroMenu,
  ].filter((el) => el); // 🔹 Filtra eventuali elementi nulli
  
  const brandLettersMenuArray = [
    transitionElementMenuObj.brandLettersMenu.c,
    transitionElementMenuObj.brandLettersMenu.t,
    transitionElementMenuObj.brandLettersMenu.a,
  ].filter((el) => el);
  
  const brandSymbolsMenuArray = [
    transitionElementMenuObj.brandSymbolsMenu.puntoMenu,
    transitionElementMenuObj.brandSymbolsMenu.frecciaMenu,
    transitionElementMenuObj.brandSymbolsMenu.puntoTransMenu,
  ].filter((el) => el);
  //-------------------------------------
  //Oggetti e Array Nav e Logo Header
  const header = {
    burgerBlock: document.getElementById("nav-burger") || null,
    logoMenu: document.getElementById("nav-logo") || null,
  };  
  const headerElements = Object.values(header).filter((el) => el);
  //-------------------------------------------------------------------
  //Oggetti e Array Elementi Menu e Burger
  const burgerElements = {
    menu: document.querySelector(".menu-container") || null,
    wrapper: document.querySelector(".menu-wrapper") || null,
    row: document.querySelector(".menu-wrapper-row") || null,
    lineWrapper: document.querySelector(".line-menu-wrapper") || null,
    burgerWrapper: document.querySelector(".burger-wrapper") || null,
    burgerClose: document.querySelector(".burger-close") || null,
    textMenu: document.querySelector(".text-menu") || null,
    logoNav: document.getElementById("colore-chiaro-logoNav") || null, // Ottimizzato con getElementById
    lines: {
      top: document.querySelector(".line-top") || null,
      middle: document.querySelector(".line-middle") || null,
      bottom: document.querySelector(".line-bottom") || null,
    },
  };  
  
  const backHomeLink = document.querySelector(".back-home-link") || null;
  const burger = document.getElementById("burger") || null;
  
  const menuWrapperElements = [
    burgerElements.wrapper,
    burgerElements.row,
    burgerElements.lineWrapper,
  ].filter((el) => el);
  
  const menuContainerTransitionElements = [
    burgerElements.menu,
    burgerElements.lineWrapper,
    burgerElements.row,
  ].filter((el) => el);
  
  const menuContainerElements = [
    burgerElements.menu,
    burgerElements.lineWrapper,
  ].filter((el) => el);
  
  const burgerLinesElements = [
    burgerElements.lines.bottom,
    burgerElements.lines.top,
  ].filter((el) => el);
  //

  const brandSymbolsArray = [
    document.getElementById("punto"),
    document.getElementById("colore-punto-brand"),
    document.getElementById("freccia"),
  ].filter((el) => el);
  
  const brandLettersArray = [
    document.getElementById("c"),
    document.getElementById("t"),
    document.getElementById("a"),
  ].filter((el) => el);
  
  let cursorNormal = null;
  let cursorGrab = null;
  let cursorGrabbing = null;
  let pulse = null;
  
  function cacheCursorElements() {
    if (!shouldEnableCustomCursor()) return;
    cursorNormal = document.getElementById("cursor-svg");
    cursorGrab = document.getElementById("cursor-svg-grab");
    cursorGrabbing = document.getElementById("cursor-svg-grabbing");
    pulse = document.getElementById("pulse-cursor");
  }
  

  window.BurgerMenu = window.BurgerMenu || {
    menuOpen: false,
    isHomePage: false, // Puoi passarlo dinamicamente quando necessario
  
    disableBackHomeLink() {
      if (backHomeLink) {
        backHomeLink.style.pointerEvents = "none";
        backHomeLink.style.cursor = "default";
      }
    },
  
    enableBackHomeLink() {
      if (backHomeLink) {
        backHomeLink.style.pointerEvents = "auto";
        backHomeLink.style.cursor = "pointer";
      }
    },
  
    disableBurgerClick() {
      if (burger) {
        burger.style.pointerEvents = "none";
      }
    },
  
    enableBurgerClick() {
      if (burger) {
        burger.style.pointerEvents = "auto";
      }
    },
  
    closeMenu(callback) {
      if (!this.menuOpen) {
        console.warn("Il menu è già chiuso. Ignoro l'animazione di chiusura.");
        if (callback) callback();
        return;
      }
      const dropdowns = document.querySelectorAll(".dropdown-menu");
      const tl = gsap.timeline({
        onComplete: () => {
          ScrollTrigger.refresh();
          gsap.set(menuWrapperElements, {
            clearProps: "all",
          });
          gsap.to(burgerElements.menu, {
            scrollTo: { y: 0, x: 0 },
          });
          if (burgerElements.wrapper) burgerElements.wrapper.setAttribute("inert", "");
          document.activeElement?.blur?.(); // per sicurezza
          this.menuOpen = false;
          this.enableBurgerHover();
          this.enableBackHomeLink();
          if (callback) callback();
          dropdowns.forEach((dropdown) => {
            if (dropdown.classList.contains("open")) {
              gsap.set(dropdown, { height: 0 });
              dropdown.classList.remove("open");
            }
          });
          burgerElements.burgerWrapper.setAttribute("aria-expanded", "false");
          burgerElements.burgerWrapper.setAttribute("aria-label", "Apri il Menu");
        },
      });
  
      tl.to(menuContainerElements, {
        opacity: 0,
        duration: 0,
        ease: "none",
      });
      if (window.matchMedia("(min-width: 768px)").matches) {
        tl.to(
          burgerElements.burgerWrapper,
          {
            width: "10rem",
            duration: 0.4,
            borderColor: "",
            borderWidth: "",
            ease: "power2.inOut",
          },
          0
        ).to(
          burgerElements.lines.middle,
          { width: "3.25rem", duration: 0.3, ease: "power2.inOut" },
          0
        );
      }
      if (
        window.matchMedia("(min-width: 480px) and (max-width: 767px)").matches
      ) {
        tl.to(
          burgerElements.burgerWrapper,
          {
            width: "8rem",
            duration: 0.4,
            borderColor: "",
            borderWidth: "",
            ease: "power2.inOut",
          },
          0
        ).to(
          burgerElements.lines.middle,
          { width: "2.75rem", duration: 0.2, ease: "power1.out" },
          0
        );
      }
      if (window.matchMedia("(max-width: 479px)").matches) {
        tl.to(
          burgerElements.burgerWrapper,
          {
            width: "7rem",
            duration: 0.4,
            borderColor: "",
            borderWidth: "",
            ease: "power2.inOut",
          },
          0
        ).to(
          burgerElements.lines.middle,
          { width: "2.5rem", duration: 0.2, ease: "power1.out" },
          0
        );
      }
      tl.to(
        burgerElements.burgerClose,
        {
          x: 0,
          ease: "power2.inOut",
          duration: 0.2,
        },
        "<"
      )
        .to(
          burgerLinesElements,
          { y: 0, rotationZ: 0, duration: 0.3, ease: "power1.out" },
          "<"
        )
        .to(
          burgerElements.wrapper,
          {
            y: "-100vh",
            duration: 0.4,
            ease: "power2.inOut",
          },
          "-=0.4"
        )
        .to(
          burgerElements.logoNav,
          { y: "0%", duration: 0.4, ease: "power2.out" },
          "-=0.2"
        )
        .to(
          burgerElements.textMenu,
          {
            scale: 1,
            duration: 0.2,
            ease: "power1.inOut",
          },
          "-=0.4"
        );
    },
  
    closeMenuTransition() {
      const dropdowns = document.querySelectorAll(".dropdown-menu");
      if (!this.menuOpen) {
        return;
      }
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.to(burgerElements.menu, {
            scrollTo: { y: 0, x: 0 },
          });
          if (burgerElements.wrapper) burgerElements.wrapper.setAttribute("inert", "");
          document.activeElement?.blur?.(); // per sicurezza
          this.menuOpen = false;
          this.enableBurgerHover();
          this.enableBackHomeLink();
          dropdowns.forEach((dropdown) => {
            if (dropdown.classList.contains("open")) {
              gsap.set(dropdown, { height: 0 }); // 🔹 Chiude immediatamente senza animazione
              dropdown.classList.remove("open");
            }
          });
           burgerElements.burgerWrapper.setAttribute("aria-expanded", "false");
          burgerElements.burgerWrapper.setAttribute("aria-label", "Apri il Menu");
        },
      });
  
      if (window.matchMedia("(min-width: 768px)").matches) {
        tl.to(
          burgerElements.burgerWrapper,
          {
            width: "10rem",
            duration: 0.4,
            borderColor: "",
            borderWidth: "",
            ease: "power2.inOut",
          },
          0
        ).to(
          burgerElements.lines.middle,
          { width: "3.25rem", duration: 0.3, ease: "power2.inOut" },
          0
        );
      }
      if (
        window.matchMedia("(min-width: 480px) and (max-width: 767px)").matches
      ) {
        tl.to(
          burgerElements.burgerWrapper,
          {
            width: "8rem",
            duration: 0.4,
            borderColor: "",
            borderWidth: "",
            ease: "power2.inOut",
          },
          0
        ).to(
          burgerElements.lines.middle,
          { width: "2.75rem", duration: 0.2, ease: "power1.out" },
          0
        );
      }
      if (window.matchMedia("(max-width: 479px)").matches) {
        tl.to(
          burgerElements.burgerWrapper,
          {
            width: "7rem",
            duration: 0.4,
            borderColor: "",
            borderWidth: "",
            ease: "power2.inOut",
          },
          0
        ).to(
          burgerElements.lines.middle,
          { width: "2.5rem", duration: 0.2, ease: "power1.out" },
          0
        );
      }
      tl.to(
        burgerElements.burgerClose,
        {
          x: 0,
          ease: "power2.inOut",
          duration: 0.2,
        },
        "<"
      )
        .to(
          burgerLinesElements,
          {
            y: 0,
            rotationZ: 0,
            duration: 0.3,
            ease: "power2.inOut",
          },
          "<"
        )
        .to(
          burgerElements.textMenu,
          {
            scale: 1,
            duration: 0.2,
            ease: "power1.inOut",
          },
          "-=0.2"
        )
        .to(burgerElements.logoNav, {
          y: "0%",
          duration: 0.6,
          ease: "power2.out",
        });
    },
  
    animateBurgerHover() {
      if (!burger) {
        console.error("Burger element not found");
        return;
      }
  
      if (!burgerElements.lines.middle || !burgerElements.burgerWrapper) {
        console.error("One or more line elements not found");
        return;
      }
  
      const timeline = gsap.timeline({ paused: true });
  
      timeline
        .to(burgerElements.lines.middle, {
          width: "24px",
          duration: 0.2,
          ease: "power1.out",
        })
        .to(
          burgerElements.burgerWrapper,
          {
            width: "9rem",
            duration: 0.2,
            borderColor: "#feffec",
            ease: "power1.out",
          },
          0
        );
  
      const onMouseEnter = () => {
        if (!this.menuOpen) timeline.play();
      };
  
      const onMouseLeave = () => {
        if (!this.menuOpen) timeline.reverse();
      };
  
      burger.addEventListener("mouseenter", onMouseEnter);
      burger.addEventListener("mouseleave", onMouseLeave);
  
      this.disableBurgerHover = () => {
        burger.removeEventListener("mouseenter", onMouseEnter);
        burger.removeEventListener("mouseleave", onMouseLeave);
      };
  
      this.enableBurgerHover = () => {
        timeline.seek(0).pause(); // Resetta la timeline allo stato iniziale
        burger.addEventListener("mouseenter", onMouseEnter);
        burger.addEventListener("mouseleave", onMouseLeave);
      };
    },
  
    animateBurger(callback) {
      const tl = gsap.timeline({
        onComplete: () => {
          if (callback) callback();
          burgerElements.burgerWrapper.setAttribute("aria-expanded", "true");
          burgerElements.burgerWrapper.setAttribute("aria-label", "Chiudi il Menu");
        },
      });
  
      if (!this.menuOpen) {
        this.disableBurgerHover();
        this.disableBackHomeLink();
        gsap.set(burgerElements.wrapper, { visibility: "visible" });
        if (burgerElements.wrapper) burgerElements.wrapper.removeAttribute("inert");

  
        tl.to(burgerElements.row, {
          y: "0vh",
          duration: 0.6,
          ease: "power3.inOut",
        })
          .to(
            burgerElements.lines.middle,
            { width: 0, duration: 0.2, ease: "power2.inOut" },
            "<"
          )
          .to(
            burgerElements.textMenu,
            {
              scale: 0,
              duration: 0.2,
              ease: "power2.inOut",
            },
            "<"
          );
        if (window.matchMedia("(min-width: 768px)").matches) {
          tl.to(
            burgerElements.lines.top,
            {
              y: 8, // Valore standard
              rotationZ: -45,
              duration: 0.3,
              ease: "power1.out",
            },
            "<"
          ).to(
            burgerElements.lines.bottom,
            {
              y: -8, // Valore standard
              rotationZ: 45,
              duration: 0.3,
              ease: "power1.out",
            },
            "<"
          );
        }
        if (window.matchMedia("(max-width: 767px)").matches) {
          tl.to(
            burgerElements.lines.top,
            {
              y: 7, // Valore standard
              rotationZ: -45,
              duration: 0.3,
              ease: "power1.out",
            },
            "<"
          ).to(
            burgerElements.lines.bottom,
            {
              y: -7, // Valore standard
              rotationZ: 45,
              duration: 0.3,
              ease: "power1.out",
            },
            "<"
          );
        }
  
        if (window.matchMedia("(min-width: 768px)").matches) {
          tl.to(
            burgerElements.burgerWrapper,
            {
              width: "3.875rem",
              duration: 0.4,
              borderColor: "var(--linear-grad1)",
              borderWidth: "2px",
              ease: "power2.inOut",
            },
            "-=0.5"
          ).to(
            burgerElements.burgerClose,
            {
              x: 9,
              duration: 0.2,
              ease: "power2.inOut",
            },
            "<"
          );
        }
        if (
          window.matchMedia("(min-width: 480px) and (max-width: 767px)").matches
        ) {
          tl.to(
            burgerElements.burgerWrapper,
            {
              width: "3.25rem",
              duration: 0.4,
              borderColor: "var(--linear-grad1)",
              borderWidth: "2px",
              ease: "power2.inOut",
            },
            "-=0.5"
          ).to(
            burgerElements.burgerClose,
            {
              x: 7,
              duration: 0.2,
              ease: "power2.inOut",
            },
            "<"
          );
        }
        if (window.matchMedia("(max-width: 479px)").matches) {
          tl.to(
            burgerElements.burgerWrapper,
            {
              width: "2.875rem",
              duration: 0.4,
              borderColor: "var(--linear-grad1)",
              borderWidth: "2px",
              ease: "power2.inOut",
            },
            "-=0.5"
          ).to(
            burgerElements.burgerClose,
            {
              x: 6,
              duration: 0.2,
              ease: "power2.inOut",
            },
            "<"
          );
        }
        tl.to(
          burgerElements.logoNav,
          {
            y: "-100%",
            duration: 0.3,
            ease: "power2.out",
          },
          "-=0.2"
        )
          .to(
            burgerElements.menu,
            {
              opacity: 1,
              duration: 0.3,
              ease: "power1.out",
            },
            "-=0.2"
          )
          .to(
            burgerElements.lineWrapper,
            {
              width: "100%",
              duration: 0.6,
              ease: "power2.inOut",
            },
            "-=0.2"
          );
  
        this.menuOpen = true; // Imposta lo stato del menu come aperto
      } else {
        this.closeMenu(callback);
      }
    },
  
    init() {
      if (burger) {
        burger.addEventListener("click", () => this.animateBurger());
      }
      this.animateBurgerHover(); // Inizializza l'hover del burger
       if (!this.menuOpen && burgerElements.wrapper) {
    burgerElements.wrapper.setAttribute("inert", "");
  }
    },
  };
  
  window.menuNavigation = window.menuNavigation || {
    timelines: {}, // Per gestire le timeline di ogni elemento
  
    initializeHoverAnimations: function () {
      const boxes = document.querySelectorAll(".link-wrapper-menu");
  
      if (!boxes.length) return;
  
      const mm = gsap.matchMedia();
  
      // 🔹 Desktop (≥992px) → Rimane invariato con effetto direzionale
      mm.add("(min-width: 992px)", () => {
        boxes.forEach((box, index) => {
          const hoverTimeline = gsap.timeline({ paused: true });
  
          const color = box.querySelector(".link-hover");
          const freccia = box.querySelectorAll(".arrow-link-navabar");
          const link = box.querySelector(".link-heading");
          const subLink = box.querySelector(".sublink");
  
          function getMouseDirection(e, element) {
            let { height, top } = element.getBoundingClientRect();
            let mouseY = e.clientY - top;
            return mouseY < height / 2 ? "top" : "bottom";
          }
  
          box.addEventListener("mouseenter", (e) => {
            let direction = getMouseDirection(e, box);
            let startY = direction === "top" ? "-100%" : "100%";
            gsap.set(color, { y: startY });
  
            gsap.to(color, { y: 0, duration: 0.3, ease: "power2.out" });
  
            hoverTimeline.restart();
          });
  
          box.addEventListener("mouseleave", (e) => {
            let direction = getMouseDirection(e, box);
            let endY = direction === "top" ? "-100%" : "100%";
  
            gsap.to(color, {
              y: endY,
              duration: 0.35,
              ease: "power2.in",
              onComplete: () => {
                gsap.set(color, { clearProps: "y" });
              },
            });
  
            hoverTimeline.reverse();
  
            hoverTimeline.eventCallback("onReverseComplete", () => {
              setTimeout(() => {
                gsap.set([color, freccia, link, subLink], { clearProps: "all" });
              }, 100);
            });
          });
  
          this.createTimeline(hoverTimeline, { color, freccia, link, subLink });
          this.timelines[`box-${index}`] = { hoverTimeline };
        });
      });
  
      // 🔹 Mobile (≤991px) → Il div colorato sale come su desktop (senza direzione del mouse)
      mm.add("(max-width: 991px)", () => {
        boxes.forEach((box, index) => {
          const touchTimeline = gsap.timeline({ paused: true });
  
          const color = box.querySelector(".link-hover");
          const freccia = box.querySelectorAll(".arrow-link-navabar");
          const link = box.querySelector(".link-heading");
          const subLink = box.querySelector(".sublink");
  
          // Creazione della timeline per il touch (senza direzione)
          touchTimeline
            .to(color, { y: 0, duration: 0.3, ease: "power2.inOut" })
            .to(
              freccia,
              {
                x: "100%",
                color: "#feffec",
                duration: 0.3,
                ease: "power2.inOut",
              },
              "<"
            )
            .to(
              [link, subLink],
              { color: "#feffec", duration: 0.3, ease: "power2.inOut" },
              "<"
            );
  
          box.addEventListener("touchstart", () => touchTimeline.play(), {
            passive: true,
          });
  
          box.addEventListener("touchend", () => {
            touchTimeline.reverse();
            touchTimeline.eventCallback("onReverseComplete", () => {
              gsap.set([color, freccia, link, subLink], { clearProps: "all" });
            });
          });
  
          this.timelines[`box-${index}`] = { touchTimeline };
        });
      });
    },
  
    createTimeline: function (timeline, { color, freccia, link, subLink }) {
      timeline
        .to(freccia, {
          x: "100%",
          color: "#feffec",
          duration: 0.3,
          ease: "power2.out",
        })
        .to(
          [link, subLink],
          {
            color: "#feffec",
            duration: 0.2,
            ease: "power2.out",
          },
          "<"
        );
    },
  
    handleLinkMenuHover: function () {
      // Attiva la funzione solo su schermi > 992px
      if (window.innerWidth <= 992) return;
  
      // Seleziona tutti gli elementi .link-menu-desk
      const containers = document.querySelectorAll(".link-menu-desk");
  
      if (containers.length === 0) return;
  
      containers.forEach((container) => {
        // Trova .dot-menu-desk e .dot-menu-color all'interno del container
        const dotContainer = container.querySelector(".dot-menu-desk");
        const dot = dotContainer
          ? dotContainer.querySelector(".dot-menu-color")
          : null;
        const freccia = dotContainer
          ? dotContainer.querySelector(".arrow-menu-desk")
          : null;
  
        if (!dot) return;
  
        // Aggiungi eventi hover
        container.addEventListener("mouseenter", () => {
          gsap
            .timeline()
            .to(dot, {
              scale: 0,
              transformOrigin: "bottom left",
              duration: 0.3,
              ease: "power1.out",
            })
            .to(
              freccia,
              {
                scale: 1,
                duration: 0.3,
                ease: "power1.out",
              },
              "<"
            )
            .to(
              container,
              {
                borderColor: "#feffec",
                duration: 0.3,
                ease: "power1.out",
              },
              "<"
            );
        });
  
        container.addEventListener("mouseleave", () => {
          gsap
            .timeline()
            .to(dot, {
              scale: 1,
              duration: 0.3,
              ease: "power1.out",
            })
            .to(
              freccia,
              {
                scale: 0,
                duration: 0.3,
                ease: "power1.out",
              },
              "<"
            )
            .to(
              container,
              {
                borderColor: "",
                duration: 0.3,
                ease: "power1.out",
              },
              "<"
            );
        });
      });
    },
    simpleLinkMenuHover: function () {
      // Seleziona tutti gli elementi .link-menu-menu
      const containers = document.querySelectorAll(".link-menu-menu");
  
      if (containers.length === 0) return;
  
      containers.forEach((container) => {
        // Trova .dot-menu-menu e gli elementi figli
        const dotContainer = container.querySelector(".dot-menu-menu");
        const dot = dotContainer.querySelector(".dot-menu-color-menu");
        const freccia = dotContainer.querySelector(".arrow-menu-menu");
  
        // Funzione per animazione hover/touchstart
        const onEnter = () => {
          gsap
            .timeline()
            .to(dot, {
              scale: 0,
              transformOrigin: "bottom left",
              duration: 0.3,
              ease: "power1.out",
            })
            .to(
              freccia,
              {
                scale: 1,
                duration: 0.3,
                ease: "power1.out",
              },
              "<"
            );
        };
  
        // Funzione per animazione mouseleave/touchend
        const onLeave = () => {
          gsap
            .timeline()
            .to(dot, {
              scale: 1,
              duration: 0.3,
              ease: "power1.out",
            })
            .to(
              freccia,
              {
                scale: 0,
                duration: 0.3,
                ease: "power1.out",
              },
              "<"
            );
        };
  
        // Aggiungi eventi hover per desktop
        container.addEventListener("mouseenter", onEnter);
        container.addEventListener("mouseleave", onLeave);
  
        // Aggiungi eventi touch per dispositivi mobili
        container.addEventListener("touchstart", () => {
          onEnter();
        });
  
        container.addEventListener("touchend", () => {
          onLeave();
        });
      });
    },
  
    handleActiveLink: function () {
      const menuLinks = document.querySelectorAll(".link-wrapper-menu");
      const activeLink = document.querySelector(".link-wrapper-menu.w--current");
  
      // Resetta gli stili di tutti i link
      menuLinks.forEach((link) => {
        gsap.set(link, {
          clearProps: "all", // Ripristina tutti gli stili inline
        });
  
        // Ripristina il click sui link non attivi
        link.style.pointerEvents = "auto";
        link.style.cursor = "pointer";
      });
  
      // Se non esiste un link attivo, interrompi l'esecuzione
      if (!activeLink) {
        return; // Esci dalla funzione
      }
  
      // Applica l'animazione al link attivo
      gsap.to(activeLink, {
        color: "var(--linear-grad1)",
        opacity: 0.7, // Cambia l'opacità
      });
  
      // Disabilita il click sul link attivo
      activeLink.addEventListener("click", (event) => {
        event.preventDefault();
      });
  
      // Disabilita completamente i click e cambia il cursore sul link attivo
      activeLink.style.pointerEvents = "none";
      activeLink.style.cursor = "default";
    },
  
    shareBtnAnimation: function () {
      const shareBtns = document.querySelectorAll(".share-btn");
  
      shareBtns.forEach((btn) => {
        const svgCont = btn.querySelector(".svg-cont");
        let context = gsap.context(() => {
          function animateSvgCont(show) {
            gsap.to(svgCont, {
              duration: 0.3,
              opacity: show ? 1 : 0,
              right: show ? 0 : "auto",
              ease: "power1.out",
            });
          }
  
          btn.addEventListener("mouseenter", () => animateSvgCont(true));
          btn.addEventListener("mouseleave", () => animateSvgCont(false));
          btn.addEventListener("touchstart", () => animateSvgCont(true));
          btn.addEventListener("touchend", () => animateSvgCont(false));
        }, btn);
      });
    },
    animateUSPLinks: function () {
      const links = document.querySelectorAll(".usp-text-link");
  
      links.forEach((link) => {
        // Seleziona il contenitore interno e le parentesi
        const innerText = link.querySelector(".text-link-inner");
        const parenthesisLeft = innerText?.querySelector(".parentesi.sx");
        const parenthesisRight = innerText?.querySelector(".parentesi.dx");
  
        if (!parenthesisLeft || !parenthesisRight) {
          console.error("Parentheses not found in the link:", link);
          return;
        }
  
        // Determina il colore dell'underline e del testo in base alla classe
        let underlineColor = "#ff006e"; // Colore di default
        if (link.classList.contains("sviluppo")) {
          underlineColor = "#00aeff";
        } else if (link.classList.contains("design")) {
          underlineColor = "#ff8719";
        }
  
        const hoverTimeline = gsap.timeline({ paused: true });
  
        // Animazione per le parentesi
        hoverTimeline
          .to(parenthesisLeft, {
            x: "-10px", // Sposta la parentesi sx
            opacity: 0, // Nascondi gradualmente
            duration: 0.3,
            ease: "power1.out",
          })
          .to(
            parenthesisRight,
            {
              x: "10px", // Sposta la parentesi dx
              opacity: 0, // Nascondi gradualmente
              duration: 0.3,
              ease: "power1.out",
            },
            "<"
          )
          // Cambia il colore del testo e aggiungi underline
          .to(
            link,
            {
              textDecoration: "underline",
              textUnderlineOffset: "5px", // Distanza dell'underline dal testo
              color: underlineColor, // Cambia colore del testo e underline
              duration: 0.3,
              ease: "power1.out",
            },
            "<"
          );
  
        // Eventi hover e touch
        link.addEventListener("mouseenter", () => hoverTimeline.play());
        link.addEventListener("mouseleave", () => hoverTimeline.reverse());
  
        // Gestione del touch per dispositivi mobili
        link.addEventListener("touchstart", () => hoverTimeline.play(), {
          passive: true,
        });
        link.addEventListener("touchend", () => hoverTimeline.reverse(), {
          passive: true,
        });
      });
    },
  
    userAccount: function () {
      const dropdownWrappers = document.querySelectorAll(
        ".dropdown-menu-wrapper"
      );
  
      if (!dropdownWrappers.length) return; // 🔹 Esci se nessun dropdown trovato
  
      dropdownWrappers.forEach((wrapper) => {
        const dropdownMenu = wrapper.querySelector(".dropdown-menu");
        const trigger = wrapper.querySelector(".dropdown-menu-content"); // 🔹 Click su questo
  
        if (!dropdownMenu || !trigger) return;
  
        // 🔹 Colori originali e di hover
        const defaultColor = getComputedStyle(trigger).color;
        const hoverColor = "var(--primary)";
  
        let isTouchDevice =
          "ontouchstart" in window || navigator.maxTouchPoints > 0;
  
        // 🔹 Funzione per aprire/chiudere il dropdown
        const toggleDropdown = (event) => {
          event.preventDefault();
  
          const isOpen = dropdownMenu.classList.contains("open");
  
          if (isOpen) {
            gsap.to(dropdownMenu, {
              height: 0,
              duration: 0.3,
              ease: "power2.in",
            });
            trigger.classList.remove("active");
            dropdownMenu.classList.remove("open");
          } else {
            gsap.to(dropdownMenu, {
              height: "auto", // 🔥 Animiamo direttamente "auto"
              duration: 0.4,
              ease: "power2.0ut",
            });
            trigger.classList.add("active");
            dropdownMenu.classList.add("open");
          }
        };
  
        // 🔹 Funzione hover - cambia il colore
        const hoverIn = () => {
          gsap.to(trigger, {
            color: hoverColor,
            duration: 0.2,
            ease: "power1.out",
          });
        };
  
        // 🔹 Funzione hover end - ritorna al colore originale
        const hoverOut = () => {
          gsap.to(trigger, {
            color: defaultColor,
            duration: 0.2,
            ease: "power1.in",
          });
        };
  
        // 🔹 Aggiunge il listener per il click
        trigger.addEventListener("click", toggleDropdown);
  
        // 🔹 Aggiunge i listener per hover (solo su dispositivi non-touch)
        if (!isTouchDevice) {
          trigger.addEventListener("mouseenter", hoverIn);
          trigger.addEventListener("mouseleave", hoverOut);
        }
  
        // 🔹 Gestione del touch su dispositivi mobili
        if (isTouchDevice) {
          trigger.addEventListener("touchstart", (e) => {
            hoverIn();
            toggleDropdown(e);
          });
  
          trigger.addEventListener("touchend", (e) => {
            setTimeout(() => {
              hoverOut();
            }, 300); // Ritardo per evitare conflitto tra hover e chiusura
          });
        }
      });
    },
  
    init: function () {
      this.initializeHoverAnimations();
      this.shareBtnAnimation();
      this.handleActiveLink();
      this.handleLinkMenuHover();
      this.animateUSPLinks();
      this.simpleLinkMenuHover();
      this.userAccount();
    },
  };

//BARBA  
window.isBarbaTransition = false;

function initBarbaWithGSAP() {
  if (typeof barba === "undefined" || typeof gsap === "undefined") {
    console.error("Barba.js o GSAP non sono stati caricati correttamente.");
    return;
  }

  barba.init({
    //debug: true,
    timeout: 5000,
    transitions: [
      {
        name: "button-transition",
        from: {
          custom: ({ trigger }) =>
            trigger instanceof HTMLElement &&
            trigger.getAttribute("data-custom") === "button",
        },
        leave(data) {
        window.isBarbaTransition = true; 
          const done = this.async();
          gsap.set(transitionElementsObj.transitionWrapper, {
            visibility: "visible",
          });
          gsap
            .timeline({
              onComplete: () => {
                done();
              },
            })
            .call(() => {
              BurgerMenu.disableBurgerClick();
            })
            .to(header.burgerBlock, {
              scale: 1,
              duration: 0.4,
              ease: "expo.out",
            })
            .to(
              data.current.container,
              {
                y: "-100vh",
                duration: 0.8,
                ease: "power3.inOut",
              },
              0
            )
            .to(
              transitionElementsObj.transitionWrapper,
              {
                y: "0vh",
                duration: 0.8,
                ease: "power3.inOut",
              },
              0
            );
        },
        afterLeave(data) {
          // Controlla se stai entrando nella home
          if (data.current.namespace === "home") {
            ScrollTrigger.getAll().forEach((trigger) => {
              if (
                trigger.vars.id &&
                trigger.vars.id.startsWith("hero-trigger")
              ) {
                trigger.kill();
              }
            });
          }
        },
        enter(data) {
          const done = this.async();
          const pageTl = gsap.timeline({
            onComplete: () => {
              resetTransitionElementsButton();
              lenisInstance.start();
              BurgerMenu.enableBurgerClick();
            },
          });
          pageTl
            .call(() => {
              done();
              BurgerMenu.disableBurgerClick();
            })
            .to(transitionElementsObj.colorScuro, {
              delay: 0.2,
              y: "-100vh",
              duration: 0.4,
              ease: "power2.inOut",
            })
            .to(
              transitionElementsObj.colorDestinations.destination,
              {
                y: "0vh",
                duration: 0.4,
                ease: "power3.inOut",
              },
              "<"
            )
            .to(
              transitionElementsObj.colorTransition,
              {
                y: "0vh",
                duration: 0.6,
                ease: "power3.inOut",
              },
              "-=0.2"
            )

            .to(
              transitionElementsObj.brandScuro,
              {
                scale: 0,
                transformOrigin: "center center",
                duration: 0.2,
                ease: "power1.inOut",
              },
              "-=0.6"
            )
            .to(
              brandLetters,
              {
                y: "100vh",
                duration: 0.6,
                ease: "power1.inOut",
                stagger: 0.2,
              },
              "-=0.2"
            )
            .to(
              brandSymbols,
              {
                y: "100vh",
                duration: 0.6,
                ease: "power1.inOut",
              },
              "<"
            )
            .to(
              transitionElementsObj.colorBackground,
              {
                y: "100vh",
                duration: 1.2,
                ease: "power2.inOut",
              },
              "-=0.8"
            )
            .set(
              colorTransitions,
              {
                opacity: 0,
              },
              "<"
            );
        },
        after(data) {
          updatePageMetaAndInteractions(data.next.html);
          initializeMainFunctions();
          lenisInstance.update();
          scrollToTopInstant();
          lenisInstance.stop();
          if (!cookieManager.getCookie("cta")) {
            uiManager.showBanner();
          }
        },
      },
      {
        name: "lateral-transition",
        from: {
          custom: ({ trigger }) =>
            trigger instanceof HTMLElement &&
            trigger.getAttribute("data-custom") === "lateral",
        },
        leave(data) {
            window.isBarbaTransition = true; 
          const done = this.async();
          gsap.set(transitionElementsObj.transitionWrapper, {
            visibility: "visible",
            y: 0,
            x: "100vw",
          });
          gsap
            .timeline({
              onComplete: () => {
                done();
              },
            })
            .call(() => {
              BurgerMenu.disableBurgerClick();
            })
            .to(header.burgerBlock, {
              scale: 1,
              duration: 0.4,
              ease: "expo.out",
            })
            .to(
              data.current.container,
              {
                x: "-100vw",
                duration: 0.8,
                ease: "power3.inOut",
              },
              0
            )
            .to(
              transitionElementsObj.transitionWrapper,
              {
                x: "0vw",
                duration: 0.8,
                ease: "power3.inOut",
              },
              0
            );
        },
        afterLeave(data) {
          // Controlla se stai entrando nella home
          if (data.current.namespace === "home") {
            ScrollTrigger.getAll().forEach((trigger) => {
              if (
                trigger.vars.id &&
                trigger.vars.id.startsWith("hero-trigger")
              ) {
                trigger.kill();
              }
            });
          }
        },
        enter(data) {
          const done = this.async();
          const pageTl = gsap.timeline({
            onComplete: () => {
              resetTransitionElementsButton();
              lenisInstance.start();
              BurgerMenu.enableBurgerClick();
            },
          });
          pageTl
            .call(() => {
              done();
              BurgerMenu.disableBurgerClick();
            })
            .to(transitionElementsObj.colorScuro, {
              delay: 0.2,
              y: "-100vh",
              duration: 0.4,
              ease: "power2.inOut",
            })
            .to(
              transitionElementsObj.colorDestinations.destination,
              {
                y: "0vh",
                duration: 0.4,
                ease: "power3.inOut",
              },
              "<"
            )
            .to(
              transitionElementsObj.colorTransition,
              {
                y: "0vh",
                duration: 0.6,
                ease: "power3.inOut",
              },
              "-=0.2"
            )

            .to(
              transitionElementsObj.brandScuro,
              {
                scale: 0,
                transformOrigin: "center center",
                duration: 0.2,
                ease: "power1.inOut",
              },
              "-=0.6"
            )
            .to(
              brandLetters,
              {
                y: "100vh",
                duration: 0.6,
                ease: "power1.inOut",
                stagger: 0.2,
              },
              "-=0.2"
            )
            .to(
              brandSymbols,
              {
                y: "100vh",
                duration: 0.6,
                ease: "power1.inOut",
              },
              "<"
            )
            .to(
              transitionElementsObj.colorBackground,
              {
                y: "100vh",
                duration: 1.2,
                ease: "power2.inOut",
              },
              "-=0.8"
            )
            .set(
              colorTransitions,
              {
                opacity: 0,
              },
              "<"
            );
        },
        after(data) {
          updatePageMetaAndInteractions(data.next.html);
          initializeMainFunctions();
          lenisInstance.update();
          scrollToTopInstant();
          lenisInstance.stop();
          if (!cookieManager.getCookie("cta")) {
            uiManager.showBanner();
          }
        },
      },
      {
        name: "menu-transition",
        from: {
          custom: ({ trigger }) =>
            trigger instanceof HTMLElement &&
            trigger.getAttribute("data-custom") === "menu",
        },
        leave(data) {
            window.isBarbaTransition = true; 
          const done = this.async();
          gsap.set(transitionElementMenuObj.transitionMenuWrapper, {
            visibility: "visible",
          });
          gsap
            .timeline()
            .to(transitionElementMenuObj.transitionMenuWrapper, {
              y: "0vh",
              duration: 0.8,
              ease: "power3.out",
            })
            .to(
              transitionElementMenuObj.puntoLogoNav,
              { scale: 0, duration: 0.2 },
              "-=0.4"
            )
            .to(header.burgerBlock, {
              scale: 1,
              duration: 0,
              onComplete: done,
            })
            .set(menuContainerTransitionElements, {
              opacity: 0,
            })
            .call(() => {
              if (typeof BurgerMenu.closeMenuTransition === "function") {
                BurgerMenu.closeMenuTransition();
                BurgerMenu.disableBurgerClick();
              } else {
                console.error(
                  "BurgerMenu.closeMenuTransition non è una funzione."
                );
              }
            });
        },
        afterLeave(data) {
          // Controlla se stai entrando nella home
          if (data.current.namespace === "home") {
            ScrollTrigger.getAll().forEach((trigger) => {
              if (
                trigger.vars.id &&
                trigger.vars.id.startsWith("hero-trigger")
              ) {
                trigger.kill();
              }
            });
          }
        },
        enter(data) {
          const done = this.async();
          const pageTl = gsap.timeline({
            onComplete: () => {
              lenisInstance.start();
              resetTransitionElementsButtonMenu();
              BurgerMenu.enableBurgerClick();
            },
          });

          done();

          pageTl
            .to(transitionElementMenuObj.puntoChiaroMenu, {
              scale: 0,
              transformOrigin: "center center",
              duration: 0.2,
              ease: "power1.inOut",
            })
            .to(
              brandLettersMenuArray,
              {
                y: "100vh",
                duration: 0.8,
                ease: "power1.inOut",
                stagger: 0.2,
              },
              "+=0.2"
            )
            .to(
              brandSymbolsMenuArray,
              {
                y: "100vh",
                duration: 0.8,
                ease: "power1.inOut",
              },
              "<"
            )
            .to(
              transitionElementMenuObj.backgroundMenu,
              {
                y: "100vh",
                duration: 0.8,
                ease: "power2.in",
              },
              "-=1"
            )
            .to(
              transitionElementMenuObj.puntoLogoNav,
              { scale: 1, ease: "expo.out", duration: 0.2 },
              "<"
            );
        },
        after(data) {
          updatePageMetaAndInteractions(data.next.html);
          initializeMainFunctions();
          lenisInstance.update();
          scrollToTopInstant();
          lenisInstance.stop();
          if (!cookieManager.getCookie("cta")) {
            uiManager.showBanner();
          }
        },
      },
      {
        name: "popstate-transition",
        leave(data) {
            window.isBarbaTransition = true; 
          const done = this.async();
          gsap.set(transitionElementsObj.transitionWrapper, {
            visibility: "visible",
          });
          gsap
            .timeline({
              onComplete: () => {
                done();
              },
            })
            .call(() => {
              BurgerMenu.disableBurgerClick();
            })
            .to(header.burgerBlock, {
              scale: 1,
              duration: 0.4,
              ease: "expo.out",
            })
            .to(
              data.current.container,
              {
                y: "-100vh",
                duration: 0.8,
                ease: "power3.inOut",
              },
              0
            )
            .to(
              transitionElementsObj.transitionWrapper,
              {
                y: "0vh",
                duration: 0.8,
                ease: "power3.inOut",
              },
              0
            );
        },
        afterLeave(data) {
          // Controlla se stai entrando nella home
          if (data.current.namespace === "home") {
            ScrollTrigger.getAll().forEach((trigger) => {
              if (
                trigger.vars.id &&
                trigger.vars.id.startsWith("hero-trigger")
              ) {
                trigger.kill();
              }
            });
          }
        },
        enter(data) {
          const done = this.async();
          const pageTl = gsap.timeline({
            onComplete: () => {
              resetTransitionElementsButton();
              lenisInstance.start();
              BurgerMenu.enableBurgerClick();
            },
          });

          pageTl
            .call(() => {
              done();
              BurgerMenu.disableBurgerClick();
            })
            .to(transitionElementsObj.colorScuro, {
              delay: 0.2,
              y: "-100vh",
              duration: 0.4,
              ease: "power2.inOut",
            })
            .to(
              transitionElementsObj.colorDestinations.destination,
              {
                y: "0vh",
                duration: 0.4,
                ease: "power3.inOut",
              },
              "<"
            )
            .to(
              transitionElementsObj.colorTransition,
              {
                y: "0vh",
                duration: 0.6,
                ease: "power3.inOut",
              },
              "-=0.2"
            )

            .to(
              transitionElementsObj.brandScuro,
              {
                scale: 0,
                transformOrigin: "center center",
                duration: 0.2,
                ease: "power1.inOut",
              },
              "-=0.6"
            )
            .to(
              brandLetters,
              {
                y: "100vh",
                duration: 0.6,
                ease: "power1.inOut",
                stagger: 0.2,
              },
              "-=0.2"
            )
            .to(
              brandSymbols,
              {
                y: "100vh",
                duration: 0.6,
                ease: "power1.inOut",
              },
              "<"
            )
            .to(
              transitionElementsObj.colorBackground,
              {
                y: "100vh",
                duration: 1.2,
                ease: "power2.inOut",
              },
              "-=0.8"
            )
            .set(
              colorTransitions,
              {
                opacity: 0,
              },
              "<"
            );
        },
        after(data) {
          updatePageMetaAndInteractions(data.next.html);
          initializeMainFunctions();
          lenisInstance.update();
          scrollToTopInstant();
          lenisInstance.stop();
          if (!cookieManager.getCookie("cta")) {
            uiManager.showBanner();
          }
        },
      },
      {
        name: "showcase-transition",
        from: {
          custom: ({ trigger }) =>
            trigger instanceof HTMLElement &&
            trigger.getAttribute("data-custom") === "showcase",
        },
        leave(data) {
          isBarbaTransition = true;
          const done = this.async();
          gsap.set(showcaseElementsObj.transitionWrapper, {
           visibility: "visible",
          });

          gsap
            .timeline({
              onComplete: () => {
                done();
              },
            })
            .call(() => {
              BurgerMenu.disableBurgerClick();
            })
            .to(header.burgerBlock, {
              scale: 1,
              duration: 0.4,
              ease: "expo.out",
            })
            .to(
              showcaseElementsObj.transitionWrapper,
              {
                y: "0vh",
                duration: 0.8,
                ease: "power3.inOut",
              },
              0
            );
        },
        afterLeave(data) {
          // Controlla se stai uscendo dalla home
          if (data.current.namespace === "home") {
            ScrollTrigger.getAll().forEach((trigger) => {
              if (
                trigger.vars.id &&
                (trigger.vars.id.startsWith("hero-trigger") ||
                  trigger.vars.id.startsWith("scrollTrigger-"))
              ) {
                trigger.kill();
              }
            });
          }
        },
        enter(data) {
          const done = this.async();
          const nextNamespace = data?.next?.namespace;

          if (nextNamespace === "contatti") {
            const pageTlcontatti = gsap.timeline({
              onComplete: () => {
                lenisInstance.start();
                BurgerMenu.enableBurgerClick();
                gsap.set(showElements, { clearProps: "all" });
              },
            });

            pageTlcontatti
              .call(() => {
                done();
                BurgerMenu.disableBurgerClick();
              })
              .to(showElementsLetters, {
                y: "-100vh",
                duration: 0.8,
                stagger: 0.2,
                ease: "power2.inOut",
              })
              .to(
                showcaseElementsObj.colorTransition,
                {
                  y: "-100vh",
                  duration: 0.6,
                  ease: "power2.inOut",
                },
                "-=0.4"
              );

            return; 
          }
          gsap.set(".showcase-page-general", {
            y: "100vh",
          });
          
          const pageTl = gsap.timeline({
            onComplete: () => {
              lenisInstance.start();
              BurgerMenu.enableBurgerClick();
              gsap.set(showElements, { clearProps: "all" });
            },
          });
          pageTl
            .call(() => {
              done();
              BurgerMenu.disableBurgerClick();
            })
            .to(showElementsLetters, {
              y: "-100vh",
              duration: 0.8,
              stagger: 0.2,
              ease: "power2.inOut",
            })
            .to(
              ".showcase-page-general",
              {
                y: "0vh",
                duration: 0.6,
                ease: "power2.inOut",
              },
              "-=0.4"
            )
            .to(
              showcaseElementsObj.colorTransition,
              {
                y: "-100vh",
                duration: 0.6,
                ease: "power2.inOut",
              },
              "<"
            )
            .to(
              ".line-title-section-show",
              {
                width: "100%",
                duration: 0.8,
                ease: "power2.out",
              },
              "-=0.3"
            )
            .to(
              ".letter-show",
              {
                y: 0,
                duration: 0.6,
                stagger: { amount: 0.2 },
                ease: "power2.out",
              },
              "<"
            )
            .to(
              "#p-text-first, #p-text-second, #p-date",
              {
                y: 0,
                duration: 0.6,
                stagger: 0.2,
                ease: "power2.out",
              },
              "<"
            )
            .to(
              ".text-btn-show-link",
              {
                y: 0,
                duration: 0.4,
                ease: "power2.out",
              },
              "-=0.6"
            )
            .to(
              ".btn-showcase-link",
              {
                scale: 1,
                duration: 0.4,
                ease: "power2.out",
              },
              "-=0.4"
            );
        },
        after(data) {
          updatePageMetaAndInteractions(data.next.html);
          initializeMainFunctions();
          lenisInstance.update();
          scrollToTopInstant();
          lenisInstance.stop();
          if (!cookieManager.getCookie("cta")) {
            uiManager.showBanner();
          }
        },
      },
      {
        name: "proposito-transition",
        from: {
          custom: ({ trigger }) =>
            trigger instanceof HTMLElement &&
            trigger.getAttribute("data-custom") === "propo",
        },
        leave(data) {
          isBarbaTransition = true;
          const done = this.async();
          gsap.set(".prop-cover-wrapper", { visibility: "visible" });
          gsap
            .timeline({
              onComplete: () => {
                done();
              },
            })
            .call(() => {
              BurgerMenu.disableBurgerClick();
            })
            .to(".prop-cover-wrapper", {
              y: "0vh",
              duration: 0.8,
              ease: "power3.inOut",
            })
            .to(
              ".pro-span",
              {
                y: "0%",
                duration: 0.8,
                ease: "power2.inOut",
                stagger: { amount: 0.4 },
              },
              "-=0.6"
            )
            .to(
              headerElements,
              {
                y: "-6rem",
                duration: 0.6,
                ease: "power2.out",
              },
              "-=0.6"
            );
        },
        afterLeave(data) {
          // Controlla se stai entrando nella home
          if (data.current.namespace === "home") {
            ScrollTrigger.getAll().forEach((trigger) => {
              if (
                trigger.vars.id &&
                trigger.vars.id.startsWith("hero-trigger")
              ) {
                trigger.kill();
              }
            });
          }
        },
        enter(data) {
          const done = this.async();
          const pageTl = gsap.timeline({
            onComplete: () => {
              lenisInstance.start();
              BurgerMenu.enableBurgerClick();
              gsap.set(".prop-cover-wrapper", { visibility: "hidden" });
              gsap.set(
                ".pro-span, .pro-top-trans, .proptype-transition, .web-propo, .magazine-propo",
                {
                  clearProps: "all",
                }
              );
            },
          });
          pageTl
            .call(() => {
              done();
            })
            .to(".pro-top-trans", {
              y: "0%",
              duration: 0.6,
              ease: "power2.out",
              stagger: 0.2,
            })
            .to(
              ".pro-span.transform",
              {
                y: "100%",
                duration: 0.6,
                ease: "power2.out",
                stagger: 0.2,
              },
              "-=0.95"
            )
            .to(
              ".web-propo, .magazine-propo",
              {
                opacity: 1,
                duration: 0.6,
                ease: "power1.inOut",
                stagger: 0.2,
              },
              "<"
            )
            .to(
              ".prop-cover-wrapper",
              {
                delay: 0.2,
                y: "100vh",
                duration: 1.2,
                ease: "power2.inOut",
              },
              "-=0.4"
            )
            .to(
              headerElements,
              {
                y: 0,
                duration: 0.6,
                ease: "power2.out",
              },
              "<"
            );
        },
        after(data) {
          updatePageMetaAndInteractions(data.next.html);
          updateCmsMetaTags(
            new DOMParser().parseFromString(data.next.html, "text/html")
          );
          initializeMainFunctions();
          lenisInstance.update();
          scrollToTopInstant();
          lenisInstance.stop();          
          if (!cookieManager.getCookie("cta")) {
            uiManager.showBanner();
          }
        },
      },
    ],
    prevent: ({ href }) => {
      const excludePatterns = [       
        "/web-studio/",
      ];
      return excludePatterns.some((pattern) => href.includes(pattern));
    },
    hooks: {
      after() {
        window.isBarbaTransition = false;      
      },
    },
    preventRunning: true,
    scroll: {
      reset: true, // Resetta lo scroll
    },
    prefetch: true,
  });

  document.querySelectorAll('a[data-barba="link"]').forEach((link) => {
    link.addEventListener("mouseenter", () => barba.prefetch(link.href));
  });
}

function scrollToTopInstant() {
    lenisInstance.scrollTo(0, { immediate: true });
  }
  
  function resetTransitionElementsButton() {
    gsap.set(
      [
        ...transitionElements,
        ...brandSymbols,
        ...colorTransitions,
        ...brandLetters,
      ],
      {
        clearProps: "all", // Rimuove tutti gli stili inline applicati da GSAP
      }
    );
  }
  
  function resetTransitionElementsButtonMenu() {
    gsap.set([...transitionMenuArray, ...menuWrapperElements], {
      clearProps: "all", // Rimuove tutti gli stili inline applicati da GSAP
    });
  }

  //BARBA fine

  //ANIMAZIONI di ingresso
  function defaultEnterTransition() {  
    const coverTL = gsap.timeline();
    const tlPlus = gsap.timeline();
    const masterTimeline = gsap.timeline({
      onStart: () => blockScroll(),
    });
  
    masterTimeline.add(coverTL, 0).add(tlPlus, 1.2);
  
    coverTL
    .to(".cover-wrapper-background.clear", {
      scale: 1,
      transformOrigin: "bottom center",
      duration: 0.8,
      ease: "power3.inOut",
    })
    .to(
      "#colore-scuro",
      {
        y: "-100vh",
        duration: 1,
        ease: "power3.inOut",
      },
      "<"
    )
    .to(
      "#colore-punto-brand-chiaro",
      {
        scaleY: 0,
        transformOrigin: "center top",
        duration: 0.4,
        ease: "power2.out",
      },
      "-=0.8"
    )
    .to(
      ".logotype-transition",
      {
        rotateX: -90,
        duration: 0.4,
        transformOrigin: "top",
        ease: "power1.inOut",
      },
      "<"
    )
    .to(
      brandLettersArray,
      {
        y: "100vh",
        duration: 0.6,
        ease: "power1.inOut",
        stagger: 0.2,
      },
      "-=0.4"
    )
    .to(
      brandSymbolsArray,
      {
        y: "100vh",
        duration: 0.6,
        ease: "power1.inOut",
      },
      "<"
    )
    .to(
      ".cover-wrapper-background",
      {
        y: "100vh",
        duration: 1,
        ease: "power3.inOut",
      },
      "-=0.8"
    )
    .set(
      "#cover-wrapper-background",
      {
        visibility: "hidden",
      },
      "<"
    )
    .set(".cover-wrapper", { display: "none" });
  
    tlPlus
    .call(() => {
      unblockScroll();
    })
      .to(headerElements, {
        y: 0,
        duration: 0.6,
        ease: "power2.out",
      });
  }

  function defaultSimpleTransition() {
    const tlPlus = gsap.timeline();
  
    tlPlus.to(headerElements, {
      y: 0,
      duration: 0.6,
      ease: "power2.out",
    });
  }
  
  function animationPageEnterDesign() {
  const split = new SplitType(".h1-page", {
    types: "lines",
    tagName: "span",
  });

  const svg = document.getElementById("svg-page-container");

  gsap.set("#Union", {
    drawSVG: "0%",
  });

  gsap.set("#quadrato-design", {
    scale: 0,
    transformOrigin: "bottom left",
  });
  gsap.set("#cerchio-design", {
    scale: 1.7,
    transformOrigin: "bottom left",
  });

  gsap.set(svg, {
    x: "100vw",
  });

  gsap
    .timeline()
    .from(split.lines, {
      delay: 1.4,
      y: "200%",
      duration: 0.6,
      stagger: 0.2,
      ease: "power2.out",
    })
    .to(
      svg,
      {
        x: 0,
        duration: 0.6,
        ease: "power2.out",
      },
      "<"
    )
    .from(
      ".sub-head-page",
      {
        y: "200%",
        duration: 0.6,
        stagger: 0.2,
        ease: "power2.out",
      },
      "-=0.2"
    )
    .to(
      "#quadrato-design",
      {
        scale: 1,
        duration: 0.8,
        ease: "power2.out",
      },
      "-=0.4"
    )
    .to(
      "#cerchio-design",
      {
        scale: 1,
        duration: 0.6,
        ease: "power2.out",
      },
      "<"
    )
    .to(
      "#Union",
      {
        drawSVG: "100%",
        duration: 3,
        ease: "power1.inOut",
      },
      "-=1.5"
    );
}
  
  function animationPageEnterAbout() {
    const split = new SplitType(".h1-span-page", {
      types: "chars",
      tagName: "span",
    });
  
    const splitSub = new SplitType(".span-sfumato-h-page-first", {
      types: "words",
      tagName: "span",
    });
  
    const subHeadPage = document.querySelector(".sub-head-page");
  
    const heading = document.querySelectorAll(".h1-span-page .char");
  
    const subHeading = document.querySelectorAll(
      ".span-sfumato-h-page-first .word"
    );
  
    gsap.set(heading, { rotateY: 90, transformOrigin: "center center" });
    gsap.set(subHeading, { y: "200%" });
    gsap.set(subHeadPage, { y: "200%" });
  
    const img = document.getElementById("img-page-container");
  
    gsap.set(img, {
      opacity: 0,
    });
  
    gsap
      .timeline()
      .to(heading, {
        delay: 1.4,
        rotateY: 0,
        duration: 0.5,
        stagger: { amount: 0.3 },
        ease: "power2.out",
      })
      .to(
        subHeading,
        {
          y: 0,
          duration: 0.4,
          stagger: 0.2,
          ease: "power2.out",
        },
        "-=0.6"
      )
      .to(
        img,
        {
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
        },
        "<"
      )
      .to(
        subHeadPage,
        {
          y: 0,
          duration: 0.6,
          stagger: 0.2,
          ease: "power2.out",
        },
        "-=0.3"
      );
  }
  
function animationPageEnterWebDesign() {
  const split = new SplitType(".h1-page", {
    types: "lines",
    tagName: "span",
  });

  const svg = document.getElementById("svg-page-container");
  const paths = ["#big-square-web-design", "#arrow-web-design"];
  gsap.set(paths, { drawSVG: "0%" });

  gsap.set("#big-square-web-design", {
    scale: 0,
    transformOrigin: "bottom left",
  });
  gsap.set("#arrow-web-design", {
    scale: 1.7,
    transformOrigin: "bottom left",
  });

  gsap.set(svg, {
    x: "100vw",
    rotateZ: 135,
  });
  gsap
    .timeline()
    .from(split.lines, {
      delay: 1.4,
      y: "200%",
      duration: 0.6,
      stagger: 0.2,
      ease: "power2.out",
    })
    .to(
      svg,
      {
        x: 0,
        rotateZ: 0,
        duration: 0.6,
        ease: "power2.out",
      },
      "<"
    )
    .from(".sub-head-page", {
      y: "200%",
      duration: 0.6,
      stagger: 0.2,
      ease: "power2.out",
    })
    .to(
      " #arrow-web-design",
      {
        scale: 1,
        duration: 0.6,
        ease: "power2.out",
      },
      "<"
    )
    .to(
      "#big-square-web-design",
      {
        scale: 1,
        duration: 1.2,
        ease: "power2.out",
      },
      "-=0.6"
    )
    .to(
      paths,
      {
        drawSVG: "100%",
        duration: 1.5,
        ease: "power2.out",
        stagger: -1,
      },
      "<"
    );
}
  
  function animationPageEnterMarketing() {
    const split = new SplitType(".h1-page", {
      types: "lines",
      tagName: "span",
    });
    const bigSquare = document.getElementById("big-square-seo");
    const svg = document.getElementById("svg-page-container");
  
    gsap.set(bigSquare, {
      scale: 2,
      transformOrigin: "top right",
    });
  
    gsap.set(svg, {
      x: "100vw",
      rotateZ: 180,
      transformOrigin: "center centeer",
    });
  
    gsap
      .timeline()
      .from(split.lines, {
        delay: 1.4,
        y: "200%",
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
      })
      .to(
        svg,
        {
          x: 0,
          rotateZ: 0,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.6"
      )
      .from(".sub-head-page", {
        y: "200%",
        duration: 0.6,
        stagger: 0.2,
        ease: "power2.out",
      })
      .to(
        bigSquare,
        {
          scale: 1,
          duration: 0.6,
          ease: "power2.out",
        },
        "<"
      );
  }
  
  function animationPageEnterWomen() {
    const split = new SplitType(".h1-page", {
      types: "lines",
      tagName: "span",
    });
  
    const splitHead = document.querySelectorAll(".h1-page .line");
    const subHead = document.querySelectorAll(".sub-head-page");
    const svg = document.getElementById("svg-page-container");
  
    gsap.set(svg, {
      opacity: 0,
    });
    gsap.set([...splitHead, ...subHead], {
      y: "200%",
    });
  
    gsap
      .timeline()
      .to(splitHead, {
        delay: 1.4,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
      })
      .to(
        svg,
        {
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.6"
      )
      .to(subHead, {
        y: 0,
        duration: 0.6,
        stagger: 0.2,
        ease: "power2.out",
      });
  }

  function transitionOnLoadHero() {  
      const mm = gsap.matchMedia();
      const tlTitle = gsap.timeline();
      const coverTL = gsap.timeline();
      const tlPlus = gsap.timeline();
      const masterTimeline = gsap.timeline({
        onStart: () => {
          blockScroll();
          gsap.set(".arrow", { x: -window.innerWidth });
          gsap.set(".sphere", {
            x: -window.innerWidth,
            y: -window.innerHeight * 0.5,
          });
          gsap.set(".square", {
            x: window.innerWidth,
            y: -window.innerHeight * 0.5,
            rotateZ: 180,
          });
        },
        onComplete: () => {
          mm.add("(min-width: 992px)", () => {
            gsap.set(header.burgerBlock, {
              scale: 0,
              y: 0,
            });
          });
        },
      });
  
      masterTimeline.add(coverTL, 0).add(tlTitle, 1).add(tlPlus, 1.4);
  
      coverTL
      .to(".cover-wrapper-background.clear", {
        scale: 1,
        transformOrigin: "bottom center",
        duration: 0.8,
        ease: "power3.inOut",
      })
      .to(
        "#colore-scuro",
        {
          y: "-100vh",
          duration: 1,
          ease: "power3.inOut",
        },
        "<"
      )
      .to(
        "#colore-punto-brand-chiaro",
        {
          scaleY: 0,
          transformOrigin: "center top",
          duration: 0.4,
          ease: "power2.out",
        },
        "-=0.8"
      )
      .to(
        ".logotype-transition",
        {
          rotateX: -90,
          duration: 0.4,
          transformOrigin: "top",
          ease: "power1.inOut",
        },
        "<"
      )
      .to(
        brandLettersArray,
        {
          y: "100vh",
          duration: 0.6,
          ease: "power1.inOut",
          stagger: 0.2,
        },
        "-=0.4"
      )
      .to(
        brandSymbolsArray,
        {
          y: "100vh",
          duration: 0.6,
          ease: "power1.inOut",
        },
        "<"
      )
      .to(
        ".cover-wrapper-background",
        {
          y: "100vh",
          duration: 1,
          ease: "power3.inOut",
        },
        "-=0.8"
      )
      .set(
        "#cover-wrapper-background",
        {
          visibility: "hidden",
        },
        "<"
      )
      .set(".cover-wrapper", { display: "none" });
  
      tlTitle
        .to(".sphere", {
          x: 0,
          y: 0,
          duration: 1.4,
          ease: "power4.out",
        })
        .to(
          ".square",
          {
            x: 0,
            y: 0,
            rotation: 0,
            duration: 1.4,
            ease: "power4.out",
          },
          "<"
        )
        .to(
          "#hero-line",
          {
            scaleX: 1,
            duration: 0.8,
            ease: "power2.Out",
          },
          "<"
        )
        .to(
          ".span-design",
          {
            rotateY: 0,
            duration: 0.6,
            stagger: { amount: -0.2 },
            ease: "power2.out",
          },
          "-=0.8"
        )
        .to(
          ".span-emozioni",
          {
            rotateY: 0,
            duration: 0.6,
            stagger: { amount: 0.2 },
            ease: "power2.out",
          },
          "<"
        )
  
        .to(
          ".arrow",
          {
            x: 0,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=1"
        )
  
        .to(
          ".span-p",
          {
            y: 0,
            duration: 0.5,
            stagger: { amount: 0.2 },
            ease: "power2.out",
          },
          "<"
        )
        .to(
          ".span-p2",
          {
            y: 0,
            duration: 0.5,
            stagger: { amount: 0.2 },
            ease: "power2.out",
          },
          "<"
        );
  
      tlPlus
        .call(() => {
          unblockScroll();
        })
        .to(header.logoMenu, {
          y: 0,
          duration: 0.6,
          ease: "power2.out",
        });
  
      mm.add(
        {
          isDesktop: "(min-width: 992px)", // Breakpoint per desktop
          isMobile: "(max-width: 991px)", // Breakpoint per mobile
        },
        (context) => {
          if (context.conditions.isDesktop) {
            tlPlus.to(".link-menu-desk", {
              rotateX: 0,
              duration: 0.4,
              stagger: { amount: 0.2 },
              ease: "power2.out",
            });
          }
  
          if (context.conditions.isMobile) {
            tlPlus.to(
              header.burgerBlock,
              {
                y: 0,
                duration: 0.6,
                ease: "power2.out",
              },
              "<"
            );
          }
        }
      );   
  }
  
  function transitionOnLoadHeroDefault() {
    const mm = gsap.matchMedia();
    const tlTitle = gsap.timeline();
    const tlPlus = gsap.timeline();
    const masterTimeline = gsap.timeline({
      onStart: () => {
        gsap.set(".arrow", { x: -window.innerWidth });
        gsap.set(".sphere", {
          x: -window.innerWidth,
          y: -window.innerHeight * 0.5,
        });
        gsap.set(".square", {
          x: window.innerWidth,
          y: -window.innerHeight * 0.5,
          rotateZ: 180,
        });
      },
      onComplete: () => {
        mm.add("(min-width: 992px)", () => {
          gsap.set(header.burgerBlock, {
            y: 0,
          });
        });
      },
    });
  
    mm.add("(min-width: 992px)", () => {
      gsap.to(header.burgerBlock, {
        scale: 0,
        duration: 0.4,
        ease: "power2.inOut",
        onComplete: () => {
          // Avvia la masterTimeline solo dopo il completamento dell'animazione iniziale
          masterTimeline.play();
        },
      });
    });
  
    masterTimeline.add(tlTitle, 1.2).add(tlPlus, 0.6);
  
    tlTitle
      .to(".sphere", {
        x: 0,
        y: 0,
        duration: 1.4,
        ease: "power4.out",
      })
      .to(
        ".square",
        {
          x: 0,
          y: 0,
          rotation: 0,
          duration: 1.4,
          ease: "power4.out",
        },
        "<"
      )
      .to(
        "#hero-line",
        {
          scaleX: 1,
          duration: 0.8,
          ease: "power2.Out",
        },
        "<"
      )
      .to(
        ".span-design",
        {
          rotateY: 0,
          duration: 0.6,
          stagger: { amount: -0.2 },
          ease: "power2.out",
        },
        "-=0.8"
      )
      .to(
        ".span-emozioni",
        {
          rotateY: 0,
          duration: 0.6,
          stagger: { amount: 0.2 },
          ease: "power2.out",
        },
        "<"
      )
  
      .to(
        ".arrow",
        {
          x: 0,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=1"
      )
  
      .to(
        ".span-p",
        {
          y: 0,
          duration: 0.5,
          stagger: { amount: 0.2 },
          ease: "power2.out",
        },
        "<"
      )
      .to(
        ".span-p2",
        {
          y: 0,
          duration: 0.5,
          stagger: { amount: 0.2 },
          ease: "power2.out",
        },
        "<"
      );
  
    tlPlus.to(header.logoMenu, {
      y: 0,
      duration: 0.6,
      ease: "power2.out",
    });
  
    mm.add(
      {
        isDesktop: "(min-width: 992px)", // Breakpoint per desktop
        isMobile: "(max-width: 991px)", // Breakpoint per mobile
      },
      (context) => {
        if (context.conditions.isDesktop) {
          tlPlus.to(".link-menu-desk", {
            rotateX: 0,
            duration: 0.4,
            stagger: { amount: 0.2 },
            ease: "power2.out",
          });
        }
  
        if (context.conditions.isMobile) {
          tlPlus.to(
            header.burgerBlock,
            {
              y: 0,
              duration: 0.6,
              ease: "power2.out",
            },
            "<"
          );
        }
      }
    );
  }

  function showcaseTransition() {    
    const coverTL = gsap.timeline();
    const tlPlus = gsap.timeline();
    const masterTimeline = gsap.timeline({
      onStart: () => blockScroll(),
    });
  
    masterTimeline.add(coverTL, 0).add(tlPlus, 1.2);
  
    coverTL
      .to(".cover-wrapper-background.clear", {
        scale: 1,
        transformOrigin: "bottom center",
        duration: 1,
        ease: "power4.inOut",
      })
      .to(
        "#colore-scuro",
        {
          y: "-100vh",
          duration: 1.2,
          ease: "power2.inOut",
        },
        "<"
      )
      .to(
        "#colore-punto-brand-chiaro",
        {
          scale: 0,
          transformOrigin: "center center",
          duration: 0.4,
          ease: "power4.out",
        },
        "-=0.8"
      )
      .to(
        ".logotype-transition",
        {
          rotateX: -90,
          duration: 0.4,
          transformOrigin: "top",
          ease: "power1.inOut",
        },
        "-=0.4"
      )
      .to(
        brandLettersArray,
        {
          y: "100vh",
          duration: 0.6,
          ease: "power1.inOut",
          stagger: 0.2,
        },
        "-=0.4"
      )
      .to(
        brandSymbolsArray,
        {
          y: "100vh",
          duration: 0.6,
          ease: "power1.inOut",
        },
        "<"
      )
      .to(
        ".cover-wrapper-background",
        {
          y: "100vh",
          duration: 1.2,
          ease: "power2.inOut",
        },
        "-=1"
      )
      .set(
        "#cover-wrapper-background",
        {
          opacity: 0,
        },
        "<"
      )
      .set(".cover-wrapper", { display: "none" })
      .to(".line-title-section-show", 
        {
        width: "100%",
        duration: 0.8,
        ease: "power2.out",
      },"-=0.6")
      .to(
        ".letter-show",
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: { amount: 0.2 },
          ease: "power2.out",
        },
        "-=0.4"
      )
      .to(
        [".panel-text.department", ".panel-text.kind-job", ".panel-date"],
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.2,
          ease: "power2.out",
        },
        "<"
      )
      .to(
        ".text-btn-show-link",
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
        },
        "-=0.4"
      )
      .to(
        ".btn-showcase-link",
        {
          scale: 1,
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
        },
        "-=0.2"
      )
      .to(
        headerElements,
        {
          y: 0,
          duration: 0.6,
          ease: "power2.out",
        },
        "<"
      );
      
  
    tlPlus
      .to(headerElements, {
        y: 0,
        duration: 0.6,
        ease: "power2.out",
      })
      .call(() => {
        unblockScroll();
      });
  }
  
  //

  //Animazioni Specifiche HOME
  window.ctaStickyTransition = window.ctaStickyTransition || {
    // Variabili e oggetti
    horizontalScrollTL: null,
    numImages: 6, // Numero immagini nello scroll verticale
  
    // Selettori per Scroll Orizzontale
    reset() {
      this.scrollWrapperH = document.querySelector(".horizontal-scroll-wrapper");
      this.scrollContainerH = document.querySelector(
        ".horizontal-scroll-container"
      );
      this.panelPrimo = document.getElementById("panelPrimo");
      this.panelSecondo = document.getElementById("panelSecondo");
      this.panelTerzo = document.getElementById("panelTerzo");
  
      this.scrollWrapperV = document.getElementById("vertical-scroll-wrapper");
      this.scrollContainerV = document.querySelector(
        ".vertical-scroll-container"
      );
      this.verticalPath = document.querySelector(".vertical-path");
  
      this.transitionZoneTrigger = document.getElementById("item-trans");
      this.transitionZoneImage = document.getElementById("img-trans");
      this.transitionIndex = document.getElementById("item-index");
      this.lastPanel = document.getElementById("img-last-one");
      // Popoliamo gli array solo se gli elementi sono stati trovati
      this.panelArray = [this.verticalPath, this.panelTerzo].filter(Boolean);
      this.contentArray = [this.scrollContainerH, this.verticalPath].filter(
        Boolean
      );
  
      this.transitionArrray = [this.lastPanel, this.transitionZoneImage].filter(
        Boolean
      );
  
      // Se gli elementi sono validi, rilancio le animazioni
      if (this.scrollWrapperH && this.scrollContainerH && this.panelPrimo) {
        this.init();
      } else {
        console.warn(
          "reset(): Alcuni elementi non sono stati trovati, animazioni non riavviate."
        );
      }
    },
  
    // Inizializzazione dell'oggetto
    init() {
      this.showcaseHorizontalScroll();
      this.definition();
      this.transition();
      this.showcaseVerticalScroll();
      this.showcaseExpandPanels();
      this.showcaseScaleImages();
      this.showcaseTextContent();
      this.panelHoverEffect();
    },
  
    // Funzione per lo Scroll Orizzontale
    showcaseHorizontalScroll() {
      if (!this.scrollWrapperH || !this.scrollContainerH) {
        console.warn(" showcaseHorizontalScroll: elementi non trovati");
        return;
      }
  
      const scrollLength = this.scrollContainerH.scrollWidth - window.innerWidth;
  
      this.horizontalScrollTL = gsap.timeline({
        scrollTrigger: {
          trigger: this.scrollWrapperH,
          start: "top top",
          end: `+=${scrollLength}`,
          scrub: true,
        },
      });
  
      this.horizontalScrollTL.to(this.scrollContainerH, {
        x: `-${scrollLength}px`,
        ease: "none",
      });
    },
  
    // Funzione per la transizione della zona intermedia
    transition() {
      if (!this.transitionZoneImage || !this.transitionZoneTrigger) {
        console.warn(" transition: elementi non trovati");
        return;
      }
  
      gsap.to(this.transitionArrray, {
        y: 0,
        ease: "none",
        scrollTrigger: {
          trigger: this.transitionIndex,
          start: "bottom bottom",
          end: "bottom 60%",
          scrub: true,
        },
      });
      if (!this.transitionIndex || !this.scrollContainerH) {
        console.warn("transition: elementi per il nuovo trigger non trovati");
        return;
      }
  
      gsap.to(this.scrollWrapperH, {
        zIndex: 0,
        immediateRender: false,
        scrollTrigger: {
          trigger: this.transitionIndex,
          start: "top 60%",
          end: "top 55%",
          scrub: true,
        },
      });
    },
  
    showcaseVerticalScroll() {
      if (!this.scrollWrapperV || !this.scrollContainerV) {
        console.warn(" showcaseVerticalScroll: elementi non trovati");
        return;
      }
  
      const splitLines = new SplitType(".value-text", {
        types: "lines",
        tagName: "span",
      });
  
      const splitLinesMiss = new SplitType(".miss-text", {
        types: "lines",
        tagName: "span",
      });
  
      const trigger = document.querySelector("#v-trigger-first");
      if (!trigger) {
        console.warn(" showcaseVerticalScroll: trigger non trovato");
        return;
      }
  
      const lineText = document.querySelectorAll(".value-text .line");
      const lineTextMiss = document.querySelectorAll(".miss-text .line");
      gsap.set(lineText, { y: 100, opacity: 0 });
      gsap.set(lineTextMiss, { y: 100, opacity: 0 });
  
      // Contatore per assegnare ID univoci ai trigger
      let triggerID = 0;
  
      // Funzione per generare un ID univoco
      function getUniqueTriggerID() {
        triggerID++;
        return `scrollTrigger-${triggerID}`;
      }
  
      // Calcolo delle altezze
      const verticalScrollLength =
        this.scrollContainerV.scrollHeight - window.innerHeight;
      const totalImagesHeight = (this.numImages * 20 * window.innerWidth) / 100;
      const extraDivHeight = ((30 * window.innerWidth) / 100) * (9 / 16); // Altezza del div 16:9
  
      const viewportHeight = window.innerHeight;
      const missingHeight = Math.max(
        totalImagesHeight + extraDivHeight - viewportHeight,
        0
      ); // Evita valori negativi
  
      // Timeline per lo Scroll Verticale
      this.verticalScrollTL = gsap.timeline({
        scrollTrigger: {
          id: getUniqueTriggerID(),
          trigger: trigger,
          start: "top top",
          end: `+=${verticalScrollLength}`,
          scrub: true,
          pin: this.scrollWrapperV,
          anticipatePin: 0,
        },
      });
  
      // Animazione per ridurre la larghezza dei pannelli
      gsap.to(this.panelArray, {
        width: "30vw",
        ease: "none",
        scrollTrigger: {
          id: getUniqueTriggerID(),
          trigger: trigger,
          start: "top 50%",
          end: "top -75%",
          scrub: true,
        },
      });
  
      //  Spostamento del contenuto per compensare l'altezza mancante
      gsap.to(this.contentArray, {
        y: `-${missingHeight}px`,
        ease: "none",
        scrollTrigger: {
          id: getUniqueTriggerID(),
          trigger: trigger,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      });
  
      //  Animazione del titolo
      gsap.to(".line-title.text-par.red", {
        width: "100%",
        ease: "none",
        stagger: 0.3,
        scrollTrigger: {
          id: getUniqueTriggerID(),
          trigger: trigger,
          start: "top 80%",
          end: "center 40%",
          scrub: true,
        },
      });
  
      //  Timeline per l’animazione di testi e valori
      gsap.to(
        {},
        {
          scrollTrigger: {
            id: getUniqueTriggerID(),
            trigger: trigger,
            start: "top -50%",
            end: "bottom top",
            onEnter: () => {
              gsap
                .timeline()
                .to(lineText, {
                  y: 0,
                  opacity: 1,
                  duration: 0.6,
                  stagger: { amount: 0.2 },
                  ease: "power2.out",
                })
                .to(
                  ".point-value",
                  {
                    scale: 1,
                    duration: 0.6,
                    stagger: 0.2,
                    ease: "power2.out",
                  },
                  "<"
                )
                .to(
                  lineTextMiss,
                  {
                    y: 0,
                    opacity: 1,
                    duration: 0.6,
                    stagger: { amount: 0.2 },
                    ease: "power2.out",
                  },
                  "<"
                );
            },
            onLeaveBack: () => {
              gsap
                .timeline()
                .to(lineTextMiss, {
                  y: 100,
                  opacity: 0,
                  duration: 0.4,
                  ease: "power2.in",
                })
                .to(
                  ".point-value",
                  {
                    scale: 0,
                    duration: 0.4,
                    ease: "power2.in",
                  },
                  "<"
                )
                .to(
                  lineText,
                  {
                    y: 100,
                    opacity: 0,
                    duration: 0.6,
                    ease: "power2.in",
                  },
                  "<"
                );
            },
          },
        }
      );
    },
  
    showcaseExpandPanels() {
      if (!this.panelPrimo) {
        console.warn(
          "showcaseExpandPanels: Il trigger principale non è stato trovato."
        );
        return;
      }
  
      const panels = [
        {
          element: this.panelSecondo,
          trigger: this.panelPrimo,
          start: "left 70%",
          end: "left -30%",
          finalX: "0vw",
        },
        {
          element: this.panelTerzo,
          trigger: this.panelPrimo,
          start: "left 70%",
          end: "left -30%",
          finalX: "0vw",
        },
      ];
  
      panels.forEach(({ element, trigger, start, end, finalX }) => {
        if (!element || !trigger) {
          console.warn(`showcaseExpandPanels: Elemento o trigger non trovati.`);
          return;
        }
  
        gsap.to(element, {
          x: finalX,
          ease: "power2.out",
          scrollTrigger: {
            trigger: trigger,
            containerAnimation: this.horizontalScrollTL,
            start: start,
            end: end,
            scrub: true,
          },
        });
      });
    },
  
    showcaseScaleImages() {
      if (!this.panelPrimo) {
        console.warn(
          " showcaseScaleImages: il trigger principale non è stato trovato"
        );
        return;
      }
  
      const images = [
        {
          id: "#imgPrimo",
          trigger: this.panelPrimo,
          start: "left 70%",
          end: "left 30%",
        },
        {
          id: "#imgSecondo",
          trigger: this.panelPrimo,
          start: "left 70%",
          end: "center left",
        },
        {
          id: "#imgTerzo",
          trigger: this.panelPrimo,
          start: "center 30%",
          end: "right -30%",
        },
      ];
  
      images.forEach(({ id, trigger, start, end }) => {
        let image = document.querySelector(id);
        if (!image) {
          console.warn(` showcaseScaleImages: Immagine ${id} non trovata`);
          return;
        }
  
        gsap.to(image, {
          y: 0,
          scale: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: trigger,
            containerAnimation: this.horizontalScrollTL, // Ora usa `this.`
            start: start,
            end: end,
            scrub: true,
          },
        });
      });
    },
  
    showcaseTextContent() {
      if (!this.panelPrimo) {
        console.warn(
          "⚠️ showcaseTextContent: Il trigger principale non è stato trovato."
        );
        return;
      }
  
      const splitTitles = new SplitType(".panel-title", {
        types: "chars",
        tagName: "span",
      });
  
      const textTriggers = [
        {
          element: this.panelPrimo,
          trigger: this.panelPrimo,
          start: "left 50%",
          end: "right 50%",
        },
        {
          element: this.panelSecondo,
          trigger: this.panelPrimo,
          start: "left left",
          end: "center left",
        },
        {
          element: this.panelTerzo,
          trigger: this.panelPrimo,
          start: "right left",
          end: "right -30%",
        },
      ];
  
      textTriggers.forEach(({ element, trigger, start, end }) => {
        if (!element || !trigger) {
          console.warn(`⚠️ showcaseTextContent: Elemento o trigger non trovati.`);
          return;
        }
  
        const titleChars = element.querySelectorAll(".panel-title .char");
        const descriptionContainer = element.querySelector(".panel-desscript");
        const button = element.querySelector(".btn-showcase-link");
        const buttonHover = element.querySelector(".btn-showcase-link-hover");
  
        if (!titleChars.length || !descriptionContainer || !button) {
          console.warn(
            `⚠️ showcaseTextContent: Elementi mancanti in ${element.id}`
          );
          return;
        }
  
        // Imposta lo stato iniziale con gsap.set()
        gsap.set(titleChars, { y: "100%", opacity: 0 });
        gsap.set(descriptionContainer, { y: 200 });
        gsap.set(button, { scale: 0 });
        gsap.set(buttonHover, { opacity: 0 });
  
        // 🔹 Creazione dello ScrollTrigger
        ScrollTrigger.create({
          trigger: trigger,
          containerAnimation: this.horizontalScrollTL,
          start: start,
          end: end,
          scrub: true,
          onEnter: () => {
            gsap
              .timeline()
              .to(titleChars, {
                y: 0,
                opacity: 1,
                stagger: { amount: 0.5 },
                duration: 0.4,
                ease: "power2.out",
              })
              .to(
                descriptionContainer,
                { y: 0, duration: 0.6, ease: "power2.out" },
                "<"
              )
              .to(
                button,
                { scale: 1, duration: 0.4, ease: "power2.out" },
                "-=0.2"
              )
              .to(buttonHover, { opacity: 1 });
          },
          onLeaveBack: () => {
            gsap
              .timeline()
              .to(titleChars, {
                y: "100%",
                opacity: 0,
                duration: 0.2,
                ease: "power2.in",
              })
              .to(
                descriptionContainer,
                { y: 200, duration: 0.2, ease: "power2.in" },
                "<"
              )
              .to(button, { scale: 0, duration: 0.2, ease: "power2.out" })
              .to(buttonHover, { opacity: 0 });
          },
        });
      });
    },
  
    definition() {
      if (!this.panelPrimo) {
        console.warn("Il trigger principale non è stato trovato");
        return;
      }
  
      const innTextArray = [
        {
          selector: ".inn-span",
          trigger: this.panelPrimo,
          start: "left 100%",
          end: "left 80%",
        },
      ];
  
      innTextArray.forEach(({ selector, trigger, start, end }) => {
        let innTextElements = document.querySelectorAll(selector);
        if (!innTextElements.length) {
          console.warn(`Nessun elemento trovato per ${selector}`);
          return;
        }
  
        gsap.set(innTextElements, { y: "100%" }); // Imposta gli elementi inizialmente nascosti
  
        ScrollTrigger.create({
          trigger: trigger,
          containerAnimation: this.horizontalScrollTL,
          start: start,
          end: end,
          scrub: true,
          onEnter: () => {
            gsap.to(innTextElements, {
              y: 0,
              duration: 0.4,
              stagger: { amount: 0.5 },
              ease: "power2.out",
            });
          },
          onLeaveBack: () => {
            gsap.to(innTextElements, {
              y: "100%",
              duration: 0.4,
              ease: "power2.in",
            });
          },
        });
      });
    },
  
    panelHoverEffect() {
      const panels = document.querySelectorAll(".panel-item-hov");
  
      if (!panels.length) {
        console.warn("Nessun elemento .panel-item-hov trovato");
        return;
      }
  
      panels.forEach((panel) => {
        const panelItemV = panel.querySelector(".panel-item-v");
        const itemVTitle = panel.querySelector(".item-v-title");
        const button = panel.querySelector(".btn-showcase-link");
  
        gsap.set(itemVTitle, { y: "100%" });
        gsap.set(button, { scale: 0 });
  
        // Funzioni per gestire gli eventi
        const handleMouseEnter = () => {
          gsap.to(panel, {
            opacity: 1,
            duration: 0.3,
            ease: "power2.out",
          });
  
          if (panelItemV) {
            gsap.to(panelItemV, {
              y: 0,
              duration: 0.5,
              ease: "power2.out",
            });
          }
  
          if (itemVTitle) {
            gsap.to(itemVTitle, {
              y: 0,
              duration: 0.5,
              ease: "power2.out",
            });
          }
  
          if (button) {
            gsap.to(button, {
              scale: 1,
              duration: 0.5,
              ease: "power2.out",
            });
          }
        };
  
        const handleMouseLeave = () => {
          gsap.to(panel, {
            opacity: 0,
            duration: 0.3,
            ease: "power2.inOut",
          });
  
          if (panelItemV) {
            gsap.to(panelItemV, {
              y: "-100%",
              duration: 0.5,
              ease: "power2.in",
            });
          }
  
          if (itemVTitle) {
            gsap.to(itemVTitle, {
              y: "100%",
              duration: 0.5,
              ease: "power2.in",
            });
          }
  
          if (button) {
            gsap.to(button, {
              scale: 0,
              duration: 0.5,
              ease: "power2.out",
            });
          }
        };
  
        // Aggiunge i listener agli eventi hover
        panel.addEventListener("mouseenter", handleMouseEnter);
        panel.addEventListener("mouseleave", handleMouseLeave);
  
        // Registra i listener dentro window.pageSpecificListeners
        window.pageSpecificListeners.push(
          { element: panel, event: "mouseenter", handler: handleMouseEnter },
          { element: panel, event: "mouseleave", handler: handleMouseLeave }
        );
      });
    },
  };


  function setupShowcaseButtons() {
    const mm = gsap.matchMedia();
  
    // 🔹 Modalità DESKTOP: Gestisce solo hover (≥992px)
    mm.add("(min-width: 992px)", () => {
      const buttonImagePairs = [
        { buttonId: "show-btn-primo", imgId: "spacer-img-primo" },
        { buttonId: "show-btn-secondo", imgId: "spacer-img-secondo" },
        { buttonId: "show-btn-terzo", imgId: "spacer-img-terzo" },
      ];
  
      buttonImagePairs.forEach(({ buttonId, imgId }) => {
        const button = document.getElementById(buttonId);
        const imgPanel = document.getElementById(imgId);
  
        if (!button || !imgPanel) {
          console.warn(
            `setupShowcaseButtons: Elementi mancanti per ${buttonId} e ${imgId}`
          );
          return;
        }
  
        const hoverDiv = button.querySelector(".btn-showcase-link-hover");
        const arrowHover = hoverDiv?.querySelector(".freccia-cta-arrow-hover");
        const arrowDefault = button?.querySelector(".freccia-cta-arrow");
  
        if (!hoverDiv || !arrowHover || !arrowDefault) {
          console.warn(
            `setupShowcaseButtons: Elementi interni mancanti per ${buttonId}`
          );
          return;
        }
  
        let enterTl = gsap.timeline({ paused: true });
        let leaveTl = gsap.timeline({ paused: true });
        let hoverTimeout;
        let isHovered = false;
        let isInside = false;
  
        // 🔹 Timeline per l'hover IN
        enterTl
          .set(hoverDiv, { opacity: 1 })
          .to(hoverDiv, { scale: 1, duration: 0.3, ease: "power2.out" })
          .to(
            arrowHover,
            { scale: 1, duration: 0.3, ease: "power2.out" },
            "-=0.15"
          )
          .to(arrowDefault, { scale: 0, duration: 0.2, ease: "power2.out" }, 0.3);
  
        // 🔹 Timeline per l'hover OUT (forzato sempre)
        leaveTl
          .to([hoverDiv, arrowHover], {
            scale: 0,
            duration: 0.3,
            ease: "power2.out",
          })
          .to(
            arrowDefault,
            { scale: 1, duration: 0.3, ease: "power2.out" },
            "-=0.15"
          )
          .set(hoverDiv, { opacity: 0 });
  
        const handleMouseEnter = () => {
          clearTimeout(hoverTimeout);
          isInside = true;
  
          if (!isHovered) {
            enterTl.restart();
            isHovered = true;
          }
        };
  
        const handleMouseLeave = () => {
          isInside = false;
          hoverTimeout = setTimeout(() => {
            if (!isInside) {
              leaveTl.restart();
              isHovered = false;
            }
          }, 50);
        };
  
        // 🔹 Eventi solo per DESKTOP (hover)
        button.addEventListener("mouseenter", handleMouseEnter);
        imgPanel.addEventListener("mouseenter", handleMouseEnter);
        button.addEventListener("mouseleave", handleMouseLeave);
        imgPanel.addEventListener("mouseleave", handleMouseLeave);
  
        window.pageSpecificListeners.push(
          { element: button, event: "mouseenter", handler: handleMouseEnter },
          { element: imgPanel, event: "mouseenter", handler: handleMouseEnter },
          { element: button, event: "mouseleave", handler: handleMouseLeave },
          { element: imgPanel, event: "mouseleave", handler: handleMouseLeave }
        );
      });
    });
  
    // 🔹 Modalità MOBILE: Disabilita hover, usa solo touch (≤991px)
    mm.add("(max-width: 991px)", () => {
      const panelIds = ["show-btn-primo", "show-btn-secondo", "show-btn-terzo"];
  
      panelIds.forEach((panelId) => {
        const button = document.getElementById(panelId);
        if (!button) return;
  
        const arrowDefault = button.querySelector(".freccia-cta-arrow");
        const arrowAbs = button.querySelector(".freccia-cta-arrow-mobile");
  
        if (!arrowDefault || !arrowAbs) return;
  
        // 🔹 Timeline per il tocco
        const touchTl = gsap.timeline({ paused: true });
        touchTl
          .to(arrowDefault, { scale: 0, duration: 0.3, ease: "power2.out" })
          .to(arrowAbs, { scale: 1, duration: 0.3, ease: "power2.out" }, "-=0.2");
  
        const handleTouchStart = () => {
          touchTl.restart();
        };
  
        const handleTouchEnd = () => {
          touchTl.reverse();
        };
  
        // 🔹 Eventi solo per MOBILE (touch)
        button.addEventListener("touchstart", handleTouchStart);
        button.addEventListener("touchend", handleTouchEnd);
  
        window.pageSpecificListeners.push(
          { element: button, event: "touchstart", handler: handleTouchStart },
          { element: button, event: "touchend", handler: handleTouchEnd }
        );
      });
    });
  }
  
  
  function setupVerticalShowcaseButtons() {
    const panels = document.querySelectorAll(".panel-item-hov");
  
    if (!panels.length) {
      console.warn("❌ setupVerticalShowcaseButtons: Nessun pannello trovato.");
      return;
    }
  
    const mm = gsap.matchMedia();
  
    mm.add("(min-width: 992px)", () => {
  
      panels.forEach((panel) => {
        const button = panel.querySelector(".btn-showcase-link");
        const hoverDiv = button?.querySelector(".btn-showcase-link-hover");
        const arrowHover = hoverDiv?.querySelector(".freccia-cta-arrow-hover");
        const arrowDefault = button?.querySelector(".freccia-cta-arrow");
  
        if (!button || !hoverDiv || !arrowHover || !arrowDefault) {
          return;
        }
  
        let enterTl = gsap.timeline({ paused: true });
        let leaveTl = gsap.timeline({ paused: true });
        let isHovered = false;
  
        // 🔹 Timeline per l'hover IN
        enterTl
          .to(hoverDiv, { scale: 1, duration: 0.3, ease: "power2.out" })
          .to(
            arrowHover,
            { scale: 1, duration: 0.3, ease: "power2.out" },
            "-=0.2"
          )
          .to(arrowDefault, { scale: 0, duration: 0.2, ease: "power2.out" }, 0.3);
  
        // 🔹 Timeline per l'hover OUT
        leaveTl
          .to([hoverDiv, arrowHover], {
            scale: 0,
            duration: 0.3,
            ease: "power2.out",
          })
          .to(
            arrowDefault,
            { scale: 1, duration: 0.3, ease: "power2.out" },
            "-=0.2"
          );
  
        const handleMouseEnter = () => {
          if (!isHovered) {
            enterTl.restart();
            isHovered = true;
          }
        };
  
        const handleMouseLeave = () => {
          if (isHovered) {
            leaveTl.restart();
            isHovered = false;
          }
        };
  
        // Aggiunge i listener SOLO al button
        button.addEventListener("mouseenter", handleMouseEnter);
        button.addEventListener("mouseleave", handleMouseLeave);
  
        // 🔹 Registra gli eventi in `window.pageSpecificListeners`
        window.pageSpecificListeners.push(
          { element: button, event: "mouseenter", handler: handleMouseEnter },
          { element: button, event: "mouseleave", handler: handleMouseLeave }
        );
      });
    });
  
    mm.add("(max-width: 991px)", () => {
  
      panels.forEach((panel) => {
        const button = panel.querySelector(".btn-showcase-link");
        const arrowDefault = button?.querySelector(".freccia-cta-arrow");
        const arrowAbs = button?.querySelector(".freccia-cta-arrow-mobile");
  
        if (!button || !arrowDefault || !arrowAbs) {
          return;
        }
  
        let touchTl = gsap.timeline({ paused: true });
        let isTouched = false;
  
        // 🔹 Timeline per il tocco
        touchTl
          .to(arrowDefault, { scale: 0, duration: 0.3, ease: "power2.out" })
          .to(arrowAbs, { scale: 1, duration: 0.3, ease: "power2.out" }, "-=0.2");
  
        const handleTouchStart = () => {
          if (!isTouched) {
            touchTl.restart();
            isTouched = true;
          }
        };
  
        const handleTouchEnd = () => {
          if (isTouched) {
            setTimeout(() => {
              touchTl.reverse();
              isTouched = false;
            }, 0); 
          }
        };
  
        // Aggiunge il listener al button
        button.addEventListener("touchstart", handleTouchStart);
        button.addEventListener("touchend", handleTouchEnd);
  
        // 🔹 Registra gli eventi in `window.pageSpecificListeners`
        window.pageSpecificListeners.push(
          { element: button, event: "touchstart", handler: handleTouchStart },
          { element: button, event: "touchend", handler: handleTouchEnd }
        );
      });
    });
  }
  
  
  // Chiama la funzione per inizializzare le animazioni
  function createScrollTriggerScrollWrapper() {
    const mm = gsap.matchMedia();
  
    // Animazione per desktop (>= 992px)
    mm.add("(min-width: 992px)", () => {
      const splitTextTop = new SplitType("#inner-t-top", {
        types: "chars",
        tagName: "span",
      });
  
      gsap.set(splitTextTop.chars, { y: 200 });
      gsap.set("#inner-line-first", { scaleX: 0 });
  
      const tl = gsap.timeline({ paused: true });
  
      tl.to("#inner-line-first", {
        scaleX: 1,
        ease: "power2.inOut",
        duration: 0.8,
        transformOrigin: "center left",
      }).to(
        splitTextTop.chars,
        {
          y: 0,
          duration: 0.5,
          stagger: { amount: 0.2 },
          ease: "power2.out",
        },
        "<"
      );
  
      ScrollTrigger.create({
        trigger: ".horizontal-scroll-wrapper",
        start: "top 60%",
        end: "top 20%",
        scrub: false,
        id: "inner-animation-h",
        toggleActions: "play none none reverse",
        onEnter: () => tl.play(),
        onLeaveBack: () => tl.reverse(),
      });
    });
  
    // Animazione per mobile (< 992px)
    mm.add("(max-width: 991px)", () => {
      const splitTextTop = new SplitType("#inner-t-top", {
        types: "chars",
        tagName: "span",
      });
  
      gsap.set(".inn-span", { y: 100, opacity: 0 });
      gsap.set(splitTextTop.chars, { y: 100 });
      gsap.set("#inner-line-first", { scaleX: 0 });
  
      const tlMobile = gsap.timeline({ paused: true });
  
      tlMobile
        .to("#inner-line-first", {
          scaleX: 1,
          ease: "power2.inOut",
          duration: 0.5,
          transformOrigin: "center left",
        })
        .to(
          splitTextTop.chars,
          {
            y: 0,
            duration: 0.5,
            stagger: { amount: 0.2 },
            ease: "power2.out",
          },
          "<"
        )
        .to(
          ".inn-span",
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: { amount: 0.2 },
            ease: "power2.out",
          },
          "-=0.3"
        );
  
      ScrollTrigger.create({
        trigger: ".horizontal-scroll-wrapper",
        start: "top 80%",
        id: "inner-animation-mobile",
        toggleActions: "play none none reverse",
        onEnter: () => tlMobile.play(),
        onLeaveBack: () => tlMobile.reverse(),
      });
    });
  }
  
  //
  function showcasePanelsScrollMobile() {
    const splitTitles = new SplitType(".panel-title", {
      types: "chars",
      tagName: "span",
    });
  
    const panels = [
      { panel: "#panelPrimo", trigger: "#triggerPrimo" },
      { panel: "#panelSecondo", trigger: "#triggerSecondo" },
      { panel: "#panelTerzo", trigger: "#triggerTerzo" },
    ];
  
    panels.forEach(({ panel, trigger }) => {
      const panelEl = document.querySelector(panel);
      const triggerEl = document.querySelector(trigger);
  
      if (!panelEl || !triggerEl) {
        console.warn(
          `showcasePanelsScrollMobile: Pannello o Trigger non trovati per ${panel}`
        );
        return;
      }
  
      const titleChars = panelEl.querySelectorAll(".panel-title .char");
      const descriptionContainer = panelEl.querySelector(".panel-desscript");
      const kindJobText = panelEl.querySelector(".panel-text.kind-job.mb-hyde");
      const button = panelEl.querySelector(".btn-showcase-link");
  
      if (!titleChars.length || !descriptionContainer || !kindJobText) {
        console.warn(`Elementi mancanti in ${panel}`);
        return;
      }
  
      // 🔹 Impostiamo i valori iniziali per evitare glitch
      gsap.set(titleChars, { y: "100%", opacity: 0 });
      gsap.set(kindJobText, { y: "100%", opacity: 0 });
      gsap.set(descriptionContainer, { y: -100 });
      gsap.set(button, { scale: 0 });
  
      // 🔹 Creiamo lo ScrollTrigger basato sul trigger fisico
      ScrollTrigger.create({
        trigger: triggerEl,
        start: "top 60%",
        end: "top 20%",
        scrub: 1,
        invalidateOnRefresh: true,
        onEnter: () => {
          gsap
            .timeline()
            .to(descriptionContainer, {
              y: 0,
              duration: 0.4,
              ease: "power2.out",
            })
            .to(
              titleChars,
              {
                y: 0,
                opacity: 1,
                stagger: { amount: 0.2 },
                duration: 0.5,
                ease: "power2.out",
              },
              "-=0.2"
            )
            .to(
              kindJobText,
              {
                y: 0,
                opacity: 1,
                duration: 0.4,
                ease: "power2.out",
              },
              "-=0.3"
            )
            .to(
              button,
              {
                scale: 1,
                duration: 0.3,
                ease: "power2.out",
              },
              "<"
            );
        },
        onLeaveBack: () => {
          gsap
            .timeline()
            .to(titleChars, {
              y: "100%",
              opacity: 0,
              duration: 0.4,
              ease: "power2.in",
            })
            .to(kindJobText, {
              y: "100%",
              opacity: 0,
              duration: 0.4,
              ease: "power2.in",
            })
            .to(descriptionContainer, {
              y: -100,
              duration: 0.5,
              ease: "power2.in",
            })
            .to(
              button,
              {
                scale: 0,
                duration: 0.3,
                ease: "power2.out",
              },
              "-=0.2"
            );
        },
      });
    });
  }
  
  function showcaseTextContentMobile() {
    const panelHovs = document.querySelectorAll(".panel-item-hov");
    const valueWrapper = document.querySelector(".value-wrapper.no-desk");
  
    panelHovs.forEach((panelHov) => {
      const itemVTitles = panelHov.querySelector(".item-v-title");
      const button = panelHov.querySelector(".btn-showcase-link");
  
      gsap.set(itemVTitles, { y: 100 });
      gsap.set(button, { scale: 0 });
  
      ScrollTrigger.create({
        trigger: panelHov,
        start: "top 60%",
        onEnter: () => {
          gsap.to(itemVTitles, {
            y: 0,
            duration: 0.4,
            ease: "power2.out",
          });
          gsap.to(button, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
          });
        },
        onLeaveBack: () => {
          gsap.to(itemVTitles, {
            y: 100,
            duration: 0.4,
            ease: "power2.in",
          });
          gsap.to(button, {
            scale: 0,
            duration: 0.3,
            ease: "power2.out",
          });
        },
      });
    });
  
    // Animazione per il valueWrapper
    if (valueWrapper) {
      const lineTitles = valueWrapper.querySelectorAll(
        ".line-title.text-par.red.no-desk"
      );
      const pointValues = valueWrapper.querySelectorAll(".point-value.no-desk");
  
      if (!lineTitles.length || !pointValues.length) {
        console.warn(
          "showcaseTextContentMobile: lineTitles o pointValues non trovati."
        );
        return;
      }
  
      // Impostiamo i valori iniziali per evitare glitch
      gsap.set(lineTitles, { width: "0%" });
      gsap.set(pointValues, { scale: 0, opacity: 0 });
  
      ScrollTrigger.create({
        trigger: valueWrapper,
        start: "top 60%",
        end: "top 20%",
        onEnter: () => {
          gsap
            .timeline()
            .to(lineTitles, {
              width: "100%",
              duration: 0.8,
              ease: "power2.inOut",
            })
            .to(
              pointValues,
              {
                scale: 1,
                opacity: 1,
                duration: 0.6,
                stagger: { amount: 0.2 },
                ease: "power2.out",
              },
              "<+=0.2"
            );
        },
        onLeaveBack: () => {
          gsap
            .timeline()
            .to(pointValues, {
              scale: 0,
              opacity: 0,
              duration: 0.5,
              ease: "power2.in",
            })
            .to(
              lineTitles,
              {
                width: "0%",
                duration: 0.6,
                ease: "power2.inOut",
              },
              "<"
            );
        },
      });
    }
  
    const splitLinesMiss = new SplitType(".miss-text.no-desk", {
      types: "lines",
      tagName: "span",
    });
  
    setTimeout(() => {
      const missText = document.querySelectorAll(".miss-text.no-desk .line");
  
      if (!missText.length) {
        console.warn(
          "showcaseTextContentMobile: Nessuna linea trovata dopo SplitType."
        );
        return;
      }
  
      gsap.set(missText, { y: 100, opacity: 0 });
  
      ScrollTrigger.create({
        trigger: valueWrapper,
        start: "center 50%",
        end: "bottom bottom",
  
        onEnter: () => {
          const tl = gsap.timeline();
          tl.to(missText, {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: { amount: 0.2 },
            ease: "power2.out",
          });
        },
        onLeaveBack: () => {
          const tlBackMiss = gsap.timeline();
          tlBackMiss.to(missText, {
            y: 100,
            opacity: 0,
            duration: 0.4,
            ease: "power2.in",
          });
        },
      });
    }, 100); // Ritardo per garantire che il DOM sia aggiornato
  }

  function propositoHomePage() {
    const trigger = document.querySelector(".proposito-section");
    if (!trigger) {
      return;
    }
  
    // Elementi da animare
    const heading = trigger.querySelectorAll(".pro");
    const subHeading = trigger.querySelectorAll(".pro-top");
    if (!heading) {
      return;
    }
  
    //  Desktop Animation (>= 992px)
  
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: trigger,
        start: "top 70%",
        end: "top 10%",
        toggleActions: "play none none reverse",
      },
    });
    tl.to(heading, {
      y: 0,
      ease: "power2.out",
      duration: 0.6,
      stagger: 0.2,
    }).to(
      subHeading,
      {
        y: "100%",
        ease: "power2.out",
        duration: 0.6,
        stagger: 0.2,
      },
      "-=0.95"
    );
  }

  //

  //Scroll Trigger per ogni pagina
  function pageServiceScrollTriggerDesign() {
    if (typeof ScrollTrigger === "undefined" || typeof gsap === "undefined") {
      console.error(
        "⚠️ GSAP o ScrollTrigger non sono stati caricati correttamente."
      );
      return;
    }
    //-Elementi
    const firstH = document.getElementById("first-heading");
    const secondH = document.getElementById("second-heading");
    const thirdH = document.getElementById("third-heading");
    const divCit = document.getElementById("citation");
    //-first
    const firstPreH = firstH.querySelector(".section-pre-title-page");
    const firstPostH = firstH.querySelector(".section-post-title-page");
    const firstLineH = firstH.querySelector(".line-title-section");
    gsap.set(firstLineH, { scaleX: 0, transformOrigin: "center left" });
    const firstNumberH = firstH.querySelector(".section-pre-title-page-number");
    gsap.set(firstNumberH, { y: 150 });
    const imgCit = divCit.querySelector(".di-img-cit-aut");
  
    gsap.set(firstPreH, { y: 150 });
    gsap.set(firstPostH, { y: -150 });
    gsap.set(imgCit, { scale: 0, rotateZ: 45 });
    //-second
    const secondPreH = secondH.querySelector(".section-pre-title-page");
    const secondPostH = secondH.querySelector(".section-post-title-page");
    const secondLineH = secondH.querySelector(".line-title-section");
    gsap.set(secondLineH, { scaleX: 0, transformOrigin: "center left" });
    const secondNumberH = secondH.querySelector(".section-pre-title-page-number");
    gsap.set(secondNumberH, { y: 150 });
  
    gsap.set(secondPreH, { y: 150 });
    gsap.set(secondPostH, { y: -150 });
    //-third
  
    const thirdLineH = thirdH.querySelector(".line-title-section");
    gsap.set(thirdLineH, { scaleX: 0, transformOrigin: "center left" });
    const thirdNumberH = thirdH.querySelector(".section-pre-title-page-number");
    gsap.set(thirdNumberH, { y: 150 });
  
    //
    function playAnimationFirst() {
      const firstHtl = gsap.timeline();
  
      firstHtl
        .to(firstLineH, {
          scaleX: 1,
          duration: 0.8,
          ease: "power1.out",
        })
        .to(
          firstPreH,
          {
            y: 0,
            duration: 0.4,
            ease: "power2.out",
          },
          "-=0.6"
        )
        .to(
          firstPostH,
          {
            y: 0,
            duration: 0.4,
            ease: "power2.out",
          },
          "<"
        )
        .to(
          firstNumberH,
          {
            y: 0,
            duration: 0.3,
            ease: "power2.out",
          },
          "-=0.2"
        );
    }
  
    function reverseAnimationFirst() {
      const reverseTl = gsap.timeline();
  
      reverseTl
        .to(firstLineH, {
          scaleX: 0,
          duration: 0.5,
          ease: "power2.inOut",
        })
        .to(
          firstPreH,
          {
            y: 150,
            duration: 0.3,
            ease: "power2.in",
          },
          "-=0.3"
        )
        .to(
          firstPostH,
          {
            y: -150,
            duration: 0.3,
            ease: "power2.in",
          },
          "<"
        )
        .to(
          firstNumberH,
          {
            y: 150,
            duration: 0.3,
            ease: "power2.in",
          },
          "<"
        );
    }
  
    ScrollTrigger.create({
      trigger: firstH,
      start: "top 80%",
      end: "top center",
      onEnter: () => {
        playAnimationFirst();
      },
      onLeaveBack: () => {
        reverseAnimationFirst();
      },
    });
  
    ScrollTrigger.create({
      trigger: divCit,
      start: "top center",
      end: "top top",
      onEnter: () => {
        gsap.to(imgCit, { scale: 1, duration: 0.6, ease: "bounce.out" });
      },
      onLeaveBack: () => {
        gsap.to(imgCit, { scale: 0, duration: 0.4, ease: "power2.out" });
      },
    });
  
    function playAnimationSecond() {
      const playTl = gsap.timeline();
  
      playTl
        .to(secondLineH, {
          scaleX: 1,
          duration: 0.8,
          ease: "power1.out",
        })
        .to(
          secondPreH,
          {
            y: 0,
            duration: 0.4,
            ease: "power2.out",
          },
          "-=0.6"
        )
        .to(
          secondPostH,
          {
            y: 0,
            duration: 0.4,
            ease: "power2.out",
          },
          "<"
        )
        .to(
          secondNumberH,
          {
            y: 0,
            duration: 0.3,
            ease: "power2.out",
          },
          "-=0.2"
        );
    }
  
    function reverseAnimationSecond() {
      const reverseTl = gsap.timeline();
  
      reverseTl
        .to(secondLineH, {
          scaleX: 0,
          duration: 0.5,
          ease: "power2.inOut",
        })
        .to(
          secondPreH,
          {
            y: 150,
            duration: 0.3,
            ease: "power2.in",
          },
          "-=0.3"
        )
        .to(
          secondPostH,
          {
            y: -150,
            duration: 0.3,
            ease: "power2.in",
          },
          "<"
        )
        .to(
          secondNumberH,
          {
            y: 150,
            duration: 0.3,
            ease: "power2.in",
          },
          "<"
        );
    }
  
    ScrollTrigger.create({
      trigger: secondH,
      start: "top 80%",
      end: "top center",
      onEnter: () => {
        playAnimationSecond();
      },
      onLeaveBack: () => {
        reverseAnimationSecond();
      },
    });
  
    ScrollTrigger.create({
      trigger: thirdH,
      start: "top 80%",
      end: "top center",
      onEnter: () => {
        gsap
          .timeline()
          .to(thirdLineH, {
            scaleX: 1,
            duration: 0.8,
            ease: "power1.out",
          })
          .to(
            thirdNumberH,
            {
              y: 0,
              duration: 0.3,
              ease: "power2.out",
            },
            "-=0.4"
          );
      },
      onLeaveBack: () => {
        gsap
          .timeline()
          .to(thirdLineH, {
            scaleX: 0,
            duration: 0.5,
            ease: "power2.inOut",
          })
          .to(
            thirdNumberH,
            {
              y: 150,
              duration: 0.3,
              ease: "power2.out",
            },
            "<"
          );
      },
    });
  }
  
  function pageServiceScrollTriggerWeb() {
    if (typeof ScrollTrigger === "undefined" || typeof gsap === "undefined") {
      console.error(
        "⚠️ GSAP o ScrollTrigger non sono stati caricati correttamente."
      );
      return;
    }
    //-Elementi
    const firstH = document.getElementById("first-heading");
    const secondH = document.getElementById("second-heading");
    const thirdH = document.getElementById("third-heading");
    const fourthH = document.getElementById("fourth-heading");
    const divCit = document.getElementById("citation");
    //-first
    const firstPreH = firstH.querySelector(".section-pre-title-page");
    const firstPostH = firstH.querySelector(".section-post-title-page");
    const firstLineH = firstH.querySelector(".line-title-section");
    gsap.set(firstLineH, { scaleX: 0, transformOrigin: "center left" });
    const firstNumberH = firstH.querySelector(".section-pre-title-page-number");
    gsap.set(firstNumberH, { y: 150 });
    const imgCit = divCit.querySelector(".di-img-cit-aut");
  
    gsap.set(firstPreH, { y: 150 });
    gsap.set(firstPostH, { y: -150 });
    gsap.set(imgCit, { scale: 0, rotateZ: 45 });
    //-second
  
    const secondPostH = secondH.querySelector(".section-post-title-page");
    const secondLineH = secondH.querySelector(".line-title-section");
    gsap.set(secondLineH, { scaleX: 0, transformOrigin: "center left" });
    const secondNumberH = secondH.querySelector(".section-pre-title-page-number");
    gsap.set(secondNumberH, { y: 150 });
    gsap.set(secondPostH, { y: 150 });
    //-third
    const thirdPreH = thirdH.querySelector(".section-pre-title-page");
    const thirdPostH = thirdH.querySelector(".section-post-title-page");
    gsap.set(thirdPreH, { y: 150 });
    gsap.set(thirdPostH, { y: -150 });
    const thirdLineH = thirdH.querySelector(".line-title-section");
    gsap.set(thirdLineH, { scaleX: 0, transformOrigin: "center left" });
    const thirdNumberH = thirdH.querySelector(".section-pre-title-page-number");
    gsap.set(thirdNumberH, { y: 150 });
    //-fourth
    const fourthLineH = fourthH.querySelector(".line-title-section");
    gsap.set(fourthLineH, { scaleX: 0, transformOrigin: "center left" });
    const fourthNumberH = fourthH.querySelector(".section-pre-title-page-number");
    gsap.set(fourthNumberH, { y: 150 });
  
    //
    function playAnimationFirst() {
      const firstHtl = gsap.timeline();
  
      firstHtl
        .to(firstLineH, {
          scaleX: 1,
          duration: 0.8,
          ease: "power1.out",
        })
        .to(
          firstPreH,
          {
            y: 0,
            duration: 0.4,
            ease: "power2.out",
          },
          "-=0.6"
        )
        .to(
          firstPostH,
          {
            y: 0,
            duration: 0.4,
            ease: "power2.out",
          },
          "<"
        )
        .to(
          firstNumberH,
          {
            y: 0,
            duration: 0.3,
            ease: "power2.out",
          },
          "-=0.2"
        );
    }
  
    function reverseAnimationFirst() {
      const reverseTl = gsap.timeline();
  
      reverseTl
        .to(firstLineH, {
          scaleX: 0,
          duration: 0.5,
          ease: "power2.inOut",
        })
        .to(
          firstPreH,
          {
            y: 150,
            duration: 0.3,
            ease: "power2.in",
          },
          "-=0.3"
        )
        .to(
          firstPostH,
          {
            y: -150,
            duration: 0.3,
            ease: "power2.in",
          },
          "<"
        )
        .to(
          firstNumberH,
          {
            y: 150,
            duration: 0.3,
            ease: "power2.in",
          },
          "<"
        );
    }
  
    ScrollTrigger.create({
      trigger: firstH,
      start: "top 80%",
      end: "top center",
      onEnter: () => {
        playAnimationFirst();
      },
      onLeaveBack: () => {
        reverseAnimationFirst();
      },
    });
  
    ScrollTrigger.create({
      trigger: divCit,
      start: "top center",
      end: "top top",
      onEnter: () => {
        gsap.to(imgCit, { scale: 1, duration: 0.6, ease: "bounce.out" });
      },
      onLeaveBack: () => {
        gsap.to(imgCit, { scale: 0, duration: 0.4, ease: "power2.out" });
      },
    });
  
    function playAnimationSecond() {
      const playTl = gsap.timeline();
  
      playTl
        .to(secondLineH, {
          scaleX: 1,
          duration: 0.8,
          ease: "power1.out",
        })
        .to(
          secondPostH,
          {
            y: 0,
            duration: 0.4,
            ease: "power2.out",
          },
          "-=0.6"
        )
        .to(
          secondNumberH,
          {
            y: 0,
            duration: 0.3,
            ease: "power2.out",
          },
          "-=0.2"
        );
    }
  
    function reverseAnimationSecond() {
      const reverseTl = gsap.timeline();
  
      reverseTl
        .to(secondLineH, {
          scaleX: 0,
          duration: 0.5,
          ease: "power2.inOut",
        })
        .to(
          secondPostH,
          {
            y: 150,
            duration: 0.3,
            ease: "power2.in",
          },
          "-=0.3"
        )
        .to(
          secondNumberH,
          {
            y: 150,
            duration: 0.3,
            ease: "power2.in",
          },
          "<"
        );
    }
  
    ScrollTrigger.create({
      trigger: secondH,
      start: "top 80%",
      end: "top center",
      onEnter: () => {
        playAnimationSecond();
      },
      onLeaveBack: () => {
        reverseAnimationSecond();
      },
    });
  
    ScrollTrigger.create({
      trigger: fourthH,
      start: "top 80%",
      end: "top center",
      onEnter: () => {
        gsap
          .timeline()
          .to(fourthLineH, {
            scaleX: 1,
            duration: 0.8,
            ease: "power1.out",
          })
          .to(
            fourthNumberH,
            {
              y: 0,
              duration: 0.3,
              ease: "power2.out",
            },
            "-=0.4"
          );
      },
      onLeaveBack: () => {
        gsap
          .timeline()
          .to(fourthLineH, {
            scaleX: 0,
            duration: 0.5,
            ease: "power2.inOut",
          })
          .to(
            fourthNumberH,
            {
              y: 150,
              duration: 0.3,
              ease: "power2.out",
            },
            "<"
          );
      },
    });
    function playAnimationThird() {
      const firstHtl = gsap.timeline();
  
      firstHtl
        .to(thirdLineH, {
          scaleX: 1,
          duration: 0.8,
          ease: "power1.out",
        })
        .to(
          thirdPreH,
          {
            y: 0,
            duration: 0.4,
            ease: "power2.out",
          },
          "-=0.6"
        )
        .to(
          thirdPostH,
          {
            y: 0,
            duration: 0.4,
            ease: "power2.out",
          },
          "<"
        )
        .to(
          thirdNumberH,
          {
            y: 0,
            duration: 0.3,
            ease: "power2.out",
          },
          "-=0.2"
        );
    }
  
    function reverseAnimationThird() {
      const reverseTl = gsap.timeline();
  
      reverseTl
        .to(thirdLineH, {
          scaleX: 0,
          duration: 0.5,
          ease: "power2.inOut",
        })
        .to(
          thirdPreH,
          {
            y: 150,
            duration: 0.3,
            ease: "power2.in",
          },
          "-=0.3"
        )
        .to(
          thirdPostH,
          {
            y: -150,
            duration: 0.3,
            ease: "power2.in",
          },
          "<"
        )
        .to(
          thirdNumberH,
          {
            y: 150,
            duration: 0.3,
            ease: "power2.in",
          },
          "<"
        );
    }
  
    ScrollTrigger.create({
      trigger: thirdH,
      start: "top 80%",
      end: "top center",
      onEnter: () => {
        playAnimationThird();
      },
      onLeaveBack: () => {
        reverseAnimationThird();
      },
    });
  }
  
  function pageServiceScrollTriggerSeo() {
    if (typeof ScrollTrigger === "undefined" || typeof gsap === "undefined") {
      console.error(
        "⚠️ GSAP o ScrollTrigger non sono stati caricati correttamente."
      );
      return;
    }
    //-Elementi
    const firstH = document.getElementById("first-heading");
    const secondH = document.getElementById("second-heading");
    const thirdH = document.getElementById("third-heading");
    const divCit = document.getElementById("citation");
    //-first
    const firstPreH = firstH.querySelector(".section-pre-title-page");
    const firstPostH = firstH.querySelector(".section-post-title-page");
    const firstLineH = firstH.querySelector(".line-title-section");
    gsap.set(firstLineH, { scaleX: 0, transformOrigin: "center left" });
    const firstNumberH = firstH.querySelector(".section-pre-title-page-number");
    gsap.set(firstNumberH, { y: 150 });
    const imgCit = divCit.querySelector(".di-img-cit-aut");
  
    gsap.set(firstPreH, { y: 150 });
    gsap.set(firstPostH, { y: -150 });
    gsap.set(imgCit, { scale: 0, rotateZ: 45 });
    //-second
    const secondPreH = secondH.querySelector(".section-pre-title-page");
    const secondPostH = secondH.querySelector(".section-post-title-page");
    const secondLineH = secondH.querySelector(".line-title-section");
    gsap.set(secondLineH, { scaleX: 0, transformOrigin: "center left" });
    const secondNumberH = secondH.querySelector(".section-pre-title-page-number");
    gsap.set(secondNumberH, { y: 150 });
  
    gsap.set(secondPreH, { y: 150 });
    gsap.set(secondPostH, { y: -150 });
    //-third
  
    const thirdLineH = thirdH.querySelector(".line-title-section");
    gsap.set(thirdLineH, { scaleX: 0, transformOrigin: "center left" });
    const thirdNumberH = thirdH.querySelector(".section-pre-title-page-number");
    gsap.set(thirdNumberH, { y: 150 });
  
    //
    function playAnimationFirst() {
      const firstHtl = gsap.timeline();
  
      firstHtl
        .to(firstLineH, {
          scaleX: 1,
          duration: 0.8,
          ease: "power1.out",
        })
        .to(
          firstPreH,
          {
            y: 0,
            duration: 0.4,
            ease: "power2.out",
          },
          "-=0.6"
        )
        .to(
          firstPostH,
          {
            y: 0,
            duration: 0.4,
            ease: "power2.out",
          },
          "<"
        )
        .to(
          firstNumberH,
          {
            y: 0,
            duration: 0.3,
            ease: "power2.out",
          },
          "-=0.2"
        );
    }
  
    function reverseAnimationFirst() {
      const reverseTl = gsap.timeline();
  
      reverseTl
        .to(firstLineH, {
          scaleX: 0,
          duration: 0.5,
          ease: "power2.inOut",
        })
        .to(
          firstPreH,
          {
            y: 150,
            duration: 0.3,
            ease: "power2.in",
          },
          "-=0.3"
        )
        .to(
          firstPostH,
          {
            y: -150,
            duration: 0.3,
            ease: "power2.in",
          },
          "<"
        )
        .to(
          firstNumberH,
          {
            y: 150,
            duration: 0.3,
            ease: "power2.in",
          },
          "<"
        );
    }
  
    ScrollTrigger.create({
      trigger: firstH,
      start: "top 80%",
      end: "top center",
      onEnter: () => {
        playAnimationFirst();
      },
      onLeaveBack: () => {
        reverseAnimationFirst();
      },
    });
  
    ScrollTrigger.create({
      trigger: divCit,
      start: "top center",
      end: "top top",
      onEnter: () => {
        gsap.to(imgCit, { scale: 1, duration: 0.6, ease: "bounce.out" });
      },
      onLeaveBack: () => {
        gsap.to(imgCit, { scale: 0, duration: 0.4, ease: "power2.out" });
      },
    });
  
    function playAnimationSecond() {
      const playTl = gsap.timeline();
  
      playTl
        .to(secondLineH, {
          scaleX: 1,
          duration: 0.8,
          ease: "power1.out",
        })
        .to(
          secondPreH,
          {
            y: 0,
            duration: 0.4,
            ease: "power2.out",
          },
          "-=0.6"
        )
        .to(
          secondPostH,
          {
            y: 0,
            duration: 0.4,
            ease: "power2.out",
          },
          "<"
        )
        .to(
          secondNumberH,
          {
            y: 0,
            duration: 0.3,
            ease: "power2.out",
          },
          "-=0.2"
        );
    }
  
    function reverseAnimationSecond() {
      const reverseTl = gsap.timeline();
  
      reverseTl
        .to(secondLineH, {
          scaleX: 0,
          duration: 0.5,
          ease: "power2.inOut",
        })
        .to(
          secondPreH,
          {
            y: 150,
            duration: 0.3,
            ease: "power2.in",
          },
          "-=0.3"
        )
        .to(
          secondPostH,
          {
            y: -150,
            duration: 0.3,
            ease: "power2.in",
          },
          "<"
        )
        .to(
          secondNumberH,
          {
            y: 150,
            duration: 0.3,
            ease: "power2.in",
          },
          "<"
        );
    }
  
    ScrollTrigger.create({
      trigger: secondH,
      start: "top 80%",
      end: "top center",
      onEnter: () => {
        playAnimationSecond();
      },
      onLeaveBack: () => {
        reverseAnimationSecond();
      },
    });
  
    ScrollTrigger.create({
      trigger: thirdH,
      start: "top 30%",
      end: "top top",
      onEnter: () => {
        gsap
          .timeline()
          .to(thirdLineH, {
            scaleX: 1,
            duration: 0.8,
            ease: "power1.out",
          })
          .to(
            thirdNumberH,
            {
              y: 0,
              duration: 0.3,
              ease: "power2.out",
            },
            "-=0.4"
          );
      },
      onLeaveBack: () => {
        gsap
          .timeline()
          .to(thirdLineH, {
            scaleX: 0,
            duration: 0.5,
            ease: "power2.inOut",
          })
          .to(
            thirdNumberH,
            {
              y: 150,
              duration: 0.3,
              ease: "power2.out",
            },
            "<"
          );
      },
    });
  }
  
  function pageServiceScrollTriggerAbout() {
    if (typeof ScrollTrigger === "undefined" || typeof gsap === "undefined") {
      console.error(
        "⚠️ GSAP o ScrollTrigger non sono stati caricati correttamente."
      );
      return;
    }
    //-Elementi
    const divCit = document.getElementById("citation");
    //-first
  
    const imgCit = divCit.querySelector(".di-img-cit-aut");
  
    gsap.set(imgCit, { scale: 0 });
  
    ScrollTrigger.create({
      trigger: divCit,
      start: "top center",
      end: "top top",
      onEnter: () => {
        gsap.to(imgCit, { scale: 1, duration: 0.6, ease: "bounce.out" });
      },
      onLeaveBack: () => {
        gsap.to(imgCit, { scale: 0, duration: 0.4, ease: "power2.out" });
      },
    });
  }
  
  function pageServiceScrollTriggerWomen() {
    if (typeof ScrollTrigger === "undefined" || typeof gsap === "undefined") {
      console.error(
        "⚠️ GSAP o ScrollTrigger non sono stati caricati correttamente."
      );
      return;
    }
    //-Elementi
    const firstH = document.getElementById("first-heading");
    const secondH = document.getElementById("second-heading");
    const thirdH = document.getElementById("third-heading");
    const divCit = document.getElementById("citation");
    //-first
    const firstPreH = firstH.querySelector(".section-pre-title-page");
    const firstPostH = firstH.querySelector(".section-post-title-page");
    const firstLineH = firstH.querySelector(".line-title-section");
    gsap.set(firstLineH, { scaleX: 0, transformOrigin: "center left" });
    const firstNumberH = firstH.querySelector(".section-pre-title-page-number");
    gsap.set(firstNumberH, { y: 150 });
    const imgCit = divCit.querySelector(".di-img-cit-aut");
  
    gsap.set(firstPreH, { y: 150 });
    gsap.set(firstPostH, { y: -150 });
    gsap.set(imgCit, { scale: 0, rotateZ: 45 });
    //-third
  
    const thirdLineH = thirdH.querySelector(".line-title-section");
    gsap.set(thirdLineH, { scaleX: 0, transformOrigin: "center left" });
    const thirdNumberH = thirdH.querySelector(".section-pre-title-page-number");
    gsap.set(thirdNumberH, { y: 150 });
  
    //
    function playAnimationFirst() {
      const firstHtl = gsap.timeline();
  
      firstHtl
        .to(firstLineH, {
          scaleX: 1,
          duration: 0.8,
          ease: "power1.out",
        })
        .to(
          firstPreH,
          {
            y: 0,
            duration: 0.4,
            ease: "power2.out",
          },
          "-=0.6"
        )
        .to(
          firstPostH,
          {
            y: 0,
            duration: 0.4,
            ease: "power2.out",
          },
          "<"
        )
        .to(
          firstNumberH,
          {
            y: 0,
            duration: 0.3,
            ease: "power2.out",
          },
          "-=0.2"
        );
    }
  
    function reverseAnimationFirst() {
      const reverseTl = gsap.timeline();
  
      reverseTl
        .to(firstLineH, {
          scaleX: 0,
          duration: 0.5,
          ease: "power2.inOut",
        })
        .to(
          firstPreH,
          {
            y: 150,
            duration: 0.3,
            ease: "power2.in",
          },
          "-=0.3"
        )
        .to(
          firstPostH,
          {
            y: -150,
            duration: 0.3,
            ease: "power2.in",
          },
          "<"
        )
        .to(
          firstNumberH,
          {
            y: 150,
            duration: 0.3,
            ease: "power2.in",
          },
          "<"
        );
    }
  
    ScrollTrigger.create({
      trigger: firstH,
      start: "top 80%",
      end: "top center",
      onEnter: () => {
        playAnimationFirst();
      },
      onLeaveBack: () => {
        reverseAnimationFirst();
      },
    });
  
    ScrollTrigger.create({
      trigger: divCit,
      start: "top center",
      end: "top top",
      onEnter: () => {
        gsap.to(imgCit, { scale: 1, duration: 0.6, ease: "bounce.out" });
      },
      onLeaveBack: () => {
        gsap.to(imgCit, { scale: 0, duration: 0.4, ease: "power2.out" });
      },
    });
  
    ScrollTrigger.create({
      trigger: thirdH,
      start: "top 80%",
      end: "top center",
      onEnter: () => {
        gsap
          .timeline()
          .to(thirdLineH, {
            scaleX: 1,
            duration: 0.8,
            ease: "power1.out",
          })
          .to(
            thirdNumberH,
            {
              y: 0,
              duration: 0.3,
              ease: "power2.out",
            },
            "-=0.4"
          );
      },
      onLeaveBack: () => {
        gsap
          .timeline()
          .to(thirdLineH, {
            scaleX: 0,
            duration: 0.5,
            ease: "power2.inOut",
          })
          .to(
            thirdNumberH,
            {
              y: 150,
              duration: 0.3,
              ease: "power2.out",
            },
            "<"
          );
      },
    });
  }

  function createScrollTriggerHero() {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 992px)", () => {
      ScrollTrigger.create({
        trigger: "#hero",
        start: "bottom 95%",
        scrub: true,
        id: "hero-trigger",
        onEnter: () => {
          gsap
            .timeline()
            .to(".menu-desktop", {
              rotateX: 90,
              ease: "power2.inOut",
              duration: 0.2,
            })
            .to(
              "#scroll-bar-home",
              {
                opacity: 1,
                ease: "power2.out",
                duration: 0.6,
              },
              "<"
            )
            .to(
              header.burgerBlock,
              {
                scale: 1,
                duration: 0.6,
                ease: "power2.inOut",
              },
              "<"
            );
        },
        onLeaveBack: () => {
          gsap
            .timeline()
            .to(header.burgerBlock, {
              scale: 0,
              duration: 0.4,
              ease: "power2.inOut",
            })
            .to(
              "#scroll-bar-home",
              {
                opacity: 0,
                ease: "power2.out",
                duration: 0.2,
              },
              "<"
            )
            .to(".menu-desktop", {
              rotateX: 0,
              ease: "power2.inOut",
              duration: 0.6,
            });
        },
      });
    });
  
    const tlScroll = gsap.timeline({
      scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "bottom 20%",
        scrub: true,
      },
    });
    mm.add("(min-width: 992px)", () => {
      tlScroll
        .to(".sphere", { scale: 1.8, duration: 1 })
        .to(
          ".square",
          { scale: 0.5, y: 200, duration: 1, transformOrigin: "bottom right" },
          "<"
        )
        .to(".arrow", { rotateZ: 90, y: 150, duration: 1 }, "<");
    });
    mm.add("(min-width: 768px) and (max-width: 991px)", () => {
      tlScroll
        .to(".sphere", { scale: 1.5, duration: 1 })
        .to(
          ".square",
          { scale: 0.6, y: 200, duration: 1, transformOrigin: "bottom left" },
          "<"
        )
        .to(".arrow", { rotateZ: 90, y: 150, duration: 1 }, "<");
    });
    mm.add("(max-width: 767px)", () => {
      tlScroll
        .to(".sphere", { scale: 2, duration: 1.5 })
        .to(
          ".square",
          { scale: 0.4, y: 200, transformOrigin: "bottom left", duration: 2 },
          "<"
        )
        .to(".arrow", { rotateZ: 90, y: 150, duration: 1.5 }, "<");
    });
  }

  //
  //servizi e CTA
  function ctaAnimations() {
    const boxes = document.querySelectorAll(".btn-cta");
    gsap.set(boxes, { x: "120%" });
  
    boxes.forEach((box) => {
      const gradientDiv = box.querySelector(".button-bg-gradient");
      const gradientLight = box.querySelector(".button-bg-gradient-light");
  
      if (!gradientDiv) {
        console.error("Element gradientDiv not found.");
        return;
      }
  
      const color1 = getComputedStyle(gradientDiv)
        .getPropertyValue("--background-first")
        .trim();
      const color2 = getComputedStyle(gradientDiv)
        .getPropertyValue("--primary")
        .trim();
  
      const createTimeline = () => {
        const animationTimeline = gsap.timeline({ paused: true });
        animationTimeline.to(
          gradientDiv,
          {
            backgroundImage: `linear-gradient(to right, ${color1}, ${color2})`,
            duration: 0.6,
            ease: "sine.inOut",
          },
          0
        );
  
        if (gradientLight) {
          animationTimeline.to(
            gradientLight,
            { ease: "sine.inOut", opacity: 0, duration: 0.6 },
            "<"
          );
        }
  
        animationTimeline
          .to(
            box.querySelector(".button-spacer"),
            {
              width: "5%",
              duration: 0.6,
              ease: "power2.out",
            },
            0
          )
  
          .to(
            box.querySelector(".text-cta"),
            {
              marginRight: "0.75rem",
              duration: 0.6,
              ease: "power2.out",
            },
            "<"
          )
          .to(
            box.querySelector(".freccia-cta"),
            {
              scale: 1.1,
              duration: 0.6,
              ease: "power2.out",
            },
            "<"
          );
  
        const playAnimation = () => animationTimeline.play();
        const reverseAnimation = () => animationTimeline.reverse();
  
        box.addEventListener("mouseenter", playAnimation);
        box.addEventListener("mouseleave", reverseAnimation);
        box.addEventListener("touchstart", playAnimation);
        box.addEventListener("touchend", reverseAnimation);
  
        return animationTimeline;
      };
  
      gsap.matchMedia().add("(min-width: 992px)", () => {
        createTimeline();
      });
  
      gsap.matchMedia().add("(min-width: 320px) and (max-width: 991px)", () => {
        createTimeline();
      });
  
      gsap.matchMedia().add("(max-width: 992px)", () => {
        const loopTimeline = gsap.timeline({ repeat: -1, yoyo: true });
  
        loopTimeline.to(
          gradientDiv,
          {
            backgroundImage: `linear-gradient(to right, ${color1}, ${color2})`,
            duration: 2,
            ease: "sine.inOut",
          },
          0
        );
  
        if (gradientLight) {
          loopTimeline.to(
            gradientLight,
            {
              opacity: 0,
              duration: 2,
              ease: "sine.inOut",
            },
            "<"
          );
        }
  
        loopTimeline.to(
          gradientDiv,
          {
            backgroundImage: `linear-gradient(to right, ${color2}, ${color1})`,
            duration: 2,
            ease: "sine.inOut",
          },
          2
        );
  
        if (gradientLight) {
          loopTimeline.to(
            gradientLight,
            {
              opacity: 1,
              duration: 2,
              ease: "sine.inOut",
            },
            "<"
          );
        }
  
        loopTimeline.play();
  
        const stopLoop = () => loopTimeline.pause();
        const resumeLoop = () => loopTimeline.play();
  
        box.addEventListener("touchstart", stopLoop);
        box.addEventListener("touchend", resumeLoop);
        box.addEventListener("mouseenter", stopLoop);
        box.addEventListener("mouseleave", resumeLoop);
      });
  
      if (!box.classList.contains("herotop")) {
        ScrollTrigger.create({
          trigger: box,
          start: "top 95%",
          end: "bottom 5%",
          toggleActions: "play none none reverse",
          onEnter: () =>
            gsap.to(box, { x: 0, duration: 0.6, ease: "power2.out" }),
        });
      }
    });
  }
  function serviceWrapper() {
    gsap.set(".color-cover", { width: "100%" });
    const splitH3 = new SplitType(".heading-h3-service", {
      types: "words",
      tagName: "span",
    });
    const splitPar = new SplitType(".paragraph-service", {
      types: "lines",
      tagName: "span",
    });
  
    const splitWords = document.querySelectorAll(".heading-h3-service .word");
    gsap.set(splitWords, { y: -100 });
    const splitLines = document.querySelectorAll(".paragraph-service .line");
    gsap.set(splitLines, { y: 50, opacity: 0 });
    const containers = document.querySelectorAll(".service-wrapper-container");
  
    containers.forEach((container) => {
      const colorCover = container.querySelector(".color-cover");
      const h3Words = container.querySelectorAll(".heading-h3-service .word");
      const lineTitle = container.querySelector(".line-title-section");
      const list = container.querySelectorAll(".list");
      const line = container.querySelector(".container-list-serv.abs");
      const par = container.querySelectorAll(".paragraph-service .line");
      gsap.set(lineTitle, { width: "0%" });
  
      ScrollTrigger.create({
        trigger: container,
        start: "top 70%",
        scrub: 1, // Questo rimane perché vogliamo l'effetto progressivo
        toggleActions: "play none none none",
        onEnter: () => {
          gsap
            .timeline()
            .to(lineTitle, {
              width: "100%",
              duration: 0.6,
              ease: "power2.out",
            })
            .to(
              h3Words,
              {
                y: 0,
                duration: 0.4,
                stagger: 0.1,
                ease: "power2.out",
              },
              "-=0.4"
            );
        },
      });
  
      // **Animazione Color Cover (50%) - Rimane legata allo scroll**
      ScrollTrigger.create({
        trigger: container,
        start: "top 50%",
        scrub: true, // Questo rimane perché vogliamo l'effetto progressivo
        toggleActions: "play none none none",
        onEnter: () => {
          gsap.to(colorCover, {
            x: "100%",
            duration: 1,
            ease: "power2.inOut",
          });
        },
      });
  
      // **Gestione Mobile e Desktop**
      if (window.innerWidth > 991) {
        // **Animazione per Desktop (NON legata allo scroll)**
        ScrollTrigger.create({
          trigger: container,
          start: "top 20%",
          toggleActions: "play none none none", // Attivazione immediata
          once: true, // Si attiva una sola volta
          animation: gsap
            .timeline()
            .to(par, {
              y: 0,
              opacity: 1,
              duration: 0.3,
              stagger: 0.15,
              ease: "power2.out",
            })
            .to(line, { height: "100%", ease: "power2.out", duration: 0.6 }, "<")
            .to(
              list,
              {
                opacity: 1,
                rotateX: 0,
                duration: 0.6,
                stagger: 0.05,
                ease: "power2.inOut",
              },
              "<"
            ),
        });
      } else {
        // **Animazione per Mobile (NON legata allo scroll)**
        ScrollTrigger.create({
          trigger: container,
          start: "top 20%",
          toggleActions: "play none none none", // Attivazione immediata
          once: true, // Si attiva una sola volta
          animation: gsap
            .timeline()
            .to(par, {
              y: 0,
              opacity: 1,
              duration: 0.3,
              stagger: 0.15,
              ease: "power2.out",
            })
            .to(
              list,
              {
                opacity: 1,
                rotateX: 0,
                duration: 0.6,
                stagger: 0.1,
                ease: "power2.inOut",
              },
              "<"
            ),
        });
      }
    });
  
    // **Forza un refresh di ScrollTrigger al resize**
    window.addEventListener("resize", () => ScrollTrigger.refresh());
  }

  function setupGenericButtons() {
    const header = document.getElementById("case-heading");
    if (!header) {
      console.warn("setupGenericButtons: Header non trovato.");
      return;
    }
  
    const button = header.querySelector(".btn-showcase-link");
    if (!button) {     
      return;
    }
  
    const hoverDiv = button.querySelector(".btn-showcase-link-hover");
    const arrowHover = hoverDiv
      ? hoverDiv.querySelector(".freccia-cta-arrow-hover")
      : null;
    const arrowDefault = button.querySelector(".freccia-cta-arrow");
  
    if (!hoverDiv || !arrowHover || !arrowDefault) {
      console.warn("setupGenericButtons: Elementi non trovati nel bottone.");
      return;
    }
  
    // Timeline per l'hover/touch IN
    const enterTl = gsap.timeline({ paused: true });
    enterTl
      .to(hoverDiv, { scale: 1, duration: 0.3, ease: "power2.out" })
      .to(arrowHover, { scale: 1, duration: 0.3, ease: "power2.out" }, "-=0.15")
      .to(arrowDefault, { scale: 0, duration: 0.2, ease: "power2.out" }, 0.3);
  
    // Timeline per l'hover/touch OUT
    const leaveTl = gsap.timeline({ paused: true });
    leaveTl
      .to([hoverDiv, arrowHover], { scale: 0, duration: 0.3, ease: "power2.out" })
      .to(
        arrowDefault,
        { scale: 1, duration: 0.3, ease: "power2.out" },
        "-=0.15"
      );
  
    let isHovered = false;
  
    const handleEnter = () => {
      if (!isHovered) {
        enterTl.restart();
        isHovered = true;
      }
    };
  
    const handleLeave = () => {
      if (isHovered) {
        setTimeout(() => {
          leaveTl.restart();
          isHovered = false;
        }, 0);
      }
    };
  
    // Aggiungiamo eventi per hover (desktop) e touch (mobile)
    const eventPairs = [
      { element: button, event: "mouseenter", handler: handleEnter },
      { element: button, event: "mouseleave", handler: handleLeave },
      { element: button, event: "touchstart", handler: handleEnter },
      { element: button, event: "touchend", handler: handleLeave },
    ];
  
    eventPairs.forEach(({ element, event, handler }) => {
      element.addEventListener(event, handler);
      window.pageSpecificListeners.push({ element, event, handler });
    });
  }

  function setupGenericCloseButtons() {
    const container = document.getElementById("closing-showcase");
    if (!container) {      
      return;
    }
  
    const button = container.querySelector(".btn-showcase-close");
    if (!button) {      
      return;
    }
  
    const hoverDiv = button.querySelector(".close-showcase-link-hover");
    const arrowHover = hoverDiv?.querySelector(".close-cta-arrow-hover");
    const arrowDefault = button.querySelector(".close-cta-arrow");
  
    if (!hoverDiv || !arrowHover || !arrowDefault) {    
      return;
    }
  
    // 🔹 Attiva l'animazione quando l'utente scrolla di 50vh
    ScrollTrigger.create({
      trigger: document.documentElement,
      start: "top+=50vh top",
      once: true,
      onEnter: () => {
        gsap.to(button, { scale: 1, duration: 0.6, ease: "power2.out" });
      },
    });
  
    // 🔹 Timeline per l'hover/touch IN
    const enterTl = gsap.timeline({ paused: true });
    enterTl
      .to(hoverDiv, { scale: 1, duration: 0.3, ease: "power2.out" })
      .to(arrowHover, { scale: 1, duration: 0.3, ease: "power2.out" }, "-=0.15")
      .to(arrowDefault, { scale: 0, duration: 0.2, ease: "power2.out" }, 0.3);
  
    // 🔹 Timeline per l'hover/touch OUT
    const leaveTl = gsap.timeline({ paused: true });
    leaveTl
      .to([hoverDiv, arrowHover], { scale: 0, duration: 0.3, ease: "power2.out" })
      .to(
        arrowDefault,
        { scale: 1, duration: 0.3, ease: "power2.out" },
        "-=0.15"
      );
  
    let isHovered = false;
  
    const handleEnter = () => {
      if (!isHovered) {
        enterTl.restart();
        isHovered = true;
      }
    };
  
    const handleLeave = () => {
      if (isHovered) {
        setTimeout(() => {
          leaveTl.restart();
          isHovered = false;
        }, 0);
      }
    };
  
    const backHandler = (e) => {
      e.preventDefault();
  
      const referrer = document.referrer;
      const hasHistory = window.history.length > 1;
  
      // 🔹 Se c'è una pagina precedente nella sessione
      if (referrer && hasHistory) {
        window.history.back(); // oppure: barba.go(referrer);
      } else {
        // 🔹 Nessuna storia disponibile → fallback
        barba.go("/"); // oppure window.location.href = "/";
      }
    };

    button.addEventListener("click", backHandler);
  
    // 🔹 Aggiungiamo eventi per hover (desktop) e touch (mobile)
    const eventPairs = [
      { element: button, event: "mouseenter", handler: handleEnter },
      { element: button, event: "mouseleave", handler: handleLeave },
      { element: button, event: "touchstart", handler: handleEnter },
      { element: button, event: "touchend", handler: handleLeave },
      { element: button, event: "click", handler: backHandler }, // ✅ aggiunto qui
    ];
  
    eventPairs.forEach(({ element, event, handler }) => {
      element.addEventListener(event, handler);
      window.pageSpecificListeners.push({ element, event, handler });
    });
  }
  
  //funzione per l'animazione ingresso Servizio in pagina
  function servicePageWrapper() {
    const splitH = new SplitType(".heading-h3-service-page", {
      types: "words",
      tagName: "span",
    });
    gsap.set(splitH.words, { y: -100 });
    const containers = document.querySelectorAll(".service-wrapper-container");
    containers.forEach((container) => {
      gsap.set(".color-cover", { width: "100%" });
      const splitWords = container.querySelectorAll(
        ".heading-h3-service-page .word"
      );
      const lineTitle = container.querySelector(".line-title-section");
      gsap.set(lineTitle, { scaleX: 0, transformOrigin: "center left" });
  
      ScrollTrigger.create({
        trigger: container,
        start: "top 70%",
        scrub: 1,
        toggleActions: "play none none none",
        onEnter: () => {
          gsap
            .timeline()
            .to(lineTitle, {
              scaleX: 1,
              duration: 0.6,
              ease: "power2.out",
            })
            .to(
              splitWords,
              {
                y: 0,
                duration: 0.4,
                stagger: 0.1,
                ease: "power2.out",
              },
              "-=0.4"
            );
        },
      });
  
      // Seleziona tutte le sezioni che devono essere animate
      ScrollTrigger.create({
        trigger: container,
        start: "top 60%",
        end: "bottom bottom",
        scrub: true,
        toggleActions: "play none none none",
        onEnter: () => {
          // Animazione della cover
          gsap.to(container.querySelector(".color-cover"), {
            width: "auto",
            duration: 0.6,
            ease: "power2.inOut",
          });
        },
      });
    });
  
    window.addEventListener("resize", () => ScrollTrigger.refresh());
  }
  //

  //Animazioni VARIE
  function blogTransition() {
    const coverTL = gsap.timeline({
      onStart: () => {
        blockScroll();
      },
      onComplete: () => {
        gsap.set(".prop-cover-wrapper", { visibility: "hidden" });
        gsap.set(
          ".pro-span, .pro-top-trans, .proptype-transition, .web-propo, .magazine-propo",
          {
            clearProps: "all",
          }
        );
      },
    });
    coverTL
      .to(".pro-span",
              {
                y: "0%",
                duration: 0.8,
                ease: "power2.inOut",
                stagger: { amount: 0.4 },
              }             
            )
      .to(".pro-top-trans", {
        y: "0%",
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.2,
      })
      .to(
        ".pro-span.transform",
        {
          y: "100%",
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.2,
        },
        "-=0.95"
      )
      .to(
        ".web-propo, .magazine-propo",
        {
          opacity: 1,
          duration: 0.6,
          ease: "power1.inOut",
          stagger: 0.2,
        },
        "<"
      )
      .to(
        ".prop-cover-wrapper",
        {
          delay: 0.2,
          y: "100vh",
          duration: 1.2,
          ease: "power2.inOut",
        },
        "-=0.4"
      )
      .to(
        headerElements,
        {
          y: 0,
          duration: 0.6,
          ease: "power2.out",
        },
        "<"
      )
      .call(() => {
        unblockScroll();
      });
  }

  function smoothScrollToTop() {
    if (lenisInstance?.instance) {
      lenisInstance.instance.scrollTo(0, {
        duration: 1.2, // Scroll più fluido
        easing: (t) => 1 - Math.pow(1 - t, 3), // Easing personalizzato
      });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function setupScrollToTop(targetSelector = "body") {
    const target = document.querySelector(targetSelector);
  
    document.querySelectorAll('[data-scroll="top"]').forEach((button) => {
      button.addEventListener("click", () => {
        // Fade out
        if (target) {
          gsap.to(target, {
            opacity: 0,
            duration: 0.4,
            ease: "power1.out",
          });
        }
  
        // Scroll al top
        const scrollComplete = () => {
          if (target) {
            gsap.to(target, {
              opacity: 1,
              duration: 0.6,
              ease: "power1.inOut",
            });
          }
        };
  
        if (window.lenisInstance?.instance) {
          window.lenisInstance.instance.scrollTo(0, {
            duration: 1.2,
            easing: (t) => 1 - Math.pow(1 - t, 3),
            onComplete: scrollComplete,
          });
        } else {
          gsap.to(window, {
            duration: 1,
            scrollTo: { y: 0, autoKill: true },
            ease: "power2.inOut",
            onComplete: scrollComplete,
          });
        }
      });
    });
  }

  function setupScrollColorChange() {
    const elementsWithColor = document.querySelectorAll("[data-color]");
  
    if (!elementsWithColor.length) {
      // Nessun elemento da animare → cancella eventualmente il trigger
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars?.trigger?.hasAttribute?.("data-color")) {
          trigger.kill();
        }
      });
      return;
    }
  
    elementsWithColor.forEach((element) => {
      const color = element.getAttribute("data-color");
  
      if (color) {
        gsap.to(element, {
          color: color,
          duration: 1,
          ease: "power1",
          scrollTrigger: {
            trigger: element,
            start: "top 70%",
            end: "top top",
            toggleActions: "play none none reverse",
          },
        });
      }
    });
  }

  function secondSection(isHomePage = false) {
    if (isHomePage) {
    }
  
    const mm = gsap.matchMedia();
  
    mm.add("(min-width: 320px) and (max-width: 767px)", () => {
      document.querySelectorAll(".focus").forEach((focusElem) => {
        gsap.to(focusElem, {
          x: "10vw",
          scale: 0.8,
          opacity: 0.5,
          y: "33%",
          rotate: 90,
          transformOrigin: "top left",
          ease: "power2.out",
          scrollTrigger: {
            trigger: focusElem,
            start: "top 20%",
            end: "top top",
            toggleActions: "play none none reverse",
          },
        });
      });
    });
  
    mm.add("(min-width: 768px) and (max-width: 991px)", () => {
      document.querySelectorAll(".focus").forEach((focusElem) => {
        gsap.to(focusElem, {
          x: "12vw",
          opacity: 0.5,
          rotate: 90,
          y: "50%",
          transform: "translateY(-50%)",
          transformOrigin: "top left",
          ease: "power2.out",
          scrollTrigger: {
            trigger: focusElem,
            start: "top 20%",
            end: "top top",
            toggleActions: "play none none reverse",
          },
        });
      });
    });
  
    mm.add("(min-width: 992px)", () => {
      document.querySelectorAll(".focus").forEach((focusElem) => {
        gsap.to(focusElem, {
          x: "10vw",
          opacity: 0.5,
          rotate: 90,
          y: "50%",
          transform: "translateY(-50%)",
          transformOrigin: "top left",
          ease: "power2.out",
          scrollTrigger: {
            trigger: focusElem,
            start: "top 10%",
            end: "top top",
            toggleActions: "play none none reverse",
          },
        });
      });
    });
  
    const containers = document.querySelectorAll(".path-container");
    const images = document.querySelectorAll(".img-target");
  
    gsap.matchMedia().add("(min-width: 320px) and (max-width: 991px)", () => {
      containers.forEach((container) => {
        const imgId = container.getAttribute("data-img-id");
        const image = imgId
          ? document.getElementById(imgId)
          : container.querySelector(".img-target");
        const customPathVectors = container.querySelectorAll(".path-vector");
  
        customPathVectors.forEach((customPathVector) => {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: container,
              start: "top 70%",
              end: "top top",
              toggleActions: "play none none reverse",
            },
          });
  
          tl.from(customPathVector, {
            opacity: 0,
            scale: 0,
            duration: 0.5,
            x: -200,
            ease: "power2.out",
          });
  
          if (isHomePage) {
            tl.to(customPathVector, {
              rotation: 90,
              x: "-0.6rem",
              y: "0.6rem",
              duration: 0.2,
              ease: "power2.out",
            });
          }
        });
  
        if (image) {
          gsap.fromTo(
            image,
            { opacity: 0 },
            {
              opacity: 1,
              duration: 0.5,
              ease: "power1.out",
              scrollTrigger: {
                trigger: container,
                start: "top 90%",
                end: "top 10%",
                toggleActions: "play none none reverse",
                onEnter: () => {
                  gsap.to(images, {
                    opacity: 0,
                    duration: 1,
                    ease: "power2.out",
                  });
                  gsap.to(image, {
                    opacity: 0.7,
                    duration: 1,
                    ease: "power2.out",
                  });
                },
                onLeave: () => {
                  gsap.to(image, { opacity: 0, duration: 1, ease: "power2.out" });
                },
                onEnterBack: () => {
                  gsap.to(images, {
                    opacity: 0,
                    duration: 1,
                    ease: "power2.out",
                  });
                  gsap.to(image, {
                    opacity: 0.7,
                    duration: 1,
                    ease: "power2.out",
                  });
                },
                onLeaveBack: () => {
                  gsap.to(image, { opacity: 0, duration: 1, ease: "power2.out" });
                },
              },
            }
          );
        }
      });
    });
  
    gsap.matchMedia().add("(min-width: 992px)", () => {
      containers.forEach((container) => {
        const imgId = container.getAttribute("data-img-id");
        const image = imgId
          ? document.getElementById(imgId)
          : container.querySelector(".img-target");
        const customPathVectors = container.querySelectorAll(".path-vector");
  
        customPathVectors.forEach((customPathVector) => {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: container,
              start: "top 70%",
              end: "top top",
              toggleActions: "play none none reverse",
            },
          });
  
          tl.from(customPathVector, {
            opacity: 0,
            scale: 0,
            duration: 0.5,
            x: -200,
            ease: "power2.out",
          });
  
          if (isHomePage) {
            tl.to(customPathVector, {
              rotation: 90,
              x: "-1rem",
              y: "1rem",
              duration: 0.2,
              ease: "power2.out",
            });
          }
        });
  
        if (image) {
          gsap.fromTo(
            image,
            { opacity: 0 },
            {
              opacity: 1,
              duration: 0.5,
              ease: "power1.out",
              scrollTrigger: {
                trigger: container,
                start: "top 80%",
                end: "top 20%",
                toggleActions: "play none none reverse",
                onEnter: () => {
                  gsap.to(images, {
                    opacity: 0,
                    duration: 1,
                    ease: "power2.out",
                  });
                  gsap.to(image, {
                    opacity: 1,
                    duration: 1,
                    ease: "power2.out",
                  });
                },
                onLeave: () => {
                  gsap.to(image, { opacity: 0, duration: 1, ease: "power2.out" });
                },
                onEnterBack: () => {
                  gsap.to(images, {
                    opacity: 0,
                    duration: 1,
                    ease: "power2.out",
                  });
                  gsap.to(image, {
                    opacity: 1,
                    duration: 1,
                    ease: "power2.out",
                  });
                },
                onLeaveBack: () => {
                  gsap.to(image, { opacity: 0, duration: 1, ease: "power2.out" });
                },
              },
            }
          );
        }
      });
    });
    if (!isHomePage) {
      document.querySelectorAll(".img-tg-cont").forEach((imgTgContElem) => {
        gsap.from(imgTgContElem, {
          y: 200,
          opacity: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: imgTgContElem,
            start: "top 20%",
            end: "top top",
            toggleActions: "play none none reverse",
          },
        });
      });
    }
  }

  function info() {
    document.querySelectorAll(".cm-talk-content").forEach((talk) => {
      const serviceContainer = talk.querySelector(".cta-container");
      const plusBtn = talk.querySelector(".plus-btn-cta");
      const trigger = talk.querySelector(".cta-service-btn");
  
      let isPaused = false;
  
      // Funzione per gestire hover e touch in modo sicuro
      function handleHover() {
        if (!isPaused) {
          gsap.to(plusBtn, {
            scale: 1.5,
            rotation: 90,
            color: "#ff006e",
            duration: 0.5,
            ease: "power2.out",
          });
          gsap.to(plusBtn.querySelectorAll(".ellipse-47"), {
            stroke: "transparent",
            duration: 0.5,
            ease: "power2.out",
          });
        }
      }
  
      function handleHoverOut() {
        if (!isPaused) {
          gsap.to(plusBtn, {
            rotation: 0,
            scale: 1,
            color: "",
            duration: 0.5,
            ease: "power2.out",
          });
          gsap.to(plusBtn.querySelectorAll(".ellipse-47"), {
            stroke: "",
            duration: 0.5,
            ease: "power2.out",
          });
        }
      }
  
      // Eventi hover e touch con cleanup
      plusBtn.addEventListener("mouseenter", handleHover);
      plusBtn.addEventListener("mouseleave", handleHoverOut);
      plusBtn.addEventListener("touchstart", handleHover, { passive: true });
      plusBtn.addEventListener("touchend", handleHoverOut, { passive: true });
  
      trigger.addEventListener("click", () => {
        const isOpen = serviceContainer.classList.contains("open");
        if (isOpen) {
          // Chiudi la sezione
          gsap.to(serviceContainer, {
            height: 0,
            duration: 0.5,
            ease: "power2.inOut",
          });
          gsap.to(plusBtn, {
            scale: 1,
            rotation: 0,
            color: "",
            duration: 0.5,
            ease: "power2.out",
          });
          gsap.to(plusBtn.querySelectorAll(".ellipse-47, .vector-9"), {
            stroke: "",
            duration: 0.5,
            ease: "power2.out",
          });
  
          serviceContainer.classList.remove("open");
          isPaused = false;
        } else {
          // Apri la sezione
          gsap.set(serviceContainer, { height: "auto" });
          const height = serviceContainer.offsetHeight;
          gsap.fromTo(
            serviceContainer,
            { height: 0 },
            { height: height, duration: 0.5, ease: "power2.inOut" }
          );
          gsap.to(plusBtn, {
            scale: 1.5,
            rotation: 90,
            color: "#ff006e",
            duration: 0.5,
            ease: "power2.out",
          });
          gsap.to(plusBtn.querySelectorAll(".ellipse-47, .vector-9"), {
            stroke: "transparent",
            duration: 0.5,
            ease: "power2.out",
          });
  
          serviceContainer.classList.add("open");
          isPaused = true;
        }
      });
    });
  }

  function videoPause() {
    const videoContainers = document.querySelectorAll("div[data-pause-on-scroll]");
  
    if ("IntersectionObserver" in window) {
      const lazyVideoObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const video = entry.target.querySelector("video");
  
            if (video) {
              // Forza il caricamento se necessario
              video.load();
  
              const playWhenReady = () => {
                video.play().catch(err => console.warn("🚫 Errore nel play:", err));
              };
  
              if (video.readyState >= 2) {
                playWhenReady();
              } else {
                video.addEventListener("canplay", playWhenReady, { once: true });
              }
  
              ScrollTrigger.create({
                trigger: entry.target,
                start: "top bottom",
                end: "bottom top",
                onLeave: () => video.pause(),
                onEnterBack: () => video.play(),
                onLeaveBack: () => video.pause(),
              });
  
              observer.unobserve(entry.target);
            }
          }
        });
      });
  
      videoContainers.forEach((container) => {
        lazyVideoObserver.observe(container);
      });
    } else {
      // Fallback
      const videoContainers = document.querySelectorAll("div[data-pause-on-scroll]");
      videoContainers.forEach((container) => {
        const video = container.querySelector("video");
        if (video) {
          ScrollTrigger.create({
            trigger: container,
            start: "top bottom",
            end: "bottom top",
            onEnter: () => video.play(),
            onLeave: () => video.pause(),
            onEnterBack: () => video.play(),
            onLeaveBack: () => video.pause(),
          });
        }
      });
    }
  }
  

  function toggleFaq() {
    document.querySelectorAll(".dropdown-container").forEach((faq) => {
      const faqContainer = faq.querySelector(".p-toggle");
      const dropBtn = faq.querySelector(".drop-toggle");
      const trigger = faq.querySelector(".dropdown-wrapper");
  
      if (!faqContainer || !dropBtn || !trigger) return; // 🔹 Evita errori se gli elementi non esistono
  
      // **🔹 Funzione per gestire l'apertura e chiusura della FAQ**
      const handler = (event) => {
        event.preventDefault();
        const isOpen = faqContainer.classList.contains("open");
  
        if (isOpen) {
          gsap.to(faqContainer, { height: 0, duration: 0.3 });
          gsap.to(dropBtn, {
            rotation: 0,
            duration: 0.3,
            color: "",
            ease: "power2.out",
          });
          faqContainer.classList.remove("open");
        } else {
          gsap.set(faqContainer, { height: "auto" });
          const height = faqContainer.offsetHeight;
          gsap.fromTo(
            faqContainer,
            { height: 0 },
            { height: height, duration: 0.3 }
          );
          gsap.to(dropBtn, {
            rotation: 180,
            duration: 0.3,
            color: "#ff006e",
            ease: "power2.out",
          });
          faqContainer.classList.add("open");
        }
      };
  
      // **🔹 Assegna il listener**
      trigger.addEventListener("click", handler);
  
      // **🔹 Memorizza il listener in `pageSpecificListeners` per la pulizia automatica**
      window.pageSpecificListeners.push({
        element: trigger,
        event: "click",
        handler: handler,
      });
    });
  }

  function toggleServiceSection() {
    document.querySelectorAll(".pricing_card").forEach((card) => {
      const serviceContainer = card.querySelector(".service-container");
      const plusBtn = card.querySelector(".plus-btn");
      const trigger = card.querySelector(".h-btn-container");
  
      trigger.addEventListener("click", () => {
        const isOpen = serviceContainer.classList.contains("open");
        if (isOpen) {
          // Close the service section
          gsap.to(serviceContainer, { height: 0, duration: 0.5 });
          gsap.to(plusBtn, {
            rotation: 0,
            duration: 0.5,
            width: "",
            ease: "ease.out",
          });
          gsap.to(card.querySelectorAll(".vector-9, .ellipse-47"), {
            stroke: "currentColor",
            duration: 0.5,
          });
          gsap.to(card.querySelectorAll(".vector-8"), {
            attr: { "stroke-width": "" },
            stroke: "currentcolor",
            duration: 0.5,
          });
          serviceContainer.classList.remove("open");
        } else {
          // Open the service section
          gsap.set(serviceContainer, { height: "auto" });
          const height = serviceContainer.offsetHeight;
          gsap.fromTo(
            serviceContainer,
            { height: 0 },
            { height: height, duration: 0.5 }
          );
          gsap.to(plusBtn, {
            rotation: 90,
            duration: 0.5,
            width: "4rem",
            ease: "ease.out",
          });
          gsap.to(card.querySelectorAll(".vector-9, .ellipse-47"), {
            stroke: "transparent",
            duration: 0.5,
          });
          gsap.to(card.querySelectorAll(".vector-8"), {
            attr: { "stroke-width": 2 },
            stroke: "#ff006e",
            duration: 0.5,
          });
          serviceContainer.classList.add("open");
        }
      });
    });
  }

  function toggleButtonAnimation() {
    const toggleBtn = document.querySelector(".toggle_btn");
    const toggleCircle = toggleBtn.querySelector(".toggle_btn_circle");
    const number = document.querySelectorAll(".number");
  
    let isActive = false;
  
    function toggle() {
      isActive = !isActive;
  
      if (isActive) {
        // Sposta il cerchio a destra
        gsap.to(toggleCircle, {
          x: toggleBtn.clientWidth - toggleCircle.clientWidth - 1.2 * 16,
          duration: 0.3,
        });
  
        // Cambia i colori
        gsap.to(toggleBtn, {
          backgroundColor: "var(--terzo-colore)",
          duration: 0.3,
        });
        gsap.to(number, { color: "var(--terzo-colore)", duration: 0.3 });
      } else {
        // Sposta il cerchio a sinistra
        gsap.to(toggleCircle, { x: 0, duration: 0.3 });
  
        // Ripristina i colori originali
        gsap.to(toggleBtn, { backgroundColor: "", duration: 0.3 });
        gsap.to(number, { color: "", duration: 0.3 });
      }
      // Chiama la funzione per cambiare i prezzi
      changePrice(isActive);
    }
  
    toggleBtn.addEventListener("click", toggle);
    toggleBtn.addEventListener("touchstart", toggle);

    window.pageSpecificListeners.push({
        element: toggleBtn,
        event: "click",
        toggle: toggle,
      });
      window.pageSpecificListeners.push({
        element: toggleBtn,
        event: "touchstart",
        toggle: toggle,
      });
  }

  function changePrice(isActive) {
    $(".number").each(function () {
      var $this = $(this),
        countTo = isActive ? $this.attr("data-year") : $this.attr("data-month");
  
      $({ countNum: $this.text() }).animate(
        {
          countNum: countTo,
        },
        {
          duration: 500,
          easing: "linear",
          step: function (now) {
            $this.text(Math.round(now.toFixed(2)));
          },
          complete: function () {
            $this.text(this.countNum);
          },
        }
      );
    });
  }

  function logoAnima() {
    // Seleziona tutti gli elementi con la classe .logo-cont-wrapper
    const logos = document.querySelectorAll(".logo-cont-wrapper");
  
    logos.forEach((logo) => {
      const anim = gsap.fromTo(
        logo,
        {
          y: 100,
          opacity: 0,
          scale: 0.8,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          stagger: 0.3,
          ease: "power2.out",
          paused: true,
        }
      );
  
      ScrollTrigger.create({
        trigger: logo,
        start: "top 80%", // Inizia l'animazione quando il top dell'elemento è al 80% della
        end: "bottom top",
        onEnter: () => anim.play(),
        onEnterBack: () => anim.play(),
        onLeave: () => anim.reverse(),
        onLeaveBack: () => anim.reverse(),
        toggleActions: "play none none reverse", // Gioca l'animazione all'ingresso e la ripete all'uscita
      });
    });
  }
  
  function swiperUI() {
    const swiper = new Swiper(".slider-ui-wrapper", {
      slidesPerView: "auto",
      spaceBetween: 32,
      centeredSlides: true,
      loop: true,
      initialSlide: 0,
      speed: 700,
      effect: "slide",
      grabCursor: true,
      resistanceRatio: 0.85,
      threshold: 6,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      on: {
        init: function () {
          this.update();
          updateOpacityAndParallax(this);
        },
        slideChangeTransitionStart: function () {
          updateOpacityAndParallax(this);
        },
      },
    });
  
    function updateOpacityAndParallax(swiper) {
      const slides = swiper.slides;
  
      slides.forEach((slide, index) => {
        const image = slide.querySelector(".parallax-bg");
  
        // Determina se la slide è attiva, precedente o successiva
        if (index === swiper.activeIndex) {
          // Slide attiva: visibile e ingrandita
          gsap.to(slide, {
            opacity: 1,
            scale: 1.1,
            transformOrigin: "center center",
            duration: 0.4,
            ease: "power2.out",
          });
          gsap.to(image, {
            scale: 1,
            transformOrigin: "center center",
            duration: 0.4,
            ease: "power2.out",
          });
        } else if (index === swiper.previousIndex || index === swiper.nextIndex) {
          // Slide adiacenti: opacità media e leggera riduzione
          gsap.to(slide, {
            opacity: 0.3,
            scale: 0.8,
            transformOrigin: "center center",
            duration: 0.4,
            ease: "power2.out",
          });
          gsap.to(image, {
            scale: 1.2,
            transformOrigin: "center center",
            duration: 0.4,
            ease: "power2.out",
          });
        } else {
          // Slide lontane: riduzione massima
          gsap.to(slide, {
            opacity: 0.3,
            scale: 0.8,
            transformOrigin: "center center",
            duration: 0.4,
            ease: "power2.out",
          });
          gsap.to(image, {
            scale: 1.2,
            transformOrigin: "center center",
            duration: 0.4,
            ease: "power2.out",
          });
        }
      });
    }
  
    const sliderWrapper = document.querySelector(".slider-ui-wrapper");
    const buttons = document.querySelectorAll(
      ".swiper-button-prev, .swiper-button-next"
    );
    const nextButtons = document.querySelectorAll(".swiper-button-next");
  
    if (!sliderWrapper || !buttons.length) return;
  
    let autoTl;
    let isSliderVisible = false; // Stato della visibilità dello slider
  
    function startAutoAnimation() {
      if (!isSliderVisible) return;
  
      nextButtons.forEach((button) => {
        const track = button.querySelector(".traccia-av-next");
        if (!track) return;
  
        setTimeout(() => {
          const trackLength = track.getTotalLength();
          if (trackLength > 0) {
            gsap.set(track, {
              strokeDasharray: trackLength,
              strokeDashoffset: trackLength,
              opacity: 1,
            });
  
            if (autoTl) autoTl.kill();
  
            autoTl = gsap.timeline({ repeat: -1 });
            autoTl.to(track, {
              strokeDashoffset: 0,
              duration: 3,
              ease: "power2.out",
              onComplete: () => swiper.slideNext(),
            });
          }
        }, 100);
      });
    }
  
    function pauseAutoAnimation() {
      if (autoTl) autoTl.pause();
    }
  
    function resumeAutoAnimation() {
      if (autoTl && isSliderVisible) autoTl.resume();
    }
  
    const mm = gsap.matchMedia();
  
    mm.add("(min-width: 992px)", () => {
      buttons.forEach((button) => {
        const bg = button.querySelector(".btn-sfondo-avanzamento");
        const border = button.querySelector(".traccia-av");
  
        if (!border || !bg) return;
  
        gsap.set(bg, { scale: 0, transformOrigin: "center left" });
  
        const hoverTl = gsap.timeline({ paused: true });
        hoverTl
          .to(bg, { scale: 1, duration: 0.3, ease: "power2.out" })
          .to(border, { opacity: 1, duration: 0.3, ease: "power2.out" }, "-=0.2");
  
          const handleEnter = () => {
            pauseAutoAnimation();
            hoverTl.play();
          };
          const handleLeave = () => {
            resumeAutoAnimation();
            hoverTl.reverse();
          };
          
          button.addEventListener("mouseenter", handleEnter);
          button.addEventListener("mouseleave", handleLeave);
          
          window.pageSpecificListeners.push(
            { element: button, event: "mouseenter", handler: handleEnter },
            { element: button, event: "mouseleave", handler: handleLeave }
          );          
      });
    });
  
    mm.add("(max-width: 991px)", () => {
      buttons.forEach((button) => {
        const bg = button.querySelector(".btn-sfondo-avanzamento");
        const border = button.querySelector(".traccia-av");
  
        if (!border || !bg) return;
  
        gsap.set(bg, { scale: 0, transformOrigin: "center left" });
  
        const touchTl = gsap.timeline({ paused: true });
        touchTl
          .to(bg, { scale: 1, duration: 0.3, ease: "power2.out" })
          .to(border, { opacity: 1, duration: 0.3, ease: "power2.out" }, "-=0.2");
  
          const handleTouchStart = () => {
            pauseAutoAnimation();
            touchTl.play();
          };
          const handleTouchEnd = () => {
            resumeAutoAnimation();
            touchTl.reverse();
          };
          
          button.addEventListener("touchstart", handleTouchStart);
          button.addEventListener("touchend", handleTouchEnd);
          
          window.pageSpecificListeners.push(
            { element: button, event: "touchstart", handler: handleTouchStart },
            { element: button, event: "touchend", handler: handleTouchEnd }
          );          
      });
    });
  
    buttons.forEach((button) => {
      const handleClick = () => startAutoAnimation();

      button.addEventListener("click", handleClick);
      window.pageSpecificListeners.push({
        element: button,
        event: "click",
        handler: handleClick,
      });      
    });

    window.pageSpecificListeners.push(
      {
        element: sliderWrapper,
        event: "mouseenter",
        handler: pauseAutoAnimation,
      },
      {
        element: sliderWrapper,
        event: "mouseleave",
        handler: resumeAutoAnimation,
      }
    );
  
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            isSliderVisible = true;
            startAutoAnimation();
          } else {
            isSliderVisible = false;
            pauseAutoAnimation();
          }
        });
      },
      { threshold: 0.5 }
    );
  
    observer.observe(sliderWrapper);
    const slides = document.querySelectorAll(".slider-ui-wrapper .swiper-slide");

slides.forEach((slide) => {
  const handleSlideEnter = () => pauseAutoAnimation();
  const handleSlideLeave = () => resumeAutoAnimation();

  slide.addEventListener("mouseenter", handleSlideEnter);
  slide.addEventListener("mouseleave", handleSlideLeave);

  window.pageSpecificListeners.push(
    { element: slide, event: "mouseenter", handler: handleSlideEnter },
    { element: slide, event: "mouseleave", handler: handleSlideLeave }
  );
});
  }
function calendar() {
  const inputFields = document.querySelectorAll(".form-text-field-2");
  const calendarModal = document.getElementById("calendar-modal");
  const timeSelectionModal = document.getElementById("time-selection-modal");
  const timeSelectionEl = document.getElementById("time-selection");
  const calendarEl = document.getElementById("calendar");
  let currentInputField;

  if (!calendarEl || calendarEl.dataset.initialized) {
    console.warn("Il calendario è già stato inizializzato o non esiste.");
    return;
  }

  calendarEl.dataset.initialized = "true";
  calendarModal.offsetHeight;

  const calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: "dayGridMonth",
    firstDay: 1,
    selectable: true,
    headerToolbar: {
      left: "prev",
      center: "title",
      right: "next",
    },
    locale: "it",
    buttonText: { today: "oggi" },
    dayHeaderFormat: { weekday: "short" },

    selectAllow: (selectInfo) => {
      const selectedDate = selectInfo.start;
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const isWeekend = selectedDate.getDay() === 0 || selectedDate.getDay() === 6;
      if (isWeekend) return false;
      if (selectedDate <= today) return false;
      if (isDayCompletelyOccupied(selectedDate)) return false;

      return true;
    },

    eventSourceSuccess: function(content, xhr) {
      hideCalendarWaiting();
      setTimeout(() => {
        applyOccupiedDaysStyling();
      }, 50);
    },

    datesSet: function(info) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const dayEls = calendarEl.querySelectorAll(".fc-daygrid-day");
      dayEls.forEach((dayEl) => {
        const dateStr = dayEl.getAttribute("data-date");
        if (dateStr) {
          const cellDate = new Date(dateStr + "T00:00:00");
          if (cellDate < today) {
            dayEl.classList.add("fc-day-past");
          }
        }
      });

      calendar.refetchEvents();
    },

    select: (info) => {
      const date = info.start;
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const isWeekend = date.getDay() === 0 || date.getDay() === 6;
      const isPast = date <= today;
      const isOccupied = isDayCompletelyOccupied(date);

      if (!isWeekend && !isPast && !isOccupied) {
        openTimeSelection(date);
      } else {
        console.log("❌ Giorno selezionato non valido:", date.toISOString().split("T")[0]);
      }
    },

    dateClick: (info) => {
      const date = info.date;
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const isWeekend = date.getDay() === 0 || date.getDay() === 6;
      const isPast = date <= today;
      const isOccupied = isDayCompletelyOccupied(date);

      if (!isWeekend && !isPast && !isOccupied) {
        openTimeSelection(date);
      } else {
        console.log("❌ Giorno non selezionabile:", date.toISOString().split("T")[0]);
      }
    },

    dayCellClassNames: function (info) {
      const classes = [];
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (info.date < today) classes.push("fc-day-past");
      if (info.date > today && isDayCompletelyOccupied(info.date)) classes.push("fc-day-occupied");
      return classes;
    },

    events: async (fetchInfo, successCallback, failureCallback) => {
      try {
        const response = await fetch("https://us-central1-webflow-project---calltoaction.cloudfunctions.net/getCalendarEvents", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ timeMin: fetchInfo.startStr, timeMax: fetchInfo.endStr }),
        });

        if (!response.ok) throw new Error(`Errore HTTP: ${response.status}`);
        const events = await response.json();
        events.forEach((event) => (event.className = "hidden-event"));
        successCallback(events);
      } catch (err) {
        console.error("Errore nel recupero degli eventi:", err);
        failureCallback(err);
      }
    },

    eventOverlap: false,
    selectOverlap: (event) => !event,
    eventBackgroundColor: "red",
  });

  calendar.render();
  currentInputField = inputFields[0] || document.querySelector(".form-text-field-2");

  function formatDateForComparison(date) {
    return date.toISOString().split("T")[0];
  }

  function hideCalendarWaiting() {
    const waitingEl = document.querySelector('.calendar-waiting');
    if (waitingEl) waitingEl.style.display = 'none';
  }

  function applyOccupiedDaysStyling() {
    calendar.el.querySelectorAll('.occupied-day').forEach(el => {
      el.classList.remove('occupied-day');
      el.style = '';
    });

    const events = calendar.getEvents();
    const occupiedDays = new Map();
    const allDayOccupiedDays = new Set();

    events.forEach(event => {
      if (!event.start || !event.end) return;

      const isAllDay = event.allDay ||
        (event.start.getHours() === 0 && event.start.getMinutes() === 0 &&
         event.end.getHours() === 0 && event.end.getMinutes() === 0) ||
        (event.end.getTime() - event.start.getTime() >= 24 * 60 * 60 * 1000);

      const dateKey = formatDateForComparison(event.start);

      if (isAllDay) {
        allDayOccupiedDays.add(dateKey);
      } else {
        if (!occupiedDays.has(dateKey)) occupiedDays.set(dateKey, []);
        occupiedDays.get(dateKey).push({
          start: event.start.getHours() * 60 + event.start.getMinutes(),
          end: event.end.getHours() * 60 + event.end.getMinutes()
        });
      }
    });

    allDayOccupiedDays.forEach(dateKey => {
      const el = calendar.el.querySelector(`[data-date="${dateKey}"]`);
      if (el) {
        el.classList.add('occupied-day');
        el.style.pointerEvents = 'none';
        el.style.backgroundColor = 'rgba(239, 68, 68, 0.2)';
        el.style.opacity = '0.6';
        el.style.textDecoration = 'line-through';
      }
    });

    occupiedDays.forEach((slots, dateKey) => {
      if (allDayOccupiedDays.has(dateKey)) return;
      if (isDayCompletelyOccupiedByEvents(slots)) {
        const el = calendar.el.querySelector(`[data-date="${dateKey}"]`);
        if (el) {
          el.classList.add('occupied-day');
          el.style.pointerEvents = 'none';
          el.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
          el.style.opacity = '0.6';
          el.style.textDecoration = 'line-through';
        }
      }
    });
  }

  function isDayCompletelyOccupiedByEvents(events) {
    const workStart = 10 * 60;
    const workEnd = 20 * 60;
    events.sort((a, b) => a.start - b.start);
    let lastEnd = workStart;
    for (const e of events) {
      if (e.start <= lastEnd) {
        lastEnd = Math.max(lastEnd, e.end);
      } else {
        return false;
      }
    }
    return (lastEnd - workStart) >= (workEnd - workStart);
  }

  function isDayCompletelyOccupied(date) {
    const events = calendar.getEvents();
    const dateKey = formatDateForComparison(date);

    const hasAllDay = events.some(event => {
      if (!event.start || !event.end) return false;
      const eventDateKey = formatDateForComparison(event.start);
      if (eventDateKey !== dateKey) return false;
      const isAllDay = event.allDay ||
        (event.start.getHours() === 0 && event.start.getMinutes() === 0 &&
         event.end.getHours() === 0 && event.end.getMinutes() === 0) ||
        (event.end.getTime() - event.start.getTime() >= 24 * 60 * 60 * 1000);
      return isAllDay;
    });

    if (hasAllDay) return true;

    const slots = [];
    for (let hour = 10; hour <= 19; hour++) {
      slots.push({ hour, minute: 0 }, { hour, minute: 30 });
    }
    slots.push({ hour: 20, minute: 0 });

    let available = 0;
    slots.forEach(t => {
      const dt = new Date(date);
      dt.setHours(t.hour, t.minute, 0, 0);
      if (!isTimeSlotOccupied(dt)) available++;
    });

    return available === 0;
  }

  function isTimeSlotOccupied(dateTime) {
    return calendar.getEvents().some(e => {
      if (!e.start || !e.end) return false;
      return dateTime >= e.start && dateTime < e.end;
    });
  }

  function openTimeSelection(date) {
    timeSelectionEl.innerHTML = "";
    gsap.to(timeSelectionModal, { height: "auto", duration: 0.4, ease: "power2.out" });

    const times = [];
    for (let hour = 10; hour <= 19; hour++) {
      times.push({ hour, minute: 0 }, { hour, minute: 30 });
    }
    times.push({ hour: 20, minute: 0 });

    times.forEach(time => {
      const dt = new Date(date);
      dt.setHours(time.hour, time.minute, 0, 0);

      if (!isTimeSlotOccupied(dt)) {
        const btn = document.createElement("button");
        btn.innerText = `${String(time.hour).padStart(2, '0')}:${String(time.minute).padStart(2, '0')}`;
        btn.addEventListener("click", function () {
          if (currentInputField) {
            currentInputField.value = `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()} ${btn.innerText}`;
          }

          const dateCheckbox = document.getElementById("date-checkbox");
          if (dateCheckbox) {
            dateCheckbox.checked = true;
            dateCheckbox.dispatchEvent(new Event("click", { bubbles: true }));
            dateCheckbox.dispatchEvent(new Event("change", { bubbles: true }));
          }

          gsap.to(timeSelectionModal, { height: "0px", duration: 0.3, ease: "power2.out" });
        });

        timeSelectionEl.appendChild(btn);
      }
    });
  }
}


  function studioAnimations() {
    const wrapper = document.getElementById("studio-wrapper");
    const containers = wrapper.querySelectorAll(".ms-img-text-block");
    const studio = wrapper.querySelector(".studio-content-flex");
    const trigger = studio.querySelector(".studio-img-container");
    const lineWrap = wrapper.querySelectorAll(".section-spacer-divider");
    const teamWrap = wrapper.querySelectorAll(".team-item-wrapper");
    const noi = wrapper.querySelector(".noi");
    const mm = gsap.matchMedia();
  
    // Split per le animazioni di testo
    const splitStudio = new SplitType(".miss-vis-text", {
      types: "lines",
      tagName: "span",
    });
  
    const splitMisVis = new SplitType(".mission-vision-text", {
      types: "lines",
      tagName: "span",
    });
  
    const splitSubTitle = new SplitType(".heading-h3-studio", {
      types: "words",
      tagName: "span",
    });
  
    // Animazioni per lineWrap (titoli e linee)
    lineWrap.forEach((lineWrap) => {
      const subTitles = lineWrap.querySelectorAll(".heading-h3-studio .word");
      const lineTitle = lineWrap.querySelectorAll(".line-title-section");
      gsap.set(lineTitle, { scaleX: 0, transformOrigin: "center left" });
      gsap.set(subTitles, { y: -100 });
  
      const tl = gsap.timeline({ paused: true });
      tl.to(lineTitle, {
        scaleX: 1,
        duration: 1,
        ease: "power2.out",
      }).to(
        subTitles,
        {
          y: 0,
          duration: 0.4,
          stagger: 0.1,
          ease: "power2.out",
        },
        "-=0.8"
      );
  
      ScrollTrigger.create({
        trigger: lineWrap,
        start: "top 70%",
        end: "top 20%",
        onEnter: () => tl.play(),
        onLeaveBack: () => tl.reverse(),
      });
    });
  
    // Animazioni per i container
    containers.forEach((container) => {
      const misVisLines = container.querySelectorAll(
        ".line-title-mission-vision"
      );
      const misVisText = container.querySelectorAll(".mission-vision-text .line");
      gsap.set(misVisText, { opacity: 0, y: 100 });
      const points = container.querySelectorAll(".point-mis-vis");
  
      const tl = gsap.timeline({ paused: true });
  
      tl.to(misVisLines, { width: "100%", duration: 0.6, ease: "power2.out" })
        .to(
          misVisText,
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
            stagger: { amount: 0.1 },
          },
          "-=0.3"
        )
        .to(points, { scale: 1, duration: 0.6, ease: "power2.out" }, "-=0.3");
  
      ScrollTrigger.create({
        trigger: container,
        start: "top 60%",
        end: "top 20%",
        onEnter: () => tl.play(),
        onLeaveBack: () => tl.reverse(),
      });
    });
  
    // Animazione per il testo principale di studio
    const studioText = studio.querySelectorAll(".miss-vis-text .line");
  
    mm.add(
      {
        isDesktop: "(min-width: 992px)", // Desktop (>= 992px)
        isMobile: "(max-width: 991px)", // Mobile (<= 991px)
      },
      (context) => {
        let { isDesktop, isMobile } = context.conditions;
        if (noi) {
          const noiCover = noi.querySelector(".noi-cover");
          if (isDesktop) {
            gsap.to(noiCover, {
              y: "-50vh",
              duration: 0.5,
              ease: "power1.inOut",
              scrollTrigger: {
                trigger: noi,
                start: "top 40%",
                toggleActions: "play none none reverse",
              },
            });
          } else {
            gsap.to(noiCover, {
              y: "50vh",
              duration: 0.5,
              ease: "power1.inOut",
              scrollTrigger: {
                trigger: noi,
                start: "top 75%",
                toggleActions: "play none none reverse",
              },
            });
          }
        }
  
        if (isDesktop) {
          gsap.set(studioText, { opacity: 0, y: 100 });
  
          gsap.to(studioText, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            stagger: { amount: 0.1 },
            scrollTrigger: {
              trigger: trigger,
              start: "bottom 70%",
              end: "bottom 50%",
              toggleActions: "play none none reverse",
            },
          });
        }
  
        teamWrap.forEach((teamItem) => {
          const textContainer = teamItem.querySelector(".item-txt-team-wrap");
          const textCompetenza = teamItem.querySelector(".item-text-team.name");
          const competenze = teamItem.querySelector(".competenze");
          const teamToggle = teamItem.querySelector(".plus-btn-team");
          const ellipse = teamToggle.querySelectorAll(".ellipse-47");
          const line = teamToggle.querySelectorAll(".vector-9");
  
          let isExpanded = false; // Stato per gestire il click
  
          let hoverTimeline;
          if (isDesktop) {
            hoverTimeline = gsap.timeline({ paused: true });
  
            hoverTimeline
              .to(textContainer, {
                width: "auto",
                duration: 0.5,
                ease: "power2.out",
              })
              .to(
                textCompetenza,
                {
                  y: 0,
                  duration: 0.3,
                  ease: "power2.out",
                },
                "-=0.2"
              );
  
            // Eventi hover
            const hoverHandlerEnter = () => hoverTimeline.play();
            const hoverHandlerLeave = () => {
              if (!isExpanded) hoverTimeline.reverse();
            };
  
            teamItem.addEventListener("mouseenter", hoverHandlerEnter);
            teamItem.addEventListener("mouseleave", hoverHandlerLeave);
  
            window.pageSpecificListeners.push(
              {
                element: teamItem,
                event: "mouseenter",
                handler: hoverHandlerEnter,
              },
              {
                element: teamItem,
                event: "mouseleave",
                handler: hoverHandlerLeave,
              }
            );
          }
  
          const clickHandler = () => {
            if (!isExpanded) {
              // Espansione
              gsap.to(competenze, {
                height: "100%",
                duration: 0.5,
                ease: "power2.out",
              });
              gsap.to(teamToggle, {
                rotation: 90,
                color: "#ff006e",
                duration: 0.5,
                ease: "power2.out",
              });
              gsap.to(ellipse, {
                stroke: "transparent",
                duration: 0.5,
                ease: "power2.out",
              });
              gsap.to(line, {
                stroke: "transparent",
                duration: 0.5,
                ease: "power2.out",
              });
            } else {
              // Chiusura
              gsap.to(competenze, {
                height: "0%",
                duration: 0.5,
                ease: "power2.out",
              });
              gsap.to(teamToggle, {
                rotation: 0,
                color: "var(--soft-white-change)",
                duration: 0.5,
                ease: "power2.out",
              });
              gsap.to(ellipse, {
                stroke: "currentColor",
                duration: 0.5,
                ease: "power2.out",
              });
              gsap.to(line, {
                stroke: "currentColor",
                duration: 0.5,
                ease: "power2.out",
              });
            }
            isExpanded = !isExpanded; // Inverte lo stato
          };
  
          teamItem.addEventListener("click", clickHandler);
  
          window.pageSpecificListeners.push({
            element: teamItem,
            event: "click",
            handler: clickHandler,
          });
        });
      }
    );
  }

  function startMarquee() {
    const wrapper = document.querySelector(".gsap-marquee-wrapper");
    if (!wrapper) return;
  
    const items = gsap.utils.toArray(
      wrapper.querySelectorAll(".gsap-marquee-content.item")
    );
    if (!items.length) return;
  
    // Imposta la velocità del loop
    const speed = 70; // Più alto = più lento
  
    const loop = gsap.timeline({
      repeat: -1, // Loop infinito
      paused: false, // Inizia subito
    });
  
    const totalWidth = items.reduce((acc, item) => acc + item.offsetWidth, 0);
  
    // Crea l'animazione
    items.forEach((item) => {
      loop.to(
        item,
        {
          x: `-=${totalWidth}`, // Sposta ogni elemento a sinistra di tutta la larghezza
          duration: totalWidth / speed, // Durata dinamica basata sulla velocità
          ease: "none",
          modifiers: {
            x: gsap.utils.unitize((x) => parseFloat(x) % totalWidth), // Loop continuo senza glitch
          },
        },
        0
      );
    });
  
    // 🔥 ScrollTrigger usando il wrapper come trigger
    ScrollTrigger.create({
      trigger: wrapper, // Usa il wrapper stesso come trigger
      start: "top 90%", // Attiva quando entra nella visuale
      end: "bottom top",
      onEnter: () => loop.play(), // Riprende il loop
      onLeave: () => loop.pause(), // Mette in pausa
      onEnterBack: () => loop.resume(), // Riprende se torni indietro
      onLeaveBack: () => loop.pause(), // Pausa se esce dallo schermo
    });
  
    // 🔄 Riavvia l'animazione al resize
    const resizeHandler = () => {
      gsap.killTweensOf(items);
      startMarquee(); // Riavvia con nuove dimensioni
    };
  
    window.addEventListener("resize", resizeHandler);
  
    window.pageSpecificListeners.push({
      element: window,
      event: "resize",
      handler: resizeHandler,
    });
  }
  
  function startInfiniteMarquee() {
    const wrapper = document.querySelector(".gsap-marquee-wrapper");
    if (!wrapper) return;
  
    const items = gsap.utils.toArray(
      wrapper.querySelectorAll(".gsap-marquee-content.item")
    );
    if (!items.length) return;
  
    const triggerSection = document.querySelector(".premessa");
  
    // Imposta la velocità del loop
    const speed = 60;
  
    const loop = gsap.timeline({
      repeat: -1, // Loop infinito
      paused: false, // Inizia subito
    });
  
    const totalWidth = items.reduce((acc, item) => acc + item.offsetWidth, 0);
  
    // Crea l'animazione
    items.forEach((item, index) => {
      loop.to(
        item,
        {
          x: `-=${totalWidth}`, // Sposta ogni elemento a sinistra di tutta la larghezza
          duration: totalWidth / speed, // Durata dinamica basata sulla velocità
          ease: "none",
          modifiers: {
            x: gsap.utils.unitize((x) => parseFloat(x) % totalWidth), // Loop continuo
          },
        },
        0
      );
    });
  
    ScrollTrigger.create({
      trigger: triggerSection,
      start: "top 90%",
      end: "bottom top",
      onEnter: () => loop.resume(), // Riprende il loop
      onLeave: () => loop.pause(), // Mette in pausa
      onEnterBack: () => loop.resume(), // Riprende se torni indietro
      onLeaveBack: () => loop.pause(), // Pausa se esce dallo schermo
    });
  
    const resizeHandler = () => {
      gsap.killTweensOf(items);
      startInfiniteMarquee(); // Riavvia con nuove dimensioni
    };
  
    window.addEventListener("resize", resizeHandler);
  
    window.pageSpecificListeners.push({
      element: window,
      event: "resize",
      handler: resizeHandler,
    });
  }
   

  window.propositoAnimation = window.propositoAnimation || {
    initializeSwiper: function () {
      const swiperContainers = document.querySelectorAll(
        ".related-articles-wrapper"
      );
  
      if (!swiperContainers.length) {
        return;
      }
  
      swiperContainers.forEach((swiperContainer) => {
        const sliderParent = swiperContainer.closest(".related-articles-slider");
        if (!sliderParent) {
          return;
        }
  
        const nextButton = sliderParent.querySelector(".swiper-button-next");
        const prevButton = sliderParent.querySelector(".swiper-button-prev");
  
        if (!nextButton || !prevButton) {
          console.warn(
            "⚠️ initializeSwiper: Pulsanti prev/next non trovati per uno slider."
          );
          return;
        }
  
        const slides = swiperContainer.querySelectorAll(".swiper-slide");
        const totalSlides = slides.length;
  
        // 🔹 Numero minimo di slide visibili contemporaneamente
        const minVisibleSlides = 6; // Cambia in base alla configurazione su desktop
  
        // 🔹 Il loop si attiva solo se ci sono più slide di quelle visibili
        const enableLoop = totalSlides > minVisibleSlides;
       
  
        const swiper = new Swiper(swiperContainer, {
          slidesPerView: "auto", 
          slidesPerGroup: 1, 
          loop: enableLoop, 
          spaceBetween: 32,
          centeredSlides: false,
          speed: 700,
          effect: "slide",
          grabCursor: true,
          resistanceRatio: 0.85,
          threshold: 6,
          navigation: {
            nextEl: nextButton,
            prevEl: prevButton,
          },
        });
  
        const buttons = [nextButton, prevButton];
  
        const mm = gsap.matchMedia();
  
        mm.add("(min-width: 992px)", () => {
          buttons.forEach((button) => {
            const bg = button.querySelector(".btn-sfondo-avanzamento");
            const border = button.querySelector(".traccia-av");
  
            if (!border || !bg) return;
  
            gsap.set(bg, { scale: 0, transformOrigin: "center left" });
  
            const hoverTl = gsap.timeline({ paused: true });
            hoverTl
              .to(bg, { scale: 1, duration: 0.3, ease: "power2.out" })
              .to(
                border,
                { opacity: 1, duration: 0.3, ease: "power2.out" },
                "-=0.2"
              );
  
              const handleEnter = () => hoverTl.play();
              const handleLeave = () => hoverTl.reverse();
              
              button.addEventListener("mouseenter", handleEnter);
              button.addEventListener("mouseleave", handleLeave);
              
              window.pageSpecificListeners.push(
                { element: button, event: "mouseenter", handler: handleEnter },
                { element: button, event: "mouseleave", handler: handleLeave }
              );
          });
        });
  
        mm.add("(max-width: 991px)", () => {
          buttons.forEach((button) => {
            const bg = button.querySelector(".btn-sfondo-avanzamento");
            const border = button.querySelector(".traccia-av");
  
            if (!border || !bg) return;
  
            gsap.set(bg, { scale: 0, transformOrigin: "center left" });
  
            const touchTl = gsap.timeline({ paused: true });
            touchTl
              .to(bg, { scale: 1, duration: 0.3, ease: "power2.out" })
              .to(
                border,
                { opacity: 1, duration: 0.3, ease: "power2.out" },
                "-=0.2"
              );
  
              const handleTouchStart = () => touchTl.play();
              const handleTouchEnd = () => touchTl.reverse();
              
              button.addEventListener("touchstart", handleTouchStart);
              button.addEventListener("touchend", handleTouchEnd);
              
              window.pageSpecificListeners.push(
                { element: button, event: "touchstart", handler: handleTouchStart },
                { element: button, event: "touchend", handler: handleTouchEnd }
              );
              
          });
        });
      });   
    },
  
    categoryLabel: function () {
      const categoryLabels = document.querySelectorAll(".category-label");
  
      categoryLabels.forEach((label) => {
        // Creiamo un context per ottimizzare la gestione delle animazioni
        let context = gsap.context(() => {
          // Funzione di animazione comune per hover/touch
          function animateCategoryLabel(state) {
            gsap.to(label, {
              duration: 0.3,
              paddingBottom: state ? "2rem" : "0rem",
              borderTopRightRadius: state ? "1rem" : "0.5rem",
              borderTopLeftRadius: state ? "1rem" : "0.5rem",
              ease: "power1.out",
            });
          }
  
          // Eventi hover
          const handleEnter = () => animateCategoryLabel(true);
          const handleLeave = () => animateCategoryLabel(false);
          const handleTouchStart = () => animateCategoryLabel(true);
          const handleTouchEnd = () => animateCategoryLabel(false);
    
          // Applichiamo gli eventi
          label.addEventListener("mouseenter", handleEnter);
          label.addEventListener("mouseleave", handleLeave);
          label.addEventListener("touchstart", handleTouchStart);
          label.addEventListener("touchend", handleTouchEnd);
    
          // Registriamo gli handler reali
          window.pageSpecificListeners.push(
            { element: label, event: "mouseenter", handler: handleEnter },
            { element: label, event: "mouseleave", handler: handleLeave },
            { element: label, event: "touchstart", handler: handleTouchStart },
            { element: label, event: "touchend", handler: handleTouchEnd }
          );
        });
      });
    },
  
    tagLinkAnimation: function () {
      const tagLinks = document.querySelectorAll(".tag-link");
    
      tagLinks.forEach((tag) => {
        let context = gsap.context(() => {
          function animateTagLink(isHover) {
            gsap.to(tag, {
              duration: 0.15,
              rotateZ: isHover ? 10 : 0,
              borderColor: isHover ? "#ff006e" : "",
              ease: "back.out(3)",
            });
          }
    
          // ✅ Handler nominati
          const handleEnter = () => animateTagLink(true);
          const handleLeave = () => animateTagLink(false);
          const handleTouchStart = () => animateTagLink(true);
          const handleTouchEnd = () => animateTagLink(false);
    
          // ✅ Aggiunta eventi
          tag.addEventListener("mouseenter", handleEnter);
          tag.addEventListener("mouseleave", handleLeave);
          tag.addEventListener("touchstart", handleTouchStart);
          tag.addEventListener("touchend", handleTouchEnd);
    
          // ✅ Tracciamento per rimozione
          window.pageSpecificListeners.push(
            { element: tag, event: "mouseenter", handler: handleEnter },
            { element: tag, event: "mouseleave", handler: handleLeave },
            { element: tag, event: "touchstart", handler: handleTouchStart },
            { element: tag, event: "touchend", handler: handleTouchEnd }
          );
        }, tag); // Context GSAP applicato al singolo tag
      });
    },

    btnReadAnimation: function () {
      const btnReads = document.querySelectorAll(".btn-read");
  
      btnReads.forEach((btn) => {
        // Selezioniamo gli elementi interni da animare
        const arrow = btn.querySelector(".read-btn-arrow");
        const text = btn.querySelector(".read-text-btn");
  
        // Creiamo una timeline che sarà ripetuta su hover e touch
        let tl = gsap.timeline({ paused: true });
  
        // Aggiungiamo l'animazione del margine destro di .read-btn-arrow
        tl.to(arrow, {
          duration: 0.2,
          marginRight: "2px", // Cambia il margine destro a 0
          ease: "back.out",
        });
  
        // Aggiungiamo la rotazione della .read-text-btn subito dopo
        tl.to(
          text,
          {
            duration: 0.3,
            rotate: 8, // Ruota di 8 gradi
            ease: "back.out",
          },
          "-=0.2"
        ); // Sovrapponiamo leggermente le animazioni per farle avvenire quasi contemporaneamente
  
        // Funzione di animazione per hover e touch
        function animateBtnRead(isHover) {
          if (isHover) {
            tl.play(); // Avvia l'animazione
          } else {
            tl.reverse(); // Inverte l'animazione quando si lascia l'elemento
          }
        }
  
        const handleMouseEnter = () => animateBtnRead(true);
        const handleMouseLeave = () => animateBtnRead(false);
        const handleTouchStart = () => animateBtnRead(true);
        const handleTouchEnd = () => animateBtnRead(false);
        
        btn.addEventListener("mouseenter", handleMouseEnter);
        btn.addEventListener("mouseleave", handleMouseLeave);
        btn.addEventListener("touchstart", handleTouchStart);
        btn.addEventListener("touchend", handleTouchEnd);
        
        window.pageSpecificListeners.push(
          { element: btn, event: "mouseenter", handler: handleMouseEnter },
          { element: btn, event: "mouseleave", handler: handleMouseLeave },
          { element: btn, event: "touchstart", handler: handleTouchStart },
          { element: btn, event: "touchend", handler: handleTouchEnd }
        );
        
      });
    },
    NewsLetterAnimation: function () {
      ScrollTrigger.create({
        trigger: ".newsletter-section",
        start: "center center",
        toggleActions: "play none none reverse",
        onEnter: () => {
          gsap.fromTo(
            ".arrow-proposito-newsletter",
            { x: "0%" },
            {
              x: "-10%",
              repeat: 3,
              duration: 0.5,
              ease: "power1.inOut",
              yoyo: true,
            }
          );
        },
      });
    },
    btnCategoryAnimation: function () {
      const btnCategory = document.querySelectorAll(".btn-category");
  
      btnCategory.forEach((btn) => {
        // Selezioniamo gli elementi interni da animare
        const arrow = btn.querySelector(".read-btn-arrow");
        const text = btn.querySelector(".read-text-btn");
        const gradient = btn.querySelector(".category-color");
  
        // Otteniamo il primo colore di background dalla variabile CSS
        const color2 = getComputedStyle(gradient)
          .getPropertyValue("--background-first")
          .trim();
  
        const color1 = "transparent"; // Il secondo colore è trasparente
  
        // Creiamo una timeline che sarà ripetuta su hover e touch
        let tl = gsap.timeline({ paused: true });
  
        // Aggiungiamo l'animazione del margine destro di .read-btn-arrow
        tl.to(arrow, {
          duration: 0.2,
          marginRight: "2px", // Cambia il margine destro
          ease: "back.out",
        }).to(
          gradient,
          {
            backgroundImage: `linear-gradient(to right, ${color1}, ${color2})`, // Gradiente dal colore1 al trasparente
            duration: 0.2,
            ease: "linear",
          },
          "<"
        );
  
        tl.to(
          text,
          {
            duration: 0.3,
            rotate: 8, // Ruota di 8 gradi
            ease: "back.out",
          },
          "-=0.2"
        );
  
        // Funzione di animazione per hover e touch
        function animateBtnCategory(isHover) {
          if (isHover) {
            tl.play(); // Avvia l'animazione
          } else {
            tl.reverse(); // Inverte l'animazione quando si lascia l'elemento
          }
        }
  
        // Eventi per hover e touch
        const handleCategoryEnter = () => animateBtnCategory(true);
        const handleCategoryLeave = () => animateBtnCategory(false);
        const handleCategoryTouchStart = () => animateBtnCategory(true);
        const handleCategoryTouchEnd = () => animateBtnCategory(false);
        
        btn.addEventListener("mouseenter", handleCategoryEnter);
        btn.addEventListener("mouseleave", handleCategoryLeave);
        btn.addEventListener("touchstart", handleCategoryTouchStart);
        btn.addEventListener("touchend", handleCategoryTouchEnd);
        
        window.pageSpecificListeners.push(
          { element: btn, event: "mouseenter", handler: handleCategoryEnter },
          { element: btn, event: "mouseleave", handler: handleCategoryLeave },
          { element: btn, event: "touchstart", handler: handleCategoryTouchStart },
          { element: btn, event: "touchend", handler: handleCategoryTouchEnd }
        );
        
      });
    },
    thumbnailImageAnimation: function () {
      const containers = document.querySelectorAll(".related-post-category");
  
      containers.forEach((container) => {
        // Seleziona l'immagine della miniatura specifica all'interno del container
        const thumbnail = container.querySelector(".thumbnail-image");
  
        // Se la miniatura esiste, crea l'animazione
        if (thumbnail) {
          // Creiamo la timeline dell'animazione GSAP
          let tl = gsap.timeline({ paused: true });
  
          // Definiamo l'animazione hover
          tl.to(thumbnail, {
            scale: 1.2, // Scala l'immagine
            duration: 0.5, // Durata dell'animazione
            ease: "power2.inOut", // Tipo di easing per una transizione più fluida
            transformOrigin: "center center", // Imposta l'origine di trasformazione al centro
          }).to(
            container,
            {
              boxShadow: "0 2px 5px 0 rgba(0, 0, 0, 0.2)", // Aggiungi un'ombra
              duration: 0.5,
              ease: "power2.inOut",
            },
            "<" // Sincronizza le animazioni
          );
  
          // Aggiungiamo gli eventi hover
          const handleContainerEnter = () => tl.play();
          const handleContainerLeave = () => tl.reverse();
          
          container.addEventListener("mouseenter", handleContainerEnter);
          container.addEventListener("mouseleave", handleContainerLeave);
          
          window.pageSpecificListeners.push(
            { element: container, event: "mouseenter", handler: handleContainerEnter },
            { element: container, event: "mouseleave", handler: handleContainerLeave }
          );          
        }
      });
    },
  
    postEntry: function () {
      const relatedPosts = document.querySelectorAll(".related-post-category");
      gsap.set(".related-post-category", { opacity: 0, y: "-20%" });
  
      relatedPosts.forEach((post) => {
        // Creiamo un'animazione per ciascun .related-post-category individualmente
        ScrollTrigger.create({
          trigger: post, // Ogni singolo post è il trigger
          start: "top 80%", // L'animazione parte quando il post è al 80% della viewport
          toggleActions: "play none none none", // Anima quando entra, reverte quando esce
          onEnter: () => {
            // Animazione per il singolo post
            gsap.to(post, {
              y: "0%",
              opacity: 1,
              duration: 0.5,
              ease: "power1.inOut",
            });
          },
        });
      });
    },  

    shareBtnAnimation: function () {
      const shareBtns = document.querySelectorAll(".share-btn-propo");
    
      shareBtns.forEach((btn) => {
        const svgCont = btn.querySelector(".svg-cont");
    
        let context = gsap.context(() => {
          function animateSvgCont(show) {
            gsap.to(svgCont, {
              duration: 0.3,
              opacity: show ? 1 : 0,
              right: show ? 0 : "auto",
              ease: "power1.out",
            });
          }
    
          // ✅ Handler nominati
          const handleEnter = () => animateSvgCont(true);
          const handleLeave = () => animateSvgCont(false);
          const handleTouchStart = () => animateSvgCont(true);
          const handleTouchEnd = () => animateSvgCont(false);
    
          // ✅ Eventi
          btn.addEventListener("mouseenter", handleEnter);
          btn.addEventListener("mouseleave", handleLeave);
          btn.addEventListener("touchstart", handleTouchStart);
          btn.addEventListener("touchend", handleTouchEnd);
    
          // ✅ Tracciamento per cleanup
          window.pageSpecificListeners.push(
            { element: btn, event: "mouseenter", handler: handleEnter },
            { element: btn, event: "mouseleave", handler: handleLeave },
            { element: btn, event: "touchstart", handler: handleTouchStart },
            { element: btn, event: "touchend", handler: handleTouchEnd }
          );
        }, btn);
      });
    },    
   
    init: function () {
      this.initializeSwiper();
      this.categoryLabel();
      this.tagLinkAnimation();
      this.btnReadAnimation();
      this.NewsLetterAnimation();
      this.btnCategoryAnimation();
      this.shareBtnAnimation();
      if (window.matchMedia("(min-width: 768px)").matches) {
        this.thumbnailImageAnimation();
      }
      this.postEntry();
    },
  };

  function initSliderCTA() {
    const swiper = new Swiper(".slider-cta-wrapper", {
      loop: true,
      speed: 700,
      effect: "slide",
      grabCursor: true,
      resistanceRatio: 0.85,
      threshold: 6,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
  
    const sliderWrapper = document.querySelector(".slider-cta-wrapper");
    const buttons = document.querySelectorAll(
      ".swiper-button-prev, .swiper-button-next"
    );
    const nextButtons = document.querySelectorAll(".swiper-button-next");
  
    if (!sliderWrapper || !buttons.length) return;
  
    let autoTl;
    let isSliderVisible = false; // Stato della visibilità dello slider
  
    function startAutoAnimation() {
      if (!isSliderVisible) return;
  
      nextButtons.forEach((button) => {
        const track = button.querySelector(".traccia-av-next");
        if (!track) return;
  
        setTimeout(() => {
          const trackLength = track.getTotalLength();
          if (trackLength > 0) {
            gsap.set(track, {
              strokeDasharray: trackLength,
              strokeDashoffset: trackLength,
              opacity: 1,
            });
  
            if (autoTl) autoTl.kill();
  
            autoTl = gsap.timeline({ repeat: -1 });
            autoTl.to(track, {
              strokeDashoffset: 0,
              duration: 6,
              ease: "linear",
              onComplete: () => swiper.slideNext(),
            });
          }
        }, 100);
      });
    }
  
    function pauseAutoAnimation() {
      if (autoTl) autoTl.pause();
    }
  
    function resumeAutoAnimation() {
      if (autoTl && isSliderVisible) autoTl.resume();
    }
  
    const mm = gsap.matchMedia();
  
    mm.add("(min-width: 992px)", () => {
      buttons.forEach((button) => {
        const bg = button.querySelector(".btn-sfondo-avanzamento");
        const border = button.querySelector(".traccia-av");
  
        if (!border || !bg) return;
  
        gsap.set(bg, { scale: 0, transformOrigin: "center left" });
  
        const hoverTl = gsap.timeline({ paused: true });
        hoverTl
          .to(bg, { scale: 1, duration: 0.3, ease: "power2.out" })
          .to(border, { opacity: 1, duration: 0.3, ease: "power2.out" }, "-=0.2");
  
          const handleEnter = () => {
            pauseAutoAnimation();
            hoverTl.play();
          };
          
          const handleLeave = () => {
            resumeAutoAnimation();
            hoverTl.reverse();
          };
          
          button.addEventListener("mouseenter", handleEnter);
          button.addEventListener("mouseleave", handleLeave);
          
          window.pageSpecificListeners.push(
            { element: button, event: "mouseenter", handler: handleEnter },
            { element: button, event: "mouseleave", handler: handleLeave }
          );          
      });
    });
  
    mm.add("(max-width: 991px)", () => {
      buttons.forEach((button) => {
        const bg = button.querySelector(".btn-sfondo-avanzamento");
        const border = button.querySelector(".traccia-av");
  
        if (!border || !bg) return;
  
        gsap.set(bg, { scale: 0, transformOrigin: "center left" });
  
        const touchTl = gsap.timeline({ paused: true });
        touchTl
          .to(bg, { scale: 1, duration: 0.3, ease: "power2.out" })
          .to(border, { opacity: 1, duration: 0.3, ease: "power2.out" }, "-=0.2");
  
          const handleTouchStart = () => {
            pauseAutoAnimation();
            touchTl.play();
          };
          
          const handleTouchEnd = () => {
            resumeAutoAnimation();
            touchTl.reverse();
          };
          
          button.addEventListener("touchstart", handleTouchStart);
          button.addEventListener("touchend", handleTouchEnd);
          
          window.pageSpecificListeners.push(
            { element: button, event: "touchstart", handler: handleTouchStart },
            { element: button, event: "touchend", handler: handleTouchEnd }
          );          
      });
    });
  
    buttons.forEach((button) => {
      const handleClick = () => startAutoAnimation();
    
      button.addEventListener("click", handleClick);
    
      window.pageSpecificListeners.push({
        element: button,
        event: "click",
        handler: handleClick,
      });
    });    
  
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            isSliderVisible = true;
            startAutoAnimation();
          } else {
            isSliderVisible = false;
            pauseAutoAnimation();
          }
        });
      },
      { threshold: 0.5 }
    );
  
    observer.observe(sliderWrapper);
  }

  function genericPageTitleAnimations() {
    const splitH = new SplitType(".sub-global-heading", {
      types: "words",
      tagName: "span",
    });
    gsap.set(splitH.words, { y: -100 });
    const containers = document.querySelectorAll(".div-heading-global-services");
    containers.forEach((container) => {
      const splitWords = container.querySelectorAll(".sub-global-heading .word");
      const lineTitle = container.querySelector(".line-title-section");
      gsap.set(lineTitle, { scaleX: 0, transformOrigin: "center left" });
  
      ScrollTrigger.create({
        trigger: container,
        start: "top 70%",
        scrub: 1,
        toggleActions: "play none none none",
        onEnter: () => {
          gsap
            .timeline()
            .to(lineTitle, {
              scaleX: 1,
              duration: 0.6,
              ease: "power2.out",
            })
            .to(
              splitWords,
              {
                y: 0,
                duration: 0.4,
                stagger: 0.1,
                ease: "power2.out",
              },
              "-=0.4"
            );
        },
      });
    });
  }

  window.ctaStickyLastWork = window.ctaStickyLastWork || {
    // Variabili e oggetti
    horizontalScrollTL: null,
  
    // Selettori per Scroll Orizzontale
    reset() {
      this.scrollWrapperH = document.querySelector(".horizontal-scroll-wrapper");
      this.scrollContainerH = document.querySelector(
        ".horizontal-scroll-container"
      );
      this.panelZero = document.getElementById("panelZero");
      this.panelPrimo = document.getElementById("panelPrimo");
      this.panelSecondo = document.getElementById("panelSecondo");
      this.panelTerzo = document.getElementById("panelTerzo");
      this.triggerPrimo = document.getElementById("itemPrimo");
      this.triggerSecondo = document.getElementById("itemSecondo");
      this.triggerTerzo = document.getElementById("itemTerzo");
      this.innerPanelPrimo = document.getElementById("mobile-inner-panel-primo");
      this.innerPanelSecondo = document.getElementById(
        "mobile-inner-panel-secondo"
      );
      this.innerPanelTerzo = document.getElementById("mobile-inner-panel-terzo");
      this.firstLine = document.getElementById("item-line-first");
      this.secondLine = document.getElementById("item-line-second");
      this.thirdLine = document.getElementById("item-line-third");
      this.firstTxt = document.getElementById("txt-first");
      this.secondTxt = document.getElementById("txt-second");
      this.thirdTxt = document.getElementById("txt-third");
  
      // Se gli elementi sono validi, rilancio le animazioni
      if (this.scrollWrapperH && this.scrollContainerH && this.panelPrimo) {
        this.init();
      } else {
        console.warn(
          "reset(): Alcuni elementi non sono stati trovati, animazioni non riavviate."
        );
      }
    },
  
    // Inizializzazione dell'oggetto
    init() {
      this.showcaseHorizontalScroll();
      this.showcaseExpandPanels();
      this.showcaseExpandPanelsInner();
      this.showcaseProgress();
      this.showcaseProgressTxt();
      this.showcaseScaleImages();
    },
  
    // Funzione per lo Scroll Orizzontale
    showcaseHorizontalScroll() {
      if (!this.scrollWrapperH || !this.scrollContainerH) {
        console.warn("❌ showcaseHorizontalScroll: elementi non trovati");
        return;
      }
  
      const scrollLength = this.scrollContainerH.scrollWidth - window.innerWidth;
  
      this.horizontalScrollTL = gsap.timeline({
        scrollTrigger: {
          trigger: this.scrollWrapperH,
          start: "top top",
          end: `+=${scrollLength}`,
          scrub: true,
          pin: true, //  pinna la sezione durante lo scroll orizzontale
          //anticipatePin: 1, // (opzionale) aiuta a prevenire salti di layout
        },
      });
  
      this.horizontalScrollTL.to(this.scrollContainerH, {
        x: `-${scrollLength}px`,
        ease: "none",
      });
    },
  
    showcaseExpandPanels() {
      const panels = [
        {
          element: this.panelPrimo,
          trigger: this.triggerPrimo,
          start: "left left",
          end: "right left",
          startX: "80%",
          finalX: "0%",
        },
        {
          element: this.panelSecondo,
          trigger: this.triggerPrimo,
          start: "left left",
          end: "right left",
          startX: "97%",
          finalX: "80%",
        },
        {
          element: this.panelTerzo,
          trigger: this.triggerPrimo,
          start: "left left",
          end: "right left",
          startX: "100%",
          finalX: "97%",
        },
      ];
  
      panels.forEach(({ element, trigger, start, end, startX, finalX }) => {
        if (!element || !trigger) {
          console.warn(`showcaseExpandPanels: Elemento o trigger non trovati.`);
          return;
        }
  
        gsap.fromTo(
          [element].filter(Boolean),
          { x: startX },
          {
            x: finalX,
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: trigger,
              containerAnimation: this.horizontalScrollTL,
              start: start,
              end: end,
              scrub: true,
            },
          }
        );
      });
      const followUpPanels = [
        {
          element: this.panelSecondo,
          trigger: this.triggerSecondo,
          startX: "80%",
          finalX: "0%",
        },
        {
          element: this.panelTerzo,
          trigger: this.triggerSecondo,
          startX: "97%",
          finalX: "80%",
        },
      ];
  
      followUpPanels.forEach(({ element, trigger, startX, finalX }) => {
        if (!element || !trigger) return;
  
        ScrollTrigger.create({
          trigger: trigger,
          containerAnimation: this.horizontalScrollTL,
          start: "left left",
          end: "right left",
          scrub: true,
          onEnter: () => {
            gsap.fromTo(
              element,
              { x: startX },
              {
                x: finalX,
                ease: "power2.inOut",
                scrollTrigger: {
                  trigger: trigger,
                  containerAnimation: this.horizontalScrollTL,
                  start: "left left",
                  end: "right left",
                  scrub: true,
                },
              }
            );
          },
        });
      });
      const followUpPanelsLast = [
        {
          element: this.panelTerzo,
          trigger: this.triggerTerzo,
          startX: "80%",
          finalX: "0%",
        },
      ];
  
      followUpPanelsLast.forEach(({ element, trigger, startX, finalX }) => {
        if (!element || !trigger) return;
  
        ScrollTrigger.create({
          trigger: trigger,
          containerAnimation: this.horizontalScrollTL,
          start: "left left",
          end: "right left",
          scrub: true,
          onEnter: () => {
            gsap.fromTo(
              element,
              { x: startX },
              {
                x: finalX,
                ease: "power2.inOut",
                scrollTrigger: {
                  trigger: trigger,
                  containerAnimation: this.horizontalScrollTL,
                  start: "left left",
                  end: "right left",
                  scrub: true,
                },
              }
            );
          },
        });
      });
    },
    showcaseExpandPanelsInner() {
      const panels = [
        {
          element: this.innerPanelPrimo,
          trigger: this.triggerPrimo,
          start: "left left",
          end: "right left",
          startX: "-80%",
          finalX: "0%",
        },
        {
          element: this.innerPanelSecondo,
          trigger: this.triggerSecondo,
          start: "left left",
          end: "right left",
          startX: "-80%",
          finalX: "0%",
        },
        {
          element: this.innerPanelTerzo,
          trigger: this.triggerTerzo,
          start: "left left",
          end: "right left",
          startX: "-80%",
          finalX: "0%",
        },
      ];
  
      panels.forEach(({ element, trigger, start, end, startX, finalX }) => {
        if (!element || !trigger) {
          console.warn(`showcaseExpandPanels: Elemento o trigger non trovati.`);
          return;
        }
  
        gsap.fromTo(
          [element].filter(Boolean),
          { x: startX },
          {
            x: finalX,
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: trigger,
              containerAnimation: this.horizontalScrollTL,
              start: start,
              end: end,
              scrub: true,
            },
          }
        );
      });
    },
  
    showcaseProgress() {
      const lines = [
        {
          element: this.firstLine,
          trigger: this.triggerPrimo,
          start: "left left",
          end: "right left",
          scale: 1,
        },
        {
          element: this.secondLine,
          trigger: this.triggerSecondo,
          start: "left left",
          end: "right left",
          scale: 1,
        },
        {
          element: this.thirdLine,
          trigger: this.triggerTerzo,
          start: "left left",
          end: "right left",
          scale: 1,
        },
      ];
  
      lines.forEach(({ element, trigger, start, end, scale }) => {
        if (!element || !trigger) {
          console.warn(`showcaseExpandPanels: Elemento o trigger non trovati.`);
          return;
        }
  
        gsap.to(element, {
          scaleX: scale,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: trigger,
            containerAnimation: this.horizontalScrollTL,
            start: start,
            end: end,
            scrub: true,
          },
        });
      });
    },
    showcaseProgressTxt() {
      const txt = [
        {
          element: this.firstTxt,
          trigger: this.triggerPrimo,
          start: "right 80%",
        },
        {
          element: this.secondTxt,
          trigger: this.triggerSecondo,
          start: "right 80%",
        },
        {
          element: this.thirdTxt,
          trigger: this.triggerTerzo,
          start: "right 80%",
        },
      ];
  
      txt.forEach(({ element, trigger, start }) => {
        if (!element || !trigger) {
          console.warn(`showcaseExpandPanels: Elemento o trigger non trovati.`);
          return;
        }
  
        gsap.to(element, {
          y: 0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: trigger,
            containerAnimation: this.horizontalScrollTL,
            start: start,
            scrub: true,
          },
        });
      });
    },
  
    showcaseScaleImages() {
      const images = [
        {
          id: "#imgZero",
          trigger: this.triggerPrimo,
          start: "left left",
          end: "right left",
          from: { scale: 1, x: "0%" },
          to: { scale: 0.8, x: "-80%" },
        },
        {
          id: "#imgPrimo",
          trigger: this.triggerPrimo,
          start: "left left",
          end: "right left",
          from: { scale: 0.43, x: "43%" },
          to: { scale: 1, x: "0%" },
        },
        {
          id: "#imgSecondo",
          trigger: this.triggerPrimo,
          start: "left left",
          end: "right left",
          from: { scale: 0.1, x: "10%" },
          to: { scale: 0.43, x: "43%" },
        },
        {
          id: "#imgTerzo",
          trigger: this.triggerPrimo,
          start: "left left",
          end: "right left",
          from: { scale: 0, x: "0%" },
          to: { scale: 0.1, x: "10%" },
        },
      ];
  
      images.forEach(({ id, trigger, start, end, from, to }) => {
        const image = document.querySelector(id);
        if (!image || !trigger) return;
  
        gsap.fromTo(image, from, {
          ...to,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: trigger,
            containerAnimation: this.horizontalScrollTL,
            start: start,
            end: end,
            scrub: true,
          },
        });
      });
  
      // Seconda fase (attivata solo quando il trigger entra)
      const followUpImages = [
        {
          id: "#imgPrimo",
          trigger: this.triggerSecondo,
          from: { scale: 1, x: "0%" },
          to: { scale: 0.8, x: "-80%" },
        },
        {
          id: "#imgSecondo",
          trigger: this.triggerSecondo,
          from: { scale: 0.43, x: "43%" },
          to: { scale: 1, x: "0%" },
        },
        {
          id: "#imgTerzo",
          trigger: this.triggerSecondo,
          from: { scale: 0.1, x: "10%" },
          to: { scale: 0.53, x: "53%" },
        },
      ];
  
      followUpImages.forEach(({ id, trigger, from, to }) => {
        const image = document.querySelector(id);
        if (!image || !trigger) return;
  
        ScrollTrigger.create({
          trigger: trigger,
          containerAnimation: this.horizontalScrollTL,
          start: "left left",
          end: "right left",
          scrub: true,
          onEnter: () => {
            gsap.fromTo(image, from, {
              ...to,
              ease: "power2.inOut",
              scrollTrigger: {
                trigger: trigger,
                containerAnimation: this.horizontalScrollTL,
                start: "left left",
                end: "right left",
                scrub: true,
              },
            });
          },
        });
      });
      const followUpImagesLast = [
        {
          id: "#imgSecondo",
          trigger: this.triggerTerzo,
          from: { scale: 1, x: "0%" },
          to: { scale: 0.8, x: "-80%" },
        },
        {
          id: "#imgTerzo",
          trigger: this.triggerTerzo,
          from: { scale: 0.53, x: "53%" },
          to: { scale: 1, x: "0%" },
        },
      ];
  
      followUpImagesLast.forEach(({ id, trigger, from, to }) => {
        const image = document.querySelector(id);
        if (!image || !trigger) return;
  
        ScrollTrigger.create({
          trigger: trigger,
          containerAnimation: this.horizontalScrollTL,
          start: "left left",
          end: "right left",
          scrub: true,
          onEnter: () => {
            gsap.fromTo(image, from, {
              ...to,
              ease: "power2.inOut",
              scrollTrigger: {
                trigger: trigger,
                containerAnimation: this.horizontalScrollTL,
                start: "left left",
                end: "right left",
                scrub: true,
              },
            });
          },
        });
      });
    },
  };
  //animazioni button showcase verticale oltre i primi tre item principali
  function setupPageShowcaseButtons() {
    const panels = document.querySelectorAll(".panel-portfolio");
  
    if (!panels.length) {
      console.warn("❌ setupVerticalShowcaseButtons: Nessun pannello trovato.");
      return;
    }
    const mm = gsap.matchMedia();
  
    mm.add("(min-width: 992px)", () => {
      panels.forEach((panel) => {
        const button = panel.querySelector(".btn-cta-show");
        const hoverDiv = button?.querySelector(".btn-showcase-hov-lw");
        const arrowHover = hoverDiv?.querySelector(".freccia-cta-arrow-hover");
        const arrowDefault = button?.querySelector(".freccia-cta-arrow");
  
        if (!button || !hoverDiv || !arrowHover || !arrowDefault) {
          return;
        }
  
        let enterTl = gsap.timeline({ paused: true });
        let leaveTl = gsap.timeline({ paused: true });
        let isHovered = false;
  
        // 🔹 Timeline per l'hover IN
        enterTl
          .to(hoverDiv, { scale: 1, duration: 0.3, ease: "power2.out" })
          .to(
            arrowHover,
            { scale: 1, duration: 0.3, ease: "power2.out" },
            "-=0.2"
          )
          .to(arrowDefault, { scale: 0, duration: 0.2, ease: "power2.out" }, 0.3);
  
        // 🔹 Timeline per l'hover OUT
        leaveTl
          .to([hoverDiv, arrowHover], {
            scale: 0,
            duration: 0.3,
            ease: "power2.out",
          })
          .to(
            arrowDefault,
            { scale: 1, duration: 0.3, ease: "power2.out" },
            "-=0.2"
          );
  
        const handleMouseEnter = () => {
          if (!isHovered) {
            enterTl.restart();
            isHovered = true;
          }
        };
  
        const handleMouseLeave = () => {
          if (isHovered) {
            leaveTl.restart();
            isHovered = false;
          }
        };
  
        // Aggiunge i listener SOLO al button
        button.addEventListener("mouseenter", handleMouseEnter);
        button.addEventListener("mouseleave", handleMouseLeave);
  
        // 🔹 Registra gli eventi in `window.pageSpecificListeners`
        window.pageSpecificListeners.push(
          { element: button, event: "mouseenter", handler: handleMouseEnter },
          { element: button, event: "mouseleave", handler: handleMouseLeave }
        );
      });
    });
  
    mm.add("(max-width: 991px)", () => {
      panels.forEach((panel) => {
        const button = panel.querySelector(".btn-cta-show");
        const arrowDefault = button?.querySelector(".freccia-cta-arrow");
        const arrowAbs = button?.querySelector(".freccia-cta-arrow-mobile");
  
        if (!button || !arrowDefault || !arrowAbs) {
          return;
        }
  
        let touchTl = gsap.timeline({ paused: true });
        let isTouched = false;
  
        // 🔹 Timeline per il tocco
        touchTl
          .to(arrowDefault, { scale: 0, duration: 0.3, ease: "power2.out" })
          .to(arrowAbs, { scale: 1, duration: 0.3, ease: "power2.out" }, "-=0.2");
  
        const handleTouchStart = () => {
          if (!isTouched) {
            touchTl.restart();
            isTouched = true;
          }
        };
  
        const handleTouchEnd = () => {
          if (isTouched) {
            setTimeout(() => {
              touchTl.reverse();
              isTouched = false;
            }, 0);
          }
        };
  
        // Aggiunge il listener al button
        button.addEventListener("touchstart", handleTouchStart);
        button.addEventListener("touchend", handleTouchEnd);
  
        // 🔹 Registra gli eventi in `window.pageSpecificListeners`
        window.pageSpecificListeners.push(
          { element: button, event: "touchstart", handler: handleTouchStart },
          { element: button, event: "touchend", handler: handleTouchEnd }
        );
      });
    });
  }
// funzione button contatti showcase verticale homepage
  function setupVerticalContatti() {
    const panel = document.getElementById("last-one");
  
    if (!panel) {
      console.warn("❌ setupVerticalContatti: Nessun pannello trovato.");
      return;
    }
    const mm = gsap.matchMedia();
  
    mm.add("(min-width: 992px)", () => {
      const button = panel.querySelector(".btn-cta-show");
      const btn = panel.querySelector(".btn-showcase-lw");
      const hoverDiv = button?.querySelector(".btn-showcase-hov-lw");
      const arrowHover = hoverDiv?.querySelector(".freccia-cta-arrow-hover");
      const arrowDefault = button?.querySelector(".freccia-cta-arrow");
      const sfondo = button?.querySelector(".sfondo-cta-btn");
      const txt = button?.querySelector(".btn-cta-txt");
      const trigger = document.querySelector("#v-trigger-first");
  
      if (
        !button ||
        !btn ||
        !hoverDiv ||
        !arrowHover ||
        !arrowDefault ||
        !sfondo ||
        !txt
      )
        return;
  
      gsap.set(btn, { scale: 0 });
      let enterTl = gsap.timeline({ paused: true });
      let leaveTl = gsap.timeline({ paused: true });
      let isHovered = false;
  
      // 🔹 Timeline per l'hover IN
      enterTl
        .to(hoverDiv, { scale: 1, duration: 0.3, ease: "power2.out" })
        .to(arrowHover, { scale: 1, duration: 0.3, ease: "power2.out" }, "-=0.2")
        .to(arrowDefault, { scale: 0, duration: 0.2, ease: "power2.out" }, 0.3);
  
      // 🔹 Timeline per l'hover OUT
      leaveTl
        .to([hoverDiv, arrowHover], {
          scale: 0,
          duration: 0.3,
          ease: "power2.out",
        })
        .to(
          arrowDefault,
          { scale: 1, duration: 0.3, ease: "power2.out" },
          "-=0.2"
        );
  
      const handleMouseEnter = () => {
        if (!isHovered) {
          enterTl.restart();
          isHovered = true;
        }
      };
  
      const handleMouseLeave = () => {
        if (isHovered) {
          leaveTl.restart();
          isHovered = false;
        }
      };
  
      const scrollTl = gsap.timeline();
  
      ScrollTrigger.create({
        trigger: trigger,
        scrub: true,
        start: "bottom bottom+=150",
        onEnter: () =>
          scrollTl
            .to(sfondo, { y: 0, duration: 0.5, ease: "power2.out" })
            .to(btn, { scale: 1, duration: 0.5, ease: "power2.out" }, "-=0.3")
            .to(txt, { opacity: 1, duration: 0.3, ease: "power2.out" }, "<")
  
            .to(
              button,
              {
                borderColor: "var(--background-first)",
                duration: 0.3,
                ease: "power2.out",
              },
              "<"
            ),
        onLeaveBack: () =>
          scrollTl
            .to(sfondo, { y: 120, duration: 0.5, ease: "power2.out" })
            .to(btn, { scale: 0, duration: 0.5, ease: "power2.out" }, "-=0.3")
            .to(txt, { opacity: 0, duration: 0.3, ease: "power2.out" }, "<")
  
            .to(
              button,
              {
                borderColor: "var(--trasparent)",
                duration: 0.3,
                ease: "power2.out",
              },
              "<"
            ),
      });
  
      // Aggiunge i listener SOLO al button
      button.addEventListener("mouseenter", handleMouseEnter);
      button.addEventListener("mouseleave", handleMouseLeave);
  
      // 🔹 Registra gli eventi in `window.pageSpecificListeners`
      window.pageSpecificListeners.push(
        { element: button, event: "mouseenter", handler: handleMouseEnter },
        { element: button, event: "mouseleave", handler: handleMouseLeave }
      );
    });
    mm.add("(max-width: 991px)", () => {
      const button = panel.querySelector(".btn-cta-show");
      const btn = panel.querySelector(".btn-showcase-lw");
      const arrowDefault = button?.querySelector(".freccia-cta-arrow");
      const arrowAbs = button?.querySelector(".freccia-cta-arrow-mobile");
      const sfondo = button?.querySelector(".sfondo-cta-btn");
      const txt = button?.querySelector(".btn-cta-txt");  
  
      if (!button || !btn || !arrowAbs || !arrowDefault || !sfondo || !txt)
        return;
  gsap.set(btn, { scale: 0 });
      let touchTl = gsap.timeline({ paused: true });
      let isTouched = false;
  
      // 🔹 Timeline per il tocco
      touchTl
        .to(arrowDefault, { scale: 0, duration: 0.3, ease: "power2.out" })
        .to(arrowAbs, { scale: 1, duration: 0.3, ease: "power2.out" }, "-=0.2");
  
      const handleTouchStart = () => {
        if (!isTouched) {
          touchTl.restart();
          isTouched = true;
        }
      };
  
      const handleTouchEnd = () => {
        if (isTouched) {
          setTimeout(() => {
            touchTl.reverse();
            isTouched = false;
          }, 0);
        }
      };
  
      const scrollTl = gsap.timeline();
  
      ScrollTrigger.create({
        trigger: panel,
        scrub: true,
        start: "top 70%",
  
        onEnter: () =>
          scrollTl
            .to(sfondo, { y: 0, duration: 0.5, ease: "power2.out" })
            .to(btn, { scale: 1, duration: 0.5, ease: "power2.out" }, "-=0.3")
            .to(txt, { opacity: 1, duration: 0.3, ease: "power2.out" }, "<")
  
            .to(
              button,
              {
                borderColor: "var(--background-first)",
                duration: 0.3,
                ease: "power2.out",
              },
              "<"
            ),
        onLeaveBack: () =>
          scrollTl
            .to(sfondo, { y: 120, duration: 0.5, ease: "power2.out" })
            .to(btn, { scale: 0, duration: 0.5, ease: "power2.out" }, "-=0.3")
            .to(txt, { opacity: 0, duration: 0.3, ease: "power2.out" }, "<")
  
            .to(
              button,
              {
                borderColor: "var(--trasparent)",
                duration: 0.3,
                ease: "power2.out",
              },
              "<"
            ),
      });
  
      // Aggiunge il listener al button
      button.addEventListener("touchstart", handleTouchStart);
      button.addEventListener("touchend", handleTouchEnd);
  
      // 🔹 Registra gli eventi in `window.pageSpecificListeners`
      window.pageSpecificListeners.push(
        { element: button, event: "touchstart", handler: handleTouchStart },
        { element: button, event: "touchend", handler: handleTouchEnd }
      );
    });
  }
// funzione button cta component
  function globalCtaButton() {
  const panel = document.getElementById("cta-talk");
  const lets = panel.querySelectorAll(".cta-letter-span");
  const talk = panel.querySelectorAll(".cta-letter-span-talk");

  if (!panel) {
    console.warn("❌ setupVerticalContatti: Nessun pannello trovato.");
    return;
  }
  const mm = gsap.matchMedia();

  ScrollTrigger.create({
    trigger: panel,
    start: "top 60%",
    end: "top 40%",
    onEnter: () =>
      gsap
        .timeline()
        .to(lets, {
          y: 0,
          duration: 0.5,
          ease: "power2.out",
          stagger: { amount: 0.2 },
        })
        .to(
          talk,
          {
            rotateY: 0,
            duration: 0.5,
            ease: "power2.out",
            stagger: { amount: 0.2 },
          },
          "-=0.2"
        ),

    onLeaveBack: () =>
      gsap
        .timeline()
        .to(talk, {
          rotateY: -90,
          duration: 0.5,
          ease: "power2.out",
          stagger: { amount: 0.2 },
        })
        .to(
          lets,
          {
            y: "150%",
            duration: 0.5,
            ease: "power2.out",
            stagger: { amount: 0.2 },
          },
          "-=0.2"
        ),
  });
  
    mm.add("(min-width: 992px)", () => {
      const button = panel.querySelector(".btn-cta-show");
      const btn = panel.querySelector(".btn-showcase-lw");
      const hoverDiv = button?.querySelector(".btn-showcase-hov-lw");
      const arrowHover = hoverDiv?.querySelector(".freccia-cta-arrow-hover");
      const arrowDefault = button?.querySelector(".freccia-cta-arrow");
      const sfondo = button?.querySelector(".sfondo-cta-btn");
      const txt = button?.querySelector(".btn-cta-txt");
  
      if (
        !button ||
        !btn ||
        !hoverDiv ||
        !arrowHover ||
        !arrowDefault ||
        !sfondo ||
        !txt
      )
        return;
  
      gsap.set(btn, { scale: 0 });
      let enterTl = gsap.timeline({ paused: true });
      let leaveTl = gsap.timeline({ paused: true });
      let isHovered = false;
  
      // 🔹 Timeline per l'hover IN
      enterTl
        .to(hoverDiv, { scale: 1, duration: 0.3, ease: "power2.out" })
        .to(arrowHover, { scale: 1, duration: 0.3, ease: "power2.out" }, "-=0.2")
        .to(arrowDefault, { scale: 0, duration: 0.2, ease: "power2.out" }, 0.3);
  
      // 🔹 Timeline per l'hover OUT
      leaveTl
        .to([hoverDiv, arrowHover], {
          scale: 0,
          duration: 0.3,
          ease: "power2.out",
        })
        .to(
          arrowDefault,
          { scale: 1, duration: 0.3, ease: "power2.out" },
          "-=0.2"
        );
  
      const handleMouseEnter = () => {
        if (!isHovered) {
          enterTl.restart();
          isHovered = true;
        }
      };
  
      const handleMouseLeave = () => {
        if (isHovered) {
          leaveTl.restart();
          isHovered = false;
        }
      };
  
      const scrollTl = gsap.timeline();
  
      ScrollTrigger.create({
        trigger: button,
        start: "top 97%",
        end: "top 10%",
        scrub: true,
        onEnter: () =>
          scrollTl
            .to(sfondo, { y: 0, duration: 0.5, ease: "power2.out" })
            .to(btn, { scale: 1, duration: 0.5, ease: "power2.out" }, "-=0.3")
            .to(txt, { opacity: 1, duration: 0.3, ease: "power2.out" }, "<")
  
            .to(
              button,
              {
                borderColor: "var(--background-first)",
                duration: 0.3,
                ease: "power2.out",
              },
              "<"
            ),
        onLeave: () =>
          scrollTl
            .to(sfondo, { y: -120, duration: 0.5, ease: "power2.out" })
            .to(btn, { scale: 0, duration: 0.5, ease: "power2.out" }, "-=0.3")
            .to(txt, { opacity: 0, duration: 0.3, ease: "power2.out" }, "<")
  
            .to(
              button,
              {
                borderColor: "var(--trasparent)",
                duration: 0.3,
                ease: "power2.out",
              },
              "<"
            ),
        onEnterBack: () =>
          scrollTl
            .to(sfondo, { y: 0, duration: 0.5, ease: "power2.out" })
            .to(btn, { scale: 1, duration: 0.5, ease: "power2.out" }, "-=0.3")
            .to(txt, { opacity: 1, duration: 0.3, ease: "power2.out" }, "<")
  
            .to(
              button,
              {
                borderColor: "var(--background-first)",
                duration: 0.3,
                ease: "power2.out",
              },
              "<"
            ),
        onLeaveBack: () =>
          scrollTl
            .to(sfondo, { y: 120, duration: 0.5, ease: "power2.out" })
            .to(btn, { scale: 0, duration: 0.5, ease: "power2.out" }, "-=0.3")
            .to(txt, { opacity: 0, duration: 0.3, ease: "power2.out" }, "<")
  
            .to(
              button,
              {
                borderColor: "var(--trasparent)",
                duration: 0.3,
                ease: "power2.out",
              },
              "<"
            ),
      });
  
      // Aggiunge i listener SOLO al button
      button.addEventListener("mouseenter", handleMouseEnter);
      button.addEventListener("mouseleave", handleMouseLeave);
  
      // 🔹 Registra gli eventi in `window.pageSpecificListeners`
      window.pageSpecificListeners.push(
        { element: button, event: "mouseenter", handler: handleMouseEnter },
        { element: button, event: "mouseleave", handler: handleMouseLeave }
      );
    });
    mm.add("(max-width: 991px)", () => {
      const button = panel.querySelector(".btn-cta-show");
      const btn = panel.querySelector(".btn-showcase-lw");
      const arrowDefault = button?.querySelector(".freccia-cta-arrow");
      const arrowAbs = button?.querySelector(".freccia-cta-arrow-mobile");
      const sfondo = button?.querySelector(".sfondo-cta-btn");
      const txt = button?.querySelector(".btn-cta-txt");
  
      if (!button || !btn || !arrowAbs || !arrowDefault || !sfondo || !txt)
        return;

      gsap.set(btn, { scale: 0 });  
      let touchTl = gsap.timeline({ paused: true });
      let isTouched = false;
  
      // 🔹 Timeline per il tocco
      touchTl
        .to(arrowDefault, { scale: 0, duration: 0.3, ease: "power2.out" })
        .to(arrowAbs, { scale: 1, duration: 0.3, ease: "power2.out" }, "-=0.2");
  
      const handleTouchStart = () => {
        if (!isTouched) {
          touchTl.restart();
          isTouched = true;
        }
      };
  
      const handleTouchEnd = () => {
        if (isTouched) {
          setTimeout(() => {
            touchTl.reverse();
            isTouched = false;
          }, 0);
        }
      };
  
      const scrollTl = gsap.timeline();
  
      ScrollTrigger.create({
        trigger: button,
        start: "top 97%",
        end: "top 10%",
        scrub: true,
        onEnter: () =>
          scrollTl
            .to(sfondo, { y: 0, duration: 0.5, ease: "power2.out" })
            .to(btn, { scale: 1, duration: 0.5, ease: "power2.out" }, "-=0.3")
            .to(txt, { opacity: 1, duration: 0.3, ease: "power2.out" }, "<")
  
            .to(
              button,
              {
                borderColor: "var(--background-first)",
                duration: 0.3,
                ease: "power2.out",
              },
              "<"
            ),
        onLeave: () =>
          scrollTl
            .to(sfondo, { y: -120, duration: 0.5, ease: "power2.out" })
            .to(btn, { scale: 0, duration: 0.5, ease: "power2.out" }, "-=0.3")
            .to(txt, { opacity: 0, duration: 0.3, ease: "power2.out" }, "<")
  
            .to(
              button,
              {
                borderColor: "var(--trasparent)",
                duration: 0.3,
                ease: "power2.out",
              },
              "<"
            ),
        onEnterBack: () =>
          scrollTl
            .to(sfondo, { y: 0, duration: 0.5, ease: "power2.out" })
            .to(btn, { scale: 1, duration: 0.5, ease: "power2.out" }, "-=0.3")
            .to(txt, { opacity: 1, duration: 0.3, ease: "power2.out" }, "<")
  
            .to(
              button,
              {
                borderColor: "var(--background-first)",
                duration: 0.3,
                ease: "power2.out",
              },
              "<"
            ),
        onLeaveBack: () =>
          scrollTl
            .to(sfondo, { y: 120, duration: 0.5, ease: "power2.out" })
            .to(btn, { scale: 0, duration: 0.5, ease: "power2.out" }, "-=0.3")
            .to(txt, { opacity: 0, duration: 0.3, ease: "power2.out" }, "<")
  
            .to(
              button,
              {
                borderColor: "var(--trasparent)",
                duration: 0.3,
                ease: "power2.out",
              },
              "<"
            ),
      });
  
      // Aggiunge il listener al button
      button.addEventListener("touchstart", handleTouchStart);
      button.addEventListener("touchend", handleTouchEnd);
  
      // 🔹 Registra gli eventi in `window.pageSpecificListeners`
      window.pageSpecificListeners.push(
        { element: button, event: "touchstart", handler: handleTouchStart },
        { element: button, event: "touchend", handler: handleTouchEnd }
      );
    });
  }
// funzione avanzamento progresso home page
  function scrollProgressLine() {
    const settings = [
      {
        lineId: "item-line-zero",
        textId: "txt-zero",
        triggerStart: document.querySelector(".horizontal-scroll-wrapper"),
        triggerEnd: document.getElementById("v-trigger-first"),
        start: "top top",
        end: "bottom bottom",
      },
      {
        lineId: "item-line-first",
        textId: "txt-first",
        triggerStart: document.querySelector(".service-wrapper"),
        triggerEnd: document.querySelector(".service-wrapper"),
        start: "top bottom",
        end: "bottom bottom",
      },
      {
        lineId: "item-line-second",
        textId: "txt-second",
        triggerStart: document.querySelector(".studio-wrapper"),
        triggerEnd: document.querySelector(".proposito-section"),
        start: "top bottom",
        end: "bottom bottom",
      },
      {
        lineId: "item-line-third",
        textId: "txt-third",
        triggerStart: document.getElementById("cta-talk"),
        triggerEnd: document.getElementById("cta-talk"),
        start: "top bottom",
        end: "bottom bottom",
      },
    ];
  
    settings.forEach((item) => {
      const line = document.getElementById(item.lineId);
      const text = document.getElementById(item.textId);
      const triggerStart = item.triggerStart;
      const triggerEnd = item.triggerEnd;
  
      if (!line || !text || !triggerStart || !triggerEnd) {
        console.warn(`Elemento mancante per ${item.lineId}`);
        return;
      }
  
      // 🔹 Animazione linea
      gsap.to(line, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: triggerStart,
          start: item.start,
          endTrigger: triggerEnd,
          end: item.end,
          scrub: true,
        },
      });
  
      // 🔹 Animazione testo IN/OUT
      ScrollTrigger.create({
        trigger: triggerStart,
        start: item.start,
        endTrigger: triggerEnd,
        end: item.end,
        scrub: true,
        onEnter: () => {
          gsap.to(text, { y: 0, duration: 0.6, ease: "power2.out" });
        },
        onLeaveBack: () => {
          gsap.to(text, { y: -100, duration: 0.4, ease: "power2.in" });
        },
      });
    });
  }

  let currentCursorState = "normal"; // "normal", "grab", "grabbing"

  function initCustomCursor() {
    if (!cursorNormal || !cursorGrab || !cursorGrabbing || !pulse) {
      cacheCursorElements(); // li assegna solo se non già definiti
    }
  
    if (!cursorNormal || !cursorGrab || !cursorGrabbing || !pulse) {
      console.warn("Custom cursor SVG non trovati!");
      return;
    }
  
    const cursor = document.getElementById("custom-cursor");
  
    if (!cursor) {
      console.warn("Custom cursor base non trovato!");
      return;
    }
    // Movimento base del cursore
    window.addEventListener("pointermove", (e) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.2,
        ease: "power2.out",
      });
    });
  
    // Interazioni normali (link, input, ecc.)
    const interactiveElements = document.querySelectorAll(
      "a, button, .pointer, .w-radio, .w-input, .w-checkbox, [role='button'], input[type='submit'], input[type='button'], input[type='reset'], input[type='radio'], input[type='checkbox'], input[type='text'], select, [data-form='next-btn'], [data-form='back-btn'], [data-form='submit-btn'], [data-barba='link']"
    );
  
    interactiveElements.forEach((el) => {
      const handleEnter = () => {
        gsap.to(cursorNormal, {
          scale: 1.4,
          duration: 0.3,
          ease: "power2.out",
        });
        gsap.to(pulse, {
          fill: "#ff006e",
          scale: 1.3,
          duration: 0.3,
          ease: "power2.out",
        });
      };
  
      const handleLeave = () => {
        gsap.to(cursorNormal, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
        });
        gsap.to(pulse, {
          fill: "#ffffff",
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
        });
      };
  
      el.addEventListener("mouseenter", handleEnter);
      el.addEventListener("mouseleave", handleLeave);
  
      window.pageSpecificListeners.push(
        { element: el, event: "mouseenter", handler: handleEnter },
        { element: el, event: "mouseleave", handler: handleLeave }
      );
    });
  
    // Gestione speciale per lo swiper
    const swiperWrappers = document.querySelectorAll(".swiper-wrapper");
  
    swiperWrappers.forEach((wrapper) => {
      const setGrabCursor = () => {
        cursorNormal.style.opacity = 0;
        cursorGrab.style.opacity = 1;
        cursorGrabbing.style.opacity = 0;
        currentCursorState = "grab";
      };
  
      const setGrabbingCursor = () => {
        cursorNormal.style.opacity = 0;
        cursorGrab.style.opacity = 0;
        cursorGrabbing.style.opacity = 1;
        currentCursorState = "grabbing";
      };
  
      const resetCursor = () => {
        cursorNormal.style.opacity = 1;
        cursorGrab.style.opacity = 0;
        cursorGrabbing.style.opacity = 0;
        currentCursorState = "normal";
      };
  
      // Quando entri nello swiper
      wrapper.addEventListener("pointerenter", setGrabCursor);
      wrapper.addEventListener("pointerleave", resetCursor);
  
      // Quando inizi a trascinare (mousedown/touchstart)
      wrapper.addEventListener("pointerdown", setGrabbingCursor);
  
      // Quando rilasci (mouseup/touchend)
      wrapper.addEventListener("pointerup", setGrabCursor);
  
      window.pageSpecificListeners.push(
        { element: wrapper, event: "pointerenter", handler: setGrabCursor },
        { element: wrapper, event: "pointerleave", handler: resetCursor },
        { element: wrapper, event: "pointerdown", handler: setGrabbingCursor },
        { element: wrapper, event: "pointerup", handler: setGrabCursor }
      );
    });
  
    // Se siamo sopra un elemento interattivo dentro lo Swiper, priorità: torna al cursore normale
    const swiperInteractiveElements = document.querySelectorAll(
      " .swiper-wrapper [role='button']"
    );
  
    swiperInteractiveElements.forEach((el) => {
      const handleEnter = () => {
        cursorNormal.style.opacity = 1;
        cursorGrab.style.opacity = 0;
        cursorGrabbing.style.opacity = 0;
        currentCursorState = "normal";
      };
  
      const handleLeave = () => {
        cursorNormal.style.opacity = 0;
        cursorGrab.style.opacity = 1;
        cursorGrabbing.style.opacity = 0;
        currentCursorState = "grab";
      };
  
      el.addEventListener("pointerenter", handleEnter);
      el.addEventListener("pointerleave", handleLeave);
  
      window.pageSpecificListeners.push(
        { element: el, event: "pointerenter", handler: handleEnter },
        { element: el, event: "pointerleave", handler: handleLeave }
      );
    });
  }

  function resetCustomCursor() {
    if (!cursorNormal || !cursorGrab || !cursorGrabbing) return;
  
    cursorNormal.style.opacity = 1;
    cursorGrab.style.opacity = 0;
    cursorGrabbing.style.opacity = 0;
    currentCursorState = "normal";
  
    if (pulse) {
      gsap.to(pulse, {
        fill: "#ffffff",
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  
    gsap.to(cursorNormal, {
      scale: 1,
      duration: 0.3,
      ease: "power2.out",
    });
  }

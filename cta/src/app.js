const backHomeLink = document.getElementById("home-link") || null;
const burger = document.getElementById("burger") || null;

//Oggetti e Array Transition
const transitionElementsObj = {
  transitionWrapper: document.querySelector(".trans-wrap") || null, // Mantienilo per classi
  propoWrapper: document.querySelector(".propo_trans-wrap") || null,
};

//-------------------------------------
//Oggetti e Array Nav e Logo Header
const header = {
  burgerBlock: document.getElementById("nav-burger") || null,
  logoMenu: document.getElementById("nav-logo") || null,
  logoHome: document.getElementById("logo-home") || null,
};
const headerElements = Object.values(header).filter((el) => el);

/** Footer elements */
const footerBody = document.getElementById("footer");

//-------------------------------------------------------------------
//Oggetti e Array Elementi Menu e Burger
const burgerElements = {
  nav: document.getElementById("nav") || null,
  menu: document.getElementById("nav-wrapper") || null,
  burgerWrapper: document.querySelector(".burger-wrapper") || null,
  burgerClose: document.querySelector(".burger-close") || null,
  burgerLabel: document.querySelector(".burger-label-wrap") || null,
  textMenu: document.querySelector(".burger-label") || null,
  logoNav: document.querySelectorAll(".logo-menu") || null, // Ottimizzato con getElementById
  lines: {
    top: document.querySelector(".line-top") || null,
    bottom: document.querySelector(".line-bottom") || null,
  },
};

//BARBA
window.isBarbaTransition = false;

function initBarbaWithGSAP() {
  if (typeof barba === "undefined" || typeof gsap === "undefined") {
    console.error("Barba.js o GSAP non sono stati caricati correttamente.");
    return;
  }
  const { ScrollTrigger } = window;
  const hasScrollTrigger = typeof ScrollTrigger !== "undefined";

  // --------------------------------------------------
  // Helper routing / namespace
  // --------------------------------------------------
  function finalizeAfterBarba() {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        window.lenisInstance?.update?.();
      });
    });
  }
  function isHistoryTrigger(trigger) {
    return trigger === "back" || trigger === "forward";
  }

  function isHomeHref(href) {
    if (!href) return false;

    // ancore tipo "#section" NON sono "home" (decidi tu se trattarle come home)
    if (href.startsWith("#")) return false;

    try {
      const url = new URL(href, window.location.origin);

      // Normalizzo: rimuovo slash finali e "index.html"
      const path = url.pathname
        .replace(/\/+$/, "")
        .replace(/\/index\.html$/, "");
      const isHomePath = path === "";

      // Se vuoi considerare "/#qualcosa" come home, allora ok:
      const isSameOrigin = url.origin === window.location.origin;

      return isSameOrigin && isHomePath;
    } catch {
      // href “strani” (tel:, mailto:, ecc.)
      return false;
    }
  }
  function getRouteContext(data) {
    const fromNs = data.current?.namespace || "";
    const toNs = data.next?.namespace || "";

    const isFromHome = fromNs === "home";
    const isToHome = toNs === "home";
    const isHomeToOther = isFromHome && !isToHome;
    const isOtherToHome = !isFromHome && isToHome;

    return {
      fromNs,
      toNs,
      isFromHome,
      isToHome,
      isHomeToOther,
      isOtherToHome,
    };
  }

  function getCurrentContainer(data) {
    return data.current?.container || null;
  }

  function getNextContainer(data) {
    return data.next?.container || null;
  }

  // --------------------------------------------------
  // Context transizioni (generic + home)
  // --------------------------------------------------
  function getButtonTransitionContext(data, { includeNext = false } = {}) {
    const current = getCurrentContainer(data);
    const next = includeNext ? getNextContainer(data) : null;

    // Wrapper generico
    const wrapper = transitionElementsObj?.transitionWrapper || null;

    // Proposito
    const wrapperPropo = transitionElementsObj?.propoWrapper || null;
    const propoLetters = wrapperPropo
      ? gsap.utils.toArray(".proposito-trans-title > .pro-span", wrapperPropo)
      : [];
    const propoLettersTrans = wrapperPropo
      ? gsap.utils.toArray(".pro-top-trans", wrapperPropo)
      : [];
    const propoLettersTransMain = wrapperPropo
      ? gsap.utils.toArray(".pro-swap > .font-normal", wrapperPropo)
      : [];
    const propo = wrapperPropo?.querySelector(".proptype-transition") || null;

    // Footer
    const footer = document.getElementById("footer") || null;

    // Wrapper generico letters
    const letters = wrapper ? gsap.utils.toArray(".l-svg.letter", wrapper) : [];
    const dot = wrapper?.querySelector(".l-svg.dot") || null;

    // Wrapper home
    const wrapperH = document.getElementById("home-transition") || null;
    const bg = wrapperH?.querySelector(".trans-to-home-bg") || null;
    const lettersH = wrapperH
      ? gsap.utils.toArray(".h-letter-svg", wrapperH)
      : [];

    return {
      current,
      next,
      footer,
      wrapper,
      letters,
      dot,
      wrapperH,
      bg,
      lettersH,
      wrapperPropo,
      propo,
      propoLetters,
      propoLettersTrans,
      propoLettersTransMain,
    };
  }

  // --------------------------------------------------
  // Helper comuni
  // --------------------------------------------------
  function killHomeHeroTriggers(data) {
    if (!hasScrollTrigger) return;
    if (data.current?.namespace !== "home") return;

    ScrollTrigger.getAll().forEach((trigger) => {
      if (
        trigger.vars.id &&
        String(trigger.vars.id).startsWith("hero-trigger")
      ) {
        trigger.kill();
      }
    });
  }

  function commonAfter(data) {
    updatePageMetaAndInteractions(data.next.html);
    initializeMainFunctions();
    window.customCursor?.refresh?.();
    if (!cookieManager.getCookie("cta")) {
      uiManager.showBanner();
    }
    finalizeAfterBarba();
  }

  // --------------------------------------------------
  // RESET elementi transizione
  // --------------------------------------------------
  function resetButtonTransitionElements() {
    const wrapper = transitionElementsObj?.transitionWrapper || null;
    const footer = document.getElementById("footer") || null;
    if (!wrapper) return;

    const letters = gsap.utils.toArray(".l-svg.letter", wrapper);
    const dot = wrapper.querySelector(".l-svg.dot");

    gsap.set(wrapper, {
      clearProps: "transform",
      "--trans-clip-bottom": "0%",
    });
    if (footer) {
      gsap.set(footer, { clearProps: "transform" });
    }

    gsap.set(letters, {
      clearProps: "transform",
    });

    if (dot) {
      gsap.set(dot, {
        clearProps: "transform,--r-scale",
        "--r-scale": 0,
      });
      wrapper.setAttribute("data-cover", "");
    }
  }
  function resetPropoTransitionElements() {
    const wrapperPropo = transitionElementsObj?.propoWrapper || null;
    if (!wrapperPropo) return;

    const propoLetters = wrapperPropo ? gsap.utils.toArray(".pro-span") : [];
    const propoLettersTrans = wrapperPropo
      ? gsap.utils.toArray(".pro-top-trans")
      : [];
    const propoLettersTransMain = wrapperPropo
      ? gsap.utils.toArray(".pro-span.font-normal")
      : [];
    const propoLettersAll = [
      ...new Set([
        ...propoLetters,
        ...propoLettersTrans,
        ...propoLettersTransMain,
      ]),
    ];

    const propo = wrapperPropo?.querySelector(".proptype-transition") || null;
    const footer = document.getElementById("footer") || null;

    if (footer) {
      gsap.set(footer, { clearProps: "transform" });
    }

    if (propo) {
      gsap.set(propo, { clearProps: "transform,opacity" });
    }

    gsap.set(wrapperPropo, {
      clearProps: "transform",
      "--trans-clip-bottom": "0%",
    });

    gsap.set(propoLettersAll, {
      clearProps: "transform,opacity,transformOrigin",
    });

    wrapperPropo.setAttribute("data-cover", "");
  }
  function resetButtonTransitionElementsHome() {
    const wrapper = document.getElementById("home-transition") || null;
    if (!wrapper) return;

    const bg = wrapper.querySelector(".trans-to-home-bg");
    const letters = gsap.utils.toArray(".h-letter-svg", wrapper);

    gsap.set(letters, { clearProps: "transform" });
    if (bg) {
      gsap.set(bg, { "--trans-clip-top": "100%" });
    }
  }

  function freezeCurrentPageScrollFx(container) {
    if (!window.ScrollTrigger || !container) return;

    ScrollTrigger.getAll().forEach((st) => {
      const triggerEl = st.trigger;
      const pinEl = st.pin;

      const belongsToCurrentPage =
        (triggerEl instanceof Element && container.contains(triggerEl)) ||
        (pinEl instanceof Element && container.contains(pinEl));

      if (!belongsToCurrentPage) return;

      st.update();
      st.disable(false);
    });
  }
  // --------------------------------------------------
  // BUTTON TRANSITION GENERICA (leave / enter)
  // --------------------------------------------------
  function runButtonLeaveTransition(data, done) {
    const { current, footer, wrapper, dot, letters } =
      getButtonTransitionContext(data);

    const currentPage = current?.querySelector?.(".page-container");

    if (!current || !wrapper || !footer || !currentPage) {
      console.warn("button-transition leave: elementi mancanti", {
        current,
        footer,
        wrapper,
        currentPage,
      });
      done?.();
      return;
    }
    const isMobile = !window.bp?.is?.("lgUp");
    const isClickTrigger = data?.trigger instanceof HTMLElement;
    const leaveDelay = isMobile && isClickTrigger ? 0.16 : 0;

    wrapper.setAttribute("data-cover", "active");

    gsap.set(wrapper, { y: "100vh" });

    const tl = gsap.timeline({
      paused: true,
      onStart: () => {
        if (data.current?.namespace === "home") {
          freezeCurrentPageScrollFx(current);
        }
        headerAnimation?.disableBackHomeLink?.();
        headerAnimation?.disableBurgerClick?.();
        window.menuNavigation?.closeUserAccount?.();
      },
      onComplete: () => {
        done?.();
      },
    });

    tl.to(
      currentPage,
      {
        y: "-100vh",
        duration: 1,
        ease: "power3.inOut",
      },
      0
    )
      .to(
        footer,
        {
          y: "-100vh",
          duration: 1,
          ease: "power3.inOut",
        },
        0
      )
      .to(
        wrapper,
        {
          y: 0,
          duration: 1,
          ease: "power3.inOut",
        },
        0
      )
      .to(
        letters,
        {
          y: 0,
          duration: 0.5,
          ease: "power2.out",
          stagger: 0.2,
        },
        0.5
      )
      .to(
        dot,
        {
          "--r-scale": "32.392",
          duration: 0.5,
          ease: "power1.inOut",
        },
        "-=0.3"
      );
    if (leaveDelay > 0) {
      gsap.delayedCall(leaveDelay, () => tl.play(0));
    } else {
      tl.play(0);
    }
  }

  function runButtonEnterTransition(data) {
    const { wrapper, letters, next } = getButtonTransitionContext(data, {
      includeNext: true,
    });
    const nextPage = next?.querySelector?.(".page-container");

    if (!wrapper || !next || !nextPage) {
      console.warn("button-transition enter: elementi mancanti", {
        wrapper,
        next,
        nextPage,
      });
      return;
    }

    const logoLetters = gsap.utils.toArray(".logo-svg.cta");
    const logoDot = document.querySelector(".logo-svg.dot");

    const tl = gsap.timeline({
      onStart: () => {
        gsap.set(logoLetters, { y: 0 });
        if (logoDot) {
          gsap.set(logoDot, { "--r-scale": "32.392" });
        }
        if (header?.burgerBlock) {
          gsap.to(header.burgerBlock, { scale: 1, duration: 0.3 });
        }
      },
      onComplete: () => {
        resetButtonTransitionElements();
        lenisInstance.update?.();
        lenisInstance.start?.();
        headerAnimation?.enableBackHomeLink?.();
        headerAnimation?.enableBurgerClick?.();
        window.menuNavigation?.resetFooterLinks?.();
      },
    });

    tl.to(letters, {
      yPercent: -110,
      duration: 0.4,
      ease: "power2.in",
      stagger: { each: 0.2, from: "end" },
    })
      .to(
        wrapper,
        {
          "--trans-clip-bottom": "100%",
          duration: 1,
          ease: "power3.inOut",
        },
        0.35
      )
      .to(
        nextPage,
        {
          y: 0,
          duration: 1,
          ease: "power3.inOut",
        },
        0.35
      );
  }
  function runButtonEnterTransitionProject(data) {
    const { wrapper, letters, next } = getButtonTransitionContext(data, {
      includeNext: true,
    });
    const nextPage = next?.querySelector?.(".page-container");

    if (!wrapper || !next || !nextPage) {
      console.warn("button-transition enter: elementi mancanti", {
        wrapper,
        next,
        nextPage,
      });
      return;
    }

    const logoLetters = gsap.utils.toArray(".logo-svg.cta");
    const logoDot = document.querySelector(".logo-svg.dot");

    const h1 = nextPage.querySelector(".proj-h1");
    const line = nextPage.querySelector(".proj-head-line");
    const h2 = nextPage.querySelector(".h2-projects");
    const details = nextPage.querySelector(".proj-head-bot-specific");

    // === Hero primary button del progetto (link esterno) =================
    // Aggiungi in Webflow: data-intro="project-hero"
    const heroBtn = nextPage.querySelector(
      '.btn-primary[data-intro="project-hero"]'
    );
    let heroIntroTl = null;

    if (heroBtn && window.gsap) {
      const border = heroBtn.querySelector(".btn-border");
      const label = heroBtn.querySelector(".btn-label");
      const btnDot = heroBtn.querySelector(".btn");
      const arrow =
        heroBtn.querySelector(".btnn-ar") || heroBtn.querySelector(".btn-ar");

      if (border && label) {
        const SplitText =
          (gsap.plugins && gsap.plugins.SplitText) || window.SplitText;

        // Se non sono ancora stati creati i .btn-char (prima di setupPrimaryButtons)
        if (SplitText && !label.querySelector(".btn-char")) {
          new SplitText(label, {
            type: "chars",
            charsClass: "btn-char",
          });
        }

        const chars = label.querySelectorAll(".btn-char");

        if (chars.length) {
          const isMobile = !window.bp?.is?.("lgUp");
          const speedFactor = isMobile ? 0.85 : 1;

          const D_BORDER = 0.35 * speedFactor;
          const D_CHARS = 0.35 * speedFactor;
          const D_DOT_INTRO = 0.4 * speedFactor;

          const OFFSET_CHARS = 0.25 * speedFactor;
          const OFFSET_DOT_IN = 0.3 * speedFactor;

          // Stati iniziali come in setupPrimaryButtons
          gsap.set(border, { "--clip-x": "50%" });
          gsap.set(chars, { yPercent: 100, opacity: 0 });
          gsap.set(heroBtn, {
            "--btn-scale": 0,
            "--btn-mix": "0%",
            "--btn-origin-y": "100%",
          });

          if (arrow) {
            gsap.set(arrow, { scale: 0, transformOrigin: "bottom left" });
          }

          // Timeline di intro del button (senza ScrollTrigger)
          heroIntroTl = gsap.timeline();
          heroIntroTl
            .to(border, {
              duration: D_BORDER,
              ease: "power2.out",
              "--clip-x": "0%",
            })
            .to(
              chars,
              {
                yPercent: 0,
                opacity: 1,
                duration: D_CHARS,
                stagger: { amount: 0.2 },
                ease: "power2.out",
              },
              OFFSET_CHARS
            );

          if (btnDot) {
            heroIntroTl.to(
              btnDot,
              {
                scale: 0.3,
                duration: D_DOT_INTRO,
                ease: "back.out(1.6)",
              },
              "-=" + OFFSET_DOT_IN
            );
          }
        }
      }
    }
    // ====== TIMELINE PRINCIPALE DELLA TRANSITION =========================
    const tl = gsap.timeline({
      onStart: () => {
        gsap.set(logoLetters, { y: 0 });
        if (logoDot) {
          gsap.set(logoDot, { "--r-scale": "32.392" });
        }
        if (header?.burgerBlock) {
          gsap.to(header.burgerBlock, { scale: 1, duration: 0.3 });
        }
      },
      onComplete: () => {
        resetButtonTransitionElements();
        lenisInstance.update?.();
        lenisInstance.start?.();
        headerAnimation?.enableBackHomeLink?.();
        headerAnimation?.enableBurgerClick?.();
        window.menuNavigation?.resetFooterLinks?.();
      },
    });

    tl.to(letters, {
      yPercent: -110,
      duration: 0.4,
      ease: "power2.in",
      stagger: { each: 0.2, from: "end" },
    })
      .to(
        wrapper,
        {
          "--trans-clip-bottom": "100%",
          duration: 1,
          ease: "power3.inOut",
        },
        0.35
      )
      .to(
        nextPage,
        {
          y: 0,
          duration: 1,
          ease: "power3.inOut",
        },
        0.35
      )
      .to(
        line,
        {
          scaleX: 1,
          duration: 0.8,
          ease: "power2.inOut",
        },
        0.8
      )
      .to(
        h1,
        {
          y: 0,
          duration: 0.6,
          ease: "power2.out",
        },
        1
      )
      .to(
        h2,
        {
          y: 0,
          duration: 0.5,
          ease: "power2.out",
        },
        "-=0.4"
      )
      .to(
        details,
        {
          y: 0,
          duration: 0.5,
          ease: "power2.out",
        },
        "<"
      );
    // Alla fine dell'header, facciamo l’intro del button hero
    if (heroIntroTl) {
      tl.add(heroIntroTl, ">-0.55");
    }
  }
  // --------------------------------------------------
  // BUTTON → HOME (leave / enter)
  // --------------------------------------------------
  function runButtonLeaveTransitionHome(data, done) {
    const { current, wrapperH, bg, lettersH } =
      getButtonTransitionContext(data);

    if (!current || !wrapperH || !bg || !lettersH.length) {
      console.warn("button-transition home leave: elementi mancanti", {
        current,
        wrapperH,
        bg,
        lettersH,
      });
      done?.();
      return;
    }

    wrapperH.setAttribute("data-cover", "active");

    const logoLetters = gsap.utils.toArray(".logo-svg.cta");
    const logoDot = document.querySelector(".logo-svg.dot");
    const isDesktop = !!window.bp?.is?.("lgUp");

    const tl = gsap.timeline({
      onStart: () => {
        headerAnimation?.disableBackHomeLink?.();
        headerAnimation?.disableBurgerClick?.();
        window.menuNavigation?.closeUserAccount?.();
      },
      onComplete: () => {
        done?.();

        if (isDesktop) {
          gsap.set(logoLetters, { y: 100 });
          if (logoDot) gsap.set(logoDot, { "--r-scale": "0" });
          if (header?.burgerBlock) gsap.set(header.burgerBlock, { scale: 0 });
        } else {
          if (header?.burgerBlock) gsap.set(header.burgerBlock, { scale: 0 });
          if (header?.logoHome) {
            gsap.set(header.logoHome, {
              "--brand-clip-t": "100%",
              "--brand-clip-b": "0%",
            });
          }
        }
      },
    });

    tl.to(bg, {
      "--trans-clip-top": "0%",
      duration: 0.8,
      ease: "power3.inOut",
    }).to(
      lettersH,
      {
        y: 0,
        duration: 0.4,
        stagger: 0.2,
        ease: "power2.out",
      },
      0.4
    );
  }

  function runButtonEnterTransitionHome(data) {
    const { wrapperH, next } = getButtonTransitionContext(data, {
      includeNext: true,
    });

    if (!next || !wrapperH) {
      console.warn("button-transition home enter: wrapper o next mancanti", {
        wrapperH,
        next,
      });
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        resetButtonTransitionElementsHome();
        lenisInstance.update?.();
        lenisInstance.start?.();
        headerAnimation?.enableBackHomeLink?.();
        headerAnimation?.enableBurgerClick?.();
        window.menuNavigation?.resetFooterLinks?.();
      },
    });

    tl.add(() => {
      header.burgerBlock?.setAttribute("data-burger", "home");
      header.logoMenu?.setAttribute("data-logo", "home");
      wrapperH.setAttribute("data-cover", "");
    }).call(() => {
      OnLoadHeroDefault?.();
    });
  }
  // -------------------------------------------------
  // PROPOSITO
  // -------------------------------------------------
  function runPropoLeaveTransition(data, done) {
    const {
      current,
      footer,
      wrapperPropo,
      propo,
      propoLetters,
      propoLettersTrans,
      propoLettersTransMain,
    } = getButtonTransitionContext(data);

    const currentPage = current?.querySelector?.(".page-container");

    if (!current || !wrapperPropo || !footer || !currentPage) {
      console.warn("button-transition leave: elementi mancanti", {
        current,
        footer,
        wrapperPropo,
        currentPage,
      });
      done?.();
      return;
    }

    const isMobile = !window.bp?.is?.("lgUp");
    const isClickTrigger = data?.trigger instanceof HTMLElement;
    const leaveDelay = isMobile && isClickTrigger ? 0.16 : 0;

    wrapperPropo.setAttribute("data-cover", "active");

    gsap.set(wrapperPropo, { y: "100vh" });

    const tl = gsap.timeline({
      paused: true,
      onStart: () => {
        if (data.current?.namespace === "home") {
          freezeCurrentPageScrollFx(current);
        }
        headerAnimation?.disableBackHomeLink?.();
        headerAnimation?.disableBurgerClick?.();
        window.menuNavigation?.closeUserAccount?.();
      },
      onComplete: () => {
        done?.();
      },
    });

    tl.to(
      currentPage,
      {
        y: "-100vh",
        duration: 1,
        ease: "power3.inOut",
      },
      0
    )
      .to(
        footer,
        {
          y: "-100vh",
          duration: 1,
          ease: "power3.inOut",
        },
        0
      )
      .to(
        wrapperPropo,
        {
          y: 0,
          duration: 1,
          ease: "power3.inOut",
        },
        0
      )
      .to(
        propoLetters,
        {
          y: 0,
          duration: 0.45,
          ease: "power2.out",
          stagger: { each: 0.05, from: "end" },
        },
        0.5
      )
      .to(
        propo,
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          ease: "power1.inOut",
        },
        "<"
      )
      .to(
        propoLettersTransMain,
        {
          rotateX: 90,
          opacity: 0,
          duration: 0.5,
          ease: "power1.inOut",
          stagger: { each: 0.1 },
          transformOrigin: "top center",
        },
        1.2
      )
      .to(
        propoLettersTrans,
        {
          rotateX: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power1.inOut",
          stagger: { each: 0.1 },
          transformOrigin: "bottom center",
        },
        1.4
      );
    if (leaveDelay > 0) {
      gsap.delayedCall(leaveDelay, () => tl.play(0));
    } else {
      tl.play(0);
    }
  }

  function runPropoEnterTransition(data) {
    const { wrapperPropo, propo, propoLetters, next } =
      getButtonTransitionContext(data, {
        includeNext: true,
      });
    const nextPage = next?.querySelector?.(".page-container");

    if (!wrapperPropo || !next || !nextPage) {
      console.warn("button-transition enter: elementi mancanti", {
        wrapperPropo,
        next,
        nextPage,
      });
      return;
    }

    const logoLetters = gsap.utils.toArray(".logo-svg.cta");
    const logoDot = document.querySelector(".logo-svg.dot");

    const tl = gsap.timeline({
      onStart: () => {
        gsap.set(logoLetters, { y: 0 });
        if (logoDot) {
          gsap.set(logoDot, { "--r-scale": "32.392" });
        }
        if (header?.burgerBlock) {
          gsap.to(header.burgerBlock, { scale: 1, duration: 0.3 });
        }
      },
      onComplete: () => {
        resetPropoTransitionElements();
        lenisInstance.update?.();
        lenisInstance.start?.();
        headerAnimation?.enableBackHomeLink?.();
        headerAnimation?.enableBurgerClick?.();
        window.menuNavigation?.resetFooterLinks?.();
      },
    });

    tl.to(propoLetters, {
      y: "-120%",
      duration: 0.25,
      ease: "power2.in",
      stagger: { each: 0.065, from: "end" },
    })
      .to(
        propo,
        {
          scale: 0.5,
          opacity: 0,
          duration: 0.5,
          ease: "power1.inOut",
        },
        "<"
      )
      .to(
        wrapperPropo,
        {
          "--trans-clip-bottom": "100%",
          duration: 1,
          ease: "power3.inOut",
        },
        0.35
      )
      .to(
        nextPage,
        {
          y: 0,
          duration: 1,
          ease: "power3.inOut",
        },
        0.35
      );
  }

  // --------------------------------------------------
  // MENU ENTER (normale / verso home)
  // --------------------------------------------------
  function runMenuEnterTransition(data) {
    const { next } = getButtonTransitionContext(data, { includeNext: true });
    if (!next) {
      console.warn("menu-transition: next container mancante");
      return;
    }

    const nextPage = next.querySelector(".page-container");
    const isMobile = !window.bp?.is?.("lgUp");
    const isClickTrigger = data?.trigger instanceof HTMLElement;
    const enterDelay = isMobile && isClickTrigger ? 0.16 : 0;

    const tl = gsap.timeline({
      paused: true,
      onStart: () => {
        window.headerAnimation?.closeMenuRouting?.();
      },
      onComplete: () => {
        lenisInstance.update?.();
        window.menuNavigation?.resetNavLinks?.();
      },
    });

    tl.to(nextPage, {
      y: 0,
      duration: 1,
      ease: "power3.inOut",
    });

    if (enterDelay > 0) {
      gsap.delayedCall(enterDelay, () => tl.play(0));
    } else {
      tl.play(0);
    }
  }

  function runMenuEnterTransitionHome(data) {
    const { next } = getButtonTransitionContext(data, { includeNext: true });
    if (!next) {
      console.warn("menu-transition home: next container mancante");
      return;
    }

    const isDesktop = !!window.bp?.is?.("lgUp");
    const logoLetters = gsap.utils.toArray(".logo-svg.cta");
    const logoDot = document.querySelector(".logo-svg.dot");
    const hero = document.getElementById("display-hero");

    if (!hero) {
      console.warn("menu-transition home: hero mancante");
      return;
    }

    gsap.set(hero, { y: "100vh" });

    const tl = gsap.timeline({
      onStart: () => {
        window.headerAnimation?.closeMenuRoutingHome?.();
      },
      onComplete: () => {
        window.menuNavigation?.resetNavLinks?.();

        if (isDesktop) {
          gsap.set(logoLetters, { y: 100 });
          if (logoDot) gsap.set(logoDot, { "--r-scale": "0" });
          if (header?.logoHome) {
            gsap.set(header.logoHome, { "--brand-clip-b": "0%" });
          }
        }

        lenisInstance.update?.();
        OnLoadHeroDefault?.();
      },
    });

    tl.to(hero, {
      y: 0,
      duration: 1,
      ease: "power3.inOut",
    });
  }
  // Button/MENU Specifiche CONTATTI
  //CONTATTI
  function runButtonEnterTransitionContact(data) {
    const { wrapper, letters, next } = getButtonTransitionContext(data, {
      includeNext: true,
    });
    const nextPage = next?.querySelector?.(".page-container");

    if (!wrapper || !next || !nextPage) {
      console.warn("button-transition contact enter: elementi mancanti", {
        wrapper,
        next,
        nextPage,
      });
      return;
    }

    const logoLetters = gsap.utils.toArray(".logo-svg.cta");
    const logoDot = document.querySelector(".logo-svg.dot");

    // === Elementi specifici pagina contatti =========================
    const h1 = nextPage.querySelector(".h1-page");
    const headerImg = nextPage.querySelector(".header_img_page");
    const line = nextPage.querySelector(".line-title-section");
    const subDivider = nextPage.querySelector(".h_sub_divider");
    const btn = nextPage?.querySelectorAll(".btn-simple");

    const tl = gsap.timeline({
      onStart: () => {
        gsap.set(logoLetters, { y: 0 });

        if (logoDot) {
          gsap.set(logoDot, { "--r-scale": "32.392" });
        }

        if (header?.burgerBlock) {
          gsap.to(header.burgerBlock, { scale: 1, duration: 0.3 });
        }
      },
      onComplete: () => {
        resetButtonTransitionElements();
        lenisInstance.update?.();
        lenisInstance.start?.();
        headerAnimation?.enableBackHomeLink?.();
        headerAnimation?.enableBurgerClick?.();
        window.menuNavigation?.resetFooterLinks?.();
      },
    });

    tl.to(letters, {
      yPercent: -110,
      duration: 0.4,
      ease: "power2.in",
      stagger: { each: 0.2, from: "end" },
    })
      .to(
        wrapper,
        {
          "--trans-clip-bottom": "100%",
          duration: 1,
          ease: "power3.inOut",
        },
        0.35
      )
      .to(
        nextPage,
        {
          y: 0,
          duration: 1,
          ease: "power3.inOut",
        },
        0.35
      );

    if (h1) {
      tl.to(
        h1,
        {
          y: 0,
          duration: 0.6,
          ease: "power2.out",
        },
        1
      );
    }

    if (headerImg) {
      tl.to(
        headerImg,
        {
          scale: 1,
          duration: 0.6,
          ease: "power1.out",
        },
        1.1
      );
    }
    if (line) {
      tl.to(
        line,
        {
          scaleX: 1,
          duration: 0.8,
          ease: "power2.inOut",
        },
        1.08
      );
    }

    if (subDivider) {
      tl.to(
        subDivider,
        {
          y: 0,
          duration: 0.5,
          ease: "power1.out",
        },
        1.14
      );
    }
    if (btn) {
      tl.to(
        btn,
        {
          scale: 1,
          duration: 0.5,
          ease: "power2.out",
          stagger: 0.1,
        },
        1.14
      );
    }
  }
  function runMenuEnterTransitionContact(data) {
    const { next } = getButtonTransitionContext(data, { includeNext: true });
    if (!next) {
      console.warn("menu-transition contact: next container mancante");
      return;
    }

    const nextPage = next.querySelector(".page-container");
    const isMobile = !window.bp?.is?.("lgUp");
    const isClickTrigger = data?.trigger instanceof HTMLElement;
    const enterDelay = isMobile && isClickTrigger ? 0.16 : 0;

    const h1 = nextPage?.querySelector(".h1-page");
    const headerImg = nextPage?.querySelector(".header_img_page");
    const line = nextPage?.querySelector(".line-title-section");
    const subDivider = nextPage?.querySelector(".h_sub_divider");
    const btn = nextPage?.querySelectorAll(".btn-simple");

    const tl = gsap.timeline({
      paused: true,
      onStart: () => {
        window.headerAnimation?.closeMenuRouting?.();
      },
      onComplete: () => {
        lenisInstance.update?.();
        window.menuNavigation?.resetNavLinks?.();
      },
    });

    tl.to(
      nextPage,
      {
        y: 0,
        duration: 1,
        ease: "power3.inOut",
      },
      0
    );

    if (h1) {
      tl.to(
        h1,
        {
          y: 0,
          duration: 0.6,
          ease: "power2.out",
        },
        0.6
      );
    }

    if (headerImg) {
      tl.to(
        headerImg,
        {
          scale: 1,
          duration: 0.6,
          ease: "power1.out",
        },
        0.6
      );
    }

    if (line) {
      tl.to(
        line,
        {
          scaleX: 1,
          duration: 0.8,
          ease: "power2.inOut",
        },
        0.72
      );
    }

    if (subDivider) {
      tl.to(
        subDivider,
        {
          y: 0,
          duration: 0.5,
          ease: "power1.out",
        },
        0.8
      );
    }

    if (btn?.length) {
      tl.to(
        btn,
        {
          scale: 1,
          duration: 0.5,
          ease: "power2.out",
          stagger: 0.1,
        },
        0.8
      );
    }

    if (enterDelay > 0) {
      gsap.delayedCall(enterDelay, () => tl.play(0));
    } else {
      tl.play(0);
    }
  }
  // Button/MENU Specifiche PROGETTI

  function runButtonEnterTransitionProgetti(data) {
    const { wrapper, letters, next } = getButtonTransitionContext(data, {
      includeNext: true,
    });
    const nextPage = next?.querySelector?.(".page-container");

    if (!wrapper || !next || !nextPage) {
      console.warn("button-transition contact enter: elementi mancanti", {
        wrapper,
        next,
        nextPage,
      });
      return;
    }

    const logoLetters = gsap.utils.toArray(".logo-svg.cta");
    const logoDot = document.querySelector(".logo-svg.dot");

    // === Elementi specifici pagina contatti =========================
    const h1 = nextPage.querySelector(".h1-page");
    const headerImg = nextPage.querySelector(".header_img_page");

    const tl = gsap.timeline({
      onStart: () => {
        gsap.set(logoLetters, { y: 0 });

        if (logoDot) {
          gsap.set(logoDot, { "--r-scale": "32.392" });
        }

        if (header?.burgerBlock) {
          gsap.to(header.burgerBlock, { scale: 1, duration: 0.3 });
        }
      },
      onComplete: () => {
        resetButtonTransitionElements();
        lenisInstance.update?.();
        lenisInstance.start?.();
        headerAnimation?.enableBackHomeLink?.();
        headerAnimation?.enableBurgerClick?.();
        window.menuNavigation?.resetFooterLinks?.();
      },
    });

    tl.to(letters, {
      yPercent: -110,
      duration: 0.4,
      ease: "power2.in",
      stagger: { each: 0.2, from: "end" },
    })
      .to(
        wrapper,
        {
          "--trans-clip-bottom": "100%",
          duration: 1,
          ease: "power3.inOut",
        },
        0.35
      )
      .to(
        nextPage,
        {
          y: 0,
          duration: 1,
          ease: "power3.inOut",
        },
        0.35
      );

    if (h1) {
      tl.to(
        h1,
        {
          y: 0,
          duration: 0.6,
          ease: "power2.out",
        },
        1
      );
    }

    if (headerImg) {
      tl.to(
        headerImg,
        {
          scale: 1,
          duration: 0.6,
          ease: "power1.out",
        },
        1.1
      );
    }
  }
  function runMenuEnterTransitionProgetti(data) {
    const { next } = getButtonTransitionContext(data, { includeNext: true });
    if (!next) {
      console.warn("menu-transition contact: next container mancante");
      return;
    }

    const nextPage = next.querySelector(".page-container");
    const isMobile = !window.bp?.is?.("lgUp");
    const isClickTrigger = data?.trigger instanceof HTMLElement;
    const enterDelay = isMobile && isClickTrigger ? 0.16 : 0;

    const h1 = nextPage?.querySelector(".h1-page");
    const headerImg = nextPage?.querySelector(".header_img_page");

    const tl = gsap.timeline({
      paused: true,
      onStart: () => {
        window.headerAnimation?.closeMenuRouting?.();
      },
      onComplete: () => {
        lenisInstance.update?.();
        window.menuNavigation?.resetNavLinks?.();
      },
    });

    tl.to(
      nextPage,
      {
        y: 0,
        duration: 1,
        ease: "power3.inOut",
      },
      0
    );

    if (h1) {
      tl.to(
        h1,
        {
          y: 0,
          duration: 0.6,
          ease: "power2.out",
        },
        0.6
      );
    }

    if (headerImg) {
      tl.to(
        headerImg,
        {
          scale: 1,
          duration: 0.6,
          ease: "power1.out",
        },
        0.6
      );
    }

    if (enterDelay > 0) {
      gsap.delayedCall(enterDelay, () => tl.play(0));
    } else {
      tl.play(0);
    }
  }
  // Button/MENU Competenze - Web Site - Design - Art projectsArtDirector
  function runButtonEnterTransitionExpertise(data) {
    const { wrapper, letters, next } = getButtonTransitionContext(data, {
      includeNext: true,
    });
    const nextPage = next?.querySelector?.(".page-container");

    if (!wrapper || !next || !nextPage) {
      console.warn("button-transition big page enter: elementi mancanti", {
        wrapper,
        next,
        nextPage,
      });
      return;
    }

    const logoLetters = gsap.utils.toArray(".logo-svg.cta");
    const logoDot = document.querySelector(".logo-svg.dot");

    const hero = nextPage.querySelector(".hero_big_page");
    if (!hero) {
      console.warn("button-transition big page enter: .hero_big_page mancante");
      runButtonEnterTransition(data);
      return;
    }

    const h1s = gsap.utils.toArray(".h1-page_big", hero);
    const lines = gsap.utils.toArray(".line-title-section", hero);
    const h2s = gsap.utils.toArray(".h_sub_divider", hero);
    const paragraph = hero.querySelector(".par_txt");
    const circleMain = nextPage.querySelector(".expertise_circle.main");
    const circleSec = nextPage.querySelector(".expertise_circle.sec");

    const SplitText =
      (gsap.plugins && gsap.plugins.SplitText) || window.SplitText;

    let paragraphLines = [];

    if (SplitText && paragraph) {
      if (!paragraph.__splitLinesFx) {
        paragraph.__splitLinesFx = new SplitText(paragraph, {
          type: "lines",
          linesClass: "par-line",
          mask: "lines",
        });
      }

      if (paragraph.__splitLinesFx?.lines?.length) {
        paragraphLines = paragraph.__splitLinesFx.lines;
      }
    }

    if (paragraphLines.length) {
      gsap.set(paragraphLines, {
        yPercent: 100,
      });
    }

    const tl = gsap.timeline({
      onStart: () => {
        gsap.set(logoLetters, { y: 0 });

        if (logoDot) {
          gsap.set(logoDot, { "--r-scale": "32.392" });
        }

        if (header?.burgerBlock) {
          gsap.to(header.burgerBlock, { scale: 1, duration: 0.3 });
        }
      },
      onComplete: () => {
        resetButtonTransitionElements();
        lenisInstance.update?.();
        lenisInstance.start?.();
        headerAnimation?.enableBackHomeLink?.();
        headerAnimation?.enableBurgerClick?.();
        window.menuNavigation?.resetFooterLinks?.();
      },
    });

    tl.to(letters, {
      yPercent: -110,
      duration: 0.4,
      ease: "power2.in",
      stagger: { each: 0.2, from: "end" },
    })
      .to(
        wrapper,
        {
          "--trans-clip-bottom": "100%",
          duration: 1,
          ease: "power3.inOut",
        },
        0.35
      )
      .to(
        nextPage,
        {
          y: 0,
          duration: 1,
          ease: "power3.inOut",
        },
        0.35
      );

    if (lines.length) {
      tl.to(
        lines,
        {
          scaleX: 1,
          duration: 0.8,
          ease: "power2.inOut",
          stagger: 0.08,
        },
        0.8
      );
    }

    if (h1s.length) {
      tl.to(
        h1s,
        {
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.08,
        },
        1
      );
    }

    if (h2s.length) {
      tl.to(
        h2s,
        {
          y: 0,
          duration: 0.5,
          ease: "power2.out",
          stagger: 0.06,
        },
        "-=0.4"
      );
    }

    if (paragraphLines.length) {
      tl.to(
        paragraphLines,
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.55,
          ease: "power1.out",
          stagger: 0.04,
        },
        "<"
      );
    }

    if (circleMain) {
      tl.to(
        circleMain,
        {
          x: "15%",
          y: "-15%",
          duration: 0.8,
          ease: "power1.out",
        },
        0.9
      );
    }

    if (circleSec) {
      tl.to(
        circleSec,
        {
          x: "-10%",
          y: "20%",
          duration: 0.8,
          ease: "power1.out",
        },
        1.1
      );
    }
  }
  function runMenuEnterTransitionExpertise(data) {
    const { next } = getButtonTransitionContext(data, { includeNext: true });
    if (!next) {
      console.warn("menu-transition big page: next container mancante");
      return;
    }

    const nextPage = next.querySelector(".page-container");
    const hero = nextPage?.querySelector(".hero_big_page");

    if (!nextPage || !hero) {
      console.warn("menu-transition big page: elementi mancanti", {
        nextPage,
        hero,
      });
      runMenuEnterTransition(data);
      return;
    }

    const isMobile = !window.bp?.is?.("lgUp");
    const isClickTrigger = data?.trigger instanceof HTMLElement;
    const enterDelay = isMobile && isClickTrigger ? 0.16 : 0;

    const h1s = gsap.utils.toArray(".h1-page_big", hero);
    const lines = gsap.utils.toArray(".line-title-section", hero);
    const h2s = gsap.utils.toArray(".h_sub_divider", hero);
    const paragraph = hero.querySelector(".par_txt");
    const circleMain = nextPage.querySelector(".expertise_circle.main");
    const circleSec = nextPage.querySelector(".expertise_circle.sec");

    const SplitText =
      (gsap.plugins && gsap.plugins.SplitText) || window.SplitText;

    let paragraphLines = [];

    if (SplitText && paragraph) {
      if (!paragraph.__splitLinesFx) {
        paragraph.__splitLinesFx = new SplitText(paragraph, {
          type: "lines",
          linesClass: "par-line",
          mask: "lines",
        });
      }

      if (paragraph.__splitLinesFx?.lines?.length) {
        paragraphLines = paragraph.__splitLinesFx.lines;
      }
    }

    if (paragraphLines.length) {
      gsap.set(paragraphLines, {
        yPercent: 100,
      });
    }

    const tl = gsap.timeline({
      paused: true,
      onStart: () => {
        window.headerAnimation?.closeMenuRouting?.();
      },
      onComplete: () => {
        lenisInstance.update?.();
        window.menuNavigation?.resetNavLinks?.();
      },
    });

    tl.to(
      nextPage,
      {
        y: 0,
        duration: 1,
        ease: "power3.inOut",
      },
      0
    );

    if (lines.length) {
      tl.to(
        lines,
        {
          scaleX: 1,
          duration: 0.8,
          ease: "power2.inOut",
          stagger: 0.08,
        },
        0.58
      );
    }

    if (h1s.length) {
      tl.to(
        h1s,
        {
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.08,
        },
        0.72
      );
    }

    if (h2s.length) {
      tl.to(
        h2s,
        {
          y: 0,
          duration: 0.5,
          ease: "power2.out",
          stagger: 0.06,
        },
        0.82
      );
    }

    if (paragraphLines.length) {
      tl.to(
        paragraphLines,
        {
          yPercent: 0,
          duration: 0.55,
          ease: "power1.out",
          stagger: 0.04,
        },
        0.82
      );
    }

    if (circleMain) {
      tl.to(
        circleMain,
        {
          x: "15%",
          y: "-15%",
          duration: 0.8,
          ease: "power1.out",
        },
        0.72
      );
    }

    if (circleSec) {
      tl.to(
        circleSec,
        {
          x: "-10%",
          y: "20%",
          duration: 0.8,
          ease: "power1.out",
        },
        0.9
      );
    }

    if (enterDelay > 0) {
      gsap.delayedCall(enterDelay, () => tl.play(0));
    } else {
      tl.play(0);
    }
  }
  // Button/MMENU Sotto pagine competenzee
  function runButtonEnterTransitionExpertiseSub(data) {
    const { wrapper, letters, next } = getButtonTransitionContext(data, {
      includeNext: true,
    });
    const nextPage = next?.querySelector?.(".page-container");

    if (!wrapper || !next || !nextPage) {
      console.warn("button-transition expertise sub enter: elementi mancanti", {
        wrapper,
        next,
        nextPage,
      });
      return;
    }

    const logoLetters = gsap.utils.toArray(".logo-svg.cta");
    const logoDot = document.querySelector(".logo-svg.dot");

    const h1 = nextPage.querySelector(".h1-page");
    const headerImg = nextPage.querySelector(".header_img_page");
    const paragraph = nextPage.querySelector(".par_txt");

    const SplitText =
      (gsap.plugins && gsap.plugins.SplitText) || window.SplitText;

    let paragraphLines = [];

    if (SplitText && paragraph) {
      if (!paragraph.__splitLinesFx) {
        paragraph.__splitLinesFx = new SplitText(paragraph, {
          type: "lines",
          linesClass: "par-line",
          mask: "lines",
        });
      }

      if (paragraph.__splitLinesFx?.lines?.length) {
        paragraphLines = paragraph.__splitLinesFx.lines;
      }
    }

    if (paragraphLines.length) {
      gsap.set(paragraphLines, {
        yPercent: 100,
      });
    }

    const tl = gsap.timeline({
      onStart: () => {
        gsap.set(logoLetters, { y: 0 });

        if (logoDot) {
          gsap.set(logoDot, { "--r-scale": "32.392" });
        }

        if (header?.burgerBlock) {
          gsap.to(header.burgerBlock, { scale: 1, duration: 0.3 });
        }
      },
      onComplete: () => {
        resetButtonTransitionElements();
        lenisInstance.update?.();
        lenisInstance.start?.();
        headerAnimation?.enableBackHomeLink?.();
        headerAnimation?.enableBurgerClick?.();
        window.menuNavigation?.resetFooterLinks?.();
      },
    });

    tl.to(letters, {
      yPercent: -110,
      duration: 0.4,
      ease: "power2.in",
      stagger: { each: 0.2, from: "end" },
    })
      .to(
        wrapper,
        {
          "--trans-clip-bottom": "100%",
          duration: 1,
          ease: "power3.inOut",
        },
        0.35
      )
      .to(
        nextPage,
        {
          y: 0,
          duration: 1,
          ease: "power3.inOut",
        },
        0.35
      );

    if (h1) {
      tl.to(
        h1,
        {
          y: 0,
          duration: 0.6,
          ease: "power2.out",
        },
        1
      );
    }

    if (headerImg) {
      tl.to(
        headerImg,
        {
          scale: 1,
          duration: 0.6,
          ease: "power1.out",
        },
        1.1
      );
    }

    if (paragraphLines.length) {
      tl.to(
        paragraphLines,
        {
          yPercent: 0,
          duration: 0.6,
          ease: "power1.out",
          stagger: 0.04,
        },
        1.2
      );
    }
  }
  /** Funzione globale selezione BUTTON ENTER */
  function runButtonEnterTransitionByNamespace(data) {
    const ns = data.next?.namespace || "";

    switch (ns) {
      case "contatti":
        runButtonEnterTransitionContact(data);
        return;
      case "progetti":
        runButtonEnterTransitionProgetti(data);
        return;
      case "expertise":
        runButtonEnterTransitionExpertise(data);
        return;
      case "expertise-sub":
        runButtonEnterTransitionExpertiseSub(data);
        return;

      default:
        runButtonEnterTransition(data);
        return;
    }
  }

  /** Funzione globale selezione MENU ENTER */
  function runMenuEnterTransitionByNamespace(data) {
    const ns = data.next?.namespace || "";

    switch (ns) {
      case "contatti":
        runMenuEnterTransitionContact(data);
        return;
      case "progetti":
        runMenuEnterTransitionProgetti(data);
        return;
      case "expertise":
        runMenuEnterTransitionExpertise(data);
        return;

      default:
        runMenuEnterTransition(data);
        return;
    }
  }
  /** Funzione globale selezione POPSTATE ENTER */
  function runPopstateEnterTransitionByNamespace(data) {
    const ns = data.next?.namespace || "";

    switch (ns) {
      case "contatti":
        runButtonEnterTransitionContact(data);
        return;
      case "progetti":
        runButtonEnterTransitionProgetti(data);
        return;
      case "expertise":
        runButtonEnterTransitionExpertise(data);
        return;
      case "expertise-sub":
        runButtonEnterTransitionExpertiseSub(data);
        return;

      default:
        runButtonEnterTransition(data);
        return;
    }
  }

  barba.init({
    debug: true,
    timeout: 5000,
    transitions: [
      {
        name: "button-to-home",
        from: {
          custom: ({ trigger }) =>
            trigger instanceof HTMLElement &&
            trigger.getAttribute("data-custom") === "button" &&
            isHomeHref(trigger.getAttribute("href")),
        },
        beforeLeave() {
          window.isBarbaTransition = true;
          lenisInstance.stop();
        },

        leave(data) {
          const done = this.async();
          runButtonLeaveTransitionHome(data, done);
        },

        afterLeave(data) {
          killHomeHeroTriggers(data);
        },

        enter(data) {
          const done = this.async();
          done?.();
          lenisInstance.forceScrollToTop();
          runButtonEnterTransitionHome(data);
        },

        after(data) {
          commonAfter(data);
        },
      },
      {
        name: "button-transition",
        from: {
          custom: ({ trigger }) =>
            trigger instanceof HTMLElement &&
            trigger.getAttribute("data-custom") === "button" &&
            !isHomeHref(trigger.getAttribute("href")),
        },
        beforeLeave() {
          window.isBarbaTransition = true;
          lenisInstance.stop();
        },

        leave(data) {
          const done = this.async();
          runButtonLeaveTransition(data, done);
        },

        afterLeave(data) {
          killHomeHeroTriggers(data);
        },

        enter(data) {
          const done = this.async();
          if (typeof unblockScroll === "function") {
            unblockScroll();
          }
          done?.(); // libera Barba
          lenisInstance.forceScrollToTop();
          runButtonEnterTransitionByNamespace(data);
        },

        after(data) {
          commonAfter(data);
        },
      },
      {
        name: "menu-transition",
        from: {
          custom: ({ trigger }) =>
            trigger instanceof HTMLElement &&
            trigger.getAttribute("data-custom") === "menu",
        },
        beforeLeave() {
          window.isBarbaTransition = true;
        },
        leave() {
          const done = this.async();
          done();
        },
        afterLeave(data) {
          killHomeHeroTriggers(data);
        },
        enter(data) {
          const done = this.async();
          const route = getRouteContext(data);
          if (typeof unblockScroll === "function") {
            unblockScroll();
          }

          if (route.isHomeToOther) {
            header.burgerBlock?.setAttribute("data-burger", "page");
            header.logoMenu?.setAttribute("data-logo", "page");
          } else if (route.isOtherToHome) {
            header.burgerBlock?.setAttribute("data-burger", "home");
            header.logoMenu?.setAttribute("data-logo", "home");
          }
          done();
          lenisInstance.forceScrollToTop();
          if (route.isOtherToHome) {
            runMenuEnterTransitionHome(data);
          } else {
            runMenuEnterTransitionByNamespace(data);
          }
        },
        after(data) {
          commonAfter(data);
        },
      },
      {
        name: "project",
        from: {
          custom: ({ trigger }) =>
            trigger instanceof HTMLElement &&
            trigger.getAttribute("data-custom") === "project" &&
            !isHomeHref(trigger.getAttribute("href")),
        },
        beforeLeave() {
          window.isBarbaTransition = true;
          lenisInstance.stop();
        },
        leave(data) {
          const done = this.async();
          runButtonLeaveTransition(data, done);
        },
        afterLeave(data) {
          killHomeHeroTriggers(data);
        },
        enter(data) {
          const done = this.async();
          if (typeof unblockScroll === "function") {
            unblockScroll();
          }
          done();
          lenisInstance.forceScrollToTop?.();
          runButtonEnterTransitionProject(data);
        },
        after(data) {
          commonAfter(data);
        },
      },
      {
        name: "proposito-transition",
        from: {
          custom: ({ trigger }) =>
            trigger instanceof HTMLElement &&
            trigger.getAttribute("data-custom") === "propo",
        },

        beforeLeave() {
          window.isBarbaTransition = true;
          lenisInstance.stop?.();
        },

        leave(data) {
          const done = this.async();
          runPropoLeaveTransition(data, done);
        },

        afterLeave(data) {
          killHomeHeroTriggers(data);
        },

        enter(data) {
          const done = this.async();

          if (typeof unblockScroll === "function") {
            unblockScroll();
          }

          done();
          lenisInstance.forceScrollToTop?.();
          runPropoEnterTransition(data);
        },

        after(data) {
          commonAfter(data);
        },
      },
      {
        name: "popstate-to-home",
        to: {
          namespace: ["home"],
          custom: ({ trigger }) => isHistoryTrigger(trigger),
        },

        beforeLeave() {
          window.isBarbaTransition = true;
          lenisInstance.stop?.();
        },

        leave(data) {
          const done = this.async();
          runButtonLeaveTransitionHome(data, done);
        },

        afterLeave(data) {
          killHomeHeroTriggers(data);
        },

        enter(data) {
          const done = this.async();
          done?.();
          lenisInstance.forceScrollToTop?.();
          runButtonEnterTransitionHome(data);
        },

        after(data) {
          commonAfter(data);
        },
      },
      {
        name: "popstate-to-project",
        to: {
          namespace: ["project"],
          custom: ({ trigger }) => isHistoryTrigger(trigger),
        },

        beforeLeave() {
          window.isBarbaTransition = true;
          lenisInstance.stop?.();
        },

        leave(data) {
          const done = this.async();
          runButtonLeaveTransition(data, done);
        },

        afterLeave(data) {
          killHomeHeroTriggers(data);
        },

        enter(data) {
          const done = this.async();

          if (typeof unblockScroll === "function") {
            unblockScroll();
          }

          done();
          lenisInstance.forceScrollToTop?.();
          runButtonEnterTransitionProject(data);
        },

        after(data) {
          commonAfter(data);
        },
      },
      {
        name: "popstate-to-proposito",
        to: {
          namespace: ["proposito", "blog"],
          custom: ({ trigger }) => isHistoryTrigger(trigger),
        },

        beforeLeave() {
          window.isBarbaTransition = true;
          lenisInstance.stop?.();
        },

        leave(data) {
          const done = this.async();
          runPropoLeaveTransition(data, done);
        },

        afterLeave(data) {
          killHomeHeroTriggers(data);
        },

        enter(data) {
          const done = this.async();

          if (typeof unblockScroll === "function") {
            unblockScroll();
          }

          done();
          lenisInstance.forceScrollToTop?.();
          runPropoEnterTransition(data);
        },

        after(data) {
          commonAfter(data);
        },
      },
      {
        name: "popstate-transition",
        to: {
          custom: ({ trigger, next }) =>
            isHistoryTrigger(trigger) &&
            next?.namespace !== "home" &&
            next?.namespace !== "project" &&
            next?.namespace !== "proposito" &&
            next?.namespace !== "blog",
        },

        beforeLeave() {
          window.isBarbaTransition = true;
          lenisInstance.stop?.();
        },

        leave(data) {
          const done = this.async();
          runButtonLeaveTransition(data, done);
        },

        afterLeave(data) {
          killHomeHeroTriggers(data);
        },

        enter(data) {
          const done = this.async();

          if (typeof unblockScroll === "function") {
            unblockScroll();
          }

          done?.();
          lenisInstance.forceScrollToTop?.();
          runPopstateEnterTransitionByNamespace(data);
        },

        after(data) {
          commonAfter(data);
        },
      },
    ],
    prevent: ({ el, href }) => {
      // 1) no href
      if (!href) return true;

      // 2) mailto / tel / sms / whatsapp ecc.
      if (/^(mailto:|tel:|sms:|whatsapp:)/i.test(href)) return true;

      // 3) anchor link (#) sulla stessa pagina
      if (href.startsWith("#")) return true;

      // 4) target blank o download
      if (el?.target === "_blank") return true;
      if (el?.hasAttribute?.("download")) return true;

      // 5) esterni (social, altre domain)
      // (Barba deve gestire solo same-origin)
      const url = new URL(href, window.location.href);
      if (url.origin !== window.location.origin) return true;

      // 6) tue esclusioni
      const excludePatterns = ["/web-studio/"];
      if (excludePatterns.some((p) => url.pathname.includes(p))) return true;

      // 7) data
      if (el?.hasAttribute?.("data-barba-prevent")) return true;

      return false; // lascia passare Barba
    },
    hooks: {
      after() {
        window.isBarbaTransition = false;
      },
    },
    preventRunning: true,
    scroll: {
      reset: false,
    },
    prefetch: true,
  });
}
//BARBA fine

/** Funzioni di caricamento iniziale */

/** Nuova animazione ingresso home */
function OnLoadHeroDefault() {
  if (!window.gsap) return;

  const { gsap } = window;
  const SplitText =
    (gsap.plugins && gsap.plugins.SplitText) || window.SplitText;

  const isDesktop = !!window.bp?.is?.("lgUp"); // >= 992

  const page = document.querySelector(".page-wrapper");

  const els = {
    svgLightLetters: gsap.utils.toArray(".svg-light .letter-svg", page),
    svgDarkLetters: gsap.utils.toArray(".svg-dark .letter-svg", page),
    heroTrans: page?.querySelector(".hero-trans"),
    displayCover: page?.querySelector(".display-cover"),
    uspText: page?.querySelector(".usp-txt"),

    gruppoPrimo: gsap.utils.toArray([
      "#panelPrimo .bg-panel",
      "#imgPrimo .show-img",
    ]),
    gruppoSecondo: gsap.utils.toArray([
      "#panelSecondo .bg-panel",
      "#panelSecondo .show-img",
    ]),
    gruppoTerzo: gsap.utils.toArray([
      "#panelTerzo .bg-panel",
      "#panelTerzo .show-img",
    ]),

    burgerBlock: header.burgerBlock,
  };

  // SplitText USP (una volta)
  let uspSplit = null;
  if (SplitText && els.uspText) {
    gsap.set(els.uspText, { y: 0 });

    uspSplit = new SplitText(els.uspText, {
      type: "lines",
      linesClass: "usp-line",
    });

    gsap.set(uspSplit.lines, { y: -200 });
  }

  // ==================================================================
  // Factory: crea masterTimeline + tlTitle/tlPlus/tlPanel in base al mode
  // ==================================================================
  const buildHeroTimelines = ({ mode }) => {
    const tlTitle = gsap.timeline();
    const tlPlus = gsap.timeline();
    const tlPanel = gsap.timeline();

    const master = gsap.timeline({
      paused: true,
      onStart: () => {
        blockScroll?.();
      },
      onComplete: () => {
        unblockScroll?.();
        lenisInstance?.update?.();
      },
    });

    master.add(tlTitle, 0).add(tlPlus, 0.7).add(tlPanel, 0.6);

    // ===== TL TITLE (COMUNE + differenze minime) ======================
    tlTitle
      .to(
        els.svgLightLetters,
        {
          // desktop: solo rotationY, mobile: y + rotationY
          ...(mode === "mobile" ? { y: 0 } : null),
          rotationY: 90,
          duration: 0.6,
          ease: "power2.in",
          stagger: 0.1,
        },
        0
      )
      .to(
        els.svgLightLetters,
        {
          opacity: 0,
          duration: 0.2,
          ease: "power2.in",
          stagger: 0.09,
        },
        0.4
      );

    // hero-trans SOLO desktop (stesso timing 0.35)
    if (mode === "desktop") {
      tlTitle.to(
        els.heroTrans,
        {
          x: "0vw",
          duration: 0.3,
          ease: "power2.inOut",
        },
        0.35
      );
    }

    // svg-dark comune
    tlTitle
      .to(
        els.svgDarkLetters,
        {
          opacity: 1,
          duration: 0.2,
          ease: "power2.out",
          stagger: 0.08,
        },
        0.6
      )
      .to(
        els.svgDarkLetters,
        {
          rotationY: 0,
          duration: 0.4,
          ease: "power2.out",
          stagger: 0.08,
        },
        0.6
      );

    // cover: desktop scaleX (origin center left), mobile scaleY (origin top center)
    if (mode === "desktop") {
      tlTitle.to(
        els.displayCover,
        {
          scaleX: 0,
          duration: 1.2,
          ease: "power3.inOut",
          transformOrigin: "center left",
        },
        0
      );
    } else {
      tlTitle
        .to(
          els.displayCover,
          {
            scaleY: 0,
            duration: 1.2,
            ease: "power3.inOut",
            transformOrigin: "top center",
          },
          0
        )
        .to(
          header.logoHome,
          {
            "--brand-clip-t": "0%",
            duration: 0.28,
            ease: "power2.inOut",
          },
          0.75
        );
    }

    // USP comune (stesso timing)
    if (uspSplit) {
      tlTitle.to(
        uspSplit.lines,
        {
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          stagger: { amount: 0.06, from: "end" },
          clearProps: "transform",
        },
        0.6
      );
    }

    // ===== TL PANEL (differenze: X vs Y) ==============================
    if (mode === "desktop") {
      tlPanel
        .to(els.gruppoPrimo, {
          scaleX: 1,
          x: 0,
          duration: 0.6,
          stagger: { amount: 0.25 },
          ease: "power2.out",
          modifiers: { x: snapPx },
        })
        .to(
          els.gruppoSecondo,
          {
            scaleX: 1,
            x: 0,
            duration: 0.6,
            stagger: { amount: 0.25 },
            ease: "power2.out",
            modifiers: { x: snapPx },
          },
          "<+0.1"
        )
        .to(
          els.gruppoTerzo,
          {
            scaleX: 1,
            x: 0,
            duration: 0.6,
            stagger: { amount: 0.25 },
            ease: "power2.out",
            modifiers: { x: snapPx },
          },
          "<+0.1"
        );
    } else {
      // mobile: SOLO gruppoPrimo (come ora)
      tlPanel.to(els.gruppoPrimo, {
        scaleY: 1,
        y: 0,
        duration: 0.6,
        stagger: { amount: 0.25 },
        ease: "power2.out",
      });
    }

    // ===== TL PLUS (comune + burger solo mobile) ======================
    if (mode === "desktop") {
      tlPlus.to(
        ".nav-hero-link .nav-hero-btn",
        {
          scale: 0.3,
          duration: 0.3,
          ease: "power2.out",
          stagger: { amount: 0.2 },
        },
        0.2
      );
    }

    tlPlus
      .to(
        ".nav-hero-link .nav-hero-item",
        {
          rotateX: 0,
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
          stagger: { amount: 0.2 },
        },
        0
      )
      .to(
        ".l-h",
        {
          scaleX: 1,
          duration: 0.4,
          ease: "power2.out",
        },
        0
      );

    if (mode === "mobile") {
      tlPlus.to(
        els.burgerBlock,
        {
          scale: 1,
          duration: 0.4,
          ease: "power2.inOut",
        },
        0
      );
    }

    return master;
  };

  // ==================================================================
  // Run
  // ==================================================================
  const masterTimeline = buildHeroTimelines({
    mode: isDesktop ? "desktop" : "mobile",
  });

  masterTimeline.play(isDesktop ? undefined : 0);
}

//ALTRE PAGINE

window.pageEnterFx =
  window.pageEnterFx ||
  (() => {
    function getCommon() {
      const wrapper = transitionElementsObj?.transitionWrapper || null;
      const wrapperPropo = transitionElementsObj?.propoWrapper || null;
      const footer = document.getElementById("footer") || null;

      const letters = wrapper
        ? gsap.utils.toArray(".l-svg.letter", wrapper)
        : [];
      const dot = wrapper?.querySelector(".l-svg.dot") || null;

      const propoLetters = wrapperPropo
        ? gsap.utils.toArray(".proposito-trans-title > .pro-span", wrapperPropo)
        : [];
      const propoLettersTrans = wrapperPropo
        ? gsap.utils.toArray(".pro-top-trans", wrapperPropo)
        : [];
      const propoLettersTransMain = wrapperPropo
        ? gsap.utils.toArray(".pro-swap > .font-normal", wrapperPropo)
        : [];
      const propo = wrapperPropo?.querySelector(".proptype-transition") || null;

      return {
        wrapper,
        wrapperPropo,
        footer,
        letters,
        dot,
        propoLetters,
        propoLettersTrans,
        propoLettersTransMain,
        propo,
      };
    }

    function resetGenericCover() {
      const { wrapper, footer, letters, dot } = getCommon();
      if (!wrapper) return;

      gsap.set(wrapper, {
        clearProps: "transform",
        "--trans-clip-bottom": "0%",
      });

      if (footer) {
        gsap.set(footer, { clearProps: "transform" });
      }

      gsap.set(letters, {
        clearProps: "transform",
      });

      if (dot) {
        gsap.set(dot, {
          clearProps: "transform,--r-scale",
          "--r-scale": 0,
        });
      }

      wrapper.setAttribute("data-cover", "");
    }

    function resetPropositoCover() {
      const {
        wrapperPropo,
        footer,
        propoLetters,
        propoLettersTrans,
        propoLettersTransMain,
        propo,
      } = getCommon();

      if (!wrapperPropo) return;

      const propoLettersAll = [
        ...new Set([
          ...propoLetters,
          ...propoLettersTrans,
          ...propoLettersTransMain,
        ]),
      ];

      if (footer) {
        gsap.set(footer, { clearProps: "transform" });
      }

      if (propo) {
        gsap.set(propo, { clearProps: "transform,opacity" });
      }

      gsap.set(wrapperPropo, {
        clearProps: "transform",
        "--trans-clip-bottom": "0%",
      });

      gsap.set(propoLettersAll, {
        clearProps: "transform,opacity,transformOrigin",
      });

      wrapperPropo.setAttribute("data-cover", "");
    }

    function introGenericPage(root = document, { delay = 0.18 } = {}) {
      if (!window.gsap) return null;

      const { gsap } = window;
      const { wrapper, letters } = getCommon();

      const page =
        root instanceof Element
          ? root.querySelector(".page-container") || root
          : document.querySelector(".page-container");

      if (!wrapper || !page) {
        console.warn("introGenericPage: wrapper o page mancanti", {
          wrapper,
          page,
        });
        return null;
      }

      const logoLetters = gsap.utils.toArray(".logo-svg.cta");
      const logoDot = document.querySelector(".logo-svg.dot");

      const tl = gsap.timeline({
        delay,
        onStart: () => {
          gsap.set(logoLetters, { y: 0 });

          if (logoDot) {
            gsap.set(logoDot, { "--r-scale": "32.392" });
          }

          if (header?.burgerBlock) {
            gsap.to(header.burgerBlock, { scale: 1, duration: 0.3 });
          }
        },
        onComplete: () => {
          unblockScroll?.();
          lenisInstance?.update?.();
          resetGenericCover();
        },
      });

      tl.to(letters, {
        yPercent: -110,
        duration: 0.4,
        ease: "power2.in",
        stagger: { each: 0.2, from: "end" },
      })
        .to(
          wrapper,
          {
            "--trans-clip-bottom": "100%",
            duration: 1,
            ease: "power3.inOut",
          },
          0.35
        )
        .to(
          page,
          {
            y: 0,
            duration: 1,
            ease: "power3.inOut",
          },
          0.35
        );

      return tl;
    }
    function introExpertise(root = document) {
      if (!window.gsap) return null;

      const { gsap } = window;

      const page =
        root instanceof Element
          ? root.querySelector(".page-container") || root
          : document.querySelector(".page-container");

      if (!page) {
        console.warn("introExpertise: page mancante", { page });
        return null;
      }

      const hero = page.querySelector(".hero_big_page");
      if (!hero) {
        console.warn("introExpertise: .hero_big_page mancante", { hero });
        return null;
      }

      const h1s = gsap.utils.toArray(".h1-page_big", hero);
      const lines = gsap.utils.toArray(".line-title-section", hero);
      const h2s = gsap.utils.toArray(".h_sub_divider", hero);
      const paragraph = hero.querySelector(".par_txt");
      const circleMain = page.querySelector(".expertise_circle.main");
      const circleSec = page.querySelector(".expertise_circle.sec");

      const SplitText =
        (gsap.plugins && gsap.plugins.SplitText) || window.SplitText;

      let paragraphLines = [];

      if (SplitText && paragraph) {
        if (!paragraph.__splitLinesFx) {
          paragraph.__splitLinesFx = new SplitText(paragraph, {
            type: "lines",
            linesClass: "par-line",
            mask: "lines",
          });
        }

        if (paragraph.__splitLinesFx?.lines?.length) {
          paragraphLines = paragraph.__splitLinesFx.lines;
        }
      }

      if (paragraphLines.length) {
        gsap.set(paragraphLines, {
          yPercent: 100,
        });
      }

      const tl = introGenericPage(root, { delay: 0.18 });
      if (!tl) return null;

      if (lines.length) {
        tl.to(
          lines,
          {
            scaleX: 1,
            duration: 0.8,
            ease: "power2.inOut",
            stagger: 0.08,
          },
          0.8
        );
      }

      if (h1s.length) {
        tl.to(
          h1s,
          {
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            stagger: 0.08,
          },
          1
        );
      }

      if (h2s.length) {
        tl.to(
          h2s,
          {
            y: 0,
            duration: 0.5,
            ease: "power2.out",
            stagger: 0.06,
          },
          "-=0.4"
        );
      }

      if (paragraphLines.length) {
        tl.to(
          paragraphLines,
          {
            yPercent: 0,
            duration: 0.55,
            ease: "power1.out",
            stagger: 0.04,
          },
          "<"
        );
      }

      if (circleMain) {
        tl.to(
          circleMain,
          {
            x: "15%",
            y: "-15%",
            duration: 0.8,
            ease: "power1.out",
          },
          0.9
        );
      }

      if (circleSec) {
        tl.to(
          circleSec,
          {
            x: "-10%",
            y: "20%",
            duration: 0.8,
            ease: "power1.out",
          },
          1.1
        );
      }

      return tl;
    }
    function introExpertiseSub(root = document) {
      if (!window.gsap) return null;

      const { gsap } = window;

      const page =
        root instanceof Element
          ? root.querySelector(".page-container") || root
          : document.querySelector(".page-container");

      if (!page) {
        console.warn("introExpertiseSub: page mancante", { page });
        return null;
      }

      const h1 = page.querySelector(".h1-page");
      const headerImg = page.querySelector(".header_img_page");
      const paragraph = page.querySelector(".par_txt");
      const sec = page.querySelector(".complex_par-wrapper");

      const SplitText =
        (gsap.plugins && gsap.plugins.SplitText) || window.SplitText;

      let paragraphLines = [];

      if (SplitText && paragraph) {
        if (!paragraph.__splitLinesFx) {
          paragraph.__splitLinesFx = new SplitText(paragraph, {
            type: "lines",
            linesClass: "par-line",
            mask: "lines",
          });
        }

        if (paragraph.__splitLinesFx?.lines?.length) {
          paragraphLines = paragraph.__splitLinesFx.lines;
        }
      }

      if (paragraphLines.length) {
        gsap.set(paragraphLines, {
          yPercent: 100,
        });
      }

      const tl = introGenericPage(root, { delay: 0.18 });
      if (!tl) return null;

      if (h1) {
        tl.to(
          h1,
          {
            y: 0,
            duration: 0.6,
            ease: "power2.out",
          },
          1
        );
      }

      if (headerImg) {
        tl.to(
          headerImg,
          {
            scale: 1,
            duration: 0.6,
            ease: "power1.out",
          },
          1.1
        );
      }

      if (paragraphLines.length) {
        tl.to(
          paragraphLines,
          {
            yPercent: 0,
            duration: 0.6,
            ease: "power1.out",
            stagger: 0.04,
          },
          1.2
        );
      }

      if (sec) {
        tl.to(
          sec,
          {
            opacity: 1,
            duration: 0.8,
            ease: "power1.out",
          },
          1.2
        );
      }

      return tl;
    }
    function introContact(root = document) {
      if (!window.gsap) return null;

      const { gsap } = window;

      const page =
        root instanceof Element
          ? root.querySelector(".page-container") || root
          : document.querySelector(".page-container");

      if (!page) {
        console.warn("introContact: page mancante", { page });
        return null;
      }

      const h1 = page.querySelector(".h1-page");
      const headerImg = page.querySelector(".header_img_page");
      const line = page.querySelector(".line-title-section");
      const subDivider = page.querySelector(".h_sub_divider");
      const btn = page.querySelectorAll(".btn-simple");

      const tl = introGenericPage(root, { delay: 0.18 });
      if (!tl) return null;

      if (h1) {
        tl.to(
          h1,
          {
            y: 0,
            duration: 0.6,
            ease: "power2.out",
          },
          1
        );
      }

      if (headerImg) {
        tl.to(
          headerImg,
          {
            scale: 1,
            duration: 0.6,
            ease: "power1.out",
          },
          1.1
        );
      }

      if (line) {
        tl.to(
          line,
          {
            scaleX: 1,
            duration: 0.8,
            ease: "power2.inOut",
          },
          1.08
        );
      }

      if (subDivider) {
        tl.to(
          subDivider,
          {
            y: 0,
            duration: 0.5,
            ease: "power1.out",
          },
          1.14
        );
      }

      if (btn?.length) {
        tl.to(
          btn,
          {
            scale: 1,
            duration: 0.5,
            ease: "power2.out",
            stagger: 0.1,
          },
          1.14
        );
      }

      return tl;
    }
    function introProgetti(root = document) {
      if (!window.gsap) return null;

      const { gsap } = window;

      const page =
        root instanceof Element
          ? root.querySelector(".page-container") || root
          : document.querySelector(".page-container");

      if (!page) {
        console.warn("introContact: page mancante", { page });
        return null;
      }

      const h1 = page.querySelector(".h1-page");
      const headerImg = page.querySelector(".header_img_page");

      const tl = introGenericPage(root, { delay: 0.18 });
      if (!tl) return null;

      if (h1) {
        tl.to(
          h1,
          {
            y: 0,
            duration: 0.6,
            ease: "power2.out",
          },
          1
        );
      }

      if (headerImg) {
        tl.to(
          headerImg,
          {
            scale: 1,
            duration: 0.6,
            ease: "power1.out",
          },
          1.1
        );
      }

      return tl;
    }
    function introProject(root = document) {
      if (!window.gsap) return null;

      const { gsap } = window;

      const page =
        root instanceof Element
          ? root.querySelector(".page-container") || root
          : document.querySelector(".page-container");

      if (!page) {
        console.warn("introProject: page mancante", { page });
        return null;
      }

      const h1 = page.querySelector(".proj-h1");
      const line = page.querySelector(".proj-head-line");
      const h2 = page.querySelector(".h2-projects");
      const details = page.querySelector(".proj-head-bot-specific");

      const heroBtn = page.querySelector(
        '.btn-primary[data-intro="project-hero"]'
      );

      let heroIntroTl = null;

      if (heroBtn && window.gsap) {
        const border = heroBtn.querySelector(".btn-border");
        const label = heroBtn.querySelector(".btn-label");
        const btnDot = heroBtn.querySelector(".btn");
        const arrow =
          heroBtn.querySelector(".btnn-ar") || heroBtn.querySelector(".btn-ar");

        if (border && label) {
          const SplitText =
            (gsap.plugins && gsap.plugins.SplitText) || window.SplitText;

          if (SplitText && !label.querySelector(".btn-char")) {
            new SplitText(label, {
              type: "chars",
              charsClass: "btn-char",
            });
          }

          const chars = label.querySelectorAll(".btn-char");

          if (chars.length) {
            const isMobile = !window.bp?.is?.("lgUp");
            const speedFactor = isMobile ? 0.85 : 1;

            const D_BORDER = 0.35 * speedFactor;
            const D_CHARS = 0.35 * speedFactor;
            const D_DOT_INTRO = 0.4 * speedFactor;

            const OFFSET_CHARS = 0.25 * speedFactor;
            const OFFSET_DOT_IN = 0.3 * speedFactor;

            gsap.set(border, { "--clip-x": "50%" });
            gsap.set(chars, { yPercent: 100, opacity: 0 });
            gsap.set(heroBtn, {
              "--btn-scale": 0,
              "--btn-mix": "0%",
              "--btn-origin-y": "100%",
            });

            if (arrow) {
              gsap.set(arrow, { scale: 0, transformOrigin: "bottom left" });
            }

            heroIntroTl = gsap.timeline();
            heroIntroTl
              .to(border, {
                duration: D_BORDER,
                ease: "power2.out",
                "--clip-x": "0%",
              })
              .to(
                chars,
                {
                  yPercent: 0,
                  opacity: 1,
                  duration: D_CHARS,
                  stagger: { amount: 0.2 },
                  ease: "power2.out",
                },
                OFFSET_CHARS
              );

            if (btnDot) {
              heroIntroTl.to(
                btnDot,
                {
                  scale: 0.3,
                  duration: D_DOT_INTRO,
                  ease: "back.out(1.6)",
                },
                "-=" + OFFSET_DOT_IN
              );
            }
          }
        }
      }

      const tl = introGenericPage(root, { delay: 0.18 });
      if (!tl) return null;

      if (line) {
        tl.to(
          line,
          {
            scaleX: 1,
            duration: 0.8,
            ease: "power2.inOut",
          },
          0.8
        );
      }

      if (h1) {
        tl.to(
          h1,
          {
            y: 0,
            duration: 0.6,
            ease: "power2.out",
          },
          1
        );
      }

      if (h2) {
        tl.to(
          h2,
          {
            y: 0,
            duration: 0.5,
            ease: "power2.out",
          },
          "-=0.4"
        );
      }

      if (details) {
        tl.to(
          details,
          {
            y: 0,
            duration: 0.5,
            ease: "power2.out",
          },
          "<"
        );
      }

      if (heroIntroTl) {
        tl.add(heroIntroTl, ">-0.55");
      }

      return tl;
    }
    function introProposito(root = document) {
      if (!window.gsap) return null;

      const { gsap } = window;
      const {
        wrapperPropo,
        propo,
        propoLetters,
        propoLettersTrans,
        propoLettersTransMain,
      } = getCommon();

      const page =
        root instanceof Element
          ? root.querySelector(".page-container") || root
          : document.querySelector(".page-container");

      if (!wrapperPropo || !page) {
        console.warn("introProposito: wrapperPropo o page mancanti", {
          wrapperPropo,
          page,
        });
        return null;
      }

      const logoLetters = gsap.utils.toArray(".logo-svg.cta");
      const logoDot = document.querySelector(".logo-svg.dot");

      const tl = gsap.timeline({
        delay: 0.18,
        onStart: () => {
          gsap.set(logoLetters, { y: 0 });

          if (logoDot) {
            gsap.set(logoDot, { "--r-scale": "32.392" });
          }

          if (header?.burgerBlock) {
            gsap.to(header.burgerBlock, { scale: 1, duration: 0.3 });
          }
        },
        onComplete: () => {
          unblockScroll?.();
          lenisInstance?.update?.();
          resetPropositoCover();
        },
      });

      tl.to(
        propoLettersTransMain,
        {
          rotateX: 90,
          opacity: 0,
          duration: 0.5,
          ease: "power1.inOut",
          stagger: { each: 0.1 },
          transformOrigin: "top center",
        },
        0
      )
        .to(
          propoLettersTrans,
          {
            rotateX: 0,
            opacity: 1,
            duration: 0.5,
            ease: "power1.inOut",
            stagger: { each: 0.1 },
            transformOrigin: "bottom center",
          },
          0.2
        )
        .to(
          propoLetters,
          {
            y: "-120%",
            duration: 0.25,
            ease: "power2.in",
            stagger: { each: 0.065, from: "end" },
          },
          0.7
        )
        .to(
          propo,
          {
            scale: 0.5,
            opacity: 0,
            duration: 0.5,
            ease: "power1.inOut",
          },
          "<"
        )
        .to(
          wrapperPropo,
          {
            "--trans-clip-bottom": "100%",
            duration: 1,
            ease: "power3.inOut",
          },
          1
        )
        .to(
          page,
          {
            y: 0,
            duration: 1,
            ease: "power3.inOut",
          },
          1
        );

      return tl;
    }
    return {
      getCommon,
      resetGenericCover,
      resetPropositoCover,
      introGenericPage,
      introContact,
      introProgetti,
      introProject,
      introProposito,
      introExpertise,
      introExpertiseSub,
    };
  })();

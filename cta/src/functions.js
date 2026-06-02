const backHomeLink = window.backHomeLink || null;
const burger = window.burger || null;
const header = window.header || {};
const headerElements = window.headerElements || [];
const footerBody = window.footerBody || null;
const burgerElements = window.burgerElements || {};
const transitionElementsObj = window.transitionElementsObj || {};

// ============================================================
// Custom Cursor — GLOBAL OBJECT (Barba-safe)
// ============================================================
window.customCursor =
  window.customCursor ||
  (function () {
    const api = {};

    api.state = {
      bound: false,
      cursorVisible: true,
      current: "normal", // "normal" | "grab" | "grabbing"

      // cache elementi
      cursor: null,
      cursorNormal: null,
      cursorGrab: null,
      cursorGrabbing: null,
      pulse: null,

      // ultima posizione nota
      lastX: window.innerWidth / 2,
      lastY: window.innerHeight / 2,

      // handler globali
      handlePointerMove: null,
      onDocMouseLeave: null,
      onDocMouseEnter: null,
      onWindowMouseOut: null,
      onBlur: null,
      onFocus: null,
      onVisibility: null,
      onPageHide: null,
      onPageShow: null,
      handlePointerOver: null,
      handlePointerOut: null,
    };

    api.shouldEnable = function () {
      return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    };

    api.ensurePageSpecificArray = function () {
      if (!Array.isArray(window.pageSpecificListeners)) {
        window.pageSpecificListeners = [];
      }
    };

    api.cacheElements = function () {
      if (!api.shouldEnable()) return false;

      api.state.cursor = document.getElementById("custom-cursor");
      api.state.cursorNormal = document.getElementById("cursor-svg");
      api.state.cursorGrab = document.getElementById("cursor-svg-grab");
      api.state.cursorGrabbing = document.getElementById("cursor-svg-grabbing");
      api.state.pulse = document.getElementById("pulse-cursor");

      if (
        !api.state.cursor ||
        !api.state.cursorNormal ||
        !api.state.cursorGrab ||
        !api.state.cursorGrabbing ||
        !api.state.pulse
      ) {
        return false;
      }

      return true;
    };

    api.ensureReady = function () {
      if (!api.shouldEnable()) {
        document.documentElement.classList.remove("cursor-on");
        return false;
      }

      document.documentElement.classList.add("cursor-on");

      const currentCursor = api.state.cursor;

      // utile dopo Barba / Safari bfcache / DOM refresh
      if (!currentCursor || !document.documentElement.contains(currentCursor)) {
        return api.cacheElements();
      }

      return true;
    };

    api.setVisualState = function (next) {
      const { cursorNormal, cursorGrab, cursorGrabbing } = api.state;
      if (!cursorNormal || !cursorGrab || !cursorGrabbing) return;

      api.state.current = next;

      if (next === "normal") {
        cursorNormal.style.opacity = 1;
        cursorGrab.style.opacity = 0;
        cursorGrabbing.style.opacity = 0;
        return;
      }

      if (next === "grab") {
        cursorNormal.style.opacity = 0;
        cursorGrab.style.opacity = 1;
        cursorGrabbing.style.opacity = 0;
        return;
      }

      if (next === "grabbing") {
        cursorNormal.style.opacity = 0;
        cursorGrab.style.opacity = 0;
        cursorGrabbing.style.opacity = 1;
      }
    };

    api.reset = function () {
      if (!api.ensureReady()) return;

      const { cursorNormal, cursorGrab, cursorGrabbing, pulse } = api.state;
      if (!cursorNormal || !cursorGrab || !cursorGrabbing) return;

      api.setVisualState("normal");

      if (pulse) {
        gsap.to(pulse, {
          fill: "#ffffff",
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
          overwrite: "auto",
        });
      }

      gsap.to(cursorNormal, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    // ============================================================
    // SHOW / HIDE / SNAP
    // ============================================================
    api._snapToEvent = function (e) {
      if (!api.ensureReady()) return;

      const c = api.state.cursor;
      if (!c) return;

      if (e && typeof e.clientX === "number" && typeof e.clientY === "number") {
        api.state.lastX = e.clientX;
        api.state.lastY = e.clientY;
      }

      gsap.killTweensOf(c);
      gsap.set(c, {
        x: api.state.lastX,
        y: api.state.lastY,
      });
    };

    api._show = function (e) {
      if (!api.ensureReady()) return;

      api._snapToEvent(e);

      api.state.cursorVisible = true;

      const c = api.state.cursor;
      if (!c) return;

      gsap.killTweensOf(c, "autoAlpha");
      gsap.to(c, {
        autoAlpha: 1,
        duration: 0.12,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    api._hide = function () {
      api.state.cursorVisible = false;

      const c = api.state.cursor;
      if (!c) return;

      gsap.killTweensOf(c, "autoAlpha");
      gsap.to(c, {
        autoAlpha: 0,
        duration: 0.12,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    // ============================================================
    // 1) INIT GLOBAL — una volta sola
    // ============================================================
    api.initGlobal = function () {
      if (!api.shouldEnable()) {
        document.documentElement.classList.remove("cursor-on");
        return;
      }

      document.documentElement.classList.add("cursor-on");

      if (!api.cacheElements()) {
        console.warn("customCursor: elementi non trovati (initGlobal)");
        return;
      }

      if (api.state.bound) return;
      api.state.bound = true;

      api.state.cursorVisible = true;

      if (api.state.cursor) {
        gsap.set(api.state.cursor, {
          autoAlpha: 1,
          x: api.state.lastX,
          y: api.state.lastY,
        });
      }

      api.state.handlePointerMove = (e) => {
        if (!api.ensureReady()) return;

        const c = api.state.cursor;
        if (!c) return;

        api.state.lastX = e.clientX;
        api.state.lastY = e.clientY;

        // Safari recovery: se mouseenter/focus non si attivano,
        // al primo movimento il cursore torna visibile.
        if (!api.state.cursorVisible) {
          api._show(e);
          return;
        }

        gsap.to(c, {
          x: api.state.lastX,
          y: api.state.lastY,
          duration: 0.2,
          ease: "power2.out",
          overwrite: "auto",
        });
      };

      api.state.onDocMouseLeave = () => {
        api._hide();
      };

      api.state.onDocMouseEnter = (e) => {
        api._show(e);
      };

      api.state.onWindowMouseOut = (e) => {
        if (!e.relatedTarget && !e.toElement) {
          api._hide();
        }
      };

      api.state.onBlur = () => {
        api._hide();
      };

      api.state.onFocus = () => {
        if (!api.ensureReady()) return;
        api._show();
      };

      api.state.onVisibility = () => {
        if (document.hidden) {
          api._hide();
        } else {
          api._show();
        }
      };

      api.state.onPageHide = () => {
        api._hide();
      };

      api.state.onPageShow = () => {
        if (!api.ensureReady()) return;
        api._show();
      };

      const interactiveSelector =
        "a, button, .pointer, .w-radio, .w-input, .w-checkbox, [role='button'], input[type='submit'], input[type='button'], input[type='reset'], input[type='radio'], input[type='checkbox'], input[type='text'], select, [data-form='next-btn'], [data-form='back-btn'], [data-form='submit-btn'], [data-barba='link']";

      const animateInteractiveEnter = () => {
        if (!api.state.cursorVisible) return;
        if (!api.state.cursorNormal || !api.state.pulse) return;

        gsap.to(api.state.cursorNormal, {
          scale: 1.1,
          duration: 0.3,
          ease: "power2.out",
          overwrite: "auto",
        });

        gsap.to(api.state.pulse, {
          fill: "#ff006e",
          scale: 1.3,
          duration: 0.3,
          ease: "power2.out",
          transformOrigin: "top left",
          overwrite: "auto",
        });
      };

      const animateInteractiveLeave = () => {
        if (!api.state.cursorVisible) return;
        if (!api.state.cursorNormal || !api.state.pulse) return;

        gsap.to(api.state.cursorNormal, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
          overwrite: "auto",
        });

        gsap.to(api.state.pulse, {
          fill: "#ffffff",
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
          overwrite: "auto",
        });
      };

      api.state.handlePointerOver = (e) => {
        if (!api.ensureReady()) return;

        const target = e.target.closest(interactiveSelector);
        if (!target) return;
        if (target.contains(e.relatedTarget)) return;

        animateInteractiveEnter();
      };

      api.state.handlePointerOut = (e) => {
        if (!api.ensureReady()) return;

        const target = e.target.closest(interactiveSelector);
        if (!target) return;
        if (target.contains(e.relatedTarget)) return;

        animateInteractiveLeave();
      };

      // GLOBAL listeners — non entrano nel cleanup pagina
      window.addEventListener("pointermove", api.state.handlePointerMove, {
        passive: true,
      });

      document.addEventListener("mouseleave", api.state.onDocMouseLeave);
      document.addEventListener("mouseenter", api.state.onDocMouseEnter);

      window.addEventListener("mouseout", api.state.onWindowMouseOut);
      window.addEventListener("blur", api.state.onBlur);
      window.addEventListener("focus", api.state.onFocus);

      // Safari / bfcache / browser back-forward
      window.addEventListener("pagehide", api.state.onPageHide);
      window.addEventListener("pageshow", api.state.onPageShow);

      document.addEventListener("visibilitychange", api.state.onVisibility);

      document.addEventListener("pointerover", api.state.handlePointerOver);
      document.addEventListener("pointerout", api.state.handlePointerOut);
    };

    // ============================================================
    // 2) REFRESH — dopo ogni transizione Barba
    // ============================================================
    api.refresh = function () {
      if (!api.shouldEnable()) {
        document.documentElement.classList.remove("cursor-on");
        return;
      }

      document.documentElement.classList.add("cursor-on");

      if (!api.cacheElements()) {
        console.warn("customCursor: elementi non trovati (refresh)");
        return;
      }

      api.reset();

      // stato coerente dopo Barba
      api.state.cursorVisible = true;

      if (api.state.cursor) {
        gsap.killTweensOf(api.state.cursor);
        gsap.set(api.state.cursor, {
          autoAlpha: 1,
          x: api.state.lastX,
          y: api.state.lastY,
        });
      }

      api.bindSwiperPage();
      api.bindRailPage();
    };

    // ============================================================
    // 3-A) PAGE-SPECIFIC SWIPER
    // ============================================================
    api.bindSwiperPage = function () {
      if (!api.shouldEnable()) return;

      if (
        !api.state.cursorNormal ||
        !api.state.cursorGrab ||
        !api.state.cursorGrabbing
      ) {
        return;
      }

      api.ensurePageSpecificArray();

      const swiperWrappers = document.querySelectorAll(".swiper-wrapper");

      swiperWrappers.forEach((wrapper) => {
        if (wrapper.dataset.cursorSwiperBound === "1") return;
        wrapper.dataset.cursorSwiperBound = "1";

        const onEnter = () => api.setVisualState("grab");
        const onDown = () => api.setVisualState("grabbing");
        const onLeave = () => api.setVisualState("normal");
        const onUp = () => api.setVisualState("grab");

        wrapper.addEventListener("pointerenter", onEnter);
        wrapper.addEventListener("pointerleave", onLeave);
        wrapper.addEventListener("pointerdown", onDown);
        wrapper.addEventListener("pointerup", onUp);

        window.pageSpecificListeners.push(
          { element: wrapper, event: "pointerenter", handler: onEnter },
          { element: wrapper, event: "pointerleave", handler: onLeave },
          { element: wrapper, event: "pointerdown", handler: onDown },
          { element: wrapper, event: "pointerup", handler: onUp }
        );
      });

      const swiperInteractive = document.querySelectorAll(
        ".swiper-wrapper a, .swiper-wrapper button, .swiper-wrapper [role='button'], .swiper-wrapper input, .swiper-wrapper select, .swiper-wrapper textarea"
      );

      swiperInteractive.forEach((el) => {
        if (el.dataset.cursorSwiperInteractiveBound === "1") return;
        el.dataset.cursorSwiperInteractiveBound = "1";

        const onIEnter = () => api.setVisualState("normal");
        const onILeave = () => api.setVisualState("grab");

        el.addEventListener("pointerenter", onIEnter);
        el.addEventListener("pointerleave", onILeave);

        window.pageSpecificListeners.push(
          { element: el, event: "pointerenter", handler: onIEnter },
          { element: el, event: "pointerleave", handler: onILeave }
        );
      });
    };

    // ============================================================
    // 3-B) Slider Custom
    // ============================================================
    api.bindRailPage = function () {
      if (!api.shouldEnable()) return;

      if (
        !api.state.cursorNormal ||
        !api.state.cursorGrab ||
        !api.state.cursorGrabbing
      ) {
        return;
      }

      api.ensurePageSpecificArray();

      const railHosts = document.querySelectorAll(".exp_slider");

      railHosts.forEach((host) => {
        if (host.dataset.cursorRailBound === "1") return;
        host.dataset.cursorRailBound = "1";

        const onEnter = () => api.setVisualState("grab");
        const onDown = () => api.setVisualState("grabbing");
        const onLeave = () => api.setVisualState("normal");
        const onUp = () => api.setVisualState("grab");

        host.addEventListener("pointerenter", onEnter);
        host.addEventListener("pointerleave", onLeave);
        host.addEventListener("pointerdown", onDown);
        host.addEventListener("pointerup", onUp);

        window.pageSpecificListeners.push(
          { element: host, event: "pointerenter", handler: onEnter },
          { element: host, event: "pointerleave", handler: onLeave },
          { element: host, event: "pointerdown", handler: onDown },
          { element: host, event: "pointerup", handler: onUp }
        );
      });

      const railInteractive = document.querySelectorAll(
        ".exp_slider a, .exp_slider button, .exp_slider [role='button'], .exp_slider input, .exp_slider select, .exp_slider textarea"
      );

      railInteractive.forEach((el) => {
        if (el.dataset.cursorRailInteractiveBound === "1") return;
        el.dataset.cursorRailInteractiveBound = "1";

        const onIEnter = () => api.setVisualState("normal");
        const onILeave = () => api.setVisualState("grab");

        el.addEventListener("pointerenter", onIEnter);
        el.addEventListener("pointerleave", onILeave);

        window.pageSpecificListeners.push(
          { element: el, event: "pointerenter", handler: onIEnter },
          { element: el, event: "pointerleave", handler: onILeave }
        );
      });
    };

    // ============================================================
    // 4) CLEANUP PAGE — solo roba page-specific
    // ============================================================
    api.cleanupPage = function () {
      if (Array.isArray(window.pageSpecificListeners)) {
        window.pageSpecificListeners.forEach((entry) => {
          if (!entry) return;

          if (typeof entry.cleanup === "function") {
            try {
              entry.cleanup();
            } catch (err) {
              console.warn("customCursor.cleanupPage: errore cleanup", err);
            }
            return;
          }

          const { element, event, handler, options } = entry;
          element?.removeEventListener?.(event, handler, options);
        });
      }

      window.pageSpecificListeners = [];
      api.reset();
    };

    return api;
  })();

//-Variabili apertura Menu

window.isNavOpen = false;
window.isAnimating = false;

/** Burger e Navbar */
window.headerAnimation = window.headerAnimation || {
  disableBackHomeLink() {
    if (backHomeLink) {
      gsap.set(backHomeLink, { pointerEvents: "none" });
    }
  },

  enableBackHomeLink() {
    if (backHomeLink) {
      gsap.set(backHomeLink, { clearProps: "pointerEvents" });
    }
  },
  menuBackHomeLink() {
    if (backHomeLink) {
      backHomeLink.setAttribute("data-custom", "menu");
    }
  },

  buttonBackHomeLink() {
    if (backHomeLink) {
      backHomeLink.setAttribute("data-custom", "button");
    }
  },

  disableBurgerClick() {
    if (burger) {
      gsap.set(burger, { pointerEvents: "none" });
    }
  },

  enableBurgerClick() {
    if (burger) {
      gsap.set(burger, { clearProps: "pointerEvents" });
    }
  },

  burgerHover() {
    const isDesktop = !!window.bp?.is?.("lgUp"); // >= 992
    const isMobile = !isDesktop; // <= 991

    if (
      !burger ||
      !burgerElements.burgerClose ||
      !burgerElements.lines.top ||
      !burgerElements.lines.bottom ||
      !burgerElements.textMenu // .burger-label
    ) {
      console.error(
        "headerAnimation.burgerHover: elementi mancanti per l'hover del burger",
      );
      return;
    }

    const label = burgerElements.textMenu;
    const closeIcon = burgerElements.burgerClose;
    const lines = [burgerElements.lines.top, burgerElements.lines.bottom];

    // Timeline hover: play su enter, reverse su leave
    const hoverTl = gsap.timeline({ paused: true });
    const clickTl = gsap.timeline({ paused: true });
    const resetTl = gsap.timeline({ paused: true });

    hoverTl
      .to(
        closeIcon,
        {
          scale: 0.8,
          duration: 0.35,
          ease: "power2.out",
          transformOrigin: "center center",
        },
        0,
      )
      .to(
        label,
        {
          x: -5,
          duration: 0.35,
          ease: "power2.out",
        },
        "<",
      )
      .to(
        lines,
        {
          scale: 1,
          duration: 0.4,
          ease: "power2.out",
          transformOrigin: "center center",
        },
        0.1,
      );

    clickTl
      .to(closeIcon, {
        scale: 1.1,
        "--_theme---header--burger-border": "100%",
        duration: 0.8,
        ease: "back.out(2)",
      })
      .to(
        label,
        {
          x: -5,
          rotateY: 90,
          opacity: 0,
          duration: 0.15,
          ease: "power2.out",
        },
        0,
      )
      .to(
        burgerElements.burgerLabel,
        {
          "--burger-x": "100%",
          duration: 0.6,
          ease: "power2.out",
        },
        0,
      )
      .to(
        burgerElements.lines.top,
        { scale: 1, y: 3, rotationZ: -45, duration: 0.3, ease: "power1.out" },
        "<",
      )
      .to(
        burgerElements.lines.bottom,
        {
          scale: 1,
          y: -3,
          rotationZ: 45,
          duration: 0.3,
          ease: "power1.out",
        },
        "<",
      );

    resetTl
      .set(
        label,
        {
          opacity: 1,
          x: 0,
          rotateY: 0,
        },
        0,
      )
      .to(
        burgerElements.burgerLabel,
        {
          "--burger-x": "0%",
          duration: 0.6,
          ease: "power2.out",
        },
        0.1,
      )
      .to(
        lines,
        { y: 0, rotationZ: 0, duration: 0.3, ease: "power1.out" },
        "<",
      );

    if (!isMobile) {
      resetTl.to(
        burgerElements.burgerClose,
        {
          scale: 0.3,
          ease: "back.out(2)",
          duration: 0.2,
        },
        0.1,
      );
    }
    if (isMobile) {
      resetTl.to(
        burgerElements.burgerClose,
        {
          scale: 0.7,
          ease: "back.out(2)",
          duration: 0.45,
        },
        0.1,
      );
    }

    resetTl.to(
      burgerElements.logoNav,
      { y: "0%", duration: 0.4, ease: "power2.out" },
      "-=0.2",
    );

    // Hover events (solo desktop)
    if (!isMobile) {
      burger.addEventListener("mouseenter", () => {
        if (!window.isNavOpen && !window.isAnimating) hoverTl.play();
      });

      burger.addEventListener("mouseleave", () => {
        if (!window.isNavOpen && !window.isAnimating) hoverTl.reverse();
      });
    }

    // Click
    burger.addEventListener("click", () => {
      if (window.isAnimating) return;

      if (!window.isNavOpen) {
        hoverTl.pause(0);
        clickTl.play(0);
        window.headerAnimation.openMenu();
      } else {
        window.headerAnimation.closeMenu();
      }
    });

    this.hoverTl = hoverTl;
    this.clickTl = clickTl;
    this.resetTl = resetTl;
  },

  openMenu() {
    this.openTL?.play(0);
    this.hoverTl?.pause(); // disattiva eventuale hover
  },

  closeMenu() {
    this.closeTL?.play(0);
    this.clickTl?.reverse(0);
    this.clickTl?.eventCallback("onReverseComplete", null); // reset callback precedente

    this.clickTl?.eventCallback("onReverseComplete", () => {
      const isDesktop = !!window.bp?.is?.("lgUp"); // >= 992
      const isMobile = !isDesktop; // <= 991

      if (!isMobile && burger.matches(":hover")) {
        this.hoverTl?.play(0); // solo su desktop e se siamo sopra, torna in hover
      } else {
        this.resetTl?.play(0); // altrimenti reset completo
      }
    });
  },

  closeMenuRouting() {
    this.closeTLB?.play(0);
    this.clickTl?.reverse(0);
    this.clickTl?.eventCallback("onReverseComplete", null); // reset callback precedente

    this.clickTl?.eventCallback("onReverseComplete", () => {
      const isDesktop = !!window.bp?.is?.("lgUp"); // >= 992
      const isMobile = !isDesktop; // <= 991

      if (!isMobile && burger.matches(":hover")) {
        this.hoverTl?.play(0); // solo su desktop e se siamo sopra, torna in hover
      } else {
        this.resetTl?.play(0); // altrimenti reset completo
      }
    });
  },

  closeMenuRoutingHome() {
    this.closeTLBH?.play(0);
    this.clickTl?.reverse(0);
    this.clickTl?.eventCallback("onReverseComplete", null); // reset callback precedente

    this.clickTl?.eventCallback("onReverseComplete", () => {
      const isDesktop = !!window.bp?.is?.("lgUp"); // >= 992
      const isMobile = !isDesktop; // <= 991

      if (!isMobile && burger.matches(":hover")) {
        this.hoverTl?.play(0); // solo su desktop e se siamo sopra, torna in hover
      } else {
        this.resetTl?.play(0); // altrimenti reset completo
      }
    });
  },

  initNav() {
    const nav = burgerElements.nav;
    const logoMenuRect = gsap.utils.toArray(".logo-svg .logo-menu");
    const dotLink = gsap.utils.toArray(".nav-btn");
    const navItem = gsap.utils.toArray(".nav-item");
    const img = nav.querySelector(".img-nav");
    const contact = nav.querySelector(".nav-inn-bottom");
    const ass = nav.querySelector(".nav-ass-center");

    this.openTL = gsap.timeline({
      paused: true,
      onStart: () => {
        window.isAnimating = true;
        window.isNavOpen = true;
        scrollLock.block();
        this.disableBackHomeLink();
        this.disableBurgerClick();
        gsap.set(burgerElements.burgerLabel, { pointerEvents: "none" });
        if (burgerElements.nav) burgerElements.nav.classList.add("is-open");
        gsap.set(nav, { "--menu-clip-top": "100%" });
      },
      onComplete: () => {
        window.isAnimating = false;
        if (burger) {
          burger.setAttribute("aria-expanded", "true");
          burger.setAttribute("aria-label", "Chiudi il Menu");
          this.menuBackHomeLink();
          this.enableBackHomeLink();
          this.enableBurgerClick();
        }
      },
    });

    this.closeTL = gsap.timeline({
      paused: true,
      onStart: () => {
        window.isAnimating = true;
        this.disableBackHomeLink();
        this.disableBurgerClick();
        window.menuNavigation?.closeUserAccount?.();
      },
      onComplete: () => {
        window.isAnimating = false;
        window.isNavOpen = false;
        scrollLock.unblock();
        ScrollTrigger.refresh();
        gsap.set(nav, { "--menu-clip-bottom": "0%" });
        gsap.set(burgerElements.burgerLabel, { pointerEvents: "auto" });
        if (burgerElements.nav) burgerElements.nav.classList.remove("is-open");
        document.activeElement?.blur?.(); // per sicurezza
        this.menuOpen = false;
        burger.setAttribute("aria-expanded", "false");
        burger.setAttribute("aria-label", "Apri il Menu");
        this.buttonBackHomeLink();
        this.enableBackHomeLink();
        this.enableBurgerClick();
      },
    });

    this.closeTLB = gsap.timeline({
      paused: true,
      onStart: () => {
        window.isAnimating = true;
        this.disableBackHomeLink();
        this.disableBurgerClick();
        window.menuNavigation?.closeUserAccount?.();
      },
      onComplete: () => {
        window.isAnimating = false;
        window.isNavOpen = false;
        scrollLock.unblock({ restorePosition: false });
        gsap.set(nav, { "--menu-clip-bottom": "0%" });
        gsap.set(burgerElements.burgerLabel, { pointerEvents: "auto" });
        if (burgerElements.nav) burgerElements.nav.classList.remove("is-open");
        document.activeElement?.blur?.(); // per sicurezza
        this.menuOpen = false;
        burger.setAttribute("aria-expanded", "false");
        burger.setAttribute("aria-label", "Apri il Menu");
        this.buttonBackHomeLink();
        this.enableBackHomeLink();
        this.enableBurgerClick();
      },
    });
    this.closeTLBH = gsap.timeline({
      paused: true,
      onStart: () => {
        window.isAnimating = true;
        this.disableBackHomeLink();
        this.disableBurgerClick();
        window.menuNavigation?.closeUserAccount?.();
      },
      onComplete: () => {
        window.isAnimating = false;
        window.isNavOpen = false;
        const isDesktop = !!window.bp?.is?.("lgUp"); // >= 992
        const isMobile = !isDesktop; // <= 991

        if (isMobile) {
          gsap.set(header.logoHome, {
            "--brand-clip-t": "100%",
            "--brand-clip-b": "0%",
          });
        }

        scrollLock.unblock({ restorePosition: false });
        gsap.set(nav, { "--menu-clip-bottom": "0%" });
        gsap.set(burgerElements.burgerLabel, { pointerEvents: "auto" });
        if (burgerElements.nav) burgerElements.nav.classList.remove("is-open");
        document.activeElement?.blur?.(); // per sicurezza
        this.menuOpen = false;
        burger.setAttribute("aria-expanded", "false");
        burger.setAttribute("aria-label", "Apri il Menu");
        this.buttonBackHomeLink();
        this.enableBackHomeLink();
        this.enableBurgerClick();
      },
    });

    this.openTL
      .to(
        nav,
        {
          "--menu-clip-top": "0%",
          duration: 1,
          ease: "power3.inOut",
        },
        0,
      )
      .to(
        dotLink,
        {
          scale: 0.5,
          duration: 0.5,
          ease: "power2.out",
          stagger: { each: 0.1, from: "end" },
        },
        "-=0.4",
      )
      .to(
        navItem,
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
          stagger: { each: 0.1, from: "edge" },
        },
        "<",
      )
      .to(
        img,
        {
          y: 0,
          rotateY: 0,
          duration: 1,
          ease: "power3.inOut",
        },
        0,
      )
      .to(
        contact,
        {
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
        },
        0.5,
      )
      .to(
        ass,
        {
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
        },
        0.6,
      )
      .to(
        logoMenuRect,
        {
          "--ov-clip-top": "0%", // si apre dal basso verso l'alto
          "--ov-clip-bottom": "0%",
          duration: 0.4,
          ease: "power2.out",
        },
        0.6,
      );

    this.closeTL
      .to(
        nav,
        {
          "--menu-clip-bottom": "100%",
          duration: 0.8,
          ease: "power3.inOut",
        },
        0,
      )
      .to(
        logoMenuRect,
        {
          "--ov-clip-top": "0%",
          "--ov-clip-bottom": "100%",
          duration: 0.35,
          ease: "power2.out",
        },
        0.5,
      );

    this.closeTLB
      .to(nav, {
        "--menu-clip-bottom": "100%",
        duration: 1,
        ease: "power3.inOut",
      })
      .to(
        logoMenuRect,
        {
          "--ov-clip-top": "0%",
          "--ov-clip-bottom": "100%",
          duration: 0.55,
          ease: "power2.out",
        },
        0.5,
      );

    this.closeTLBH
      .to(nav, {
        "--menu-clip-bottom": "100%",
        duration: 1,
        ease: "power3.inOut",
      })
      .to(
        header.logoHome,
        {
          "--brand-clip-b": "100%",
          duration: 0.35,
          ease: "power2.out",
        },
        0.5,
      )
      .to(
        header.burgerBlock,
        {
          scale: 0,
          duration: 0.4,
          ease: "power2.out",
        },
        "<",
      )
      .set(logoMenuRect, {
        "--ov-clip-top": "0%",
        "--ov-clip-bottom": "100%",
      });
  },

  initScrollControlButtons() {
    // sicurezza: se scrollLock non esiste esci
    if (!window.scrollLock) {
      console.warn(
        "scrollLock non è definito: impossibile inizializzare i controlli scroll.",
      );
      return;
    }

    const { block, unblock, isLocked } = window.scrollLock;

    const blockScrollButtons = document.querySelectorAll("[data-block-scroll]");
    const unblockScrollButtons = document.querySelectorAll(
      "[data-unblock-scroll]",
    );
    const toggleScrollButtons = document.querySelectorAll(
      "[data-toggle-scroll]",
    );

    const handleBlock = (event) => {
      event?.preventDefault?.();
      block(); // Blocca + salva posizione (default)
    };

    const handleUnblock = (event) => {
      event?.preventDefault?.();
      unblock(); // Sblocca + ripristina posizione (default)
    };

    const handleToggle = (event) => {
      event?.preventDefault?.();
      if (isLocked && isLocked()) {
        unblock();
      } else {
        block();
      }
    };

    blockScrollButtons.forEach((button) => {
      if (button.dataset.scrollControlBound === "1") return;
      button.dataset.scrollControlBound = "1";
      button.addEventListener("click", handleBlock);
    });

    unblockScrollButtons.forEach((button) => {
      if (button.dataset.scrollControlBound === "1") return;
      button.dataset.scrollControlBound = "1";
      button.addEventListener("click", handleUnblock);
    });

    toggleScrollButtons.forEach((button) => {
      if (button.dataset.scrollControlBound === "1") return;
      button.dataset.scrollControlBound = "1";
      button.addEventListener("click", handleToggle);
    });
  },

  init: function () {
    this.initNav();
    this.burgerHover();
    this.initScrollControlButtons();
  },
};

window.menuNavigation = window.menuNavigation || {
  timelines: {}, // Per gestire le timeline di ogni elemento

  navLink: function () {
    const containers = document.querySelectorAll(".nav-link");
    if (!containers.length) return;

    // Namespace per le API del menu
    window.menuNavigation = window.menuNavigation || {};
    // azzeriamo i reset precedenti (nuova pagina Barba, nuovi link)
    window.menuNavigation._navLinkResetFns = [];

    const isDesktop = !!window.bp?.is?.("lgUp"); // >= 992

    // MQ per capire hover/touch
    const MQ = {
      hoverFine: window.matchMedia("(hover: hover) and (pointer: fine)"),
      anyCoarse: window.matchMedia("(any-pointer: coarse)"),
    };
    const canHover = () => MQ.hoverFine.matches;
    const hasTouch = () => MQ.anyCoarse.matches;

    containers.forEach((container) => {
      // evita doppi binding
      if (container.dataset.menuHoverBound === "1") return;
      container.dataset.menuHoverBound = "1";

      const dot = container.querySelector(".nav-btn");
      if (!dot) return;

      const icon = dot.querySelector(".icon");

      const isMobileLayout = !isDesktop;
      const speedFactor = isMobileLayout || hasTouch() ? 0.9 : 1;

      const D_IN = 0.45 * speedFactor;
      const D_OUT = 0.25 * speedFactor;

      // scala di base (es. 0.5 impostata dalle TL del menu)
      const baseDotScale = gsap.getProperty(dot, "scale") || 0.5;

      gsap.set(dot, { transformOrigin: "center center" });
      if (icon) {
        gsap.set(icon, { transformOrigin: "bottom left", scale: 0 });
      }

      let isActive = false;

      const killTweens = () => {
        if (icon) {
          gsap.killTweensOf([dot, icon]);
        } else {
          gsap.killTweensOf(dot);
        }
      };

      const onEnter = () => {
        if (isActive) return;
        isActive = true;

        killTweens();

        gsap.to(dot, {
          scale: 1,
          duration: D_IN,
          ease: "power2.out",
          overwrite: "auto",
        });

        if (icon) {
          gsap.to(icon, {
            scale: 1,
            duration: D_IN,
            ease: "power2.out",
            overwrite: "auto",
            transformOrigin: "bottom left",
          });
        }
      };

      const onLeave = () => {
        if (!isActive) return;
        isActive = false;

        killTweens();

        gsap.to(dot, {
          scale: baseDotScale,
          duration: D_OUT,
          ease: "power2.out",
          overwrite: "auto",
        });

        if (icon) {
          gsap.to(icon, {
            scale: 0,
            duration: D_OUT,
            ease: "power2.out",
            overwrite: "auto",
            transformOrigin: "top right",
            onComplete: () => {
              gsap.set(icon, { transformOrigin: "bottom left" });
            },
          });
        }
      };

      // click → solo enter (nessun preventDefault: ci pensa Barba)
      const onClick = () => {
        onEnter();
      };

      // === BIND EVENTI =======================================

      // Desktop con hover “vero”
      if (isDesktop && canHover()) {
        container.addEventListener("mouseenter", onEnter);
        container.addEventListener("mouseleave", onLeave);
      }

      // Mobile / touch (e in generale tutti i device) → click come feedback
      // (anche su desktop non crea problemi: onEnter controlla isActive)
      container.addEventListener("click", onClick);

      // === funzione di RESET istantaneo (senza animazioni) ===============
      const resetFn = () => {
        gsap.killTweensOf(dot);
        if (icon) gsap.killTweensOf(icon);

        gsap.set(dot, { scale: baseDotScale });
        if (icon) {
          gsap.set(icon, {
            scale: 0,
            transformOrigin: "bottom left",
          });
        }
        isActive = false;
      };

      window.menuNavigation._navLinkResetFns.push(resetFn);
    });

    // API pubblica: reset di TUTTI i nav-link
    window.menuNavigation.resetNavLinks = function () {
      if (!Array.isArray(window.menuNavigation._navLinkResetFns)) return;
      window.menuNavigation._navLinkResetFns.forEach((fn) => {
        try {
          fn();
        } catch (e) {
          console.warn("resetNavLinks: errore in resetFn", e);
        }
      });
    };
  },

  userAccount: function () {
    const dropdownWrappers = document.querySelectorAll(".assessment-center");
    if (!dropdownWrappers.length) return;

    // Namespace globale menu
    window.menuNavigation = window.menuNavigation || {};

    // Registro globale per funzioni di chiusura
    if (!Array.isArray(window.menuNavigation._userAccountClosers)) {
      window.menuNavigation._userAccountClosers = [];
    } else {
      window.menuNavigation._userAccountClosers.length = 0;
    }

    // Stato globale di apertura (come window.isNavOpen)
    if (typeof window.isUserAccountOpen === "undefined") {
      window.isUserAccountOpen = false;
    }

    const isDesktop = !!window.bp?.is?.("lgUp"); // >= 992
    const isMobile = !isDesktop; // <= 991

    dropdownWrappers.forEach((wrapper) => {
      const dropdownMenu = wrapper.querySelector(".access-panel");
      const trigger = wrapper.querySelector(".ass-center");
      if (!dropdownMenu || !trigger) return;

      // evita doppi binding
      if (wrapper.dataset.userAccountBound === "1") return;
      wrapper.dataset.userAccountBound = "1";

      // elementi interni
      const loginText = dropdownMenu.querySelector(
        ".dropdown-wrap-text-menu-link",
      );
      const links = dropdownMenu.querySelectorAll(".login-text-drop-down");
      const accessBtn = dropdownMenu.querySelector(".access-btn");

      const linkArray = Array.from(links);

      let anim = null;

      // clip inizialmente chiusa
      gsap.set(dropdownMenu, { "--clip-access": "100%" });
      trigger.setAttribute("aria-expanded", "false");

      // ====== HELPER: testo interattivo (trigger, login, link) ===========
      function setupTextInteractive(
        el,
        {
          lockOnOpen = false,
          defaultColor = "var(--_theme---text-dark)",
          hoverColor = "var(--_theme---primary)",
        } = {},
      ) {
        if (!el) return null;

        const hoverIn = () => {
          if (lockOnOpen && window.isUserAccountOpen) return;
          gsap.killTweensOf(el);
          gsap.to(el, {
            color: hoverColor,
            duration: 0.25,
            ease: "power2.out",
          });
        };

        const hoverOut = () => {
          if (lockOnOpen && window.isUserAccountOpen) return;
          gsap.killTweensOf(el);
          gsap.to(el, {
            color: defaultColor,
            duration: 0.2,
            ease: "power2.out",
          });
        };

        const clickEffect = () => {
          if (lockOnOpen && window.isUserAccountOpen) return;
          // piccolo flash al click (desktop + mobile)
          gsap.killTweensOf(el);
          gsap.to(el, {
            color: hoverColor,
            duration: 0.15,
            ease: "power2.out",
          });
        };

        // Desktop: hover + click
        if (!isMobile) {
          el.addEventListener("mouseenter", hoverIn);
          el.addEventListener("mouseleave", hoverOut);
        }

        // Sempre: click (desktop + mobile)
        el.addEventListener("click", clickEffect);

        // funzione di reset per la chiusura del pannello
        return () => {
          gsap.killTweensOf(el);
          gsap.set(el, { color: defaultColor });
        };
      }

      // ====== HELPER: interazioni accessBtn (bg + border) ===============
      const btnBgDefault = "var(--_theme---btn--bg-dark)";
      const btnBorderDefault = "var(--_theme---btn--bg-dark)";
      const btnBgHover = "var(--_theme---primary)";
      const btnBorderHover = "var(--_theme---btn--border)";

      function setupButtonInteractive(btn) {
        if (!btn) return null;

        const hoverIn = () => {
          gsap.killTweensOf(btn);
          gsap.to(btn, {
            backgroundColor: btnBgHover,
            borderColor: btnBorderHover,
            duration: 0.25,
            ease: "power2.out",
          });
        };

        const hoverOut = () => {
          gsap.killTweensOf(btn);
          gsap.to(btn, {
            backgroundColor: btnBgDefault,
            borderColor: btnBorderDefault,
            duration: 0.2,
            ease: "power2.out",
          });
        };

        if (isMobile) {
          const onTouchStart = () => hoverIn();
          const onTouchEnd = () => hoverOut();

          btn.addEventListener("touchstart", onTouchStart, { passive: true });
          btn.addEventListener("touchend", onTouchEnd);
          btn.addEventListener("click", onTouchEnd);

          return () => {
            gsap.killTweensOf(btn);
            gsap.set(btn, {
              backgroundColor: btnBgDefault,
              borderColor: btnBorderDefault,
            });
          };
        } else {
          const onEnter = () => hoverIn();
          const onLeave = () => hoverOut();

          btn.addEventListener("mouseenter", onEnter);
          btn.addEventListener("mouseleave", onLeave);

          return () => {
            gsap.killTweensOf(btn);
            gsap.set(btn, {
              backgroundColor: btnBgDefault,
              borderColor: btnBorderDefault,
            });
          };
        }
      }

      // ====== INIZIALIZZO HOVER / CLICK INDIPENDENTI ====================
      const resetFns = [];

      const resetTrigger = setupTextInteractive(trigger, {
        lockOnOpen: true,
        defaultColor: "var(--color-ass)",
        hoverColor: "var(--_theme---primary)",
      });
      if (resetTrigger) resetFns.push(resetTrigger);

      const resetLogin = setupTextInteractive(loginText);
      if (resetLogin) resetFns.push(resetLogin);

      linkArray.forEach((lnk) => {
        const resetLink = setupTextInteractive(lnk);
        if (resetLink) resetFns.push(resetLink);
      });

      const resetAccessBtn = setupButtonInteractive(accessBtn);
      if (resetAccessBtn) resetFns.push(resetAccessBtn);

      const resetAllHoverStyles = () => {
        resetFns.forEach((fn) => fn && fn());
      };

      // ======== OPEN / CLOSE DROPDOWN ===================================
      const closeDropdown = () => {
        if (!window.isUserAccountOpen) return;

        if (anim) anim.kill();

        anim = gsap.to(dropdownMenu, {
          "--clip-access": "100%", // chiude verso il basso
          duration: 0.3,
          ease: "power2.in",
          onComplete() {
            dropdownMenu.classList.remove("is-open");
            trigger.classList.remove("active");
            trigger.setAttribute("aria-expanded", "false");
            window.isUserAccountOpen = false;
            resetAllHoverStyles();
          },
        });
      };

      const openDropdown = () => {
        if (anim) anim.kill();

        window.isUserAccountOpen = true;

        anim = gsap.to(dropdownMenu, {
          "--clip-access": "0%", // completamente visibile
          duration: 0.4,
          ease: "power2.out",
          onStart() {
            dropdownMenu.classList.add("is-open");
            trigger.classList.add("active");
            trigger.setAttribute("aria-expanded", "true");
          },
        });
      };

      const toggleDropdown = (event) => {
        event?.preventDefault();
        if (window.isUserAccountOpen) {
          closeDropdown();
        } else {
          openDropdown();
        }
      };

      trigger.addEventListener("click", toggleDropdown);

      trigger.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggleDropdown(e);
        }
      });

      window.menuNavigation._userAccountClosers.push(closeDropdown);
    });

    window.menuNavigation.closeUserAccount = function () {
      if (!window.isUserAccountOpen) return;

      if (!Array.isArray(window.menuNavigation._userAccountClosers)) return;
      window.menuNavigation._userAccountClosers.forEach((fn) => fn && fn());
    };
  },

  heroMenuHover: function () {
    // Solo desktop (il menu mobile usa il burger)
    const isDesktop = !!window.bp?.is?.("lgUp"); // >= 992
    if (!isDesktop) return;

    const containers = document.querySelectorAll(".nav-hero-link");
    if (!containers.length) return;

    if (!Array.isArray(window.pageSpecificListeners)) {
      window.pageSpecificListeners = [];
    }

    containers.forEach((container) => {
      // Evita doppi binding se per qualsiasi motivo la funzione viene richiamata 2 volte
      if (container.dataset.menuHoverBound === "1") return;
      container.dataset.menuHoverBound = "1";

      const dot = container.querySelector(".nav-hero-btn");
      if (!dot) return;

      // C'è solo UNA icon (freccia) dentro al dot
      const icon = dot.querySelector(".icon");

      // Memorizziamo la scala di partenza (es. 0.5 impostata dalla tlPlus)
      const baseDotScale = gsap.getProperty(dot, "scale") || 0.3;

      // Per sicurezza: origine scala del dot
      gsap.set(dot, { transformOrigin: "center center" });
      // L'icon la lasciamo al CSS (bottom left), ma assicuriamo comunque:
      if (icon) {
        gsap.set(icon, { transformOrigin: "bottom left" });
      }

      let isActive = false;

      const killTweens = () => {
        if (icon) {
          gsap.killTweensOf([dot, icon]);
        } else {
          gsap.killTweensOf(dot);
        }
      };

      const onEnter = () => {
        if (isActive) return;
        isActive = true;

        killTweens();

        gsap.to(dot, {
          scale: 1,
          duration: 0.45,
          ease: "power2.out",
          overwrite: "auto",
        });

        if (icon) {
          gsap.to(icon, {
            scale: 1,
            duration: 0.45,
            ease: "power2.out",
            overwrite: "auto",
            transformOrigin: "bottom left", // assicuriamo il punto di partenza
          });
        }
      };

      const onLeave = () => {
        if (!isActive) return;
        isActive = false;

        killTweens();

        gsap.to(dot, {
          scale: baseDotScale,
          duration: 0.25,
          ease: "power2.out",
          overwrite: "auto",
        });

        if (icon) {
          gsap.to(icon, {
            scale: 0,
            duration: 0.25,
            ease: "power2.out",
            overwrite: "auto",
            transformOrigin: "top right", // chiusura "al contrario"
            onComplete: () => {
              // Pulizia: la riportiamo pronta per il prossimo hover
              gsap.set(icon, { transformOrigin: "bottom left" });
            },
          });
        }
      };

      // Supporto hover (mouse) + touch (tap su device ibridi)
      const onTouchStart = () => {
        onEnter();
      };

      const onTouchEnd = () => {
        onLeave();
      };

      container.addEventListener("mouseenter", onEnter);
      container.addEventListener("mouseleave", onLeave);
      container.addEventListener("touchstart", onTouchStart, { passive: true });
      container.addEventListener("touchend", onTouchEnd);

      // Registriamo per cleanup post-transizione
      window.pageSpecificListeners.push(
        { element: container, event: "mouseenter", handler: onEnter },
        { element: container, event: "mouseleave", handler: onLeave },
        { element: container, event: "touchstart", handler: onTouchStart },
        { element: container, event: "touchend", handler: onTouchEnd },
      );
    });
  },

  footerMenuHover: function () {
    const containers = document.querySelectorAll(".nav-foot-link");
    if (!containers.length) return;

    // Namespace per le API del menu (stesso oggetto dei nav-link)
    window.menuNavigation = window.menuNavigation || {};
    // azzeriamo i reset precedenti (nuova pagina / nuovo footer)
    window.menuNavigation._navFooterResetFns = [];

    // Media query per hover vero (mouse fine)
    const MQ = {
      hoverFine: window.matchMedia("(hover: hover) and (pointer: fine)"),
    };
    const canHover = () => MQ.hoverFine.matches;

    containers.forEach((container) => {
      if (container.dataset.menuHoverBound === "1") return;
      container.dataset.menuHoverBound = "1";

      const dot = container.querySelector(".nav-foot-btn");
      if (!dot) return;

      const icon = dot.querySelector(".icon");
      const baseDotScale = gsap.getProperty(dot, "scale") || 0.3;

      gsap.set(dot, { transformOrigin: "center center" });
      if (icon) gsap.set(icon, { transformOrigin: "bottom left", scale: 0 });

      let isActive = false;

      const killTweens = () => {
        if (icon) gsap.killTweensOf([dot, icon]);
        else gsap.killTweensOf(dot);
      };

      const onEnter = () => {
        if (isActive) return;
        isActive = true;
        killTweens();

        gsap.to(dot, {
          scale: 1,
          duration: 0.45,
          ease: "power2.out",
          overwrite: "auto",
        });

        if (icon) {
          gsap.to(icon, {
            scale: 1,
            duration: 0.45,
            ease: "power2.out",
            overwrite: "auto",
            transformOrigin: "bottom left",
          });
        }
      };

      const onLeave = () => {
        if (!isActive) return;
        isActive = false;
        killTweens();

        gsap.to(dot, {
          scale: baseDotScale,
          duration: 0.25,
          ease: "power2.out",
          overwrite: "auto",
        });

        if (icon) {
          gsap.to(icon, {
            scale: 0,
            duration: 0.25,
            ease: "power2.out",
            overwrite: "auto",
            transformOrigin: "top right",
            onComplete: () => {
              gsap.set(icon, { transformOrigin: "bottom left" });
            },
          });
        }
      };

      // === Desktop: hover se disponibile ==========================
      if (canHover()) {
        container.addEventListener("mouseenter", onEnter);
        container.addEventListener("mouseleave", onLeave);
      }

      // === Click: ovunque (desktop + mobile) ======================
      const onClick = () => {
        // niente preventDefault: Barba gestisce il routing
        if (!isActive) onEnter();
        else onLeave();
      };

      container.addEventListener("click", onClick);

      // === funzione di RESET istantaneo (senza animazioni) ========
      const resetFn = () => {
        killTweens();
        gsap.set(dot, { scale: baseDotScale });
        if (icon) {
          gsap.set(icon, {
            scale: 0,
            transformOrigin: "bottom left",
          });
        }
        isActive = false;
      };

      window.menuNavigation._navFooterResetFns.push(resetFn);
    });

    // API pubblica: reset di TUTTI i link del footer
    window.menuNavigation.resetFooterLinks = function () {
      if (!Array.isArray(window.menuNavigation._navFooterResetFns)) return;
      window.menuNavigation._navFooterResetFns.forEach((fn) => {
        try {
          fn();
        } catch (e) {
          console.warn("resetFooterLinks: errore in resetFn", e);
        }
      });
    };
  },

  init: function () {
    this.navLink();
    this.userAccount();
    this.footerMenuHover();
  },
};

function setupPrimaryButtons() {
  if (!window.gsap) return;

  const { gsap } = window;

  if (!Array.isArray(window.pageSpecificListeners)) {
    window.pageSpecificListeners = [];
  }

  const isMobileBP = () => !window.bp?.is?.("lgUp"); // <= 991

  function setupSlideButton(btn, { useThumbnailHover = true } = {}) {
    if (!btn) return;

    let thumbnail = null;

    if (useThumbnailHover) {
      const slide = btn.closest(".related-articles-slide");
      thumbnail = slide?.querySelector(".thumbnail-image") || null;
    }
    const btnDot = btn.querySelector(".btn");
    const arrow = btn.querySelector(".btnn-ar") || btn.querySelector(".btn-ar");

    const isMobile = isMobileBP();
    const speedFactor = isMobile ? 0.85 : 1;

    const D_FILL_HOVER = 0.35 * speedFactor;
    const D_MIX_HOVER = 0.15 * speedFactor;
    const D_DOT_HOVER = 0.35 * speedFactor;
    const D_ARROW_HOVER = 0.3 * speedFactor;

    const D_MIX_OUT = 0.15 * speedFactor;
    const D_SCALE_OUT = 0.3 * speedFactor;
    const D_DOT_OUT = 0.3 * speedFactor;
    const D_ARROW_OUT = 0.3 * speedFactor;

    const OFFSET_DOT_H = 0.15 * speedFactor;
    const OFFSET_ARROW_H = 0.25 * speedFactor;
    const OFFSET_MIX_OUT = 0.15 * speedFactor;

    // stato iniziale: nessuna intro, solo stato hover-ready
    gsap.set(btn, {
      "--btn-scale": 0,
      "--btn-mix": "0%",
      "--btn-origin-y": "100%",
    });

    if (btnDot) {
      gsap.set(btnDot, { scale: 0.3 });
    }

    if (arrow) {
      gsap.set(arrow, {
        x: 0,
        y: 0,
        scale: 0,
        transformOrigin: "bottom left",
      });
    }

    const hoverTl = gsap.timeline({ paused: true });
    const leaveTl = gsap.timeline({ paused: true });

    let hoverTimeout;
    let isHovered = false;
    let isInside = false;

    hoverTl
      .set(
        btn,
        {
          "--btn-origin-y": "100%",
        },
        0
      )
      .to(
        btn,
        {
          "--btn-scale": 1,
          duration: D_FILL_HOVER,
          ease: "power2.out",
        },
        0
      )
      .to(
        btn,
        {
          "--btn-mix": "100%",
          duration: D_MIX_HOVER,
          ease: "power2.in",
        },
        0
      );

    if (btnDot) {
      hoverTl.to(
        btnDot,
        {
          scale: 0.9,
          duration: D_DOT_HOVER,
          ease: "power2.out",
        },
        OFFSET_DOT_H
      );
    }

    if (arrow) {
      hoverTl.to(
        arrow,
        {
          scale: 1,
          duration: D_ARROW_HOVER,
          ease: "power2.out",
          transformOrigin: "bottom left",
        },
        OFFSET_ARROW_H
      );
    }

    leaveTl
      .set(
        btn,
        {
          "--btn-origin-y": "0%",
        },
        0
      )
      .to(
        btn,
        {
          "--btn-mix": "0%",
          duration: D_MIX_OUT,
          ease: "power2.in",
        },
        OFFSET_MIX_OUT
      )
      .to(
        btn,
        {
          "--btn-scale": 0,
          duration: D_SCALE_OUT,
          ease: "power2.in",
        },
        0
      );

    if (btnDot) {
      leaveTl.to(
        btnDot,
        {
          scale: 0.3,
          duration: D_DOT_OUT,
          ease: "power2.in",
        },
        0
      );
    }

    if (arrow) {
      leaveTl.to(
        arrow,
        {
          scale: 0,
          duration: D_ARROW_OUT,
          ease: "power2.in",
          transformOrigin: "top right",
        },
        0
      );
    }

    const handleEnter = () => {
      clearTimeout(hoverTimeout);
      isInside = true;

      if (leaveTl.isActive()) {
        leaveTl.progress(1, false);
      }

      if (!isHovered) {
        hoverTl.restart();
        isHovered = true;
      }
    };

    const handleLeave = () => {
      isInside = false;

      hoverTimeout = setTimeout(() => {
        if (!isInside) {
          if (hoverTl.isActive()) {
            hoverTl.progress(1, false);
          }
          leaveTl.restart();
          isHovered = false;
        }
      }, 50);
    };

    if (!isMobile) {
      const hoverTargets = [btn];
      if (useThumbnailHover && thumbnail) hoverTargets.push(thumbnail);

      hoverTargets.forEach((target) => {
        target.addEventListener("mouseenter", handleEnter);
        target.addEventListener("mouseleave", handleLeave);

        window.pageSpecificListeners.push(
          { element: target, event: "mouseenter", handler: handleEnter },
          { element: target, event: "mouseleave", handler: handleLeave }
        );
      });
    } else {
      const handleClick = () => {
        handleEnter();
      };

      btn.addEventListener("click", handleClick);

      window.pageSpecificListeners.push({
        element: btn,
        event: "click",
        handler: handleClick,
      });
    }
  }
function setupButton(
  btn,
  {
    introTrigger = btn,
    reverseOnLeaveBack = false,
    start = "top 85%",
    startMobile = "top 88%",
    introOnScroll = true,
    bindHoverOnly = false,
  } = {}
) {
  if (!btn) return;

  const border = btn.querySelector(".btn-border");
  const label = btn.querySelector(".btn-label");
  const btnDot = btn.querySelector(".btn");
  const arrow = btn.querySelector(".btnn-ar") || btn.querySelector(".btn-ar");

  if (!border || !label) {
    console.warn(
      "setupPrimaryButtons: .btn-border o .btn-label mancanti",
      btn
    );
    return;
  }

  const isMobile = isMobileBP();
  const speedFactor = isMobile ? 0.85 : 1;

  const D_BORDER = 0.35 * speedFactor;
  const D_LABEL = 0.45 * speedFactor;
  const D_DOT_INTRO = 0.4 * speedFactor;

  const D_FILL_HOVER = 0.35 * speedFactor;
  const D_MIX_HOVER = 0.15 * speedFactor;
  const D_DOT_HOVER = 0.35 * speedFactor;
  const D_ARROW_HOVER = 0.3 * speedFactor;

  const D_MIX_OUT = 0.15 * speedFactor;
  const D_SCALE_OUT = 0.3 * speedFactor;
  const D_DOT_OUT = 0.3 * speedFactor;
  const D_ARROW_OUT = 0.3 * speedFactor;

  const OFFSET_LABEL = 0.22 * speedFactor;
  const OFFSET_DOT_IN = 0.3 * speedFactor;
  const OFFSET_DOT_H = 0.15 * speedFactor;
  const OFFSET_ARROW_H = 0.25 * speedFactor;
  const OFFSET_MIX_OUT = 0.15 * speedFactor;

  // ==== Stati iniziali intro SOLO se non è bindHoverOnly ================
  if (!bindHoverOnly) {
    gsap.set(border, { "--clip-x": "50%" });
    gsap.set(label, {
      rotationX: 90,
      yPercent: 35,
      opacity: 0,
      transformOrigin: "50% 50%",
      transformPerspective: 600,
      force3D: true,
    });

    gsap.set(btn, {
      "--btn-scale": 0,
      "--btn-mix": "0%",
      "--btn-origin-y": "100%",
    });

    if (arrow) {
      gsap.set(arrow, {
        x: 0,
        y: 0,
        scale: 0,
        transformOrigin: "bottom left",
      });
    }
  }

  // ==== TL ingresso su scroll =========================================
  const introTl = gsap.timeline({ paused: true });

  if (!bindHoverOnly) {
    introTl
      .to(border, {
        duration: D_BORDER,
        ease: "power2.out",
        "--clip-x": "0%",
      })
      .to(
        label,
        {
          rotationX: 0,
          yPercent: 0,
          opacity: 1,
          duration: D_LABEL,
          ease: "power2.out",
          force3D: true,
        },
        OFFSET_LABEL
      );

    if (btnDot) {
      introTl.to(
        btnDot,
        {
          scale: 0.3,
          duration: D_DOT_INTRO,
          ease: "back.out(1.6)",
        },
        "-=" + OFFSET_DOT_IN
      );
    }

    if (window.ScrollTrigger && introTrigger && introOnScroll) {
      const stConfig = {
        trigger: introTrigger,
        start: isMobile ? startMobile : start,
        onEnter: () => introTl.play(),
      };

      if (reverseOnLeaveBack) {
        stConfig.onLeaveBack = () => introTl.reverse();
      }

      ScrollTrigger.create(stConfig);
    }
  }

  // ==== Hover / Click IN / OUT =======================================
  const hoverTl = gsap.timeline({ paused: true });
  const leaveTl = gsap.timeline({ paused: true });

  let hoverTimeout;
  let isHovered = false;
  let isInside = false;

  hoverTl
    .set(
      btn,
      {
        "--btn-origin-y": "100%",
      },
      0
    )
    .to(
      btn,
      {
        "--btn-scale": 1,
        duration: D_FILL_HOVER,
        ease: "power2.out",
      },
      0
    )
    .to(
      btn,
      {
        "--btn-mix": "100%",
        duration: D_MIX_HOVER,
        ease: "power2.in",
      },
      0
    );

  if (btnDot) {
    hoverTl.to(
      btnDot,
      {
        scale: 0.9,
        duration: D_DOT_HOVER,
        ease: "power2.out",
      },
      OFFSET_DOT_H
    );
  }

  if (arrow) {
    hoverTl.to(
      arrow,
      {
        scale: 1,
        duration: D_ARROW_HOVER,
        ease: "power2.out",
        transformOrigin: "bottom left",
      },
      OFFSET_ARROW_H
    );
  }

  leaveTl
    .set(
      btn,
      {
        "--btn-origin-y": "0%",
      },
      0
    )
    .to(
      btn,
      {
        "--btn-mix": "0%",
        duration: D_MIX_OUT,
        ease: "power2.in",
      },
      OFFSET_MIX_OUT
    )
    .to(
      btn,
      {
        "--btn-scale": 0,
        duration: D_SCALE_OUT,
        ease: "power2.in",
      },
      0
    );

  if (btnDot) {
    leaveTl.to(
      btnDot,
      {
        scale: 0.3,
        duration: D_DOT_OUT,
        ease: "power2.in",
      },
      0
    );
  }

  if (arrow) {
    leaveTl.to(
      arrow,
      {
        scale: 0,
        duration: D_ARROW_OUT,
        ease: "power2.in",
        transformOrigin: "top right",
      },
      0
    );
  }

  const handleEnter = () => {
    clearTimeout(hoverTimeout);
    isInside = true;

    if (leaveTl.isActive()) {
      leaveTl.progress(1, false);
    }

    if (!isHovered) {
      hoverTl.restart();
      isHovered = true;
    }
  };

  const handleLeave = () => {
    isInside = false;

    hoverTimeout = setTimeout(() => {
      if (!isInside) {
        if (hoverTl.isActive()) {
          hoverTl.progress(1, false);
        }
        leaveTl.restart();
        isHovered = false;
      }
    }, 50);
  };

  if (!isMobile) {
    btn.addEventListener("mouseenter", handleEnter);
    btn.addEventListener("mouseleave", handleLeave);

    window.pageSpecificListeners.push(
      { element: btn, event: "mouseenter", handler: handleEnter },
      { element: btn, event: "mouseleave", handler: handleLeave }
    );
  } else {
    const handleClick = () => {
      handleEnter();
    };

    btn.addEventListener("click", handleClick);

    window.pageSpecificListeners.push({
      element: btn,
      event: "click",
      handler: handleClick,
    });
  }
}

  // 1) Bottoni generici (escludo il project-hero)
  const genericButtons = document.querySelectorAll(
    '.btn-primary[data-btn="button"]:not([data-intro="project-hero"])'
  );
  genericButtons.forEach((btn) => {
    setupButton(btn, { introTrigger: btn });
  });
  // 2) Project button (mobile), escludo comunque il project-hero
  const projectButtons = document.querySelectorAll(
    '.btn-primary[data-btn="project"]:not([data-intro="project-hero"])'
  );

  projectButtons.forEach((btn) => {
    const isMobile = isMobileBP();

    if (!isMobile) {
      // Desktop: usa la vecchia showcaseProjectButton esterna
      return;
    }
    setupButton(btn, {
      introTrigger: btn,
      reverseOnLeaveBack: true,
    });
  });

  // 3) Button hero progetto: NESSUN ScrollTrigger, ma hover/click sì
const projectHeroBtn = document.querySelector(
  '.btn-primary[data-intro="project-hero"]'
);
if (projectHeroBtn) {
  setupButton(projectHeroBtn, {
    introTrigger: null,
    introOnScroll: false,
    bindHoverOnly: true,
  });
}

  const slideButtons = document.querySelectorAll(
    '.btn-primary[data-btn="slide"]'
  );

  slideButtons.forEach((btn) => {
    setupSlideButton(btn);
  });

  const catButtons = document.querySelectorAll('.btn-primary[data-btn="cat"]');

  catButtons.forEach((btn) => {
    setupSlideButton(btn, { useThumbnailHover: false });
  });
}

// Accordion 
function initProcessAccordion() {
  if (!window.gsap) return null;

  const { gsap } = window;

  if (!Array.isArray(window.pageSpecificListeners)) {
    window.pageSpecificListeners = [];
  }

  const section = document.querySelector(".section_process");
  if (!section) {
    console.warn("initProcessAccordion: .section_process non trovata");
    return null;
  }

  const items = gsap.utils.toArray(".accordion_path", section);
  if (!items.length) return null;

  const entries = [];
  let openEntry = null;
  let firstInitiallyOpenFound = false;

  function createButtonTimelines(button) {
    const hoverDiv = button.querySelector(".btn-bg");
    const arrowHover = button.querySelector(".cta-ar-h");
    const arrowDefault = button.querySelector(".cta-ar");

    if (!hoverDiv || !arrowHover || !arrowDefault) {
      return null;
    }

    gsap.set([hoverDiv, arrowHover, arrowDefault], {
      transformOrigin: "50% 50%",
    });

    const enterTl = gsap.timeline({ paused: true });
    const leaveTl = gsap.timeline({ paused: true });

    enterTl
      .to(
        [hoverDiv, arrowHover],
        {
          scale: 1,
          duration: 0.35,
          ease: "power2.out",
          stagger: 0.05,
          overwrite: "auto",
          transformOrigin: "50% 50%",
        },
        0,
      )
      .to(
        arrowDefault,
        {
          scale: 0,
          duration: 0.25,
          ease: "power2.out",
          overwrite: "auto",
          transformOrigin: "50% 50%",
        },
        0.2,
      );

    leaveTl
      .to(
        arrowDefault,
        {
          scale: 1,
          duration: 0.2,
          ease: "power2.in",
          overwrite: "auto",
          transformOrigin: "50% 50%",
        },
        0,
      )
      .to(
        [hoverDiv, arrowHover],
        {
          scale: 0,
          duration: 0.3,
          ease: "power2.out",
          stagger: 0.05,
          overwrite: "auto",
          transformOrigin: "50% 50%",
        },
        0.2,
      );

    return {
      hoverDiv,
      arrowHover,
      arrowDefault,
      enterTl,
      leaveTl,
    };
  }

  function setButtonState(entry, isOpen) {
    if (!entry?.btnFx) return;

    const { hoverDiv, arrowHover, arrowDefault, enterTl, leaveTl } =
      entry.btnFx;

    if (isOpen) {
      if (leaveTl.isActive()) leaveTl.progress(1, false);
      gsap.set([hoverDiv, arrowHover], { scale: 1 });
      gsap.set(arrowDefault, { scale: 0 });
    } else {
      if (enterTl.isActive()) enterTl.progress(1, false);
      gsap.set(arrowDefault, { scale: 1 });
      gsap.set([hoverDiv, arrowHover], { scale: 0 });
    }
  }

  items.forEach((item, index) => {
    if (item.dataset.processAccordionBound === "1") return;
    item.dataset.processAccordionBound = "1";

    const button = item.querySelector(".btn-simple.accordion");
    const panel = item.querySelector(".acc_wrapper");

    if (!button || !panel) {
      console.warn("initProcessAccordion: elementi mancanti", {
        item,
        button,
        panel,
      });
      return;
    }

    if (button.tagName === "BUTTON" && !button.getAttribute("type")) {
      button.setAttribute("type", "button");
    }

    const panelId = panel.id || `process-acc-panel-${index + 1}`;
    const buttonId = button.id || `process-acc-trigger-${index + 1}`;

    panel.id = panelId;
    button.id = buttonId;

    button.setAttribute("aria-controls", panelId);
    panel.setAttribute("aria-labelledby", buttonId);

    let wantsOpen =
      item.classList.contains("is-open") ||
      button.getAttribute("aria-expanded") === "true";

    if (wantsOpen && firstInitiallyOpenFound) {
      wantsOpen = false;
    }
    if (wantsOpen) firstInitiallyOpenFound = true;

    button.setAttribute("aria-expanded", wantsOpen ? "true" : "false");
    panel.setAttribute("aria-hidden", wantsOpen ? "false" : "true");

    gsap.set(panel, {
      height: wantsOpen ? "auto" : 0,
      overflow: "hidden",
    });

    const entry = {
      item,
      button,
      panel,
      isOpen: wantsOpen,
      btnFx: createButtonTimelines(button),
    };

    setButtonState(entry, wantsOpen);

    if (wantsOpen) {
      openEntry = entry;
    }

    entries.push(entry);
  });

  function openAccordion(entry) {
    if (!entry || entry.isOpen) return;

    if (openEntry && openEntry !== entry) {
      closeAccordion(openEntry);
    }

    entry.isOpen = true;
    openEntry = entry;

    entry.button.setAttribute("aria-expanded", "true");
    entry.panel.setAttribute("aria-hidden", "false");
    entry.item.classList.add("is-open");

    if (entry.btnFx) {
      if (entry.btnFx.leaveTl.isActive()) {
        entry.btnFx.leaveTl.progress(1, false);
      }
      entry.btnFx.enterTl.restart();
    }

    gsap.killTweensOf(entry.panel);

    const startHeight = entry.panel.offsetHeight;
    gsap.set(entry.panel, { height: "auto" });
    const endHeight = entry.panel.offsetHeight;
    gsap.set(entry.panel, { height: startHeight });

    gsap.to(entry.panel, {
      height: endHeight,
      duration: 0.6,
      ease: "power2.inOut",
      overwrite: "auto",
      onComplete: () => {
        if (entry.isOpen) {
          gsap.set(entry.panel, { height: "auto" });
        }
      },
    });
  }

  function closeAccordion(entry) {
    if (!entry || !entry.isOpen) return;

    entry.isOpen = false;
    if (openEntry === entry) openEntry = null;

    entry.button.setAttribute("aria-expanded", "false");
    entry.panel.setAttribute("aria-hidden", "true");
    entry.item.classList.remove("is-open");

    if (entry.btnFx) {
      if (entry.btnFx.enterTl.isActive()) {
        entry.btnFx.enterTl.progress(1, false);
      }
      entry.btnFx.leaveTl.restart();
    }

    gsap.killTweensOf(entry.panel);

    const currentHeight = entry.panel.offsetHeight;
    gsap.set(entry.panel, { height: currentHeight });

    gsap.to(entry.panel, {
      height: 0,
      duration: 0.5,
      ease: "power2.inOut",
      overwrite: "auto",
    });
  }

  function toggleAccordion(entry) {
    if (!entry) return;
    if (entry.isOpen) {
      closeAccordion(entry);
    } else {
      openAccordion(entry);
    }
  }

  entries.forEach((entry) => {
    const handleClick = () => toggleAccordion(entry);

    entry.button.addEventListener("click", handleClick);

    window.pageSpecificListeners.push({
      element: entry.button,
      event: "click",
      handler: handleClick,
    });
  });

  return {
    open: openAccordion,
    close: closeAccordion,
    toggle: toggleAccordion,
    get entries() {
      return entries;
    },
  };
}

window.footerManager = window.footerManager || {
  observer: null,
  footer: null,
  footerLayer: null,
  footerLetter: null,
  imgFooter: null,
  triggerEl: null,
  hasPlayed: false,

  init: function () {
    this.footer = document.getElementById("footer") || null;
    if (!this.footer) return false;

    this.footerLayer = this.footer.querySelectorAll(".layer-foot");
    this.footerLetter = this.footer.querySelectorAll(".foot-l-svg.letter");
    this.imgFooter = this.footer.querySelector(".img-foot");

    // trigger = .foot-animation se esiste, altrimenti il footer
    this.triggerEl =
      this.footer.querySelector(".foot-animation") || this.footer;

    return true;
  },

  clearProps: function () {
    if (!this.footer) return;

    const isDesktop = !!window.bp?.is?.("smMin"); // >= 480
    const isMobile = !!window.bp?.is?.("xsOnly"); // <= 479

    this.hasPlayed = false;

    if (isDesktop) {
      if (this.footerLayer?.length) {
        gsap.set(this.footerLayer, { clearProps: "transform,opacity" });
      }
      if (this.footerLetter?.length) {
        gsap.set(this.footerLetter, { clearProps: "transform,opacity" });
      }
    } else if (isMobile && this.imgFooter) {
      gsap.set(this.imgFooter, { clearProps: "transform,opacity" });
    }
  },

  setupObserver: function () {
    if (!("IntersectionObserver" in window)) {
      // fallback: se non supportato, gioca subito
      this.playAnimation();
      return;
    }

    if (!this.triggerEl) return;

    // disconnetti vecchio observer
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }

    const isDesktop = !!window.bp?.is?.("smMin"); // >= 480
    const isMobile = !!window.bp?.is?.("xsOnly"); // <= 479

    // Desktop: banda solo nell'ULTIMO 25% dal bottom (top a 75% viewport)
    const rootMarginDesktop = "-75% 0px 0px 0px";

    // Mobile: per ora stessa logica (puoi tararla dopo, es. -60% per un 40% finale)
    const rootMarginMobile = "-75% 0px 0px 0px";

    const options = {
      root: null,
      rootMargin: isDesktop ? rootMarginDesktop : rootMarginMobile,
      threshold: 0, // appena un pixel entra in quella banda in basso
    };

    this.observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        if (this.hasPlayed) {
          observer.unobserve(entry.target);
          return;
        }

        this.playAnimation();
        this.hasPlayed = true;
        observer.unobserve(entry.target);
      });
    }, options);

    this.observer.observe(this.triggerEl);
  },

  playAnimation: function () {
    const isDesktop = !!window.bp?.is?.("smMin");
    const isMobile = !!window.bp?.is?.("xsOnly");

    if (isDesktop) {
      const layer = this.footerLayer;
      const letters = this.footerLetter;
      if (!layer?.length || !letters?.length) return;

      gsap
        .timeline()
        .to(layer, {
          y: 0,
          duration: 0.8,
          stagger: { amount: 0.25 },
          ease: "power2.out",
        })
        .to(
          letters,
          {
            rotateY: 0,
            duration: 0.8,
            stagger: { amount: 0.25 },
            ease: "power1.out",
          },
          0,
        );
    } else if (isMobile && this.imgFooter) {
      gsap.to(this.imgFooter, {
        y: 0,
        rotateY: 0,
        duration: 0.8,
        ease: "power2.out",
      });
    }
  },

  // API da usare al boot e negli after di Barba
  refresh: function () {
    if (!this.init()) return;
    this.clearProps();
    this.setupObserver();
  },
};



Object.assign(window, {
  setupPrimaryButtons,
});

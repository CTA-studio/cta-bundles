// ============================================================
// Custom Cursor — GLOBAL OBJECT (Barba-safe)
// ============================================================
window.customCursor =
  window.customCursor ||
  (function () {
    const api = {};

    api.state = {
      bound: false, // global listeners bind una sola volta
      cursorVisible: true,
      current: "normal", // "normal" | "grab" | "grabbing"
      // cache elementi
      cursor: null,
      cursorNormal: null,
      cursorGrab: null,
      cursorGrabbing: null,
      pulse: null,
      // handler globali
      handlePointerMove: null,
      onDocMouseLeave: null,
      onDocMouseEnter: null,
      onWindowMouseOut: null,
      onBlur: null,
      onFocus: null,
      onVisibility: null,
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
        return;
      }
    };

    api.reset = function () {
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

    // ---------- show/hide + snap ----------
    api._snapToEvent = function (e) {
      if (!e) return;
      const c = api.state.cursor;
      if (!c) return;

      gsap.killTweensOf(c);
      gsap.set(c, { x: e.clientX, y: e.clientY });
    };

    api._show = function (e) {
      api._snapToEvent(e);
      if (api.state.cursorVisible) return;
      api.state.cursorVisible = true;

      const c = api.state.cursor;
      if (!c) return;
      gsap.to(c, {
        autoAlpha: 1,
        duration: 0.12,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    api._hide = function () {
      if (!api.state.cursorVisible) return;
      api.state.cursorVisible = false;

      const c = api.state.cursor;
      if (!c) return;
      gsap.to(c, {
        autoAlpha: 0,
        duration: 0.12,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    // ============================================================
    // 1) INIT GLOBAL (una volta sola)
    // ============================================================
    api.initGlobal = function () {
      if (!api.shouldEnable()) {
        document.documentElement.classList.remove("cursor-on");
        return;
      }

      document.documentElement.classList.add("cursor-on");

      // cache iniziale
      if (!api.cacheElements()) {
        console.warn("customCursor: elementi non trovati (initGlobal)");
        return;
      }

      if (api.state.bound) return;
      api.state.bound = true;

      // stato coerente
      api.state.cursorVisible = true;
      if (api.state.cursor) {
        gsap.set(api.state.cursor, { autoAlpha: 1 });
      }

      // handler movimento: niente più quickTo, usiamo gsap.to
      api.state.handlePointerMove = (e) => {
        const c = api.state.cursor;
        if (!c) return;
        gsap.to(c, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.2,
          ease: "power2.out",
          overwrite: "auto",
        });
      };

      api.state.onDocMouseLeave = () => api._hide();
      api.state.onDocMouseEnter = (e) => api._show(e);

      api.state.onWindowMouseOut = (e) => {
        if (!e.relatedTarget && !e.toElement) api._hide();
      };

      api.state.onBlur = () => api._hide();
      api.state.onFocus = () => {
        if (!api.state.cursorVisible) {
          api.state.cursorVisible = true;
          const c = api.state.cursor;
          if (!c) return;
          gsap.to(c, {
            autoAlpha: 1,
            duration: 0.12,
            ease: "power2.out",
            overwrite: "auto",
          });
        }
      };

      api.state.onVisibility = () => {
        if (document.hidden) api._hide();
        else api.state.onFocus();
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
        const target = e.target.closest(interactiveSelector);
        if (!target) return;
        if (target.contains(e.relatedTarget)) return;
        animateInteractiveEnter();
      };

      api.state.handlePointerOut = (e) => {
        const target = e.target.closest(interactiveSelector);
        if (!target) return;
        if (target.contains(e.relatedTarget)) return;
        animateInteractiveLeave();
      };

      // GLOBAL listeners (non entrano nel cleanup)
      window.addEventListener("pointermove", api.state.handlePointerMove);
      document.addEventListener("mouseleave", api.state.onDocMouseLeave);
      document.addEventListener("mouseenter", api.state.onDocMouseEnter);
      window.addEventListener("mouseout", api.state.onWindowMouseOut);
      window.addEventListener("blur", api.state.onBlur);
      window.addEventListener("focus", api.state.onFocus);
      document.addEventListener("visibilitychange", api.state.onVisibility);
      document.addEventListener("pointerover", api.state.handlePointerOver);
      document.addEventListener("pointerout", api.state.handlePointerOut);
    };

    // ============================================================
    // 2) REFRESH (dopo ogni transizione Barba)
    // ============================================================
    api.refresh = function () {
      if (!api.shouldEnable()) {
        document.documentElement.classList.remove("cursor-on");
        return;
      }

      document.documentElement.classList.add("cursor-on");

      // rinfresca refs DOM (importante con Barba)
      if (!api.cacheElements()) {
        console.warn("customCursor: elementi non trovati (refresh)");
        return;
      }

      // riallinea stato visivo
      api.reset();

      // rebind swiper per la nuova pagina
      api.bindSwiperPage();
      api.bindRailPage();
    };

    // ============================================================
    // 3-A) PAGE-SPECIFIC SWIPER (si pulisce con pageSpecificListeners)
    // ============================================================
    api.bindSwiperPage = function () {
      if (!api.shouldEnable()) return;
      if (
        !api.state.cursorNormal ||
        !api.state.cursorGrab ||
        !api.state.cursorGrabbing
      )
        return;

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
    // 3-B) Slider Custom (si pulisce con pageSpecificListeners)
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
    // 4) CLEANUP PAGE (solo roba page-specific)
    // ============================================================
    api.cleanupPage = function () {
      if (Array.isArray(window.pageSpecificListeners)) {
        window.pageSpecificListeners.forEach(({ element, event, handler }) => {
          element?.removeEventListener?.(event, handler);
        });
      }
      window.pageSpecificListeners = [];
      api.reset(); // stato coerente per la transizione
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
        "headerAnimation.burgerHover: elementi mancanti per l'hover del burger"
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
        0
      )
      .to(
        label,
        {
          x: -5,
          duration: 0.35,
          ease: "power2.out",
        },
        "<"
      )
      .to(
        lines,
        {
          scale: 1,
          duration: 0.4,
          ease: "power2.out",
          transformOrigin: "center center",
        },
        0.1
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
        0
      )
      .to(
        burgerElements.burgerLabel,
        {
          "--burger-x": "100%",
          duration: 0.6,
          ease: "power2.out",
        },
        0
      )
      .to(
        burgerElements.lines.top,
        { scale: 1, y: 3, rotationZ: -45, duration: 0.3, ease: "power1.out" },
        "<"
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
        "<"
      );

    resetTl
      .set(
        label,
        {
          opacity: 1,
          x: 0,
          rotateY: 0,
        },
        0
      )
      .to(
        burgerElements.burgerLabel,
        {
          "--burger-x": "0%",
          duration: 0.6,
          ease: "power2.out",
        },
        0.1
      )
      .to(
        lines,
        { y: 0, rotationZ: 0, duration: 0.3, ease: "power1.out" },
        "<"
      );

    if (!isMobile) {
      resetTl.to(
        burgerElements.burgerClose,
        {
          scale: 0.3,
          ease: "back.out(2)",
          duration: 0.2,
        },
        0.1
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
        0.1
      );
    }

    resetTl.to(
      burgerElements.logoNav,
      { y: "0%", duration: 0.4, ease: "power2.out" },
      "-=0.2"
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
        0
      )
      .to(
        dotLink,
        {
          scale: 0.5,
          duration: 0.5,
          ease: "power2.out",
          stagger: { each: 0.1, from: "end" },
        },
        "-=0.4"
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
        "<"
      )
      .to(
        img,
        {
          y: 0,
          rotateY: 0,
          duration: 1,
          ease: "power3.inOut",
        },
        0
      )
      .to(
        contact,
        {
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
        },
        0.5
      )
      .to(
        ass,
        {
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
        },
        0.6
      )
      .to(
        logoMenuRect,
        {
          "--ov-clip-top": "0%", // si apre dal basso verso l'alto
          "--ov-clip-bottom": "0%",
          duration: 0.4,
          ease: "power2.out",
        },
        0.6
      );

    this.closeTL
      .to(
        nav,
        {
          "--menu-clip-bottom": "100%",
          duration: 0.8,
          ease: "power3.inOut",
        },
        0
      )
      .to(
        logoMenuRect,
        {
          "--ov-clip-top": "0%",
          "--ov-clip-bottom": "100%",
          duration: 0.35,
          ease: "power2.out",
        },
        0.5
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
        0.5
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
        0.5
      )
      .to(
        header.burgerBlock,
        {
          scale: 0,
          duration: 0.4,
          ease: "power2.out",
        },
        "<"
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
        "scrollLock non è definito: impossibile inizializzare i controlli scroll."
      );
      return;
    }

    const { block, unblock, isLocked } = window.scrollLock;

    const blockScrollButtons = document.querySelectorAll("[data-block-scroll]");
    const unblockScrollButtons = document.querySelectorAll(
      "[data-unblock-scroll]"
    );
    const toggleScrollButtons = document.querySelectorAll(
      "[data-toggle-scroll]"
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
        ".dropdown-wrap-text-menu-link"
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
        } = {}
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
        { element: container, event: "touchend", handler: onTouchEnd }
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
  const SplitText =
    (gsap.plugins && gsap.plugins.SplitText) || window.SplitText;

  if (!SplitText) {
    console.warn("setupPrimaryButtons: SplitText non disponibile");
    return;
  }

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

    // SplitText: splitta solo se non già splittato
    if (!label.querySelector(".btn-char")) {
      new SplitText(label, {
        type: "chars",
        charsClass: "btn-char",
      });
    }

    const chars = label.querySelectorAll(".btn-char");
    if (!chars.length) {
      console.warn(
        "setupPrimaryButtons: nessun .btn-char trovato dopo SplitText",
        btn
      );
      return;
    }

    const isMobile = isMobileBP();
    const speedFactor = isMobile ? 0.85 : 1;

    // === Durate allineate a showcaseProjectButton ======================
    const D_BORDER = 0.35 * speedFactor;
    const D_CHARS = 0.35 * speedFactor;
    const D_DOT_INTRO = 0.4 * speedFactor;

    const D_FILL_HOVER = 0.35 * speedFactor;
    const D_MIX_HOVER = 0.15 * speedFactor;
    const D_DOT_HOVER = 0.35 * speedFactor;
    const D_ARROW_HOVER = 0.3 * speedFactor;

    const D_MIX_OUT = 0.15 * speedFactor;
    const D_SCALE_OUT = 0.3 * speedFactor;
    const D_DOT_OUT = 0.3 * speedFactor;
    const D_ARROW_OUT = 0.3 * speedFactor;

    const OFFSET_CHARS = 0.25 * speedFactor;
    const OFFSET_DOT_IN = 0.3 * speedFactor;
    const OFFSET_DOT_H = 0.15 * speedFactor;
    const OFFSET_ARROW_H = 0.25 * speedFactor;
    const OFFSET_MIX_OUT = 0.15 * speedFactor;

    // ==== Stati iniziali ================================================
    gsap.set(border, { "--clip-x": "50%" });
    gsap.set(chars, { yPercent: 100, opacity: 0 });
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

    // ==== TL ingresso su scroll ========================================
    const introTl = gsap.timeline({ paused: true });

    introTl
      .to(border, {
        duration: D_BORDER,
        ease: "power2.out",
        "--clip-x": "0%", // da 50% a 0%
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

    // ==== Hover / Click IN / OUT =======================================
    const hoverTl = gsap.timeline({ paused: true });
    const leaveTl = gsap.timeline({ paused: true });

    let hoverTimeout;
    let isHovered = false;
    let isInside = false;

    // --- IN -------------------------------------------------------------
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

    // --- OUT ------------------------------------------------------------
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
      // Desktop: hover
      btn.addEventListener("mouseenter", handleEnter);
      btn.addEventListener("mouseleave", handleLeave);

      window.pageSpecificListeners.push(
        { element: btn, event: "mouseenter", handler: handleEnter },
        { element: btn, event: "mouseleave", handler: handleLeave }
      );
    } else {
      // Mobile: SOLO click → solo animazione di enter
      const handleClick = () => {
        // niente preventDefault: Barba gestisce il routing
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
      introTrigger: null, // nessun trigger di scroll
      introOnScroll: false, //  blocchiamo la creazione del ScrollTrigger
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
          0
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

// Pagina Contatti
async function setupContactLinkButtons() {
  if (!window.gsap) return;

  const { gsap } = window;
  const SplitText =
    (gsap.plugins && gsap.plugins.SplitText) || window.SplitText;

  if (document.fonts?.ready) {
    await document.fonts.ready;
  }

  if (!Array.isArray(window.pageSpecificListeners)) {
    window.pageSpecificListeners = [];
  }

  const MQ = {
    hoverFine: window.matchMedia("(hover: hover) and (pointer: fine)"),
    anyCoarse: window.matchMedia("(any-pointer: coarse)"),
  };

  const canHover = () => MQ.hoverFine.matches;
  const isTouch = () => MQ.anyCoarse.matches;
  const isDesktop = !!window.bp?.is?.("lgUp");

  const contactWrappers = document.querySelectorAll(".contact_link_wrapper");
  if (!contactWrappers.length) return;

  contactWrappers.forEach((wrapper) => {
    const contactLink = wrapper.querySelector(".contact_link");
    if (!contactLink) return;

    if (contactLink.dataset.contactBtnBound === "1") return;
    contactLink.dataset.contactBtnBound = "1";

    const button = contactLink.querySelector(".btn-simple");
    const sub = wrapper.querySelector(".contact_item_sub");
    if (!button) return;

    const hoverDiv = button.querySelector(".btn-bg");
    const arrowHover = button.querySelector(".cta-ar-h");
    const arrowDefault = button.querySelector(".cta-ar");

    if (!hoverDiv || !arrowHover || !arrowDefault) {
      console.warn("setupContactLinkButtons: elementi interni mancanti", {
        contactLink,
        button,
        hoverDiv,
        arrowHover,
        arrowDefault,
      });
      return;
    }

    const enterTl = gsap.timeline({ paused: true });
    const leaveTl = gsap.timeline({ paused: true });

    let hoverTimeout;
    let isHovered = false;
    let isInside = false;

    enterTl
      .to(hoverDiv, {
        scale: 1,
        duration: 0.4,
        ease: "power2.out",
      })
      .to(
        arrowHover,
        {
          scale: 1,
          duration: 0.4,
          ease: "power2.out",
        },
        0.2
      )
      .to(
        arrowDefault,
        {
          scale: 0,
          duration: 0.2,
          ease: "power2.out",
        },
        0
      );

    leaveTl
      .to([arrowHover, hoverDiv], {
        scale: 0,
        duration: 0.4,
        ease: "power2.out",
        stagger: 0.1,
        transformOrigin: "top right",
      })
      .to(
        arrowDefault,
        {
          scale: 1,
          duration: 0.5,
          ease: "power2.out",
          transformOrigin: "bottom left",
        },
        0.2
      )
      .set([hoverDiv, arrowHover], { clearProps: "transformOrigin" });

    let subLines = [];
    let subEnterTl = null;
    let subLeaveTl = null;

    if (isDesktop && SplitText && sub) {
      if (!sub.dataset.contactSubSplit) {
        new SplitText(sub, {
          type: "lines",
          linesClass: "contact-sub-line",
          mask: "lines",
        });
        sub.dataset.contactSubSplit = "1";
      }

      subLines = sub.querySelectorAll(".contact-sub-line");

      if (subLines.length) {
        gsap.set(subLines, {
          yPercent: 110,
          opacity: 0,
        });

        subEnterTl = gsap.timeline({ paused: true }).to(subLines, {
          yPercent: 0,
          opacity: 1,
          duration: 0.45,
          stagger: { amount: 0.15 },
          ease: "power2.out",
        });

        subLeaveTl = gsap.timeline({ paused: true }).to(subLines, {
          yPercent: 110,
          opacity: 0,
          duration: 0.3,
          stagger: { amount: 0.1, from: "end" },
          ease: "power2.in",
        });
      }
    }

    const handleEnter = () => {
      clearTimeout(hoverTimeout);
      isInside = true;

      if (leaveTl.isActive()) {
        leaveTl.progress(1, false);
      }
      if (subLeaveTl?.isActive()) {
        subLeaveTl.progress(1, false);
      }

      if (!isHovered) {
        enterTl.restart();
        subEnterTl?.restart();
        isHovered = true;
      }
    };

    const handleLeave = () => {
      isInside = false;

      hoverTimeout = setTimeout(() => {
        if (!isInside) {
          if (enterTl.isActive()) {
            enterTl.progress(1, false);
          }
          if (subEnterTl?.isActive()) {
            subEnterTl.progress(1, false);
          }

          leaveTl.restart();
          subLeaveTl?.restart();
          isHovered = false;
        }
      }, 50);
    };

    if (isDesktop) {
      if (!canHover()) return;

      contactLink.addEventListener("mouseenter", handleEnter);
      contactLink.addEventListener("mouseleave", handleLeave);

      window.pageSpecificListeners.push(
        { element: contactLink, event: "mouseenter", handler: handleEnter },
        { element: contactLink, event: "mouseleave", handler: handleLeave }
      );

      return;
    }

    if (!isTouch()) return;

    let mobileResetTimeout;

    const handleClick = () => {
      clearTimeout(mobileResetTimeout);

      if (leaveTl.isActive()) {
        leaveTl.progress(1, false);
      }

      enterTl.restart();
      isHovered = true;

      mobileResetTimeout = setTimeout(() => {
        if (enterTl.isActive()) {
          enterTl.progress(1, false);
        }

        leaveTl.restart();
        isHovered = false;
      }, 1000);
    };

    contactLink.addEventListener("click", handleClick);

    window.pageSpecificListeners.push({
      element: contactLink,
      event: "click",
      handler: handleClick,
    });
  });
}

function setupContactFormModal() {
  if (!window.gsap) return;

  const { gsap } = window;

  if (!Array.isArray(window.pageSpecificListeners)) {
    window.pageSpecificListeners = [];
  }

  const opener = document.getElementById("form-wrap-opener");
  const modal = document.querySelector(".form_fix_wrap");
  const modalInner = modal?.querySelector(".form_modal");
  const closeBtn = document.querySelector('.form-btn[data-form="esc"]');

  if (!opener || !modal || !closeBtn) return;
  if (opener.dataset.formModalBound === "1") return;

  const openModal = () => {
    if (!modalInner) return;

    gsap.killTweensOf([modal, modalInner]);

    gsap.set(modal, {
      "--form-clip-top": "100%",
      "--form-clip-bottom": "0%",
    });

    gsap.set(modalInner, {
      opacity: 0,
      y: 100,
    });

    modal.classList.add("is-active");
    modal.setAttribute("aria-hidden", "false");
    opener.setAttribute("aria-expanded", "true");

    gsap
      .timeline({
        onComplete: () => {
          blockScroll?.();
        },
      })
      .to(
        modal,
        {
          delay: 0.2,
          "--form-clip-top": "0%",
          duration: 1,
          ease: "power3.inOut",
        },
        0
      )
      .to(
        modalInner,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
        },
        0.55
      );
  };

  const closeModal = () => {
    gsap.killTweensOf(modal);

    if (document.activeElement && modal.contains(document.activeElement)) {
      document.activeElement.blur?.();
      opener?.focus?.();
    }

    unblockScroll?.();

    gsap
      .timeline({
        onComplete: () => {
          window.MultiStepForm?.reset?.();
          modal.classList.remove("is-active");
          modal.setAttribute("aria-hidden", "true");
          opener?.setAttribute("aria-expanded", "false");
        },
      })
      .to(
        modal,
        {
          "--form-clip-bottom": "100%",
          duration: 0.8,
          ease: "power3.inOut",
        },
        0
      );
  };

  opener.dataset.formModalBound = "1";
  closeBtn.dataset.formModalCloseBound = "1";

  opener.addEventListener("click", openModal);
  closeBtn.addEventListener("click", closeModal);

  window.pageSpecificListeners.push(
    {
      element: opener,
      event: "click",
      handler: openModal,
    },
    {
      element: closeBtn,
      event: "click",
      handler: closeModal,
    }
  );

  window.openContactFormModal = openModal;
  window.closeContactFormModal = closeModal;
}

// funzioni pagina COMPETENZE
// Sticky nuovo
function expertisePanelsReveal() {
  if (!window.gsap || !window.ScrollTrigger) return;

  const { gsap, ScrollTrigger } = window;
  const SplitText =
    (gsap.plugins && gsap.plugins.SplitText) || window.SplitText;

  const bp = {
    lgUp: !!window.bp?.is?.("lgUp"),
    touchDown: !!window.bp?.is?.("touchDown"),
    phoneDown: !!window.bp?.is?.("phoneDown"),
  };

  const section = document.querySelector(".expertise_h_section");
  if (!section) {
    console.warn("expertisePanelsReveal: .expertise_h_section non trovata");
    return;
  }

  // ==================================================
  // HEADER TITLE
  // ==================================================
  const title = section.querySelector(".exp_h2_sec");

  if (title && SplitText && title.dataset.expTitleBound !== "1") {
    title.dataset.expTitleBound = "1";

    const titleSplit = new SplitText(title, {
      type: "chars",
      charsClass: "exp-h2-char",
      mask: "chars",
    });

    const chars = titleSplit.chars || [];

    if (chars.length) {
      gsap.set(chars, {
        yPercent: 100,
      });

      ScrollTrigger.create({
        trigger: section,
        start: bp.phoneDown ? "top 88%" : "top 82%",
        once: true,
        onEnter: () => {
          gsap.to(chars, {
            yPercent: 0,
            duration: 0.6,
            stagger: { amount: 0.2 },
            ease: "power2.out",
          });
        },
      });
    }
  }

  const panelZero = document.getElementById("panelZero");
  const panelFirst = document.getElementById("panelFirst");
  const panelSecond = document.getElementById("panelSecond");

  const trigPanelZero = document.getElementById("trig-panelZero");
  const trigPanelFirst = document.getElementById("trig-panelFirst");
  const trigPanelSecond = document.getElementById("trig-panelSecond");

  const imgFirst = document.getElementById("imgFirst");
  const imgSecond = document.getElementById("imgSecond");

  const imgFirstInner = imgFirst?.querySelector(".show-img-last-work") || null;
  const imgSecondInner =
    imgSecond?.querySelector(".show-img-last-work") || null;

  const allImages = gsap.utils.toArray(
    ".expertise_h_section .show-img-last-work"
  );

  const items = [
    {
      panel: panelFirst,
      trigger: trigPanelFirst,
      imgWrap: imgFirst,
      imgInner: imgFirstInner,
    },
    {
      panel: panelSecond,
      trigger: trigPanelSecond,
      imgWrap: imgSecond,
      imgInner: imgSecondInner,
    },
  ];

  if (bp.lgUp) {
    items.forEach(({ panel, trigger, imgWrap, imgInner }) => {
      if (!trigger) return;

      if (panel) {
        gsap.set(panel, {
          "--fix-clip-top": "100%",
        });

        gsap.to(panel, {
          "--fix-clip-top": "0%",
          ease: "none",
          scrollTrigger: {
            trigger,
            start: "top bottom",
            end: "top top",
            scrub: true,
          },
        });
      }

      if (imgWrap) {
        gsap.set(imgWrap, {
          "--img-clip-top": "100%",
          "--img-clip-left": "25%",
          "--img-clip-right": "25%",
        });

        gsap.to(imgWrap, {
          "--img-clip-top": "0%",
          "--img-clip-left": "0%",
          "--img-clip-right": "0%",
          ease: "none",
          scrollTrigger: {
            trigger,
            start: "top bottom",
            end: "top top",
            scrub: true,
          },
        });
      }

      if (imgInner) {
        gsap.set(imgInner, {
          scale: 1.3,
          transformOrigin: "center center",
        });

        gsap.to(imgInner, {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger,
            start: "top bottom",
            end: "top 40%",
            scrub: true,
          },
        });
      }
    });

    return;
  }

  if (bp.touchDown) {
    allImages.forEach((img) => {
      gsap.set(img, {
        scale: 1.12,
        transformOrigin: "center center",
      });

      gsap.to(img, {
        scale: 1,
        ease: "none",
        scrollTrigger: {
          trigger: img,
          start: "top bottom",
          end: "top 40%",
          scrub: true,
        },
      });
    });
  }
}

function initSkillWrapperIntro() {
  if (!window.gsap || !window.ScrollTrigger) return;

  const { gsap, ScrollTrigger } = window;
  const SplitText =
    (gsap.plugins && gsap.plugins.SplitText) || window.SplitText;

  if (!SplitText) {
    console.warn("initSkillWrapperIntro: SplitText non disponibile");
    return;
  }

  const bp = {
    lgUp: !!window.bp?.is?.("lgUp"),
    touchDown: !!window.bp?.is?.("touchDown"),
    phoneDown: !!window.bp?.is?.("phoneDown"),
  };

  const wrappers = document.querySelectorAll(".skill_wrapper");
  if (!wrappers.length) return;

  wrappers.forEach((wrap) => {
    if (wrap.dataset.skillIntroBound === "1") return;
    wrap.dataset.skillIntroBound = "1";

    const title = wrap.querySelector(".h3_serv");
    const items = wrap.querySelectorAll(".list_item");
    const numb = wrap.querySelectorAll(".list_item_h_span");

    if (!title) {
      console.warn("initSkillWrapperIntro: title mancante", { wrap, title });
      return;
    }

    const titleSplit = new SplitText(title, {
      type: "chars",
      charsClass: "skill-char",
      mask: "chars",
    });

    const chars = titleSplit.chars || [];
    if (!chars.length) return;

    gsap.set(chars, {
      yPercent: 100,
    });

    const tl = gsap.timeline({ paused: true });

    tl.to(chars, {
      yPercent: 0,
      duration: 0.6,
      stagger: { amount: 0.2 },
      ease: "power2.out",
    });

    if (bp.lgUp && items.length) {
      gsap.set(numb, {
        scale: 0,
      });
      gsap.set(items, {
        rotateX: -90,
      });

      tl.to(
        items,
        {
          rotateX: 0,
          duration: 1,
          stagger: { amount: 0.25 },
          ease: "power2.out",
        },
        0.4
      ).to(
        numb,
        {
          scale: 1,
          duration: 0.3,
          stagger: { amount: 0.25 },
          ease: "power2.out",
        },
        0.6
      );
    }

    ScrollTrigger.create({
      trigger: wrap,
      start: bp.phoneDown ? "top 88%" : "top 82%",
      once: true,
      onEnter: () => tl.play(),
    });
  });
}

function initSectionEmo() {
  if (!window.gsap || !window.ScrollTrigger) return null;

  const { gsap, ScrollTrigger } = window;
  const SplitText =
    (gsap.plugins && gsap.plugins.SplitText) || window.SplitText;

  if (!SplitText) {
    console.warn("initSectionEmo: SplitText non disponibile");
    return null;
  }

  const bp = {
    lgUp: !!window.bp?.is?.("lgUp"),
    touchDown: !!window.bp?.is?.("touchDown"),
    phoneDown: !!window.bp?.is?.("phoneDown"),
  };

  const section = document.querySelector(".section_emo");
  if (!section) {
    console.warn("initSectionEmo: .section_emo non trovata");
    return null;
  }

  if (section.dataset.emoBound === "1") return section.__emoApi || null;
  section.dataset.emoBound = "1";

  // ==================================================
  // 1) INTRO TESTO
  // ==================================================
  const paragraph = section.querySelector(".par_txt");
  let paragraphLines = [];

  if (paragraph) {
    if (!paragraph.__splitLinesFx) {
      paragraph.__splitLinesFx = new SplitText(paragraph, {
        type: "lines",
        linesClass: "emo-line",
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

  const introTl = gsap.timeline({ paused: true });

  if (paragraphLines.length) {
    introTl.to(paragraphLines, {
      yPercent: 0,
      duration: bp.touchDown ? 0.6 : 0.8,
      ease: "power1.out",
      stagger: bp.touchDown ? 0.03 : 0.06,
    });
  }

  // ==================================================
  // 2) LOOP ANIMATION
  // ==================================================
  const animationWrap = section.querySelector(".emo_animation_cont");
  const rotator = animationWrap?.querySelector(".emo_anima_circle");

  const anima1 = animationWrap?.querySelector('.emo_anima[data-anima="1"]');
  const anima2 = animationWrap?.querySelector('.emo_anima[data-anima="2"]');
  const anima3 = animationWrap?.querySelector('.emo_anima[data-anima="3"]');

  let loopTl = null;
  let io = null;
  let introSt = null;
  let isVisible = false;
  let introDone = paragraphLines.length === 0;
  let isLoopRunning = false;

  if (animationWrap && rotator && anima1 && anima2 && anima3) {
    gsap.set(rotator, {
      transformOrigin: "50% 50%",
      force3D: true,
    });

    gsap.set(anima1, {
      "--emo-clip-left": "0%",
      "--emo-clip-right": "0%",
    });

    gsap.set([anima2, anima3], {
      "--emo-clip-left": "0%",
      "--emo-clip-right": "100%",
    });

    const stepDur = bp.touchDown ? 1.26 : 1.26;
    const clipDur = bp.touchDown ? 1 : 1;
    const clipOffset = bp.touchDown ? 0.14 : 0.14;
    const inDelay = bp.touchDown ? 0.06 : 0.06;
    const gap = bp.touchDown ? 0.12 : 0.16;

    const addStep = (outEl, inEl) => {
      loopTl
        .to(
          rotator,
          {
            rotationY: "-=179.8",
            duration: stepDur,
            ease: "power3.inOut",
            force3D: true,
          },
          ">"
        )
        .to(
          outEl,
          {
            "--emo-clip-left": "100%",
            duration: clipDur,
            ease: "power1.inOut",
          },
          `<+${clipOffset}`
        )
        .to(
          inEl,
          {
            "--emo-clip-right": "0%",
            duration: clipDur,
            ease: "power1.inOut",
          },
          `<+${inDelay}`
        )
        .set(outEl, {
          "--emo-clip-left": "0%",
          "--emo-clip-right": "100%",
        })
        .to({}, { duration: gap });
    };

    loopTl = gsap.timeline({
      paused: true,
      repeat: -1,
    });

    addStep(anima1, anima2);
    addStep(anima2, anima3);
    addStep(anima3, anima1);
  }

  function startLoop() {
    if (!loopTl || isLoopRunning) return;
    loopTl.play();
    isLoopRunning = true;
  }

  function stopLoop() {
    if (!loopTl || !isLoopRunning) return;
    loopTl.pause();
    isLoopRunning = false;
  }

  function maybeStartLoop() {
    if (introDone && isVisible) startLoop();
  }

  introSt = ScrollTrigger.create({
    trigger: section,
    start: bp.phoneDown ? "top 88%" : "top 82%",
    once: true,
    onEnter: () => {
      if (paragraphLines.length) {
        introTl.play();
      } else {
        introDone = true;
        maybeStartLoop();
      }
    },
  });

  if (paragraphLines.length) {
    introTl.eventCallback("onComplete", () => {
      introDone = true;
      maybeStartLoop();
    });
  }

  if ("IntersectionObserver" in window && rotator) {
    io = new IntersectionObserver(
      (entries) => {
        isVisible = !!entries[0]?.isIntersecting;
        if (isVisible) maybeStartLoop();
        else stopLoop();
      },
      {
        rootMargin: "200px 0px",
        threshold: 0.12,
      }
    );

    io.observe(section);
  } else if (rotator) {
    // fallback semplice
    introTl.eventCallback("onComplete", () => {
      introDone = true;
      startLoop();
    });
  }

  function destroy() {
    try {
      introSt?.kill();
    } catch (_) {}

    try {
      io?.disconnect();
    } catch (_) {}

    try {
      loopTl?.kill();
    } catch (_) {}

    if (paragraph?.__splitLinesFx?.revert) {
      paragraph.__splitLinesFx.revert();
      delete paragraph.__splitLinesFx;
    }

    delete section.dataset.emoBound;
    delete section.__emoApi;
  }

  const api = {
    section,
    introTl,
    loopTl,
    startLoop,
    stopLoop,
    destroy,
  };

  section.__emoApi = api;

  if (!Array.isArray(window.pageSpecificListeners)) {
    window.pageSpecificListeners = [];
  }

  window.pageSpecificListeners.push({
    cleanup: destroy,
  });

  return api;
}

// Sliider Immagini Custom Perfetto richiede Draggable e Inertia
window.expertiseMarquee = window.expertiseMarquee || {
  _instance: null,

  _horizontalLoop(items, config = {}) {
    if (!window.gsap) return null;

    const { gsap } = window;
    const Draggable = window.Draggable || gsap.plugins?.Draggable || null;
    const InertiaPlugin =
      window.InertiaPlugin || gsap.plugins?.InertiaPlugin || null;

    items = gsap.utils.toArray(items);
    if (!items.length) return null;

    const tl = gsap.timeline({
      repeat: config.repeat ?? -1,
      paused: config.paused ?? false,
      defaults: { ease: "none" },
      onReverseComplete: () => tl.totalTime(tl.rawTime() + tl.duration() * 100),
    });

    const length = items.length;
    const startX = items[0].offsetLeft;
    const times = [];
    const widths = [];
    const xPercents = [];
    const pixelsPerSecond = (config.speed || 1) * 100;
    const snap =
      config.snap === false
        ? (v) => v
        : window.gsap.utils.snap(config.snap || 1);

    let totalWidth = 0;

    gsap.set(items, {
      xPercent: (i, el) => {
        const w = (widths[i] = parseFloat(gsap.getProperty(el, "width", "px")));
        xPercents[i] = snap(
          (parseFloat(gsap.getProperty(el, "x", "px")) / w) * 100 +
            gsap.getProperty(el, "xPercent")
        );
        return xPercents[i];
      },
    });

    gsap.set(items, { x: 0 });

    totalWidth =
      items[length - 1].offsetLeft +
      (xPercents[length - 1] / 100) * widths[length - 1] -
      startX +
      items[length - 1].offsetWidth *
        gsap.getProperty(items[length - 1], "scaleX") +
      (parseFloat(config.paddingRight) || 0);

    for (let i = 0; i < length; i++) {
      const item = items[i];
      const curX = (xPercents[i] / 100) * widths[i];
      const distanceToStart = item.offsetLeft + curX - startX;
      const distanceToLoop =
        distanceToStart + widths[i] * gsap.getProperty(item, "scaleX");

      tl.to(
        item,
        {
          xPercent: snap(((curX - distanceToLoop) / widths[i]) * 100),
          duration: distanceToLoop / pixelsPerSecond,
        },
        0
      )
        .fromTo(
          item,
          {
            xPercent: snap(
              ((curX - distanceToLoop + totalWidth) / widths[i]) * 100
            ),
          },
          {
            xPercent: xPercents[i],
            duration:
              (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
            immediateRender: false,
          },
          distanceToLoop / pixelsPerSecond
        )
        .add(`label${i}`, distanceToStart / pixelsPerSecond);

      times[i] = distanceToStart / pixelsPerSecond;
    }

    tl.times = times;
    tl.totalWidth = totalWidth;

    if (config.draggable && Draggable) {
      gsap.registerPlugin(Draggable);
      if (InertiaPlugin) gsap.registerPlugin(InertiaPlugin);

      const proxy = document.createElement("div");
      const trigger = config.trigger || items[0].parentNode;
      const wrapProgress = gsap.utils.wrap(0, 1);

      let startProgress = 0;
      let ratio = 0;

      const draggable = Draggable.create(proxy, {
        trigger,
        type: "x",
        inertia: !!InertiaPlugin,
        allowContextMenu: true,

        onPressInit() {
          gsap.killTweensOf(tl);
          startProgress = tl.progress();
          ratio = 1 / totalWidth;
          gsap.set(proxy, { x: 0 });
          config.onPressInit?.();
        },

        onDrag() {
          tl.progress(
            wrapProgress(startProgress + (this.startX - this.x) * ratio)
          );
          config.onDrag?.();
        },

        onThrowUpdate() {
          tl.progress(
            wrapProgress(startProgress + (this.startX - this.x) * ratio)
          );
          config.onThrowUpdate?.();
        },

        onRelease() {
          config.onRelease?.();
        },

        onThrowComplete() {
          config.onThrowComplete?.();
        },
      })[0];

      tl.draggable = draggable;
    }

    return tl;
  },

  init() {
    if (!window.gsap) return null;

    if (!Array.isArray(window.pageSpecificListeners)) {
      window.pageSpecificListeners = [];
    }

    const host = document.querySelector(".exp_slider");
    const rail = host?.querySelector(".exp_marquee");
    const items = rail?.querySelectorAll(".exp_marquee_item");

    if (!host || !rail || !items?.length) {
      console.warn("expertiseMarquee.init: elementi mancanti", {
        host,
        rail,
        items,
      });
      return null;
    }

    if (host.dataset.expLoopBound === "1") {
      return this._instance;
    }
    host.dataset.expLoopBound = "1";

    const gap =
      parseFloat(
        getComputedStyle(rail).columnGap || getComputedStyle(rail).gap || "0"
      ) || 0;

    let io = null;
    let resizeTimer = null;
    let loop = null;
    let lastBuildWidth = 0;

    const build = () => {
      const currentWidth = Math.round(host.getBoundingClientRect().width || 0);
      if (!currentWidth) return;

      lastBuildWidth = currentWidth;

      loop?.kill?.();
      loop?.draggable?.kill?.();

      loop = this._horizontalLoop(items, {
        paused: false,
        repeat: -1,
        speed: parseFloat(host.dataset.mqSpeed || "0.8") || 0.8,
        paddingRight: gap,
        snap: 1,
        draggable: true,
        trigger: host,

        onPressInit: () => {
          host.classList.add("is-grabbing");
          window.customCursor?.setVisualState?.("grabbing");
        },

        onRelease: () => {
          host.classList.remove("is-grabbing");
          window.customCursor?.setVisualState?.("grab");
        },

        onThrowComplete: () => {
          host.classList.remove("is-grabbing");
          window.customCursor?.setVisualState?.("grab");
        },
      });
    };

    build();

    const handleEnter = () => {
      if (host.classList.contains("is-grabbing")) return;
      window.customCursor?.setVisualState?.("grab");
    };

    const handleLeave = () => {
      if (host.classList.contains("is-grabbing")) return;
      window.customCursor?.setVisualState?.("normal");
    };

    host.addEventListener("mouseenter", handleEnter);
    host.addEventListener("mouseleave", handleLeave);

    if ("IntersectionObserver" in window) {
      io = new IntersectionObserver(
        (entries) => {
          const isVisible = !!entries[0]?.isIntersecting;
          if (isVisible) loop?.play?.();
          else loop?.pause?.();
        },
        {
          rootMargin: "200px 0px",
          threshold: 0.12,
        }
      );

      io.observe(host);
    }

    const resizeHandler = () => {
      clearTimeout(resizeTimer);

      resizeTimer = setTimeout(() => {
        const currentWidth = Math.round(
          host.getBoundingClientRect().width || 0
        );
        if (!currentWidth) return;

        if (Math.abs(currentWidth - lastBuildWidth) < 2) return;

        build();
      }, 160);
    };
    const loadHandler = () => {
      build();
    };

    window.addEventListener("load", loadHandler);

    window.addEventListener("resize", resizeHandler);

    const destroy = () => {
      clearTimeout(resizeTimer);

      window.removeEventListener("resize", resizeHandler);
      window.removeEventListener("load", loadHandler);
      host.removeEventListener("mouseenter", handleEnter);
      host.removeEventListener("mouseleave", handleLeave);

      try {
        io?.disconnect();
      } catch (_) {}

      try {
        loop?.kill?.();
      } catch (_) {}

      try {
        loop?.draggable?.kill?.();
      } catch (_) {}

      host.classList.remove("is-grabbing");
      window.customCursor?.setVisualState?.("normal");

      delete host.dataset.expLoopBound;
      delete host.__expLoopApi;
      this._instance = null;
    };

    window.pageSpecificListeners.push(
      {
        element: window,
        event: "resize",
        handler: resizeHandler,
      },
      {
        element: window,
        event: "load",
        handler: loadHandler,
      },
      {
        element: host,
        event: "mouseenter",
        handler: handleEnter,
      },
      {
        element: host,
        event: "mouseleave",
        handler: handleLeave,
      },
      {
        cleanup: destroy,
      }
    );

    this._instance = {
      get loop() {
        return loop;
      },
      rebuild: build,
      destroy,
    };

    host.__expLoopApi = this._instance;
    return this._instance;
  },

  destroy() {
    this._instance?.destroy?.();
  },
};

// Accordion dei percorsi
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
        0
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
        0.2
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
        0
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
        0.2
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
// animazioni pagina STUDIO
function initStudioMsBlocks() {
  if (!window.gsap || !window.ScrollTrigger) return;

  const { gsap, ScrollTrigger } = window;
  const SplitText =
    (gsap.plugins && gsap.plugins.SplitText) || window.SplitText;

  if (!SplitText) {
    console.warn("initStudioMsBlocks: SplitText non disponibile");
    return;
  }

  const bp = {
    lgUp: !!window.bp?.is?.("lgUp"),
    touchDown: !!window.bp?.is?.("touchDown"),
    phoneDown: !!window.bp?.is?.("phoneDown"),
  };

  const studio = document.getElementById("studio-wrapper");
  if (!studio) return;

  const msBlocks = studio.querySelectorAll(".ms-img-text-block");
  if (!msBlocks.length) return;

  msBlocks.forEach((block, index) => {
    if (block.dataset.msBlockBound === "1") return;
    block.dataset.msBlockBound = "1";

    const valueText = block.querySelector(".value-text.studio.par");
    const valueTextHighlight = block.querySelector(".value-text.title.studio");
    const pointValues = block.querySelectorAll(".point-value");
    const studioImg = block.querySelector(".studio_img");

    if (!valueText || !pointValues.length || !studioImg) {
      console.warn("initStudioMsBlocks: elementi mancanti", {
        block,
        valueText,
        valueTextHighlight,
        pointValues,
        studioImg,
      });
      return;
    }

    const valueSplit = new SplitText(valueText, {
      type: "lines",
      linesClass: "line",
    });

    const lines = valueSplit.lines || [];
    if (!lines.length) return;

    gsap.set(lines, { y: 100, opacity: 0 });
    gsap.set(pointValues, { scale: 0, opacity: 0 });

    if (valueTextHighlight) {
      gsap.set(valueTextHighlight, { y: 100, opacity: 0 });
    }

    ScrollTrigger.create({
      trigger: block,
      start: bp.phoneDown ? "top 70%" : "top 75%",
      once: true,
      onEnter: () => {
        const tl = gsap.timeline();

        tl.to(studioImg, {
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
        }).to(
          lines,
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: { amount: 0.2 },
            ease: "power2.out",
          },
          "<+=0.2"
        );

        if (valueTextHighlight) {
          tl.to(
            valueTextHighlight,
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              ease: "power2.out",
            },
            "<"
          );
        }

        tl.to(
          pointValues,
          {
            scale: 1,
            opacity: 1,
            duration: 0.6,
            stagger: 0.2,
            ease: "power2.out",
          },
          "<"
        );
      },
    });
  });
}
function initTeamCards() {
  if (!window.gsap || !window.ScrollTrigger) return;

  const { gsap, ScrollTrigger } = window;
  const SplitText =
    (gsap.plugins && gsap.plugins.SplitText) || window.SplitText;

  if (!SplitText) {
    console.warn("initTeamCards: SplitText non disponibile");
    return;
  }

  if (!Array.isArray(window.pageSpecificListeners)) {
    window.pageSpecificListeners = [];
  }

  const bp = {
    lgUp: !!window.bp?.is?.("lgUp"),
    touchDown: !!window.bp?.is?.("touchDown"),
    phoneDown: !!window.bp?.is?.("phoneDown"),
  };

  const section = document.getElementById("team_wrapper");
  if (!section) return;

  // evita doppio init se vuoi tenere anche intro title/par dentro questa funzione
  if (section.dataset.teamIntroBound !== "1") {
    section.dataset.teamIntroBound = "1";

    // ========================================
    // 1) TITLE .h3_serv → chars
    // ========================================
    const title = section.querySelector(".h3_serv");

    if (title) {
      const titleSplit = new SplitText(title, {
        type: "chars",
        charsClass: "team-char",
        mask: "chars",
      });

      const chars = titleSplit.chars || [];

      if (chars.length) {
        gsap.set(chars, { yPercent: 100 });

        ScrollTrigger.create({
          trigger: title,
          start: bp.phoneDown ? "top 70%" : "top 75%",
          once: true,
          onEnter: () => {
            gsap.to(chars, {
              yPercent: 0,
              duration: 0.6,
              stagger: { amount: 0.2 },
              ease: "power2.out",
            });
          },
        });
      }
    }

    // ========================================
    // 2) PARAGRAPH .par_txt → lines
    // ========================================
    const par = section.querySelector(".par_txt");

    if (par) {
      const parSplit = new SplitText(par, {
        type: "lines",
        linesClass: "line",
        mask: "lines",
      });

      const lines = parSplit.lines || [];

      if (lines.length) {
        gsap.set(lines, { yPercent: 100 });

        ScrollTrigger.create({
          trigger: par,
          start: bp.phoneDown ? "top 70%" : "top 75%",
          once: true,
          onEnter: () => {
            gsap.to(lines, {
              yPercent: 0,
              duration: 0.6,
              stagger: { amount: 0.2 },
              ease: "power2.out",
            });
          },
        });
      }
    }
  }

  const teamWrap = section.querySelector(".team-wrapper") || section;
  const cards = teamWrap.querySelectorAll(".team-item-wrapper");
  if (!cards.length) return;

  cards.forEach((card) => {
    if (card.dataset.teamCardBound === "1") return;
    card.dataset.teamCardBound = "1";

    const panel = card.querySelector(".panel-item-team");
    const label = panel?.querySelector(".p-team-label");
    const txtWrap = panel?.querySelector(".item-txt-team-wrap");
    const txt = txtWrap?.querySelector(".item-text-team");

    if (!panel || !label) {
      console.warn("initTeamCards: elementi mancanti", {
        card,
        panel,
        label,
        txtWrap,
        txt,
      });
      return;
    }

    let hoverEnabled = false;
    let isInside = false;
    let hoverTl = null;
    let leaveTl = null;

    if (bp.lgUp && txtWrap && txt) {
      hoverTl = gsap.timeline({ paused: true });
      leaveTl = gsap.timeline({ paused: true });

      hoverTl
        .to(
          txtWrap,
          {
            width: "auto",
            duration: 0.4,
            ease: "power1.out",
            overwrite: "auto",
          },
          0
        )
        .to(
          txt,
          {
            y: 0,
            duration: 0.35,
            ease: "power2.out",
            overwrite: "auto",
          },
          0.2
        );

      leaveTl
        .to(
          txt,
          {
            y: 50,
            duration: 0.2,
            ease: "power2.in",
            overwrite: "auto",
          },
          0
        )
        .to(
          txtWrap,
          {
            width: 0,
            duration: 0.3,
            ease: "power1.in",
            overwrite: "auto",
          },
          0.1
        );

      const playHoverIn = () => {
        if (leaveTl.isActive()) leaveTl.progress(1, false);
        hoverTl.restart();
      };

      const playHoverOut = () => {
        if (hoverTl.isActive()) hoverTl.progress(1, false);
        leaveTl.restart();
      };

      const handleEnter = () => {
        isInside = true;
        if (!hoverEnabled) return;
        playHoverIn();
      };

      const handleLeave = () => {
        isInside = false;
        if (!hoverEnabled) return;
        playHoverOut();
      };

      card.addEventListener("mouseenter", handleEnter);
      card.addEventListener("mouseleave", handleLeave);

      window.pageSpecificListeners.push(
        { element: card, event: "mouseenter", handler: handleEnter },
        { element: card, event: "mouseleave", handler: handleLeave }
      );
    }

    ScrollTrigger.create({
      trigger: panel,
      start: "top 88%",
      once: true,
      onEnter: () => {
        const tl = gsap.timeline({
          onComplete: () => {
            if (!bp.lgUp) return;
            hoverEnabled = true;

            if (isInside) {
              if (leaveTl?.isActive()) leaveTl.progress(1, false);
              hoverTl?.restart();
            }
          },
        });

        tl.to(panel, {
          "--team-clip": "0%",
          duration: bp.lgUp ? 0.7 : 0.5,
          ease: "power1.inOut",
        }).to(
          label,
          {
            y: 0,
            duration: bp.lgUp ? 0.5 : 0.4,
            ease: "power1.inOut",
          },
          "<+=0.1"
        );

        if (!bp.lgUp && txtWrap && txt) {
          tl.to(
            txtWrap,
            {
              width: "auto",
              duration: 0.4,
              ease: "power1.out",
              overwrite: "auto",
            },
            "<+=0.05"
          ).to(
            txt,
            {
              y: 0,
              duration: 0.35,
              ease: "power2.out",
              overwrite: "auto",
            },
            "<+=0.15"
          );
        }
      },
    });
  });
}
// lieve parallax quando serve
function initParallaxImages() {
  if (!window.gsap || !window.ScrollTrigger) return;

  const { gsap, ScrollTrigger } = window;

  const bp = {
    phoneDown: !!window.bp?.is?.("phoneDown"),
  };

  const wraps = gsap.utils.toArray("[data-parallax-wrap]");
  if (!wraps.length) return;

  wraps.forEach((wrap) => {
    const img = wrap.querySelector("[data-parallax-img]");
    if (!img) return;

    const baseY = parseFloat(wrap.dataset.parallaxY || "8") || 8;
    const phoneY =
      parseFloat(wrap.dataset.parallaxYPhone || "") || Math.round(baseY * 1.75);

    const y = bp.phoneDown ? phoneY : baseY;

    gsap.to(img, {
      yPercent: y,
      ease: "none",
      scrollTrigger: {
        trigger: wrap,
        start: "top bottom",
        end: "bottom top",
        scrub: 0.8,
      },
    });
  });
}

// PAGINA PROGETTI
function initProjectGridDirectionalHover() {
  if (!window.gsap) return;

  const { gsap } = window;

  if (!Array.isArray(window.pageSpecificListeners)) {
    window.pageSpecificListeners = [];
  }

  const bp = {
    lgUp: !!window.bp?.is?.("lgUp"),
    touchDown: !!window.bp?.is?.("touchDown"),
  };

  const cards = document.querySelectorAll(".proj_grid_cell");
  if (!cards.length) return;

  function getVerticalSide(e, element) {
    const rect = element.getBoundingClientRect();
    const mouseY = e.clientY - rect.top;
    return mouseY < rect.height / 2 ? "top" : "bottom";
  }

  function getStartY(side) {
    return side === "top" ? -100 : 100;
  }

  cards.forEach((card) => {
    if (card.dataset.projHoverBound === "1") return;
    card.dataset.projHoverBound = "1";

    const projItem = card.querySelector(".proj_grid_item");
    const overlay = card.querySelector(".proj_grid-overlay");
    const head = card.querySelector(".grid_cell-head");
    const desc = card.querySelector(".grid_cell-description");
    const imgWrap = card.querySelector(".project_img_wrap");
    const img = card.querySelector(".project_img_page");
    const imgName = card.querySelector(".project_img-name");
    const button = card.querySelector(".btn-simple");

    if (!overlay) return;

    // ========================================
    // DESKTOP / LGUP
    // ========================================
    if (bp.lgUp) {
      gsap.set(overlay, {
        yPercent: -100,
        force3D: true,
      });

      if (imgWrap) {
        gsap.set(imgWrap, {
          "--img-clip-top": "22%",
          "--img-clip-bot": "2%",
          "--img-clip-left": "15%",
          "--img-clip-right": "15%",
        });
      }

      if (img) {
        gsap.set(img, {
          scale: 0.85,
          transformOrigin: "50% 100%",
          force3D: true,
        });
      }

      if (imgName) {
        gsap.set(imgName, {
          y: 100,
          force3D: true,
        });
      }

      const animateIn = (side) => {
        gsap.killTweensOf([overlay, head, desc, imgWrap, img, imgName]);

        gsap.set(overlay, {
          yPercent: getStartY(side),
        });

        const tl = gsap.timeline();

        tl.to(overlay, {
          yPercent: 0,
          duration: 0.5,
          ease: "power1.out",
          overwrite: "auto",
          force3D: true,
        });

        if (head) {
          tl.to(
            head,
            {
              yPercent: -110,
              duration: 0.4,
              ease: "power1.inOut",
              overwrite: "auto",
              force3D: true,
            },
            0.2
          );
        }

        if (desc) {
          tl.to(
            desc,
            {
              yPercent: -110,
              duration: 0.3,
              ease: "power1.inOut",
              overwrite: "auto",
              force3D: true,
            },
            0.15
          );
        }

        if (imgWrap) {
          tl.to(
            imgWrap,
            {
              "--img-clip-top": "0%",
              "--img-clip-bot": "0%",
              "--img-clip-left": "0%",
              "--img-clip-right": "0%",
              duration: 0.6,
              ease: "power1.inOut",
              overwrite: "auto",
            },
            0.1
          );
        }

        if (img) {
          tl.to(
            img,
            {
              scale: 1,
              duration: 0.5,
              ease: "power1.inOut",
              overwrite: "auto",
              force3D: true,
            },
            0
          );
        }

        if (imgName) {
          tl.to(
            imgName,
            {
              y: 0,
              duration: 0.42,
              ease: "power2.out",
              overwrite: "auto",
              force3D: true,
            },
            0.18
          );
        }
      };

      const animateOut = (side) => {
        gsap.killTweensOf([overlay, head, desc, imgWrap, img, imgName]);

        const tl = gsap.timeline({
          onComplete: () => {
            gsap.set(overlay, {
              yPercent: getStartY(side),
            });
          },
        });

        if (imgName) {
          tl.to(
            imgName,
            {
              y: 100,
              duration: 0.2,
              ease: "power2.in",
              overwrite: "auto",
              force3D: true,
            },
            0
          );
        }

        if (head) {
          tl.to(
            head,
            {
              yPercent: 0,
              duration: 0.22,
              ease: "power2.in",
              overwrite: "auto",
              force3D: true,
            },
            0
          );
        }

        if (desc) {
          tl.to(
            desc,
            {
              yPercent: 0,
              duration: 0.22,
              ease: "power2.in",
              overwrite: "auto",
              force3D: true,
            },
            0.03
          );
        }

        if (imgWrap) {
          tl.to(
            imgWrap,
            {
              "--img-clip-top": "22%",
              "--img-clip-bot": "2%",
              "--img-clip-left": "15%",
              "--img-clip-right": "15%",
              duration: 0.3,
              ease: "power2.inOut",
              overwrite: "auto",
            },
            0.02
          );
        }

        if (img) {
          tl.to(
            img,
            {
              scale: 0.85,
              duration: 0.3,
              ease: "power2.inOut",
              overwrite: "auto",
              force3D: true,
            },
            0.02
          );
        }

        tl.to(
          overlay,
          {
            yPercent: getStartY(side),
            duration: 0.34,
            ease: "power2.in",
            overwrite: "auto",
            force3D: true,
          },
          0.06
        );
      };

      const onEnter = (e) => {
        const side = getVerticalSide(e, card);
        animateIn(side);
      };

      const onLeave = (e) => {
        const side = getVerticalSide(e, card);
        animateOut(side);
      };

      card.addEventListener("mouseenter", onEnter);
      card.addEventListener("mouseleave", onLeave);

      window.pageSpecificListeners.push(
        { element: card, event: "mouseenter", handler: onEnter },
        { element: card, event: "mouseleave", handler: onLeave }
      );
    }

    // ========================================
    // TOUCHDOWN
    // ========================================
    if (bp.touchDown) {
      // stato iniziale SOLO mobile
      gsap.set(overlay, {
        yPercent: 100,
        force3D: true,
      });

      let buttonEnterTl = null;

      if (button) {
        const hoverDiv = button.querySelector(".btn-bg");
        const arrowHover = button.querySelector(".cta-ar-h");
        const arrowDefault = button.querySelector(".cta-ar");

        if (hoverDiv && arrowHover && arrowDefault) {
          gsap.set(hoverDiv, {
            scale: 0,
            transformOrigin: "50% 50%",
          });
          gsap.set(arrowHover, {
            scale: 0,
            transformOrigin: "50% 50%",
          });
          gsap.set(arrowDefault, {
            scale: 1,
            transformOrigin: "50% 50%",
          });

          buttonEnterTl = gsap.timeline({ paused: true });

          buttonEnterTl
            .to(hoverDiv, {
              scale: 1,
              duration: 0.25,
              ease: "power2.out",
              overwrite: "auto",
            })
            .to(
              arrowHover,
              {
                scale: 1,
                duration: 0.25,
                ease: "power2.out",
                overwrite: "auto",
              },
              0.15
            )
            .to(
              arrowDefault,
              {
                scale: 0,
                duration: 0.2,
                ease: "power2.out",
                overwrite: "auto",
              },
              0
            );
        }
      }

      const playMobileClickIntro = () => {
        gsap.killTweensOf(overlay);

        gsap.set(overlay, {
          yPercent: 100,
        });

        gsap.to(overlay, {
          yPercent: 0,
          duration: 0.3,
          ease: "power1.out",
          overwrite: "auto",
          force3D: true,
        });

        buttonEnterTl?.restart();
      };

      const handleProjItemClick = () => {
        playMobileClickIntro();
        // niente preventDefault
        // niente timeout
        // la navigazione la gestisce Barba
      };

      if (projItem) {
        projItem.addEventListener("click", handleProjItemClick);

        window.pageSpecificListeners.push({
          element: projItem,
          event: "click",
          handler: handleProjItemClick,
        });
      }
    }
  });
}

Object.assign(window, {
  setupPrimaryButtons,
  setupContactLinkButtons,
  setupContactFormModal,
  expertisePanelsReveal,
  initSkillWrapperIntro,
  initSectionEmo,
  initProcessAccordion,
  initStudioMsBlocks,
  initTeamCards,
  initParallaxImages,
  initProjectGridDirectionalHover,
  calendar,
  initSliderCTA,
});
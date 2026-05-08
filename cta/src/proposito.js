window.propositoAnimation = window.propositoAnimation || {
  initializeSwiper: function () {
    if (!window.gsap) {
      console.warn("initializeSwiper: gsap non disponibile");
      return;
    }

    const { gsap } = window;
    const swiperContainers = document.querySelectorAll(
      ".related-articles-wrapper",
    );

    if (!swiperContainers.length) {
      return;
    }

    if (typeof Swiper === "undefined") {
      console.warn("initializeSwiper: Swiper non disponibile");
      return;
    }

    if (!Array.isArray(window.pageSpecificListeners)) {
      window.pageSpecificListeners = [];
    }

    swiperContainers.forEach((swiperContainer) => {
      const sliderParent = swiperContainer.closest(".related-articles-slider");
      if (!sliderParent) {
        return;
      }

      if (swiperContainer.dataset.relatedSwiperBound === "1") {
        return;
      }
      swiperContainer.dataset.relatedSwiperBound = "1";

      const nextButton = sliderParent.querySelector(".swiper-button-next");
      const prevButton = sliderParent.querySelector(".swiper-button-prev");

      if (!nextButton || !prevButton) {
        console.warn(
          "initializeSwiper: Pulsanti prev/next non trovati per uno slider.",
        );
        return;
      }

      const slides = swiperContainer.querySelectorAll(".swiper-slide");
      const totalSlides = slides.length;

      // Numero minimo di slide visibili contemporaneamente
      const minVisibleSlides = 6;

      // Il loop si attiva solo se ci sono più slide di quelle visibili
      const enableLoop = totalSlides > minVisibleSlides;

      const bp = window.bp;
      const isDesktop = !!bp?.is?.("lgUp");
      const isTouch = !!bp?.is?.("touchDown");

      const swiper = new Swiper(swiperContainer, {
        slidesPerView: "auto",
        slidesPerGroup: 1,
        loop: enableLoop,
        spaceBetween: 32,
        centeredSlides: false,
        speed: 700,
        effect: "slide",
        grabCursor: false,
        resistanceRatio: 0.85,
        threshold: 6,
        a11y: {
          enabled: true,
          prevSlideMessage: "Articolo precedente",
          nextSlideMessage: "Articolo successivo",
          containerRole: "region",
          containerRoleDescriptionMessage: "Carosello articoli correlati",
        },
        navigation: {
          nextEl: nextButton,
          prevEl: prevButton,
        },
      });

      const buttons = [nextButton, prevButton];

      buttons.forEach((button) => {
        const bg = button.querySelector(".btn-sfondo-avanzamento");
        const border = button.querySelector(".traccia-av");

        if (!border || !bg) return;

        if (isDesktop) {
          const startX = -200;

          gsap.set(bg, { x: startX });

          const hoverTl = gsap.timeline({ paused: true });
          hoverTl
            .to(bg, {
              x: 0,
              duration: 0.5,
              ease: "power1.out",
            })
            .to(
              border,
              {
                opacity: 1,
                duration: 0.2,
                ease: "power2.in",
              },
              "<",
            );

          const handleEnter = () => hoverTl.play();
          const handleLeave = () => hoverTl.reverse();

          button.addEventListener("mouseenter", handleEnter);
          button.addEventListener("mouseleave", handleLeave);

          window.pageSpecificListeners.push(
            { element: button, event: "mouseenter", handler: handleEnter },
            { element: button, event: "mouseleave", handler: handleLeave },
          );
        }

        if (isTouch) {
          const startX = button.classList.contains("swiper-button-prev")
            ? 200
            : -200;

          gsap.set(bg, { x: startX });

          const touchTl = gsap.timeline({ paused: true });
          touchTl
            .to(bg, {
              x: 0,
              duration: 0.5,
              ease: "power1.out",
            })
            .to(
              border,
              {
                opacity: 1,
                duration: 0.2,
                ease: "power2.in",
              },
              "<",
            );

          const handleTouchStart = () => touchTl.play();
          const handleTouchEnd = () => touchTl.reverse();

          button.addEventListener("touchstart", handleTouchStart, {
            passive: true,
          });
          button.addEventListener("touchend", handleTouchEnd);
          button.addEventListener("touchcancel", handleTouchEnd);

          window.pageSpecificListeners.push(
            { element: button, event: "touchstart", handler: handleTouchStart },
            { element: button, event: "touchend", handler: handleTouchEnd },
            { element: button, event: "touchcancel", handler: handleTouchEnd },
          );
        }
      });

      window.pageSpecificListeners.push({
        cleanup: () => {
          try {
            swiper.destroy(true, true);
          } catch (_) {}
          delete swiperContainer.dataset.relatedSwiperBound;
        },
      });
    });
  },

  tagLinkAnimation: function () {
    if (!window.gsap) return;

    const { gsap } = window;

    if (!Array.isArray(window.pageSpecificListeners)) {
      window.pageSpecificListeners = [];
    }

    const MQ = {
      hoverFine: window.matchMedia("(hover: hover) and (pointer: fine)"),
      anyCoarse: window.matchMedia("(any-pointer: coarse)"),
    };

    const canHover = () => MQ.hoverFine.matches;
    const isTouch = () => MQ.anyCoarse.matches;

    const tagLinks = document.querySelectorAll(".tag-link");
    if (!tagLinks.length) return;

    tagLinks.forEach((tag) => {
      if (tag.dataset.tagAnimBound === "1") return;
      tag.dataset.tagAnimBound = "1";

      gsap.set(tag, { "--tag-mix": "0%" });

      const animateIn = () => {
        gsap.to(tag, {
          duration: 0.2,
          rotateZ: 10,
          "--tag-mix": "100%",
          ease: "power1.out",
          overwrite: "auto",
        });
      };

      const animateOut = () => {
        gsap.to(tag, {
          duration: 0.2,
          rotateZ: 0,
          "--tag-mix": "0%",
          ease: "power1.in",
          overwrite: "auto",
        });
      };

      if (canHover()) {
        tag.addEventListener("mouseenter", animateIn);
        tag.addEventListener("mouseleave", animateOut);

        window.pageSpecificListeners.push(
          { element: tag, event: "mouseenter", handler: animateIn },
          { element: tag, event: "mouseleave", handler: animateOut },
        );
      }

      if (isTouch()) {
        const handleTouchStart = () => animateIn();
        const handleTouchEnd = () => animateOut();

        tag.addEventListener("touchstart", handleTouchStart, { passive: true });
        tag.addEventListener("touchend", handleTouchEnd, { passive: true });
        tag.addEventListener("touchcancel", handleTouchEnd, { passive: true });

        window.pageSpecificListeners.push(
          { element: tag, event: "touchstart", handler: handleTouchStart },
          { element: tag, event: "touchend", handler: handleTouchEnd },
          { element: tag, event: "touchcancel", handler: handleTouchEnd },
        );
      }
    });
  },

  shareBtnAnimation: function () {
    if (!window.gsap) return;

    const { gsap } = window;

    if (!Array.isArray(window.pageSpecificListeners)) {
      window.pageSpecificListeners = [];
    }

    const MQ = {
      hoverFine: window.matchMedia("(hover: hover) and (pointer: fine)"),
      anyCoarse: window.matchMedia("(any-pointer: coarse)"),
    };

    const canHover = () => MQ.hoverFine.matches;
    const isTouch = () => MQ.anyCoarse.matches;

    const shareItems = document.querySelectorAll(".share-btn-propo");

    shareItems.forEach((item) => {
      const link = item.querySelector("a");
      const svgCont = item.querySelector(".svg-cont");

      if (!link || !svgCont) return;
      if (link.dataset.shareAnimBound === "1") return;
      link.dataset.shareAnimBound = "1";

      gsap.set(svgCont, {
        opacity: 0,
        x: 0,
      });

      const animateIn = () => {
        gsap.to(svgCont, {
          opacity: 1,
          x: 40,
          duration: 0.3,
          ease: "power1.out",
          overwrite: "auto",
        });
      };

      const animateOut = () => {
        gsap.to(svgCont, {
          opacity: 0,
          x: 0,
          duration: 0.25,
          ease: "power1.in",
          overwrite: "auto",
        });
      };

      if (canHover()) {
        link.addEventListener("mouseenter", animateIn);
        link.addEventListener("mouseleave", animateOut);

        window.pageSpecificListeners.push(
          { element: link, event: "mouseenter", handler: animateIn },
          { element: link, event: "mouseleave", handler: animateOut },
        );
      }

      if (isTouch()) {
        const handleTouchStart = () => animateIn();
        const handleTouchEnd = () => animateOut();

        link.addEventListener("touchstart", handleTouchStart, {
          passive: true,
        });
        link.addEventListener("touchend", handleTouchEnd, { passive: true });
        link.addEventListener("touchcancel", handleTouchEnd, { passive: true });

        window.pageSpecificListeners.push(
          { element: link, event: "touchstart", handler: handleTouchStart },
          { element: link, event: "touchend", handler: handleTouchEnd },
          { element: link, event: "touchcancel", handler: handleTouchEnd },
        );
      }
    });
  },

  init: function () {
    this.initializeSwiper();
    this.tagLinkAnimation();
    this.shareBtnAnimation();
  },
};

function setupScrollColorChange() {
  if (!window.gsap || !window.ScrollTrigger) return;

  const { gsap, ScrollTrigger } = window;
  const elementsWithColor = document.querySelectorAll("[data-color]");

  if (!elementsWithColor.length) {
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
        color,
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

function videoPause() {
  if (!window.gsap || !window.ScrollTrigger) return;

  const { ScrollTrigger } = window;

  if (!Array.isArray(window.pageSpecificListeners)) {
    window.pageSpecificListeners = [];
  }

  const videoContainers = document.querySelectorAll("[data-pause-on-scroll]");
  if (!videoContainers.length) return;

  const safePlay = (video) => {
    if (!video) return;
    video.play().catch(() => {});
  };

  const createVideoTrigger = (container, video) => {
    const st = ScrollTrigger.create({
      trigger: container,
      start: "top bottom",
      end: "bottom top",
      onEnter: () => safePlay(video),
      onLeave: () => video.pause(),
      onEnterBack: () => safePlay(video),
      onLeaveBack: () => video.pause(),
    });

    window.pageSpecificListeners.push({
      cleanup: () => st.kill(),
    });
  };

  if ("IntersectionObserver" in window) {
    const lazyVideoObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const container = entry.target;
        const video = container.querySelector("video");
        if (!video) {
          observer.unobserve(container);
          return;
        }

        const playWhenReady = () => safePlay(video);

        if (video.readyState >= 2) {
          playWhenReady();
        } else {
          video.addEventListener("canplay", playWhenReady, { once: true });

          window.pageSpecificListeners.push({
            cleanup: () => {
              video.removeEventListener("canplay", playWhenReady);
            },
          });
        }

        createVideoTrigger(container, video);
        observer.unobserve(container);
      });
    });

    videoContainers.forEach((container) =>
      lazyVideoObserver.observe(container),
    );

    window.pageSpecificListeners.push({
      cleanup: () => lazyVideoObserver.disconnect(),
    });

    return;
  }

  videoContainers.forEach((container) => {
    const video = container.querySelector("video");
    if (!video) return;
    createVideoTrigger(container, video);
  });
}

function initPropositoMarquee() {
  const host = document.querySelector(".propo_marquee");
  const wrap = host?.querySelector(".gsap-marquee-content");
  if (!host || !wrap) return;

  if (!Array.isArray(window.pageSpecificListeners)) {
    window.pageSpecificListeners = [];
  }

  // evita doppio init
  if (wrap.dataset.mqBound === "1") return;
  wrap.dataset.mqBound = "1";

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const opt = {
    speed: parseFloat(host.dataset.mqSpeed || "") || 40, // px/sec
    dir: (host.dataset.mqDir || "left") === "right" ? 1 : -1,
    rootMargin: host.dataset.mqMargin || "250px 0px",
    bufferPx: parseFloat(host.dataset.mqBuffer || "") || 400,
    maxClones: parseInt(host.dataset.mqMaxClones || "", 10) || 24,
  };

  const state = {
    x: 0,
    gap: 0,
    raf: 0,
    running: false,
    last: 0,
    ro: null,
    io: null,
    destroyed: false,
    debounce: 0,
  };

  const px = (v) => {
    const n = parseFloat(v);
    return Number.isFinite(n) ? n : 0;
  };

  const readGap = () => {
    const cs = getComputedStyle(wrap);
    return px(cs.columnGap || cs.gap || "0px");
  };

  const getW = (el) => {
    const r = el.getBoundingClientRect();
    return Math.max(0, r.width || 0);
  };

  const getTracks = () =>
    Array.from(wrap.children).filter((n) =>
      n.classList?.contains("prop_marquee_track"),
    );

  const clearClones = () => {
    wrap.querySelectorAll('[data-mq-clone="1"]').forEach((n) => n.remove());
  };

  const sumWidth = (tracks) => {
    const w = tracks.reduce((acc, el) => acc + getW(el), 0);
    return w + Math.max(0, tracks.length - 1) * state.gap;
  };

  const apply = () => {
    wrap.style.transform = `translate3d(${state.x}px,0,0)`;
  };

  const ensureFill = () => {
    const base = getTracks().filter((n) => n.dataset.mqClone !== "1");
    if (!base.length) return;

    let tracks = getTracks();
    let total = sumWidth(tracks);
    const need =
      (host.getBoundingClientRect().width || window.innerWidth || 0) +
      opt.bufferPx;

    let guard = 0;
    while (total < need && tracks.length < opt.maxClones && guard++ < 999) {
      base.forEach((src) => {
        if (tracks.length >= opt.maxClones) return;
        const clone = src.cloneNode(true);
        clone.dataset.mqClone = "1";
        wrap.appendChild(clone);
        tracks.push(clone);
      });
      total = sumWidth(tracks);
    }
  };

  const recycleIfNeeded = () => {
    const tracks = getTracks();
    if (tracks.length < 2) return;

    const first = tracks[0];
    const firstW = getW(first);
    const threshold = -(firstW + state.gap);

    if (opt.dir < 0) {
      if (state.x <= threshold) {
        state.x += firstW + state.gap;
        wrap.appendChild(first);
      }
    } else {
      if (state.x >= 0) {
        const last = tracks[tracks.length - 1];
        const lastW = getW(last);
        state.x -= lastW + state.gap;
        wrap.insertBefore(last, tracks[0]);
      }
    }
  };

  const measure = () => {
    state.gap = readGap();
    clearClones();
    state.x = 0;
    apply();
    ensureFill();
    wrap.style.willChange = "transform";
  };

  const tick = (t) => {
    if (!state.running || state.destroyed) return;
    if (!state.last) state.last = t;

    const dt = Math.min(0.05, (t - state.last) / 1000);
    state.last = t;

    state.x += opt.speed * dt * opt.dir;
    recycleIfNeeded();
    apply();

    state.raf = requestAnimationFrame(tick);
  };

  const start = () => {
    if (state.running || state.destroyed) return;
    state.running = true;
    state.last = 0;
    state.raf = requestAnimationFrame(tick);
  };

  const stop = () => {
    state.running = false;
    if (state.raf) cancelAnimationFrame(state.raf);
    state.raf = 0;
  };

  if ("IntersectionObserver" in window) {
    state.io = new IntersectionObserver(
      (entries) => {
        const on = !!entries[0]?.isIntersecting;
        if (on) start();
        else stop();
      },
      { rootMargin: opt.rootMargin, threshold: 0.12 },
    );
    state.io.observe(host);
  }

  if ("ResizeObserver" in window) {
    state.ro = new ResizeObserver(() => {
      clearTimeout(state.debounce);
      state.debounce = setTimeout(() => {
        if (state.destroyed) return;
        const wasRunning = state.running;
        stop();
        measure();
        if (wasRunning) start();
      }, 80);
    });
    state.ro.observe(host);
    state.ro.observe(wrap);
  }

  measure();
  start();

  const destroy = () => {
    state.destroyed = true;
    stop();
    clearTimeout(state.debounce);

    try {
      state.ro?.disconnect();
    } catch (_) {}

    try {
      state.io?.disconnect();
    } catch (_) {}

    wrap.style.willChange = "";
    wrap.style.transform = "";
    clearClones();
    delete wrap.dataset.mqBound;
  };

  window.pageSpecificListeners.push({ cleanup: destroy });
}

Object.assign(window, {
  setupScrollColorChange,
  videoPause,
  initPropositoMarquee,
});

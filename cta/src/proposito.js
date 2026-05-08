window.propositoAnimation = window.propositoAnimation || {
  initializeSwiper: function () {
    const swiperContainers = document.querySelectorAll(
      ".related-articles-wrapper"
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
          "initializeSwiper: Pulsanti prev/next non trovati per uno slider."
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
              "<"
            );

          const handleEnter = () => hoverTl.play();
          const handleLeave = () => hoverTl.reverse();

          button.addEventListener("mouseenter", handleEnter);
          button.addEventListener("mouseleave", handleLeave);

          window.pageSpecificListeners.push(
            { element: button, event: "mouseenter", handler: handleEnter },
            { element: button, event: "mouseleave", handler: handleLeave }
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
              "<"
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
            { element: button, event: "touchcancel", handler: handleTouchEnd }
          );
        }
      });

      window.pageSpecificListeners.push({
        element: swiperContainer,
        event: "__swiper_destroy__",
        handler: () => {
          swiper.destroy(true, true);
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
          { element: tag, event: "mouseleave", handler: animateOut }
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
          { element: tag, event: "touchcancel", handler: handleTouchEnd }
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
          { element: link, event: "mouseleave", handler: animateOut }
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
          { element: link, event: "touchcancel", handler: handleTouchEnd }
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

    videoContainers.forEach((container) => lazyVideoObserver.observe(container));

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

Object.assign(window, {
  setupScrollColorChange,
  videoPause,
});
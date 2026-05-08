function initSliderCTA() {
  const sliderWrapper = document.querySelector(".slider-cta-wrapper");
  if (!sliderWrapper) return;

  if (typeof Swiper === "undefined") {
    console.warn("initSliderCTA: Swiper non disponibile");
    return;
  }
  if (sliderWrapper.dataset.sliderCtaBound === "1") return;

  sliderWrapper.dataset.sliderCtaBound = "1";

  if (!Array.isArray(window.pageSpecificListeners)) {
    window.pageSpecificListeners = [];
  }

  const bp = window.bp;
  const isDesktop = !!bp?.is?.("lgUp");
  const isTouch = !!bp?.is?.("touchDown");

  const paginationEl = sliderWrapper.querySelector(".swiper-pagination");
  const prevEl = sliderWrapper.querySelector(".swiper-button-prev");
  const nextEl = sliderWrapper.querySelector(".swiper-button-next");
  const buttons = sliderWrapper.querySelectorAll(
    ".swiper-button-prev, .swiper-button-next"
  );

  if (!paginationEl) {
    console.warn("initSliderCTA: .swiper-pagination non trovata");
    return;
  }

  const swiper = new Swiper(sliderWrapper, {
    loop: true,
    speed: 700,
    effect: "slide",
    grabCursor: false,
    resistanceRatio: 0.85,
    threshold: 6,
    a11y: {
      enabled: true,
      prevSlideMessage: "Slide precedente",
      nextSlideMessage: "Slide successiva",
      paginationBulletMessage: "Vai alla slide {{index}}",
      containerRole: "region",
      containerRoleDescriptionMessage: "Carosello CTA",
    },
    pagination: {
      el: paginationEl,
      clickable: true,
      renderBullet: function (index, className) {
        return `<button type="button" class="${className}" aria-label="Vai alla slide ${
          index + 1
        }"></button>`;
      },
    },
    navigation: {
      nextEl,
      prevEl,
    },
  });

  let observer = null;
  let autoTween = null;
  let isSliderVisible = false;

  const progressTrack = nextEl?.querySelector(".traccia-av-next") || null;

  function resetTrack() {
    if (!progressTrack) return;

    const trackLength = progressTrack.getTotalLength?.() || 0;
    if (!trackLength) return;

    gsap.set(progressTrack, {
      strokeDasharray: trackLength,
      strokeDashoffset: trackLength,
      opacity: 1,
    });
  }

  function killAutoAnimation() {
    autoTween?.kill();
    autoTween = null;
  }

  function startAutoAnimation() {
    if (!isSliderVisible || !progressTrack) return;

    killAutoAnimation();
    resetTrack();

    autoTween = gsap.to(progressTrack, {
      strokeDashoffset: 0,
      duration: 6,
      ease: "linear",
      onComplete: () => {
        swiper.slideNext();
      },
    });
  }

  function pauseAutoAnimation() {
    autoTween?.pause();
  }

  function resumeAutoAnimation() {
    if (!isSliderVisible) return;

    if (autoTween) autoTween.resume();
    else startAutoAnimation();
  }

  function restartAutoAnimation() {
    if (!isSliderVisible) return;
    startAutoAnimation();
  }

  swiper.on("slideChangeTransitionStart", restartAutoAnimation);
  swiper.on("touchStart", pauseAutoAnimation);
  swiper.on("touchEnd", restartAutoAnimation);

  if (buttons.length) {
    buttons.forEach((button) => {
      const bg = button.querySelector(".btn-sfondo-avanzamento");
      const border = button.querySelector(".traccia-av");
      if (!border || !bg) return;

      if (isDesktop) {
        const isPrev = button === prevEl;
        const startX = isPrev ? -200 : -200;

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

        const handleEnter = () => {
          pauseAutoAnimation();
          hoverTl.play();
        };

        const handleLeave = () => {
          hoverTl.reverse();
          resumeAutoAnimation();
        };

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

        const handleTouchStart = () => {
          pauseAutoAnimation();
          touchTl.play();
        };

        const handleTouchEnd = () => {
          touchTl.reverse();
          resumeAutoAnimation();
        };

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

      const handleClick = () => {
        restartAutoAnimation();
      };

      button.addEventListener("click", handleClick);

      window.pageSpecificListeners.push({
        element: button,
        event: "click",
        handler: handleClick,
      });
    });
  }

  observer = new IntersectionObserver(
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

  window.pageSpecificListeners.push({
    cleanup: () => {
      killAutoAnimation();
      observer?.disconnect();
      swiper.off("slideChangeTransitionStart", restartAutoAnimation);
      swiper.off("touchStart", pauseAutoAnimation);
      swiper.off("touchEnd", restartAutoAnimation);
      swiper.destroy(true, true);
    },
  });
}

/** Project NEW */
function projectCloseBtn() {
  if (!window.gsap) return;
  const { gsap } = window;

  const button = document.getElementById("project-close");
  if (!button) return;

  if (!Array.isArray(window.pageSpecificListeners)) {
    window.pageSpecificListeners = [];
  }

  // evita doppi binding
  if (button.dataset.projectCloseBound === "1") return;
  button.dataset.projectCloseBound = "1";

  const hoverDiv = button.querySelector(".btn-bg");
  const arrowHover = button.querySelector(".cta-ar-h");
  const arrowDefault = button.querySelector(".cta-ar");

  if (!hoverDiv || !arrowDefault || !arrowHover) {
    console.warn("projectCloseBtn: elementi interni mancanti", {
      hoverDiv,
      arrowHover,
      arrowDefault,
    });
    return;
  }

  // MQ per capability
  const MQ = {
    hoverFine: window.matchMedia("(hover: hover) and (pointer: fine)"),
    anyCoarse: window.matchMedia("(any-pointer: coarse)"),
  };

  const canHover = () => MQ.hoverFine.matches;
  const isTouch = () => MQ.anyCoarse.matches;

  // Breakpoint via bp
  const isDesktop = !!window.bp?.is?.("lgUp");

  const enterTl = gsap.timeline({ paused: true });
  const leaveTl = gsap.timeline({ paused: true });

  // IN
  enterTl
    .to(
      [hoverDiv, arrowHover],
      {
        scale: 0,
        duration: 0.35,
        ease: "power2.out",
        stagger: 0.05,
        overwrite: "auto",
      },
      0
    )
    .to(
      arrowDefault,
      {
        scale: 1,
        duration: 0.25,
        ease: "power2.out",
        overwrite: "auto",
      },
      0.2
    );

  // OUT
  leaveTl
    .to(
      arrowDefault,
      {
        scale: 0,
        duration: 0.2,
        ease: "power2.in",
        overwrite: "auto",
      },
      0
    )
    .to(
      [hoverDiv, arrowHover],
      {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
        stagger: 0.05,
        overwrite: "auto",
      },
      0.2
    );

  let isHovered = false;
  let hoverTimeout;
  let isInside = false;

  const handleEnter = () => {
    clearTimeout(hoverTimeout);
    isInside = true;

    if (leaveTl.isActive()) {
      leaveTl.progress(1, false);
    }

    if (!isHovered) {
      enterTl.restart();
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
        leaveTl.restart();
        isHovered = false;
      }
    }, 50);
  };

  // ===== DESKTOP =====
  if (isDesktop && canHover()) {
    const onMouseEnter = () => handleEnter();
    const onMouseLeave = () => handleLeave();

    button.addEventListener("mouseenter", onMouseEnter);
    button.addEventListener("mouseleave", onMouseLeave);

    window.pageSpecificListeners.push(
      { element: button, event: "mouseenter", handler: onMouseEnter },
      { element: button, event: "mouseleave", handler: onMouseLeave }
    );
  }

  // ===== MOBILE / TOUCH =====
  if (!isDesktop && isTouch()) {
    const onTouchStart = () => handleEnter();
    const onTouchEnd = () => handleLeave();

    button.addEventListener("touchstart", onTouchStart, { passive: true });
    button.addEventListener("touchend", onTouchEnd, { passive: true });
    button.addEventListener("touchcancel", onTouchEnd, { passive: true });

    window.pageSpecificListeners.push(
      { element: button, event: "touchstart", handler: onTouchStart },
      { element: button, event: "touchend", handler: onTouchEnd },
      { element: button, event: "touchcancel", handler: onTouchEnd }
    );
  }

  // ===== ScrollTrigger: intro/out del bottone =====
  if (window.ScrollTrigger) {
    const triggerEl = document.querySelector(
      ".first-section-projects .incipit"
    );

    if (triggerEl) {
      window.ScrollTrigger.create({
        trigger: triggerEl,
        start: "top center",
        onEnter: () => {
          gsap.to(button, {
            "--close-scale": 1,
            duration: 0.4,
            ease: "power2.out",
          });
        },
        onLeaveBack: () => {
          gsap.to(button, {
            "--close-scale": 0,
            duration: 0.3,
            ease: "power2.in",
          });
        },
      });
    } else {
      console.warn(
        "projectCloseBtn: trigger .first-section-projects .incipit non trovato"
      );
    }
  }
}

Object.assign(window, {
  initSliderCTA,
  projectCloseBtn,
});
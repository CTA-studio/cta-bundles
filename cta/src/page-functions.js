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
        0.2,
      )
      .to(
        arrowDefault,
        {
          scale: 0,
          duration: 0.2,
          ease: "power2.out",
        },
        0,
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
        0.2,
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
        { element: contactLink, event: "mouseleave", handler: handleLeave },
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
        0,
      )
      .to(
        modalInner,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
        },
        0.55,
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
        0,
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
    },
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
    ".expertise_h_section .show-img-last-work",
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
        0.4,
      ).to(
        numb,
        {
          scale: 1,
          duration: 0.3,
          stagger: { amount: 0.25 },
          ease: "power2.out",
        },
        0.6,
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
          ">",
        )
        .to(
          outEl,
          {
            "--emo-clip-left": "100%",
            duration: clipDur,
            ease: "power1.inOut",
          },
          `<+${clipOffset}`,
        )
        .to(
          inEl,
          {
            "--emo-clip-right": "0%",
            duration: clipDur,
            ease: "power1.inOut",
          },
          `<+${inDelay}`,
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
      },
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
            gsap.getProperty(el, "xPercent"),
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
        0,
      )
        .fromTo(
          item,
          {
            xPercent: snap(
              ((curX - distanceToLoop + totalWidth) / widths[i]) * 100,
            ),
          },
          {
            xPercent: xPercents[i],
            duration:
              (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
            immediateRender: false,
          },
          distanceToLoop / pixelsPerSecond,
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
            wrapProgress(startProgress + (this.startX - this.x) * ratio),
          );
          config.onDrag?.();
        },

        onThrowUpdate() {
          tl.progress(
            wrapProgress(startProgress + (this.startX - this.x) * ratio),
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
        getComputedStyle(rail).columnGap || getComputedStyle(rail).gap || "0",
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
        },
      );

      io.observe(host);
    }

    const resizeHandler = () => {
      clearTimeout(resizeTimer);

      resizeTimer = setTimeout(() => {
        const currentWidth = Math.round(
          host.getBoundingClientRect().width || 0,
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
      },
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
          "<+=0.2",
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
            "<",
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
          "<",
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
          0,
        )
        .to(
          txt,
          {
            y: 0,
            duration: 0.35,
            ease: "power2.out",
            overwrite: "auto",
          },
          0.2,
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
          0,
        )
        .to(
          txtWrap,
          {
            width: 0,
            duration: 0.3,
            ease: "power1.in",
            overwrite: "auto",
          },
          0.1,
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
        { element: card, event: "mouseleave", handler: handleLeave },
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
          "<+=0.1",
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
            "<+=0.05",
          ).to(
            txt,
            {
              y: 0,
              duration: 0.35,
              ease: "power2.out",
              overwrite: "auto",
            },
            "<+=0.15",
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
            0.2,
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
            0.15,
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
            0.1,
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
            0,
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
            0.18,
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
            0,
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
            0,
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
            0.03,
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
            0.02,
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
            0.02,
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
          0.06,
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
        { element: card, event: "mouseleave", handler: onLeave },
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
              0.15,
            )
            .to(
              arrowDefault,
              {
                scale: 0,
                duration: 0.2,
                ease: "power2.out",
                overwrite: "auto",
              },
              0,
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
});
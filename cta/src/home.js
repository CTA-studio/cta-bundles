/** HOME */
const snapPx = window.snapPx || ((v) => {
  const dpr = window.devicePixelRatio || 1;
  const n = parseFloat(v);
  return Math.round(n * dpr) / dpr + "px";
});

const header = window.header || {};
const transitionElementsObj = window.transitionElementsObj || {};
const burgerElements = window.burgerElements || {};

//Animazioni Specifiche HOME
window.ctaStickyTransition = window.ctaStickyTransition || {
  // Variabili e oggetti
  horizontalScrollTL: null,

  // Selettori per Scroll Orizzontale
  reset() {
    this.scrollWrapperH = document.querySelector(".hero-section");
    this.scrollContainerH = document.querySelector(".h-scroll-cont");
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
    this.showcaseHorizontalScroll(); // crea TL orizzontale
    this.transition();
    this.showcaseVerticalScroll();
    this.showcaseExpandPanels();
    this.showcaseScaleImages();
    this.showcaseTextContent();
    this.panelHoverEffect();
    this.showcaseProjectButton();
    this.createScrollTriggerHero();
  },
  // Funzione per lo Scroll Orizzontale
  showcaseHorizontalScroll() {
    if (!this.scrollWrapperH || !this.scrollContainerH) {
      console.warn(" showcaseHorizontalScroll: elementi non trovati");
      return;
    }
    const root = document.documentElement;

    // 1) helper: width effettiva considerando i transform (vw inclusi)
    const getEffectiveContentWidth = () => {
      const kids = Array.from(this.scrollContainerH.children);
      if (!kids.length) return this.scrollContainerH.scrollWidth;

      // misura estremi visivi (left/right) dei figli trasformati
      const rects = kids.map((el) => el.getBoundingClientRect());
      const left = Math.min(...rects.map((r) => r.left));
      const right = Math.max(...rects.map((r) => r.right));
      return right - left; // larghezza contenuto “visiva”
    };

    const getScrollLen = () =>
      Math.max(0, getEffectiveContentWidth() - window.innerWidth);

    const updateScrollVar = () => {
      const scrollLen = getScrollLen();
      const neededHeight = scrollLen + window.innerHeight; // px
      root.style.setProperty("--var-scroll", `${neededHeight}px`);
    };

    // Primo calcolo
    updateScrollVar();

    // 2) timeline orizzontale con valori FUNZIONE (si aggiornano al refresh)
    this.horizontalScrollTL = gsap.timeline({
      scrollTrigger: {
        trigger: this.scrollWrapperH,
        start: "top top",
        end: () => `+=${getScrollLen()}`, // usa la larghezza effettiva
        scrub: true,
        invalidateOnRefresh: true,
      },
    });

    this.horizontalScrollTL.to(this.scrollContainerH, {
      x: () => -getScrollLen(), // stessa metrica di end
      ease: "none",
      modifiers: { x: snapPx },
    });
    window.addEventListener("resize", updateScrollVar);
  },

  // Funzione per la transizione della zona intermedia
  transition() {
    if (!this.transitionZoneImage || !this.transitionIndex) {
      console.warn("transition: elementi non trovati");
      return;
    }

    gsap.to(this.transitionZoneImage, {
      y: 0,
      ease: "none",
      scrollTrigger: {
        trigger: this.transitionIndex,
        start: "bottom bottom",
        end: "bottom 65%",
        scrub: true,
        onLeave: () => {
          if (this.lastPanel) {
            gsap.set(this.lastPanel, { opacity: 1 });
          }
        },
        onEnterBack: () => {
          if (this.lastPanel) {
            gsap.set(this.lastPanel, { opacity: 0 });
          }
        },
      },
    });
  },

  showcaseVerticalScroll() {
    if (!this.scrollWrapperV || !this.scrollContainerV) {
      console.warn("showcaseVerticalScroll: elementi non trovati");
      return;
    }

    // --- SplitText GSAP al posto di SplitType -------------------------
    const SplitText =
      (window.gsap && window.gsap.plugins && window.gsap.plugins.SplitText) ||
      window.SplitText;

    if (!SplitText) {
      console.warn(
        "showcaseVerticalScroll: SplitText GSAP non disponibile (plugin non caricato)"
      );
      return;
    }

    // idempotente, se già registrato non crea problemi
    gsap.registerPlugin(SplitText);

    const trigger = document.querySelector("#v-trigger-first");
    if (!trigger) {
      console.warn("showcaseVerticalScroll: trigger non trovato");
      return;
    }
    const pointValues = gsap.utils.toArray("#value-desk .point-value");
    const lineTitles = gsap.utils.toArray(
      "#value-desk .line-title.text-par.red"
    );

    // Manteniamo le stesse classi .line che usavi con SplitType
    const splitLines = new SplitText("#value-desk .value-text", {
      type: "lines",
      linesClass: "line",
    });

    const splitLinesMiss = new SplitText("#value-desk .miss-text", {
      type: "lines",
      linesClass: "line",
    });
    const h2Project = new SplitText("#value-desk .h2.project", {
      type: "chars",
      charsClass: "chars",
      autoSplit: true,
      mask: "chars",
    });

    const lineText = splitLines.lines;
    const lineTextMiss = splitLinesMiss.lines;

    const h2 = h2Project.chars;

    gsap.set(lineText, { y: 100, opacity: 0 });
    gsap.set(lineTextMiss, { y: 100, opacity: 0 });
    gsap.set(h2, { yPercent: 100, opacity: 1 });

    // Contatore per assegnare ID univoci ai trigger
    let triggerID = 0;

    function getUniqueTriggerID() {
      triggerID++;
      return `scrollTrigger-${triggerID}`;
    }

    // --- Calcolo delle altezze (come prima) ---------------------------

    // scala finale dei pannelli
    const scaleFactor = 0.5; // il tuo scale target (come da gsap.to(this.panelArray))

    const computeTravel = () => {
      const path = this.verticalPath;
      const lastPanel =
        this.lastPanel || document.getElementById("img-last-one");

      if (!path || !lastPanel) {
        console.warn("computeTravel: verticalPath o lastPanel mancanti", {
          path,
          lastPanel,
        });
        return 0;
      }

      // scala attuale (di solito 1)
      const prevScale = gsap.getProperty(path, "scale") || 1;

      // simuliamo lo stato FINALE (pannelli già scalati)
      gsap.set(path, { scale: scaleFactor, transformOrigin: "top left" });

      const pathRect = path.getBoundingClientRect();
      const lastRect = lastPanel.getBoundingClientRect();

      // quanto deve salire il contenuto perché
      // il bottom di verticalPath arrivi al top del last panel
      const delta = pathRect.bottom - lastRect.top;

      // ripristino scala iniziale
      gsap.set(path, { scale: prevScale });

      return Math.max(delta, 0);
    };

    // --- TL principale scroll verticale pinnato -----------------------
    this.verticalScrollTL = gsap.timeline({
      scrollTrigger: {
        id: getUniqueTriggerID(),
        trigger: trigger,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        pin: this.scrollWrapperV,
        pinType: "transform",
        anticipatePin: 0,
      },
    });

    // --- QUI il blocco critico: da width → scale ----------------------
    gsap.to(this.panelArray, {
      // prima: width: "30vw",
      scale: 0.5,
      transformOrigin: "top left",
      ease: "power1.inOut",
      scrollTrigger: {
        id: getUniqueTriggerID(),
        trigger: trigger,
        start: "top 40%",
        end: "top -75%",
        scrub: true,
      },
    });

    gsap.to(this.contentArray, {
      y: () => `-${computeTravel()}px`,
      ease: "power1.inOut",
      scrollTrigger: {
        id: getUniqueTriggerID(),
        trigger: trigger,
        start: "top top",
        end: "bottom bottom", // stesso range del pin
        scrub: true,
        invalidateOnRefresh: true, // ricalcola travel a ogni refresh/resize
      },
    });

    // Animazione del titolo
    gsap.to(lineTitles, {
      scaleX: 1,
      ease: "none",
      stagger: { amount: 0.2 },
      scrollTrigger: {
        id: getUniqueTriggerID(),
        trigger: trigger,
        start: "top bottom",
        end: "top -75%",
        scrub: true,
      },
    });

    // Testi e valori
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
              .to(
                h2,
                {
                  yPercent: 0,
                  opacity: 1,
                  duration: 0.6,
                  stagger: { amount: 0.2 },
                  ease: "power2.out",
                },
                0
              )
              .to(
                lineText,
                {
                  y: 0,
                  opacity: 1,
                  duration: 0.6,
                  stagger: { amount: 0.2 },
                  ease: "power2.out",
                },
                "<=+0.2"
              )
              .to(
                pointValues,
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
                "<=+0.2"
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
                pointValues,
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
                  duration: 0.4,
                  ease: "power2.in",
                },
                "<"
              )
              .to(
                h2,
                {
                  yPercent: 100,
                  opacity: 1,
                  duration: 0.4,
                  stagger: { amount: 0.2 },
                  ease: "power2.out",
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
        "showcaseTextContent: Il trigger principale non è stato trovato."
      );
      return;
    }

    const SplitText =
      (window.gsap && window.gsap.plugins && window.gsap.plugins.SplitText) ||
      window.SplitText;

    if (!SplitText) {
      console.warn(
        "showcaseTextContent: SplitText GSAP non disponibile (plugin non caricato)"
      );
      return;
    }

    // Sostituisce SplitType, ma manteniamo .char
    new SplitText(".panel-title", {
      type: "chars",
      charsClass: "char",
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
      const button = element.querySelector(".btn-simple.showcase");

      if (!titleChars.length || !descriptionContainer || !button) {
        console.warn(`showcaseTextContent: Elementi mancanti in ${element.id}`);
        return;
      }

      //  Stati iniziali – come prima, ma uso yPercent + display inline-block
      gsap.set(titleChars, {
        yPercent: 100,
        opacity: 0,
      });
      gsap.set(descriptionContainer, { y: 200 });
      gsap.set(button, { scale: 0 });

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
              yPercent: 0,
              opacity: 1,
              duration: 0.4,
              stagger: { amount: 0.3 },
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
            );
        },
        onLeaveBack: () => {
          gsap
            .timeline()
            .to(titleChars, {
              yPercent: 100,
              opacity: 0,
              duration: 0.4,
              ease: "power1.in",
            })
            .to(
              descriptionContainer,
              { y: 200, duration: 0.4, ease: "power1.in" },
              "<"
            )
            .to(button, { scale: 0, duration: 0.3, ease: "power1.in" });
        },
      });
    });
  },

  panelHoverEffect() {
    const panels = document.querySelectorAll(".panel-item-hov");

    if (!panels.length) {
      console.warn("panelHoverEffect: nessun elemento .panel-item-hov trovato");
      return;
    }

    if (!Array.isArray(window.pageSpecificListeners)) {
      window.pageSpecificListeners = [];
    }

    panels.forEach((panel) => {
      const h = panel.querySelector(".hov");
      const panelItemV = panel.querySelector(".panel-item-v");
      const itemVTitle = panel.querySelector(".item-v-title");
      const button = panel.querySelector(".btn-simple");
      const arrowHover = button?.querySelector(".cta-ar-h") || null;

      if (!panelItemV || !itemVTitle) {
        console.warn(
          "panelHoverEffect: elementi interni mancanti in un panel-item-hov"
        );
        return;
      }

      // Timeline IN/OUT in pausa (come sugli showcase)
      const enterTl = gsap.timeline({ paused: true });
      const leaveTl = gsap.timeline({ paused: true });

      let hoverTimeout;
      let isHovered = false;
      let isInside = false;

      // ===== TL IN =====================================================
      enterTl
        .to(
          h,
          {
            opacity: 1,
            duration: 0.3,
            ease: "power2.out",
          },
          0
        )
        .to(
          [panelItemV, itemVTitle],
          {
            y: 0,
            duration: 0.4,
            ease: "power2.out",
          },
          0
        );

      if (button) {
        enterTl.to(
          button,
          {
            scale: 1.5,
            transformOrigin: "bottom right",
            duration: 0.4,
            ease: "power2.out",
          },
          0
        );

        if (arrowHover) {
          enterTl.to(
            arrowHover,
            {
              scale: 1,
              duration: 0.35,
              ease: "power2.out",
            },
            0.25
          );
        }
      }

      // ===== TL OUT ====================================================
      leaveTl
        .to(
          itemVTitle,
          {
            y: 150,
            duration: 0.5,
            ease: "power2.in",
          },
          0
        )
        .to(
          panelItemV,
          {
            y: -100,
            duration: 0.5,
            ease: "power2.in",
          },
          0
        )
        .to(
          h,
          {
            opacity: 0,
            duration: 0.3,
            ease: "power2.inOut",
          },
          0.2
        );

      if (button) {
        leaveTl.to(
          button,
          {
            scale: 0.8,
            transformOrigin: "bottom right",
            duration: 0.35,
            ease: "power2.in",
          },
          0
        );

        if (arrowHover) {
          leaveTl.to(
            arrowHover,
            {
              scale: 0,
              duration: 0.3,
              ease: "power2.in",
            },
            0
          );
        }
      }

      // ===== HANDLER HOVER (stesso pattern degli showcase) =============
      const handleMouseEnter = () => {
        clearTimeout(hoverTimeout);
        isInside = true;

        // se stava andando via, portiamo a fine OUT e poi facciamo IN
        if (leaveTl.isActive()) {
          leaveTl.progress(1, false);
        }

        if (!isHovered) {
          enterTl.restart();
          isHovered = true;
        }
      };

      const handleMouseLeave = () => {
        isInside = false;

        hoverTimeout = setTimeout(() => {
          if (!isInside) {
            // se l'IN è ancora in corso, lo chiudiamo e poi facciamo OUT
            if (enterTl.isActive()) {
              enterTl.progress(1, false);
            }
            leaveTl.restart();
            isHovered = false;
          }
        }, 50);
      };

      panel.addEventListener("mouseenter", handleMouseEnter);
      panel.addEventListener("mouseleave", handleMouseLeave);

      window.pageSpecificListeners.push(
        { element: panel, event: "mouseenter", handler: handleMouseEnter },
        { element: panel, event: "mouseleave", handler: handleMouseLeave }
      );
    });
  },
showcaseProjectButton() {
  const trigger = document.querySelector("#v-trigger-f");
  if (!trigger) {
    console.warn("showcaseProjectButton: trigger #v-trigger-f non trovato");
    return;
  }

  if (!this.lastPanel) {
    console.warn("showcaseProjectButton: this.lastPanel non trovato");
    return;
  }

  const btn = this.lastPanel.querySelector(
    '.btn-primary[data-btn="project"]'
  );
  if (!btn) {
    console.warn(
      "showcaseProjectButton: .btn-primary[data-btn='project'] non trovato in lastPanel"
    );
    return;
  }

  const border = btn.querySelector(".btn-border");
  const label = btn.querySelector(".btn-label");
  const btnDot = btn.querySelector(".btn");
  const arrow = btn.querySelector(".btnn-ar") || btn.querySelector(".btn-ar");

  if (!border || !label) {
    console.warn(
      "showcaseProjectButton: .btn-border o .btn-label mancanti dentro al bottone"
    );
    return;
  }

  if (!Array.isArray(window.pageSpecificListeners)) {
    window.pageSpecificListeners = [];
  }

  // ==== Stati iniziali ================================================
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

  // ==== TL ingresso ====================================================
  const tl = gsap.timeline({ paused: true });

  tl.to(border, {
    duration: 0.35,
    ease: "power2.out",
    "--clip-x": "0%",
  })
    .to(
      label,
      {
        rotationX: 0,
        yPercent: 0,
        opacity: 1,
        duration: 0.45,
        ease: "power2.out",
        force3D: true,
      },
      0.22
    )
    .to(
      btnDot,
      {
        scale: 0.3,
        duration: 0.4,
        ease: "back.out(1.6)",
      },
      "-=0.3"
    );

  if (window.ScrollTrigger) {
    ScrollTrigger.create({
      trigger,
      start: "top 125%",
      end: "bottom bottom",
      onEnter: () => tl.play(),
      onLeaveBack: () => tl.reverse(),
    });
  }

  // ==== Hover IN / OUT ================================================
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
        duration: 0.35,
        ease: "power2.out",
      },
      0
    )
    .to(
      btn,
      {
        "--btn-mix": "100%",
        duration: 0.15,
        ease: "power2.in",
      },
      0
    );

  if (btnDot) {
    hoverTl.to(
      btnDot,
      {
        scale: 0.9,
        duration: 0.35,
        ease: "power2.out",
      },
      0.15
    );
  }

  if (arrow) {
    hoverTl.to(
      arrow,
      {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
        transformOrigin: "bottom left",
      },
      0.25
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
        duration: 0.15,
        ease: "power2.in",
      },
      0.15
    )
    .to(
      btn,
      {
        "--btn-scale": 0,
        duration: 0.3,
        ease: "power2.in",
      },
      0
    );

  if (btnDot) {
    leaveTl.to(
      btnDot,
      {
        scale: 0.3,
        duration: 0.3,
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
        duration: 0.3,
        ease: "power2.in",
        transformOrigin: "top right",
      },
      0
    );
  }

  const handleMouseEnter = () => {
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

  const handleMouseLeave = () => {
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

  btn.addEventListener("mouseenter", handleMouseEnter);
  btn.addEventListener("mouseleave", handleMouseLeave);

  window.pageSpecificListeners.push(
    { element: btn, event: "mouseenter", handler: handleMouseEnter },
    { element: btn, event: "mouseleave", handler: handleMouseLeave }
  );
},
  createScrollTriggerHero() {
    const mm = gsap.matchMedia();
    const trigger = this.panelPrimo;
    const start = "left 30%";
    const end = "left 20%";
    const scrollBar = document.getElementById("scroll-bar-home");
    const logoLetters = gsap.utils.toArray(".logo-svg.cta");
    const logoDot = document.querySelector(".logo-svg.dot");

    mm.add("(min-width: 992px)", () => {
      ScrollTrigger.create({
        trigger: trigger,
        start: start,
        end: end,
        containerAnimation: this.horizontalScrollTL,
        scrub: true,
        id: "hero-trigger",
        onEnter: () => {
          gsap
            .timeline({
              onComplete: () => {
                header.burgerBlock?.setAttribute("data-burger", "page");
                header.logoMenu?.setAttribute("data-logo", "page");
              },
            })
            .to(
              scrollBar,
              {
                opacity: 1,
                ease: "power2.out",
                duration: 0.6,
              },
              0.3
            )
            .to(
              header.burgerBlock,
              {
                scale: 1,
                duration: 0.5,
                ease: "power2.inOut",
              },
              0.5
            )
            .to(
              logoLetters,
              {
                y: 0,
                duration: 0.5,
                ease: "power2.out",
                stagger: 0.08,
              },
              0
            )
            .to(
              logoDot,
              {
                "--r-scale": "32.392",
                duration: 0.5,
                ease: "power1.out",
              },
              "-=0.4"
            );
        },
        onLeaveBack: () => {
          gsap
            .timeline({
              onComplete: () => {
                header.burgerBlock?.setAttribute("data-burger", "home");
                header.logoMenu?.setAttribute("data-logo", "home");
              },
            })
            .to(header.burgerBlock, {
              scale: 0,
              duration: 0.4,
              ease: "power2.inOut",
            })
            .to(
              scrollBar,
              {
                opacity: 0,
                ease: "power2.out",
                duration: 0.2,
              },
              0
            )
            .to(
              logoLetters,
              {
                y: 100,
                duration: 0.5,
                ease: "power2.out",
                stagger: { each: 0.08, from: "end" },
              },
              "<"
            )
            .to(
              logoDot,
              {
                "--r-scale": "0",
                duration: 0.35,
                ease: "power2.out",
              },
              "<"
            );
        },
      });
    });

    /**const tlScroll = gsap.timeline({
        scrollTrigger: {
          trigger: "#service",
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
    */
  },
};

/** Animazione allo scroll Mobile Home - showcase verticale e Value Wrapper */
function showcaseTextContentMobile() {
  if (!window.gsap || !window.ScrollTrigger) return;

  const { gsap, ScrollTrigger } = window;
  const SplitText =
    (gsap.plugins && gsap.plugins.SplitText) || window.SplitText;

  if (!SplitText) {
    console.warn("showcaseTextContentMobile: SplitText non disponibile");
    return;
  }

  const panelHovs = document.querySelectorAll(".panel-item-hov");
  const valueWrapper = document.getElementById("value-mobile");

  // ================== PANEL ITEM HOV ==================
  panelHovs.forEach((panelHov) => {
    const itemVTitles = panelHov.querySelector(".item-v-title");
    const button = panelHov.querySelector(".btn-simple");

    if (!itemVTitles || !button) return;

    gsap.set(itemVTitles, { y: 100 });
    gsap.set(button, { scale: 0 });

    ScrollTrigger.create({
      trigger: panelHov,
      start: "top 50%",
      once: true,
      onEnter: () => {
        gsap
          .timeline()
          .to(itemVTitles, {
            y: 0,
            duration: 0.4,
            ease: "power1.out",
          })
          .to(
            button,
            {
              scale: 1,
              duration: 0.4,
              ease: "power1.out",
            },
            "<"
          );
      },
    });
  });

  if (!valueWrapper) return;

  // ================== VALUE WRAPPER ==================
  const missTrigger = valueWrapper.querySelector(".miss-content");

  const lineTitles = valueWrapper.querySelectorAll(".line-title");
  const pointValues = valueWrapper.querySelectorAll(".point-value");

  if (!missTrigger || !lineTitles || !pointValues) {
    console.warn(
      "showcaseTextContentMobile: .value-text o .miss-text mancanti."
    );
    return;
  }

  const splitLines = new SplitText("#value-mobile .value-text", {
    type: "lines",
    linesClass: "line",
  });

  const splitLinesMiss = new SplitText("#value-mobile .miss-text", {
    type: "lines",
    linesClass: "line",
  });

  const lineText = splitLines.lines || [];
  const lineTextMiss = splitLinesMiss.lines || [];

  if (!lineText.length || !lineTextMiss.length) {
    console.warn(
      "showcaseTextContentMobile: Nessuna linea trovata dopo SplitText."
    );
    return;
  }

  gsap.set(lineTitles, { scaleX: 0 });
  gsap.set(lineText, { y: 100, opacity: 0 });
  gsap.set(pointValues, { scale: 0, opacity: 0 });
  gsap.set(lineTextMiss, { y: 100, opacity: 0 });

  // ===== trigger 1: titolo linee + value text + points
  ScrollTrigger.create({
    trigger: valueWrapper,
    start: "top 70%",
    end: "top 60%",
    once: true,
    onEnter: () => {
      gsap
        .timeline()
        .to(lineTitles, {
          scaleX: 1,
          duration: 0.8,
          ease: "power2.inOut",
        })
        .to(
          lineText,
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: { amount: 0.2 },
            ease: "power2.out",
          },
          "<+=0.2"
        )
        .to(
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

  // ===== trigger 2: miss text
  if (missTrigger) {
    ScrollTrigger.create({
      trigger: missTrigger,
      start: "top 88%",
      end: "top 70%",
      once: true,
      onEnter: () => {
        gsap.to(lineTextMiss, {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: { amount: 0.2 },
          ease: "power2.out",
        });
      },
    });
  }
}

/** Scroll e animazioni primi 3 pannelli mobile */
function showcasePanelsScrollMobile() {
  const gs = window.gsap;
  const ST =
    (gs && gs.plugins && gs.plugins.ScrollTrigger) || window.ScrollTrigger;
  const SplitText =
    (gs && gs.plugins && gs.plugins.SplitText) || window.SplitText;

  if (!gs || !ST || !SplitText) {
    console.warn(
      "showcasePanelsScrollMobile: gsap / SplitText / ScrollTrigger mancanti"
    );
    return;
  }

  // idempotente, non fa danni se chiamato più volte
  gs.registerPlugin(SplitText, ST);

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

    const titleEl = panelEl.querySelector(".panel-title");
    const descriptionContainer = panelEl.querySelector(".panel-desscript");
    const kindJobText = panelEl.querySelector(".mb-job-descrp .panel-text");
    const button = panelEl.querySelector(".btn-simple");

    if (!titleEl || !descriptionContainer || !kindJobText) {
      console.warn(`showcasePanelsScrollMobile: elementi mancanti in ${panel}`);
      return;
    }

    // SplitText GSAP – split per chars, nessuna classe aggiuntiva necessaria
    let split = titleEl._gsSplit;
    if (!split) {
      split = new SplitText(titleEl, {
        type: "chars",
      });
      titleEl._gsSplit = split;
    }

    const titleChars = split.chars || [];
    if (!titleChars.length) {
      console.warn(
        `showcasePanelsScrollMobile: nessun char disponibile in ${panel}`
      );
      return;
    }

    // Stati iniziali
    gs.set(titleChars, { yPercent: 100, opacity: 0 });
    gs.set(kindJobText, { yPercent: 100, opacity: 0 });
    gs.set(descriptionContainer, { y: -100 });
    if (button) {
      gs.set(button, { scale: 0 });
    }

    // Timeline "in" (useremo play/reverse)
    const tl = gs.timeline({ paused: true });

    tl.to(descriptionContainer, {
      y: 0,
      duration: 0.4,
      ease: "power2.out",
    })
      .to(
        titleChars,
        {
          yPercent: 0,
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
          yPercent: 0,
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
        },
        "-=0.3"
      );

    if (button) {
      tl.to(
        button,
        {
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
        },
        "<"
      );
    }

    // ScrollTrigger agganciato al TRIGGER (non allo sticky)
    ST.create({
      trigger: triggerEl,
      start: "top 60%",
      invalidateOnRefresh: true,
      onEnter: () => {
        tl.play();
      },
      onLeaveBack: () => {
        tl.reverse();
      },
    });
  });
}
/** Hover touch button primi 3 pannelli shoowcase
 * == su desktop è ok anche su mobile a meno che non cambiamo i buttons.
 */
function setupShowcaseButtons() {
  // const mm = gsap.matchMedia(); // rimosso: non usiamo più matchMedia per breakpoint

  if (!Array.isArray(window.pageSpecificListeners)) {
    window.pageSpecificListeners = [];
  }

  // Capability MQ
  const MQ = {
    hoverFine: window.matchMedia("(hover: hover) and (pointer: fine)"),
    anyCoarse: window.matchMedia("(any-pointer: coarse)"),
  };
  const canHover = () => MQ.hoverFine.matches;
  const isTouch = () => MQ.anyCoarse.matches;

  // Breakpoint via bp (>= 992)
  const isDesktop = window.bp?.is("lgUp"); // >= 992

  // ==== DESKTOP: hover (≥ 992px) ======================================
  if (isDesktop) {
    if (!canHover()) return;

    const buttonImagePairs = [
      { buttonId: "btn-1", imgId: "link-img-primo" },
      { buttonId: "btn-2", imgId: "link-img-secondo" },
      { buttonId: "btn-3", imgId: "link-img-terzo" },
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

      const hoverDiv = button.querySelector(".btn-bg");
      const arrowHover = button.querySelector(".cta-ar-h");
      const arrowDefault = button.querySelector(".cta-ar");

      if (!hoverDiv || !arrowHover || !arrowDefault) {
        console.warn(
          `setupShowcaseButtons: Elementi interni mancanti per ${buttonId}`
        );
        return;
      }

      const enterTl = gsap.timeline({ paused: true });
      const leaveTl = gsap.timeline({ paused: true });

      let hoverTimeout;
      let isHovered = false;
      let isInside = false;

      // ===== TL IN =====================================================
      enterTl
        .to(hoverDiv, { scale: 1, duration: 0.4, ease: "power2.out" })
        .to(arrowHover, { scale: 1, duration: 0.4, ease: "power2.out" }, 0.2)
        .to(arrowDefault, { scale: 0, duration: 0.2, ease: "power2.out" }, 0);

      // ===== TL OUT ====================================================
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

      const handleMouseEnter = () => {
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

      const handleMouseLeave = () => {
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

    return; // mantiene la separazione netta desktop/mobile come con mm.add
  }

  // ==== MOBILE: click (≤ 991px) =======================================
  // (equivalente a max-width: 991px)
  if (!isTouch()) {
    // se non abbiamo pointer "coarse" evitiamo binding mobile
    return;
  }

  const mobilePairs = [
    { buttonId: "btn-1", imgId: "link-img-primo" },
    { buttonId: "btn-2", imgId: "link-img-secondo" },
    { buttonId: "btn-3", imgId: "link-img-terzo" },
  ];

  mobilePairs.forEach(({ buttonId, imgId }) => {
    const button = document.getElementById(buttonId);
    const imgPanel = document.getElementById(imgId);
    if (!button) return;

    const hoverDiv = button.querySelector(".btn-bg");
    const arrowHover = button.querySelector(".cta-ar-h");
    const arrowDefault = button.querySelector(".cta-ar");

    if (!hoverDiv || !arrowHover || !arrowDefault) {
      console.warn(
        `setupShowcaseButtons (mobile): Elementi interni mancanti per ${buttonId}`
      );
      return;
    }

    const enterTl = gsap.timeline({ paused: true });
    const leaveTl = gsap.timeline({ paused: true }); // lo teniamo pronto se servirà dopo

    let isActive = false;

    // ===== TL IN (mobile) ============================================
    enterTl
      .to(hoverDiv, { scale: 1, duration: 0.25, ease: "power2.out" })
      .to(arrowHover, { scale: 1, duration: 0.25, ease: "power2.out" }, 0.15)
      .to(arrowDefault, { scale: 0, duration: 0.2, ease: "power2.out" }, 0);

    // OUT c'è, ma per ora non lo usiamo nel click (come da tua indicazione)
    leaveTl
      .to([hoverDiv, arrowHover], {
        scale: 0,
        duration: 0.2,
        ease: "power2.out",
        transformOrigin: "top right",
      })
      .to(
        arrowDefault,
        {
          scale: 1,
          duration: 0.25,
          ease: "power2.out",
          transformOrigin: "bottom left",
        },
        0.1
      )
      .set([hoverDiv, arrowHover], { clearProps: "transformOrigin" });

    // --- CLICK sul bottone → stessa logica dell'imgPanel -------------
    const handleButtonClick = (ev) => {
      // opzionale: se è un <a>, evitiamo il jump immediato
      // e deleghiamo il routing a Barba / JS esterno
      ev.preventDefault();

      if (leaveTl.isActive()) {
        leaveTl.progress(1, false);
      }

      enterTl.restart();
      isActive = true;
    };

    button.addEventListener("click", handleButtonClick);

    window.pageSpecificListeners.push({
      element: button,
      event: "click",
      handler: handleButtonClick,
    });

    // --- CLICK sull'immagine → stessa animazione ---------------------
    if (imgPanel) {
      const handleImageClick = (ev) => {
        // se è dentro un link e non vuoi il jump immediato:
        ev.preventDefault();

        if (leaveTl.isActive()) {
          leaveTl.progress(1, false);
        }

        enterTl.restart();
        isActive = true;
      };

      imgPanel.addEventListener("click", handleImageClick);

      window.pageSpecificListeners.push({
        element: imgPanel,
        event: "click",
        handler: handleImageClick,
      });
    }
  });
}

/** Touch button pannelli generici showcase solo mobile */
function setupVerticalShowcaseButtons() {
  const panels = document.querySelectorAll(".panel-item-hov");

  if (!panels.length) {
    console.warn("setupVerticalShowcaseButtons: Nessun pannello trovato.");
    return;
  }

  // const mm = gsap.matchMedia(); // rimosso: non usiamo più matchMedia per breakpoint

  // Breakpoint via bp (>= 992)
  const isDesktop = window.bp?.is("lgUp"); // >= 992

  // (max-width: 991px) => !isDesktop
  if (!isDesktop) {
    panels.forEach((panel) => {
      const button = panel.querySelector(".btn-simple");
      if (!button) return;

      const hoverDiv = button.querySelector(".btn-bg");
      const arrowHover = button.querySelector(".cta-ar-h");
      const arrowDefault = button.querySelector(".cta-ar");

      if (!hoverDiv || !arrowHover || !arrowDefault) {
        return;
      }

      // stati iniziali
      gsap.set(hoverDiv, { scale: 0 });
      gsap.set(arrowHover, { scale: 0 });
      gsap.set(arrowDefault, { scale: 1 });

      // ===== TL IN (solo questa ci serve al click) =====================
      const enterTl = gsap.timeline({ paused: true });

      enterTl
        .to(hoverDiv, { scale: 1, duration: 0.25, ease: "power2.out" })
        .to(arrowHover, { scale: 1, duration: 0.25, ease: "power2.out" }, 0.15)
        .to(arrowDefault, { scale: 0, duration: 0.2, ease: "power2.out" }, 0);

      // --- CLICK sul bottone ------------------------------------------
      const handleButtonClick = (ev) => {
        ev.preventDefault(); // Barba gestisce la navigazione
        enterTl.restart();
      };

      button.addEventListener("click", handleButtonClick);

      // --- CLICK sul pannello: stessa animazione -----------------------
      const handlePanelClick = (ev) => {
        // se clicco direttamente il bottone, lascia gestire a handleButtonClick
        if (button.contains(ev.target)) return;

        ev.preventDefault(); // niente jump, Barba si occupa del routing

        enterTl.restart();
      };

      panel.addEventListener("click", handlePanelClick);

      if (!Array.isArray(window.pageSpecificListeners)) {
        window.pageSpecificListeners = [];
      }

      window.pageSpecificListeners.push(
        { element: button, event: "click", handler: handleButtonClick },
        { element: panel, event: "click", handler: handlePanelClick }
      );
    });
  }
}

/** Nuova animazione ingresso pagina generico */

/** Avanzamento barra Home */
function scrollProgressLine() {
  const settings = [
    {
      lineId: "item-line-zero",
      textId: "step1",
      triggerStart: document.querySelector(".hero-section"),
      triggerEnd: document.getElementById("v-trigger-first"),
      start: "top top",
      end: "bottom bottom",
    },
    {
      lineId: "item-line-first",
      textId: "step2",
      triggerStart: document.querySelector(".expertise_section"),
      triggerEnd: document.querySelector(".expertise_section"),
      start: "top bottom",
      end: "bottom bottom",
    },
    {
      lineId: "item-line-second",
      textId: "step3",
      triggerStart: document.querySelector(".studio-wrapper"),
      triggerEnd: document.querySelector(".proposito-section"),
      start: "top bottom",
      end: "bottom bottom",
    },
    {
      lineId: "item-line-third",
      textId: "step4",
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

    // Animazione linea avanzamento
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

    // Animazione testo IN/OUT
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
        gsap.to(text, { y: 50, duration: 0.4, ease: "power2.in" });
      },
    });
  });
}

/** Sezione COMPETENZE
 * servizi
 */
window.serviceIntroAnimation = window.serviceIntroAnimation || {
  init() {
    if (!window.gsap || !window.ScrollTrigger) return;

    const { gsap, ScrollTrigger } = window;
    const SplitText =
      (gsap.plugins && gsap.plugins.SplitText) || window.SplitText;

    if (!SplitText) {
      console.warn("serviceIntroAnimation: SplitText non disponibile");
      return;
    }

    const bp = {
      lgUp: !!window.bp?.is?.("lgUp"),
      touchDown: !!window.bp?.is?.("touchDown"),
      phoneDown: !!window.bp?.is?.("phoneDown"),
    };

    const wrappers = document.querySelectorAll(".serv_wrapper");
    if (!wrappers.length) return;

    wrappers.forEach((wrap) => {
      if (wrap.dataset.servIntroBound === "1") return;
      wrap.dataset.servIntroBound = "1";

      const header = wrap.querySelector(".serv_h_wrap");
      if (!header) return;

      const title = header.querySelector(".h3_serv");
      const sub = header.querySelector(".h3_sub");
      const line = header.querySelector(".line-title-section");

      if (!title || !sub || !line) {
        console.warn("serviceIntroAnimation: elementi mancanti", {
          wrap,
          title,
          sub,
          line,
        });
        return;
      }

      // ==================================================
      // 1) HEADER
      // ==================================================
      const titleSplit = new SplitText(title, {
        type: bp.touchDown ? "words" : "chars",
        charsClass: "serv-char",
        wordsClass: "serv-title-word",
        mask: bp.touchDown ? "words" : "chars",
      });

      const subSplit = new SplitText(sub, {
        type: "words",
        wordsClass: "serv-word",
        mask: "words",
      });

      const titleTargets = bp.touchDown
        ? titleSplit.words || []
        : titleSplit.chars || [];

      const words = subSplit.words || [];

      gsap.set(titleTargets, {
        yPercent: 100,
      });

      gsap.set(words, {
        y: 50,
        opacity: 0,
      });

      const tl = gsap.timeline({ paused: true });

      if (bp.touchDown) {
        tl.to(titleTargets, {
          yPercent: 0,
          duration: 0.5,
          stagger: { amount: 0.12 },
          ease: "power2.out",
        })
          .to(
            line,
            {
              scaleX: 1,
              duration: 0.55,
              ease: "power2.out",
            },
            "<+=0.02"
          )
          .to(
            words,
            {
              y: 0,
              opacity: 1,
              duration: 0.5,
              stagger: { amount: 0.12 },
              ease: "power2.out",
            },
            "<+=0.08"
          );
      } else {
        tl.to(titleTargets, {
          yPercent: 0,
          duration: 0.6,
          stagger: { amount: 0.2 },
          ease: "power2.out",
        })
          .to(
            line,
            {
              scaleX: 1,
              duration: 0.8,
              ease: "power2.out",
            },
            "<+=0.05"
          )
          .to(
            words,
            {
              y: 0,
              opacity: 1,
              duration: 0.55,
              stagger: { amount: 0.2 },
              ease: "power2.out",
            },
            "<+=0.08"
          );
      }

      ScrollTrigger.create({
        trigger: header,
        start: bp.touchDown ? "top 88%" : "top 82%",
        once: true,
        onEnter: () => tl.play(),
      });

      // ==================================================
      // 2) LIST
      //    solo lgUp
      // ==================================================
      if (bp.lgUp) {
        const listContainer = wrap.querySelector(".container-list-serv");
        const lists = listContainer?.querySelectorAll(".list") || [];
        const listLine = listContainer?.querySelector(".list_line");

        if (listContainer && lists.length) {
          const listTl = gsap.timeline({ paused: true });

          if (listLine) {
            listTl.to(
              listLine,
              {
                scaleY: 1,
                duration: 0.6,
                ease: "power2.out",
              },
              0
            );
          }

          listTl.to(
            lists,
            {
              rotateX: 0,
              duration: 0.6,
              stagger: { amount: 0.2 },
              ease: "power2.out",
            },
            0.05
          );

          ScrollTrigger.create({
            trigger: listContainer,
            start: "top 80%",
            end: "top 40%",
            once: true,
            onEnter: () => listTl.play(),
          });
        }
      }

      // ==================================================
      // 3) SERV ANIMATION
      // ==================================================
      const servAnimation = wrap.querySelector(".serv_animation");
      const circlePattern = servAnimation?.querySelector(
        ".service_circle_pattern"
      );
      const expImg = servAnimation?.querySelector(".exp_img");

      if (servAnimation && circlePattern && expImg) {
        const servAnimTl = gsap.timeline({ paused: true });

        gsap.set([circlePattern, expImg], {
          force3D: true,
        });

        servAnimTl
          .to(
            circlePattern,
            {
              scale: 1,
              duration: bp.touchDown ? 0.6 : 0.8,
              ease: bp.touchDown ? "power1.out" : "power1.inOut",
              force3D: true,
            },
            0
          )
          .to(
            expImg,
            {
              scale: 1,
              duration: bp.touchDown ? 0.55 : 0.65,
              ease: bp.touchDown ? "power1.out" : "power1.out",
              force3D: true,
            },
            0.2
          );

        ScrollTrigger.create({
          trigger: servAnimation,
          start: bp.touchDown ? "top 80%" : "top 75%",
          once: true,
          onEnter: () => servAnimTl.play(),
        });
      }
    });
  },
};

function initCtaContactsIntro() {
  if (!window.gsap || !window.ScrollTrigger) return;

  const { gsap, ScrollTrigger } = window;
  const SplitText =
    (gsap.plugins && gsap.plugins.SplitText) || window.SplitText;

  if (!SplitText) {
    console.warn("initCtaContactsIntro: SplitText non disponibile");
    return;
  }

  const bp = {
    lgUp: !!window.bp?.is?.("lgUp"),
    touchDown: !!window.bp?.is?.("touchDown"),
    phoneDown: !!window.bp?.is?.("phoneDown"),
  };

  const blocks = document.querySelectorAll(".cta-contacts");
  if (!blocks.length) return;

  blocks.forEach((block) => {
    const title = block.querySelector(".heading-cta-component");
    const sub = block.querySelector(".sub_heading-cta-component");

    if (!title || !sub) return;

    if (block.dataset.ctaContactsIntroBound === "1") return;
    block.dataset.ctaContactsIntroBound = "1";

    const titleSplit = new SplitText(title, {
      type: "chars",
      charsClass: "cta-contact-char",
      mask: "chars",
    });

    const subSplit = new SplitText(sub, {
      type: "words",
      wordsClass: "cta-contact-word",
      mask: "words",
    });

    const chars = titleSplit.chars || [];
    const words = subSplit.words || [];

    if (!chars.length || !words.length) return;

    gsap.set(chars, {
      yPercent: 100,
    });

    gsap.set(words, {
      y: 50,
      opacity: 0,
    });

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

    ScrollTrigger.create({
      trigger: sub,
      start: bp.phoneDown ? "top 80%" : "top 85%",
      once: true,
      onEnter: () => {
        gsap.to(words, {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: { amount: 0.2 },
          ease: "power2.out",
        });
      },
    });
  });
}

function initStudioWrapperIntro() {
  if (!window.gsap || !window.ScrollTrigger) return;

  const { gsap, ScrollTrigger } = window;
  const SplitText =
    (gsap.plugins && gsap.plugins.SplitText) || window.SplitText;

  if (!SplitText) {
    console.warn("initStudioWrapperIntro: SplitText non disponibile");
    return;
  }

  const bp = {
    lgUp: !!window.bp?.is?.("lgUp"),
    touchDown: !!window.bp?.is?.("touchDown"),
    phoneDown: !!window.bp?.is?.("phoneDown"),
  };

  const studio = document.getElementById("studio-wrapper");
  if (!studio) return;
  if (studio.dataset.studioIntroBound === "1") return;
  studio.dataset.studioIntroBound = "1";

  // ==================================================
  // 1) TITLE .h3_serv  → chars
  // ==================================================
  const title = studio.querySelector(".h3_serv");

  if (title) {
    const titleSplit = new SplitText(title, {
      type: "chars",
      charsClass: "studio-char",
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

  // ==================================================
  // 2) PARAGRAPH .par_txt → lines
  // ==================================================
  const par = studio.querySelector(".par_txt");

  if (par) {
    const parSplit = new SplitText(par, {
      type: "lines",
      linesClass: "line",
    });

    const lines = parSplit.lines || [];

    if (lines.length) {
      gsap.set(lines, { y: 100, opacity: 0 });

      ScrollTrigger.create({
        trigger: par,
        start: bp.phoneDown ? "top 70%" : "top 75%",
        once: true,
        onEnter: () => {
          gsap.to(lines, {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: { amount: 0.2 },
            ease: "power2.out",
          });
        },
      });
    }
  }

  // ==================================================
  // 3) PRE TITLE + LINE dentro .serv_h_wrap
  // ==================================================
  const header = studio.querySelector(".serv_h_wrap");
  const preTitle = header?.querySelector(".section-pre-title");
  const line = header?.querySelector(".line-title-section");

  if (header && preTitle && line) {
    const preSplit = new SplitText(preTitle, {
      type: "words",
      wordsClass: "studio-word",
      mask: "words",
    });

    const words = preSplit.words || [];

    if (words.length) {
      gsap.set(words, { y: 50, opacity: 0 });

      ScrollTrigger.create({
        trigger: header,
        start: bp.phoneDown ? "top 70%" : "top 75%",
        once: true,
        onEnter: () => {
          gsap
            .timeline()
            .to(words, {
              y: 0,
              opacity: 1,
              duration: 0.6,
              stagger: { amount: 0.2 },
              ease: "power2.out",
            })
            .to(
              line,
              {
                scaleX: 1,
                duration: 0.8,
                ease: "power2.out",
              },
              "<+=0.05"
            );
        },
      });
    }
  }

  // ==================================================
  // 4) .ms-img-text-block
  //    studio_img + value-text + value-text.evidenzia + point-value
  // ==================================================
  const msBlocks = studio.querySelectorAll(".ms-img-text-block");

  msBlocks.forEach((block) => {
    const valueText = block.querySelector(".value-text.studio.par");
    const valueTextHighlight = block.querySelector(".value-text.title.studio");
    const pointValues = block.querySelectorAll(".point-value");
    const studioImg = block.querySelector(".studio_img");

    if (!valueText || !pointValues.length || !studioImg) return;

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

function initPropositoHeaderIntro() {
  if (!window.gsap || !window.ScrollTrigger) return;

  const { gsap, ScrollTrigger } = window;
  const SplitText =
    (gsap.plugins && gsap.plugins.SplitText) || window.SplitText;

  if (!SplitText) {
    console.warn("initPropositoHeaderIntro: SplitText non disponibile");
    return;
  }

  const bp = {
    lgUp: !!window.bp?.is?.("lgUp"),
    touchDown: !!window.bp?.is?.("touchDown"),
    phoneDown: !!window.bp?.is?.("phoneDown"),
  };

  const wrap = document.getElementById("proposito");
  if (!wrap) return;
  if (wrap.dataset.propositoIntroBound === "1") return;
  wrap.dataset.propositoIntroBound = "1";

  const header = wrap.querySelector(".serv_h_wrap");
  if (!header) return;

  const title = header.querySelector(".h3_serv");
  const sub = header.querySelector(".h3_sub");
  const line = header.querySelector(".line-title-section");

  if (!title || !sub || !line) return;

  const titleSplit = new SplitText(title, {
    type: "chars",
    charsClass: "proposito-char",
    mask: "chars",
  });

  const subSplit = new SplitText(sub, {
    type: "words",
    wordsClass: "proposito-word",
    mask: "words",
  });

  const chars = titleSplit.chars || [];
  const words = subSplit.words || [];

  if (!chars.length || !words.length) return;

  gsap.set(chars, { yPercent: 100 });
  gsap.set(words, { y: 50, opacity: 0 });

  const tl = gsap.timeline({ paused: true });

  tl.to(chars, {
    yPercent: 0,
    duration: 0.6,
    stagger: { amount: 0.2 },
    ease: "power2.out",
  })
    .to(
      line,
      {
        scaleX: 1,
        duration: 0.8,
        ease: "power2.out",
      },
      "<+=0.05"
    )
    .to(
      words,
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: { amount: 0.2 },
        ease: "power2.out",
      },
      "<+=0.1"
    );

  ScrollTrigger.create({
    trigger: header,
    start: bp.phoneDown ? "top 88%" : "top 82%",
    once: true,
    onEnter: () => tl.play(),
  });
}


Object.assign(window, {
  showcaseTextContentMobile,
  showcasePanelsScrollMobile,
  setupShowcaseButtons,
  setupVerticalShowcaseButtons,
  scrollProgressLine,
  initCtaContactsIntro,
  initStudioWrapperIntro,
  initPropositoHeaderIntro,
});
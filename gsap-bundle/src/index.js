// Importa GSAP da UMD
import { gsap } from "gsap/dist/gsap";

// Importa i plugin di GSAP da dist/
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin";
import { DrawSVGPlugin } from "gsap/dist/DrawSVGPlugin";
import { SplitText } from "gsap/dist/SplitText";


// Importa gli altri moduli
import barba from "@barba/core";
import Lenis from "lenis";
import SplitType from "split-type";

// Registra i plugin con GSAP
gsap.registerPlugin(
  ScrollTrigger, 
  ScrollToPlugin,
  DrawSVGPlugin,
  SplitText
);

// Esporta tutto su window per accesso globale
if (typeof window !== "undefined") {
  window.gsap = gsap;
  window.barba = barba;
  window.Lenis = Lenis;
  window.SplitType = SplitType;

  // Plugin singoli se servono da richiamare separatamente
  window.ScrollTrigger = ScrollTrigger; 
  window.ScrollToPlugin = ScrollToPlugin;
  window.DrawSVGPlugin = DrawSVGPlugin; 
  window.SplitText = SplitText; 
 }




// Importa GSAP base (serve sempre per usare i plugin)
const gsap = window.gsap;

// Importa i plugin aggiuntivi specifici per branding
import { MotionPathPlugin } from "gsap/dist/MotionPathPlugin";
import { Draggable } from "gsap/dist/Draggable";
import { InertiaPlugin } from "gsap/dist/InertiaPlugin";

// Registra i plugin con GSAP
gsap.registerPlugin(
  MotionPathPlugin,  
  InertiaPlugin,
  Draggable,

);

// Esporta su window per compatibilità con Webflow
if (typeof window !== "undefined") {  
 window.MotionPathPlugin = MotionPathPlugin;
  window.Draggable = Draggable;
    window.InertiaPlugin = InertiaPlugin;     
}


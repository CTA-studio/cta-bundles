import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { SplitText } from "gsap/SplitText";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";

import barba from "@barba/core";
import Lenis from "lenis";
import SplitType from "split-type";

gsap.registerPlugin(
  ScrollTrigger,
  DrawSVGPlugin,
  SplitText,
  Draggable,
  InertiaPlugin
);

if (typeof window !== "undefined") {
  window.gsap = gsap;
  window.barba = barba;
  window.Lenis = Lenis;
  window.SplitType = SplitType;

  window.ScrollTrigger = ScrollTrigger;
  window.DrawSVGPlugin = DrawSVGPlugin;
  window.SplitText = SplitText;
  window.Draggable = Draggable;
  window.InertiaPlugin = InertiaPlugin;
}


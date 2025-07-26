import React, { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText as GSAPSplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, GSAPSplitText);

export interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  ease?: string | ((t: number) => number);
  splitType?: "chars" | "words" | "lines" | "words, chars";
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  threshold?: number;
  rootMargin?: string;
  textAlign?: React.CSSProperties["textAlign"];
  onLetterAnimationComplete?: () => void;
}

const SplitText: React.FC<SplitTextProps> = ({
  text,
  className = "",
  delay = 100,
  duration = 0.6,
  ease = "power3.out",
  splitType = "chars",
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = "-100px",
  textAlign = "center",
  onLetterAnimationComplete,
}) => {
  const ref = useRef<HTMLParagraphElement>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  useLayoutEffect(() => {
    if (!ref.current || !text) return;

    const el = ref.current;

    const isLines = splitType === "lines";
    if (isLines) el.style.position = "relative";

    let splitter: GSAPSplitText;

    try {
      splitter = new GSAPSplitText(el, {
        type: splitType,
        absolute: isLines,
        linesClass: "split-line",
      });
    } catch (err) {
      console.error("SplitText init error:", err);
      return;
    }

    const targets =
      splitType === "lines"
        ? splitter.lines
        : splitType === "words"
        ? splitter.words
        : splitter.chars;

    if (!targets || targets.length === 0) {
      console.warn("No targets found for animation.");
      splitter.revert();
      return;
    }

    gsap.set(targets, { willChange: "transform, opacity" });

    // ScrollTrigger config
    const startPct = (1 - threshold) * 100;
    const marginMatch = /^(-?\d+(?:\.\d+)?)(px|em|rem|%)?$/.exec(rootMargin || "");
    const marginVal = marginMatch ? parseFloat(marginMatch[1]) : 0;
    const marginUnit = marginMatch ? marginMatch[2] || "px" : "px";
    const startOffset = marginVal < 0 ? `-=${Math.abs(marginVal)}${marginUnit}` : `+=${marginVal}${marginUnit}`;
    const start = `top ${startPct}%${startOffset}`;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start,
        toggleActions: "play none none none",
        once: true,
        onToggle: (self) => {
          scrollTriggerRef.current = self;
        },
      },
      onComplete: () => {
        gsap.set(targets, { ...to, clearProps: "willChange" });
        onLetterAnimationComplete?.();
      },
    });

    tl.set(targets, { ...from, immediateRender: false, force3D: true });
    tl.to(targets, {
      ...to,
      duration,
      ease,
      stagger: delay / 1000,
      force3D: true,
    });

    return () => {
      tl.kill();
      scrollTriggerRef.current?.kill();
      scrollTriggerRef.current = null;
      gsap.killTweensOf(targets);
      splitter.revert();
    };
  }, [text, delay, duration, ease, splitType, from, to, threshold, rootMargin, onLetterAnimationComplete]);

  return (
    <p
      ref={ref}
      className={`split-parent ${className}`}
      style={{
        textAlign,
        overflow: "hidden",
        display: "inline-block",
        whiteSpace: "normal",
        wordWrap: "break-word",
      }}
    >
      {text}
    </p>
  );
};

export default SplitText;

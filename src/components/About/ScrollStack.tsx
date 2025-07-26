"use client";

import React, {
  ReactNode,
  useRef,
  useCallback,
  useLayoutEffect,
  Children,
} from "react";
import "./ScrollStack.css";

interface ScrollStackProps {
  children: ReactNode;
}

const ScrollStack: React.FC<ScrollStackProps> = ({ children }) => {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const activeCardIndex = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);
  const childrenArray = Children.toArray(children);

  const applyCardEffects = useCallback(() => {
    const viewportCenter = window.innerHeight / 2;
    let newActiveIndex = -1;

    cardRefs.current.forEach((card, i) => {
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const centerY = rect.top + rect.height / 2;
      const distance = Math.abs(viewportCenter - centerY);
      const progress = Math.min(1, distance / (viewportCenter * 1.2));

      const scale = 1 - progress * 0.1;
      const opacity = 1 - Math.pow(progress, 2);

      card.style.setProperty("--scale", scale.toString());
      card.style.setProperty("--opacity", opacity.toString());

      const isActive = scale > 0.98 && opacity > 0.98;
      card.classList.toggle("is-active", isActive);

      // 👇 Show content when close to center
      if (progress < 0.2) {
        card.classList.add("show-content");
      } else {
        card.classList.remove("show-content");
      }

      if (isActive) {
        newActiveIndex = i;
      }
    });

    if (
      newActiveIndex !== -1 &&
      newActiveIndex !== activeCardIndex.current
    ) {
      const activeCard = cardRefs.current[newActiveIndex];
      if (activeCard) {
        activeCard.classList.add("is-snapping");
        activeCard.addEventListener(
          "animationend",
          () => activeCard.classList.remove("is-snapping"),
          { once: true }
        );
      }
      activeCardIndex.current = newActiveIndex;
    }
  }, []);

  const handleScroll = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(applyCardEffects);
  }, [applyCardEffects]);

  const attachMouseEffects = useCallback((card: HTMLDivElement) => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty("--transition-duration", "0.1s");
      card.style.setProperty("--rotate-x", `${(y / rect.height - 0.5) * -20}deg`);
      card.style.setProperty("--rotate-y", `${(x / rect.width - 0.5) * 20}deg`);
    };

    const handleMouseLeave = () => {
      card.style.setProperty("--transition-duration", "0.5s");
      card.style.setProperty("--rotate-x", "0deg");
      card.style.setProperty("--rotate-y", "0deg");
    };

    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseleave", handleMouseLeave);
  }, []);

  useLayoutEffect(() => {
    cardRefs.current = cardRefs.current.slice(0, childrenArray.length);

    cardRefs.current.forEach((card) => {
      if (card) attachMouseEffects(card);
    });

    window.addEventListener("scroll", handleScroll, { passive: true });
    applyCardEffects();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [childrenArray.length, handleScroll, applyCardEffects, attachMouseEffects]);

  return (
    <div className="scroll-stack-container mt-20">
      {childrenArray.map((child, i) => (
        <div key={i} className="scroll-stack-card-wrapper mt-20">
          <div
            className="scroll-stack-card"
            ref={(el) => (cardRefs.current[i] = el)}
          >
            <div className="card-content">{child}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ScrollStack;

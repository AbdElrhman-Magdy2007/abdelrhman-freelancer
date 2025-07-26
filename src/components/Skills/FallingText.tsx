import { useRef, useState, useEffect } from "react";
import Matter from "matter-js";
import "./FallingText.css";

interface FallingTextProps {
  text?: string;
  highlightWords?: string[];
  highlightClass?: string;
  trigger?: "auto" | "scroll" | "click" | "hover" | "touch";
  backgroundColor?: string;
  wireframes?: boolean;
  gravity?: number;
  mouseConstraintStiffness?: number;
  fontSize?: string;
}

const FallingText: React.FC<FallingTextProps> = ({
  text = "",
  highlightWords = [],
  highlightClass = "highlighted",
  trigger = "click",
  backgroundColor = "transparent",
  wireframes = false,
  gravity = 1.2,
  mouseConstraintStiffness = 0.2,
  fontSize = "1.25rem",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const [effectStarted, setEffectStarted] = useState(false);

  // Render the words as spans
  useEffect(() => {
    if (!textRef.current) return;

    const words = text.split(" ");
    textRef.current.innerHTML = words
      .map((word) => {
        const isHighlighted = highlightWords.includes(word);
        return `<span class="word ${isHighlighted ? highlightClass : ""}">${word}</span>`;
      })
      .join(" ");
  }, [text, highlightWords, highlightClass]);

  // Handle animation trigger types
  useEffect(() => {
    if (trigger === "auto") {
      setEffectStarted(true);
    } else if (trigger === "scroll" && containerRef.current) {
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          setEffectStarted(true);
          observer.disconnect();
        }
      }, { threshold: 0.3 });
      observer.observe(containerRef.current);
      return () => observer.disconnect();
    }
  }, [trigger]);

  // Matter.js animation effect
  useEffect(() => {
    if (!effectStarted || !containerRef.current || !canvasContainerRef.current || !textRef.current) return;

    const { Engine, Render, World, Bodies, Runner, Mouse, MouseConstraint, Body } = Matter;
    const engine = Engine.create();
    engine.world.gravity.y = gravity;

    const containerRect = containerRef.current.getBoundingClientRect();
    const width = containerRect.width;
    const height = containerRect.height;

    const render = Render.create({
      element: canvasContainerRef.current,
      engine,
      options: {
        width,
        height,
        background: backgroundColor,
        wireframes,
      },
    });

    const wallOptions = { isStatic: true, render: { visible: false } };
    const boundaries = [
      Bodies.rectangle(width / 2, height + 50, width, 100, wallOptions),
      Bodies.rectangle(-25, height / 2, 50, height, wallOptions),
      Bodies.rectangle(width + 25, height / 2, 50, height, wallOptions),
      Bodies.rectangle(width / 2, -50, width, 100, wallOptions),
    ];

    const spans = textRef.current.querySelectorAll<HTMLSpanElement>(".word");
    const wordBodies = Array.from(spans).map((elem) => {
      const rect = elem.getBoundingClientRect();
      const x = rect.left - containerRect.left + rect.width / 2;
      const y = rect.top - containerRect.top + rect.height / 2;

      const body = Bodies.rectangle(x, y, rect.width, rect.height, {
        render: { fillStyle: "transparent" },
        restitution: 0.9,
        frictionAir: 0.03,
      });

      Body.setVelocity(body, { x: (Math.random() - 0.5) * 3, y: 0 });
      Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.05);

      elem.style.position = "absolute";
      elem.style.left = `${x}px`;
      elem.style.top = `${y}px`;
      elem.style.transform = "translate(-50%, -50%)";

      return { elem, body };
    });

    const mouse = Mouse.create(containerRef.current);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: mouseConstraintStiffness,
        render: { visible: false },
      },
    });

    World.add(engine.world, [
      ...boundaries,
      ...wordBodies.map(w => w.body),
      mouseConstraint,
    ]);

    Render.run(render);
    const runner = Runner.create();
    Runner.run(runner, engine);

    const update = () => {
      wordBodies.forEach(({ elem, body }) => {
        elem.style.left = `${body.position.x}px`;
        elem.style.top = `${body.position.y}px`;
        elem.style.transform = `translate(-50%, -50%) rotate(${body.angle}rad)`;
      });
      requestAnimationFrame(update);
    };
    update();

    return () => {
      Render.stop(render);
      Runner.stop(runner);
      if (render.canvas && canvasContainerRef.current) {
        canvasContainerRef.current.removeChild(render.canvas);
      }
      World.clear(engine.world, false);
      Engine.clear(engine);
    };
  }, [effectStarted]);

  // Trigger function
  const handleTrigger = () => {
    if (!effectStarted) setEffectStarted(true);
  };

  // 🔥 دعم اللمس والنقر
  const triggerEvents = trigger === "click" || trigger === "touch" ? {
    onClick: handleTrigger,
    onTouchStart: handleTrigger,
  } : trigger === "hover" ? {
    onMouseEnter: handleTrigger,
  } : {};

  return (
    <div
      ref={containerRef}
      className="falling-text-container"
      {...triggerEvents}
      style={{
        position: "relative",
        overflow: "hidden",
        padding: "2rem",
        minHeight: "300px",
        background: "rgba(0,0,0,0.15)",
        borderRadius: "1rem",
        userSelect: "none",
      }}
    >
      <div
        ref={textRef}
        className="falling-text-target"
        style={{
          fontSize,
          lineHeight: 1.6,
          textAlign: "center",
          maxWidth: "800px",
          margin: "0 auto",
          position: "relative",
        }}
      />
      <div
        ref={canvasContainerRef}
        className="falling-text-canvas"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 0,
        }}
      />
    </div>
  );
};

export default FallingText;

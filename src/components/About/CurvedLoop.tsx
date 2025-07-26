import {
  useRef,
  useEffect,
  useState,
  useMemo,
  useId,
  FC,
  PointerEvent,
} from "react";
import "./CurvedLoop.css";

interface CurvedLoopProps {
  marqueeText?: string;
  speed?: number;
  className?: string;
  curveAmount?: number;
  direction?: "left" | "right";
  interactive?: boolean;
}

const CurvedLoop: FC<CurvedLoopProps> = ({
  marqueeText = "",
  speed = 2,
  className,
  curveAmount = 400,
  direction = "left",
  interactive = true,
}) => {
  const uid = useId();
  const pathId = `curve-${uid}`;

  // ✅ منحنى لأسفل (شكل "n")
  const pathD = `M-100,${40 + curveAmount} Q500,40 1540,${40 + curveAmount}`;

  const measureRef = useRef<SVGTextElement>(null);
  const tspansRef = useRef<SVGTSpanElement[]>([]);
  const pathRef = useRef<SVGPathElement>(null);

  const dragRef = useRef(false);
  const lastXRef = useRef(0);
  const dirRef = useRef<"left" | "right">(direction);
  const velRef = useRef(0);

  const [spacing, setSpacing] = useState(0);
  const [pathLength, setPathLength] = useState(0);

  const text = useMemo(() => {
    const trimmed = marqueeText.trimEnd();
    return trimmed + "\u00A0";
  }, [marqueeText]);

  const repeats = useMemo(() => {
    return pathLength && spacing ? Math.ceil(pathLength / spacing) + 2 : 0;
  }, [pathLength, spacing]);

  const ready = pathLength > 0 && spacing > 0;

  useEffect(() => {
    if (measureRef.current) {
      setSpacing(measureRef.current.getComputedTextLength());
    }
  }, [text]);

  useEffect(() => {
    if (pathRef.current) {
      setPathLength(pathRef.current.getTotalLength());
    }
  }, [curveAmount]);

  useEffect(() => {
    if (!spacing) return;

    let frameId: number;

    const animate = () => {
      tspansRef.current.forEach((t) => {
        if (!t) return;
        let x = parseFloat(t.getAttribute("x") || "0");
        const delta = !dragRef.current
          ? dirRef.current === "right"
            ? Math.abs(speed)
            : -Math.abs(speed)
          : 0;
        x += delta;

        const maxX = (repeats - 1) * spacing;
        if (x < -spacing) x = maxX;
        if (x > maxX) x = -spacing;
        t.setAttribute("x", x.toString());
      });

      frameId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(frameId);
  }, [spacing, speed, repeats]);

  const onPointerDown = (e: PointerEvent) => {
    if (!interactive) return;
    dragRef.current = true;
    lastXRef.current = e.clientX;
    velRef.current = 0;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: PointerEvent) => {
    if (!interactive || !dragRef.current) return;
    const dx = e.clientX - lastXRef.current;
    lastXRef.current = e.clientX;
    velRef.current = dx;

    tspansRef.current.forEach((t) => {
      if (!t) return;
      let x = parseFloat(t.getAttribute("x") || "0");
      x += dx;

      const maxX = (repeats - 1) * spacing;
      if (x < -spacing) x = maxX;
      if (x > maxX) x = -spacing;

      t.setAttribute("x", x.toString());
    });
  };

  const endDrag = () => {
    if (!interactive) return;
    dragRef.current = false;
    dirRef.current = velRef.current > 0 ? "right" : "left";
  };

  const cursor = interactive
    ? dragRef.current
      ? "grabbing"
      : "grab"
    : "default";

  return (
    <div
      // className="curved-loop-jacket"
      style={{ visibility: ready ? "visible" : "hidden", cursor }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerLeave={endDrag}
    >
      <svg className="curved-loop-svg" viewBox="0 0 1440 120">
        {/* قياس النص المخفي */}
        <text
          ref={measureRef}
          xmlSpace="preserve"
          style={{ visibility: "hidden", opacity: 0, pointerEvents: "none" }}
        >
          {text}
        </text>

        {/* مسار المنحنى */}
        <defs>
          <path
            ref={pathRef}
            id={pathId}
            d={pathD}
            fill="none"
            stroke="transparent"
          />
        </defs>

        {/* نص متكرر على المسار */}
        {ready && (
          // <text
          //   fontWeight="bold"
          //   fontSize="60" // ✅ حجم الخط أصغر
          //   xmlSpace="preserve"
          //   className={className}
          // >
          <text
  fontWeight="bold"
  xmlSpace="preserve"
  className={`font-bold ${className} text-[98px] sm:text-[90px] md:text-[70px]`}
>

            <textPath href={`#${pathId}`}>
              {Array.from({ length: repeats }).map((_, i) => (
                <tspan
                  key={i}
                  x={i * spacing}
                  ref={(el) => {
                    if (el) tspansRef.current[i] = el;
                  }}
                >
                  {text}
                </tspan>
              ))}
            </textPath>
          </text>
        )}
      </svg>
    </div>
  );
};

export default CurvedLoop;

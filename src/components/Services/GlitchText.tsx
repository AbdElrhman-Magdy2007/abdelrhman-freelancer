// components/GlitchText.tsx
import { FC, CSSProperties } from "react";
import "./GlitchText.css";

interface GlitchTextProps {
  children: string;
  speed?: number;
  enableShadows?: boolean;
  enableOnHover?: boolean;
  className?: string;
}

const GlitchText: FC<GlitchTextProps> = ({
  children,
  speed = 0.5,
  enableShadows = true,
  enableOnHover = false,
  className = "",
}) => {
  const style: CSSProperties & Record<string, string> = {
    "--before-duration": `${speed * 2}s`,
    "--after-duration": `${speed * 3}s`,
    "--before-shadow": enableShadows ? "5px 0 cyan" : "none",
    "--after-shadow": enableShadows ? "-5px 0 red" : "none",
  };

  return (
    <div
      className={`glitch ${enableOnHover ? "hover-enabled" : ""} ${className}`}
      style={style}
      data-text={children}
    >
      {children}
    </div>
  );
};

export default GlitchText;

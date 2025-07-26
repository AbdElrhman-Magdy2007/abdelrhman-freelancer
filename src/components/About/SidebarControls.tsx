import React from "react";

interface Props {
  config: {
    itemDistance: number;
    itemScale: number;
    itemStackDistance: number;
    baseScale: number;
    rotationAmount: number;
    blurAmount: number;
  };
  onChange: (key: string, value: number) => void;
}

const SidebarControls: React.FC<Props> = ({ config, onChange }) => {
  return (
    <div className="fixed left-0 top-0 w-64 h-full bg-black/80 backdrop-blur text-white p-4 space-y-4 z-50">
      <h3 className="text-xl font-bold mb-4">ScrollStack Settings</h3>

      {Object.entries(config).map(([key, value]) => (
        <div key={key} className="flex flex-col">
          <label className="text-sm capitalize">{key.replace(/([A-Z])/g, " $1")}</label>
          <input
            type="range"
            min={key === "baseScale" ? 0.5 : 0}
            max={key === "baseScale" ? 1 : 100}
            step={0.01}
            value={value}
            onChange={(e) => onChange(key, parseFloat(e.target.value))}
          />
        </div>
      ))}
    </div>
  );
};

export default SidebarControls;

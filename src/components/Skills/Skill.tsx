import React from "react";
import FallingText from "./FallingText";

const Skill = () => {
  return (
    <section className="w-full min-h-screen flex flex-col items-center justify-center bg-black text-white px-4">
      <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-wide relative">
        <span className="text-[#00f0ff]">My</span> Skills
      </h2>

      <FallingText
        text="React Bits animated components simplify development and enhance UI"
        highlightWords={["React", "Bits", "animated", "components", "simplify"]}
        highlightClass="highlighted"
        trigger="hover"
        backgroundColor="transparent"
        wireframes={false}
        gravity={0.56}
        fontSize="2rem"
        mouseConstraintStiffness={0.9}
      />
    </section>
  );
};

export default Skill;

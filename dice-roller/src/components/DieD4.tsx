import type React from "react";
import "./Dice.css"

interface PolyDieProps {
  value: number;
  isRolling: boolean;
}

export const DieD4: React.FC<PolyDieProps> = ({ value, isRolling }) => {
  return (
    <div className={`die-d4 ${isRolling ? "rolling" : ""}`}>
      {/* Just display the rolled number right in the center */}
      <span>{value}</span>
    </div>
  );
};

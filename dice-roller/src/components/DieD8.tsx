import type React from "react";
import "./Dice.css"

interface PolyDieProps {
  value: number;
  isRolling: boolean;
}

export const DieD8: React.FC<PolyDieProps> = ({ value, isRolling }) => {
  return (
    <div className={`die-d8 ${isRolling ? "rolling" : ""}`}>
      <span>{value}</span>
    </div>
  );
};

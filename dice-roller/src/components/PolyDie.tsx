import React from "react";
import "./Dice.css";

export type DieType = 4 | 6 | 8 | 10 | 12 | 20 | 100;

export interface PolyDieProps {
  sides: DieType;
  value: number;
  isRolling: boolean;
}

export const PolyDie: React.FC<PolyDieProps> = ({
  sides,
  value,
  isRolling,
}) => {
  let displayValue = value.toString();

  if (sides === 100) {
    const tens = (value % 10) * 10;

    displayValue = tens === 0 ? '00' : tens.toString();
  }
  
  return (
    <div className={`die-base shape-d${sides} ${isRolling ? "rolling" : ""}`}>
      <span>{displayValue}</span>
    </div>
  );
};

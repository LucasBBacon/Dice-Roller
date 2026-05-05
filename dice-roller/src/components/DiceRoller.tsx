import type React from "react";
import { useRef, useState } from "react";
import "./DiceRoller.css";
import { PolyDie } from "./PolyDie";

type DieType = 4 | 6 | 8 | 10 | 12 | 20 | 100;

const DICE_SET: DieType[] = [4, 6, 8, 10, 12, 20, 100];

export const DiceRoller: React.FC = () => {
  const [activeSides, setActiveSides] = useState<DieType>(20);
  const [value, setValue] = useState<number>(1);
  const [isRolling, setIsRolling] = useState<boolean>(false);

  // Use a ref to store the interval ID, easier to clear it later
  const rollInterval = useRef<number | null>(null);

  const rollDice = () => {
    // Prevent clicking while already rolling
    if (isRolling) return;

    setIsRolling(true);

    // Start cycling numbers based on the currently active dice
    rollInterval.current = window.setInterval(() => {
      setValue(Math.floor(Math.random() * activeSides) + 1);
    }, 80); // Change face every 80ms

    // Stop the interval after 1 second and set the final result
    setTimeout(() => {
      if (rollInterval.current) {
        clearInterval(rollInterval.current);
      }

      // final, official roll
      setValue(Math.floor(Math.random() * activeSides) + 1);
      setIsRolling(false);
    }, 1000);
  };

  const handleDieChange = (sides: DieType) => {
    if (isRolling) return;
    setActiveSides(sides);
    setValue(sides);
  };

  return (
    <div className="dice-roller">
      <div className="dice-btn">
        {DICE_SET.map((sides) => (
          <button
            key={sides}
            onClick={() => handleDieChange(sides)}
            disabled={isRolling}
            className={`die-btn ${isRolling ? "rolling" : ""} ${activeSides === sides ? "selected" : ""}`}
          >
            d{sides}
          </button>
        ))}
      </div>

      <div className="active-die">
        <PolyDie sides={activeSides} value={value} isRolling={isRolling} />
      </div>

      <button
        onClick={rollDice}
        disabled={isRolling}
        className={`roll-btn ${isRolling ? "rolling" : ""}`}
      >
        {isRolling
          ? "Rolling..."
          : `Roll d${activeSides === 100 ? "%" : activeSides}`}
      </button>
    </div>
  );
};

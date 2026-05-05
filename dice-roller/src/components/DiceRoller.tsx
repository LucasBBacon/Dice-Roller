import type React from "react";
import { useRef, useState } from "react";
import { Die } from "./Die";

export const DiceRoller: React.FC = () => {
  const [value, setValue] = useState<number>(1);
  const [isRolling, setIsRolling] = useState<boolean>(false);

  // Use a ref to store the interval ID, easier to clear it later
  const rollInterval = useRef<number | null>(null);

  const rollDice = () => {
    // Prevent clicking while already rolling
    if (isRolling) return;

    setIsRolling(true);

    // Start cycling numbers
    rollInterval.current = window.setInterval(() => {
      setValue(Math.floor(Math.random() * 6) + 1);
    }, 80); // Change face every 80ms

    // Stop the interval after 1 second and set the final result
    setTimeout(() => {
      if (rollInterval.current) {
        clearInterval(rollInterval.current);
      }

      // final, official roll
      setValue(Math.floor(Math.random() * 6) + 1);
      setIsRolling(false);
    }, 1000);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
      }}
    >
      <Die value={value} isRolling={isRolling} />

      <button onClick={rollDice} disabled={isRolling} style={{}}>
        {isRolling ? "Rolling..." : "Roll Dice"}
      </button>
    </div>
  );
};

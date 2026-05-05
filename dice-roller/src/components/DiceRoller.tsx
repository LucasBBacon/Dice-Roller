import type React from "react";
import { useRef, useState } from "react";
import "./DiceRoller.css";
import { PolyDie } from "./PolyDie";

type DieType = 4 | 6 | 8 | 10 | 12 | 20 | 100;

const DICE_SET: DieType[] = [4, 6, 8, 10, 12, 20, 100];

export const DiceRoller: React.FC = () => {
  const [activeSides, setActiveSides] = useState<DieType>(20);
  const [diceCount, setDiceCount] = useState<number>(1);
  const [values, setValues] = useState<number[]>([20]);
  const [isRolling, setIsRolling] = useState<boolean>(false);

  // Use a ref to store the interval ID, easier to clear it later
  const rollInterval = useRef<number | null>(null);

  const generateRolls = (count: number, sides: number) => {
    return Array.from(
      { length: count },
      () => Math.floor(Math.random() * sides) + 1,
    );
  };

  const rollDice = () => {
    // Prevent clicking while already rolling
    if (isRolling) return;
    setIsRolling(true);

    // Start cycling numbers based on the currently active dice
    rollInterval.current = window.setInterval(() => {
      setValues(generateRolls(diceCount, activeSides));
    }, 80); // Change face every 80ms

    // Stop the interval after 1 second and set the final result
    setTimeout(() => {
      if (rollInterval.current) clearInterval(rollInterval.current);
      // final, official roll
      setValues(generateRolls(diceCount, activeSides));
      setIsRolling(false);
    }, 1000);
  };

  const handleDieChange = (sides: DieType) => {
    if (isRolling) return;
    setActiveSides(sides);
    setValues(Array(diceCount).fill(sides));
  };

  const handleCountChange = (amount: number) => {
    if (isRolling) return;
    const newCount = Math.max(1, Math.min(10, diceCount + amount));
    setDiceCount(newCount);
    setValues(Array(newCount).fill(activeSides));
  };

  const totalSum = values.reduce((sum, val) => sum + val, 0);
  const dieLabel = activeSides === 100 ? "%" : activeSides;

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
            d{sides === 100 ? "%" : sides}
          </button>
        ))}
      </div>

      {/* Dice Quantity Selector */}
      <div className="quantity-selector">
        <span className="quantity-label">Quantity:</span>
        <button
          onClick={() => handleCountChange(-1)}
          disabled={isRolling || diceCount <= 1}
          className="quantity-btn"
        >
          -
        </button>
        <span className="quantity-value">{diceCount}</span>
        <button
          onClick={() => handleCountChange(1)}
          disabled={isRolling || diceCount >= 10}
          className="quantity-btn"
        >
          +
        </button>
      </div>

      {/* Interactive dice tray */}
      <div
        className={`dice-tray ${isRolling ? "disabled" : ""}`}
        onClick={rollDice}
      >
        {/* on hover overlay */}
        {!isRolling && (
          <div className="dice-tray-overlay">
            Roll {diceCount}d{dieLabel}
          </div>
        )}

        {/* Mapped dice */}
        {values.map((val, index) => (
          <PolyDie
            key={index}
            sides={activeSides}
            value={val}
            isRolling={isRolling}
          />
        ))}
      </div>

      {/* Total */}
      {!isRolling && (
        <h2 className="total-label">
          Total: <span className="total-value">{totalSum}</span>
        </h2>
      )}
    </div>
  );
};

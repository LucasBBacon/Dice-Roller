import type React from "react";
import './Dice.css'

interface DieProps {
  value: number;
  isRolling: boolean;
}

// Maps a dice value to the  correct indices in a 9-item grid (0 - 8)
const PIP_POSITIONS: Record<number, number[]> = {
  1: [4], // Center
  2: [0, 8], // Top-left, Bottom-right
  3: [0, 4, 8], // Top-left, Center, Bottom-right
  4: [0, 2, 6, 8], // 4 corners
  5: [0, 2, 4, 6, 8], // 4 corners, Center
  6: [0, 2, 3, 5, 6, 8], // 4 Corners, Middle-left/right
};

export const Die: React.FC<DieProps> = ({ value, isRolling }) => {
  // Fallback to 1 if something goes wrong
  const activePips = PIP_POSITIONS[value] || PIP_POSITIONS[1];

  return (
    <div className={`die ${isRolling ? "rolling" : ""}`}>
      {/* Create an array of 9 empty slots for CSS grid */}
      {Array.from({ length: 9 }).map((_, index) => (
        <div key={index} className="pip-container">
          {/* Only render the pip if this index is active for current value */}
          {activePips.includes(index) && <div className="pip" />}
        </div>
      ))}
    </div>
  );
};

import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const Pip = () => <span className="pip" />;

const Face = ({ children }) => <div className="face">{children}</div>;

const Die = ({ value }) => {
  let pips = Number.isInteger(value)
    ? Array(value)
        .fill(0)
        .map((_, i) => <Pip key={i} />)
    : null;
  return <Face>{pips}</Face>;
};

export default function Dice({ value, isRolling }) {
  const [diceNumber, setDiceNumber] = useState(value);
  useEffect(() => {
    if (isRolling) {
      const interval = setInterval(() => {
        setDiceNumber(Math.floor(Math.random() * 6) + 1);
      }, 50);

      return () => clearInterval(interval);
    } else {
      setDiceNumber(value);
    }
  });

  return (
    <div className="dice">
      <Die value={diceNumber || 2} />
    </div>
  );
}

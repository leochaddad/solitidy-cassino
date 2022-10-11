import React from "react";
import Dice from "./Dice";

export default function Result({ result, playAgain }) {
  const loading = result.roll === "LOADING";
  const number = Number.isInteger(result.number)
    ? result.number
    : Number.parseInt(result.number);

  return (
    <div>
      <div className="stats shadow">
        <div className="stat">
          <div className="stat-title">Sua aposta</div>
          <div className="stat-value">{<Dice value={number} />}</div>
        </div>
        <div className="stat">
          <div className="stat-title">Resultado</div>
          <div className="stat-value">
            {<Dice value={result.roll} isRolling={loading} />}
          </div>
        </div>
      </div>
      {!loading && (
        <div className="w-full	justify-center">
          <p className="text-2xl font-bold text-center ">
            {result.roll === result.number
              ? "Você ganhou 🎉"
              : "Você perdeu 🙁"}
          </p>
          <div className="card-actions justify-end mt-4">
            <button className="btn btn-secondary" onClick={playAgain}>
              Jogar novamente
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

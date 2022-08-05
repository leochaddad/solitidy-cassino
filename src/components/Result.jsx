import React from "react";

export default function Result({ result, playAgain }) {
  const loading = result.roll === "LOADING";

  return (
    <div>
      <div className="stats shadow">
        <div className="stat">
          <div className="stat-title">Sua aposta</div>
          <div className="stat-value">{result.number}</div>
        </div>
        <div className="stat">
          <div className="stat-title">Resultado</div>
          <div className="stat-value">{result.roll}</div>
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

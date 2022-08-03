import { ethers } from "ethers";
import React from "react";
import { useDiceGame } from "../hooks/useDiceGame";

export default function History() {
  const { games, getGames } = useDiceGame();

  return (
    <div>
      <button onClick={getGames}>Get Games</button>

      {games && games.length > 0 ? (
        games.map((game, index) => (
          <div key={index}>
            <Game game={game} />
          </div>
        ))
      ) : (
        <div>No games</div>
      )}
    </div>
  );
}

// Sample output of a game:
// [betAmount, roll, won, player]
// [{"type":"BigNumber","hex":"0x0de0b6b3a7640000"},{"type":"BigNumber","hex":"0x05"},false,"0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65"]
const Game = ({ game }) => {
  const diceRoll = ethers.BigNumber.from(game[1]).toNumber();
  const won = game[2];
  const betAmount = ethers.utils.formatEther(ethers.BigNumber.from(game[0]), {
    decimals: 2,
  });

  const player = game[3];
  return (
    <div>
      <div>Player: {player}</div>
      <div>Bet: {betAmount.toString()}</div>
      <div>Roll: {diceRoll.toString()}</div>
      <div>Won: {won ? "true" : "false"}</div>
    </div>
  );
};

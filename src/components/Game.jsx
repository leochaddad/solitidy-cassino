import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { useDiceGame } from "../hooks/useDiceGame";

import History from "./History";

export default function Game() {
  const { contract, getGames } = useDiceGame();
  const [loading, setLoading] = useState(false);
  const [diceNumber, setDiceNumber] = useState(1);
  const [betAmount, setBetAmount] = useState(0.1);

  async function bet() {
    const receipt = await contract
      .bet(diceNumber, {
        value: ethers.utils.parseEther("1.0"),
      })
      .then((t) => {
        setLoading(true);

        t.wait();
      });
  }

  useEffect(() => {
    contract.removeAllListeners("GamePlayed");
    contract.on("GamePlayed", (player, number, roll, won) => {
      // alert(`${player} played ${number} and rolled ${roll} and won ${won}`);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div>
        <select
          onChange={(e) => {
            setDiceNumber(e.target.value);
          }}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
        </select>
        <button onClick={bet}> Bet 1 ETH </button>
      </div>
      <History />
    </>
  );
}

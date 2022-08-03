import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { useDiceGame } from "../hooks/useDiceGame";

import History from "./History";

export default function Game() {
  const { contract, getGames } = useDiceGame();
  const [loading, setLoading] = useState(false);

  async function bet() {
    setLoading(true);
    const receipt = await contract
      .bet(2, {
        value: ethers.utils.parseEther("1.0"),
      })
      .then((t) => t.wait());

    console.log("data");
    console.log(receipt);
  }

  useEffect(() => {
    contract.removeAllListeners("GamePlayed");
    contract.on("GamePlayed", (player, roll, won) => {
      console.log({ player, roll, won });
      getGames();
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div>
        <button onClick={bet}> Bet 1 ETH </button>
      </div>
      <History />
    </>
  );
}

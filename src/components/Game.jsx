import { ethers } from "ethers";
import { useDiceGame } from "../hooks/useDiceGame";

import History from "./History";

export default function Game() {
  const { contract } = useDiceGame();

  async function bet() {
    const res = await contract.bet(2, {
      value: ethers.utils.parseEther("1.0"),
    });

    const data = await res.wait();
    console.log("data");
    console.log(data);
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

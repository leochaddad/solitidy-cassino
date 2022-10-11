import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { useDiceGame } from "../hooks/useDiceGame";

import History from "./History";
import Result from "./Result";

export default function Game() {
  const { contract } = useDiceGame();

  const [diceNumber, setDiceNumber] = useState(null);
  const [betAmount, setBetAmount] = useState(0.1);
  const [result, setResult] = useState({
    number: null,
    roll: null,
  });

  async function bet() {
    await contract
      .bet(diceNumber, {
        value: ethers.utils.parseEther("1.0"),
      })
      .then((t) => {
        setResult({
          number: diceNumber,
          roll: "LOADING",
        });
        t.wait();
      });
  }

  useEffect(() => {
    contract.removeAllListeners("GamePlayed");
    contract.on("GamePlayed", (player, number, roll, won) => {
      console.log;
      setResult({
        number: ethers.BigNumber.from(number).toNumber(),
        roll: ethers.BigNumber.from(roll).toNumber(),
      });
    });
  }, []);

  return (
    <>
      <div class="card bg-base-100 shadow-xl m-auto mt-16 w-fit ">
        <div class="card-body opacity-1">
          {result.roll ? (
            <Result
              result={result}
              playAgain={() => {
                setResult({
                  number: null,
                  roll: null,
                });
              }}
            />
          ) : (
            <div>
              <select
                className="select w-full max-w-xs  select-secondary "
                onChange={(e) => {
                  setDiceNumber(e.target.value);
                }}
              >
                <option disabled selected>
                  Escolha o número do dado
                </option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
              </select>
              <div class="card-actions justify-end mt-4">
                <button
                  onClick={bet}
                  className="btn btn-primary"
                  disabled={diceNumber === null || result.roll === "LOADING"}
                >
                  Apostar 1 ether
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

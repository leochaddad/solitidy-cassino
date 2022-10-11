import { useEffect, useState } from "react";
import { ethers } from "ethers";

export default function Balance() {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    window.ethereum
      .request({
        method: "eth_requestAccounts",
      })
      .then(([account]) => {
        provider.on("block", () => {
          provider.getBalance(account).then((newBalance) => {
            if (balance !== newBalance) {
              setBalance(newBalance);
            }
          });
        });
      });
  }, []);

  return (
    <div className="navbar bg-base-100 space-x-2">
      <a className="btn btn-ghost normal-case text-xl">Cassino</a>
      <a className="normal-case text-sm">
        Balance: {ethers.utils.formatEther(balance)} ETH
      </a>
    </div>
  );
}

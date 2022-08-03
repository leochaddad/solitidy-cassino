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
    <div>
      <h1>Balance: {ethers.utils.formatEther(balance)} ETH</h1>
    </div>
  );
}

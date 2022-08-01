import { useState } from "react";
import { ethers } from "ethers";

export default function Balance() {
  const [balance, setBalance] = useState(0);

  const getBalance = async () => {
    const [account] = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    console.log(account);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const balance = await provider.getBalance(account);

    setBalance(ethers.utils.formatEther(balance));
  };

  return (
    <div>
      <h1>Balance: {balance} ETH</h1>
      <button onClick={getBalance}>Get Balance</button>
    </div>
  );
}

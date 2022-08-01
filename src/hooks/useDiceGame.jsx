import DiceGame from "../../artifacts/contracts/DiceGame.sol/DiceGame.json";
import { ethers } from "ethers";
import { createContext } from "react";
import { useContext } from "react";

const DiceGameContext = createContext({});

export const DiceGameProvider = ({ children }) => {
  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

  const provider = new ethers.providers.Web3Provider(window.ethereum);

  const signer = provider.getSigner();

  const contract = new ethers.Contract(contractAddress, DiceGame.abi, signer);

  return (
    <DiceGameContext.Provider value={{ contract }}>
      {children}
    </DiceGameContext.Provider>
  );
};

export const useDiceGame = () => useContext(DiceGameContext);

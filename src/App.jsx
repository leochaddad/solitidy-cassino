import "./App.css";
import NoMetamask from "./components/NoMetamask";
import Home from "./components/Home";
import { DiceGameProvider } from "./hooks/useDiceGame";

function App() {
  if (!window.ethereum) {
    return <NoMetamask />;
  } else {
    return (
      <DiceGameProvider>
        <Home />
      </DiceGameProvider>
    );
  }
}

export default App;

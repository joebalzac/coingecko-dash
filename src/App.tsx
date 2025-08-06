import CoinGrid from "./components/CoinGrid";

function App() {
  return (
    <div className="h-full flex flex-col justify-center items-center px-12">
      <h1 className="text-4xl py-8">Crypto Dash</h1>
      <CoinGrid />
    </div>
  );
}

export default App;

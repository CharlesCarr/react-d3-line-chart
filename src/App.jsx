import "./App.css";
import LineChart from "./components/LineChart";

function App() {
  return (
    <div className="text-blue-500 flex flex-col justify-center items-center p-20">
      <h1 className="font-bold text-4xl mb-10">D3 Line Chart</h1>
      <LineChart />
    </div>
  );
}

export default App;

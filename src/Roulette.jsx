import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function RouletteTracker() {
  const [numbers, setNumbers] = useState([]);

  const getRouletteDetails = (num) => {
    let color = "Black";
    let oddEven = "Neither";
    let highLow = "Neither";
    let column = "None";
    let group = "None";

    if (num === 0) {
      color = "Green";
    } else if ([1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36].includes(num)) {
      color = "Red";
    }

    if (num > 0) {
      oddEven = num % 2 === 0 ? "Even" : "Odd";
      highLow = num <= 18 ? "Low" : "High";
    }

    if ([1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34].includes(num)) {
      column = "1";
    } else if ([2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35].includes(num)) {
      column = "2";
    } else if ([3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36].includes(num)) {
      column = "3";
    }

    if (num >= 1 && num <= 12) {
      group = "S";
    } else if (num >= 13 && num <= 24) {
      group = "M";
    } else if (num >= 25 && num <= 36) {
      group = "L";
    }

    return { color, oddEven, highLow, column, group };
  };

  const countOccurrences = (lastN) => {
    const recentNumbers = numbers.slice(-lastN).map(n => n.number);
    const counts = {};
    
    for (let num of recentNumbers) {
      counts[num] = (counts[num] || 0) + 1;
    }

    return counts;
  };

  const getCategorizedNumbers = () => {
    const last20Counts = countOccurrences(20);
    const last80Numbers = numbers.slice(-80).map(n => n.number);

    let appearedOnce = [];
    let appearedTwice = [];
    let appearedThreeOrMore = [];
    let notAppearedIn80 = [];
    let hotNumbers = [];
    let coldNumbers = [];

    for (let i = 0; i <= 36; i++) {
      if (last20Counts[i] === 1) appearedOnce.push(i);
      else if (last20Counts[i] === 2) appearedTwice.push(i);
      else if (last20Counts[i] >= 3) appearedThreeOrMore.push(i);

      if (!last80Numbers.includes(i)) notAppearedIn80.push(i);
    }

    // Determine Hot & Cold Numbers
    const sortedNumbers = Object.entries(last20Counts).sort((a, b) => b[1] - a[1]);
    if (sortedNumbers.length > 0) {
      hotNumbers = sortedNumbers.slice(0, 3).map(([num]) => num);
      coldNumbers = sortedNumbers.filter(([_, count]) => count === 1).map(([num]) => num);
    }

    return { appearedOnce, appearedTwice, appearedThreeOrMore, notAppearedIn80, hotNumbers, coldNumbers };
  };

  const addNumber = () => {
    let input = prompt("Enter a roulette number (0-36):");
    let num = parseInt(input);

    if (isNaN(num) || num < 0 || num > 36) {
      alert("Invalid number! Please enter a number between 0 and 36.");
      return;
    }

    let details = getRouletteDetails(num);
    setNumbers([...numbers, { gameCount: numbers.length + 1, number: num, ...details }]);
  };

  const { appearedOnce, appearedTwice, appearedThreeOrMore, notAppearedIn80, hotNumbers, coldNumbers } = getCategorizedNumbers();

  // Prepare data for chart
  const chartData = Array.from({ length: 37 }, (_, i) => ({
    number: i,
    frequency: countOccurrences(20)[i] || 0
  }));

  return (
    <div className="p-6 max-w-2xl mx-auto bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">🎰 Roulette Tracker</h2>
      <button onClick={addNumber} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
        Add Roulette Number
      </button>

      {/* Table to Show Game History */}
      <div className="mt-6 p-4 bg-white rounded-lg shadow-md">
        <h3 className="text-lg font-semibold">📝 Game History</h3>
        <table className="w-full border-collapse border border-gray-300 mt-2">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-2 py-1">Game #</th>
              <th className="border border-gray-300 px-2 py-1">Number</th>
              <th className="border border-gray-300 px-2 py-1">Color</th>
              <th className="border border-gray-300 px-2 py-1">Odd/Even</th>
              <th className="border border-gray-300 px-2 py-1">High/Low</th>
              <th className="border border-gray-300 px-2 py-1">Column</th>
              <th className="border border-gray-300 px-2 py-1">Group</th>
            </tr>
          </thead>
          <tbody>
            {numbers.map((n, i) => (
              <tr key={i} className="text-center">
                <td className="border border-gray-300 px-2 py-1">{n.gameCount}</td>
                <td className="border border-gray-300 px-2 py-1">{n.number}</td>
                <td className="border border-gray-300 px-2 py-1">{n.color}</td>
                <td className="border border-gray-300 px-2 py-1">{n.oddEven}</td>
                <td className="border border-gray-300 px-2 py-1">{n.highLow}</td>
                <td className="border border-gray-300 px-2 py-1">{n.column}</td>
                <td className="border border-gray-300 px-2 py-1">{n.group}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


      <div className="mt-6 p-4 bg-white rounded-lg shadow-md">
        <h3 className="text-lg font-semibold">📊 Statistics (Last 20 & 80 Games)</h3>
        <p className="mt-2"><strong>🟡 Appeared Once:</strong> {appearedOnce.join(", ") || "None"}</p>
        <p><strong>🟠 Appeared Twice:</strong> {appearedTwice.join(", ") || "None"}</p>
        <p><strong>🔴 Appeared 3+ Times:</strong> {appearedThreeOrMore.join(", ") || "None"}</p>
        <p className="mt-4"><strong>⚫ Not Appeared (Last 80):</strong> {notAppearedIn80.join(", ") || "None"}</p>
        <p className="mt-4"><strong>🔥 Hot Numbers (Top 3):</strong> {hotNumbers.join(", ") || "None"}</p>
        <p className="mt-4"><strong>❄️ Cold Numbers (Only Once):</strong> {coldNumbers.join(", ") || "None"}</p>
      </div>



      {/* Chart Section */}
      <div className="mt-6 p-4 bg-white rounded-lg shadow-md">
        <h3 className="text-lg font-semibold">📊 Live Frequency Chart</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <XAxis dataKey="number" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="frequency" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

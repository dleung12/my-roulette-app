import { useState } from "react";

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
      column = "1st Column";
    } else if ([2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35].includes(num)) {
      column = "2nd Column";
    } else if ([3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36].includes(num)) {
      column = "3rd Column";
    }

    if (num >= 1 && num <= 12) {
      group = "Group 1";
    } else if (num >= 13 && num <= 24) {
      group = "Group 2";
    } else if (num >= 25 && num <= 36) {
      group = "Group 3";
    }

    return { color, oddEven, highLow, column, group };
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

  return (
    <div className="p-6 max-w-3xl mx-auto bg-gray-100 rounded-lg shadow-lg">
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
    </div>
  );
}

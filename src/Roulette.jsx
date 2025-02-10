import { useState } from "react";

export default function RouletteTracker() {
  const [numbers, setNumbers] = useState([]);

  const getRouletteDetails = (num) => {
    let color = "Black";
    let oddEven = "0";
    let highLow = "0";
    let column = "0";
    let group = "0";

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

  const last20Games = numbers.slice(-20);
  const last80Games = numbers.slice(-80);

  const countOccurrences = (numSet) => {
    const counts = {};
    numSet.forEach(({ number }) => {
      counts[number] = (counts[number] || 0) + 1;
    });
    return counts;
  };

  const last20Counts = countOccurrences(last20Games);
  const last80Numbers = new Set(last80Games.map(({ number }) => number));

  const hotNumbers = Object.keys(last20Counts).filter((num) => last20Counts[num] >= 2);
  const coldNumbers = [...Array(37).keys()].filter((num) => !last80Numbers.has(num));

  

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

      <div className="mt-6">
        <h3 className="text-lg font-semibold">🔥 Hot Numbers: {hotNumbers.join(", ")}</h3>
        <h3 className="text-lg font-semibold">❄️ Cold Numbers: {coldNumbers.join(", ")}</h3>
      </div>

    </div>
  );
}

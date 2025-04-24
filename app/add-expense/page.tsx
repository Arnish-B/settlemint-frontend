"use client";

import { useState } from "react";

export default function AddExpenseScreen() {
  const [totalAmount, setTotalAmount] = useState(0);
  const [description, setDescription] = useState("");
  const [people, setPeople] = useState([""]);
  const [customAmounts, setCustomAmounts] = useState([0]);
  const [splitEqually, setSplitEqually] = useState(true);

  const handleAddPerson = () => {
    setPeople([...people, ""]);
    if (splitEqually && totalAmount > 0) {
      const equalAmount = totalAmount / (people.length + 1);
      setCustomAmounts([...people.map(() => equalAmount), equalAmount]);
    } else {
      setCustomAmounts([...customAmounts, 0]);
    }
  };

  const handleDeletePerson = (index: number): void => {
    const newPeople: string[] = [...people];
    newPeople.splice(index, 1);
    setPeople(newPeople);

    const newCustomAmounts: number[] = [...customAmounts];
    newCustomAmounts.splice(index, 1);
    setCustomAmounts(newCustomAmounts);

    if (splitEqually && newPeople.length > 0 && totalAmount > 0) {
      const equalAmount: number = totalAmount / newPeople.length;
      setCustomAmounts(newPeople.map(() => equalAmount));
    }
  };

  interface PersonNameChangeParams {
    index: number;
    name: string;
  }

  const handlePersonNameChange = ({
    index,
    name,
  }: PersonNameChangeParams): void => {
    const newPeople: string[] = [...people];
    newPeople[index] = name;
    setPeople(newPeople);
  };

  interface CustomAmountChangeParams {
    index: number;
    amount: number;
  }

  const handleCustomAmountChange = ({
    index,
    amount,
  }: CustomAmountChangeParams): void => {
    if (amount > totalAmount) {
      amount = totalAmount; // Cap the amount to the total amount
    }
    const newCustomAmounts: number[] = [...customAmounts];
    newCustomAmounts[index] = amount;
    setCustomAmounts(newCustomAmounts);
  };

  const handleSplitEquallyChange = () => {
    const newSplitEqually = !splitEqually;
    setSplitEqually(newSplitEqually);

    if (newSplitEqually && people.length > 0 && totalAmount > 0) {
      const equalAmount = totalAmount / people.length;
      setCustomAmounts(people.map(() => equalAmount));
    }
  };

  const calculatePercentage = (amount: number): number => {
    if (totalAmount <= 0) return 0;
    return (amount / totalAmount) * 100;
  };

  const totalShares = customAmounts.reduce((sum, amount) => sum + amount, 0);
  const isOverBudget = totalShares > totalAmount;
  const isUnderBudget = totalShares < totalAmount && !splitEqually;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
          <div className="bg-emerald-600 p-6 text-white">
            <h1 className="text-2xl font-bold">
              {description || "Total Bill"}
            </h1>
            <div className="text-4xl font-bold my-3">₹ {totalAmount}</div>
            <div className="text-sm">Split with</div>
            <div className="flex mt-2">
              {people
                .filter((p) => p.trim())
                .map((person, idx) => (
                  <div
                    key={idx}
                    className="w-8 h-8 rounded-full bg-gray-200 -ml-2 first:ml-0 flex items-center justify-center text-emerald-600 text-xs font-bold border-2 border-white overflow-hidden"
                  >
                    {person.charAt(0).toUpperCase()}
                  </div>
                ))}
            </div>
          </div>

          <div className="p-6">
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Amount
              </label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-500">₹</span>
                <input
                  className="shadow-sm border border-gray-300 rounded-lg w-full py-3 pl-8 pr-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  type="number"
                  placeholder="Enter total amount"
                  value={totalAmount || ""}
                  onChange={(e) => setTotalAmount(Number(e.target.value))}
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Description
              </label>
              <input
                className="shadow-sm border border-gray-300 rounded-lg w-full py-3 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                type="text"
                placeholder="e.g. Dinner, Movie night"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-gray-700">
                  Splitting with
                </h2>
                <div className="flex items-center">
                  <input
                    id="split-equally"
                    type="checkbox"
                    className="w-4 h-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                    checked={splitEqually}
                    onChange={handleSplitEquallyChange}
                  />
                  <label
                    htmlFor="split-equally"
                    className="ml-2 text-sm text-gray-700"
                  >
                    Split equally
                  </label>
                </div>
              </div>

              {people.map((person, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4 mb-4">
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 text-xs font-bold">
                      {person ? person.charAt(0).toUpperCase() : index + 1}
                    </div>
                    <input
                      className="shadow-sm border border-gray-300 rounded-lg flex-grow py-2 px-3 ml-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      type="text"
                      placeholder={`Person ${index + 1}`}
                      value={person}
                      onChange={(e) =>
                        handlePersonNameChange({ index, name: e.target.value })
                      }
                    />
                    {people.length > 1 && (
                      <button
                        className="ml-2 text-gray-500 hover:text-red-500"
                        onClick={() => handleDeletePerson(index)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    )}
                  </div>

                  {!splitEqually && (
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>
                          {calculatePercentage(customAmounts[index]).toFixed(0)}
                          %
                        </span>
                        <span className="font-medium">
                          ₹ {customAmounts[index]}
                        </span>
                      </div>
                      <div className="relative h-2 bg-gray-200 rounded-full mb-2">
                        <div
                          className={`absolute top-0 left-0 h-2 rounded-full ${
                            isOverBudget ? "bg-red-500" : "bg-emerald-500"
                          }`}
                          style={{
                            width: `${Math.min(
                              calculatePercentage(customAmounts[index]),
                              100
                            )}%`,
                          }}
                        ></div>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max={totalAmount * 2}
                        value={customAmounts[index]}
                        onChange={(e) =>
                          handleCustomAmountChange({
                            index,
                            amount: Number(e.target.value),
                          })
                        }
                        className="w-full accent-emerald-500"
                        step="1"
                      />
                      <input
                        type="number"
                        className="mt-2 shadow-sm border border-gray-300 rounded-lg w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        value={customAmounts[index] || ""}
                        onChange={(e) =>
                          handleCustomAmountChange({
                            index,
                            amount: Number(e.target.value),
                          })
                        }
                      />
                    </div>
                  )}

                  {splitEqually && totalAmount > 0 && (
                    <div className="text-center text-sm font-medium mt-2 text-red-500">
                      ₹ {(totalAmount / people.length).toFixed(2)}
                    </div>
                  )}
                </div>
              ))}

              <button
                className="w-full flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-4 rounded-lg"
                onClick={handleAddPerson}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                    clipRule="evenodd"
                  />
                </svg>
                Add Person
              </button>
            </div>

            {!splitEqually && (
              <div
                className={`text-sm font-medium ${
                  isOverBudget
                    ? "text-red-500"
                    : isUnderBudget
                    ? "text-yellow-500"
                    : "text-emerald-500"
                } mb-4 text-center`}
              >
                {isOverBudget
                  ? `₹${(totalShares - totalAmount).toFixed(2)} over budget`
                  : isUnderBudget
                  ? `₹${(totalAmount - totalShares).toFixed(2)} left to assign`
                  : "Perfectly split!"}
              </div>
            )}

            <button
              className={`w-full font-bold py-4 px-4 rounded-lg ${
                isOverBudget || isUnderBudget
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-black hover:bg-gray-800 text-white"
              }`}
              disabled={isOverBudget || isUnderBudget}
            >
              Split now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

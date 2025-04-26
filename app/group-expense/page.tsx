"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function GroupPage() {
  const [groupName, setGroupName] = useState("Weekend Trip");
  const router = useRouter();

  // Sample group members data
  const members = [
    { id: 1, name: "Rahul", initials: "R", color: "bg-amber-100" },
    { id: 2, name: "Ashu", initials: "A", color: "bg-blue-100" },
    { id: 3, name: "Teena", initials: "T", color: "bg-green-100" },
    { id: 4, name: "Vikram", initials: "V", color: "bg-pink-100" },
  ];

  // Sample transaction data
  const transactions = [
    {
      id: 1,
      title: "Dinner at Seafood Restaurant",
      paidBy: "Rahul",
      date: "Apr 24",
      amount: 120,
      yourShare: 30,
      isOwed: false,
    },
    {
      id: 2,
      title: "Movie Tickets",
      paidBy: "Teena",
      date: "Apr 22",
      amount: 60,
      yourShare: 15,
      isOwed: true,
    },
    {
      id: 3,
      title: "Uber Ride",
      paidBy: "Ashu",
      date: "Apr 21",
      amount: 35,
      yourShare: 8.75,
      isOwed: true,
    },
    {
      id: 4,
      title: "Grocery Shopping",
      paidBy: "Vikram",
      date: "Apr 20",
      amount: 85,
      yourShare: 21.25,
      isOwed: true,
    },
  ];

  // Get member color by name
  interface Member {
    id: number;
    name: string;
    initials: string;
    color: string;
  }

  interface Transaction {
    id: number;
    title: string;
    paidBy: string;
    date: string;
    amount: number;
    yourShare: number;
    isOwed: boolean;
  }

  const getMemberColor = (name: string): string => {
    const member = members.find((m: Member) => m.name === name);
    return member ? member.color : "bg-gray-100";
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-4">
      {/* Group Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">{groupName}</h1>

        <div className="flex mt-4 items-center">
          <div className="flex -space-x-2 mr-4">
            {members.map((member) => (
              <div
                key={member.id}
                className={`w-10 h-10 rounded-full flex items-center justify-center text-gray-700 font-medium border-2 border-white ${member.color}`}
                title={member.name}
              >
                {member.initials}
              </div>
            ))}
          </div>
          <button className="rounded-full bg-gray-100 p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Balance Summary */}
      <div className="bg-emerald-50 p-4 rounded-lg mb-6">
        <h2 className="text-gray-700 font-medium mb-2">Group Balance</h2>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500">You are owed</p>
            <p className="text-xl font-bold text-emerald-600">$30.00</p>
          </div>
          <button
            className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
            onClick={() => router.push("/settle-up")}
          >
            Settle Up
          </button>
        </div>
      </div>

      {/* Transactions List */}
      <div>
        <h2 className="text-lg font-bold text-gray-800 mb-4">
          Recent Transactions
        </h2>

        <div className="space-y-4">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${getMemberColor(
                      transaction.paidBy
                    )}`}
                  >
                    {transaction.paidBy.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">
                      {transaction.title}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {transaction.paidBy} paid ${transaction.amount.toFixed(2)}{" "}
                      • {transaction.date}
                    </p>
                  </div>
                </div>
                <div
                  className={`text-right ${
                    transaction.isOwed ? "text-red-600" : "text-emerald-600"
                  }`}
                >
                  <p className="font-medium">
                    {transaction.isOwed ? "You owe" : "You lent"}
                  </p>
                  <p className="font-bold">
                    ${transaction.yourShare.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Transaction Button */}
      <div className="fixed bottom-6 right-6">
        <button className="bg-emerald-600 text-white rounded-full p-4 shadow-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

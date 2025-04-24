"use client";
import React, { useState } from "react";

export default function ExpenseSummary() {
  const [activeTab, setActiveTab] = useState("friends");

  // Sample data
  const summaryData = {
    totalOwedToYou: 1250,
    totalYouOwe: 850,
    netBalance: 400, // Positive means others owe you more
    currency: "₹",
  };

  const friends = [
    {
      id: 1,
      name: "Rahul",
      initial: "R",
      color: "bg-orange-100",
      owesToYou: 450,
      youOwe: 0,
      netAmount: 450,
    },
    {
      id: 2,
      name: "Ashu",
      initial: "A",
      color: "bg-blue-100",
      owesToYou: 350,
      youOwe: 200,
      netAmount: 150,
    },
    {
      id: 3,
      name: "Teena",
      initial: "T",
      color: "bg-green-100",
      owesToYou: 0,
      youOwe: 300,
      netAmount: -300,
    },
    {
      id: 4,
      name: "Vikas",
      initial: "V",
      color: "bg-purple-100",
      owesToYou: 450,
      youOwe: 350,
      netAmount: 100,
    },
  ];

  const groups = [
    {
      id: 1,
      name: "Weekend Trip",
      members: ["R", "A", "T", "V"],
      membersColors: [
        "bg-orange-100",
        "bg-blue-100",
        "bg-green-100",
        "bg-purple-100",
      ],
      owesToYou: 600,
      youOwe: 200,
      netAmount: 400,
    },
    {
      id: 2,
      name: "Dinner Group",
      members: ["R", "T"],
      membersColors: ["bg-orange-100", "bg-green-100"],
      owesToYou: 0,
      youOwe: 350,
      netAmount: -350,
    },
    {
      id: 3,
      name: "Movie Night",
      members: ["A", "V"],
      membersColors: ["bg-blue-100", "bg-purple-100"],
      owesToYou: 300,
      youOwe: 0,
      netAmount: 300,
    },
    {
      id: 4,
      name: "Monthly Bills",
      members: ["R", "A", "V"],
      membersColors: ["bg-orange-100", "bg-blue-100", "bg-purple-100"],
      owesToYou: 350,
      youOwe: 300,
      netAmount: 50,
    },
  ];

  const activities = [
    {
      id: 1,
      type: "payment",
      description: "Received payment from Rahul",
      amount: 200,
      date: "24 Apr",
    },
    {
      id: 2,
      type: "expense",
      description: "Added expense in Weekend Trip",
      amount: 450,
      date: "23 Apr",
    },
    {
      id: 3,
      type: "payment",
      description: "You paid Teena",
      amount: 300,
      date: "20 Apr",
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between max-w-lg mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center font-medium text-emerald-700">
              D
            </div>
            <span className="font-semibold">Dominus</span>
          </div>
          <button className="text-gray-500">
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
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Balance Summary */}
      <div className="p-4 max-w-lg mx-auto">
        <div className="bg-white rounded-xl shadow-sm p-5 mb-4">
          <h2 className="text-lg font-medium text-gray-700 mb-4">Summary</h2>

          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-sm text-gray-500 mb-1">total you owe</p>
              <p className="font-semibold text-lg text-red-500">
                {summaryData.currency} {summaryData.totalYouOwe}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">total owed to you</p>
              <p className="font-semibold text-lg text-green-500">
                {summaryData.currency} {summaryData.totalOwedToYou}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">net balance</p>
              <p
                className={`font-semibold text-lg ${
                  summaryData.netBalance >= 0
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {summaryData.currency} {Math.abs(summaryData.netBalance)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-4 max-w-lg mx-auto">
        <div className="flex border-b mb-4">
          <button
            className={`py-2 px-4 font-medium ${
              activeTab === "friends"
                ? "text-emerald-500 border-b-2 border-emerald-500"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("friends")}
          >
            Friends
          </button>
          <button
            className={`py-2 px-4 font-medium ${
              activeTab === "groups"
                ? "text-emerald-500 border-b-2 border-emerald-500"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("groups")}
          >
            Groups
          </button>
          <button
            className={`py-2 px-4 font-medium ${
              activeTab === "activity"
                ? "text-emerald-500 border-b-2 border-emerald-500"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("activity")}
          >
            Activity
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="px-4 pb-20 max-w-lg mx-auto">
        {activeTab === "friends" && (
          <div className="space-y-3">
            {friends.map((friend) => (
              <div
                key={friend.id}
                className="bg-white p-4 rounded-xl shadow-sm flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full ${friend.color} flex items-center justify-center`}
                  >
                    {friend.initial}
                  </div>
                  <span className="font-medium">{friend.name}</span>
                </div>
                <div className="text-right">
                  {friend.netAmount !== 0 && (
                    <>
                      {friend.netAmount > 0 ? (
                        <p className="text-sm text-gray-500">owes you</p>
                      ) : (
                        <p className="text-sm text-gray-500">you owe</p>
                      )}
                      <p
                        className={`font-semibold ${
                          friend.netAmount > 0
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        {summaryData.currency} {Math.abs(friend.netAmount)}
                      </p>
                    </>
                  )}
                  {friend.netAmount === 0 && (
                    <p className="text-gray-500 font-medium">settled up</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "groups" && (
          <div className="space-y-3">
            {groups.map((group) => (
              <div key={group.id} className="bg-white p-4 rounded-xl shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{group.name}</span>
                  <div
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      group.netAmount > 0
                        ? "bg-green-100 text-green-800"
                        : group.netAmount < 0
                        ? "bg-red-100 text-red-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {group.netAmount > 0
                      ? `gets ${summaryData.currency} ${group.netAmount}`
                      : group.netAmount < 0
                      ? `owes ${summaryData.currency} ${Math.abs(
                          group.netAmount
                        )}`
                      : "settled"}
                  </div>
                </div>
                <div className="flex -space-x-2">
                  {group.members.map((member, idx) => (
                    <div
                      key={idx}
                      className={`w-8 h-8 rounded-full ${group.membersColors[idx]} flex items-center justify-center border-2 border-white text-sm`}
                    >
                      {member}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "activity" && (
          <div className="space-y-3">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className="bg-white p-4 rounded-xl shadow-sm flex items-center justify-between"
              >
                <div>
                  <p className="font-medium">{activity.description}</p>
                  <p className="text-sm text-gray-500">{activity.date}</p>
                </div>
                <div
                  className={`font-medium ${
                    activity.type === "payment"
                      ? "text-green-500"
                      : "text-gray-700"
                  }`}
                >
                  {activity.type === "payment" ? "+" : ""}
                  {summaryData.currency} {activity.amount}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6">
        <button className="w-14 h-14 rounded-full bg-emerald-500 text-white shadow-lg flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
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

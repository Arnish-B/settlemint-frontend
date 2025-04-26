/* eslint-disable @next/next/no-img-element */
"use client";
import { useState } from "react";
import { CreditCard, Send, ChevronRight, User, Users, X } from "lucide-react";

// Types for our data
type Person = {
  id: string;
  name: string;
  amount: number;
  avatarUrl: string;
};

type Group = {
  id: string;
  name: string;
  amount: number;
  members: { name: string; avatarUrl: string }[];
};

// Mock data
const mockPeopleIOweMoney: Person[] = [
  {
    id: "1",
    name: "Rahul",
    amount: 650,
    avatarUrl: "/api/placeholder/40/40",
  },
  {
    id: "2",
    name: "Teena",
    amount: 250,
    avatarUrl: "/api/placeholder/40/40",
  },
  {
    id: "3",
    name: "Ashu",
    amount: 480,
    avatarUrl: "/api/placeholder/40/40",
  },
];

const mockGroupsIOweMoney: Group[] = [
  {
    id: "g1",
    name: "Evening Snacks",
    amount: 320,
    members: [
      { name: "Rahul", avatarUrl: "/api/placeholder/40/40" },
      { name: "Teena", avatarUrl: "/api/placeholder/40/40" },
      { name: "Ashu", avatarUrl: "/api/placeholder/40/40" },
    ],
  },
  {
    id: "g2",
    name: "Weekend Trip",
    amount: 1450,
    members: [
      { name: "Rahul", avatarUrl: "/api/placeholder/40/40" },
      { name: "Ashu", avatarUrl: "/api/placeholder/40/40" },
    ],
  },
];

// Helper function to get initials
const getInitials = (name: string): string => {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();
};

const colors = ["#FFB6C1", "#ADD8E6", "#90EE90", "#FFD700"];

const SettleUpPage = () => {
  const [activeTab, setActiveTab] = useState<"people" | "groups">("people");
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Person | Group | null>(null);

  const handleSettleUp = (item: Person | Group) => {
    setSelectedItem(item);
    setPaymentModalOpen(true);
  };

  return (
    <div className="bg-gray-50 min-h-screen p-4 max-w-md mx-auto">
      <div className="bg-white rounded-xl shadow-md p-6">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Settle Up</h1>
          <div className="bg-emerald-50 px-3 py-1 rounded-full text-sm font-medium text-emerald-600">
            You owe
          </div>
        </header>

        {/* Tab Navigation */}
        <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
          <button
            className={`flex-1 py-2 rounded-lg flex justify-center items-center gap-2 text-sm font-medium ${
              activeTab === "people"
                ? "bg-white shadow-sm text-emerald-600"
                : "text-gray-600"
            }`}
            onClick={() => setActiveTab("people")}
          >
            <User size={16} />
            People
          </button>
          <button
            className={`flex-1 py-2 rounded-lg flex justify-center items-center gap-2 text-sm font-medium ${
              activeTab === "groups"
                ? "bg-white shadow-sm text-emerald-600"
                : "text-gray-600"
            }`}
            onClick={() => setActiveTab("groups")}
          >
            <Users size={16} />
            Groups
          </button>
        </div>

        {/* People I Owe */}
        {activeTab === "people" && (
          <div className="space-y-4">
            {mockPeopleIOweMoney.map((person, index) => (
              <div
                key={person.id}
                className="bg-gray-50 rounded-lg p-4 flex justify-between items-center"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-gray-700 font-medium"
                    style={{
                      backgroundColor: colors[index % colors.length],
                    }}
                  >
                    {getInitials(person.name)}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{person.name}</h3>
                    <p className="text-emerald-600 font-medium">
                      ₹ {person.amount}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleSettleUp(person)}
                  className="bg-emerald-100 text-emerald-700 py-2 px-4 rounded-lg text-sm font-medium hover:bg-emerald-200 transition"
                >
                  Settle Up
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Groups I Owe */}
        {activeTab === "groups" && (
          <div className="space-y-4">
            {mockGroupsIOweMoney.map((group) => (
              <div key={group.id} className="bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-3">
                    <div className="relative flex -space-x-2">
                      {group.members.slice(0, 3).map((member, index) => (
                        <div
                          key={index}
                          className={`w-8 h-8 flex items-center justify-center rounded-full text-gray-700 font-medium border-2 border-white`}
                          style={{
                            backgroundColor: colors[index % colors.length],
                            zIndex: group.members.length - index,
                          }}
                        >
                          {getInitials(member.name)}
                        </div>
                      ))}
                    </div>
                    <h3 className="font-medium text-gray-900">{group.name}</h3>
                  </div>
                  <p className="text-emerald-600 font-medium">
                    ₹ {group.amount}
                  </p>
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={() => handleSettleUp(group)}
                    className="bg-emerald-100 text-emerald-700 py-2 px-4 rounded-lg text-sm font-medium hover:bg-emerald-200 transition"
                  >
                    Settle Up
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Payment Modal */}
      {paymentModalOpen && selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl w-full max-w-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">
                Pay ₹{" "}
                {selectedItem && "amount" in selectedItem
                  ? selectedItem.amount
                  : 0}
              </h2>
              <button
                onClick={() => setPaymentModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            </div>

            <p className="text-gray-600 mb-6">
              {"name" in selectedItem
                ? `Paying ${selectedItem.name}`
                : `Paying for ${selectedItem.name}`}
            </p>

            <div className="space-y-3 mb-6">
              <button className="w-full flex items-center justify-between bg-blue-50 text-blue-600 rounded-lg p-4 hover:bg-blue-100 transition">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <img
                      src="/api/placeholder/20/20"
                      alt="PhonePe"
                      className="w-5 h-5"
                    />
                  </div>
                  <span className="font-medium">PhonePe</span>
                </div>
                <ChevronRight size={16} />
              </button>

              <button className="w-full flex items-center justify-between bg-green-50 text-green-600 rounded-lg p-4 hover:bg-green-100 transition">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <img
                      src="/api/placeholder/20/20"
                      alt="Paytm"
                      className="w-5 h-5"
                    />
                  </div>
                  <span className="font-medium">Paytm</span>
                </div>
                <ChevronRight size={16} />
              </button>

              <button className="w-full flex items-center justify-between bg-purple-50 text-purple-600 rounded-lg p-4 hover:bg-purple-100 transition">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <img
                      src="/api/placeholder/20/20"
                      alt="Google Pay"
                      className="w-5 h-5"
                    />
                  </div>
                  <span className="font-medium">Google Pay</span>
                </div>
                <ChevronRight size={16} />
              </button>

              <button className="w-full flex items-center justify-between bg-gray-50 text-gray-600 rounded-lg p-4 hover:bg-gray-100 transition">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                    <CreditCard size={16} />
                  </div>
                  <span className="font-medium">Credit Card</span>
                </div>
                <ChevronRight size={16} />
              </button>
            </div>

            <button
              className="w-full bg-emerald-600 text-white py-3 rounded-lg font-medium hover:bg-emerald-700 transition flex items-center justify-center gap-2"
              onClick={() => setPaymentModalOpen(false)}
            >
              <Send size={16} /> Pay Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettleUpPage;

"use client";
import React, { useState } from "react";
import { User } from "lucide-react";
import { useRouter } from "next/navigation";

interface Friend {
  id: string;
  name: string;
  color: string;
}

interface GroupMember extends Friend {
  isSelected: boolean;
}

// Function to get the first letter of a name
const getInitial = (name: string): string => {
  return name.charAt(0).toUpperCase();
};

const CreateGroupPage: React.FC = () => {
  const router = useRouter();
  const [groupName, setGroupName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [groupImage, setGroupImage] = useState<string | null>(null);
  const [groupLink, setGroupLink] = useState<string>(
    "https://settlemint.app/group/join/abc123"
  );
  const [isLinkCopied, setIsLinkCopied] = useState<boolean>(false);
  const [friends, setFriends] = useState<GroupMember[]>([
    { id: "1", name: "Rahul", color: "bg-amber-200", isSelected: false },
    { id: "2", name: "Ashu", color: "bg-blue-200", isSelected: false },
    { id: "3", name: "Teena", color: "bg-green-200", isSelected: false },
    { id: "4", name: "Vijay", color: "bg-purple-200", isSelected: false },
    { id: "5", name: "Maya", color: "bg-pink-200", isSelected: false },
  ]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      // In a real app, you would handle the file upload
      setGroupImage("/api/placeholder/100/100");
    }
  };

  const toggleFriendSelection = (id: string) => {
    setFriends(
      friends.map((friend) =>
        friend.id === id
          ? { ...friend, isSelected: !friend.isSelected }
          : friend
      )
    );
  };

  const copyGroupLink = () => {
    navigator.clipboard.writeText(groupLink);
    setIsLinkCopied(true);
    setTimeout(() => setIsLinkCopied(false), 2000);
  };

  const createGroup = () => {
    // Handle group creation logic here
    const selectedMembers = friends.filter((friend) => friend.isSelected);
    console.log("Creating group with name:", groupName);
    console.log("Description:", description);
    console.log("Members:", selectedMembers);
    console.log("Group image:", groupImage);

    // In a real app, you would make an API call here
    alert("Group created successfully!");

    // Navigate to the group expense page
    router.push("/group-expense");
  };

  // Render an initial avatar with a pastel background
  const renderInitialAvatar = (
    name: string,
    color: string,
    size: string = "w-10 h-10"
  ) => {
    return (
      <div
        className={`${size} rounded-full ${color} flex items-center justify-center font-medium text-gray-700`}
      >
        {getInitial(name)}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 flex justify-center">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Create New Group
        </h1>

        {/* Group Image */}
        <div className="flex items-center mb-6">
          <div className="relative mr-4">
            {groupImage ? (
              <div className="w-16 h-16 rounded-full bg-teal-600 flex items-center justify-center overflow-hidden">
                <img
                  src={groupImage}
                  alt="Group"
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="w-16 h-16 rounded-full bg-teal-600 flex items-center justify-center">
                <User size={32} className="text-white" />
              </div>
            )}
            <label
              htmlFor="group-image"
              className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 shadow-md cursor-pointer"
            >
              <div className="w-6 h-6 rounded-full bg-teal-500 flex items-center justify-center">
                <span className="text-white text-xs font-bold">+</span>
              </div>
            </label>
            <input
              type="file"
              id="group-image"
              className="hidden"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-500 mb-1">Group Image</p>
            <p className="text-xs text-gray-400">Optional</p>
          </div>
        </div>

        {/* Group Name */}
        <div className="mb-6">
          <label
            htmlFor="group-name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Group Name
          </label>
          <input
            type="text"
            id="group-name"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
            placeholder="Enter group name"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            required
          />
        </div>

        {/* Group Description */}
        <div className="mb-6">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Description{" "}
            <span className="text-gray-400 text-xs">(Optional)</span>
          </label>
          <textarea
            id="description"
            rows={3}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
            placeholder="What's this group about?"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Group Link */}
        <div className="mb-6 bg-gray-50 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <p className="text-sm font-medium text-gray-700">Group Link</p>
            <button
              onClick={copyGroupLink}
              className="text-sm text-teal-600 font-medium hover:text-teal-700"
            >
              {isLinkCopied ? "Copied!" : "Copy"}
            </button>
          </div>
          <p className="text-sm text-gray-500 truncate">{groupLink}</p>
        </div>

        {/* Selected Members Preview */}
        {friends.some((friend) => friend.isSelected) && (
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-700 mb-2">
              Selected Members
            </p>
            <div className="flex space-x-2">
              {friends
                .filter((friend) => friend.isSelected)
                .map((friend) => (
                  <div
                    key={`selected-${friend.id}`}
                    className="flex flex-col items-center"
                  >
                    {renderInitialAvatar(friend.name, friend.color, "w-8 h-8")}
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Add Members */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">
            Add Members
          </h2>

          <div className="space-y-2">
            {friends.map((friend) => (
              <div
                key={friend.id}
                className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors ${
                  friend.isSelected
                    ? "bg-teal-50 border border-teal-200"
                    : "border border-gray-100 hover:bg-gray-50"
                }`}
                onClick={() => toggleFriendSelection(friend.id)}
              >
                {renderInitialAvatar(friend.name, friend.color)}
                <span className="flex-1 font-medium text-gray-800 ml-3">
                  {friend.name}
                </span>
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    friend.isSelected
                      ? "bg-teal-500 text-white"
                      : "bg-gray-100 text-transparent"
                  }`}
                >
                  {friend.isSelected && <span className="text-xs">✓</span>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Groups UI to match the reference image */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-base font-medium text-gray-700">
              Select group
            </h2>
            <button className="text-sm text-gray-400">See all</button>
          </div>

          <div className="flex space-x-3 overflow-x-auto pb-2">
            <div className="min-w-32 p-3 border border-gray-200 rounded-lg">
              <p className="text-sm font-medium mb-2">Evening Snacks</p>
              <div className="flex mb-2">
                {["R", "A", "T", "V"].map((initial, idx) => (
                  <div
                    key={idx}
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium text-gray-700 -ml-1 border border-white ${
                      [
                        "bg-amber-200",
                        "bg-blue-200",
                        "bg-green-200",
                        "bg-purple-200",
                      ][idx % 4]
                    }`}
                    style={{ zIndex: 10 - idx }}
                  >
                    {initial}
                  </div>
                ))}
              </div>
              <button className="w-full py-1.5 px-3 bg-amber-200 rounded-full text-xs font-medium text-amber-800">
                Add
              </button>
            </div>

            <div className="min-w-32 p-3 border border-gray-200 rounded-lg">
              <p className="text-sm font-medium mb-2">Weekend Trip</p>
              <div className="flex mb-2">
                {["R", "A"].map((initial, idx) => (
                  <div
                    key={idx}
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium text-gray-700 -ml-1 border border-white ${
                      ["bg-amber-200", "bg-blue-200"][idx % 2]
                    }`}
                    style={{ zIndex: 10 - idx }}
                  >
                    {initial}
                  </div>
                ))}
              </div>
              <button className="w-full py-1.5 px-3 bg-amber-200 rounded-full text-xs font-medium text-amber-800">
                Add
              </button>
            </div>
          </div>
        </div>

        {/* Create Button */}
        <button
          onClick={createGroup}
          disabled={!groupName}
          className={`w-full py-3 rounded-lg font-semibold text-white ${
            groupName
              ? "bg-teal-600 hover:bg-teal-700"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          Create Group
        </button>
      </div>
    </div>
  );
};

export default CreateGroupPage;

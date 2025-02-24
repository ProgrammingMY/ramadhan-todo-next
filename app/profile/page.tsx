"use client";

import { useState } from "react";
import Image from "next/image";
import InstallPrompt from "../_components/install-prompt";
import LoginModal from "../_components/login-modal";

const PROFILE_PICTURES = [
  "/avatars/avatar1.png",
  "/avatars/avatar2.png",
  "/avatars/avatar3.png",
  "/avatars/avatar4.png",
  // Add more avatar paths as needed
];

export default function Profile() {
  const [name, setName] = useState("User Name");
  const [selectedPicture, setSelectedPicture] = useState(PROFILE_PICTURES[0]);
  const [isEditingName, setIsEditingName] = useState(false);

  const handleNameSave = () => {
    if (isEditingName) {
      console.log("Saving name");
      setIsEditingName(false);
    } else {
      console.log("Editing name");
      setIsEditingName(true);
    }
    // Here you would typically save the name to your backend/storage
  };

  const handlePictureSelect = (picture: string) => {
    setSelectedPicture(picture);
    // Here you would typically save the selected picture to your backend/storage
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Profile</h1>

      <div className="space-y-8">
        {/* Profile Picture Section */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Profile Picture</h2>
          <div className="mb-4">
            <Image
              src={selectedPicture}
              alt="Selected profile picture"
              width={128}
              height={128}
              className="rounded-full"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {PROFILE_PICTURES.map((picture, index) => (
              <button
                key={index}
                onClick={() => handlePictureSelect(picture)}
                className={`p-2 border rounded-lg ${selectedPicture === picture
                    ? "border-blue-500"
                    : "border-gray-200"
                  }`}
              >
                <Image
                  src={picture}
                  alt={`Avatar option ${index + 1}`}
                  width={64}
                  height={64}
                  className="rounded-full"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Name Section */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Name</h2>
          <div className="flex gap-2">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border rounded px-3 py-2"
              disabled={!isEditingName}
            />
            <button
              onClick={handleNameSave}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              {isEditingName ? "Save" : "Edit"}
            </button>
          </div>
        </div>
        <InstallPrompt />
        <LoginModal />
      </div>
    </div>
  );
}

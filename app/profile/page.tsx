"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import InstallPrompt from "../_components/install-prompt";
import LoginModal from "../_components/login-modal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/_components/theme-switcher";
import { Bell, ChevronRight, Download, Info, Sun } from "lucide-react";
import { User } from "@/libs/types";
import About from "@/_components/about";

const settings = [
  {
    title: "Theme",
    icon: <Sun />,
    id: "theme",
    content: <ModeToggle />
  },
  {
    title: "Notifications",
    icon: <Bell />,
    id: "notifications",
    content: <div>Notifications not available yet</div>
  },
  {
    title: "Install App",
    icon: <Download />,
    id: "install",
    content: <InstallPrompt />
  },
  {
    title: "About",
    icon: <Info />,
    id: "about",
    content: <About />
  }
];

const avatars = [
  "/avatars/1.png",
  "/avatars/2.png",
  "/avatars/3.png",
  "/avatars/4.png",
  "/avatars/5.png",
  "/avatars/6.png",
  "/avatars/7.png",
  "/avatars/8.png",
];

export default function Profile() {
  const [name, setName] = useState("");
  const [isEditingName, setIsEditingName] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [selectedPicture, setSelectedPicture] = useState(user?.picture || "/avatars/1.png");
  const [expandedSettingId, setExpandedSettingId] = useState<string | null>(null);

  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    setIsStandalone(window.matchMedia('(display-mode: standalone)').matches);
  }, []);

  const filteredSettings = settings.filter(setting =>
    setting.id !== 'install' || !isStandalone
  );

  const handleNameSave = async () => {
    if (isEditingName) {
      const response = await fetch("/api/user", {
        method: "PUT",
        body: JSON.stringify({
          name: name,
          id: user?.id
        })
      });

      if (!response.ok) {
        return console.error("Failed to save name");
      }

      localStorage.setItem("user", JSON.stringify({
        ...user,
        username: name
      }));

      setIsEditingName(false);
    } else {
      setIsEditingName(true);
    }
  };

  const handlePictureSelect = (picture: string) => {
    // Here you would typically save the selected picture to your backend/storage
    const updateUser = async (user: any) => {
      await fetch("/api/user", {
        method: "PUT",
        body: JSON.stringify(user)
      });
    }

    // save picture to in user object
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    user.picture = picture;
    localStorage.setItem("user", JSON.stringify(user));

    if (user) {
      updateUser(user);
    }
    setSelectedPicture(picture);
  };

  useEffect(() => {
    // get user name from local storage
    const user = localStorage.getItem("user");
    if (user) {
      setName(JSON.parse(user).username);
      setUser(JSON.parse(user));
      setSelectedPicture(JSON.parse(user).picture || "/avatars/1.png");
    }
  }, []);

  return (
    <div className="p-6 container flex flex-col gap-6">
      {!user ? (
        // Not logged in view
        <div className="mt-14">
          <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold mb-6">Profile</h1>
            <p className="text-lg">Please login to customize your profile</p>
            <LoginModal />
          </div>
        </div>
      ) : (
        // Logged in view
        <div>
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Profile</h1>
            <div className="flex gap-2">
              <Button variant="destructive" onClick={() => {
                localStorage.removeItem("user");
                localStorage.removeItem("monthProgress");
                localStorage.removeItem("todos");
                setUser(null);
              }}>
                Logout
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            {/* Profile Picture Section */}
            <div className="bg-card border border-slate-200 dark:border-slate-700 rounded-md shadow-md overflow-hidden">
              <div className="p-4 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Image
                    src={selectedPicture}
                    alt="Selected profile picture"
                    width={32}
                    height={32}
                    className="rounded-full"
                    sizes="32px"
                  />
                  <h3 className="font-semibold text-lg">Profile Picture</h3>
                </div>
                <ChevronRight className={`transform transition-transform`} />
              </div>
              <div className="p-4 border-t border-slate-200 dark:border-slate-700">
                <div className="flex flex-col items-center gap-4">
                  <div className="relative w-32 h-32">
                    <Image
                      src={selectedPicture}
                      alt="Selected profile picture"
                      fill
                      className="rounded-full object-cover"
                      sizes="32px"
                    />
                  </div>
                  <div className="grid grid-cols-4 gap-4">
                    {avatars.map((picture, index) => (
                      <button
                        key={index}
                        onClick={() => handlePictureSelect(picture)}
                        className={`p-2 border rounded-lg transition-all hover:scale-105 ${selectedPicture === picture
                          ? "border-primary ring-2 ring-primary/50"
                          : "border-border hover:border-primary"
                          }`}
                      >
                        <Image
                          src={picture}
                          alt={`Avatar option ${index + 1}`}
                          width={64}
                          height={64}
                          className="rounded-full"
                          sizes="64px"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Name Section */}
            <div className="bg-card border border-slate-200 dark:border-slate-700 rounded-md shadow-md overflow-hidden">
              <div className="p-4 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-lg">Name</h3>
                </div>
                <ChevronRight className={`transform transition-transform`} />
              </div>
              <div className="p-4 border-t border-slate-200 dark:border-slate-700">
                <div className="flex flex-row gap-2">
                  <Input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="max-w-sm"
                    disabled={!isEditingName}
                  />
                  {
                    isEditingName && (
                      <Button
                        onClick={() => setIsEditingName(false)}
                        className="flex-1 bg-red-500 text-white"
                      >
                        Cancel
                      </Button>
                    )
                  }
                  <Button
                    onClick={handleNameSave}
                    className="flex-1"
                  >
                    {isEditingName ? "Save" : "Edit"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold">Settings</h1>
        <div className="space-y-4">
          {filteredSettings.map((setting) => (
            <div
              key={setting.id}
              className="bg-card border border-slate-200 dark:border-slate-700 rounded-md shadow-md overflow-hidden"
            >
              <div
                className="p-4 cursor-pointer hover:bg-primary/10 flex justify-between items-center"
                onClick={() => setExpandedSettingId(expandedSettingId === setting.id ? null : setting.id)}
              >
                <div className="flex items-center gap-2">
                  {setting.icon}
                  <h3 className="font-semibold text-lg">{setting.title}</h3>
                </div>
                <ChevronRight className={`transform transition-transform ${expandedSettingId === setting.id ? 'rotate-90' : ''
                  }`} />
              </div>
              {expandedSettingId === setting.id && (
                <div className="p-4 border-t border-slate-200 dark:border-slate-700">
                  {setting.content}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

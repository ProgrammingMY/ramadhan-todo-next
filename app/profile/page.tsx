"use client";

import { useEffect, useState } from "react";

import InstallPrompt from "../_components/install-prompt";
import LoginModal from "../_components/login-modal";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/_components/theme-switcher";
import { Bell, ChevronRight, Download, Info, MessageSquare, Sun } from "lucide-react";
import { User } from "@/libs/types";
import About from "@/_components/about";
import NotificationManager from "@/_components/notification-manager";
import ProfileEdit from "@/_components/profile/profile-edit";
import PictureEdit from "@/_components/profile/picture-edit";
import { useUser } from "@/_context/user-context";
import FeedbackForm from "@/_components/feedback/feedback-form";

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
    content: <NotificationManager />
  },
  {
    title: "Feedback",
    icon: <MessageSquare />,
    id: "feedback",
    content: <FeedbackForm />
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



export default function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const [expandedSettingId, setExpandedSettingId] = useState<string | null>(null);
  const [isStandalone, setIsStandalone] = useState(false);
  const { setUser: setUserContext, handlePeriodChange, handleMonthProgressChange } = useUser();

  useEffect(() => {
    setIsStandalone(window.matchMedia('(display-mode: standalone)').matches);
  }, []);

  const filteredSettings = settings.filter(setting =>
    setting.id !== 'install' || !isStandalone
  );

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("monthProgress");
    localStorage.removeItem("todos");
    localStorage.removeItem("periodDates");
    setUser(null);
    setUserContext(null);
    handlePeriodChange({});
    handleMonthProgressChange([]);
  }

  useEffect(() => {
    // get user name from local storage
    const user = localStorage.getItem("user");
    if (user) {
      setUser(JSON.parse(user));
    }
  }, []);

  return (
    <div className="p-6 max-w-2xl mx-auto flex flex-col gap-6">
      {!user || user.isAnonymous ? (
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
              <Button variant="destructive" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            {/* Profile Picture Section */}
            <PictureEdit user={user} />
            <ProfileEdit />
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

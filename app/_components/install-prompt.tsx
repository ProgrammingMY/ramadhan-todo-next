import { Plus, Share } from "lucide-react";
import { useState, useEffect } from "react";

export default function InstallPrompt() {
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    setIsIOS(
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream
    );

    setIsStandalone(window.matchMedia("(display-mode: standalone)").matches);
  }, []);

  if (isStandalone) {
    return null; // Don't show install button if already installed
  }

  return (
    <div className="flex flex-col gap-2">
      <button className="bg-primary text-primary-foreground px-4 py-2 rounded hover:bg-primary/90 transition-colors">
        Add to Home Screen
      </button>
      {isIOS && (
        <p>
          To install this app on your iOS device, tap the share button
          <Share className="w-4 h-4" />
          and then "Add to Home Screen"
          <Plus className="w-4 h-4" />
          .
        </p>
      )}
    </div>
  );
}

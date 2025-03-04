import { Share } from "lucide-react";
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
      {isIOS && (
        <p>
          To install this app on your iOS device, tap the share button
          <Share className="w-4 h-4" />
          and then "Add to Home Screen"
        </p>
      )}
    </div>
  );
}

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function Story({
    setShowStory
}: {
    setShowStory: (show: boolean) => void;
}) {
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
    }, [])

    return (
        <div>
            <Button
                disabled={isLoading}
                onClick={() => setShowStory(true)}>
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "View Your Recap"}
            </Button>
        </div>
    )
}
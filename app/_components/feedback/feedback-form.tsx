"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { StarIcon } from "lucide-react";
import { toast } from "sonner";
import { submitFeedback } from "@/_action/feedback";

export default function FeedbackForm({
  onComplete
}: {
  onComplete?: () => void;
}) {
  const [rating, setRating] = useState<number>(0);
  const [feedback, setFeedback] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async () => {
    try {
      await submitFeedback({
        rating,
        feedback,
      });

      toast.success("Thank you for your feedback!");
      setIsSubmitted(true);
      setRating(0);
      setFeedback("");
      onComplete?.();
    } catch (error) {
      console.error("Error submitting feedback:", error);
      toast.error("Error submitting feedback");
    }
  };

  if (isSubmitted) {
    return (
      <div className="text-center py-4">
        <p className="text-green-600 dark:text-green-400">
          Thank you for your feedback!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2 justify-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => setRating(star)}
            className="focus:outline-none"
          >
            <StarIcon
              className={`w-10 h-10 ${star <= rating
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300"
                }`}
            />
          </button>
        ))}
      </div>
      <Textarea
        placeholder="Tell us what you think about the app..."
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        className="min-h-[100px]"
      />
      <Button
        onClick={handleSubmit}
        disabled={rating === 0}
        className="w-full"
      >
        Submit Feedback
      </Button>
    </div>
  );
}
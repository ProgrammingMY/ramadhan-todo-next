"use client";

import { useState } from "react";

interface MotivationalMessage {
  userId: string;
  userName: string;
  message: string;
}

export default function Messages() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<MotivationalMessage[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      if (response.ok) {
        setMessage("");
        fetchMessages(); // Refresh messages after posting
      }
    } catch (error) {
      console.error("Failed to submit message:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const fetchMessages = async () => {
    try {
      const response = await fetch("/api/messages?limit=5");
      if (response.ok) {
        const data = await response.json();
        setMessages(data);
      }
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-2xl font-bold mb-8">Share Motivation</h1>

      {/* Message Form Section */}
      <div className="bg-card rounded-lg p-6 mb-8">
        <form onSubmit={handleSubmit}>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Share your motivational message..."
            className="mb-4"
            disabled={isSubmitting}
          />
          <button type="submit" disabled={isSubmitting || !message.trim()}>
            Share Message
          </button>
        </form>
      </div>

      {/* Messages List Section */}
      <div className="space-y-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            Recent Motivational Messages
          </h2>
          <button onClick={fetchMessages}>Refresh</button>
        </div>

        {messages.map((msg) => (
          <div key={msg.userId} className="bg-card rounded-lg p-4">
            <p className="font-semibold mb-2">{msg.userName}</p>
            <p className="text-muted-foreground">{msg.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

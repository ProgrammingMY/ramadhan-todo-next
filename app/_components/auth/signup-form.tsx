"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

interface SignUpFormProps {
  onSuccess: () => void;
}

export default function SignUpForm({ onSuccess }: SignUpFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const username = (e.target as HTMLFormElement).username.value;
    const password = (e.target as HTMLFormElement).password.value;
    const confirmPassword = (e.target as HTMLFormElement).confirmPassword.value;

    if (!username || !password) {
      alert("Please enter an username and password");
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem(
          "user",
          JSON.stringify({
            id: data.user.id,
            username: data.user.name,
            picture: data.user.picture,
          })
        );
        onSuccess();
        router.push("/");
      } else {
        alert(data.error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CardContent className="flex flex-col gap-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <Input
            className="border-slate-300 dark:border-slate-500"
            type="text"
            id="username"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            className="border-slate-300 dark:border-slate-500"
            type="password"
            id="password"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            className="border-slate-300 dark:border-slate-500"
            type="password"
            id="confirmPassword"
            required
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-primary text-primary-foreground hover:bg-primary/80"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Loading...</span>
            </>
          ) : (
            "Sign Up"
          )}
        </Button>
      </form>
    </CardContent>
  );
}
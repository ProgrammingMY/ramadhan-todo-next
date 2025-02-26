"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function LoginModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const username = (e.target as HTMLFormElement).username.value;
    const password = (e.target as HTMLFormElement).password.value;

    if (!username || !password) {
      alert("Please enter an username and password");
      return;
    }

    if (!isLogin) {
      const confirmPassword = (e.target as HTMLFormElement).confirmPassword
        .value;
      if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
      }
    }

    // api call to login or signup
    const endpoint = isLogin ? "/api/auth/login" : "/api/auth/signup";
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.ok) {
      // Store user data in localStorage
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: data.user.id,
          username: data.user.name,
        })
      );
      setIsOpen(false);
      return router.push("/");
    } else {
      console.log(data);
      alert(data.error);
    }
  };

  return (
    <div>
      <Button
        onClick={() => setIsOpen(true)}
        variant={"outline"}
        className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/80"
      >
        Login
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{isLogin ? "Login" : "Sign Up"}</DialogTitle>
          </DialogHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    type="text"
                    id="username"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    type="password"
                    id="password"
                    required
                  />
                </div>

                {!isLogin && (
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                      type="password"
                      id="confirmPassword"
                    />
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full bg-blue-500 text-white hover:bg-blue-600"
                >
                  {isLogin ? "Login" : "Sign Up"}
                </Button>
              </form>
            </CardContent>
            <CardFooter>
              <div className="w-full text-center text-sm text-gray-600">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <Button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  variant="link"
                  className="text-blue-500 hover:text-blue-600"
                >
                  {isLogin ? "Sign Up" : "Login"}
                </Button>
              </div>
            </CardFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
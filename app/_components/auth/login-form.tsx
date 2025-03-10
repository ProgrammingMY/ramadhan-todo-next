"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { useUser } from "@/_context/user-context";

interface LoginFormProps {
    onSuccess: () => void;
}

export default function LoginForm({ onSuccess }: LoginFormProps) {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const { setUser } = useUser();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        const username = (e.target as HTMLFormElement).username.value;
        const password = (e.target as HTMLFormElement).password.value;

        if (!username || !password) {
            alert("Please enter an username and password");
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (response.ok) {
                const userData = {
                    id: data.user.id,
                    username: data.user.name,
                    picture: data.user.picture,
                    isAnonymous: false,
                    gender: data.user.gender,
                }


                localStorage.setItem(
                    "user",
                    JSON.stringify(userData)
                );

                setUser(userData);

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
                        className="border-slate-300 dark:border-slate-500 "
                        type="password"
                        id="password"
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
                        "Login"
                    )}
                </Button>
            </form>
        </CardContent>
    );
}
"use client"

import * as React from "react"
import { Moon, Sun, Monitor } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

export function ModeToggle() {
    const { theme, setTheme } = useTheme()

    return (
        <div className="flex flex-col gap-2">
            <div className="flex gap-2">
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setTheme("light")}
                    className={theme === "light" ? "border-2 border-primary" : ""}
                >
                    <Sun className="h-[1.2rem] w-[1.2rem]" />
                    <span className="sr-only">Light theme</span>
                </Button>
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setTheme("dark")}
                    className={theme === "dark" ? "border-2 border-primary" : ""}
                >
                    <Moon className="h-[1.2rem] w-[1.2rem]" />
                    <span className="sr-only">Dark theme</span>
                </Button>
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setTheme("system")}
                    className={theme === "system" ? "border-2 border-primary" : ""}
                >
                    <Monitor className="h-[1.2rem] w-[1.2rem]" />
                    <span className="sr-only">System theme</span>
                </Button>
            </div>
        </div>
    )
}
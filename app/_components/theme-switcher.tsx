"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export function ModeToggle() {
    const { theme, setTheme } = useTheme()

    return (
        <div className="flex items-center space-x-2">
            <Switch
                id="theme-mode"
                checked={theme === "dark"}
                onCheckedChange={(checked: boolean) => setTheme(checked ? "dark" : "light")}
            />
            <Label htmlFor="theme-mode" className="sr-only">
                Toggle theme
            </Label>
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 dark:scale-0" />
            <Moon className="h-[1.2rem] w-[1.2rem] scale-0 dark:scale-100" />
        </div>
    )
}

"use client"

import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"
import { cn } from "@/lib/utils"
import React, { useEffect, useState } from "react"
import Image from "next/image"

const ThemeToggleButton = ({
  className,
  variant = "circle",
  start = "center",
  showLabel,
  url,
}: {
  className?: string
  variant?: "circle" | "circle-blur" | "gif"
  start?: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "center"
  showLabel?: boolean
  url?: string
}) => {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const getStartPosition = () => {
    switch (start) {
      case "top-left":
        return "top-0 left-0"
      case "top-right":
        return "top-0 right-0"
      case "bottom-left":
        return "bottom-0 left-0"
      case "bottom-right":
        return "bottom-0 right-0"
      case "center":
      default:
        return "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
    }
  }

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-input bg-background/80 p-2 text-sm font-medium text-foreground transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        className
      )}
      aria-label="Toggle theme"
    >
      {variant === "gif" && url && (
        <div
          className={cn(
            "absolute inset-0 h-full w-full transition-all duration-1000",
            theme === "dark" ? "opacity-0" : "opacity-100"
          )}
        >
          <Image src={url} alt="theme gif" fill className="object-cover" />
        </div>
      )}
      {variant === "circle-blur" && (
        <div
          className={cn(
            "absolute h-24 w-24 rounded-full bg-primary/30 blur-2xl transition-all duration-1000",
            getStartPosition(),
            theme === "dark" ? "scale-0" : "scale-100"
          )}
        />
      )}
      {variant === "circle" && (
        <div
          className={cn(
            "absolute h-full w-full rounded-full bg-primary/20 transition-all duration-500",
            getStartPosition(),
            theme === "dark" ? "scale-0" : "scale-150"
          )}
        />
      )}

      <div className="relative z-10 flex items-center justify-center">
        <Sun
          className={cn(
            "h-5 w-5 scale-100 text-yellow-500 transition-all duration-500",
            theme === "dark" && "scale-0"
          )}
        />
        <Moon
          className={cn(
            "absolute h-5 w-5 scale-0 text-slate-400 transition-all duration-500",
            theme === "dark" && "scale-100"
          )}
        />
        {showLabel && (
          <span className="ml-2 text-xs">
            {theme === "dark" ? "Dark" : "Light"}
          </span>
        )}
      </div>
    </button>
  )
}

export default ThemeToggleButton

"use client"

import { useState, useEffect } from "react"

// Update the useMediaQuery hook to be more responsive and handle orientation changes
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    // Check if window is available (client-side)
    if (typeof window === "undefined") {
      return setMatches(false)
    }

    const media = window.matchMedia(query)

    // Set initial value
    setMatches(media.matches)

    // Define listener function
    const listener = () => {
      setMatches(media.matches)
    }

    // Add listener for subsequent changes
    media.addEventListener("change", listener)

    // Also listen for orientation changes which might affect media queries
    window.addEventListener("orientationchange", listener)
    window.addEventListener("resize", listener)

    // Clean up
    return () => {
      media.removeEventListener("change", listener)
      window.removeEventListener("orientationchange", listener)
      window.removeEventListener("resize", listener)
    }
  }, [query])

  return matches
}

// Add a custom hook for detecting touch devices
export function useTouchDevice(): boolean {
  const [isTouch, setIsTouch] = useState(false)

  useEffect(() => {
    const isTouchDevice =
      "ontouchstart" in window || navigator.maxTouchPoints > 0 || (navigator as any).msMaxTouchPoints > 0

    setIsTouch(isTouchDevice)
  }, [])

  return isTouch
}


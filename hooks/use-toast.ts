"use client"

import { useState, useEffect } from "react"

type ToastVariant = "default" | "success" | "error" | "warning" | "info"

interface ToastProps {
  title: string
  description?: string
  variant?: ToastVariant
  duration?: number
}

interface Toast extends ToastProps {
  id: string
  visible: boolean
}

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([])

  useEffect(() => {
    const timers: NodeJS.Timeout[] = []

    toasts.forEach((toast) => {
      if (toast.visible) {
        const timer = setTimeout(() => {
          setToasts((prevToasts) => prevToasts.map((t) => (t.id === toast.id ? { ...t, visible: false } : t)))
        }, toast.duration || 5000)

        timers.push(timer)
      }
    })

    return () => {
      timers.forEach((timer) => clearTimeout(timer))
    }
  }, [toasts])

  const toast = ({ title, description, variant = "default", duration = 5000 }: ToastProps) => {
    const id = Math.random().toString(36).substring(2, 9)
    setToasts((prevToasts) => [...prevToasts, { id, title, description, variant, duration, visible: true }])
  }

  const dismissToast = (id: string) => {
    setToasts((prevToasts) => prevToasts.map((t) => (t.id === id ? { ...t, visible: false } : t)))
  }

  return { toast, dismissToast, toasts }
}

export type { ToastProps }


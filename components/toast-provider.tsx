"use client"

import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { AnimatePresence, motion } from "framer-motion"
import { useToast } from "@/hooks/use-toast"
import { Toast, ToastTitle, ToastDescription } from "@/components/ui/toast"

export function ToastProvider() {
  const { toasts, dismissToast } = useToast()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return createPortal(
    <div className="fixed right-4 top-4 z-50 flex flex-col gap-2">
      <AnimatePresence>
        {toasts
          .filter((toast) => toast.visible)
          .map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: -20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="w-full max-w-sm"
            >
              <Toast variant={toast.variant} onClose={() => dismissToast(toast.id)}>
                <ToastTitle>{toast.title}</ToastTitle>
                {toast.description && <ToastDescription>{toast.description}</ToastDescription>}
              </Toast>
            </motion.div>
          ))}
      </AnimatePresence>
    </div>,
    document.body,
  )
}


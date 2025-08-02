"use client"

import { useEffect } from "react"
import { Toast, ToastClose, ToastDescription, ToastProvider, ToastViewport } from "@/components/ui/toast"
import { CheckCircle, XCircle, Info } from "lucide-react"

interface Notification {
  id: string
  message: string
  type: "success" | "error" | "info"
}

interface NotificationToastProps {
  notifications: Notification[]
  onDismiss: (id: string) => void
}

export function NotificationToast({ notifications, onDismiss }: NotificationToastProps) {
  useEffect(() => {
    notifications.forEach((notification) => {
      const timer = setTimeout(() => {
        onDismiss(notification.id)
      }, 5000)

      return () => clearTimeout(timer)
    })
  }, [notifications, onDismiss])

  const getIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "error":
        return <XCircle className="h-4 w-4 text-red-600" />
      default:
        return <Info className="h-4 w-4 text-blue-600" />
    }
  }

  return (
    <ToastProvider>
      {notifications.map((notification) => (
        <Toast key={notification.id} className="flex items-center gap-3">
          {getIcon(notification.type)}
          <div className="flex-1">
            <ToastDescription>{notification.message}</ToastDescription>
          </div>
          <ToastClose onClick={() => onDismiss(notification.id)} />
        </Toast>
      ))}
      <ToastViewport />
    </ToastProvider>
  )
}

import { useEffect, useRef, useState } from "react"
import { Bell, CheckCheck, Heart, MessageCircle, UserPlus, X } from "lucide-react"

const initialNotifications = [
  {
    id: 1,
    type: "like",
    actor: "Lena",
    message: "le gustó tu reseña de Elden Ring.",
    time: "hace 2 min",
    initial: "L",
    color: "bg-cyan-400",
    unread: true,
  },
  {
    id: 2,
    type: "comment",
    actor: "Nova",
    message: "comentó en tu reseña de Dark Souls.",
    time: "hace 1 h",
    initial: "N",
    color: "bg-emerald-400",
    unread: true,
  },
  {
    id: 3,
    type: "follow",
    actor: "Kai",
    message: "empezó a seguirte.",
    time: "hace 3 h",
    initial: "K",
    color: "bg-amber-300",
    unread: true,
  },
  {
    id: 4,
    type: "like",
    actor: "Mika",
    message: "guardó tu lista Juegos para perderse.",
    time: "ayer",
    initial: "M",
    color: "bg-rose-300",
    unread: false,
  },
]

const notificationIcons = {
  like: Heart,
  comment: MessageCircle,
  follow: UserPlus,
}

export default function NotificationsPopover() {
  const [isOpen, setIsOpen] = useState(false)
  const [isRendered, setIsRendered] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const [notifications, setNotifications] = useState(initialNotifications)
  const popoverRef = useRef(null)
  const unreadCount = notifications.filter((notification) => notification.unread).length

  useEffect(() => {
    if (!isOpen) return undefined

    const handlePointerDown = (event) => {
      if (!popoverRef.current?.contains(event.target)) {
        setIsOpen(false)
        setIsClosing(true)
      }
    }
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false)
        setIsClosing(true)
      }
    }

    document.addEventListener("pointerdown", handlePointerDown)
    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown)
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [isOpen])

  const markAsRead = (id) => {
    setNotifications((current) =>
      current.map((notification) =>
        notification.id === id ? { ...notification, unread: false } : notification,
      ),
    )
  }

  const togglePopover = () => {
    if (isOpen) {
      setIsOpen(false)
      setIsClosing(true)
      return
    }

    setIsRendered(true)
    setIsClosing(false)
    setIsOpen(true)
  }

  const finishClosing = (event) => {
    if (event.target !== event.currentTarget || !isClosing) return
    setIsRendered(false)
    setIsClosing(false)
  }

  return (
    <div ref={popoverRef} className="relative w-full max-lg:w-auto">
      <button
        type="button"
        onClick={togglePopover}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        aria-label={`Notificaciones${unreadCount ? `, ${unreadCount} sin leer` : ""}`}
        className="relative flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-left text-base font-sans text-[color:var(--color-tertiary)] transition-colors hover:bg-[color:var(--color-primary)]/5 hover:text-[color:var(--color-primary)] max-lg:w-[56px] max-lg:flex-col max-lg:gap-0.5 max-lg:px-1 max-lg:py-1 max-lg:text-[10px] max-lg:justify-center"
      >
        <span className="relative flex h-5 w-5 items-center justify-center">
          <Bell size={20} />
          {unreadCount > 0 && (
            <span className="absolute -right-2 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[color:var(--color-primary)] px-1 text-[9px] font-bold leading-none text-black lg:hidden">
              {unreadCount}
            </span>
          )}
        </span>
        <span className="hidden lg:inline">Notificaciones</span>
        <span className="lg:hidden">Avisos</span>
        {unreadCount > 0 && (
          <span className="ml-auto min-w-5 rounded-full bg-[color:var(--color-primary)] px-1.5 py-0.5 text-center text-[10px] font-bold leading-4 text-black max-lg:hidden">
            {unreadCount}
          </span>
        )}
      </button>

      {isRendered && (
        <section
          role="dialog"
          aria-label="Notificaciones recientes"
          aria-hidden={isClosing}
          onAnimationEnd={finishClosing}
          className={`notification-popover absolute bottom-0 left-full z-[60] ml-3 flex max-h-[min(540px,80vh)] w-[360px] max-w-[calc(100vw-24px)] flex-col overflow-hidden rounded-xl border border-white/10 bg-[#11171d] text-secondary shadow-2xl shadow-black/50 max-lg:fixed max-lg:bottom-[4.75rem] max-lg:left-3 max-lg:right-3 max-lg:ml-0 max-lg:w-auto max-lg:max-w-none max-lg:max-h-[calc(100dvh-6rem)] ${isClosing ? "notification-popover-closing" : ""}`}
        >
          <header className="flex items-center justify-between border-b border-white/[0.07] px-4 py-3.5">
            <div>
              <h2 className="text-sm font-bold text-white">Notificaciones</h2>
              <p className="mt-0.5 text-xs text-tertiary">
                {unreadCount ? `${unreadCount} sin leer` : "Todo al día"}
              </p>
            </div>
            <div className="flex items-center gap-1">
              {unreadCount > 0 && (
                <button
                  type="button"
                  onClick={() => setNotifications((current) => current.map((item) => ({ ...item, unread: false })))}
                  title="Marcar todas como leídas"
                  aria-label="Marcar todas como leídas"
                  className="rounded-lg p-2 text-tertiary transition-colors hover:bg-white/[0.06] hover:text-primary"
                >
                  <CheckCheck size={17} />
                </button>
              )}
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false)
                  setIsClosing(true)
                }}
                aria-label="Cerrar notificaciones"
                className="rounded-lg p-2 text-tertiary transition-colors hover:bg-white/[0.06] hover:text-white"
              >
                <X size={17} />
              </button>
            </div>
          </header>

          <div className="overflow-y-auto">
            {notifications.map((notification) => {
              const Icon = notificationIcons[notification.type]
              return (
                <button
                  type="button"
                  key={notification.id}
                  onClick={() => markAsRead(notification.id)}
                  className={`flex w-full items-start gap-3 border-b border-white/[0.05] px-4 py-3 text-left transition-colors hover:bg-white/[0.04] ${notification.unread ? "bg-white/[0.025]" : ""}`}
                >
                  <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold text-black ${notification.color}`}>
                    {notification.initial}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[13px] leading-5 text-secondary/90">
                      <strong className="font-semibold text-white">{notification.actor}</strong>{" "}
                      {notification.message}
                    </span>
                    <span className="mt-1 flex items-center gap-1.5 text-[11px] text-tertiary">
                      <Icon size={12} />
                      {notification.time}
                    </span>
                  </span>
                  {notification.unread && (
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" aria-label="Sin leer" />
                  )}
                </button>
              )
            })}
          </div>
        </section>
      )}
    </div>
  )
}
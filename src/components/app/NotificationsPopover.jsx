import { useEffect, useRef, useState } from 'react';
import { Bell, CheckCheck, Heart, MessageCircle, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  getNotifications,
  markAllNotificationsAsRead,
  markNotificationAsRead,
} from '../../services/notifications.service';

const notificationIcons = {
  REVIEW_LIKE: Heart,
  COMMENT: MessageCircle,
  COMMENT_LIKE: Heart,
};

const notificationColors = {
  REVIEW_LIKE: 'bg-cyan-400',
  COMMENT: 'bg-emerald-400',
  COMMENT_LIKE: 'bg-rose-300',
};

const getNotificationMessage = (type) => {
  switch (type) {
    case 'REVIEW_LIKE':
      return 'le gustó tu reseña.';
    case 'COMMENT':
      return 'comentó en tu reseña.';
    case 'COMMENT_LIKE':
      return 'le gustó tu comentario.';
    default:
      return 'realizó una actividad.';
  }
};

const formatNotificationTime = (value) => {
  const timestamp = new Date(value).getTime();
  if (!Number.isFinite(timestamp)) return '';

  const differenceInSeconds = Math.round((timestamp - Date.now()) / 1000);
  const absoluteSeconds = Math.abs(differenceInSeconds);
  const formatter = new Intl.RelativeTimeFormat('es', { numeric: 'auto' });

  if (absoluteSeconds < 60) {
    return formatter.format(differenceInSeconds, 'second');
  }

  const differenceInMinutes = Math.round(differenceInSeconds / 60);
  if (Math.abs(differenceInMinutes) < 60) {
    return formatter.format(differenceInMinutes, 'minute');
  }

  const differenceInHours = Math.round(differenceInMinutes / 60);
  if (Math.abs(differenceInHours) < 24) {
    return formatter.format(differenceInHours, 'hour');
  }

  return formatter.format(Math.round(differenceInHours / 24), 'day');
};

export default function NotificationsPopover() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isRendered, setIsRendered] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const popoverRef = useRef(null);

  useEffect(() => {
    let isActive = true;
    const loadNotifications = async () => {
      try {
        const data = await getNotifications();

        if (!isActive) return;
        setNotifications(data.notifications);
        setUnreadCount(data.unreadCount);
        setErrorMessage('');
      } catch (error) {
        console.error('No se pudieron cargar las notificaciones:', error);

        if (isActive) {
          setErrorMessage('No se pudieron cargar las notificaciones.');
        }
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    };

    loadNotifications();
    const intervalId = window.setInterval(loadNotifications, 30_000);

    return () => {
      isActive = false;
      window.clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) return undefined;

    const handlePointerDown = (event) => {
      if (!popoverRef.current?.contains(event.target)) {
        setIsOpen(false);
        setIsClosing(true);
      }
    };
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        setIsClosing(true);
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const markAsRead = async (notification) => {
    if (notification.readAt) return;

    const updatedNotification = await markNotificationAsRead(notification.id);
    const readAt = updatedNotification.readAt ?? new Date().toISOString();

    setNotifications((current) =>
      current.map((item) =>
        item.id === notification.id
          ? { ...item, ...updatedNotification, readAt }
          : item,
      ),
    );
    setUnreadCount((current) => Math.max(0, current - 1));
  };

  const handleNotificationClick = async (notification) => {
    try {
      await markAsRead(notification);

      setIsOpen(false);
      setIsClosing(true);

      if (notification.reviewId) {
        navigate(`/review/${notification.reviewId}`);
      }
    } catch (error) {
      console.error('No se pudo marcar la notificación como leída:', error);
      setErrorMessage('No se pudo actualizar la notificación.');
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await markAllNotificationsAsRead();

      const readAt = new Date().toISOString();
      setNotifications((current) =>
        current.map((item) => ({
          ...item,
          readAt: item.readAt ?? readAt,
        })),
      );
      setUnreadCount(0);
      setErrorMessage('');
    } catch (error) {
      console.error('No se pudieron marcar todas como leídas:', error);
      setErrorMessage('No se pudieron marcar todas como leídas.');
    }
  };

  const togglePopover = () => {
    if (isOpen) {
      setIsOpen(false);
      setIsClosing(true);
      return;
    }

    setIsRendered(true);
    setIsClosing(false);
    setIsOpen(true);
  };

  const finishClosing = (event) => {
    if (event.target !== event.currentTarget || !isClosing) return;
    setIsRendered(false);
    setIsClosing(false);
  };

  return (
    <div
      ref={popoverRef}
      className='relative w-full max-lg:w-auto'
    >
      <button
        type='button'
        onClick={togglePopover}
        aria-expanded={isOpen}
        aria-haspopup='dialog'
        aria-label={`Notificaciones${unreadCount ? `, ${unreadCount} sin leer` : ''}`}
        className='relative flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-left text-base font-sans text-[color:var(--color-tertiary)] transition-colors hover:bg-[color:var(--color-primary)]/5 hover:text-[color:var(--color-primary)] cursor-pointer max-lg:w-[56px] max-lg:flex-col max-lg:gap-0.5 max-lg:px-1 max-lg:py-1 max-lg:text-[10px] max-lg:justify-center'
      >
        <span className='relative flex h-5 w-5 items-center justify-center'>
          <Bell size={20} />
          {unreadCount > 0 && (
            <span className='absolute -right-2 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[color:var(--color-primary)] px-1 text-[9px] font-bold leading-none text-black lg:hidden'>
              {unreadCount}
            </span>
          )}
        </span>
        <span className='hidden lg:inline'>Notificaciones</span>
        <span className='lg:hidden'>Avisos</span>
        {unreadCount > 0 && (
          <span className='ml-auto min-w-5 rounded-full bg-[color:var(--color-primary)] px-1.5 py-0.5 text-center text-[10px] font-bold leading-4 text-black max-lg:hidden'>
            {unreadCount}
          </span>
        )}
      </button>

      {isRendered && (
        <section
          role='dialog'
          aria-label='Notificaciones recientes'
          aria-hidden={isClosing}
          onAnimationEnd={finishClosing}
          className={`notification-popover absolute bottom-0 left-full z-[60] ml-3 flex max-h-[min(540px,80vh)] w-[360px] max-w-[calc(100vw-24px)] flex-col overflow-hidden rounded-xl border border-white/10 bg-[#11171d] text-secondary shadow-2xl shadow-black/50 max-lg:fixed max-lg:bottom-[4.75rem] max-lg:left-3 max-lg:right-3 max-lg:ml-0 max-lg:w-auto max-lg:max-w-none max-lg:max-h-[calc(100dvh-6rem)] ${isClosing ? 'notification-popover-closing' : ''}`}
        >
          <header className='flex items-center justify-between border-b border-white/[0.07] px-4 py-3.5'>
            <div>
              <h2 className='text-sm font-bold text-white'>Notificaciones</h2>
              <p className='mt-0.5 text-xs text-tertiary'>
                {unreadCount ? `${unreadCount} sin leer` : 'Todo al día'}
              </p>
            </div>
            <div className='flex items-center gap-1'>
              {unreadCount > 0 && (
                <button
                  type='button'
                  onClick={handleMarkAllAsRead}
                  title='Marcar todas como leídas'
                  aria-label='Marcar todas como leídas'
                  className='rounded-lg p-2 text-tertiary transition-colors hover:bg-white/[0.06] hover:text-primary cursor-pointer'
                >
                  <CheckCheck size={17} />
                </button>
              )}
              <button
                type='button'
                onClick={() => {
                  setIsOpen(false);
                  setIsClosing(true);
                }}
                aria-label='Cerrar notificaciones'
                className='rounded-lg p-2 text-tertiary transition-colors hover:bg-white/[0.06] hover:text-white cursor-pointer'
              >
                <X size={17} />
              </button>
            </div>
          </header>

          <div className='overflow-y-auto'>
            {isLoading && notifications.length === 0 && (
              <p className='px-4 py-6 text-center text-sm text-tertiary'>
                Cargando notificaciones...
              </p>
            )}
            {!isLoading && errorMessage && notifications.length === 0 && (
              <p
                role='alert'
                className='px-4 py-6 text-center text-sm text-red-300'
              >
                {errorMessage}
              </p>
            )}
            {!isLoading && !errorMessage && notifications.length === 0 && (
              <p className='px-4 py-6 text-center text-sm text-tertiary'>
                No hay notificaciones
              </p>
            )}

            {notifications.map((notification) => {
              const Icon = notificationIcons[notification.type] ?? Bell;
              const actorName = notification.actor?.nickname ?? 'Alguien';
              const initial = actorName.charAt(0).toUpperCase();

              return (
                <button
                  type='button'
                  key={notification.id}
                  onClick={() => handleNotificationClick(notification)}
                  className={`flex w-full items-start gap-3 border-b border-white/[0.05] px-4 py-3 text-left transition-colors hover:bg-white/[0.04] cursor-pointer ${!notification.readAt ? 'bg-white/[0.025]' : ''}`}
                >
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold text-black ${notificationColors[notification.type] ?? 'bg-gray-300'}`}
                  >
                    {notification.actor?.profilePicture ? (
                      <img
                        src={notification.actor.profilePicture}
                        alt=''
                        className='h-full w-full object-cover'
                      />
                    ) : (
                      initial
                    )}
                  </span>

                  <span className='min-w-0 flex-1'>
                    <span className='block text-[13px] leading-5 text-secondary/90'>
                      <strong className='font-semibold text-white'>
                        {actorName}
                      </strong>{' '}
                      {getNotificationMessage(notification.type)}
                    </span>
                    <span className='mt-1 flex items-center gap-1.5 text-[11px] text-tertiary'>
                      <Icon size={12} />
                      {formatNotificationTime(notification.createdAt)}
                    </span>
                  </span>
                  {!notification.readAt && (
                    <span
                      className='mt-2 h-2 w-2 shrink-0 rounded-full bg-primary'
                      aria-label='Sin leer'
                    />
                  )}
                </button>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}

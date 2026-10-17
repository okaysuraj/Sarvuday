import { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axiosInstance.get('/notifications');
        // Assuming response.data.notifications is the array
        setNotifications(response.data.notifications || []);
      } catch (error) {
        console.error('Failed to fetch notifications:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchNotifications();
  }, []);

  const markAllAsRead = async () => {
    const unread = notifications.filter((notification) => !notification.is_read);
    const results = await Promise.allSettled(
      unread.map((notification) =>
        axiosInstance.patch(`/notifications/${notification.notification_id}/read`),
      ),
    );
    const saved = new Set(
      unread
        .filter((_, index) => results[index].status === 'fulfilled')
        .map((notification) => notification.notification_id),
    );
    setNotifications((previous) =>
      previous.map((notification) =>
        saved.has(notification.notification_id) ? { ...notification, is_read: true } : notification,
      ),
    );
  };

  const getIconForType = (type) => {
    switch (type) {
      case 'appointment':
        return {
          icon: 'calendar_month',
          bg: 'bg-secondary-container',
          color: 'text-on-secondary-container',
        };
      case 'message':
        return { icon: 'chat', bg: 'bg-accent-sage', color: 'text-primary' };
      case 'system':
        return {
          icon: 'lock',
          bg: 'bg-surface',
          color: 'text-on-error-container',
        };
      default:
        return { icon: 'star', bg: 'bg-surface', color: 'text-primary' };
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <span className="material-symbols-outlined animate-spin text-4xl text-primary">
          autorenew
        </span>
      </div>
    );
  }

  // Keep the API's newest-first ordering.
  const today = notifications.slice(0, 2);
  const earlier = notifications.slice(2);

  return (
    <div className="max-w-4xl mx-auto space-y-stack-lg p-margin-mobile md:p-margin-desktop bg-background flex-grow">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="font-display-lg text-display-lg text-primary">Notifications</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant">
            Stay updated on your mental wellness journey.
          </p>
        </div>
        <button
          onClick={markAllAsRead}
          className="flex items-center gap-2 px-6 py-2 border-outline rounded-full font-label-bold text-label-bold hover:bg-surface-container transition-colors"
        >
          Mark all as read
        </button>
      </div>

      {notifications.length === 0 ? (
        <div className="text-center p-10">
          <p className="font-body-lg text-on-surface-variant">No notifications yet.</p>
        </div>
      ) : (
        <div className="space-y-stack-md">
          {/* Section: Today */}
          {today.length > 0 && (
            <section className="space-y-stack-sm">
              <h2 className="font-label-bold text-label-bold text-on-surface-variant uppercase tracking-widest px-2">
                Recent
              </h2>
              <div className="grid gap-4">
                {today.map((notif, idx) => {
                  const style = getIconForType(notif.type);
                  return (
                    <div
                      key={idx}
                      className="bg-surface border-outline rounded-xl bg-white rounded-xl p-container-padding flex items-start gap-6 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-subtle transition-all cursor-pointer group"
                    >
                      <div
                        className={`w-14 h-14 shrink-0 rounded-2xl ${style.bg} border-outline flex items-center justify-center`}
                      >
                        <span className={`material-symbols-outlined ${style.color} text-3xl`}>
                          {style.icon}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-1">
                          <h3 className="font-headline-sm text-headline-sm text-ink-black group-hover:text-primary transition-colors">
                            {notif.title}
                          </h3>
                          <span className="font-label-md text-label-md text-on-surface-variant">
                            {new Date(notif.created_at).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                          {notif.message}
                        </p>
                      </div>
                      {!notif.is_read && (
                        <div className="w-2 h-2 rounded-full bg-primary-container mt-2"></div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* Section: Earlier */}
          {earlier.length > 0 && (
            <section className="space-y-stack-sm pt-4">
              <h2 className="font-label-bold text-label-bold text-on-surface-variant uppercase tracking-widest px-2">
                Earlier
              </h2>
              <div className="grid gap-4 opacity-80 hover:opacity-100 transition-opacity">
                {earlier.map((notif, idx) => {
                  const style = getIconForType(notif.type);
                  return (
                    <div
                      key={idx}
                      className="bg-surface border-outline rounded-xl bg-surface-container-low rounded-xl p-container-padding flex items-start gap-6 hover:translate-x-[-4px] hover:translate-y-[-4px] transition-all cursor-pointer group"
                    >
                      <div
                        className={`w-14 h-14 shrink-0 rounded-2xl ${style.bg} border-outline flex items-center justify-center`}
                      >
                        <span className={`material-symbols-outlined ${style.color} text-3xl`}>
                          {style.icon}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-1">
                          <h3 className="font-headline-sm text-headline-sm text-ink-black">
                            {notif.title}
                          </h3>
                          <span className="font-label-md text-label-md text-on-surface-variant">
                            {new Date(notif.created_at).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                          {notif.message}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}
        </div>
      )}

      {/* Notification Preferences CTA */}
      <div className="bg-surface border-outline rounded-xl bg-surface rounded-xl p-10 flex flex-col md:flex-row items-center justify-between gap-gutter shadow-subtle">
        <div className="space-y-2 text-center md:text-left">
          <h2 className="font-headline-md text-headline-md text-ink-black">
            Notification Settings
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant">
            Tailor your experience. Choose what matters most to you.
          </p>
        </div>
        <button className="px-8 py-4 bg-primary text-on-primary border-outline rounded-2xl font-label-bold text-label-bold shadow-subtle active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all">
          Manage Preferences
        </button>
      </div>
    </div>
  );
};

export default Notifications;

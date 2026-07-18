import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { notificationsApi } from '../../api/notifications';

export default function NotificationsScreen() {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const data = await notificationsApi.getNotifications();
      setNotifications(data || []);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMarkAsRead = async (id: string) => {
    try {
      await notificationsApi.markAsRead(id);
      setNotifications(prev => 
        prev.map(n => n.id === id ? { ...n, is_read: true } : n)
      );
    } catch (error) {
      console.error('Error marking as read:', error);
    }
  };

  if (isLoading) {
    return (
      <View className="flex-1 bg-background justify-center items-center">
        <ActivityIndicator size="large" color="#002da5" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-cream-bg">
      {/* Header */}
      <View className="flex-row justify-between items-center px-6 py-4 w-full border-b-[1.5px] border-ink-black bg-cream-bg z-50">
        <View className="w-10" />
        <Text className="font-headline-sm text-primary font-bold text-xl uppercase tracking-tighter">Notifications</Text>
        <TouchableOpacity className="w-10 h-10 rounded-full border-[1.5px] border-ink-black flex items-center justify-center">
           <Ionicons name="notifications" size={24} color="#002da5" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-4 py-6" contentContainerStyle={{ paddingBottom: 100 }}>
        
        {notifications.length === 0 ? (
          <View className="items-center justify-center py-20 opacity-70">
            <Ionicons name="notifications-off-outline" size={64} color="#1A1A1A" />
            <Text className="mt-4 font-body-md text-ink-black">No new notifications.</Text>
          </View>
        ) : (
          <View className="flex-col gap-4">
            {notifications.map((notif, idx) => (
              <TouchableOpacity 
                key={notif.id || idx}
                onPress={() => handleMarkAsRead(notif.id)}
                className={`bg-white border-[1.5px] border-ink-black rounded-2xl p-4 flex-row gap-4 shadow-[2px_2px_0px_0px_#1A1A1A] ${notif.is_read ? 'opacity-70 shadow-none' : ''}`}
              >
                <View className={`w-12 h-12 rounded-full border-[1.5px] border-ink-black flex items-center justify-center ${notif.is_read ? 'bg-surface-variant' : 'bg-secondary-fixed'}`}>
                  <Ionicons name="notifications-circle" size={24} color="#1A1A1A" />
                </View>
                <View className="flex-1">
                  <View className="flex-row justify-between items-start mb-1">
                    <Text className="font-label-bold text-ink-black font-bold flex-1">{notif.title}</Text>
                    {!notif.is_read && (
                      <View className="w-2 h-2 rounded-full bg-error mt-1" />
                    )}
                  </View>
                  <Text className="font-body-md text-on-surface-variant text-sm mb-2">{notif.message}</Text>
                  <Text className="font-label-md text-on-surface-variant text-xs">
                    {notif.created_at ? new Date(notif.created_at).toLocaleString() : 'Just now'}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}

      </ScrollView>
    </View>
  );
}

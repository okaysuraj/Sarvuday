import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import apiClient from '../../api/client';
import { useAuth } from '../../context/AuthContext';
import { Colors, Typography, Spacing } from '../../constants/theme';
import { StickerCard } from '../../components/StickerCard';
import { StickerButton } from '../../components/StickerButton';

export default function NotificationsScreen() {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { userToken } = useAuth();

  const fetchNotifications = async () => {
    try {
      const config = userToken ? { headers: { Authorization: `Bearer ${userToken}` } } : {};
      const response = await apiClient.get('/notifications', config);
      setNotifications(response.data.notifications || []);
    } catch (error) {
      console.error('Notifications Fetch Error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, [userToken]);

  const markAsRead = async (id: string) => {
    try {
      const config = userToken ? { headers: { Authorization: `Bearer ${userToken}` } } : {};
      await apiClient.patch(`/notifications/${id}/read`, null, config);
      fetchNotifications();
    } catch (error) {
      console.error('Mark read error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Notifications</Text>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={fetchNotifications} />}
      >
        {notifications.length === 0 && !loading && (
          <Text style={styles.noDataText}>No notifications yet.</Text>
        )}
        
        {notifications.map((n) => (
          <StickerCard 
            key={n.notification_id} 
            backgroundColor={n.is_read ? Colors.light.backgroundElement : Colors.light.surfaceVariant}
            style={{ marginBottom: 10, opacity: n.is_read ? 0.7 : 1 }}
          >
            <Text style={styles.title}>{n.title}</Text>
            <Text style={styles.message}>{n.message}</Text>
            <Text style={styles.date}>{new Date(n.created_at).toLocaleString()}</Text>
            
            {!n.is_read && (
              <StickerButton 
                title="Mark as Read" 
                onPress={() => markAsRead(n.notification_id)}
                backgroundColor={Colors.light.secondary}
                style={{ marginTop: 10, paddingVertical: 8 }}
                textStyle={{ fontSize: 12 }}
              />
            )}
          </StickerCard>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.light.background, padding: Spacing.containerPaddingMobile },
  pageTitle: { ...Typography.headlineSm, color: Colors.light.text, marginBottom: 20 },
  scrollContent: { paddingBottom: 20 },
  title: { ...Typography.labelBold, color: Colors.light.primary, marginBottom: 5 },
  message: { ...Typography.bodyMd, color: Colors.light.text, marginBottom: 10 },
  date: { fontSize: 12, color: Colors.light.textSecondary },
  noDataText: { ...Typography.bodyMd, textAlign: 'center', color: Colors.light.textSecondary, marginTop: 20 }
});

import { Tabs } from 'expo-router';
import React from 'react';
import { useAuth } from '../../context/AuthContext';

export default function TabsLayout() {
  const { userToken } = useAuth();
  return (
    <Tabs screenOptions={{ headerShown: true }}>
      <Tabs.Screen
        name="index"
        options={{ title: 'Home' }}
      />
      <Tabs.Screen
        name="disorders"
        options={{ title: 'Disorders' }}
      />
      <Tabs.Screen
        name="assessments"
        options={{ title: 'Assessments' }}
      />
      <Tabs.Screen
        name="chat"
        options={{ title: 'Chat', headerShown: false }}
      />
      <Tabs.Screen
        name="dashboard"
        options={{ title: userToken ? 'Dashboard' : 'Login' }}
      />
      <Tabs.Screen
        name="notifications"
        options={{ title: 'Alerts', href: userToken ? '/notifications' : null }} // Only show if logged in
      />
    </Tabs>
  );
}

import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router';

const secondaryScreens = [
  'ai_chat',
  'exercises',
  'insights',
  'journal',
  'medication',
  'mood',
  'notifications',
  'therapist_notes',
];

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#18181B',
        tabBarInactiveTintColor: '#8E8D9A',
        tabBarStyle: {
          backgroundColor: '#FAF9F6',
          borderTopColor: '#EAEAEA',
        },
      }}
    >
      {secondaryScreens.map((name) => (
        <Tabs.Screen key={name} name={name} options={{ href: null }} />
      ))}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Ionicons name="home" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: 'Chat',
          tabBarIcon: ({ color }) => <Ionicons name="chatbubbles" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="appointments"
        options={{
          title: 'Sessions',
          tabBarIcon: ({ color }) => <Ionicons name="calendar" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="therapists"
        options={{
          title: 'Search',
          tabBarIcon: ({ color }) => <Ionicons name="search" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="community"
        options={{
          title: 'Community',
          tabBarIcon: ({ color }) => <Ionicons name="people" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <Ionicons name="person" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}

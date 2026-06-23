import { Stack } from 'expo-router';

export default function ChatLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Chats', headerLargeTitle: true }} />
      <Stack.Screen name="[id]" options={{ title: 'Chat', headerBackTitle: 'Chats' }} />
    </Stack>
  );
}

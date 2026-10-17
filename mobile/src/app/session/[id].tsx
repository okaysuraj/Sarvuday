import { Redirect, useLocalSearchParams } from 'expo-router';

export default function SessionRedirect() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return <Redirect href={`/session/video/${id}`} />;
}

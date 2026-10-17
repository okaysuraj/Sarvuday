import { Href, Redirect, useLocalSearchParams, usePathname, useRouter } from 'expo-router';
import { Text } from 'react-native';
import { Action, Card, Screen } from '../components/common/Screen';
import { resolveLegacyRoute } from '../navigation/legacy-routes';

export default function MissingPage() {
  const pathname = usePathname();
  const params = useLocalSearchParams();
  const router = useRouter();
  const query = new URLSearchParams();
  for (const [name, value] of Object.entries(params)) {
    if (name === '404' || value == null) continue;
    for (const item of Array.isArray(value) ? value : [value]) query.append(name, item);
  }
  const target = resolveLegacyRoute(`${pathname}?${query}`);
  if (target) return <Redirect href={target as Href} />;
  return (
    <Screen title="Page not found">
      <Card>
        <Text className="text-on-surface-variant">
          This link does not lead to an available page.
        </Text>
        <Action title="Go home" onPress={() => router.replace('/')} />
      </Card>
    </Screen>
  );
}

import { resolveLegacyRoute } from '../navigation/legacy-routes';

export function redirectSystemPath({ path }: { path: string; initial: boolean }) {
  return resolveLegacyRoute(path) ?? path;
}

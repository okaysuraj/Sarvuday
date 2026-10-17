// Compatibility for previously released app links. New navigation uses canonical routes.
export const legacyRoutes: Readonly<Record<string, string>> = {
  '/goals': '/tracking/goals',
  '/sleep': '/tracking/sleep',
  '/admin/payment_revenue_dashboard': '/admin/dashboard',
  '/admin/risk_logs': '/admin/crisis_event_log',
  '/admin/user_management': '/admin/users',
  '/auth/forgot_password': '/(auth)/forgot-password',
  '/auth/login': '/(auth)/login',
  '/auth/otp_verification': '/(auth)/login',
  '/auth/set_new_password': '/(auth)/forgot-password',
  '/auth/sign_up': '/(auth)/sign-up',
  '/auth/splash': '/(auth)/welcome',
  '/auth/welcome': '/(auth)/welcome',
  '/chat/insight_summary': '/(tabs)/insights',
  '/chat/insights': '/(tabs)/insights',
  '/chat/mood_analysis': '/(tabs)/insights',
  '/chat/risk_level': '/(tabs)/insights',
  '/chat/summary': '/(tabs)/insights',
  '/chat/therapy_session': '/call/[id]',
  '/community/feed': '/(tabs)/community',
  '/community/create_post': '/community/create',
  '/crisis': '/emergency/hub',
  '/emergency/contact': '/emergency/hub',
  '/exercises/assigned': '/(tabs)/exercises',
  '/finance/invoices': '/finance/wallet',
  '/finance/payment-method': '/finance/checkout',
  '/journey': '/tracking/history',
  '/patient/ai_insights': '/(tabs)/insights',
  '/patient/appointment_type_selection': '/patient/book_appointment',
  '/patient/audio_call': '/call/[id]',
  '/patient/biofeedback': '/therapy/biofeedback',
  '/patient/cancel_appointment': '/(tabs)/appointments',
  '/patient/create_post': '/community/create',
  '/patient/emergency_contacts': '/emergency/hub',
  '/patient/emotion_wheel': '/tracking/emotion-wheel',
  '/patient/emotional_trend_graph': '/tracking/history',
  '/patient/escalation': '/emergency/hub',
  '/patient/filter': '/(tabs)/therapists',
  '/patient/goal_tracking': '/tracking/goals',
  '/patient/guided_meditation': '/(tabs)/exercises',
  '/patient/invoice_history': '/finance/wallet',
  '/patient/journal_entry': '/tracking/journal',
  '/patient/mental_health_progress_dashboard': '/tracking/history',
  '/patient/mood_calendar_heatmap': '/tracking/history',
  '/patient/mood_check_in': '/tracking/mood-check-in',
  '/patient/pay_per_session': '/finance/checkout',
  '/patient/payment': '/finance/checkout',
  '/patient/payment_method_selection': '/finance/checkout',
  '/patient/progress_review': '/tracking/history',
  '/patient/quick_check_in_mood': '/tracking/mood-check-in',
  '/patient/select_slot': '/patient/book_appointment',
  '/patient/sleep_vs_mood_correlation': '/tracking/correlation',
  '/patient/suggested_actions': '/(tabs)/insights',
  '/patient/support_groups': '/community/groups',
  '/patient/therapist_list': '/(tabs)/therapists',
  '/patient/today_mood_snapshot': '/tracking/history',
  '/patient/upcoming_appointments': '/(tabs)/appointments',
  '/patient/upcoming_session_waiting': '/(tabs)/appointments',
  '/patient/video_call': '/call/[id]',
  '/patient/wearables': '/therapy/biofeedback',
  '/patient/weekly_mental_health_report': '/tracking/history',
  '/search': '/(tabs)/therapists',
  '/session/end': '/journal/new',
  '/session/video/[id]': '/call/[id]',
  '/status': '/(tabs)/insights',
  '/therapy/breathing': '/exercises/breathing',
  '/therapy/meditation': '/(tabs)/exercises',
  '/therapy/plan': '/(tabs)/exercises',
  '/therapy/plan_overview': '/(tabs)/exercises',
  '/wallet': '/finance/wallet',
};

export function resolveLegacyRoute(path: string): string | null {
  try {
    const url = new URL(path, 'https://sarvuday.local');
    let pathname = url.pathname;
    if (!['http:', 'https:'].includes(url.protocol) && url.hostname) {
      pathname = `/${url.hostname}${pathname}`;
    }
    // Expo development links may include a host and the /--/ route delimiter.
    if (pathname.includes('/--/')) pathname = pathname.split('/--/')[1];
    const segments = pathname.split('/').filter(Boolean).map(decodeURIComponent);
    for (const [source, destination] of Object.entries(legacyRoutes)) {
      const expected = source.split('/').filter(Boolean);
      if (expected.length !== segments.length) continue;
      const values: Record<string, string> = {};
      const matches = expected.every((part, index) => {
        if (part.startsWith('[')) {
          values[part.slice(1, -1)] = segments[index];
          return true;
        }
        return part === segments[index];
      });
      if (!matches) continue;
      let missing = false;
      const target = destination.replace(/\[([^\]]+)\]/g, (_, name: string) => {
        const value = values[name] || url.searchParams.get(name);
        if (!value) missing = true;
        return encodeURIComponent(value || '');
      });
      return missing ? null : `${target}${url.search}${url.hash}`;
    }
  } catch {
    // Malformed external links must render the ordinary missing-page screen.
  }
  return null;
}

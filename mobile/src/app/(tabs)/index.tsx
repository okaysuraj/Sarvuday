import { ActivityIndicator, View } from 'react-native';
import { AdminDashboard } from '../../components/dashboard/AdminDashboard';
import { PatientDashboard } from '../../components/dashboard/PatientDashboard';
import { TherapistDashboard } from '../../components/dashboard/TherapistDashboard';
import { useAuthStore } from '../../store/authStore';

export default function HomeTabScreen() {
  const user = useAuthStore((state) => state.user);

  if (!user) {
    return (
      <View className="flex-1 bg-surface justify-center items-center">
        <ActivityIndicator size="large" color="#002da5" />
      </View>
    );
  }

  if (user.role === 'admin') {
    return <AdminDashboard />;
  }

  return user.role === 'therapist' ? <TherapistDashboard /> : <PatientDashboard />;
}

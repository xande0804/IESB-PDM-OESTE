import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../constants/theme';

const tabIcon = (name) => ({ color, size }) => <Ionicons name={name} color={color} size={size} />;

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor: colors.primary,
      tabBarInactiveTintColor: colors.subtle,
      tabBarStyle: { borderTopColor: colors.border },
      headerStyle: { backgroundColor: colors.primary },
      headerTintColor: '#fff',
      headerTitleStyle: { fontWeight: '700' },
    }}>
      <Tabs.Screen name="index" options={{ title: 'Início', headerTitle: 'CampusGo', tabBarIcon: tabIcon('home') }} />
      <Tabs.Screen name="tasks" options={{ title: 'Tarefas', tabBarIcon: tabIcon('checkbox') }} />
      <Tabs.Screen name="wallet" options={{ title: 'Bolso', tabBarIcon: tabIcon('wallet') }} />
      <Tabs.Screen name="profile" options={{ title: 'Perfil', tabBarIcon: tabIcon('person') }} />
    </Tabs>
  );
}

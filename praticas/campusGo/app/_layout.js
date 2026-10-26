import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ExpensesContextProvider } from '../store/expenses-context';
import { colors } from '../constants/theme';

/** Stack raiz e Provider global de despesas. */
export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <ExpensesContextProvider>
        <Stack screenOptions={{ headerTintColor: colors.primary, headerTitleStyle: { fontWeight: '700' } }}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="task/[id]" options={{ title: 'Tarefa' }} />
          <Stack.Screen name="new-task" options={{ presentation: 'modal', title: 'Nova tarefa' }} />
        </Stack>
      </ExpensesContextProvider>
    </SafeAreaProvider>
  );
}

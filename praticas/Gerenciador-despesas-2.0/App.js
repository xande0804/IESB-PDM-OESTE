import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { ExpensesContextProvider } from './src/store/expenses-context';
import { themes } from './src/constants/theme';
import DespesasRecentes from './src/screens/DespesasRecentes';
import TodasDespesas from './src/screens/TodasDespesas';
import GerenciarDespesa from './src/screens/GerenciarDespesa';
import IconButton from './src/components/IconButton';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function BottomTabScreen() {
  const scheme = useColorScheme();
  const colors = themes[scheme === 'dark' ? 'dark' : 'light'];

  return (
    <Tab.Navigator screenOptions={({ navigation }) => ({
      headerStyle: { backgroundColor: colors.card },
      headerTintColor: colors.text,
      // Ícone ao lado do texto evita corte dos rótulos na versão Web.
      tabBarLabelPosition: 'beside-icon',
      tabBarStyle: {
        backgroundColor: colors.card,
        borderTopColor: colors.border,
        height: 64,
        paddingTop: 6,
        paddingBottom: 6,
      },
      tabBarActiveTintColor: colors.primary,
      tabBarInactiveTintColor: colors.muted,
      tabBarLabelStyle: {
        fontSize: 12,
        lineHeight: 18,
        marginLeft: 6,
        marginTop: 0,
        marginBottom: 0,
      },
      headerRight: () => (
        <IconButton icon="add" size={24} color={colors.primary}
          onPress={() => navigation.navigate('GerenciarDespesa')} />
      ),
    })}>
      <Tab.Screen name="DespesasRecentes" component={DespesasRecentes} options={{
        title: 'Despesas Recentes',
        tabBarLabel: 'Recentes',
        tabBarIcon: ({ color, size }) => <Ionicons name="hourglass" size={size} color={color} />,
      }} />
      <Tab.Screen name="TodasDespesas" component={TodasDespesas} options={{
        title: 'Todas as Despesas',
        tabBarLabel: 'Todas',
        tabBarIcon: ({ color, size }) => <Ionicons name="wallet-outline" size={size} color={color} />,
      }} />
    </Tab.Navigator>
  );
}

function AppNavigation() {
  const scheme = useColorScheme();
  const colors = themes[scheme === 'dark' ? 'dark' : 'light'];
  const navTheme = scheme === 'dark' ? DarkTheme : DefaultTheme;
  return (
    <NavigationContainer theme={{
      ...navTheme,
      colors: { ...navTheme.colors, background: colors.background, card: colors.card, text: colors.text,
        border: colors.border, primary: colors.primary },
    }}>
      <StatusBar style={scheme === 'dark' ? 'light' : 'dark'} />
      <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: colors.card }, headerTintColor: colors.text }}>
        <Stack.Screen name="Despesas" component={BottomTabScreen} options={{ headerShown: false }} />
        <Stack.Screen name="GerenciarDespesa" component={GerenciarDespesa} options={{ title: 'Nova despesa' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return <ExpensesContextProvider><AppNavigation /></ExpensesContextProvider>;
}

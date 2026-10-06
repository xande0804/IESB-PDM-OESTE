import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import DespesasRecentes from './screens/DespesasRecentes';
import TodasDespesas from './screens/TodasDespesas';
import GerenciarDespesa from './screens/GerenciarDespesa';
import IconButton from './components/IconButton';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function BottomTabScreen({ despesas }) {
  return (
    <Tab.Navigator
      screenOptions={({ navigation }) => ({
        tabBarActiveTintColor: '#312e81',
        tabBarLabelStyle: {
          fontSize: 12,
        },
        headerRight: () => (
          <IconButton
            icon="add"
            size={24}
            color="#312e81"
            onPress={() =>
              navigation.navigate('GerenciarDespesa', {
                despesaId: undefined,
              })
            }
          />
        ),
      })}
    >
      <Tab.Screen
        name="DespesasRecentes"
        options={{
          title: 'Despesas Recentes',
          tabBarLabel: 'Recentes',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="hourglass" size={size} color={color} />
          ),
        }}
      >
        {(props) => (
          <DespesasRecentes {...props} despesas={despesas} />
        )}
      </Tab.Screen>

      <Tab.Screen
        name="TodasDespesas"
        options={{
          title: 'Todas as Despesas',
          tabBarLabel: 'Todas',
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="wallet-outline"
              size={size}
              color={color}
            />
          ),
        }}
      >
        {(props) => <TodasDespesas {...props} despesas={despesas} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

export default function App() {
  const [despesas, setDespesas] = useState([]);

  function adicionarDespesa(dados) {
    const novaDespesa = {
      ...dados,
      id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    };

    setDespesas((despesasAtuais) => [
      novaDespesa,
      ...despesasAtuais,
    ]);
  }

  function editarDespesa(id, dados) {
    setDespesas((despesasAtuais) =>
      despesasAtuais.map((despesa) =>
        despesa.id === id ? { ...dados, id } : despesa
      )
    );
  }

  function excluirDespesa(id) {
    setDespesas((despesasAtuais) =>
      despesasAtuais.filter((despesa) => despesa.id !== id)
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Despesas"
          options={{ headerShown: false }}
        >
          {() => <BottomTabScreen despesas={despesas} />}
        </Stack.Screen>

        <Stack.Screen
          name="GerenciarDespesa"
          options={{ title: 'Gerenciar Despesa' }}
        >
          {(props) => (
            <GerenciarDespesa
              {...props}
              despesas={despesas}
              onAdicionar={adicionarDespesa}
              onEditar={editarDespesa}
              onExcluir={excluirDespesa}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
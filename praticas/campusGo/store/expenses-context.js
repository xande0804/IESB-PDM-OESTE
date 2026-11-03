import { createContext, useContext, useEffect, useReducer, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { expensesReducer, deserializeExpenses } from '../utils/expenses';

export const ExpensesContext = createContext(null);
const STORAGE_KEY = '@expenses';

export function ExpensesContextProvider({ children }) {
  const [expenses, dispatch] = useReducer(expensesReducer, []);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let active = true;
    async function load() {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (active && saved) {
          dispatch({ type: 'SET', payload: deserializeExpenses(saved) });
        }
      } catch (error) {
        console.error('Erro ao carregar as despesas:', error);
      } finally {
        if (active) setIsLoaded(true);
      }
    }
    load();
    return () => { active = false; };
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    async function save() {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
      } catch (error) {
        console.error('Erro ao salvar as despesas:', error);
      }
    }
    save();
  }, [expenses, isLoaded]);

  const value = {
    expenses,
    addExpense: data => dispatch({ type: 'ADD', payload: data }),
    updateExpense: (id, data) => dispatch({ type: 'UPDATE', payload: { id, data } }),
    deleteExpense: id => dispatch({ type: 'DELETE', payload: id }),
    clearExpenses: () => dispatch({ type: 'SET', payload: [] }),
  };

  return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>;
}

export function useExpenses() {
  const context = useContext(ExpensesContext);
  if (!context) throw new Error('Faltou o ExpensesContextProvider');
  return context;
}

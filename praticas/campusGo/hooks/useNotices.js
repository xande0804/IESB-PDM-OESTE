import { useCallback, useEffect, useState } from 'react';
import { api } from '../services/api';

/** Busca avisos e controla carregamento, erro e recarregamento. */
export function useNotices() {
  const [notices, setNotices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const reload = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await api.list('posts?_limit=10');
      setNotices(Array.isArray(data) ? data : []);
    } catch (err) {
      setNotices([]);
      setError(err.message || 'Não foi possível buscar os avisos.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => { reload(); }, [reload]);
  return { notices, isLoading, error, reload };
}

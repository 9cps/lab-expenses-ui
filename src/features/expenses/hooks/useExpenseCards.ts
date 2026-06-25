'use client';

import { useCallback, useEffect, useState } from 'react';

import { expensesApi } from '../api';
import type { ExpenseCard } from '../types';

interface UseExpenseCardsResult {
  cards: ExpenseCard[] | undefined;
  totalBalance: number;
  activeCard: ExpenseCard | undefined;
  isLoading: boolean;
  selectActiveCard: (cardId: number) => void;
  refresh: () => Promise<void>;
}

/**
 * Loads the monthly expense cards and tracks which one is currently active
 * (driven by the swiper). Replaces the ad-hoc useState/axios soup that used to
 * live inline in the home page.
 */
export function useExpenseCards(): UseExpenseCardsResult {
  const [cards, setCards] = useState<ExpenseCard[]>();
  const [totalBalance, setTotalBalance] = useState(0);
  const [activeId, setActiveId] = useState<number>();
  const [isLoading, setIsLoading] = useState(true);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await expensesApi.listCards();
      const list = res.data.Data;
      setCards(list);
      setTotalBalance(res.data.TotalBalance);
      setActiveId((current) => current ?? list[0]?.ID);
    } catch (error) {
      console.error('Failed to load expense cards:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const activeCard = cards?.find((card) => card.ID === activeId);

  return {
    cards,
    totalBalance,
    activeCard,
    isLoading,
    selectActiveCard: setActiveId,
    refresh,
  };
}

'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

import { expensesApi } from '../api';
import type {
  DeleteExpenseDetailPayload,
  ExpenseCard,
  ExpenseDetail,
  ExpenseDetailPayload,
  UpdateExpenseDetailPayload,
} from '../types';

interface UseExpenseDetailsResult {
  details: ExpenseDetail[];
  card: ExpenseCard | undefined;
  totalSpending: number;
  totalBalance: number;
  isLoading: boolean;
  createDetail: (payload: ExpenseDetailPayload) => Promise<void>;
  updateDetail: (payload: UpdateExpenseDetailPayload) => Promise<void>;
  deleteDetail: (payload: DeleteExpenseDetailPayload) => Promise<void>;
}

/**
 * Owns all data + mutations for a single statement (card) detail view.
 * The page component stays presentational and just renders what this returns.
 */
export function useExpenseDetails(cardId: number | undefined): UseExpenseDetailsResult {
  const [details, setDetails] = useState<ExpenseDetail[]>([]);
  const [card, setCard] = useState<ExpenseCard>();
  const [isLoading, setIsLoading] = useState(true);

  const loadDetails = useCallback(async () => {
    if (cardId === undefined) return;
    try {
      const res = await expensesApi.listCardDetails(cardId);
      setDetails(res.data ?? []);
    } catch (error) {
      console.error('Failed to load expense details:', error);
    }
  }, [cardId]);

  const loadCard = useCallback(async () => {
    if (cardId === undefined) return;
    try {
      const res = await expensesApi.listCards();
      setCard(res.data.Data.find((item) => item.ID === cardId));
    } catch (error) {
      console.error('Failed to load card info:', error);
    }
  }, [cardId]);

  useEffect(() => {
    setIsLoading(true);
    void Promise.all([loadDetails(), loadCard()]).finally(() => setIsLoading(false));
  }, [loadDetails, loadCard]);

  const totalSpending = useMemo(
    () => details.reduce((sum, row) => sum + Number(row.ExpensesAmount || 0), 0),
    [details],
  );

  const totalBalance = useMemo(() => {
    if (!card) return 0;
    return Number(card.ExpensesBalance ?? card.ExpensesMoney ?? 0);
  }, [card]);

  const createDetail = useCallback(
    async (payload: ExpenseDetailPayload) => {
      await expensesApi.createDetail(payload);
      await Promise.all([loadDetails(), loadCard()]);
    },
    [loadDetails, loadCard],
  );

  const updateDetail = useCallback(
    async (payload: UpdateExpenseDetailPayload) => {
      await expensesApi.updateDetail(payload);
      await loadDetails();
    },
    [loadDetails],
  );

  const deleteDetail = useCallback(
    async (payload: DeleteExpenseDetailPayload) => {
      await expensesApi.deleteDetail(payload);
      await loadDetails();
    },
    [loadDetails],
  );

  return {
    details,
    card,
    totalSpending,
    totalBalance,
    isLoading,
    createDetail,
    updateDetail,
    deleteDetail,
  };
}

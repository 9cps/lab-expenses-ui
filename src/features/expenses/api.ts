import { apiClient } from '@/lib/apiClient';

import type {
  CreateExpensePayload,
  DeleteExpenseDetailPayload,
  ExpenseDetailPayload,
  MoneyCardDetailResponse,
  MoneyCardListResponse,
  UpdateExpenseDetailPayload,
} from './types';

/**
 * Thin data-access layer for the Expenses backend. Components and hooks call
 * these functions instead of talking to axios/endpoints directly, so the
 * transport details live in exactly one place.
 */
export const expensesApi = {
  async listCards(): Promise<MoneyCardListResponse> {
    const { data } = await apiClient.get<MoneyCardListResponse>('/expenses');
    return data;
  },

  async listCardDetails(cardId: number): Promise<MoneyCardDetailResponse> {
    const { data } = await apiClient.post<MoneyCardDetailResponse>(
      '/expenses/details',
      { id: cardId },
    );
    return data;
  },

  createCard(payload: CreateExpensePayload) {
    return apiClient.put('/expenses', payload);
  },

  createDetail(payload: ExpenseDetailPayload) {
    return apiClient.put('/expenses/details', payload);
  },

  updateDetail(payload: UpdateExpenseDetailPayload) {
    return apiClient.put('/expenses/details', payload);
  },

  deleteDetail(payload: DeleteExpenseDetailPayload) {
    return apiClient.delete('/expenses/details', { data: payload });
  },
};

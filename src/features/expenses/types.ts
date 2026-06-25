/** Domain & API types for the expenses feature. */

export type ExpenseType = 'FIXCOST' | 'CREDIT' | 'OTHER';

/** A monthly "card" summarising income / balance / spending. */
export interface ExpenseCard {
  ID: number;
  ExpensesMonth: number;
  ExpensesYear: number;
  ExpensesBalance: number;
  ExpensesMoney: number;
  TotalSpending: number;
}

/** A single expense line item belonging to a card. */
export interface ExpenseDetail {
  ID: number;
  ExpensesType: ExpenseType;
  ExpensesDesc: string;
  ExpensesAmount: number;
  CreatedAt: string;
}

/* --- API request payloads --- */

export interface CreateExpensePayload {
  ExpensesMonth: number | undefined;
  ExpensesYear: number | undefined;
  ExpensesMoney: number | undefined;
}

export interface ExpenseDetailPayload {
  ExpensesId: number | undefined;
  ExpensesType: ExpenseType;
  ExpensesDesc: string;
  ExpensesAmount: number;
}

export interface UpdateExpenseDetailPayload extends ExpenseDetailPayload {
  ID: number | undefined;
}

export interface DeleteExpenseDetailPayload {
  ID: number;
  ExpensesId: number;
}

/* --- API response envelopes --- */

export interface MoneyCardListResponse {
  data: {
    Data: ExpenseCard[];
    TotalBalance: number;
  };
}

export interface MoneyCardDetailResponse {
  data: ExpenseDetail[];
}

# Expenses API Contract

This document describes the backend API contract currently used by the UI for the expenses feature.

## Base URL

- Development: `/api/v1`
- The UI currently calls the backend through the Next.js proxy, so the browser requests are routed to the backend service.

## Endpoints

### 1) List expense cards

- Method: `GET`
- Path: `/expenses`
- Description: Returns the list of monthly expense cards and the total balance.

#### Request

No body.

#### Success response

```json
{
  "data": {
    "Data": [
      {
        "ID": 1,
        "ExpensesMonth": 6,
        "ExpensesYear": 2026,
        "ExpensesBalance": 50000,
        "ExpensesMoney": 70000,
        "TotalSpending": 20000
      }
    ],
    "TotalBalance": 150000
  }
}
```

#### Response shape

```ts
interface MoneyCardListResponse {
  data: {
    Data: ExpenseCard[];
    TotalBalance: number;
  };
}
```

---

### 2) Get expense details for a card

- Method: `POST`
- Path: `/expenses/details`
- Description: Returns the expense detail rows for a selected card.

#### Request body

```json
{
  "id": 1
}
```

#### Success response

```json
{
  "data": [
    {
      "ID": 10,
      "ExpensesType": "FIXCOST",
      "ExpensesDesc": "ค่าไฟ",
      "ExpensesAmount": 1200,
      "CreatedAt": "2026-06-24T10:00:00Z"
    }
  ]
}
```

#### Response shape

```ts
interface MoneyCardDetailResponse {
  data: ExpenseDetail[];
}
```

---

### 3) Create a new expense card

- Method: `PUT`
- Path: `/expenses`
- Description: Creates a new monthly expense card.

#### Request body

```json
{
  "ExpensesMonth": 7,
  "ExpensesYear": 2026,
  "ExpensesMoney": 80000
}
```

#### Success response

The backend may return any successful response payload. The UI currently does not depend on a specific body for this action.

---

### 4) Create a new expense detail

- Method: `PUT`
- Path: `/expenses/details`
- Description: Adds a new expense item to an existing card.

#### Request body

```json
{
  "ExpensesId": 1,
  "ExpensesType": "FIXCOST",
  "ExpensesDesc": "ค่าไฟ",
  "ExpensesAmount": 1200
}
```

#### Success response

The backend may return any successful response payload. The UI currently does not depend on a specific body for this action.

---

### 5) Update an expense detail

- Method: `PUT`
- Path: `/expenses/details`
- Description: Updates an existing expense item.

#### Request body

```json
{
  "ID": 10,
  "ExpensesId": 1,
  "ExpensesType": "FIXCOST",
  "ExpensesDesc": "ค่าไฟ",
  "ExpensesAmount": 1500
}
```

#### Success response

The backend may return any successful response payload. The UI currently does not depend on a specific body for this action.

---

### 6) Delete an expense detail

- Method: `DELETE`
- Path: `/expenses/details`
- Description: Deletes an expense item.

#### Request body

```json
{
  "ID": 10,
  "ExpensesId": 1
}
```

#### Success response

The backend may return any successful response payload. The UI currently does not depend on a specific body for this action.

---

## Common Types

### ExpenseCard

```ts
interface ExpenseCard {
  ID: number;
  ExpensesMonth: number;
  ExpensesYear: number;
  ExpensesBalance: number;
  ExpensesMoney: number;
  TotalSpending: number;
}
```

### ExpenseDetail

```ts
interface ExpenseDetail {
  ID: number;
  ExpensesType: 'FIXCOST' | 'CREDIT' | 'OTHER';
  ExpensesDesc: string;
  ExpensesAmount: number;
  CreatedAt: string;
}
```

### ExpenseType

```ts
type ExpenseType = 'FIXCOST' | 'CREDIT' | 'OTHER';
```

## Notes

- The UI expects the list endpoint to return a nested `data` object containing `Data` and `TotalBalance`.
- The detail endpoint is expected to return a nested `data` array of expense items.
- If the backend returns a different shape, the UI should be updated accordingly.

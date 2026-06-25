import type { ExpenseType } from './types';

/** Selectable expense types shown in the type dropdowns. */
export const EXPENSE_TYPE_OPTIONS: { value: ExpenseType; label: string }[] = [
  { value: 'FIXCOST', label: 'Fix cost' },
  { value: 'CREDIT', label: 'Credit' },
  { value: 'OTHER', label: 'Other' },
];

/** DaisyUI badge class per expense type, used by the table. */
export const EXPENSE_TYPE_BADGE: Record<ExpenseType, string> = {
  FIXCOST: 'badge-info',
  CREDIT: 'badge-warning',
  OTHER: 'badge-ghost',
};

/** Month options (1-12) for selects, plus a number → name lookup. */
export const MONTH_OPTIONS = [
  { value: 1, label: 'January' },
  { value: 2, label: 'February' },
  { value: 3, label: 'March' },
  { value: 4, label: 'April' },
  { value: 5, label: 'May' },
  { value: 6, label: 'June' },
  { value: 7, label: 'July' },
  { value: 8, label: 'August' },
  { value: 9, label: 'September' },
  { value: 10, label: 'October' },
  { value: 11, label: 'November' },
  { value: 12, label: 'December' },
] as const;

/** Map a month number (1-12) to its name; falls back to '' if out of range. */
export const monthName = (month: number | undefined): string =>
  MONTH_OPTIONS.find((m) => m.value === month)?.label ?? '';

/** Quick-fill description chips for the detail form. */
export const DESCRIPTION_PRESETS = [
  'ค่าน้ำ',
  'ค่าไฟ',
  'ค่าเน็ต',
  'ค่าโทรศัพท์',
  'ค่าเช่าบ้าน',
  'ค่าผ่อนรถ',
  'ค่าอาหาร',
  'ค่าเดินทาง',
  'ค่าบัตรเครดิต',
  'ค่าประกัน',
] as const;

import { DESCRIPTION_PRESETS, EXPENSE_TYPE_OPTIONS } from '../constants';
import type { ExpenseType } from '../types';

export interface ExpenseDetailFormValue {
  ExpensesType: ExpenseType;
  ExpensesDesc: string;
  ExpensesAmount: number;
}

interface ExpenseDetailFieldsProps {
  value: ExpenseDetailFormValue;
  onChange: (patch: Partial<ExpenseDetailFormValue>) => void;
}

export default function ExpenseDetailFields({ value, onChange }: ExpenseDetailFieldsProps) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-base-content/50 mb-1.5">
          Type
        </label>
        <div className="flex gap-2">
          {EXPENSE_TYPE_OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              className={`btn btn-sm flex-1 border-none ${
                value.ExpensesType === option.value
                  ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                  : 'bg-base-200 text-base-content/70 hover:bg-base-300'
              }`}
              onClick={() => onChange({ ExpensesType: option.value as ExpenseType })}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-base-content/50 mb-1.5">
          Description
        </label>
        <input
          type="text"
          placeholder="What's this expense for?"
          className="input input-bordered w-full text-base-content placeholder:text-base-content/40"
          value={value.ExpensesDesc}
          onChange={(e) => onChange({ ExpensesDesc: e.target.value })}
        />
        <div className="flex flex-wrap gap-1.5 mt-2">
          {DESCRIPTION_PRESETS.map((preset) => (
            <button
              key={preset}
              type="button"
              className={`btn btn-xs rounded-full border-none ${
                value.ExpensesDesc === preset
                  ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                  : 'bg-base-200 text-base-content/60 hover:bg-base-300'
              }`}
              onClick={() => onChange({ ExpensesDesc: preset })}
            >
              {preset}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-base-content/50 mb-1.5">
          Amount
        </label>
        <div className="relative">
          <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center font-medium text-base-content/40 select-none">
            ฿
          </span>
          <input
            type="number"
            placeholder="0.00"
            className="input input-bordered w-full pl-8 text-base-content placeholder:text-base-content/40"
            value={Number.isNaN(value.ExpensesAmount) ? '' : value.ExpensesAmount}
            onChange={(e) => onChange({ ExpensesAmount: parseFloat(e.target.value) })}
          />
        </div>
      </div>
    </div>
  );
}

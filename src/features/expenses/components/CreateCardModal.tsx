import { forwardRef, type ReactNode } from 'react';

import Modal from '@/components/ui/Modal';
import { CalendarIcon } from '@/components/ui/icons';

import { MONTH_OPTIONS } from '../constants';
import type { CreateExpensePayload } from '../types';

interface CreateCardModalProps {
  value: CreateExpensePayload;
  onChange: (patch: Partial<CreateExpensePayload>) => void;
  onSubmit: () => void;
  onClose: () => void;
  banner?: ReactNode;
}

const toNumberOrUndefined = (raw: string): number | undefined => {
  const parsed = parseFloat(raw);
  return Number.isNaN(parsed) ? undefined : parsed;
};

const CreateCardModal = forwardRef<HTMLDialogElement, CreateCardModalProps>(
  function CreateCardModal({ value, onChange, onSubmit, onClose, banner }, ref) {
    return (
      <Modal
        ref={ref}
        title="New Statement"
        subtitle="Start tracking a new month"
        icon={<CalendarIcon className="h-5 w-5" />}
        tone="violet"
        actions={
          <>
            <button className="btn w-full" onClick={onClose}>
              Cancel
            </button>
            <button
              className="btn w-full border-none bg-violet-600 text-white hover:bg-violet-700"
              onClick={onSubmit}
            >
              Create
            </button>
          </>
        }
      >
        {banner}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-base-content/50 mb-1.5">
                Month
              </label>
              <select
                className={`select select-bordered w-full ${
                  value.ExpensesMonth ? 'text-base-content' : 'text-base-content/40'
                }`}
                value={value.ExpensesMonth ?? ''}
                onChange={(e) => {
                  const month = parseInt(e.target.value, 10);
                  if (!Number.isNaN(month)) {
                    onChange({ ExpensesMonth: month });
                  }
                }}
              >
                <option value="" disabled>
                  Select
                </option>
                {MONTH_OPTIONS.map((m) => (
                  <option key={m.value} value={m.value}>
                    {m.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-base-content/50 mb-1.5">
                Year
              </label>
              <input
                type="number"
                placeholder="2025"
                className="input input-bordered w-full text-base-content placeholder:text-base-content/40"
                value={value.ExpensesYear ?? ''}
                onChange={(e) => onChange({ ExpensesYear: toNumberOrUndefined(e.target.value) })}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-base-content/50 mb-1.5">
              Monthly Income
            </label>
            <div className="relative">
              <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center font-medium text-base-content/40 select-none">
                ฿
              </span>
              <input
                type="number"
                placeholder="0.00"
                className="input input-bordered w-full pl-8 text-base-content placeholder:text-base-content/40"
                value={value.ExpensesMoney ?? ''}
                onChange={(e) =>
                  onChange({ ExpensesMoney: toNumberOrUndefined(e.target.value) })
                }
              />
            </div>
          </div>
        </div>
      </Modal>
    );
  },
);

export default CreateCardModal;

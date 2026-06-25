import moment from 'moment';

import { EditIcon, TrashIcon } from '@/components/ui/icons';

import { EXPENSE_TYPE_BADGE } from '../constants';
import type { ExpenseDetail } from '../types';

interface ExpenseTableProps {
  rows: ExpenseDetail[];
  onEdit?: (item: ExpenseDetail) => void;
  onDelete?: (item: ExpenseDetail) => void;
}

/** Scrollable table of expense line items with edit/delete row actions. */
export default function ExpenseTable({ rows, onEdit, onDelete }: ExpenseTableProps) {
  return (
    <div className="w-full rounded-2xl border border-neutral-800 bg-neutral-900/40 backdrop-blur shadow-xl overflow-hidden">
      <div className="overflow-x-auto max-h-[420px] overflow-y-auto">
        <table className="table table-sm">
          <thead className="sticky top-0 bg-neutral-900/80 backdrop-blur z-10">
            <tr className="text-xs uppercase tracking-wider text-neutral-400">
              <th className="w-12">No.</th>
              <th>Type</th>
              <th>Description</th>
              <th className="text-right">Amount</th>
              <th>Created</th>
              <th className="text-center w-28">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.length > 0 ? (
              rows.map((item, index) => (
                <tr
                  key={item.ID ?? index}
                  className="border-neutral-800 transition-colors hover:bg-white/5"
                >
                  <td className="text-neutral-500">{index + 1}</td>
                  <td>
                    <span
                      className={`badge ${EXPENSE_TYPE_BADGE[item.ExpensesType] ?? 'badge-ghost'} badge-sm`}
                    >
                      {item.ExpensesType}
                    </span>
                  </td>
                  <td className="font-medium">{item.ExpensesDesc}</td>
                  <td className="text-right font-mono font-semibold">
                    {Number(item.ExpensesAmount).toLocaleString()}
                  </td>
                  <td className="text-neutral-400 text-xs">
                    <div>{moment(item.CreatedAt).format('DD/MM/YYYY')}</div>
                    <div className="opacity-60">{moment(item.CreatedAt).format('HH:mm:ss')}</div>
                  </td>
                  <td>
                    <div className="flex justify-center gap-1">
                      <button
                        className="btn btn-ghost btn-xs text-info"
                        onClick={() => onEdit?.(item)}
                        title="Edit"
                      >
                        <EditIcon />
                      </button>
                      <button
                        className="btn btn-ghost btn-xs text-error"
                        onClick={() => onDelete?.(item)}
                        title="Delete"
                      >
                        <TrashIcon />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="text-center py-10 text-neutral-500" colSpan={6}>
                  No records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

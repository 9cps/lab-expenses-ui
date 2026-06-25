import { forwardRef, type ReactNode } from 'react';

import Modal from '@/components/ui/Modal';
import { ReceiptIcon } from '@/components/ui/icons';

import ExpenseDetailFields, { type ExpenseDetailFormValue } from './ExpenseDetailFields';

interface ExpenseDetailFormModalProps {
  title: ReactNode;
  subtitle?: ReactNode;
  value: ExpenseDetailFormValue;
  onChange: (patch: Partial<ExpenseDetailFormValue>) => void;
  onSubmit: () => void;
  onClose: () => void;
  banner?: ReactNode;
}

const ExpenseDetailFormModal = forwardRef<HTMLDialogElement, ExpenseDetailFormModalProps>(
  function ExpenseDetailFormModal(
    { title, subtitle, value, onChange, onSubmit, onClose, banner },
    ref,
  ) {
    return (
      <Modal
        ref={ref}
        title={title}
        subtitle={subtitle}
        icon={<ReceiptIcon className="h-5 w-5" />}
        tone="emerald"
        actions={
          <>
            <button className="btn w-full" onClick={onClose}>
              Cancel
            </button>
            <button
              className="btn w-full border-none bg-emerald-600 text-white hover:bg-emerald-700"
              onClick={onSubmit}
            >
              Save
            </button>
          </>
        }
      >
        {banner}
        <ExpenseDetailFields value={value} onChange={onChange} />
      </Modal>
    );
  },
);

export default ExpenseDetailFormModal;

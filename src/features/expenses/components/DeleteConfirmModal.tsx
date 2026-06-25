import { forwardRef } from 'react';

import Modal from '@/components/ui/Modal';
import { WarningIcon } from '@/components/ui/icons';

interface DeleteConfirmModalProps {
  targetLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteConfirmModal = forwardRef<HTMLDialogElement, DeleteConfirmModalProps>(
  function DeleteConfirmModal({ targetLabel, onConfirm, onCancel }, ref) {
    return (
      <Modal
        ref={ref}
        title="Delete Item"
        icon={<WarningIcon className="h-5 w-5" />}
        tone="red"
        actions={
          <>
            <button className="btn w-full" onClick={onCancel}>
              Cancel
            </button>
            <button
              className="btn w-full border-none bg-red-600 text-white hover:bg-red-700"
              onClick={onConfirm}
            >
              Delete
            </button>
          </>
        }
      >
        <p className="text-base-content/80">
          Are you sure you want to delete
          {targetLabel && (
            <span className="font-semibold text-base-content"> &quot;{targetLabel}&quot;</span>
          )}?
        </p>
        <p className="text-sm text-base-content/50 mt-1">This action cannot be undone.</p>
      </Modal>
    );
  },
);

export default DeleteConfirmModal;

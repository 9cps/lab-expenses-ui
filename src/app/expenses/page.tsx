'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useState } from 'react';

import PageHeader from '@/components/layout/PageHeader';
import StatCard from '@/components/ui/StatCard';
import SuccessAlert from '@/components/ui/SuccessAlert';
import { ArrowLeftIcon, MoneyBillIcon, PlusIcon, WalletIcon } from '@/components/ui/icons';
import { monthName } from '@/features/expenses/constants';
import DeleteConfirmModal from '@/features/expenses/components/DeleteConfirmModal';
import type { ExpenseDetailFormValue } from '@/features/expenses/components/ExpenseDetailFields';
import ExpenseDetailFormModal from '@/features/expenses/components/ExpenseDetailFormModal';
import ExpenseTable from '@/features/expenses/components/ExpenseTable';
import { useExpenseDetails } from '@/features/expenses/hooks/useExpenseDetails';
import type { ExpenseDetail } from '@/features/expenses/types';
import { useDialog } from '@/hooks/useDialog';
import { useTransientMessage } from '@/hooks/useTransientMessage';

const EMPTY_FORM: ExpenseDetailFormValue = {
  ExpensesType: 'FIXCOST',
  ExpensesDesc: '',
  ExpensesAmount: 0,
};

function ExpensesDetailView() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const cardId = Number(searchParams.get('id')) || undefined;

  const { details, card, totalSpending, totalBalance, createDetail, updateDetail, deleteDetail } =
    useExpenseDetails(cardId);
  const alert = useTransientMessage();

  const statementLabel = card
    ? `${monthName(card.ExpensesMonth)} ${card.ExpensesYear}`
    : 'Statement';

  const addDialog = useDialog();
  const [addForm, setAddForm] = useState<ExpenseDetailFormValue>(EMPTY_FORM);

  const editDialog = useDialog();
  const [editForm, setEditForm] = useState<ExpenseDetailFormValue>(EMPTY_FORM);
  const [editingId, setEditingId] = useState<number>();

  const deleteDialog = useDialog();
  const [deleteTarget, setDeleteTarget] = useState<ExpenseDetail | null>(null);

  const openAdd = () => {
    setAddForm(EMPTY_FORM);
    addDialog.open();
  };

  const handleAdd = async () => {
    if (cardId === undefined) return;
    await createDetail({ ...addForm, ExpensesId: cardId });
    alert.show('Added successfully');
    addDialog.close();
  };

  const openEdit = (item: ExpenseDetail) => {
    setEditingId(item.ID);
    setEditForm({
      ExpensesType: item.ExpensesType,
      ExpensesDesc: item.ExpensesDesc,
      ExpensesAmount: item.ExpensesAmount,
    });
    editDialog.open();
  };

  const handleEdit = async () => {
    if (cardId === undefined || editingId === undefined) return;
    await updateDetail({ ...editForm, ID: editingId, ExpensesId: cardId });
    alert.show('Updated successfully');
    editDialog.close();
  };

  const openDelete = (item: ExpenseDetail) => {
    setDeleteTarget(item);
    deleteDialog.open();
  };

  const handleDelete = async () => {
    if (cardId === undefined || !deleteTarget) return;
    await deleteDetail({ ID: deleteTarget.ID, ExpensesId: cardId });
    alert.show('Deleted successfully');
    setDeleteTarget(null);
    deleteDialog.close();
  };

  return (
    <main className="flex min-h-screen flex-col items-center bg-gradient-to-r from-slate-900 to-slate-700 px-4 py-6 text-white sm:px-6 lg:px-24 lg:py-24">
      <PageHeader
        imageSrc="https://img.daisyui.com/images/emoji/smiling-face-with-sunglasses@80.webp"
        title={statementLabel}
      >
        <button
          className="btn flex-1 rounded-full border border-emerald-400/70 bg-emerald-500/30 text-emerald-100 transition-colors duration-500 hover:bg-emerald-500/45 hover:text-white sm:w-44 sm:flex-none"
          onClick={openAdd}
        >
          <PlusIcon />
          Add Expense
        </button>
        <button
          className="btn flex-1 rounded-full border border-slate-600/70 bg-slate-700/50 text-slate-200 transition-colors duration-500 hover:bg-slate-600/60 hover:text-white sm:w-32 sm:flex-none"
          onClick={() => router.push('/')}
        >
          <ArrowLeftIcon />
          Back
        </button>
      </PageHeader>

      <div className="mt-8 w-full max-w-5xl sm:mt-10">
        <SuccessAlert message={alert.message} />
        <ExpenseTable rows={details} onEdit={openEdit} onDelete={openDelete} />
      </div>

      <div className="mb-8 mt-10 grid w-full gap-3 text-center sm:gap-4 lg:mb-0 lg:max-w-5xl lg:grid-cols-3 lg:text-left">
        <StatCard icon={<WalletIcon />} title="Total balance" value={totalBalance} />
        <StatCard
          icon={<MoneyBillIcon />}
          title="Total spending this month"
          value={totalSpending}
        />
        <a
          className="group cursor-pointer rounded-2xl border border-slate-700/70 bg-slate-800/70 px-5 py-4 transition-colors hover:border-slate-500 hover:bg-slate-700/70"
          onClick={() => router.push('/')}
        >
          <h2 className="mb-3 text-2xl font-semibold text-slate-100">
            Overview{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm text-slate-400">Back to all statements</p>
        </a>
      </div>

      <ExpenseDetailFormModal
        ref={addDialog.dialogRef}
        title="Add Expense"
        subtitle={card ? statementLabel : undefined}
        value={addForm}
        onChange={(patch) => setAddForm((prev) => ({ ...prev, ...patch }))}
        onSubmit={handleAdd}
        onClose={addDialog.close}
      />

      <ExpenseDetailFormModal
        ref={editDialog.dialogRef}
        title="Edit Expense"
        value={editForm}
        onChange={(patch) => setEditForm((prev) => ({ ...prev, ...patch }))}
        onSubmit={handleEdit}
        onClose={editDialog.close}
      />

      <DeleteConfirmModal
        ref={deleteDialog.dialogRef}
        targetLabel={deleteTarget?.ExpensesDesc}
        onConfirm={handleDelete}
        onCancel={() => {
          setDeleteTarget(null);
          deleteDialog.close();
        }}
      />
    </main>
  );
}

export default function ExpensesPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-gradient-to-r from-slate-900 to-slate-700 text-white">
          Loading...
        </main>
      }
    >
      <ExpensesDetailView />
    </Suspense>
  );
}

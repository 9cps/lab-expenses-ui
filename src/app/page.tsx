'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import PageHeader from '@/components/layout/PageHeader';
import StatCard from '@/components/ui/StatCard';
import SuccessAlert from '@/components/ui/SuccessAlert';
import { HeartIcon, MoneyBillIcon, PlusIcon, WalletIcon } from '@/components/ui/icons';
import { expensesApi } from '@/features/expenses/api';
import CreateCardModal from '@/features/expenses/components/CreateCardModal';
import ExpenseCardSwiper from '@/features/expenses/components/ExpenseCardSwiper';
import ExpenseDetailFormModal from '@/features/expenses/components/ExpenseDetailFormModal';
import type { ExpenseDetailFormValue } from '@/features/expenses/components/ExpenseDetailFields';
import { monthName } from '@/features/expenses/constants';
import { useExpenseCards } from '@/features/expenses/hooks/useExpenseCards';
import type { CreateExpensePayload } from '@/features/expenses/types';
import { useDialog } from '@/hooks/useDialog';
import { useTransientMessage } from '@/hooks/useTransientMessage';

const EMPTY_CARD: CreateExpensePayload = {
  ExpensesMonth: undefined,
  ExpensesYear: undefined,
  ExpensesMoney: undefined,
};

const EMPTY_DETAIL: ExpenseDetailFormValue = {
  ExpensesType: 'FIXCOST',
  ExpensesDesc: '',
  ExpensesAmount: 0,
};

export default function HomePage() {
  const router = useRouter();
  const { cards, totalBalance, activeCard, selectActiveCard, refresh, isLoading } = useExpenseCards();

  const createCardDialog = useDialog();
  const [cardForm, setCardForm] = useState<CreateExpensePayload>(EMPTY_CARD);
  const cardAlert = useTransientMessage(5000);

  const detailDialog = useDialog();
  const [detailForm, setDetailForm] = useState<ExpenseDetailFormValue>(EMPTY_DETAIL);
  const detailAlert = useTransientMessage(3000);

  const handleCreateCard = async () => {
    try {
      await expensesApi.createCard(cardForm);
      cardAlert.show('Your purchase has been confirmed!');
      setCardForm(EMPTY_CARD);
      await refresh();
      createCardDialog.close();
    } catch (error) {
      console.error('Failed to create card:', error);
    }
  };

  const openDetailModal = () => {
    setDetailForm(EMPTY_DETAIL);
    detailDialog.open();
  };

  const handleCreateDetail = async () => {
    if (!activeCard) return;
    try {
      await expensesApi.createDetail({ ...detailForm, ExpensesId: activeCard.ID });
      detailAlert.show('Your transition completed!');
      await refresh();
      detailDialog.close();
    } catch (error) {
      console.error('Failed to create expense detail:', error);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-gradient-to-r from-slate-900 to-slate-700 px-4 py-6 text-white sm:px-6 lg:px-24 lg:py-24">
      <PageHeader
        imageSrc="https://img.daisyui.com/images/emoji/yawning-face@80.webp"
        title="Payground"
      >
        <button
          className="btn w-full rounded-full border border-fuchsia-500/60 bg-gradient-to-r from-fuchsia-600/80 via-violet-600/80 to-cyan-500/80 text-white shadow-[0_0_30px_rgba(217,70,239,0.35)] transition-all duration-500 hover:scale-[1.02] hover:border-fuchsia-400 hover:shadow-[0_0_35px_rgba(217,70,239,0.45)] disabled:shadow-none disabled:hover:scale-100 disabled:hover:border-fuchsia-500/60 disabled:hover:shadow-none sm:w-64"
          onClick={createCardDialog.open}
          disabled={isLoading}
        >
          <HeartIcon />
          Add new
        </button>
      </PageHeader>

      <div className="flex w-full flex-col items-center justify-center px-0 py-6 sm:py-8 lg:py-10">
        <ExpenseCardSwiper
          cards={cards}
          isLoading={isLoading}
          onActiveCardChange={selectActiveCard}
        />

        <div className="mt-6 flex w-full justify-center sm:mt-8">
          <button
            className="btn w-full rounded-full border border-emerald-400/70 bg-emerald-500/30 text-emerald-100 shadow-[0_0_20px_rgba(16,185,129,0.25)] transition-colors duration-500 hover:bg-emerald-500/45 hover:text-white disabled:hover:bg-emerald-500/30 disabled:hover:text-emerald-100 sm:w-64"
            onClick={openDetailModal}
            disabled={isLoading || !activeCard}
          >
            <PlusIcon />
            Add Expense
          </button>
        </div>

        <ExpenseDetailFormModal
          ref={detailDialog.dialogRef}
          title="Add Expense"
          subtitle={
            activeCard
              ? `${monthName(activeCard.ExpensesMonth)} ${activeCard.ExpensesYear}`
              : undefined
          }
          value={detailForm}
          onChange={(patch) => setDetailForm((prev) => ({ ...prev, ...patch }))}
          onSubmit={handleCreateDetail}
          onClose={detailDialog.close}
          banner={<SuccessAlert message={detailAlert.message} />}
        />
      </div>

      <div className="mb-8 mt-10 grid w-full gap-3 text-center sm:gap-4 lg:mb-0 lg:max-w-5xl lg:grid-cols-3 lg:text-left lg:space-x-2">
        <StatCard
          icon={<WalletIcon />}
          title="Total balance"
          value={totalBalance}
          description="21% more than last month"
        />
        <StatCard
          icon={<MoneyBillIcon />}
          title="Total spending this month"
          value={activeCard?.TotalSpending ?? 0}
          description="5% more than last month"
        />
        <a
          className="group cursor-pointer rounded-2xl border border-slate-700/70 bg-slate-800/70 px-5 py-4 transition-colors hover:border-slate-500 hover:bg-slate-700/70"
          onClick={() => activeCard && router.push(`/expenses?id=${activeCard.ID}`)}
        >
          <h2 className="mb-3 text-2xl font-semibold text-slate-100">
            View Report{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm text-slate-400">Survey your statement</p>
        </a>
      </div>

      <CreateCardModal
        ref={createCardDialog.dialogRef}
        value={cardForm}
        onChange={(patch) => setCardForm((prev) => ({ ...prev, ...patch }))}
        onSubmit={handleCreateCard}
        onClose={createCardDialog.close}
        banner={<SuccessAlert message={cardAlert.message} />}
      />
    </main>
  );
}

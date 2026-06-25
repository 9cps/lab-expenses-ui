'use client';

import 'swiper/css';
import 'swiper/css/effect-cards';

import { EffectCards } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { monthName } from '../constants';
import type { ExpenseCard } from '../types';

interface ExpenseCardSwiperProps {
  cards: ExpenseCard[] | undefined;
  isLoading?: boolean;
  onActiveCardChange: (cardId: number) => void;
}

/**
 * Gradient palette for cards. Picked by card ID (not random) so each card keeps
 * a stable colour across re-renders.
 */
const CARD_GRADIENTS = [
  'from-violet-600 via-fuchsia-600 to-indigo-700',
  'from-emerald-500 via-teal-600 to-cyan-700',
  'from-rose-500 via-pink-600 to-fuchsia-700',
  'from-amber-500 via-orange-600 to-rose-600',
  'from-sky-500 via-blue-600 to-indigo-700',
  'from-cyan-500 via-sky-600 to-violet-700',
];

const gradientForCard = (id: number): string =>
  CARD_GRADIENTS[Math.abs(id) % CARD_GRADIENTS.length];

/** Stacked "cards" carousel of monthly statements. */
export default function ExpenseCardSwiper({
  cards,
  isLoading = false,
  onActiveCardChange,
}: ExpenseCardSwiperProps) {
  if (isLoading) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="flex h-[190px] w-[300px] animate-pulse flex-col justify-between rounded-[20px] border border-slate-700/70 bg-slate-800/70 p-5 shadow-[0_12px_30px_rgba(2,6,23,0.35)] backdrop-blur-sm"
      >
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <div className="h-4 w-20 rounded bg-slate-700" />
            <div className="h-2.5 w-16 rounded bg-slate-600/80" />
          </div>
          <div className="h-5 w-12 rounded-full bg-slate-700" />
        </div>
        <div className="space-y-2">
          <div className="h-2.5 w-16 rounded bg-slate-600/80" />
          <div className="h-7 w-32 rounded bg-slate-700" />
        </div>
        <div className="flex justify-between">
          <div className="h-6 w-20 rounded bg-slate-700" />
          <div className="h-6 w-20 rounded bg-slate-700" />
        </div>
      </div>
    );
  }

  if (!cards?.length) {
    return (
      <div className="flex h-[190px] w-[300px] flex-col items-center justify-center rounded-[20px] border border-dashed border-slate-700 bg-slate-800/70 p-8 text-center shadow-[0_12px_30px_rgba(2,6,23,0.35)] backdrop-blur-sm">
        <p className="text-lg font-semibold text-slate-100">No expense card yet</p>
        <p className="mt-2 text-sm text-slate-300">
          Create your first statement to begin tracking.
        </p>
      </div>
    );
  }

  return (
    <Swiper
      effect="cards"
      grabCursor
      modules={[EffectCards]}
      className="mySwiper"
      onSlideChange={(swiper) => {
        const id = Number(swiper.slides[swiper.activeIndex]?.id);
        if (!Number.isNaN(id)) onActiveCardChange(id);
      }}
    >
      {cards.map((card) => (
        <SwiperSlide id={String(card.ID)} key={card.ID}>
          <div
            className={`relative flex h-full w-full flex-col justify-between overflow-hidden rounded-[20px] bg-gradient-to-br ${gradientForCard(card.ID)} p-5 text-white shadow-[0_12px_30px_rgba(2,6,23,0.45)]`}
          >
            {/* decorative glows */}
            <div className="pointer-events-none absolute -right-10 -top-12 h-32 w-32 rounded-full bg-white/15 blur-2xl" />
            <div className="pointer-events-none absolute -bottom-12 -left-8 h-28 w-28 rounded-full bg-fuchsia-300/20 blur-2xl" />

            {/* header: month / year */}
            <div className="relative flex items-start justify-between">
              <div>
                <p className="text-base font-semibold leading-tight">
                  {monthName(card.ExpensesMonth)}
                </p>
                <p className="text-[11px] font-light uppercase tracking-[0.2em] text-white/70">
                  Statement
                </p>
              </div>
              <div className="flex items-center gap-2">
                {/* card "chip" */}
                <span className="h-5 w-7 rounded-[5px] bg-gradient-to-br from-amber-200/90 to-amber-400/90 shadow-inner" />
                <span className="rounded-full bg-white/20 px-2.5 py-0.5 text-xs font-semibold backdrop-blur-sm">
                  {card.ExpensesYear}
                </span>
              </div>
            </div>

            {/* balance hero */}
            <div className="relative">
              <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/60">
                Balance
              </p>
              <h2 className="text-2xl font-bold leading-tight">
                ฿{card.ExpensesBalance.toLocaleString()}
              </h2>
            </div>

            {/* footer: income / spending */}
            <div className="relative flex items-end justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-white/60">Income</p>
                <p className="text-sm font-semibold text-emerald-200">
                  ฿{card.ExpensesMoney.toLocaleString()}
                </p>
              </div>
              <div className="text-right">
                <p className="text-[10px] uppercase tracking-wider text-white/60">Spending</p>
                <p className="text-sm font-semibold text-rose-200">
                  ฿{card.TotalSpending.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

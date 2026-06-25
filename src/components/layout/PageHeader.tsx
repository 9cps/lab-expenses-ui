import type { ReactNode } from 'react';

interface PageHeaderProps {
  imageSrc: string;
  title: string;
  /** Action buttons pinned to the bottom on mobile, inline on desktop. */
  children?: ReactNode;
}

/** Shared top bar: emoji logo + gradient title + page actions. */
export default function PageHeader({ imageSrc, title, children }: PageHeaderProps) {
  return (
    <div className="z-10 flex w-full max-w-5xl flex-col items-center justify-between gap-4 text-sm sm:flex-row sm:gap-0">
      <div className="flex items-center h-full">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="w-11 h-11 mr-2" src={imageSrc} alt="" />
        <h1 className="bg-clip-text text-2xl font-bold text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
          {title}
        </h1>
      </div>

      {children && (
        <div className="fixed bottom-4 left-1/2 z-20 flex w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 items-center justify-center gap-2 rounded-full border border-slate-700/70 bg-slate-900/85 px-3 py-3 shadow-[0_12px_30px_rgba(2,6,23,0.45)] backdrop-blur sm:static sm:w-auto sm:translate-x-0 sm:gap-3 sm:rounded-none sm:border-transparent sm:bg-transparent sm:px-0 sm:py-0 sm:shadow-none sm:backdrop-blur-none">
          {children}
        </div>
      )}
    </div>
  );
}

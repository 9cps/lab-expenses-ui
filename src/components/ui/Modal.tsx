import { forwardRef, type ReactNode } from 'react';

export type ModalTone = 'violet' | 'emerald' | 'red' | 'neutral';

interface ModalProps {
  title?: ReactNode;
  subtitle?: ReactNode;
  children: ReactNode;
  actions?: ReactNode;
  icon?: ReactNode;
  tone?: ModalTone;
}

/** Soft tinted icon badge per tone — kept subtle for a minimal look. */
const TONE_BADGE: Record<ModalTone, string> = {
  violet: 'bg-violet-100 text-violet-600',
  emerald: 'bg-emerald-100 text-emerald-600',
  red: 'bg-red-100 text-red-600',
  neutral: 'bg-base-200 text-base-content',
};

const Modal = forwardRef<HTMLDialogElement, ModalProps>(function Modal(
  { title, subtitle, children, actions, icon, tone = 'neutral' },
  ref,
) {
  return (
    <dialog ref={ref} className="modal modal-bottom sm:modal-middle">
      <div className="modal-box bg-base-100 p-6">
        {(title || icon) && (
          <div className="flex items-center gap-3 mb-5">
            {icon && (
              <div
                className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${TONE_BADGE[tone]}`}
              >
                {icon}
              </div>
            )}
            <div className="min-w-0">
              {title && (
                <h3 className="font-semibold text-lg leading-tight text-base-content">{title}</h3>
              )}
              {subtitle && <p className="text-sm text-base-content/50">{subtitle}</p>}
            </div>
          </div>
        )}

        {children}

        {actions && <div className="mt-6 grid grid-cols-2 gap-3">{actions}</div>}
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
});

export default Modal;

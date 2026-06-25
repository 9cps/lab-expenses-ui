'use client';

import { useCallback, useRef } from 'react';

/**
 * Imperative control for a native <dialog> element.
 * Spread `dialogRef` onto the <dialog> and call open()/close() from handlers.
 */
export function useDialog() {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const open = useCallback(() => dialogRef.current?.showModal(), []);
  const close = useCallback(() => dialogRef.current?.close(), []);

  return { dialogRef, open, close };
}

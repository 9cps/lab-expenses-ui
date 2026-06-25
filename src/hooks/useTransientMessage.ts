'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Holds a message that automatically clears itself after `duration` ms.
 * Used for the success toasts shown after create/update/delete actions.
 */
export function useTransientMessage(duration = 2500) {
  const [message, setMessage] = useState('');
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  const show = useCallback(
    (text: string) => {
      setMessage(text);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setMessage(''), duration);
    },
    [duration],
  );

  useEffect(() => () => clearTimeout(timeoutRef.current), []);

  return { message, show };
}

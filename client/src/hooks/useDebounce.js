import { useState, useCallback } from 'react';

/**
 * Custom hook for debounced values
 * @param {*} initialValue
 * @param {number} delay - Debounce delay in ms
 * @returns {[*, Function, *]} [debouncedValue, setValue, immediateValue]
 */
export const useDebounce = (initialValue = '', delay = 300) => {
  const [immediateValue, setImmediateValue] = useState(initialValue);
  const [debouncedValue, setDebouncedValue] = useState(initialValue);
  const [timeoutId, setTimeoutId] = useState(null);

  const setValue = useCallback((value) => {
    setImmediateValue(value);

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    const newTimeoutId = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    setTimeoutId(newTimeoutId);
  }, [delay, timeoutId]);

  return [debouncedValue, setValue, immediateValue];
};

export default useDebounce;

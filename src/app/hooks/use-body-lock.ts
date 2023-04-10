import { useEffect, useState } from 'react';

export const useBodyLock = (isOpen: boolean) => {
  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const originalOverflow = window.getComputedStyle(document.body).overflow;

      document.body.style.overflow = 'hidden';
      setIsLocked(true);

      return () => {
        document.body.style.overflow = originalOverflow;
        setIsLocked(false);
      };
    }

    return () => {};
  }, [isOpen]);

  return isLocked;
};

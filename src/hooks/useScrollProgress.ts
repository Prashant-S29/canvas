import { useEffect, useRef, useState } from 'react';

interface ScrollProgress {
  x: number;
  y: number;
}

/**
 * Custom hook to track the horizontal and vertical scroll progress of the page.
 *
 * @param throttleTime - The duration in milliseconds to throttle updates for better performance. Default is 100ms.
 * @returns An object containing the horizontal (`x`) and vertical (`y`) scroll progress as percentages.
 *
 * @example
 * const { x, y } = useScrollProgress(50);
 * console.log(`Horizontal Progress: ${x}%`);
 * console.log(`Vertical Progress: ${y}%`);
 */
const useScrollProgress = (throttleTime = 100): ScrollProgress => {
  const [progress, setProgress] = useState<ScrollProgress>({ x: 0, y: 0 });

  // throttle timeout
  const throttleTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Calculates the scroll progress in both directions
    const calculateProgress = (): void => {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;
      const { scrollLeft, scrollWidth, clientWidth } = document.documentElement;

      const y =
        scrollHeight > clientHeight
          ? (scrollTop / (scrollHeight - clientHeight)) * 100
          : 0;
      const x =
        scrollWidth > clientWidth
          ? (scrollLeft / (scrollWidth - clientWidth)) * 100
          : 0;

      setProgress({ x, y });
    };

    // Throttled handler to limit the frequency of scroll progress updates.
    const throttledHandler = (): void => {
      if (throttleTimeout.current) return;

      throttleTimeout.current = setTimeout(() => {
        calculateProgress();
        throttleTimeout.current = null;
      }, throttleTime);
    };

    window.addEventListener('scroll', throttledHandler);
    window.addEventListener('resize', throttledHandler);

    // Initial calculation on mount
    calculateProgress();

    return () => {
      window.removeEventListener('scroll', throttledHandler);
      window.removeEventListener('resize', throttledHandler);

      if (throttleTimeout.current) {
        clearTimeout(throttleTimeout.current);
        throttleTimeout.current = null;
      }
    };
  }, [throttleTime]);

  return progress;
};

export default useScrollProgress;

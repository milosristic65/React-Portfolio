import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

export const useInViewAnimation = (
  className: string,
  threshold: number = 0.5,
  replay?: boolean | false,
) => {
  const location = useLocation();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Remove class on page change
    el.classList.remove(className);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio >= threshold) {
          el.classList.add(className);
        } else if (replay) {
          el.classList.remove(className);
        }
      },
      { threshold: [0, threshold, 1] },
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [location.pathname, className, threshold, replay]);

  return ref;
};

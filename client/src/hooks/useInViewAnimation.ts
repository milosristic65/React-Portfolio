import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

export const useInViewAnimation = (className: string, threshold: number = 0.2) => {
  const location = useLocation();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Remove the class on page change
    el.classList.remove(className);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && el) {
          el.classList.add(className);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [location.pathname, className, threshold]);

  return ref;
};

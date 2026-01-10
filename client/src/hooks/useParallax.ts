import { useEffect, useRef } from "react";

export const useParallax = (speed: number) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const scrolled = window.scrollY;
        ref.current.style.transform = `translateY(${scrolled * speed}px)`;
      }
    };

    handleScroll(); // Initial call
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed]);

  return ref;
};

import { useEffect, useRef } from "react";

export const useParallax = (speed: number) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const ease = 0.06;
  const targetY = useRef(0);
  const currentY = useRef(0);
  const animationFrameID = useRef<number | null>(null);

  useEffect(() => {
    const onScroll = () => {
      targetY.current = window.scrollY * speed;
    };

    const animate = () => {
      currentY.current += (targetY.current - currentY.current) * ease;

      if (ref.current) {
        ref.current.style.transform = `translateY(${currentY.current}px)`;
      }

      animationFrameID.current = requestAnimationFrame(animate);
    };

    // Initial calls
    onScroll();
    animate();

    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (animationFrameID.current) {
        cancelAnimationFrame(animationFrameID.current);
      }
    };
  }, [speed]);

  return ref;
};

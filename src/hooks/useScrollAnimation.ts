import { useEffect } from "react";

export default function useScrollAnimation() {
  useEffect(() => {
    const reveals = document.querySelectorAll(".reveal");
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    reveals.forEach((el) => revealObserver.observe(el));

    const counters = document.querySelectorAll(".counter");
    const counterObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const targetStr = el.getAttribute("data-target");
            const target = targetStr ? parseInt(targetStr, 10) : 0;
            
            // Validate that parsed value is a valid number
            if (isNaN(target) || target <= 0) {
              el.innerText = "0";
              obs.unobserve(el);
              return;
            }
            
            let current = 0;
            const increment = target / 45;
            const updateCounter = () => {
              current += increment;
              if (current < target) {
                el.innerText = Math.floor(current).toString();
                requestAnimationFrame(updateCounter);
              } else {
                el.innerText = target.toString();
              }
            };
            updateCounter();
            obs.unobserve(el);
          }
        });
      },
      { threshold: 0.5 }
    );
    counters.forEach((c) => counterObserver.observe(c));

    return () => {
      revealObserver.disconnect();
      counterObserver.disconnect();
    };
  }, []);
}

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
            const target = parseInt(el.getAttribute("data-target") || "0");
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

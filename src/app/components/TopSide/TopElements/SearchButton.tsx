import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";

export const SearchButton = ({
  loading,
  children,
}: {
  loading: boolean;
  children: React.ReactNode;
}) => {
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const btn = btnRef.current;
    if (!btn) return;

    const gradient = gsap.timeline({ paused: true }).to(btn, {
      backgroundPosition: "200% center",
      duration: 1.5,
      ease: "power2.inOut",
    });

    btn.addEventListener("mouseenter", () => gradient.play());
    btn.addEventListener("mouseleave", () => gradient.reverse());
  }, []);

  return (
    <button
      ref={btnRef}
      type="submit"
      disabled={loading}
      onMouseEnter={() =>
        gsap.to(btnRef.current, { scale: 1.05, duration: 0.2 })
      }
      onMouseLeave={() => gsap.to(btnRef.current, { scale: 1, duration: 0.2 })}
      className="btn-primary w-full sm:w-[120px]"
    >
      {loading ? (
        <div className="flex items-center gap-2">
          <motion.div
            className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white"
            animate={{ rotate: 360 }}
            transition={{
              repeat: Infinity,
              duration: 1,
              ease: "linear",
            }}
          />
          <span>Loading...</span>
        </div>
      ) : (
        children
      )}
    </button>
  );
};

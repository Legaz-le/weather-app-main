import { useRef } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/all";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(SplitText);

export const useAnimatedHeadline = (text: string) => {
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!textRef.current) return;
    const split = new SplitText(textRef.current, { type: "words" });
    gsap.from(split.words, {
      opacity: 0,
      stagger: 0.1,
      duration: 7,
      ease: "power2.out",
    });

    return () => split.revert();
  }, [text]);

  return textRef;
};

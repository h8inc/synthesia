import { useCallback, useEffect, useState } from "react";
import { SlideShell } from "./components/SlideShell";
import Slide01Journey from "./slides/Slide01Journey";
import Slide02Problem from "./slides/Slide02Problem";
import Slide03ActivationMap from "./slides/Slide03ActivationMap";
import Slide04AssistantHome from "./slides/Slide04AssistantHome";
import Slide05ShareCta from "./slides/Slide05ShareCta";
import Slide06HomepagePrompt from "./slides/Slide06HomepagePrompt";
import Slide07OpenQuestions from "./slides/Slide07OpenQuestions";
import Slide08Pipeline from "./slides/Slide08Pipeline";
import Slide09Frame from "./slides/Slide09Frame";
import Slide10Close from "./slides/Slide10Close";
import Slide11Companion from "./slides/Slide11Companion";

const TOTAL = 11;

function useHashSlide(defaultSlide = 1) {
  const [slide, setSlide] = useState<number>(() => {
    if (typeof window === "undefined") return defaultSlide;
    const n = parseInt(window.location.hash.replace("#", ""), 10);
    return Number.isFinite(n) && n >= 1 && n <= TOTAL ? n : defaultSlide;
  });

  useEffect(() => {
    const onHash = () => {
      const n = parseInt(window.location.hash.replace("#", ""), 10);
      if (Number.isFinite(n) && n >= 1 && n <= TOTAL) setSlide(n);
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  useEffect(() => {
    const target = `#${slide}`;
    if (window.location.hash !== target) {
      window.history.replaceState(null, "", target);
    }
  }, [slide]);

  return [slide, setSlide] as const;
}

export default function App() {
  const [slide, setSlide] = useHashSlide(1);
  const [overlayOpen, setOverlayOpen] = useState(false);

  const onNav = useCallback(
    (delta: number) => {
      setSlide((s) => Math.min(TOTAL, Math.max(1, s + delta)));
    },
    [setSlide]
  );
  const onJump = useCallback(
    (n: number) => {
      setSlide(Math.min(TOTAL, Math.max(1, n)));
    },
    [setSlide]
  );

  return (
    <SlideShell
      currentSlide={slide}
      totalSlides={TOTAL}
      onNav={onNav}
      onJump={onJump}
      overlayOpen={overlayOpen}
    >
      {slide === 1 && <Slide01Journey />}
      {slide === 2 && <Slide02Problem />}
      {slide === 3 && <Slide03ActivationMap />}
      {slide === 4 && <Slide04AssistantHome />}
      {slide === 5 && <Slide05ShareCta />}
      {slide === 6 && (
        <Slide06HomepagePrompt
          overlayOpen={overlayOpen}
          setOverlayOpen={setOverlayOpen}
        />
      )}
      {slide === 7 && <Slide07OpenQuestions />}
      {slide === 8 && <Slide08Pipeline />}
      {slide === 9 && <Slide09Frame />}
      {slide === 10 && <Slide10Close />}
      {slide === 11 && <Slide11Companion />}
    </SlideShell>
  );
}

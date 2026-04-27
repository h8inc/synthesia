import { useCallback, useEffect, useState } from "react";
import { SlideShell } from "./components/SlideShell";
import { SlideMinMergedProblem } from "./minimal/SlideMinMergedProblem";
import Slide03ActivationMap from "./slides/Slide03ActivationMap";
import Slide04AssistantHome from "./slides/Slide04AssistantHome";
import Slide05ShareCta from "./slides/Slide05ShareCta";
import { SlideMinMergedIdea03 } from "./minimal/SlideMinMergedIdea03";
import Slide10Close from "./slides/Slide10Close";
import Slide08Pipeline from "./slides/Slide08Pipeline";
import Slide09Frame from "./slides/Slide09Frame";
import Slide11Companion from "./slides/Slide11Companion";
import { fonts, tokens } from "./lib/tokens";

const TOTAL = 9;

function useHashSlideMinimal(defaultSlide = 1) {
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

function AppendixHint({ slide }: { slide: number }) {
  if (slide < 8) return null;
  return (
    <div
      className="mb-4 flex-shrink-0"
      style={{
        fontFamily: fonts.mono,
        fontSize: 9,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        color: tokens.muted,
      }}
    >
      Appendix · slides 8–9
    </div>
  );
}

export default function AppMinimal() {
  const [slide, setSlide] = useHashSlideMinimal(1);
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
      <AppendixHint slide={slide} />
      {slide === 1 && <SlideMinMergedProblem />}
      {slide === 2 && (
        <Slide03ActivationMap slideNum={2} totalSlides={TOTAL} />
      )}
      {slide === 3 && (
        <Slide04AssistantHome slideNum={3} totalSlides={TOTAL} />
      )}
      {slide === 4 && (
        <Slide05ShareCta slideNum={4} totalSlides={TOTAL} />
      )}
      {slide === 5 && (
        <SlideMinMergedIdea03
          overlayOpen={overlayOpen}
          setOverlayOpen={setOverlayOpen}
        />
      )}
      {slide === 6 && (
        <Slide08Pipeline slideNum={6} totalSlides={TOTAL} />
      )}
      {slide === 7 && (
        <Slide10Close slideNum={7} totalSlides={TOTAL} />
      )}
      {slide === 8 && (
        <Slide09Frame slideNum={8} totalSlides={TOTAL} />
      )}
      {slide === 9 && (
        <Slide11Companion slideNum={9} totalSlides={TOTAL} />
      )}
    </SlideShell>
  );
}

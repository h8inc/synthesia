import Slide06HomepagePrompt from "../slides/Slide06HomepagePrompt";
import Slide07OpenQuestions from "../slides/Slide07OpenQuestions";
import { tokens } from "../lib/tokens";

type Props = {
  overlayOpen: boolean;
  setOverlayOpen: (v: boolean) => void;
};

/** Single “slide”: Idea 03 prototype + open questions (old slides 6–7). */
export function SlideMinMergedIdea03({
  overlayOpen,
  setOverlayOpen,
}: Props) {
  return (
    <div className="flex flex-col gap-10">
      <Slide06HomepagePrompt
        overlayOpen={overlayOpen}
        setOverlayOpen={setOverlayOpen}
        slideNum={5}
        totalSlides={9}
        headerMeta="Homepage Type 1 bet — open questions follow on this slide"
      />
      <div
        className="w-full flex-shrink-0"
        style={{ height: 1, background: tokens.rule }}
        aria-hidden
      />
      <Slide07OpenQuestions slideNum={5} totalSlides={9} hideHeader />
    </div>
  );
}

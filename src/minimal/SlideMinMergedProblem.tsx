import Slide01Journey from "../slides/Slide01Journey";
import Slide02Problem from "../slides/Slide02Problem";
import { tokens } from "../lib/tokens";

/** Single “slide”: cover + five panels + problem / mechanism (old slides 1–2). */
export function SlideMinMergedProblem() {
  return (
    <div className="flex flex-col gap-10">
      <Slide01Journey showFooter={false} />
      <div
        className="w-full flex-shrink-0"
        style={{ height: 1, background: tokens.rule }}
        aria-hidden
      />
      <Slide02Problem slideNum={1} totalSlides={9} />
    </div>
  );
}

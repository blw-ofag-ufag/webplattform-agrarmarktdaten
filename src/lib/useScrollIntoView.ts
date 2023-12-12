import * as React from "react";
import { usePrevious } from "@/lib/usePrevious";
import { maxSectionsAtom, focusSectionAtom } from "@/lib/atoms";
import { useAtom, useSetAtom, useAtomValue } from "jotai";
import { useIntersectionObserver } from "@/lib/useIntersectionObserver";

// Good compromise that takes into consideration height of the average section. Eyeballed
const SCREEN_VISIBLE_THRESHOLD = 0.2;

export const useInitSections = (max: number) => {
  const setMaxSections = useSetAtom(maxSectionsAtom);
  const setFocusSection = useSetAtom(focusSectionAtom);
  setMaxSections(max);
  setFocusSection(max >= 1 ? 1 : 0);
};

/**
 * Hook that takes the current H1 index returns a ref for it. Based on the position
 * the element has on screen it manipulates the focusSectionAtom to set it as best as possible to
 * reflect the current focus section. This atom is then used by the TOC to add a visual emphasis to
 * the correct section so that both the StructuredText and TOC are in sync
 */
export const useScrollIntoView = (id: number) => {
  const [focusSection, setFocusSection] = useAtom(focusSectionAtom);
  const maxSections = useAtomValue(maxSectionsAtom);
  const [scroll, setScroll] = React.useState(0);
  const previousScroll = usePrevious(scroll);
  const ref = React.useRef(null);
  const entry = useIntersectionObserver(ref, { rootMargin: "0%", threshold: 1.0 });

  React.useEffect(() => {
    const handleScroll = (event: $FixMe) => {
      if (event.currentTarget?.visualViewport && previousScroll !== undefined) {
        //How far the element is from the top of the *viewport* (not page, not document, viewport!)
        const elemViewportOffset = entry?.target.getBoundingClientRect().top ?? -1;
        const { height: viewportHeight, pageTop: howFarWeHaveScrolled } =
          event.currentTarget.visualViewport;
        //We're scrolling down
        if (howFarWeHaveScrolled >= previousScroll) {
          if (elemViewportOffset < 0) {
            //The element is beyond the top of the viewport
            // if (id === focusSection && focusSection < maxSections) {
            // setFocusSection(id + 1);
            // }
          } else if (elemViewportOffset <= viewportHeight * SCREEN_VISIBLE_THRESHOLD) {
            //Element is in the sweet spot and is in focus
            if (id !== focusSection) {
              setFocusSection(id);
            }
          }
        } else {
          //We're scrolling up
          if (elemViewportOffset < 0) {
            // not sure we need to do something here
          } else if (elemViewportOffset <= viewportHeight * SCREEN_VISIBLE_THRESHOLD) {
            if (id !== focusSection) {
              //Element is in the sweet spot and is in focus
              setFocusSection(id);
            }
          } else {
            // The element is beyond the sweet spot (downwards) and should be removed
            if (focusSection === id && focusSection > 1) {
              setFocusSection(id - 1);
            }
          }
        }
        setScroll(howFarWeHaveScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [entry, id, previousScroll, setFocusSection, focusSection, maxSections]);

  return [ref];
};

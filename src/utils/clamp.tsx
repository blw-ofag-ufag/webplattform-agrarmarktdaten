import * as React from "react";

export const isHTMLElement = function (element: unknown): element is HTMLElement {
  return element instanceof HTMLElement;
};
const applyLineClamping = function (clampedElements: HTMLElement[]) {
  // Reset styles
  clampedElements.forEach((element) => {
    Object.assign(element.style, {
      WebkitLineClamp: "",
      height: "",
      maxHeight: "",
    });
  });

  // Let the browser recompute layout automatically before applying clamping
  requestAnimationFrame(() => {
    clampedElements.forEach((element) => {
      const containerHeight = element.clientHeight;
      const lineHeight = parseFloat(window.getComputedStyle(element).lineHeight);
      const lines = Math.floor(containerHeight / lineHeight);

      const style = {
        overflow: "hidden",
        display: "-webkit-box",
        WebkitBoxOrient: "vertical",
        WebkitLineClamp: lines,
        // Necessary since line clamping only applies the ellipsis
        height: `${lines * lineHeight}px`,
        maxHeight: `${lines * lineHeight}px`,
      };

      Object.assign(element.style, style);
    });
  });
};
/**
 * Applies line clamping, and reacts to window resizing
 */
export const useLineClamping = (getElements: () => HTMLElement[]) => {
  const getElementsRef = React.useRef(getElements);
  getElementsRef.current = getElements;
  React.useEffect(() => {
    function updateSize() {
      const clampedElements = getElementsRef.current();
      applyLineClamping(clampedElements);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
};

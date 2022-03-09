export const smoothScroll = (selectorOrElement, duration = 700) => {
  const el = toElement(selectorOrElement);
  if (el === null) {
    return Promise.reject(
      new Error(`Element '${selectorOrElement}' not found`)
    );
  }
  const clock = window.performance.now();
  const start = window.pageYOffset;
  const end = getTop(el, start);
  return new Promise((resolve) => {
    const step = () => {
      const elapsed = window.performance.now() - clock;
      window.scroll(0, position(start, end, elapsed, duration));
      if (elapsed > duration) {
        resolve();
      } else {
        window.requestAnimationFrame(step);
      }
    };
    step();
  });
};

const getTop = (element, start) =>
  element.nodeName === "HTML"
    ? -start
    : element.getBoundingClientRect().top + start;
const easeInOutCubic = (t) =>
  t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
const position = (start, end, elapsed, duration) =>
  elapsed > duration
    ? end
    : start + (end - start) * easeInOutCubic(elapsed / duration);
const toElement = (selectorOrElement) => {
  if (typeof selectorOrElement === "string") {
    return document.querySelector(selectorOrElement);
  } else {
    return selectorOrElement;
  }
};

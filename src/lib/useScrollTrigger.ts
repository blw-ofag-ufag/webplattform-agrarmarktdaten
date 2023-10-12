import * as React from "react";

interface Props {
  threshold?: number;
}

export const useScrollTrigger = ({ threshold = 100 }: Props) => {
  const [trigger, setTrigger] = React.useState(false);
  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > threshold) {
        setTrigger(true);
      } else {
        setTrigger(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {};
  }, [threshold, trigger]);
  return trigger;
};

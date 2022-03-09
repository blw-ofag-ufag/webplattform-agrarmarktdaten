import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useInView } from "react-intersection-observer";

type ActiveSection = string | undefined;

const ScrollyContext = createContext<{
  activeSection: ActiveSection;
  sections: Set<string>;
  updateSection: (section: string, intersectionRatio: number) => void;
}>({ activeSection: "one", sections: new Set(), updateSection: () => {} });

export const ScrollyProvider = ({
  children,
  sections,
}: {
  children: React.ReactNode;
  sections: Set<string>;
}) => {
  const [activeSection, setActiveSection] = useState<ActiveSection>("one");
  const sectionsRef = useRef<Record<string, number>>({});

  const updateSection = useCallback(
    (id: string, intersectionRatio: number) => {
      if (sectionsRef.current[id] === intersectionRatio) {
        return;
      }
      sectionsRef.current[id] = intersectionRatio;

      let mostVisibleSection: [ActiveSection, number] = ["one", -1];
      for (let section of Object.entries(sectionsRef.current)) {
        if (section[1] > mostVisibleSection[1]) {
          mostVisibleSection = [section[0], section[1]];
        }
      }

      if (activeSection !== mostVisibleSection[0]) {
        setActiveSection(mostVisibleSection[0]);
      }
    },
    [activeSection, setActiveSection]
  );

  return (
    <ScrollyContext.Provider value={{ activeSection, sections, updateSection }}>
      {children}
    </ScrollyContext.Provider>
  );
};

// Keep this constant to avoid re-observing in each render:
const THRESHOLD = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1];

export const useScrolly = (id: string) => {
  const { activeSection, sections, updateSection } = useContext(ScrollyContext);
  const [ref, inView, entry] = useInView({ threshold: THRESHOLD });

  const intersectionRatio = entry ? entry.intersectionRatio : -1;

  useEffect(() => {
    updateSection(id, inView ? intersectionRatio : -1);
  }, [id, inView, intersectionRatio, updateSection]);
  return {
    ref,
    isActive: id === activeSection,
    inView,
    intersectionRatio,
    sections,
  };
};

export const useReadScrolly = () => {
  const { activeSection, sections } = useContext(ScrollyContext);
  return { activeSection, sections };
};

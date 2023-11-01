import { useRouter } from "next/router";
import { useEffect } from "react";

// Extend the Window interface
interface CustomWindow {
  _paq: string[][]; // You can use a more specific type for _paq if it's available
}

// Merge the existing global Window interface with the custom one
declare global {
  interface Window extends CustomWindow {}
}

export const setup = () => {
  if (process.env.NODE_ENV !== "production") {
    return;
  }

  if (typeof window === "undefined") {
    return;
  }

  const _paq = (window._paq = window._paq || []);

  _paq.push(["trackPageView"]);
  _paq.push(["enableLinkTracking"]);

  const u = "https://analytics.bit.admin.ch/";
  _paq.push(["setTrackerUrl", u + "matomo.php"]);
  _paq.push(["setSiteId", "32"]);
  const d = document,
    g = d.createElement("script"),
    s = d.getElementsByTagName("script")[0];
  g.async = true;
  g.src = u + "matomo.js";

  if (!s.parentNode) {
    console.log("Could not insert Matomo script");
    return;
  }
  s.parentNode.insertBefore(g, s);
};

export const useMatomo = () => {
  const router = useRouter();

  useEffect(() => {
    // Attach Matomo to the router to track page changes
    router.events.on("routeChangeComplete", () => {
      if (typeof window._paq !== "undefined") {
        window._paq.push(["trackPageView"]);
      }
    });
  }, [router.events]);
};

/**
 * SOURCE: https://gist.github.com/claus/992a5596d6532ac91b24abe24e10ae81
 */
import { useEffect } from "react";
import Router, { NextRouter } from "next/router";

function saveScrollPos(url: string) {
  const scrollPos = { x: window.scrollX, y: window.scrollY };
  sessionStorage.setItem(`scrollRestoration.${url}`, JSON.stringify(scrollPos));
}

function restoreScrollPos(url: string) {
  try {
    const storedPos = sessionStorage.getItem(`scrollRestoration.${url}`);
    if (storedPos) {
      const scrollPos = JSON.parse(storedPos);
      if (scrollPos) {
        window.scrollTo(scrollPos.x, scrollPos.y);
      }
    }
  } catch (e) {}
}

/**
 * For some unknown reason the scroll restoration behaviour of the browser is not working as intended
 * and because this was a bug pointed out by the client we've implemented a workaround that allows the
 * intended behaviour to take place.
 *
 * NOTE: the behaviour is not quite what's expected with firefox and the the reduced motion setting set to true
 */
export default function useScrollRestoration(router: NextRouter) {
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      let shouldScrollRestore = false;
      window.history.scrollRestoration = "manual";
      restoreScrollPos(router.asPath);

      const onBeforeUnload = (event: BeforeUnloadEvent) => {
        saveScrollPos(router.asPath);
        delete event["returnValue"];
      };

      const onRouteChangeStart = () => {
        saveScrollPos(router.asPath);
      };

      const onRouteChangeComplete = (url: string) => {
        if (shouldScrollRestore) {
          shouldScrollRestore = false;
          restoreScrollPos(url);
        }
      };

      window.addEventListener("beforeunload", onBeforeUnload);
      Router.events.on("routeChangeStart", onRouteChangeStart);
      Router.events.on("routeChangeComplete", onRouteChangeComplete);
      Router.beforePopState(() => {
        shouldScrollRestore = true;
        return true;
      });

      return () => {
        window.removeEventListener("beforeunload", onBeforeUnload);
        Router.events.off("routeChangeStart", onRouteChangeStart);
        Router.events.off("routeChangeComplete", onRouteChangeComplete);
        Router.beforePopState(() => true);
      };
    }
  }, [router]);
}

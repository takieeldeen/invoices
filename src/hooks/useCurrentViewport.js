import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../tailwind.config";
import { useEffect, useState } from "react";

export function useCurrentViewport() {
  const screens = resolveConfig(tailwindConfig).theme.screens;
  const largestScreenWidth =
    Object.entries(screens)[Object.entries(screens).length - 1][0];
  //Getting the initial screen width
  let initialScreenWidth;
  for (const screen of Object.entries(screens)) {
    if (+screen[1].replace("px", "") > window.innerWidth) {
      initialScreenWidth = screen[0];
      break;
      //   console.log(screen[0]);
    }
  }
  const [currentViewport, setCurrentViewport] = useState(
    initialScreenWidth || largestScreenWidth,
  );
  //   useEffect to occur on the component mount
  useEffect(() => {
    //Function for detecting current breakpoint
    const handleResize = () => {
      const currentScreenWidth = window.innerWidth;
      for (const screen of Object.entries(screens)) {
        if (+screen[1].replace("px", "") > currentScreenWidth) {
          setCurrentViewport(screen[0]);
          return;
        }
      }
      setCurrentViewport(largestScreenWidth);
    };
    //Adding the event listener on each screen resize
    window.addEventListener("resize", handleResize);
    //Cleanup function
    return () => window.removeEventListener("resize", handleResize);
  }, [screens, largestScreenWidth]);
  return currentViewport;
}

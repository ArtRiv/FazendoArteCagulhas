import * as React from "react";

export function useMediaQuery(query: string) {
  const [value, setValue] = React.useState(false);

  React.useEffect(() => {
    const mediaQueryList = window.matchMedia(query);

    const onChange = (event: MediaQueryList | MediaQueryListEvent) => {
      setValue(event.matches);
    };

    // Handle older browsers that do not support `addEventListener`
    if (mediaQueryList.addEventListener) {
      mediaQueryList.addEventListener("change", onChange);
    } else {
      mediaQueryList.addListener(onChange);
    }

    // Set initial value
    setValue(mediaQueryList.matches);

    // Cleanup listener on unmount
    return () => {
      if (mediaQueryList.removeEventListener) {
        mediaQueryList.removeEventListener("change", onChange);
      } else {
        mediaQueryList.removeListener(onChange);
      }
    };
  }, [query]);

  return value;
}

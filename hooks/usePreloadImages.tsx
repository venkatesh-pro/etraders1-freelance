// hooks/usePreloadImages.ts
import { useEffect, useState } from "react";

const usePreloadImages = (imageUrls: string[]) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    console.log("Preloading images...");
    setLoaded(false); // Reset loaded state when imageUrls change
    let isMounted = true;
    let loadedCount = 0;

    if (imageUrls.length === 0) {
      console.log("No images to preload.");
      setLoaded(true);
      return;
    }

    imageUrls.forEach((url) => {
      const img = new Image();
      img.src = url;
      img.onload = () => {
        loadedCount++;
        console.log(`Image loaded: ${url}`);
        if (isMounted && loadedCount === imageUrls.length) {
          console.log("All images loaded.");
          setLoaded(true);
        }
      };
      img.onerror = () => {
        loadedCount++;
        console.error(`Failed to load image: ${url}`);
        if (isMounted && loadedCount === imageUrls.length) {
          console.log("All images attempted to load.");
          setLoaded(true);
        }
      };
    });

    return () => {
      isMounted = false;
    };
  }, [imageUrls]);

  return loaded;
};

export default usePreloadImages;

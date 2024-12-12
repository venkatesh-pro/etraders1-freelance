import { useEffect, useState } from "react";

export function usePreloadImages(imageUrls: string[]) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let loadedCount = 0;
    imageUrls.forEach((url) => {
      const img = new Image();
      img.src = url;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === imageUrls.length) {
          setLoaded(true);
        }
      };
    });
  }, [imageUrls]);

  return loaded;
}


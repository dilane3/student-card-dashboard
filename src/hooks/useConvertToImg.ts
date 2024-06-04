import { sleep } from "@/utils";
import { toPng, toSvg } from "html-to-image";
import { useEffect, useState } from "react";

export default function useConvertToPng(ref: React.RefObject<HTMLDivElement>) {
  const [image, setImage] = useState<string | null>(null);
  const [waiting, setWaiting] = useState(true);

  useEffect(() => {
    (async () => {
      await sleep(1500); 

      setWaiting(false);
    })()
  }, [])

  useEffect(() => {
    if (waiting) return;

    convertToPng();
  }, [ref.current, waiting]);

  const convertToPng = () => {
    const node = ref.current;

    if (!node) return;

    toPng(node, { quality: 1, preferredFontFormat: "woff2", pixelRatio: 8 })
      .then((dataUrl) => {
        setImage(dataUrl);
      })
      .catch((error) => {
        console.error("oops, something went wrong!", error);
      });
  };

  return image;
}

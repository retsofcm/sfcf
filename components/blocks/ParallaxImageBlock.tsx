"use client";

import { useEffect, useRef, useState } from "react";
import { TinaField } from "tinacms";

type Props = {
  data: {
    src: string;
    alt?: string;
  };
};

export const ParallaxImageBlock = ({ data }: Props) => {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setOffsetY(offset); // Adjust this multiplier to control speed
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative w-full h-[560px] overflow-hidden">
      {/* Parallax background image */}
      <div
        ref={parallaxRef}
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
        style={{
          backgroundImage: `url(${data.src})`,
          backgroundPositionY: `${-offsetY * 0.2}px`, // Adjust the Y position of the background image
          backgroundRepeat: "no-repeat", // Prevents repeating of the background image
          backgroundColor: "white", // White background color for empty space
          willChange: "background-position",
        }}
        aria-label={data.alt}
      />
    </div>
  );
};

export const parallaxImageBlockSchema: TinaField = {
  type: "object",
  label: "Parallax Image",
  name: "parallaxImage",
  fields: [
    {
      type: "image",
      label: "Image",
      name: "src",
    },
    {
      type: "string",
      label: "Alt Text",
      name: "alt",
    },
  ],
};

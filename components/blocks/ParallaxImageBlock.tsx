"use client";

import { useEffect, useRef, useState } from "react";
import { Template } from "tinacms";

type Props = {
  data: {
    src: string | null | undefined;
    alt?: string;
  };
};

export const ParallaxImageBlock = ({ data }: Props) => {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setOffsetY(offset);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const imageUrl = data.src ?? '';

  return (
    <div className="relative w-full h-[560px] overflow-hidden">
      {/* Parallax background image */}
      <div
        ref={parallaxRef}
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundPositionY: `${-offsetY * 0.2}px`,
          backgroundRepeat: "no-repeat",
          backgroundColor: "white",
          willChange: "background-position",
        }}
        aria-label={data.alt || "Parallax Image"}
      />
    </div>
  );
};

export const parallaxImageBlockSchema: Template = {
  name: "parallaxImage",
  label: "Parallax Image",
  ui: {
    previewSrc: "/blocks/parallax-image.png",
    defaultItem: {
      src: "/path/to/default-image.jpg",
      alt: "Default Parallax Image",
    },
  },
  fields: [
    {
      type: "image",
      label: "Image",
      name: "src",
      required: true,
    },
    {
      type: "string",
      label: "Alt Text",
      name: "alt",
      required: false,
    },
  ],
};

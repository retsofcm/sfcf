import React from "react";
import { type Template } from "tinacms";
import { PageBlocksGoogleMap } from "../../tina/__generated__/types";


export function GoogleMapBlock({ data }: { data: PageBlocksGoogleMap }) {
  return (
    <div className="my-8">
      {data.location && <h2 className="text-lg font-semibold mb-2">{data.location}</h2>}
      <div className="h-[400px] w-full">
        <iframe
          src={data.embedUrl ?? undefined}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
}

export const GoogleMapBlockSchema: Template = {
  name: "GoogleMap",
  label: "Google Map",
  fields: [
    {
      type: "string",
      name: "location",
      label: "Location Name (for reference)",
    },
    {
      type: "string",
      name: "embedUrl",
      label: "Google Maps Embed URL",
      description:
        "Paste the embed URL from Google Maps (should start with https://www.google.com/maps/embed?...).",
      ui: {
        validate: (value) => {
          if (!value?.startsWith("https://www.google.com/maps/embed")) {
            return "Please enter a valid Google Maps embed URL.";
          }
        },
      },
    },
  ],
};

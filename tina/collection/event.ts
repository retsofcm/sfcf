import { Collection } from 'tinacms';

const Event: Collection = {
  label: "Events",
  name: "event",
  path: "content/events",
  format: "mdx",
  ui: {
    router: ({ document }) => {
      return `/events/${document._sys.breadcrumbs.join("/")}`;
    },
  },
  fields: [
    {
      type: "string",
      label: "Event Name",
      name: "eventName",
      isTitle: true,
      required: true,
    },
    {
      type: "image",
      name: "heroImg",
      label: "Hero Image",
    },
    {
      type: "datetime",
      label: "Start Date",
      name: "startDate",
      ui: {
        dateFormat: "MMMM DD YYYY",
        timeFormat: "hh:mm A",
      },
    },
    {
      type: "datetime",
      label: "End Date",
      name: "endDate",
      ui: {
        dateFormat: "MMMM DD YYYY",
        timeFormat: "hh:mm A",
      },
    },
    {
      type: "rich-text",
      label: "Body",
      name: "body",
      isBody: true,
    },
    {
      type: "string",
      label: "Location",
      name: "location",
    },
    {
      type: "string",
      label: "Price",
      name: "price",
    },
  ],
};

export default Event;

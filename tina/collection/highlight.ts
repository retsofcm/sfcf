import { Collection } from 'tinacms';

const Highlight: Collection = {
  label: "Highlights",
  name: "highlight",
  path: "content/highlights",
  format: "mdx",
  defaultItem: () => {
    return {
      date: new Date().toISOString(),
    };
  },
  ui: {
    filename: {
      slugify: (values) => {
        return values?.title?.toLowerCase().replace(/ /g, '-').replace(/[^\w-]/g, '');
      },
    },
    router: ({ document }) => {
      return `/highlights/${document._sys.breadcrumbs.join("/")}`;
    },
  },


  fields: [
    {
      type: "string",
      label: "Title",
      name: "title",
      isTitle: true,
      description: "This is the primary title used for listings (squares) and as the main heading above the content section.",
      required: true,
    },
    {
      type: "string",
      label: "Subtitle",
      name: "subtitle",
      description: "This is the inner title that displays inside the content block itself (e.g., 'Finding Hope').",
      required: false,
    },

    {
      type: "datetime",
      label: "Date",
      name: "date",
      ui: {
        component: "hidden",
      },
    },
    {
      type: "image",
      label: "Image",
      name: "image",
      required: true,
    },
    {
      type: "rich-text",
      label: "Content",
      name: "content",
      isBody: true,
      required: true,
    },
    {
      type: "string",
      label: "Button Text",
      name: "buttonText",
      required: false,
    },
    {
      type: "string",
      label: "Button URL",
      name: "buttonUrl",
      required: false,
    },
  ],
};


export default Highlight;


import { Collection } from 'tinacms';

const Sermon: Collection = {
  label: "Sermon",
  name: "sermon",
  path: "content/sermons",
  format: "mdx",
  ui: {
    router: ({ document }) => {
      return `/sermons/${document._sys.breadcrumbs.join("/")}`;
    },
  },
  fields: [
    {
      type: "string",
      label: "Speaker",
      name: "speaker",
      required: false, // Made optional
    },
    {
      type: "datetime",
      label: "Date",
      name: "date",
      required: false, // Made optional
    },
    {
      type: "string",
      label: "Passage",
      name: "passage",
      required: false, // Made optional
    },
    {
      type: "string",
      label: "Description",
      name: "description",
      required: false, // Made optional
    },
    {
      type: "image",
      label: "Sermon Image",
      name: "sermonImage",
      required: false, // Made optional
    },
    {
      type: "image",
      label: "Audio File (MP3)",
      name: "audioFile",
      required: false, // Made optional
    },
    {
      type: "string",
      label: "Page URL (must match the file name)",
      name: "link",
      required: true, // Made optional
    },
  ],
};

export default Sermon;

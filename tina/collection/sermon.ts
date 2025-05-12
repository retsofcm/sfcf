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
      required: true,
    },
    {
      type: "string",
      label: "Title",
      name: "title",
      required: true,
    },
    {
      type: "string",
      label: "Series",
      name: "series",
      required: false,
    },
    {
      type: "datetime",
      label: "Date",
      name: "date",
      required: false,
    },
    {
      type: "string",
      label: "Passage",
      name: "passage",
      required: true,
    },
    {
      type: "string",
      label: "Description",
      name: "description",
      required: false,
    },
    {
      type: "string",
      name: "passageLink",
      label: "Link to Bible Passage",
      required: false,
    },
    {
      type: "image",
      label: "Sermon Image",
      name: "sermonImage",
      required: false,
    },
    {
      type: "string",
      label: "Audio File (MP3)",
      name: "audioFile",
      required: true,
    },
    {
      type: "string",
      label: "Page URL (must match the file name)",
      name: "link",
      required: true,
    },
  ],
};

export default Sermon;

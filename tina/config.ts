import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,

  // Get this from tina.io
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  // Get this from tina.io
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      {
        name: "homepage",
        label: "Homepage",
        path: "content/homepage",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: false,
            required: true,
          },
          {
            type: "string",
            name: "subtitle",
            label: "Subtitle",
            isTitle: false,
            required: true,
          },
          {
            type: "image",
            name: "heroImage",
            label: "Image",
            required: true,
          },
          {
            type: "string",
            name: "day",
            label: "Day",
            isTitle: false,
            required: true,
          },
          {
            type: "string",
            name: "time",
            label: "Time",
            isTitle: false,
            required: true,
          },
          {
            type: "string",
            name: "addressLine1",
            label: "Address Line 1",
            isTitle: false,
            required: true,
          },
          {
            type: "string",
            name: "addressLine2",
            label: "Address Line 2",
            isTitle: false,
            required: true,
          },
          {
            type: "string",
            name: "addressLine3",
            label: "Address Line 3",
            isTitle: false,
            required: true,
          },
        ],
        ui: {
          router: ({ document }) => {
            if (document._sys.filename === "hero") {
              return "/";
            }
          },
        },
      },
    ],
  },
});

import { defineConfig } from "tinacms";
import nextConfig from '../next.config'

import Post from "./collection/post";
import Global from "./collection/global";
import Author from "./collection/author";
import Page from "./collection/page";

const config = defineConfig({
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID!,
  branch:
    process.env.GITHUB_BRANCH! || // custom branch env override
    process.env.VERCEL_GIT_COMMIT_REF! || // Vercel branch env
    process.env.HEAD! || // Netlify branch env
    "main",
  token: process.env.TINA_TOKEN!,
  media: {
    // If you wanted cloudinary do this
    // loadCustomStore: async () => {
    //   const pack = await import("next-tinacms-cloudinary");
    //   return pack.TinaCloudCloudinaryMediaStore;
    // },
    // this is the config for the tina cloud media store
    tina: {
      publicFolder: "public",
      mediaRoot: "uploads",
    },
  },
  build: {
    publicFolder: "public", // The public asset folder for your framework
    outputFolder: "admin", // within the public folder
  },
  schema: {
    collections: [
      Page, 
      Post, 
      Author, 
      Global,
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

export default config;

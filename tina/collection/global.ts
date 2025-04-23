import type { Collection } from "tinacms";
import { ColorPickerInput } from "../fields/color";
import { iconSchema } from "../fields/icon";
import { icon } from "mermaid/dist/rendering-util/rendering-elements/shapes/icon.js";

const Global: Collection = {
  label: "Global",
  name: "global",
  path: "content/global",
  format: "json",
  ui: {
    global: true,
  },
  fields: [
    {
      type: "object",
      label: "Header",
      name: "header",
      fields: [
        iconSchema as any,
        {
          type: "string",
          label: "Name",
          name: "name",
        },
        {
          type: "string",
          label: "Color",
          name: "color",
          options: [
            { label: "Default", value: "default" },
            { label: "Primary", value: "primary" },
          ],
        },
        {
          type: "object",
          label: "Nav Links",
          name: "nav",
          list: true,
          ui: {
            itemProps: (item) => {
              return { label: item?.label };
            },
            defaultItem: {
              href: "home",
              label: "Home",
            },
          },
          fields: [
            {
              type: "string",
              label: "Link",
              name: "href",
            },
            {
              type: "string",
              label: "Label",
              name: "label",
            },
          ],
        },
      ],
    },
    {
      type: "object",
      label: "Footer",
      name: "footer",
      fields: [
        {
          type: "object",
          label: "Social Links",
          name: "social",
          list: true,
          ui: {
            itemProps: (item) => {
              return { label: item?.icon?.name || 'undefined' };
            },
          },
          fields: [
            iconSchema as any,
            {
              type: "string",
              label: "Url",
              name: "url",
            },
          ],
        },
        {
          type: "object",
          label: "Link Columns",
          name: "columns",
          list: true,
          ui: {
            itemProps: (item) => {
              return { label: item?.title || "Column" };
            },
          },
          fields: [
            {
              type: "string",
              label: "Column Title",
              name: "title",
              required: true,
            },
            {
              type: "object",
              label: "Links",
              name: "links",
              list: true,
              ui: {
                itemProps: (item) => ({
                  label: item?.label || "Link",
                }),
              },
              fields: [
                {
                  type: "string",
                  label: "Label",
                  name: "label",
                },
                {
                  type: "string",
                  label: "URL",
                  name: "url",
                },
              ],
            },
          ],
        },
        {
          type: "object",
          label: "Contact Info",
          name: "contact",
          fields: [
            {
              type: "string",
              label: "Line 1",
              name: "line1",
            },
            {
              type: "string",
              label: "Line 2",
              name: "line2",
            },
            {
              type: "string",
              label: "Postcode",
              name: "postcode",
            },
            {
              type: "string",
              label: "Email",
              name: "email",
            },
          ],
        }        
      ],
    },
    {
      type: "object",
      label: "Theme",
      name: "theme",
      // @ts-ignore
      fields: [
        {
          type: "string",
          label: "Primary Color",
          name: "color",
          ui: {
            component: ColorPickerInput,
          },
        },
        {
          type: "string",
          name: "font",
          label: "Font Family",
          options: [
            {
              label: "Lato",
              value: "lato",
            },
            {
              label: "Merriweather",
              value: "merriweather",
            }
          ],
        },
        {
          type: "string",
          name: "darkMode",
          label: "Dark Mode",
          options: [
            {
              label: "System",
              value: "system",
            },
            {
              label: "Light",
              value: "light",
            },
            {
              label: "Dark",
              value: "dark",
            },
          ],
        },
      ],
    },
  ],
};

export default Global;

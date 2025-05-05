"use client";

import Image from "next/image";
import { Template } from "tinacms";
import { TinaMarkdown, TinaMarkdownContent } from "tinacms/dist/rich-text";
import { useFormHandler } from "../../utils/formHandler";

type Props = {
  data: {
    imageSrc: string | null | undefined;
    title?: string | null;
    content: TinaMarkdownContent | TinaMarkdownContent[];
    buttonText: string | null;
    buttonUrl?: string | null;
    enableForm?: boolean | null;
    formData?: {
      name?: string | null;
      email?: string | null;
      phone?: string | null;
    } | null;
  };
};

export const ImageWithTextBlock = ({ data }: Props) => {
  const { imageSrc, title, content, buttonText, buttonUrl, enableForm } = data;

  const { formData, message, handleInputChange, handleSubmit } = useFormHandler(
    {
      name: "",
      email: "",
      phone: "",
    }
  );
  
  return (
    <div className="container py-10 md:py-20 mx-auto">
      <div className="grid grid-cols-12 gap-8 md:gap-4 items-center">
        {/* Text Section (5 cols) */}
        <div className="col-span-12 lg:col-span-4 lg:col-start-8 order-2 lg:order-2">
          <h2 
            className="text-[32px] font-light leading-[1.5] mb-6 underline decoration-green-500 underline-offset-3"
            style={{
              textDecorationColor: '#028103',
              textDecorationThickness: '3px',
              textUnderlineOffset: '16px',
            }}
          >
            {title}
          </h2>
          <div className="space-y-6 text-[16px] mb-6">
            <TinaMarkdown content={content} />
          </div>
          {enableForm && (
            <form
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              <input
                type="text"
                name="name"
                value={formData.name || ""}
                onChange={handleInputChange}
                placeholder="Your name"
                className="w-full p-4 border border-[#1B1B1B] placeholder-[#1B1B1B]"
                required
              />
              <input
                type="email"
                name="email"
                value={formData.email || ""}
                onChange={handleInputChange}
                placeholder="you@example.com"
                className="w-full p-4 border border-[#1B1B1B] placeholder-[#1B1B1B]"
                required
              />
              <input
                type="tel"
                name="phone"
                value={formData.phone || ""}
                onChange={handleInputChange}
                placeholder="Phone number (optional)"
                className="w-full p-4 border border-[#1B1B1B] placeholder-[#1B1B1B]"
              />
              <button
                type="submit"
                className="w-full py-4 px-5 bg-green text-white"
              >
                {buttonText}
              </button>
              {message && <p className="text-sm text-green-500">{message}</p>}
            </form>
          )}
        </div>

        <div className="col-span-12 lg:col-span-6 order-1 lg:order-1">
          <div className="relative w-full aspect-1">
            <Image
              src={imageSrc || ""}
              alt={title ?? ""}
              fill
              className="object-cover object-top"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export const ImageWithTextBlockSchema: Template = {
  name: "ImageWithText",
  label: "Image with Text",
  ui: {
    previewSrc: "/blocks/image-with-text.png",
    defaultItem: {
      imageSrc: "/path/to/default-image.jpg",
      title: "Your Title Here",
      content: "Enter your content here.",
      buttonText: "Sign Up",
      buttonUrl: "/submit",
      formData: {
        name: "",
        email: "",
        phone: "",
      },
    },
  },
  fields: [
    {
      type: "image",
      label: "Image",
      name: "imageSrc",
      required: true,
    },
    {
      type: "string",
      label: "Title",
      name: "title",
    },
    {
      type: "rich-text",
      label: "Content",
      name: "content",
      required: true,
    },
    {
      type: "boolean",
      name: "enableForm",
      label: "Enable Form",
      required: false,
      ui: {
        defaultValue: true,
      },
    },    
    {
      type: "string",
      label: "Button Text",
      name: "buttonText",
      ui: {
        component: "text",
      },
      required: true,
    },
    {
      type: "string",
      label: "Button URL",
      name: "buttonUrl",
      required: false,
    },
    {
      type: "object",
      label: "Form Data",
      name: "formData",
      fields: [
        {
          type: "string",
          label: "Name",
          name: "name",
        },
        {
          type: "string",
          label: "Email",
          name: "email",
        },
        {
          type: "string",
          label: "Phone",
          name: "phone",
        },
      ],
    },
  ],
};

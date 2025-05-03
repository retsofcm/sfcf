"use client";

import { useState } from "react";
import Image from "next/image";
import { Template } from "tinacms";
import { TinaMarkdown, TinaMarkdownContent } from "tinacms/dist/rich-text";

type Props = {
  data: {
    imageSrc: string | null | undefined;
    title: string;
    content: TinaMarkdownContent | TinaMarkdownContent[];
    buttonText: string;
    buttonUrl: string;
  };
};

export const ImageTextSignupBlock = ({ data }: Props) => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setMessage("Please enter a valid email.");
      return;
    }

    setMessage("Thank you for signing up!");
    setEmail("");
  };

  const imageUrl = data.imageSrc ?? "";

  return (
    <div className="w-full max-w-7xl py-20 mx-auto">
      <div className="grid grid-cols-12 gap-4 items-center">
        {/* Text Section (5 cols) */}
        <div className="col-span-12 lg:col-span-4 lg:col-start-8 order-2 lg:order-2">
          <h2 
            className="text-[24px] font-light leading-[1.5] mb-6 underline decoration-green-500 underline-offset-3"
            style={{
              textDecorationColor: '#028103',
              textDecorationThickness: '3px',
              textUnderlineOffset: '16px',
            }}
          >
            {data.title}
          </h2>
          <div className="space-y-6 text-[16px] mb-6">
            {/* Render the rich text content here */}
            <TinaMarkdown content={data.content} />
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex space-x-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full p-4 border border-[#1B1B1B] placeholder-[#1B1B1B] leading-[1]"
                required
              />
              <button
                type="submit"
                className="py-4 px-5 bg-green text-white"
              >
                {data.buttonText}
              </button>
            </div>
            {message && <p className="text-sm text-green-500">{message}</p>}
          </form>
        </div>

        {/* Image Section (6 cols, square aspect ratio) */}
        <div className="col-span-12 lg:col-span-6 order-1 lg:order-1">
          <div className="relative w-full aspect-[3/2]">
            <Image
              src={imageUrl}
              alt={data.title}
              fill
              className="object-cover object-top"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export const ImageTextSignupBlockSchema: Template = {
  name: "imageTextSignup",
  label: "Image and Text with Signup",
  ui: {
    previewSrc: "/blocks/image-text-signup.png",
    defaultItem: {
      imageSrc: "/path/to/default-image.jpg",
      title: "Your Title Here",
      content: "Enter your content here.",
      buttonText: "Sign Up",
      buttonUrl: "/signup",
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
  ],
};

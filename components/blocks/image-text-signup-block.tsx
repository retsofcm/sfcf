"use client";

import { useState } from "react";
import Image from "next/image";
import { TinaField } from "tinacms";
import { TinaMarkdown } from "tinacms/dist/rich-text";

type Props = {
  data: {
    imageSrc: string;
    title: string;
    content: string; // Assuming content is a string that contains the rich text
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

  return (
    <div className="w-full max-w-7xl py-20 mx-auto">
      <div className="grid grid-cols-12 gap-4 items-center">

        {/* Text Section (5 cols) */}
        <div className="col-span-12 lg:col-span-5 order-1 lg:order-1">
          <h2 className="text-3xl font-bold mb-4">{data.title}</h2>
          <div className="text-lg mb-6">
            {/* Render the rich text content here */}
            <TinaMarkdown content={data.content} />
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex space-x-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full p-3 border border-gray-300"
                required
              />
              <button
                type="submit"
                className="py-3 px-6 bg-blue-600 text-white"
              >
                {data.buttonText}
              </button>
            </div>
            {message && <p className="text-sm text-green-500">{message}</p>}
          </form>
        </div>

        {/* Image Section (6 cols, square aspect ratio) */}
        <div className="col-span-12 lg:col-span-6 lg:col-start-7 px-4 order-2 lg:order-2">
          <div className="relative w-full" style={{ paddingTop: "100%" }}>
            <Image
              src={data.imageSrc}
              alt={data.title}
              layout="fill"
              objectFit="cover"
              className="rounded-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export const ImageTextSignupBlockSchema: TinaField = {
  type: "object",
  label: "Image and Text with Signup",
  name: "imageTextSignup",
  fields: [
    {
      type: "image",
      label: "Image",
      name: "imageSrc",
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
    },
    {
      type: "string",
      label: "Button Text",
      name: "buttonText",
      ui: {
        component: "text",
      },
    },
    {
      type: "string",
      label: "Button URL",
      name: "buttonUrl",
    },
  ],
};

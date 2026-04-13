'use client';

import React, { useState } from "react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { Template } from 'tinacms';
import { Plus, Minus } from 'lucide-react';

export type AccordionItem = {
  title?: string | null;
  content?: any;
};

type Props = {
  data: {
    items?: AccordionItem[] | null;
  };
};


export const AccordionBlock = ({ data }: Props) => {
  // State to track which accordion item is open
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Toggle the selected item
  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="container accordion">
      {data.items?.map((item, idx) => (
        item ? (
          <div key={idx} className="accordion-item border-b prose prose-lg prose-p:my-0 mx-auto">
            <h2 className="accordion-header mb-0" id={`heading${idx}`}>
              <button
                className="accordion-button text-xl font-light p-4 w-full text-left focus:outline-none flex items-center justify-between"
                type="button"
                onClick={() => toggleAccordion(idx)}
                aria-expanded={openIndex === idx ? 'true' : 'false'}
                aria-controls={`collapse${idx}`}
              >
                {item.title}
                
                {openIndex === idx ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              </button>
            </h2>
            <div
              id={`collapse${idx}`}
              className={`accordion-collapse overflow-hidden transition-all duration-300 ease-in-out px-4 ${openIndex === idx ? 'max-h-screen pb-4' : 'max-h-0 py-0'}`}
              aria-labelledby={`heading${idx}`}
              role="region"
            >
              <div className="accordion-body">
                <TinaMarkdown content={item.content} />
              </div>
            </div>
          </div>
        ) : null
      ))}
    </section>
  );
};

export const AccordionBlockSchema: Template = {
  name: 'accordionBlock',
  label: 'Accordion Block',
  ui: {
    previewSrc: '/blocks/accordion-preview.png', // optional preview image
  },
  fields: [
    {
      type: 'object',
      name: 'items',
      label: 'Accordion Items',
      list: true,
      fields: [
        {
          type: 'string',
          name: 'title',
          label: 'Title',
        },
        {
          type: 'rich-text',
          name: 'content',
          label: 'Content'
        },
      ],
    },
  ],
};

"use client";


import { Template } from "tinacms";

type TeamMember = {
  name: string;
  role?: string | null;
  image: string;
  description?: string | null;
};

type Props = {
  data: {
    title?: string | null;
    members?: (TeamMember | null)[] | null;
  };
};

export const TeamMembersBlock = ({ data }: Props) => {
  const { title, members } = data;

  return (
    <section className="container mx-auto">
      {title && (
        <h2 
          className="text-[32px] font-light leading-[2] mb-6 underline decoration-green-500 underline-offset-3"
          style={{
            textDecorationColor: '#008000',
            textDecorationThickness: '3px',
            textUnderlineOffset: '16px',
          }}
        >
          {title}
        </h2>
      )}
      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {members!.map((member, index) => (
        <div key={index}>
            <div className="relative w-full h-auto aspect-[1] mx-auto mb-4">
            <img
                src={member!.image}
                alt={member!.name}
                className="w-full h-full object-cover"
            />
            </div>
            <h4 className="mb-1 text-xl font-bold tracking-tight text-black">
            {member!.name}
            </h4>
            <p className="text-sm text-black">{member!.role}</p>
            <p className="text-sm text-black">{member!.description}</p>
        </div>
        ))}
      </div>
    </section>
  );
};

export const TeamMembersBlockSchema: Template = {
  name: "TeamMembers",
  label: "Team Members",
  ui: {
    previewSrc: "/blocks/team-members.png",
  },
  fields: [
    {
      type: "string",
      name: "title",
      label: "Title",
    },
    {
      type: "object",
      name: "members",
      label: "Team Members",
      list: true,
      ui: {
        itemProps: (item) => ({
          label: item?.name,
        }),
      },
      fields: [
        {
          type: "string",
          name: "name",
          label: "Name",
          required: true,
        },
        {
          type: "string",
          name: "role",
          label: "Role",
        },
        {
          type: "string",
          name: "description",
          label: "Description",
        },
        {
          type: "image",
          name: "image",
          label: "Photo",
          required: true,
        },
      ],
    },
  ],
};
  
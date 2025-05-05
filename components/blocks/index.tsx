import { tinaField } from "tinacms/dist/react";
import { Page, PageBlocks } from "../../tina/__generated__/types";
import { EventSummary } from "@/types/EventSummary";
import { Hero } from "./hero";
import { EventCollageBlock } from "./event-collage";
import { StaticImageBlock } from "./StaticImageBlock";
import { ImageWithTextBlock } from "./ImageWithText";
import { IconWithTextBlock } from "./IconWithText";
import { PageTitleBlock } from "./pageTitle"
import { FooterHero } from "./footer-hero";
import { Content } from "./content";

export const Blocks = (props: Omit<Page, "id" | "_sys" | "_values"> & { events: EventSummary[] }) => {
  if (!props.blocks) return null;
  return (
    <>
      {props.blocks.map((block, i) => (
        block ? (
          <div key={i} data-tina-field={tinaField(block)}>
            <Block block={block} events={props.events} />
          </div>
        ) : null
      ))}
    </>
  );
};

const Block = ({ block, events }: { block: PageBlocks; events: EventSummary[] }) => {
  switch (block.__typename) {
    case "PageBlocksHero":
      return <Hero data={block} />;
    case "PageBlocksEventCollage":
      return <EventCollageBlock events={events || []} />;
    case "PageBlocksStaticImageBlock":
      return <StaticImageBlock data={block} />;
    case "PageBlocksImageWithText":
      return <ImageWithTextBlock data={block} />;
    case "PageBlocksIconWithText":
      return <IconWithTextBlock data={block} />;
    case "PageBlocksPageTitle":
      return <PageTitleBlock data={block} />;
    case "PageBlocksFooter_hero":
      return <FooterHero data={block} />;
    case "PageBlocksContent":
      return <Content data={block} />;
    default:
      return null;
  }
};

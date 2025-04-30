import { tinaField } from "tinacms/dist/react";
import { Page, PageBlocks } from "../../tina/__generated__/types";
import { EventSummary } from "@/types/EventSummary";
import { Hero } from "./hero";
import { EventCollageBlock } from "./event-collage";
import { StaticImageBlock } from "./StaticImageBlock";
import { ParallaxImageBlock } from "./ParallaxImageBlock";
import { ImageTextSignupBlock } from "./image-text-signup-block";
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
      const staticImageSrc = block.src ?? '';
      return <StaticImageBlock data={{ src: staticImageSrc }} />;
    case "PageBlocksParallaxImage":
      const parallaxImageSrc = block.src ?? '';
      return <ParallaxImageBlock data={{ src: parallaxImageSrc }} />;
    case "PageBlocksImageTextSignup":
      return (
        <ImageTextSignupBlock
          data={{
            imageSrc: block.imageSrc ?? '', // Use imageSrc from block
            title: block.title ?? '', // Use title from block
            content: block.content ?? '', // Use content from block
            buttonText: block.buttonText ?? '', // Use buttonText from block
            buttonUrl: block.buttonUrl ?? '', // Use buttonUrl from block
          }}
        />
      );
    case "PageBlocksFooter_hero":
      return <FooterHero data={block} />;
    case "PageBlocksContent":
      return <Content data={block} />;
    default:
      return null;
  }
};

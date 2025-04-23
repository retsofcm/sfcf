import { tinaField } from "tinacms/dist/react";
import { Page, PageBlocks } from "../../tina/__generated__/types";
import { Hero } from "./hero";
import { EventCollageBlock, Event } from "./event-collage";
import { StaticImageBlock } from "./StaticImageBlock";
import { ParallaxImageBlock } from "./ParallaxImageBlock";
import { ImageTextSignupBlock } from "./image-text-signup-block";
import { FooterHero } from "./footer-hero";
import { Content } from "./content";
import { Features } from "./features";
import { Testimonial } from "./testimonial";
import { Video } from "./video";
import { Callout } from "./callout";
import { Stats } from "./stats";
import { CallToAction } from "./call-to-action";

export const Blocks = (props: Omit<Page, "id" | "_sys" | "_values"> & { latestEvents?: Event[] }) => {
  if (!props.blocks) return null;
  return (
    <>
      {props.blocks.map(function (block, i) {
        return (
          <div key={i} data-tina-field={tinaField(block)}>
            <Block block={block} latestEvents={props.latestEvents} />
          </div>
        );
      })}
    </>
  );
};

type BlockProps = {
  block: PageBlocks;
  latestEvents?: Event[];
};

const Block = ({ block, latestEvents }: BlockProps) => {
  switch (block.__typename) {
    case "PageBlocksVideo":
      return <Video data={block} />;
    case "PageBlocksHero":
      return <Hero data={block} />;
    case "PageBlocksEventCollage":
      return <EventCollageBlock events={latestEvents ?? []} />;
    case "PageBlocksStaticImage":
      return <StaticImageBlock data={{ src: block.src ?? '' }} />;
    case "PageBlocksParallaxImage":
      return <ParallaxImageBlock data={{ src: block.src ?? '' }} />;
    case "PageBlocksImageTextSignup":
      return (
        <ImageTextSignupBlock
          data={{
            imageSrc: block.imageSrc ?? '',
            title: block.title ?? '',
            content: block.content ?? '',
            buttonText: block.buttonText ?? '',
            buttonUrl: block.buttonUrl ?? '',
          }}
        />
      );
    case "PageBlocksFooter_hero":
      return <FooterHero data={block} />;
    case "PageBlocksCallout":
      return <Callout data={block} />;
    case "PageBlocksStats":
      return <Stats data={block} />;
    case "PageBlocksContent":
      return <Content data={block} />;
    case "PageBlocksFeatures":
      return <Features data={block} />;
    case "PageBlocksTestimonial":
      return <Testimonial data={block} />;
    case "PageBlocksCta":
      return <CallToAction data={block} />;
    default:
      // Optional: Fallback or log for unrecognized block type
      console.warn(`Unrecognized block type: ${block.__typename}`);
      return <div className="error-message">Unrecognized block type: {block.__typename}</div>;
  }
};

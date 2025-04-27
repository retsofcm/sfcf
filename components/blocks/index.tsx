import { tinaField } from "tinacms/dist/react";
import { Page, PageBlocks } from "../../tina/__generated__/types";
import { Hero } from "./hero";
import { StaticImageBlock } from "./StaticImageBlock";
import { ParallaxImageBlock } from "./ParallaxImageBlock";
import { ImageTextSignupBlock } from "./image-text-signup-block";
import { FooterHero } from "./footer-hero";
import { Content } from "./content";

export const Blocks = (props: Omit<Page, "id" | "_sys" | "_values">) => {
  if (!props.blocks) return null;
  return (
    <>
      {props.blocks.map(function (block, i) {
        return (
          <div key={i} data-tina-field={tinaField(block)}>
            <Block {...block} />
          </div>
        );
      })}
    </>
  );
};

const Block = (block: PageBlocks) => {
  switch (block.__typename) {
    case "PageBlocksHero":
      return <Hero data={block} />;
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

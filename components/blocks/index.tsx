import { tinaField } from "tinacms/dist/react";
import type { Page, PageBlocks } from "../../tina/__generated__/types";
import type { EventSummary } from "@/types/EventSummary";
import { Hero } from "./hero";
import { EventCollageBlock } from "./event-collage";
import { StaticImageBlock } from "./static-image-block";
import { ImageWithTextBlock } from "./image-with-text";
import { IconWithTextBlock } from "./icon-with-text";
import { PageTitleBlock } from "./page-title";
import { FooterHero } from "./footer-hero";
import { Content } from "./content";
import { GoogleMapBlock } from "./google-map-block";
import { AccordionBlock, type AccordionItem } from "./accordion";
import { TeamMembersBlock } from "./team-members";
import CalendarBlock from "./calendar";
import { LatestHighlightBlock } from "./latest-highlight";
import type { HighlightSummary } from "@/types/HighlightSummary";

export const Blocks = (props: Omit<Page, "id" | "_sys" | "_values"> & { events: EventSummary[], latestHighlight?: HighlightSummary | null }) => {


  if (!props.blocks) return null;
  return (
    <>
      {props.blocks.map((block, i) => (
        block ? (
          <div key={i} data-tina-field={tinaField(block)}>
            <Block block={block} events={props.events} latestHighlight={props.latestHighlight} />
          </div>
        ) : null

      ))}
    </>
  );
};

const Block = ({ block, events, latestHighlight }: { block: PageBlocks; events: EventSummary[]; latestHighlight?: HighlightSummary | null }) => {

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
    case "PageBlocksGoogleMap":
      return <GoogleMapBlock data={block} />;
    case "PageBlocksTeamMembers":
      return <TeamMembersBlock data={block} />;
    case "PageBlocksAccordionBlock": {
      const validItems = block.items?.filter((item) => item !== null) as AccordionItem[];
      return <AccordionBlock data={{ items: validItems }} />;
    }
    case "PageBlocksCalendarBlock":
      return <CalendarBlock data={{ calendarIds: block.calendarIds ?? undefined }} />;
    case "PageBlocksLatestHighlight":
      return <LatestHighlightBlock data={block} latestHighlight={latestHighlight} />;
    default:


      return null;
  }
};

import { ButtonLink, Icon } from "@/components/actions";
import { ContactBand, PageHero, SectionLabel } from "@/components/visual";
import { qhse } from "@/data/qhse";
import { pageMetadata } from "@/lib/seo";

const intro = "The quality, health, safety, security and environmental practices that guide YMS Engineering’s workshop and site operations.";
export const metadata = pageMetadata("Quality, Health, Safety & Environment", intro, "/qhse", "cnc");

export default function Qhse() {
  return <>
    <PageHero title="Quality, health, safety & environment" label="QHSE" intro={intro} href="/qhse" image="cnc" alt="CNC equipment in the YMS workshop" />
    <section className="section wrap split align-start"><div><SectionLabel>Responsible engineering</SectionLabel><h2>How we manage our work</h2><p className="lead">YMS works to meet client requirements, prevent workplace accidents and continually improve performance through an integrated management approach.</p><ButtonLink href="/quality-policy" variant="dark">Read Our Quality Policy</ButtonLink></div>
    <div className="qhse-list">{qhse.map(({ title, text }) => <article key={title}><Icon name="shield" /><div><h3>{title}</h3><p>{text}</p></div></article>)}</div></section>
    <ContactBand />
  </>;
}

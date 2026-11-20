import { ServiceCards } from "@/components/cards";
import { ContactBand, PageHero, SectionLabel } from "@/components/visual";
import { pageMetadata } from "@/lib/seo";

const intro = "Engineering, fabrication, finishing and erection for structural steel projects across the UAE and GCC.";
export const metadata = pageMetadata("Structural Steel Services", intro, "/services", "factory");

export default function Services() {
  return <><PageHero title="Structural steel services" label="Services" intro={intro} href="/services" image="factory" />
    <section className="section wrap"><div className="section-top"><div><SectionLabel>Our capabilities</SectionLabel><h2>From technical design to site delivery</h2></div></div><ServiceCards /></section><ContactBand />
  </>;
}

import { ButtonLink } from "@/components/actions";
import { Photo } from "@/components/photo";
import { ContactBand, PageHero, SectionLabel } from "@/components/visual";
import { company, principles, process, sectors } from "@/data/company";
import { pageMetadata } from "@/lib/seo";

const intro = "YMS Engineering LLC provides turnkey structural steelwork from Dubai Industrial Park, serving building and infrastructure projects across the UAE and GCC.";
export const metadata = pageMetadata("About YMS Engineering", intro, "/about", "about-cover");

export default function About() {
  return <>
    <PageHero title="Engineering excellence built around steel" label="About" intro={intro} href="/about" image="about-cover" />
    <section className="section wrap split">
      <div><SectionLabel>Who we are</SectionLabel><h2>One team from design to erection</h2>
        <p className="lead">YMS Engineering LLC grew out of Yousuf Machines &amp; Structurals LLC as an expanded structural steel division.</p>
        <p>Our in-house technical team works with clients, consultants and main contractors to coordinate design, fabrication, abrasive blasting, painting, fireproofing and installation.</p>
        <p>Our head office and factory share a site in {company.park}, with steel fabrication workshops, CNC machinery, dedicated finishing booths and space for storage and dispatch.</p>
        <ButtonLink href="/facilities" variant="dark">Explore Our Facilities</ButtonLink>
      </div>
      <figure className="feature-photo"><div><Photo image="facility-office" alt="YMS Engineering office and factory building" sizes="(max-width: 760px) 100vw, 50vw" /></div><figcaption>{company.park}, Dubai</figcaption></figure>
    </section>
    <section className="section dark-section"><div className="wrap"><SectionLabel>What we do</SectionLabel><h2>From design to handover</h2><ol className="process-line">{process.map((stage) => <li key={stage}>{stage}</li>)}</ol></div></section>
    <section className="section wrap split align-start"><div><SectionLabel>Markets</SectionLabel><h2>Industries we serve</h2><p>Our teams work across building and infrastructure sectors, with the scope adapted to each project.</p><ButtonLink href="/projects" variant="dark">Explore Our Projects</ButtonLink></div><ul className="sector-list">{sectors.map((sector) => <li key={sector}>{sector}</li>)}</ul></section>
    <section className="section light-section"><div className="wrap"><SectionLabel>Our approach</SectionLabel><h2>How we work with clients</h2><div className="responsibility-grid">{principles.map(({ title, text }) => <article key={title}><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>
    <ContactBand />
  </>;
}

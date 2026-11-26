import Link from "next/link";
import { ButtonLink } from "@/components/actions";
import { Photo } from "@/components/photo";
import { ContactBand, SectionLabel } from "@/components/visual";
import { ProjectCards, ServiceCards } from "@/components/cards";
import { company } from "@/data/company";
import { signatureProjects } from "@/data/presentation-projects";
import { pageMetadata } from "@/lib/seo";

const heroImage = "projects/al-habtoor-tower/steel-fabrication";
export const metadata = {
  ...pageMetadata("Structural Steel Contractor in Dubai", company.description, "/", heroImage),
  title: "Structural Steel Contractor in Dubai | YMS Engineering",
};

const markets = [
  ["High-rise & residential", "Composite columns, outrigger embedments, stairs and secondary steelwork."],
  ["Infrastructure & utilities", "Steel bridges, gantries, substations and utility structures."],
  ["Commercial & aviation", "Long-span roof steelwork, canopies and specialist fit-out."],
  ["Industrial & PEB", "Hot-rolled structures, workshops and pre-engineered buildings."],
];

export default function Home() {
  return <>
    <section className="hero home-hero">
      <div className="home-hero-copy">
        <SectionLabel>Structural steel engineering</SectionLabel>
        <h1>Engineering complex steel structures. <em>Delivering landmark projects.</em></h1>
        <p>{company.description}</p>
        <div className="button-row">
          <ButtonLink href="/projects" withIcon={false}>Explore Our Projects</ButtonLink>
          <ButtonLink href="#services" variant="outline" withIcon={false}>Our Capabilities</ButtonLink>
        </div>
      </div>
      <figure className="home-hero-visual">
        <Photo image={heroImage} alt="YMS fabricator working on a steel assembly for Al Habtoor Tower" sizes="(max-width: 760px) 100vw, 52vw" preload />
        <figcaption><Link href="/projects/al-habtoor-tower" prefetch={false}><strong>Al Habtoor Tower</strong><span>Steel fabrication at the YMS workshop</span></Link></figcaption>
      </figure>
    </section>

    <section className="section wrap split home-intro" id="about">
      <div><SectionLabel>About YMS Engineering</SectionLabel><h2>Structural steel, from design to installation</h2></div>
      <div>
        <p className="lead">From our Dubai Industrial Park facility, we deliver hot-rolled structural steel and pre-engineered buildings for the UAE and Saudi Arabia.</p>
        <p>Our work spans high-rise towers, bridges, workshops, warehouses and shopping malls, as well as steel stairs, canopies and mild steel fit-out.</p>
        <Link className="text-link" href="/about">About YMS Engineering</Link>
      </div>
    </section>

    <div className="capability-band">
      <dl className="wrap capability-grid home-stats">
        <div><dt>Structural steel experience</dt><dd><strong>30+ <small>years</small></strong></dd></div>
        <div><dt>Fabrication capacity</dt><dd><strong>{company.fabricationCapacity.limit} <small>{company.fabricationCapacity.unit}</small></strong></dd><dd>{company.fabricationCapacity.qualifier}</dd></div>
        <div><dt>{company.facilityArea.label}</dt><dd><strong>{company.facilityArea.value.toLocaleString("en-US")} <small>{company.facilityArea.unit}</small></strong></dd></div>
      </dl>
    </div>

    <section className="section wrap" id="projects">
      <div className="section-top"><h2>Signature projects</h2><Link className="text-link" href="/projects">View all projects</Link></div>
      <ProjectCards entries={signatureProjects} />
      <div className="gallery-entry" id="projectgallery"><Link className="text-link" href="/projects#gallery">Browse the project gallery</Link></div>
    </section>

    <section className="section light-section" id="services"><div className="wrap">
      <div className="section-top"><h2>Engineering to installation</h2><Link className="text-link" href="/services">All services</Link></div>
      <ServiceCards />
    </div></section>

    <section className="facility-feature" id="facilities">
      <div className="facility-feature-photo"><Photo image="facilities/exterior" alt="YMS Engineering factory exterior in Dubai Industrial Park" sizes="(max-width: 760px) 100vw, 55vw" /></div>
      <div className="facility-feature-copy">
        <SectionLabel>Dubai Industrial Park</SectionLabel><h2>Our factory and equipment</h2>
        <p>CNC beam processing, welding and assembly, overhead cranes, dedicated blasting and painting bays, and on-site dispatch.</p>
        <ButtonLink href="/facilities" withIcon={false}>Explore Our Facilities</ButtonLink>
      </div>
    </section>

    <section className="section wrap">
      <div className="section-top"><h2>Sectors we serve</h2></div>
      <div className="responsibility-grid">
        {markets.map(([name, description]) => <article key={name}><h3>{name}</h3><p>{description}</p></article>)}
      </div>
    </section>

    <section className="section light-section"><div className="wrap split align-start">
      <div><h2>Technical expertise</h2><p className="lead">In-house structural analysis and detailing support complex connections, composite members and site installation.</p><Link className="text-link" href="/services/design-engineering">Our engineering methodology</Link></div>
      <ul className="sector-list expertise-list">
        <li>Member and serviceability checks</li><li>Connection design and concrete breakout checks</li><li>STAAD.Pro, IDEA StatiCa and Tekla</li><li>Project-specific inspection and site safety planning. <Link href="/qhse">View QHSE</Link></li>
      </ul>
    </div></section>
    <ContactBand id="contactus" />
  </>;
}

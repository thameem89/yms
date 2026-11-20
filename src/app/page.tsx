import Link from "next/link";
import { getImageProps } from "next/image";
import { CapabilityNumber } from "@/components/capability-number";
import { ButtonLink, Icon } from "@/components/actions";
import { Photo } from "@/components/photo";
import { ContactBand, SectionLabel } from "@/components/visual";
import { ProjectCards, ServiceCards } from "@/components/cards";
import { company } from "@/data/company";
import { projects } from "@/data/projects";
import { mediaPath } from "@/lib/media";
import { pageMetadata } from "@/lib/seo";

const heroImage = "erection";
const heroPhotoProps = {
  alt: "Structural steel framing during erection",
  fill: true,
  sizes: "100vw",
  loading: "eager",
  fetchPriority: "high",
} as const;
const { props: landscapeHero } = getImageProps({ ...heroPhotoProps, src: mediaPath(heroImage), quality: 75 });
const { props: portraitHero } = getImageProps({ ...heroPhotoProps, src: mediaPath("erection-mobile"), quality: 65 });
export const metadata = {
  ...pageMetadata("Structural Steel Contractor in Dubai", company.description, "/", heroImage),
  title: "Structural Steel Contractor in Dubai | YMS Engineering",
};

const responsibilities = [
  ["Quality", "Standardized processes and regular audits support consistency in our work."],
  ["Safety", "Planning, site briefings and safe work procedures help prevent incidents."],
  ["People", "Workplace health monitoring helps identify and address risks early."],
  ["Environment", "We monitor the impact of our operations and set targets for improvement."],
];

export default function Home() {
  return <>
    <section className="hero">
      <picture className="hero-picture">
        <source media="(max-width: 620px)" srcSet={portraitHero.srcSet} sizes={portraitHero.sizes} />
        <img {...landscapeHero} alt={heroPhotoProps.alt} />
      </picture>
      <div className="wrap hero-inner">
        <div className="hero-copy">
          <SectionLabel>Structural steel engineering · UAE &amp; GCC</SectionLabel>
          <h1>Engineering steel.<br /><em>Building possibilities.</em></h1>
          <p>From design and fabrication to on-site erection, with in-house blasting, protective coating and fireproofing.</p>
          <div className="button-row"><ButtonLink href="/projects">Explore Our Projects</ButtonLink><ButtonLink href="/contact" variant="outline">Contact YMS</ButtonLink></div>
        </div>
        <div className="hero-foot"><Link href="#about"><Icon name="down" size={18} /> Discover YMS</Link><span><Icon name="pin" size={16} /> Based in Dubai Industrial Park</span></div>
      </div>
    </section>

    <div className="capability-band">
      <div className="wrap capability-grid">
        <div><strong><CapabilityNumber value={company.facilityArea.value} /> <small>{company.facilityArea.unit}</small></strong><span>{company.facilityArea.label}</span></div>
        <div><strong>In-house</strong><span>Engineering, fabrication &amp; finishing</span></div>
        <div><strong>{company.region}</strong><span>Project delivery across the region</span></div>
      </div>
    </div>

    <section className="section wrap split" id="about">
      <div>
        <SectionLabel>About YMS Engineering</SectionLabel>
        <h2>From drawing board<br className="desktop-break" /> to standing steel.</h2>
        <p className="lead">YMS Engineering is a structural steel contractor based in Dubai Industrial Park. Our teams take on the full scope of steelwork, from design and detailing through fabrication, finishing and site installation.</p>
        <p>We serve industrial, commercial, residential, oil and gas, utilities and infrastructure projects across the UAE and GCC.</p>
        <ButtonLink href="/about" variant="dark">Discover YMS Engineering</ButtonLink>
      </div>
      <figure className="feature-photo"><div><Photo image="factory" alt="Fabrication workshop at YMS Engineering" sizes="(max-width: 760px) 100vw, 50vw" /></div><figcaption>Steel fabrication at YMS Engineering</figcaption></figure>
    </section>

    <section className="section light-section" id="services"><div className="wrap">
      <div className="section-top"><div><SectionLabel>Our capabilities</SectionLabel><h2>Structural steel services</h2></div><Link className="text-link" href="/services">All services <Icon name="arrow" size={19} /></Link></div>
      <ServiceCards />
    </div></section>

    <section className="facility-feature" id="facilities">
      <div className="facility-feature-photo"><Photo image="factory" alt="The YMS Engineering factory in Dubai Industrial Park" sizes="(max-width: 760px) 100vw, 60vw" /></div>
      <div className="facility-feature-copy"><SectionLabel>Our facilities</SectionLabel><h2>Built for structural steel fabrication.</h2><p>CNC machinery, fabrication workshops, dedicated finishing booths and material handling come together at our Dubai Industrial Park site.</p><ButtonLink href="/facilities">Explore Our Facilities</ButtonLink></div>
    </section>

    <section className="section wrap" id="projects">
      <div className="section-top"><div><SectionLabel>Our portfolio</SectionLabel><h2>Selected projects</h2></div><Link className="text-link" href="/projects">View all projects <Icon name="arrow" size={19} /></Link></div>
      <ProjectCards entries={projects.slice(0, 6)} />
      <div className="gallery-entry" id="projectgallery"><Link className="text-link" href="/projects#gallery">Browse the project gallery <Icon name="arrow" size={19} /></Link></div>
    </section>

    <section className="section light-section responsibility"><div className="wrap">
      <div className="section-top"><div><SectionLabel>QHSE</SectionLabel><h2>Responsible engineering</h2></div><Link className="text-link" href="/qhse">Our QHSE approach <Icon name="arrow" size={19} /></Link></div>
      <div className="responsibility-grid">{responsibilities.map(([name, copy]) => <article key={name}><h3>{name}</h3><p>{copy}</p></article>)}</div>
    </div></section>
    <ContactBand id="contactus" />
  </>;
}

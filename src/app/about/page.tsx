import { ButtonLink } from "@/components/actions";
import { Photo } from "@/components/photo";
import { ContactBand, PageHero, SectionLabel } from "@/components/visual";
import { company, principles, process, sectors } from "@/data/company";
import { pageMetadata } from "@/lib/seo";

const intro = "More than 30 years of structural steel experience, with a factory and in-house design team in Dubai Industrial Park.";
export const metadata = pageMetadata("About YMS Engineering", intro, "/about", "facilities/workshop");

export default function About() {
  return <>
    <PageHero title="Structural steel engineering and fabrication" label="About" intro={intro} href="/about" image="facilities/workshop" alt="YMS fabrication workshop with overhead cranes" />
    <section className="section wrap split">
      <div><SectionLabel>Who we are</SectionLabel><h2>One team from design to erection</h2>
        <p className="lead">YMS Engineering LLC grew out of Yousuf Machines &amp; Structurals LLC as an expanded structural steel division.</p>
        <p>We work on hot-rolled structural steel and pre-engineered buildings across the UAE and Saudi Arabia. Our projects span high-rise, residential, commercial, infrastructure and industrial work.</p>
        <p>Our in-house technical team works with clients, consultants and main contractors to coordinate design, fabrication, abrasive blasting, painting, fireproofing and installation.</p>
        <p>Our head office and factory share a site in {company.park}, with steel fabrication workshops, CNC machinery, dedicated finishing booths and space for storage and dispatch.</p>
        <ButtonLink href="/facilities" variant="dark">Explore Our Facilities</ButtonLink>
      </div>
      <figure className="feature-photo"><div><Photo image="facilities/exterior" alt="YMS Engineering office and factory building" sizes="(max-width: 760px) 100vw, 50vw" /></div><figcaption>{company.park}, Dubai</figcaption></figure>
    </section>
    <section className="section dark-section"><div className="wrap"><SectionLabel>What we do</SectionLabel><h2>From design to handover</h2><ol className="process-line">{process.map((stage) => <li key={stage}>{stage}</li>)}</ol></div></section>
    <section className="section wrap split align-start"><div><SectionLabel>Markets</SectionLabel><h2>Industries we serve</h2><p>Our teams work across building and infrastructure sectors, with the scope adapted to each project.</p><ButtonLink href="/projects" variant="dark">Explore Our Projects</ButtonLink></div><ul className="sector-list">{sectors.map((sector) => <li key={sector}>{sector}</li>)}</ul></section>
    <section className="section light-section" id="organization"><div className="wrap">
      <div className="section-top"><h2>Organization structure</h2></div>
      <ol className="organization-chart">
        <li><span className="org-leader">Managing Director</span>
          <ol><li><span className="org-leader">General Manager / Executive Director</span>
            <ul className="org-branches">
              <li><h3>Assistant General Manager</h3><ul>
                <li>Design Engineering and Tekla Detailing</li>
                <li>Business Development, Estimation and Quantity Surveying</li>
                <li>Accounts, HR, Administration and Stores</li>
                <li>IT and Digital Marketing</li>
              </ul></li>
              <li><h3>Quality and site safety</h3><ul>
                <li>QA/QC Engineering and Inspection</li>
                <li>Health, Safety and Environment (HSE)</li>
              </ul></li>
              <li><h3>Operations Manager</h3><ul>
                <li>Project Management and Project Engineering, including site and erection teams</li>
                <li>Procurement Engineering</li>
                <li>Production Engineering, Production Supervision and shop floor teams</li>
                <li>Painting and Blasting Supervision</li>
              </ul></li>
            </ul>
          </li></ol>
        </li>
      </ol>
    </div></section>
    <section className="section"><div className="wrap"><SectionLabel>Our approach</SectionLabel><h2>How we work with clients</h2><div className="responsibility-grid">{principles.map(({ title, text }) => <article key={title}><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>
    <ContactBand />
  </>;
}

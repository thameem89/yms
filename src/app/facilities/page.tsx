import { ButtonLink } from "@/components/actions";
import { Photo } from "@/components/photo";
import { ContactBand, PageHero, SectionLabel } from "@/components/visual";
import { company } from "@/data/company";
import { facilities } from "@/data/facilities";
import { pageMetadata } from "@/lib/seo";

const intro = "Steel fabrication, CNC beam processing and protective finishing at our Dubai Industrial Park facility.";
const image = "facilities/exterior";
export const metadata = pageMetadata("Fabrication Facilities in Dubai", intro, "/facilities", image);

export default function Facilities() {
  return <>
    <PageHero title="Built for precision. Equipped for scale." label="Facilities" intro={intro} href="/facilities" image={image} alt="Exterior of the YMS Engineering factory in Dubai Industrial Park" />
    <section className="section wrap">
      <div className="site-facts">
        <div><SectionLabel>Dubai Industrial Park</SectionLabel><h2>Engineering and production on one site</h2><ButtonLink href="/facilities/machinery-equipment" variant="dark" withIcon={false}>Machinery &amp; Equipment</ButtonLink></div>
        <div><strong>{company.fabricationCapacity.limit} <small>{company.fabricationCapacity.unit}</small></strong><p>Fabrication capacity. {company.fabricationCapacity.qualifier}</p><p>{company.facilityArea.value.toLocaleString("en-US")} sq ft site · DM Plot {company.plot}</p></div>
      </div>
      <div className="facility-list">{facilities.map(({ title, image, alt, text }) => <article className="split facility-item" key={title}>
        <div className="detail-photo"><Photo image={image} alt={alt} sizes="(max-width: 760px) 100vw, 50vw" /></div><div><h3>{title}</h3><p>{text}</p></div>
      </article>)}</div>
    </section>
    <ContactBand />
  </>;
}

import { ButtonLink } from "@/components/actions";
import { Photo } from "@/components/photo";
import { ContactBand, PageHero, SectionLabel } from "@/components/visual";
import { company } from "@/data/company";
import { facilities } from "@/data/facilities";
import { pageMetadata } from "@/lib/seo";

const intro = "Explore the workshops, CNC equipment and finishing facilities that support YMS Engineering’s steel operations in Dubai Industrial Park.";
export const metadata = pageMetadata("Fabrication Facilities in Dubai", intro, "/facilities", "factory");

export default function Facilities() {
  return <>
    <PageHero title="Fabrication facilities" label="Facilities" intro={intro} href="/facilities" image="factory" alt="Inside the YMS Engineering fabrication facility" />
    <section className="section wrap">
      <div className="site-facts"><div><SectionLabel>Dubai Industrial Park</SectionLabel><h2>Engineering and production on one site</h2></div><div><strong>{company.facilityArea.value.toLocaleString("en")} <small>{company.facilityArea.unit}</small></strong><p>DM Plot {company.plot} · {company.district}</p></div></div>
      <div className="facility-list">{facilities.map(({ title, image, alt, text }) => <article className="split facility-item" key={title}>
        <div className="detail-photo"><Photo image={image} alt={alt} sizes="(max-width: 760px) 100vw, 50vw" /></div><div><h3>{title}</h3><p>{text}</p>{image === "yard" && <p className="caption">Site layout from the YMS facilities portfolio</p>}</div>
      </article>)}</div>
      <ButtonLink href="/contact" variant="dark">Get in Touch</ButtonLink>
    </section><ContactBand />
  </>;
}

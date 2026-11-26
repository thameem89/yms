import { Gallery } from "@/components/gallery";
import { ContactBand, PageHero } from "@/components/visual";
import { machinery } from "@/data/facilities";
import { pageMetadata } from "@/lib/seo";

const href = "/facilities/machinery-equipment";
const image = "facilities/beam-line";
const intro = "Equipment used for steel processing, welding, finishing and material handling at the YMS Engineering factory.";
export const metadata = pageMetadata("Machinery & Equipment", intro, href, image);

export default function MachineryEquipment() {
  return <>
    <PageHero title="Machinery & Equipment" label="Machinery & Equipment" intro={intro} href={href} parent={{ name: "Facilities", href: "/facilities" }} image={image} alt="Kaltenbach KDX 2015 beam line in the YMS workshop" />
    <div className="wrap section equipment-directory">
      {machinery.map(({ title, items, photos }) => <section className="equipment-group" key={title}>
        <h2>{title}</h2>
        <ul className="equipment-list">{items.map((item) => <li key={item}>{item}</li>)}</ul>
        <Gallery entries={photos} />
      </section>)}
    </div>
    <ContactBand />
  </>;
}

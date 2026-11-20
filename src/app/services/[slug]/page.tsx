import { notFound } from "next/navigation";
import { ServiceCards } from "@/components/cards";
import { ButtonLink, Icon } from "@/components/actions";
import { ContactBand, JsonLd, PageHero, SectionLabel } from "@/components/visual";
import { services } from "@/data/services";
import { absolute, pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;

export function generateStaticParams() {
  return services.map(({ slug }) => ({ slug }));
}

async function getService(params: Props["params"]) {
  const { slug } = await params;
  const service = services.find((entry) => entry.slug === slug);
  if (!service) notFound();
  return service;
}

export async function generateMetadata({ params }: Props) {
  const service = await getService(params);
  return pageMetadata(service.name, service.intro, "/services/" + service.slug, service.image);
}

export default async function Service({ params }: Props) {
  const service = await getService(params);
  const href = "/services/" + service.slug;
  return <>
    <PageHero title={service.name} label={service.name} intro={service.intro} href={href} parent={{ name: "Services", href: "/services" }} image={service.image} alt={service.alt} />
    <section className="section wrap split align-start">
      <div><SectionLabel>{service.category}</SectionLabel><h2>What we deliver</h2><p className="lead">{service.detail}</p><ButtonLink href="/contact" variant="dark">Enquire About This Service</ButtonLink></div>
      <ul className="check-list" aria-label="Service capabilities">{service.capabilities.map((item) => <li key={item}><Icon name="check" />{item}</li>)}</ul>
    </section>
    <section className="section light-section"><div className="wrap"><div className="section-top"><h2>Related services</h2></div><ServiceCards entries={services.filter((item) => item.slug !== service.slug).sort((a, b) => Number(b.category === service.category) - Number(a.category === service.category)).slice(0, 3)} /></div></section>
    <ContactBand />
    <JsonLd data={{ "@context": "https://schema.org", "@type": "Service", name: service.name, description: service.intro, url: absolute(href), provider: { "@id": absolute("/#organization") }, areaServed: "UAE and GCC" }} />
  </>;
}

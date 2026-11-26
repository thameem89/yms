import type { MediaKey } from "@/lib/media";
import Link from "next/link";
import manifest from "@/data/media.json";
import { ButtonLink } from "@/components/actions";
import { Photo } from "@/components/photo";
import { breadcrumbs } from "@/lib/seo";

export function JsonLd({ data }: { data: unknown }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

export function PageHero({ title, label, intro, href, parent, image, alt = "", photoCaption }: {
  title: string; label: string; intro?: string; href: string;
  parent?: { name: string; href: string }; image?: MediaKey; alt?: string; photoCaption?: string;
}) {
  const items = [...(parent ? [parent] : []), { name: label, href }];
  const portrait = image && photoCaption && manifest[image].width < manifest[image].height;
  return <section className={`page-hero${image ? " with-photo" : ""}${portrait ? " portrait-hero" : ""}`}>
    {image && <div className="page-hero-visual"><Photo image={image} alt={alt} sizes={portrait ? "(max-width: 620px) 82vw, 41vw" : "100vw"} preload /></div>}
    <div className="wrap page-hero-inner">
      <nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span>{parent && <><Link href={parent.href}>{parent.name}</Link><span aria-hidden="true">/</span></>}<span aria-current="page">{label}</span></nav>
      <h1>{title}</h1>{intro && <p>{intro}</p>}
      {photoCaption && <p className="hero-photo-credit">{photoCaption}</p>}
    </div>
    <JsonLd data={breadcrumbs(items)} />
  </section>;
}

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="eyebrow"><span aria-hidden="true" />{children}</p>;
}

export function ContactBand({ title = "Let’s discuss your steel project.", text = "Speak with YMS about your scope, specifications and programme.", id, href = "/contact", action = "Contact YMS" }: { title?: string; text?: string; id?: string; href?: string; action?: string }) {
  return <section className="contact-band" id={id}><div className="wrap contact-band-inner">
    <div><SectionLabel>Get in touch</SectionLabel><h2>{title}</h2><p>{text}</p></div>
    <ButtonLink href={href}>{action}</ButtonLink>
  </div></section>;
}

import Image from "next/image";
import Link from "next/link";
import { company, directionsUrl } from "@/data/company";
import { legal, navigation } from "@/data/navigation";
import { services } from "@/data/services";
import { Icon } from "@/components/actions";

export function Footer() {
  return <footer className="site-footer">
    <div className="wrap footer-grid">
      <div>
        <Link className="footer-brand" href="/" aria-label="YMS Engineering home"><Image src="/brand/yms-logo.svg" width={123} height={137} alt="YMS Engineering" /></Link>
        <p>Structural steel engineering, fabrication and erection across the UAE and GCC.</p>
      </div>
      <nav aria-label="Footer navigation"><h2>Explore</h2>{navigation.slice(1).map(({ href, label }) => <Link key={href} href={href}>{label}</Link>)}</nav>
      <nav aria-label="Footer services"><h2>Capabilities</h2>{services.map(({ slug, name }) => <Link key={slug} href={"/services/" + slug}>{name}</Link>)}</nav>
      <address><h2>{company.name}</h2><p>{company.park}<br />{company.city}, {company.country}<br />P.O. Box {company.poBox}</p>
        <a href={"tel:" + company.tel}>{company.phone}</a><a href={"mailto:" + company.email}>{company.email}</a>
        <a href={directionsUrl} className="footer-directions">Get directions <Icon name="external" size={15} /></a>
      </address>
    </div>
    <div className="wrap footer-bottom"><span>© {new Date().getUTCFullYear()} {company.name}. All rights reserved.</span><nav aria-label="Legal">{legal.map(({ href, label }) => <Link key={href} href={href}>{label}</Link>)}</nav></div>
  </footer>;
}

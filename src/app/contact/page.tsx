import { ContactMap } from "@/components/contact-map";
import { EnquiryForm } from "@/components/enquiry-form";
import { Icon } from "@/components/actions";
import { PageHero, SectionLabel } from "@/components/visual";
import { company } from "@/data/company";
import { pageMetadata } from "@/lib/seo";

const intro = "Contact our Dubai Industrial Park office to discuss structural steel engineering, fabrication, erection and finishing.";
export const metadata = pageMetadata("Contact YMS Engineering", intro, "/contact", "facility-office");

export default function Contact() {
  return <>
    <PageHero title="Contact YMS Engineering" label="Contact" intro={intro} href="/contact" />
    <section className="section wrap contact-layout">
      <div><SectionLabel>Dubai head office</SectionLabel><h2>Reach our team</h2>
        <address className="contact-address">
          <div><Icon name="pin" /><div><strong>{company.name}</strong><br />P.O. Box {company.poBox}<br />DM Plot {company.plot}, {company.district}<br />{company.park}<br />{company.city}, {company.country}</div></div>
          <div><Icon name="phone" /><div><a href={"tel:" + company.tel}>{company.phone}</a><br />Fax {company.fax}</div></div>
          <div><Icon name="mail" /><a href={"mailto:" + company.email}>{company.email}</a></div>
        </address>
        <ContactMap />
      </div>
      <div className="form-panel"><SectionLabel>Project enquiries</SectionLabel><h2>Send us an enquiry</h2><p>Fields marked * are required.</p><EnquiryForm /><noscript><p>To send an enquiry, email <a href={"mailto:" + company.email}>{company.email}</a>.</p></noscript></div>
    </section>
  </>;
}

import { ButtonLink } from "@/components/actions";
import { PageHero, SectionLabel } from "@/components/visual";
import { pageMetadata } from "@/lib/seo";

const intro = "Explore careers in structural steel engineering, fabrication and construction with YMS Engineering in Dubai.";
export const metadata = pageMetadata("Careers in Structural Steel", intro, "/career", "factory");

export default function Career() {
  return <>
    <PageHero title="Careers at YMS Engineering" label="Careers" intro={intro} href="/career" image="factory" alt="Inside the YMS Engineering fabrication facility" />
    <section className="section wrap split align-start" id="vacancies">
      <div><SectionLabel>Working at YMS</SectionLabel><h2>Develop your skills in structural steel</h2><p className="lead">Our engineering, workshop and site teams work across disciplines to solve project challenges, share knowledge and support safe working practices.</p></div>
      <div><h3>Vacancy enquiries</h3><p>Contact our Dubai office for information about current opportunities.</p><ButtonLink href="/contact" variant="dark">Contact YMS</ButtonLink></div>
    </section>
  </>;
}

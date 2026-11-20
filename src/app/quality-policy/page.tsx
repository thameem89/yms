import { PageHero } from "@/components/visual";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("Quality Policy", "Read the YMS Engineering LLC quality statement and commitment to continual improvement.", "/quality-policy");

export default function QualityPolicy() {
  return <><PageHero title="Quality policy" label="Quality Policy" href="/quality-policy" /><section className="section wrap legal-content">
    <h2>Quality statement</h2>
    <p>YMS is committed to providing safe, reliable and effective solutions that meet customer and regulatory requirements. We support this commitment through continuous improvement of our Quality Management System, employee empowerment, a learning culture and open communication with stakeholders.</p>
  </section></>;
}

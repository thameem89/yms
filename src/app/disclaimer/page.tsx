import { PageHero } from "@/components/visual";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("Disclaimer", "Important information about use of the YMS Engineering LLC website.", "/disclaimer");

export default function Disclaimer() {
  return <><PageHero title="Disclaimer" label="Disclaimer" href="/disclaimer" /><section className="section wrap legal-content">
    <h2>Website information</h2><p>YMS Engineering LLC provides this site on an as-is and as-available basis. Site information may contain errors and may be updated or removed. Contact YMS to confirm current information or requirements for a specific project.</p>
    <h2>Availability and liability</h2><p>YMS makes no warranty about the accuracy, completeness or uninterrupted availability of the site. To the extent permitted by applicable law, YMS disclaims liability for incidental, consequential, special or exemplary loss arising from use of, or inability to use, this website.</p>
  </section></>;
}

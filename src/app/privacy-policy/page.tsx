import { PageHero } from "@/components/visual";
import { company } from "@/data/company";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("Privacy Policy", "How YMS Engineering handles information submitted through this website and how to contact the company about privacy.", "/privacy-policy");

export default function PrivacyPolicy() {
  return <><PageHero title="Privacy policy" label="Privacy Policy" href="/privacy-policy" /><section className="section wrap legal-content">
    <h2>Information you provide</h2><p>When you submit an enquiry, YMS Engineering LLC receives the contact information and message you supply. We use this information to respond and follow up on your request.</p>
    <h2>Website operation</h2><p>Website infrastructure may process information such as IP addresses, browser details and request times to operate and protect the site. An email service processes enquiry details to deliver them to YMS.</p>
    <h2>Maps</h2><p>The contact page loads Google Maps when you choose to display the map. Directions links also open Google Maps. Google processes information on those services under its own privacy terms.</p>
    <h2>Contact</h2><p>For questions about information submitted through this site, email <a href={"mailto:" + company.email}>{company.email}</a> or call <a href={"tel:" + company.tel}>{company.phone}</a>.</p>
  </section></>;
}

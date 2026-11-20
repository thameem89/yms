import { ButtonLink } from "@/components/actions";
import { SectionLabel } from "@/components/visual";

export default function NotFound() {
  return <section className="section dark-section"><div className="wrap"><SectionLabel>404</SectionLabel><h1>Page unavailable</h1><p>The page may have moved. You can explore YMS projects or return to the homepage.</p><div className="button-row"><ButtonLink href="/">Return Home</ButtonLink><ButtonLink href="/projects" variant="outline">Explore Our Projects</ButtonLink></div></div></section>;
}

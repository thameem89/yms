import { Gallery } from "@/components/gallery";
import { ProjectBrowser } from "@/components/project-browser";
import { ContactBand, PageHero, SectionLabel } from "@/components/visual";
import { projectGallery, projects } from "@/data/projects";
import { pageMetadata } from "@/lib/seo";

const intro = "Explore YMS Engineering’s structural steel, metalwork and fireproofing projects across aviation, commercial, residential and infrastructure sectors.";
export const metadata = pageMetadata("Structural Steel Projects", intro, "/projects", "gallery-bg");

export default function Projects() {
  return <>
    <PageHero title="Structural steel projects" label="Projects" intro={intro} href="/projects" image="gallery-bg" />
    <section className="section wrap"><SectionLabel>Project portfolio</SectionLabel><h2>Explore our work</h2><ProjectBrowser projects={projects} /></section>
    <section className="section light-section" id="gallery"><div className="wrap"><div className="section-top"><h2>Project gallery</h2></div><Gallery entries={projectGallery} /></div></section>
    <ContactBand />
  </>;
}

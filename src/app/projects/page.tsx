import { Gallery } from "@/components/gallery";
import { ProjectBrowser } from "@/components/project-browser";
import { ContactBand, PageHero, SectionLabel } from "@/components/visual";
import { projectGallery, projects } from "@/data/projects";
import { pageMetadata } from "@/lib/seo";

const intro = "High-rise steel packages, bridge works, industrial buildings and specialist metalwork. Explore YMS Engineering’s scope on each project.";
const leadPhoto = "projects/city-walk-bridge-gantry/night-installation";
export const metadata = pageMetadata("Structural Steel Projects", intro, "/projects", leadPhoto);

export default function Projects() {
  return <>
    <PageHero title="Structural steel projects" label="Projects" intro={intro} href="/projects" image={leadPhoto} alt="Steel bridge gantry being installed at City Walk at night" photoCaption="City Walk Bridge Gantry during nighttime installation" />
    <section className="section wrap"><SectionLabel>Project portfolio</SectionLabel><h2>Explore our work</h2><ProjectBrowser projects={projects.map(({ slug, name, category, location, image, imageAlt, scope }) => ({ slug, name, category, location, image, imageAlt, scope }))} /></section>
    <section className="section light-section" id="gallery"><div className="wrap"><div className="section-top"><h2>Project gallery</h2></div><Gallery entries={projectGallery} /></div></section>
    <ContactBand />
  </>;
}

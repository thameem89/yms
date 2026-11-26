import { notFound } from "next/navigation";
import { ProjectCards } from "@/components/cards";
import { Gallery } from "@/components/gallery";
import { ContactBand, PageHero } from "@/components/visual";
import { additionalProjectPhotos, projects, type ProjectPhoto } from "@/data/projects";
import { enquiryLink } from "@/lib/enquiries";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

async function getProject(params: Props["params"]) {
  const { slug } = await params;
  const project = projects.find((entry) => entry.slug === slug);
  if (!project) notFound();
  return project;
}

export async function generateMetadata({ params }: Props) {
  const project = await getProject(params);
  return pageMetadata(
    project.name,
    project.overview ?? (project.scope ? "YMS Engineering’s work on " + project.name + " includes " + project.scope : "View " + project.name + " in the YMS Engineering project gallery."),
    "/projects/" + project.slug,
    project.hero?.image ?? project.image,
  );
}

const galleryCategories = ["Project Overview", "Fabrication", "Installation / Site Works"] as const;

export default async function ProjectDetail({ params }: Props) {
  const project = await getProject(params);
  const href = "/projects/" + project.slug;
  const fields = [
    ["Location", project.location], ["Sector", project.category],
    ["Project Client", project.client], ["Owner / Employer", project.owner], ["Consultant", project.consultant],
    [project.owner ? "Contractor" : "Main Contractor", project.contractor],
    ...Object.entries(project.facts ?? {}),
  ];
  const related = projects
    .filter((entry) => entry.slug !== project.slug)
    .sort((a, b) => Number(b.category === project.category) - Number(a.category === project.category))
    .slice(0, 3);
  const photos: ProjectPhoto[] = project.photos ?? [
    ...(project.image ? [{ image: project.image, caption: project.name }] : []),
    ...(additionalProjectPhotos[project.slug] ?? []),
  ];
  const groups = galleryCategories
    .map((category) => ({ category, entries: photos.filter((photo) => photo.category === category) }))
    .filter(({ entries }) => entries.length > 0);

  const hasFabrication = groups.some(({ category }) => category === "Fabrication");
  const hasInstallation = groups.some(({ category }) => category === "Installation / Site Works");
  const galleryTitle = hasFabrication && hasInstallation ? "Fabrication & installation gallery" : "Project gallery";

  return <>
    <PageHero title={project.name} label={project.name} intro={project.location} href={href} parent={{ name: "Projects", href: "/projects" }}
      image={project.hero?.image ?? project.image} alt={project.hero?.caption ?? project.name} photoCaption={project.hero?.caption} />
    <section className="section wrap split align-start">
      <div className="project-overview">
        <h2>Project overview</h2>
        <p className="lead">{project.overview ?? project.scope ?? project.category}</p>
        {project.scopeItems && <div className="project-scope">
          <h3>YMS Engineering scope</h3>
          <ul>{project.scopeItems.map((item) => <li key={item}>{item}</li>)}</ul>
        </div>}
      </div>
      <aside aria-labelledby="project-information">
        <h3 id="project-information">Project information</h3>
        <dl className="project-facts">{fields.filter(([, value]) => value).map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
      </aside>
    </section>
    {photos.length > 0 && <section className="section light-section"><div className="wrap">
      <div className="section-top"><h2>{galleryTitle}</h2></div>
      {groups.length > 1 ? groups.map(({ category, entries }) => <div key={category} className="project-gallery-group">
        <h3>{category}</h3><Gallery entries={entries} />
      </div>) : <div className="project-gallery-group">
        {photos.length > 1 && groups[0] && <h3>{groups[0].category}</h3>}
        <Gallery entries={photos} />
      </div>}
    </div></section>}
    <section className="section wrap"><div className="section-top"><h2>Related projects</h2></div><ProjectCards entries={related} /></section>
    <ContactBand title="Discuss your steel project." href={enquiryLink("Project Enquiry")} action="Project Enquiry" />
  </>;
}

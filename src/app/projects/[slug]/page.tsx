import { notFound } from "next/navigation";
import { ProjectCards } from "@/components/cards";
import { Gallery } from "@/components/gallery";
import { ContactBand, PageHero, SectionLabel } from "@/components/visual";
import { additionalProjectPhotos, projects } from "@/data/projects";
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
  return pageMetadata(project.name, project.scope ? project.name + " — YMS Engineering project scope: " + project.scope : "View " + project.name + " in the YMS Engineering project gallery.", "/projects/" + project.slug, project.image);
}

export default async function ProjectDetail({ params }: Props) {
  const project = await getProject(params);
  const href = "/projects/" + project.slug;
  const fields = [["Location", project.location], ["Sector", project.category], ["Owner / Employer", project.owner], ["Contractor", project.contractor], ["Consultant", project.consultant]];
  const related = projects.filter((entry) => entry.slug !== project.slug).sort((a, b) => Number(b.category === project.category) - Number(a.category === project.category)).slice(0, 3);
  const photos = [...(project.image ? [{ image: project.image, caption: project.name }] : []), ...(additionalProjectPhotos[project.slug] ?? [])];

  return <>
    <PageHero title={project.name} label={project.name} intro={project.location} href={href} parent={{ name: "Projects", href: "/projects" }} image={project.image} alt={project.name} />
    <section className="section wrap split align-start">
      <div><SectionLabel>Project overview</SectionLabel>{project.scope && <><h2>Scope of work</h2><p className="lead">{project.scope}</p></>}{!project.scope && <h2>{project.category}</h2>}</div>
      <dl className="project-facts">{fields.filter(([, value]) => value).map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
    </section>
    {photos.length > 0 && <section className="section light-section"><div className="wrap"><div className="section-top"><h2>Project gallery</h2></div><Gallery entries={photos} /></div></section>}
    <section className="section wrap"><div className="section-top"><h2>Related projects</h2></div><ProjectCards entries={related} /></section>
    <ContactBand title="Discuss your steel project." href={enquiryLink("Project Enquiry")} />
  </>;
}

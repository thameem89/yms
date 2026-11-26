import Link from "next/link";
import { services } from "@/data/services";
import type { Project } from "@/data/projects";
import { Icon } from "@/components/actions";
import { Photo } from "@/components/photo";

export function ServiceCards({ entries = services }: { entries?: readonly (typeof services)[number][] }) {
  return <div className="service-grid">{entries.map(({ slug, name, image, alt, intro, category }) =>
    <article className="service-card" key={slug}>
      <Link href={"/services/" + slug} prefetch={false}>
        <div className="service-photo"><Photo image={image} alt={alt} sizes="(max-width: 620px) 100vw, (max-width: 960px) 50vw, 33vw" /></div>
        <div className="service-card-body"><div><p className="tag">{category}</p><h3>{name}</h3><p>{intro}</p></div><span className="card-arrow"><Icon name="external" /></span></div>
      </Link>
    </article>
  )}</div>;
}

export type ProjectCardEntry = Pick<Project, "slug" | "name" | "category" | "location" | "image" | "imageAlt" | "scope">;

export function ProjectCards({ entries }: { entries: ProjectCardEntry[] }) {
  return <div className="project-grid">{entries.map((project) => <article className="project-card" key={project.slug}>
    <Link href={"/projects/" + project.slug} prefetch={false}>
      <div className="project-photo">{project.image ? <Photo image={project.image} alt={project.imageAlt ?? project.name} sizes="(max-width: 620px) 100vw, (max-width: 960px) 50vw, 33vw" /> : <div className="neutral-photo" aria-hidden="true" />}</div>
      <div className="project-card-body"><p className="tag">{project.category}{project.location && " / " + project.location}</p><h3>{project.name}</h3>{project.scope && <p>{project.scope}</p>}<span className="project-link-label">View Project<span className="sr-only">: {project.name}</span></span></div>
    </Link>
  </article>)}</div>;
}

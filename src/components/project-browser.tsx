"use client";

import { useState } from "react";
import { ProjectCards } from "@/components/cards";
import type { Project } from "@/data/projects";

export function ProjectBrowser({ projects }: { projects: Project[] }) {
  const [category, setCategory] = useState("");
  const categories = [...new Set(projects.map((project) => project.category))].sort();
  const entries = category ? projects.filter((project) => project.category === category) : projects;
  return <>
    <div className="filter-bar" aria-label="Filter projects by sector">
      <button type="button" aria-pressed={category === ""} onClick={() => setCategory("")}>All projects</button>
      {categories.map((item) => <button type="button" key={item} aria-pressed={category === item} onClick={() => setCategory(item)}>{item}</button>)}
    </div>
    <p className="results-count" aria-live="polite">{entries.length} {entries.length === 1 ? "project" : "projects"}</p>
    <ProjectCards entries={entries} />
  </>;
}

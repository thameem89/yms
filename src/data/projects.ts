import type { MediaKey } from "@/lib/media";
import { presentationProjects } from "@/data/presentation-projects";

export type ProjectPhoto = {
  image: MediaKey;
  caption: string;
  category?: "Project Overview" | "Fabrication" | "Installation / Site Works";
};

export type Project = {
  slug: string;
  name: string;
  category: string;
  location?: string;
  image?: MediaKey;
  imageAlt?: string;
  hero?: ProjectPhoto;
  photos?: ProjectPhoto[];
  overview?: string;
  scope?: string;
  scopeItems?: string[];
  facts?: Record<string, string>;
  client?: string;
  owner?: string;
  contractor?: string;
  consultant?: string;
  source: "project-list" | "home" | "gallery" | "presentation";
};

const legacyProjects: Project[] = [
  { slug: "world-trade-center-abu-dhabi", name: "World Trade Center Abu Dhabi", category: "Commercial", location: "Abu Dhabi", image: "wtc", scope: "Structural steel and miscellaneous metalwork.", owner: "Aldar Properties PJSC", contractor: "Arabian Construction Company", consultant: "Atkins", source: "project-list" },
  { slug: "adnoc-headquarters", name: "ADNOC Headquarters", category: "Commercial", location: "Abu Dhabi", image: "adnoc", scope: "Structural steelwork.", owner: "Abu Dhabi National Oil Company (ADNOC)", contractor: "Al Jaber Building LLC", consultant: "Team Consult LLC", source: "project-list" },
  { slug: "dubai-creek-residences", name: "Dubai Creek Residences", category: "Residential", location: "Dubai", image: "creek", scope: "Structural steel coupling beams.", owner: "The Lagoon Phase One LLC", contractor: "Al Basti & Muktha LLC", consultant: "ATK Engineering Consultants", source: "project-list" },
  { slug: "sheikh-zayed-bridge", name: "Sheikh Zayed Bridge", category: "Infrastructure", location: "Abu Dhabi", image: "bridge", scope: "Structural steel and miscellaneous metalwork.", source: "project-list" },
  { slug: "yas-mall", name: "Yas Mall", category: "Commercial", location: "Abu Dhabi", image: "yas", scope: "Structural steelwork.", owner: "Aldar", contractor: "Galaxy Universal", consultant: "AECOM", source: "project-list" },
  { slug: "nadd-al-shiba-building", name: "Nadd Al Shiba Commercial & Residential Building", category: "Mixed-use", location: "Dubai", image: "meydan", scope: "Structural steel pergola.", owner: "Meydan Group LLC", contractor: "Belhasa Engineering", consultant: "DAR", source: "project-list" },
  { slug: "hotel-al-qusais", name: "Hotel Building, Al Qusais", category: "Hospitality", location: "Dubai", image: "hampton", scope: "Miscellaneous metalwork.", owner: "WASL", contractor: "Belhasa Engineering", consultant: "Design Center", source: "project-list" },
  { slug: "arbor-school", name: "Arbor School", category: "Education", image: "arbor", scope: "Complete steel roof structure and miscellaneous metalwork.", owner: "Al Mutatawera Gulf Gen. Trading Co.", contractor: "Construction & Reconstruction Engineering Company", consultant: "NEB", source: "project-list" },
  { slug: "dubai-flower-center", name: "Dubai Flower Center", category: "Commercial", location: "Dubai", image: "flower", scope: "Structural steel, stainless steel and cladding works.", owner: "Department of Civil Aviation (Dubai)", contractor: "Al Habtoor Murray & Roberts JV", source: "project-list" },
  { slug: "jewel-of-the-creek", name: "Jewel of the Creek", category: "Mixed-use", image: "jewel", scope: "Miscellaneous metalwork.", owner: "Dubai International Real Estate (D.I.R.E.)", contractor: "Al Habtoor Leighton LLC (HLG)", consultant: "Kieferle & Partner and Kling Consult", source: "project-list" },
  { slug: "premier-inn-hotel", name: "Premier Inn Hotel", category: "Hospitality", image: "premier", scope: "Structural steel and miscellaneous metalwork.", owner: "Abu Dhabi Airports Company", contractor: "BAM International Abu Dhabi LLC", source: "project-list" },
  { slug: "royal-amwaj-resort", name: "Royal Amwaj Resort", category: "Hospitality", image: "royal", scope: "Structural steel and miscellaneous metalwork.", owner: "Seven Tides Limited", contractor: "Gulf Technical Construction Company (GTCC)", consultant: "Asteco Development", source: "project-list" },
  { slug: "sharjah-flight-hangar", name: "Sharjah Flight Hangar", category: "Aviation", location: "Sharjah", image: "hangar", scope: "Structural steelwork.", source: "project-list" },
  { slug: "abu-dhabi-airport-terminal-3", name: "Abu Dhabi Airport Terminal 3 Expansion", category: "Aviation", location: "Abu Dhabi", image: "terminal", scope: "Design, engineering, fabrication, supply and erection of steel metal decking, including fireproofing.", owner: "Abu Dhabi Airports Company", contractor: "Taylor Woodrow Fibrex JV", consultant: "Jacobs/Ghafari", source: "home" },
  { slug: "al-habtoor-city", name: "Al Habtoor City", category: "Mixed-use", image: "habtoor", scope: "Various structural metal works.", owner: "Dubai National Investment Co. LLC", contractor: "Habtoor Leighton Group (HLG)", consultant: "Khatib & Alami", source: "home" },
  { slug: "al-habtoor-city-tennis-court", name: "Al Habtoor City Residences Tennis Court", category: "Residential", image: "tennis", scope: "Complete steelworks.", owner: "Al Habtoor Group", contractor: "Canadian Gulf Contracting LLC", consultant: "Atkins", source: "home" },
  { slug: "al-habtoor-palace", name: "Al Habtoor Palace", category: "Hospitality", image: "palace", source: "gallery" },
  { slug: "saadiyat-beach-villas", name: "Saadiyat Beach Villas", category: "Residential", image: "saadiyat", source: "gallery" },
  { slug: "abu-dhabi-international-airport", name: "Abu Dhabi International Airport", category: "Aviation", location: "Abu Dhabi", image: "abu-dhabi-airport", source: "gallery" },
];

export const projects = [...presentationProjects, ...legacyProjects];

export const gallerySlugs = [
  "dubai-creek-residences", "al-habtoor-palace", "dubai-marina-mall", "dubai-district-cooling-plant",
  "dubai-international-airport-concourse", "saadiyat-beach-villas", "abu-dhabi-international-airport", "sheikh-zayed-bridge", "royal-amwaj-resort",
];

export const projectGallery = gallerySlugs.flatMap((slug) => {
  const project = projects.find((item) => item.slug === slug);
  return project?.image ? [{ image: project.image, caption: project.imageAlt ?? project.name }] : [];
});

export const additionalProjectPhotos: Record<string, { image: MediaKey; caption: string }[]> = {
  "world-trade-center-abu-dhabi": [{ image: "wtc-home", caption: "World Trade Center, podium exterior" }],
};

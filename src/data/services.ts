export const services = [
  {
    slug: "design-engineering", name: "Design & Engineering", image: "facilities/beam-line", alt: "CNC beam line that processes detailed steelwork in the YMS workshop",
    source: "/design", category: "Engineering", enquiryType: "Engineering / Design",
    intro: "In-house structural design and detailing for steel packages from fabrication through erection.",
    detail: "Our in-house engineers and detailers develop structural steel designs against the project brief. They coordinate member and connection details with the workshop and site teams, then produce drawings for fabrication and erection.",
    capabilities: ["Structural steel design and value engineering", "Detailing and drafting for steel frames", "Stairs, platforms and roofing systems", "Coordination with fabrication and site teams"],
  },
  {
    slug: "steel-fabrication", name: "Steel Fabrication", image: "factory", alt: "Steelwork inside a YMS fabrication workshop",
    source: "/fabrication", category: "Fabrication", enquiryType: "Fabrication",
    intro: "CNC processing, assembly and welding for structural and secondary steelwork.",
    detail: "From approved shop drawings and material procurement through dispatch, our workshops fabricate steelwork to the project specification. CNC plasma cutting, bandsaws and plate rolling support material preparation, followed by assembly, welding and dimensional inspection.",
    capabilities: ["Built-up and hot-rolled steel sections", "Pre-engineered structures and piping", "Staircases, platforms and handrails", "Material and dimensional inspection before dispatch"],
  },
  {
    slug: "installation-erection", name: "Installation & Erection", image: "erection", alt: "Structural steel members installed at a project site",
    source: "/erection", category: "Site delivery", enquiryType: "Erection",
    intro: "Planned and coordinated on-site erection, from lifting to alignment and finishing.",
    detail: "Our site teams prepare method statements and erection drawings, coordinate lifting equipment and plan temporary supports. Experienced team leads oversee installation and the alignment and bolting of steel members.",
    capabilities: ["Temporary supports and erection drawings", "Lifting equipment coordination and site briefings", "Member alignment and bolt tightening", "Cladding, flashings, gutters and touch-up painting"],
  },
  {
    slug: "protective-coating", name: "Protective Coating", image: "coating", alt: "Protective coating work on structural steel",
    source: "/protective-coating", category: "Finishing", enquiryType: "Protective Coating",
    intro: "Industrial coating systems for steel exposed to onshore and coastal conditions.",
    detail: "YMS applies project-specified corrosion protection to structural steel, piping, crane rails and equipment. The system can include a primer, intermediate coat and top coat, with inspections and documented approvals at specified stages.",
    capabilities: ["Abrasive blasting and surface preparation", "Project-specific primers and multi-coat systems", "Coating application, drying and inspection", "Quality-control records and inspection reports"],
  },
  {
    slug: "fireproofing", name: "Fireproofing", image: "fireproofing", alt: "Fireproofing application shown by YMS Engineering",
    source: "/fireproofing", category: "Finishing", enquiryType: "Fireproofing",
    intro: "Intumescent and cementitious fire protection systems for structural steel.",
    detail: "YMS applies passive fire protection to structural steel according to project requirements. The team works with intumescent coatings that expand under heat and spray-applied cementitious systems.",
    capabilities: ["Intumescent coatings", "Cementitious fireproofing", "Application to structural steel", "Coordination with the specified fire protection system"],
  },
  {
    slug: "surface-preparation", name: "Surface Preparation", image: "surface", alt: "Surface preparation and blasting equipment",
    source: "/what-we-do", category: "Finishing", enquiryType: "Surface Preparation",
    intro: "Abrasive blasting and painting in dedicated finishing areas.",
    detail: "Dedicated blasting and painting booths accommodate built-up and hot-rolled sections. The facility supports shot blasting, manual blast cleaning and airless spraying for steel requiring surface preparation and coating.",
    capabilities: ["Shot blasting and manual blast cleaning", "Preparation of carbon-steel surfaces", "Airless spray application", "Surface inspection before coating"],
  },
] as const;

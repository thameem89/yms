export const facilities = [
  { title: "Corporate & engineering office", image: "facilities/exterior", alt: "YMS Engineering site exterior in Dubai Industrial Park", text: "The office houses engineering, project management, estimating and QA/QC alongside the corporate teams. The design and drawing office coordinates with the workshop and site teams." },
  { title: "Fabrication workshop", image: "facilities/workshop", alt: "YMS fabrication workshop with overhead cranes", text: "The workshop handles heavy plated fabrication, hot-rolled sections and secondary steelwork. Overhead cranes move sections and assemblies between work areas." },
  { title: "CNC cutting and drilling", image: "facilities/beam-line", alt: "Kaltenbach KDX 2015 CNC beam line at the YMS facility", text: "Automatic sawing and drilling lines process structural beams. CNC profile cutting and plate punching prepare steel for assembly." },
  { title: "Welding and assembly", image: "facilities/automatic-welding", alt: "Automatic welding line and roller conveyor at YMS Engineering", text: "Automatic submerged arc welding supports built-up steelwork. The workshops also use semi-automatic submerged arc equipment and MIG, TIG and stud welding machines." },
  { title: "Blasting and surface preparation", image: "facilities/blasting-booth", alt: "YMS operator abrasive blasting steel inside a dedicated booth", text: "Automatic turbine blasting and manual blast cleaning prepare steel surfaces before application of specified finishes." },
  { title: "Painting and protective finishes", image: "facilities/painting-booth", alt: "Steel members laid out inside the YMS painting booth", text: "Dedicated booths support airless paint spraying of built-up and hot-rolled sections. YMS also applies specified intumescent and cementitious fire protection systems." },
  { title: "Material handling and dispatch", image: "facilities/dispatch", alt: "YMS team loading material at the delivery hub", text: "Dedicated storage, assembly and dispatch areas support incoming materials and shipments of fabricated steelwork to site." },
] as const;

export const machinery = [
  {
    title: "Cutting, sawing & drilling",
    items: ["Automatic sawing & drilling beam line", "CNC plasma cutting machine", "CNC punching & drilling machine", "Shearing machines", "PUG cutting machine", "Radial drilling machines", "Magnetic drill machines", "Bandsaw machine", "Hole punching machines", "Heavy-duty disc cutter"],
    photos: [
      { image: "facilities/beam-line", caption: "Kaltenbach KDX 2015" },
      { image: "facilities/kaltenbach-kbs1551", caption: "Kaltenbach KBS 1551" },
      { image: "facilities/cnc-profile-cutting", caption: "CNC profile cutting machine" },
      { image: "facilities/radial-drill", caption: "Radial drilling machine" },
    ],
  },
  {
    title: "Welding",
    items: ["Automatic submerged arc welding (SAW) line", "Semi-automatic SAW tractor machines", "MIG welding machines", "TIG welding machines", "Stud welding machines"],
    photos: [{ image: "facilities/automatic-welding", caption: "Automatic welding line" }],
  },
  {
    title: "Forming & processing",
    items: ["Press brake", "Hydraulic press machine", "Plate rolling machine", "Portable sheet rolling machine", "Tube & pipe hydraulic rolling machine", "Threading machines", "Grinders and milling equipment"],
    photos: [
      { image: "facilities/press-brake", caption: "Bending machine" },
      { image: "facilities/milling", caption: "Milling machine" },
    ],
  },
  {
    title: "Blasting, surface treatment & painting",
    items: ["Automatic 8-wheel turbine blasting machine", "Blasting booth", "Pneumatic airless painting machines", "Painting booth"],
    photos: [
      { image: "facilities/automatic-blasting", caption: "Automatic blasting machine and roller conveyor" },
      { image: "facilities/blasting-booth", caption: "Abrasive blasting inside the booth" },
      { image: "facilities/painting-booth", caption: "Steel sections inside the painting booth" },
    ],
  },
  {
    title: "Handling & lifting",
    items: ["Tower crane", "Overhead cranes", "Gantry cranes", "Material handling equipment"],
    photos: [
      { image: "facilities/gantry-crane", caption: "MECTRANES 20T gantry crane" },
      { image: "facilities/workshop", caption: "MECTRANES 15T × 4 overhead cranes" },
      { image: "facilities/dispatch", caption: "YMS delivery hub" },
    ],
  },
] as const;

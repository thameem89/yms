export const company = {
  name: "YMS Engineering LLC",
  url: "https://www.ymsengineering.com",
  email: "info@yms-uae.com",
  phone: "+971 4 2433446",
  tel: "+97142433446",
  fax: "+971 4 4227962",
  poBox: "37701",
  plot: "5320221",
  district: "Saih Shuaib-3",
  park: "Dubai Industrial Park",
  city: "Dubai",
  country: "United Arab Emirates",
  coordinates: { latitude: 24.8359922, longitude: 55.0758532 },
  region: "UAE & GCC",
  facilityArea: { value: 202300, unit: "sq ft", label: "Dubai Industrial Park site" },
  description: "YMS Engineering is a Dubai-based structural steel contractor serving projects across the UAE and GCC, with in-house engineering, fabrication, finishing and on-site erection.",
};

export const companyClaimsForReview = {
  foundingYear: { value: 1984, basis: "/erection and legacy QHSE" },
  experienceYears: { values: [30, 35], basis: "/about-us, /who-we-are and /corporate-office" },
  workforce: { value: 200, basis: "/about-us" },
  additionalWorkshopLocations: { value: 3, basis: "/about-us and /what-we-do" },
  fabricationCapacity: [
    { value: 700, unit: "MT/month", source: "/fabrication" },
    { value: 2000, unit: "MT/month", source: "/what-we-do" },
    { value: 45000, unit: "MT/year", source: "/about-us and /corporate-office" },
    { value: "24,000–30,000", unit: "MT/year", source: "/about-us (additional yards)" },
  ],
  certification: [
    { source: "/copy-of-disclaimer", references: ["ISO-9001:2018", "OHSAS-18001:2018", "ISO-14001:2018"] },
    { source: "/what-we-do", references: ["ISO 9001:2015"] },
  ],
};

export const sectors = ["Industrial", "Commercial", "Residential", "Oil & Gas", "Utilities", "Infrastructure", "Aviation", "High-rise"];
export const process = ["Design", "Engineering", "Detailing", "Fabrication", "Surface preparation", "Coating or fireproofing", "Delivery", "Erection"];
export const principles = [
  { title: "Transparency", text: "Communicate clearly, share technical knowledge and stay open to feedback." },
  { title: "Responsibility", text: "Take ownership throughout the work and act promptly when a correction is needed." },
  { title: "Customer commitment", text: "Support customers through planning, execution, handover and post-completion." },
  { title: "Continual improvement", text: "Apply what each project teaches us to the work that follows." },
];

export const mapCoordinates = company.coordinates.latitude + "," + company.coordinates.longitude;
export const directionsUrl = "https://www.google.com/maps/dir/?api=1&destination=" + encodeURIComponent(mapCoordinates);

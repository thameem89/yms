import { SectionLabel } from "@/components/visual";

const checks = [
  ["Member stress", "The methodology identifies a utilization ratio below 0.9 as a member stress check target. Acceptance depends on the design basis and project requirements."],
  ["Serviceability", "Check deflection against the applicable code limits and evaluate vibration where the project requires it."],
  ["Connections and anchorage", "Design steel connections and check concrete breakout where applicable to the anchorage."],
];

const workflow = [
  "Project requirements", "Structural analysis", "Connection design", "Design checks",
  "Detailing", "Fabrication drawings", "Manufacturing", "Installation",
];

export function EngineeringMethodology() {
  return <>
    <section className="section light-section engineering-methodology"><div className="wrap split align-start">
      <div>
        <h2>Structural design methodology</h2>
        <p className="lead">The project design basis sets the applicable code and edition. YMS’s documented methodology cites AISC 360-16, ASCE 7-16 and the Dubai Building Code (DBC).</p>
        <h3>Engineering software</h3>
        <ul className="software-list"><li>STAAD.Pro</li><li>IDEA StatiCa</li><li>Tekla</li></ul>
      </div>
      <div>
        <h3>Engineering checks</h3>
        <dl className="engineering-checks">{checks.map(([name, description]) => <div key={name}><dt>{name}</dt><dd>{description}</dd></div>)}</dl>
      </div>
    </div></section>
    <section className="section dark-section"><div className="wrap">
      <SectionLabel>Engineering process</SectionLabel><h2>From design basis to site installation</h2>
      <p className="engineering-process-intro">A typical sequence for a coordinated steel package. The team adapts the sequence to the project’s delivery requirements.</p>
      <ol className="process-line engineering-process">{workflow.map((step) => <li key={step}>{step}</li>)}</ol>
    </div></section>
  </>;
}

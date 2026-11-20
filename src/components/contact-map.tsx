"use client";

import { useState } from "react";
import { directionsUrl, mapCoordinates } from "@/data/company";
import { Icon } from "@/components/actions";

export function ContactMap() {
  const [showMap, setShowMap] = useState(false);
  return <div className="contact-map">
    {showMap
      ? <iframe title="YMS Engineering location in Dubai Industrial Park" loading="lazy" referrerPolicy="strict-origin-when-cross-origin" src={"https://maps.google.com/maps?q=" + mapCoordinates + "&z=15&output=embed"} />
      : <div className="map-cover"><Icon name="pin" size={34} /><h3>Dubai Industrial Park</h3><p>Saih Shuaib-3, Dubai</p><button type="button" className="button outline" onClick={() => setShowMap(true)}>Load Google Maps</button></div>}
    <a href={directionsUrl} className="text-link map-directions">Get directions <Icon name="external" size={17} /></a>
  </div>;
}

import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { JsonLd } from "@/components/visual";
import { company } from "@/data/company";
import { absolute } from "@/lib/seo";

const manrope = localFont({
  src: "../../node_modules/@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2",
  weight: "200 800",
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(company.url),
  title: { default: "Structural Steel Contractor in Dubai | YMS Engineering", template: "%s | YMS Engineering" },
  description: company.description,
  applicationName: company.name,
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <html lang="en" className={manrope.variable}><body>
    <a href="#main" className="skip-link">Skip to content</a>
    <Header />
    <main id="main">{children}</main>
    <Footer />
    <JsonLd data={{ "@context": "https://schema.org", "@graph": [
      { "@type": "Organization", "@id": absolute("/#organization"), name: company.name, url: company.url, logo: absolute("/brand/yms-logo.svg"), email: company.email, telephone: company.tel, address: { "@type": "PostalAddress", postOfficeBoxNumber: company.poBox, streetAddress: company.park + ", DM Plot " + company.plot, addressLocality: company.city, addressCountry: "AE" } },
      { "@type": "WebSite", "@id": absolute("/#website"), url: company.url, name: company.name, publisher: { "@id": absolute("/#organization") } },
    ] }} />
  </body></html>;
}

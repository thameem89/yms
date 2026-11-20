# Migration inventory

## Sources

- YMS was the source for corporate copy, locations, project records and the media portfolio. The audit used the [homepage](https://www.ymsengineering.com/), [Wix pages sitemap](https://www.ymsengineering.com/pages-sitemap.xml), legacy project list, capability pages, facilities pages and policy pages.
- Assent was used to study how an engineering site presents capabilities, sector browsing, photography, portfolio evidence and QHSE navigation. [Assent Steel](https://www.assentsteel.com/)
- The public logo and app icons are exports of the supplied Illustrator artwork. The source geometry is preserved.

## Content destinations

| Legacy | New |
| --- | --- |
| Homepage introduction, About Us, Who We Are, What We Do | Home, About, Facilities |
| Design, Fabrication, Installation & Erection, Corrosion Protective Coating, Fire Proofing and the homepage Surface Preparation listing | Six detail pages under `/services` |
| Corporate Office, What We Do and homepage Facilities | `/facilities` |
| Project List, homepage projects and gallery | `/projects`, project details and `/projects#gallery` |
| QHSE, Quality Policy, Privacy Policy and Disclaimer | `/qhse`, `/quality-policy`, `/privacy-policy` and `/disclaimer` |
| Homepage corporate contact | `/contact` |
| Careers and vacancies | `/career` and `/career#vacancies` |

The permanent redirects in [next.config.ts](next.config.ts) cover the public business-content routes. On the legacy Wix site, `/copy-of-disclaimer` contains the QHSE page and `/copy-of-quality-policy` contains the disclaimer. The thin Wix member and forum pages are retired. The careers route retains the recruitment overview and directs vacancy enquiries to the corporate office. The old vacancy subscription has been retired.

## Assets

[src/data/media.json](src/data/media.json) tracks each published WebP derivative with its YMS page, original CDN URL and dimensions. The original files remain attributed to their legacy source. The fabrication yard rendering is captioned as a site layout. Some project imagery depicts architectural renderings displayed in the YMS portfolio. Confirm publication rights for the migrated photographs and renderings before public cutover.

The brief makes a trust-logo strip conditional on approved assets. The project pages identify sourced organizations in the context of their historical project roles.

## Future news

Add an editorially approved `src/data/news.ts` and App Router routes under `src/app/news` when YMS has content to publish. The shared layouts, breadcrumb metadata and sitemap generator can support those routes.

# Mi ruta SOCHIRADI

**English** · [Leer en español](README.es.md)

**From a conference program to a personal itinerary.**

An unofficial mobile agenda for the 2026 Chilean Radiology Congress: compare simultaneous sessions, choose activities and see scheduling conflicts from your phone.

[Explore the program](https://mi-ruta-sochiradi.pablo-aguirre-araya.workers.dev/) · [Sources and data audit](docs/data-audit.md)

**Deployed and used during the event.** The conference has ended; its program remains available for reference.

<img src="assets/mobile-agenda.webp" alt="Mobile congress program with two talks selected in the artificial intelligence session" width="300">

*Real mobile capture, 390 × 844 CSS pixels. Two example selections; Spanish interface.*

## From choosing to attending

- Browse by time or room, with search and filters.
- Choose talks, blocks or rooms, while keeping individual exceptions.
- See a chronological itinerary, overlaps and room changes.
- Explore the venue map and talk details.
- Keep selections locally; consult the cached agenda offline after a first successful load.

<img src="assets/mobile-itinerary.webp" alt="Personal itinerary showing the two selected talks, times and room links" width="300">

## Historical usage evidence

Cloudflare Web Analytics recorded approximately **140 visits and 1,200 page views on October 9–10, 2026**, in mainland Chile time (GMT−3), with bot filtering enabled.

| Historical measure | Approximate value |
| --- | --- |
| October 9 | 100 visits · 800 page views |
| October 10 | 40 visits · 400 page views |
| Reported device / country | 100% mobile / 100% Chile |

These historical figures may be sampled. Visits are **not unique people**; page views include navigation inside the app. They show recorded use, not distinct attendee counts or measured time savings. [Measurement notes](https://developers.cloudflare.com/web-analytics/faq/).

## Build and inspect

HTML, CSS and JavaScript modules; local storage, offline caching and Cloudflare Workers hosting. No runtime dependencies. With a modern Node.js version:

```sh
npm run dev
npm test
npm run check
npm run validate
npm run build
```

The development server uses port 4173; static files are in `dist/`. See [verification](docs/verification.md) for the existing technical checks. This presentation update changes documentation and screenshots only.

## Scope and contribution

An independent project, not an official SOCHIRADI app. Selections belong to each browser and domain, without accounts or synchronization; the first load and external materials require connectivity. Source materials retain their provenance and rights.

I defined the need and mobile experience, prepared and reviewed the program data, and developed iteratively with AI assistance. **Pablo Aguirre Araya, physician in Chile.**

[Open the app](https://mi-ruta-sochiradi.pablo-aguirre-araya.workers.dev/) · [Contact](mailto:pablo.aguirre.araya@gmail.com) · [Capture details](docs/screenshots.md)

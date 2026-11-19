# Homepage hero photography

Three slideshow photographs are historical archive images sourced from the Internal Audit Agency's official website. Each slide displays an archive credit and year linked to the original publication; slide copy describes IAD services rather than identifying these images as current IAD events.

| Local image | Subject / archive year | Original publication |
| --- | --- | --- |
| `public/images/hero/ohcs-audit-committee.jpg` | OHCS Audit Committee inauguration, 2022 | https://iaa.gov.gh/2022/09/12/iaa-inaugurates-the-audit-committee-of-the-ohcs/ |
| `public/images/hero/audit-training.jpg` | Working-paper management / audit queries training, 2024 | https://iaa.gov.gh/2024/07/08/training-workshop/ |
| `public/images/hero/audit-committee-psrs.jpeg` | Public Sector Reforms Secretariat Audit Committee inauguration, 2025 | https://iaa.gov.gh/2025/06/13/iaa-inaugurates-the-audit-committee-of-psrs/ |

The fourth photograph, `public/images/hero/civil-service-office.jpg`, was supplied by the user for the IAD platform. It has a separate supplied-photo credit without an invented event date or external attribution. Its desktop framing preserves the full portrait on the right of the caption.

The complete four-image set is approximately 1.1 MB. Files are served locally; the first image is preloaded and subsequent images use lazy loading. Focal positions, image descriptions, dates and source links are defined in `src/components/home/hero.tsx`. Slide copy and control labels are in the EN/FR dictionaries in `src/lib/i18n.ts`.

Playback advances every eight seconds and pauses on hover, keyboard focus, manual navigation or a hidden browser tab. Reduced-motion preferences disable automatic playback and transitions. Users can navigate using the numbered controls, previous/next buttons, left/right arrow keys or a horizontal touch swipe.

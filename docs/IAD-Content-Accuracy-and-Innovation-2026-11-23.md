# IAD content accuracy review and proposed digital innovations

Date: 23 November 2026

Status: Editorial revision and proposals for review. No new operational system or institutional approval is implied.

## Authoritative basis

The departmental brief supplied by Ozzy on 23 November 2026 is the primary editorial source. The mandate, eight services, vision and six functions are also published at [OHCS: Internal Audit Department](https://ohcs.gov.gh/departments/internal-audit-department/). Grammar and duplicated words have been corrected without changing the substance.

The OHCS page carries an older director biography and a June 2024 review date. Ozzy explicitly confirmed Solomon Wemegah as the current Director on 23 November 2026. The website retains that name and photograph; it does not reuse the older director's biography or infer Solomon's appointment date, qualifications or employment history from it.

Supporting official references checked for this revision:

- [OHCS contact directory](https://ohcs.gov.gh/contact/): published reception number 0302-682340 and postal address P.O. Box M49, Ministries, Accra. This is an OHCS reception line, not a confirmed direct IAD line.
- [OHCS RTI guidance](https://ohcs.gov.gh/rti/rti/): official RTI route. The website does not promise an unconditional response deadline or describe its prototype form as an official filing channel.
- [OHCS downloads](https://ohcs.gov.gh/documents/): published resource catalogue, linked from the resource preview.

These official pages can also become outdated. Reception availability, approved IAD contact details and operating arrangements should be confirmed before operational acceptance.

## Editorial decisions

| Area | Change and rationale |
| --- | --- |
| Shared mandate, services, functions and vision | Centralised in `src/lib/department-content.ts`; About, Functions, Vision and Services reuse the same statements. |
| Scope | OHCS audit systems, management advice, policy/contract reviews, special audits, compliance, asset/resource protection and value for money are distinguished from Civil Service Class management and MDA coordination. |
| Homepage, hero and footer | Removed the unsupported headquarters claim. English and French shared copy reflect the supplied scope. Existing branding, photos, focal positions and motion remain. |
| Director | Retained Solomon Wemegah as confirmed. Removed the unsupported reporting-line statement and unsourced detailed biography. |
| Structure | Replaced an unapproved hierarchy with a functional relationship overview. Coordination does not establish that every MDA unit reports directly to the Director. |
| Performance figures | Removed 40+ MDAs, 120+ audits, 85% resolution, 300+ trained and 10 coordinated units as purported achievements. The eight services and six functions are counts of items in the brief, not performance indicators. |
| MDA directory | Retained preview routes, explicitly labelled illustrative. Replaced invented unit-specific remits with a validation notice. No official coverage total is inferred from sample entries. |
| News and events | Sample titles, homepage section and page notices identify illustrative content. Dates are not advertised as confirmed departmental events. |
| Dashboard, registry and certificate checker | Retained prototype functionality with explicit status notes. Removed official-validity guarantees and any inference that a missing prototype certificate record proves fraud. No unsupported open-data licence is asserted. |
| Search visibility | Sample directory, news/events, registry, dashboard and certificate routes inherit noindex metadata; the resource preview also uses noindex. Core institutional pages remain indexable. |
| Contact | Replaced an unconfirmed departmental mailbox and phone with the published OHCS reception/contact route. The local contact preview explicitly reports that no message was sent. No two-day response promise remains. |
| Reporting | Removed absolute anonymity, confidentiality and guaranteed-review claims. The prototype is not a channel for sensitive allegations. Optional identity fields are described precisely. |

The editorial review does not validate operational data already stored in D1, officer credentials, event bookings, downloaded files, or an approved organogram. No database records were modified. Production email and real administrative sign-in activation remain deferred as requested.

## Product framing

Planning approach: the office-hours skill, scaled to the supplied departmental brief. The central opportunity is to reduce fragmented spreadsheets, email follow-ups and repeated data entry around the department's documented work. Those pain points are hypotheses to validate with staff, not findings from a completed user study.

Three options were considered:

1. **Public website only:** quickest route to accurate institutional communication, but limited support for coordination and Class management.
2. **Private Class and assurance workspace, with an approved public layer — recommended:** directly supports the supplied functions and creates a traceable source for future publications.
3. **Broad public rankings and automated national audit intelligence:** requires validated coverage, disclosure authority and substantially more data. Defer; the supplied mandate alone does not justify it.

Keep the current website as the public front door. Introduce operational modules incrementally after owners, workflows and production arrangements are approved. These proposals are separate from the existing website delivery/budget scope; no additional cost or timetable is approved here.

## Proposed innovations

### 1. Class Desk: a single, verified Class record

**Grounding:** manage the Internal Audit Class; equitable distribution through postings, secondment and conversion; staffing-policy liaison with the Internal Audit Agency.

**Experience:** a staff member updates a proposed change once; an authorised officer validates it; the approved record feeds staffing views and training needs. An MDA capacity view highlights vacancies or outdated returns without ranking individual auditors.

**Minimum workflow:** draft officer/unit record → evidence check → authorised approval → versioned effective date → restricted export. Posting, secondment and conversion requests retain their own statuses and decision authority; the system does not make personnel decisions.

**Access:** approved Class administrators and authorised staffing officers. Publish only fields specifically cleared for public use. Counselling cases are not part of the general personnel record.

**Pilot measures:** proportion of records with an owner and last-verified date; duplicate rate; time to reconcile a staffing return. Establish a baseline before setting targets.

### 2. MDA Coordination Desk: one return, fewer follow-ups

**Grounding:** co-ordinate and monitor activities of Internal Audit Units in MDAs.

**Experience:** unit officers see a short checklist of required returns, save drafts on a slow connection, submit a versioned return and receive a clear acknowledgement. Coordinators see missing, returned-for-correction and accepted submissions separately.

**Minimum workflow:** department approves a reporting template and schedule → unit drafts → coordinator validates → corrections or acceptance → period closes → approved summary export.

**Key distinction:** missing or stale information is shown as unknown, not as poor performance or elevated audit risk. A submitted return is not automatically an approved audit finding.

**Pilot measures:** completeness, on-time submission rate, correction cycles and coordinator follow-up time. No public league tables.

### 3. Learning Passport: training linked to actual needs

**Grounding:** train officers in the Internal Audit Class.

**Experience:** a personal learning timeline brings together approved course notices, nominations, attendance and resources. Coordinators can spot recurring training needs across approved records.

**Minimum workflow:** course proposed → departmental approval → nominations → attendance validation → learning record. A downloadable attendance record must not imply professional accreditation or an IAD certificate policy that has not been approved.

**Pilot measures:** validated attendance coverage, nomination-to-attendance conversion and course feedback. Avoid equating participation with competence or better audit outcomes.

### 4. Advisory Review Room: policy and contract advice with a traceable handover

**Grounding:** management advice; policy and contract review; special audits; risk, control and administrative-process review.

**Experience:** an authorised requester selects the review type, identifies the document version and sees precisely what further information is needed. Reviewers record advice, management responses and agreed next steps in one controlled workspace.

**Minimum workflow:** intake → scope and authority check → assigned reviewer → documented advice → management acknowledgement → closure or follow-up. Restricted documents stay private; public uploads are not an initial requirement.

**Pilot measures:** intake completeness, time awaiting information, review turnaround and overdue follow-ups. Management remains responsible for decisions; audit advice is not legal clearance or procurement approval.

### 5. Management Action Tracker: recommendations through to evidenced closure

**Grounding:** issue reports for management attention; safeguard assets; promote compliance and economy, efficiency and effectiveness; facilitate prevention and detection of abuse and waste.

**Experience:** an action has an owner, due date, evidence and reviewer. “Completed by owner” and “closure accepted” remain separate. A Director's view shows overdue actions and evidence gaps, rather than an unsupported headline resolution percentage.

**Minimum workflow:** approved recommendation → management action and owner → evidence submitted → authorised closure review → reopen if necessary. Keep OHCS assurance records distinct from MDA coordination returns.

**Pilot measures:** actions with agreed owners/dates, overdue ageing and evidence-supported closure. Public summaries are a separate, explicitly approved publication step; individual findings and sensitive evidence stay restricted.

### 6. Private Counselling Desk: discreet support for auditors

**Grounding:** offer counselling and consultancy on issues affecting Internal Auditors in MDAs.

**Experience:** officers can request a private appointment or advice without revealing case details to general Class administrators or MDA directory users.

**Minimum workflow:** minimal request → named counsellor/authorised adviser → appointment or advice → controlled closure. Agree access, consent, retention and escalation rules before collecting case notes. Do not promise absolute confidentiality.

**Pilot measures:** acknowledgement time, waiting time and voluntary satisfaction feedback. Do not publish identifiable counselling statistics or use cases to score staff.

## Recommended sequence and acceptance gates

| Stage | Deliverable | Gate before proceeding |
| --- | --- | --- |
| Now | Accurate public mandate, vision, services and functions; clear prototype status | Department reviews editorial copy and outstanding contact/structure information. |
| First operational pilot | Class Desk and one MDA return template | Named data owners, approved fields, roles, retention, validated pilot records, real sign-in and notification setup. |
| Next | Learning Passport and Advisory Review Room | Approved course/review workflows and a successful staff usability exercise on mobile and desktop. |
| Then | Management Action Tracker and Private Counselling Desk | Agreed closure authority and separate sensitive-case access; restore/export and access-denial tests pass. |
| Later | Selected public statistics, registry fields or certificate checks | Validated records, documented publication authority and clear definitions, coverage and refresh dates. |

The first pilot should be deliberately small: one departmental coordinator, a nominated set of MDA participants and a single reporting period. The department chooses participants and success thresholds. No automatic deployment of the proposed modules follows from this document.

## Delivery principles

- Use approved institution hosting and identity arrangements; the existing Cloudflare stack is a technical starting point, not a decision that overrides production/NITA requirements.
- Prefer responsive, low-bandwidth forms, explicit saved/submitted/accepted states, small downloads and accessible keyboard interaction. Draft persistence must be opt-in on shared workstations; sensitive case notes must not be cached locally by default.
- Use role-scoped access, server-side validation, prepared statements, versioned records and audit trails. Separate public CMS content from private staffing, review and counselling data.
- Start with structured records and deterministic workflow rules. An optional assistant could later search approved policies and cite exact passages; it must not decide postings, validate credentials, close audit findings or provide unreviewed sensitive advice.
- Any email or WhatsApp reminder integration is a separate approved step. Avoid sensitive contents in notifications; link to an authenticated workspace.
- Measure the baseline first. Do not promise percentages saved, national coverage, guaranteed fraud detection or institutional readiness without evidence.

## Information still needed for full institutional acceptance

Approved organogram and reporting relationships; validated MDA list and officer records; approved IAD direct contacts and visiting hours; cleared news/events/publications; agreed service intake and reporting procedures; production ownership, hosting, authentication and notification arrangements; and explicit authority for any public operational dataset.

The earlier `IAD-Strategic-Innovation-Roadmap.md` is retained as historical ideation. Its approval, national coverage and anonymity language should not be treated as evidence of current authorisation or operational capability. This brief-grounded proposal is the current recommendation for review.

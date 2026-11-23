const NOTES: Partial<Record<string, string>> = {
  network: 'Illustrative directory: these example entries are awaiting an approved, current MDA unit list. Names and descriptions must not be treated as a confirmed roster.',
  transparency: 'Prototype dashboard: displayed records and totals are for demonstration and are not an approved statement of departmental performance.',
  registry: 'Prototype registry: displayed profiles, credentials and verification labels are demonstration records, pending institutional validation and permission to publish.',
  verification: 'Prototype checker: a result describes a record in this platform only. It does not establish official certificate validity; a missing record is not evidence of fraud.',
  news: 'Sample editorial content: these articles illustrate the website layout and are not confirmed departmental announcements.',
  events: 'Sample events: dates, venues and activities shown here are illustrative and are not confirmed bookings or invitations.',
  knowledge: 'Resource preview: publication records and download availability require departmental approval. For published OHCS documents, use the official OHCS downloads catalogue.',
  services: 'Online channels are being prepared for production. The departmental services below are drawn from the supplied mandate; the web forms are prototype workflows.',
  advisory: 'Prototype request channel: production handling and notifications are not yet activated. Use the OHCS contact directory for an official enquiry; do not submit confidential documents here.',
  audit: 'Prototype request channel: production handling and notifications are not yet activated. Do not submit confidential audit information here.',
  protection: 'Prototype reporting channel: production handling is not yet activated. Do not submit sensitive allegations here. Optional identity fields do not guarantee technical anonymity.',
  rights: 'Prototype request channel: this form is not a confirmed official RTI filing channel. Use OHCS’s published RTI guidance for an official request.',
  feedback: 'Prototype feedback channel: production handling and notifications are not yet activated.',
  tracking: 'Prototype submission tracking: a platform status does not confirm official receipt or action by OHCS.',
  contact: 'Contact form preview: messages entered here are not sent. Use the OHCS contact directory for an official enquiry.',
};

export function ContentStatusNote({ theme }: { theme: string }) {
  const message = NOTES[theme];
  if (!message) return null;
  return (
    <aside aria-label="Content status" className="mt-8 rounded-xl border border-border bg-white px-5 py-4 text-sm leading-relaxed text-text-muted" data-content-status>
      {message}{' '}
      {(theme === 'contact' || theme === 'advisory' || theme === 'audit' || theme === 'protection') && (
        <a className="font-semibold text-primary underline underline-offset-4" href="https://ohcs.gov.gh/contact/">OHCS contact directory</a>
      )}
      {theme === 'rights' && <a className="font-semibold text-primary underline underline-offset-4" href="https://ohcs.gov.gh/rti/rti/">OHCS RTI guidance</a>}
      {theme === 'knowledge' && <a className="font-semibold text-primary underline underline-offset-4" href="https://ohcs.gov.gh/documents/">OHCS downloads</a>}
    </aside>
  );
}

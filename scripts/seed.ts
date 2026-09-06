//
// IAD demo seed. Generates an idempotent SQL file (deterministic ids +
// INSERT OR IGNORE) and applies it to the local D1 via wrangler.
//
// Usage:
//   npm run seed            # local D1 (default)
//   npm run seed -- --remote
//
// Run AFTER `npm run migrate` so the 0012/0013 tables exist.

import { writeFileSync, rmSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, '..');
const DB_NAME = 'iad-platform';
const remote = process.argv.includes('--remote');
const flag = remote ? '--remote' : '--local';

// ─── helpers ─────────────────────────────────────────────────────────────

const NOW = Date.now();
const DAY = 24 * 60 * 60 * 1000;

function iso(daysAgo: number): string {
  return new Date(NOW - daysAgo * DAY).toISOString();
}

function dateOnly(daysAgo: number): string {
  return iso(daysAgo).slice(0, 10);
}

function esc(s: string): string {
  return s.replace(/'/g, "''");
}

function v(x: string | number | null): string {
  if (x === null) return 'NULL';
  if (typeof x === 'number') return String(x);
  return `'${esc(x)}'`;
}

const statements: string[] = [];

function insert(table: string, cols: string[], rows: (string | number | null)[][]): void {
  for (const row of rows) {
    statements.push(
      `INSERT OR IGNORE INTO ${table} (${cols.join(', ')}) VALUES (${row.map(v).join(', ')});`,
    );
  }
}

// ─── portal users ────────────────────────────────────────────────────────
// 1 admin, 1 director, 1 manager, 2 auditors, 1 mda_liaison (Ministry of
// Health). Passwords are never stored — sign-in is magic-link only.

insert(
  'users',
  ['id', 'email', 'name', 'role', 'mda_id', 'active', 'created_at'],
  [
    ['seed-user-admin', 'admin@iad.gov.gh', 'Efua Owusu-Ansah', 'admin', null, 1, iso(400)],
    ['seed-user-director', 'director@iad.gov.gh', 'Kwabena Agyeman-Badu', 'director', null, 1, iso(400)],
    ['seed-user-manager', 'manager@iad.gov.gh', 'Ama Serwaa Boateng', 'manager', null, 1, iso(380)],
    ['seed-user-auditor', 'auditor@iad.gov.gh', 'Yaw Osei Frimpong', 'auditor', null, 1, iso(360)],
    ['seed-user-auditor2', 'auditor2@iad.gov.gh', 'Akosua Mensima Asante', 'auditor', null, 1, iso(360)],
    ['seed-user-liaison', 'liaison.health@moh.gov.gh', 'Nana Aba Dadzie', 'mda_liaison', 'Ministry of Health', 1, iso(300)],
  ],
);

// ─── audit universe (6 MDAs, 14 units) ───────────────────────────────────

const UNIVERSE: [string, string, string, string, number, number, number | null][] = [
  // id, mda_name, unit_name, category, likelihood, impact, last_audited(daysAgo|null)
  ['seed-uni-fin-treasury', 'Ministry of Finance', 'Treasury & Accounts', 'financial_management', 4, 5, 210],
  ['seed-uni-fin-budget', 'Ministry of Finance', 'Budget Execution', 'compliance', 3, 5, null],
  ['seed-uni-health-proc', 'Ministry of Health', 'Procurement & Supplies', 'procurement', 5, 4, 160],
  ['seed-uni-health-nhis', 'Ministry of Health', 'NHIS Claims Unit', 'financial_management', 4, 4, 320],
  ['seed-uni-edu-capitation', 'Ministry of Education', 'Capitation Grant Secretariat', 'financial_management', 4, 3, 120],
  ['seed-uni-edu-ems', 'Ministry of Education', 'Education Management Information Systems', 'it_systems', 3, 3, null],
  ['seed-uni-roads-contracts', 'Ministry of Roads and Highways', 'Road Contracts Unit', 'procurement', 5, 5, 95],
  ['seed-uni-roads-maint', 'Ministry of Roads and Highways', 'Road Maintenance Fund', 'financial_management', 4, 4, null],
  ['seed-uni-agric-subsidy', 'Ministry of Food and Agriculture', 'Input Subsidy Programme', 'programme_delivery', 4, 4, 140],
  ['seed-uni-agric-stores', 'Ministry of Food and Agriculture', 'National Buffer Stock Stores', 'asset_management', 3, 3, null],
  ['seed-uni-lg-dacf', 'Ministry of Local Government, Decentralisation and Rural Development', 'DACF Releases', 'financial_management', 4, 4, 180],
  ['seed-uni-lg-payroll', 'Ministry of Local Government, Decentralisation and Rural Development', 'MMDA Payroll Audit', 'payroll', 4, 3, null],
  ['seed-uni-fin-revenue', 'Ministry of Finance', 'Non-Tax Revenue Collection', 'revenue', 3, 4, null],
  ['seed-uni-health-fleet', 'Ministry of Health', 'Ambulance & Fleet Management', 'asset_management', 2, 3, null],
];

insert(
  'audit_universe',
  ['id', 'mda_name', 'unit_name', 'category', 'risk_likelihood', 'risk_impact', 'last_audited_at', 'notes', 'created_at'],
  UNIVERSE.map(([id, mda, unit, cat, lik, imp, lastAudited]) => [
    id,
    mda,
    unit,
    cat,
    lik,
    imp,
    lastAudited === null ? null : iso(lastAudited),
    'Seeded demo universe entry',
    iso(400),
  ]),
);

// ─── annual plans + items ────────────────────────────────────────────────

const thisYear = new Date(NOW).getUTCFullYear();
const lastYear = thisYear - 1;

insert(
  'audit_plans',
  ['id', 'year', 'title', 'status', 'created_by', 'created_at'],
  [
    ['seed-plan-1', lastYear, `IAD Annual Audit Plan ${lastYear}`, 'approved', 'seed-user-director', iso(420)],
    ['seed-plan-2', thisYear, `IAD Annual Audit Plan ${thisYear}`, 'draft', 'seed-user-director', iso(30)],
  ],
);

insert(
  'plan_items',
  ['id', 'plan_id', 'universe_id', 'quarter', 'priority', 'status'],
  [
    ['seed-pi-1', 'seed-plan-1', 'seed-uni-fin-treasury', 'Q1', 'high', 'done'],
    ['seed-pi-2', 'seed-plan-1', 'seed-uni-health-proc', 'Q2', 'high', 'done'],
    ['seed-pi-3', 'seed-plan-1', 'seed-uni-edu-capitation', 'Q3', 'medium', 'done'],
    ['seed-pi-4', 'seed-plan-1', 'seed-uni-agric-subsidy', 'Q4', 'medium', 'deferred'],
    ['seed-pi-5', 'seed-plan-2', 'seed-uni-roads-contracts', 'Q1', 'high', 'done'],
    ['seed-pi-6', 'seed-plan-2', 'seed-uni-health-nhis', 'Q2', 'high', 'in_progress'],
    ['seed-pi-7', 'seed-plan-2', 'seed-uni-lg-dacf', 'Q3', 'medium', 'planned'],
    ['seed-pi-8', 'seed-plan-2', 'seed-uni-roads-maint', 'Q4', 'medium', 'planned'],
  ],
);

// ─── engagements (5, various phases) ─────────────────────────────────────

const ENGAGEMENTS: [string, string, string, string, string | null, string, string, number, number | null, string | null][] = [
  // id, code, title, universe_id, plan_item_id, phase, lead, startDaysAgo, endDaysAgo|null, rating|null
  ['seed-eng-1', `ENG-${lastYear}-001`, 'Treasury & Accounts Assurance Audit', 'seed-uni-fin-treasury', 'seed-pi-1', 'closed', 'seed-user-auditor', 300, 190, 'Satisfactory'],
  ['seed-eng-2', `ENG-${lastYear}-002`, 'Health Procurement Systems Review', 'seed-uni-health-proc', 'seed-pi-2', 'follow_up', 'seed-user-auditor2', 240, null, null],
  ['seed-eng-3', `ENG-${lastYear}-003`, 'Capitation Grant Utilisation Audit', 'seed-uni-edu-capitation', 'seed-pi-3', 'reporting', 'seed-user-auditor', 170, null, null],
  ['seed-eng-4', `ENG-${thisYear}-001`, 'Road Contracts Procurement Audit', 'seed-uni-roads-contracts', 'seed-pi-5', 'fieldwork', 'seed-user-auditor2', 45, null, null],
  ['seed-eng-5', `ENG-${thisYear}-002`, 'NHIS Claims Integrity Review', 'seed-uni-health-nhis', 'seed-pi-6', 'planning', 'seed-user-auditor', 12, null, null],
];

insert(
  'engagements',
  ['id', 'code', 'title', 'universe_id', 'plan_item_id', 'phase', 'lead_auditor_id', 'start_date', 'end_date', 'overall_rating', 'created_at'],
  ENGAGEMENTS.map(([id, code, title, uni, pi, phase, lead, startAgo, endAgo, rating]) => [
    id,
    code,
    title,
    uni,
    pi,
    phase,
    lead,
    dateOnly(startAgo),
    endAgo === null ? null : dateOnly(endAgo),
    rating,
    iso(startAgo),
  ]),
);

insert(
  'engagement_team',
  ['engagement_id', 'user_id', 'team_role'],
  [
    ['seed-eng-1', 'seed-user-auditor2', 'team_member'],
    ['seed-eng-2', 'seed-user-auditor', 'team_member'],
    ['seed-eng-4', 'seed-user-auditor', 'team_member'],
    ['seed-eng-5', 'seed-user-auditor2', 'team_member'],
  ],
);

// ─── findings (~20 across 12 months, severities, statuses, categories) ───

const FINDINGS: [
  string, string, string, string, string, string, string, string, number, number | null,
][] = [
  // id, engagement, universe, title, category, severity, status, description, createdDaysAgo, closedDaysAgo|null
  ['seed-fnd-01', 'seed-eng-1', 'seed-uni-fin-treasury', 'Unreconciled bank balances across 12 treasury accounts', 'financial_management', 'high', 'verified', 'Bank reconciliations for 12 treasury accounts were outstanding for over 90 days.', 290, 200],
  ['seed-fnd-02', 'seed-eng-1', 'seed-uni-fin-treasury', 'Expenditure vouchers missing supporting documents', 'financial_management', 'medium', 'closed', 'Sampled payment vouchers lacked invoices and goods-received notes.', 285, 210],
  ['seed-fnd-03', 'seed-eng-1', 'seed-uni-fin-treasury', 'Stale imprest balances not retired', 'financial_management', 'low', 'closed', 'Staff imprest of GHS 84,200 remained unretired beyond the 30-day limit.', 282, 230],
  ['seed-fnd-04', 'seed-eng-2', 'seed-uni-health-proc', 'Single-source procurement above approved threshold', 'procurement', 'high', 'verified', 'Three contracts totalling GHS 2.1m were single-sourced without PPA approval.', 235, 150],
  ['seed-fnd-05', 'seed-eng-2', 'seed-uni-health-proc', 'Bid evaluation reports not signed by panel members', 'procurement', 'medium', 'closed', 'Evaluation reports for four tenders were unsigned.', 232, 170],
  ['seed-fnd-06', 'seed-eng-2', 'seed-uni-health-proc', 'Expired framework agreements still in use', 'procurement', 'medium', 'in_progress', 'Two framework agreements lapsed but continued to be called off.', 228, null],
  ['seed-fnd-07', 'seed-eng-2', 'seed-uni-health-proc', 'Medical supplies received without inspection certificates', 'procurement', 'high', 'responded', 'Deliveries at the Central Medical Stores lacked mandatory inspection.', 224, null],
  ['seed-fnd-08', 'seed-eng-3', 'seed-uni-edu-capitation', 'Capitation grants to 14 schools unaccounted for', 'financial_management', 'high', 'closed', 'Utilisation returns were not submitted by 14 beneficiary schools.', 165, 90],
  ['seed-fnd-09', 'seed-eng-3', 'seed-uni-edu-capitation', 'Textbook procurement not in procurement plan', 'compliance', 'medium', 'closed', 'GHS 310,000 of textbook purchases were outside the approved plan.', 160, 100],
  ['seed-fnd-10', 'seed-eng-3', 'seed-uni-edu-capitation', 'Duplicate payment of supplier invoices', 'financial_management', 'medium', 'verified', 'Two supplier invoices were paid twice due to manual posting errors.', 155, 120],
  ['seed-fnd-11', 'seed-eng-4', 'seed-uni-roads-contracts', 'Contract variations exceeding 25% without fresh approval', 'procurement', 'high', 'responded', 'Variations on the Nsawam bypass works exceeded statutory limits.', 40, null],
  ['seed-fnd-12', 'seed-eng-4', 'seed-uni-roads-contracts', 'Performance securities expired before practical completion', 'procurement', 'high', 'open', 'Performance bonds for two lots lapsed while works continued.', 36, null],
  ['seed-fnd-13', 'seed-eng-4', 'seed-uni-roads-contracts', 'Advance payments not amortised per contract terms', 'financial_management', 'medium', 'open', 'Mobilisation advances were not recovered from interim certificates.', 30, null],
  ['seed-fnd-14', 'seed-eng-4', 'seed-uni-roads-contracts', 'Site diaries not maintained by resident engineers', 'compliance', 'low', 'responded', 'Daily site records were incomplete for three of five lots.', 25, null],
  ['seed-fnd-15', 'seed-eng-5', 'seed-uni-health-nhis', 'Claims paid above tariff ceilings', 'financial_management', 'high', 'open', 'Sampled claims exceeded published NHIS tariff ceilings.', 10, null],
  ['seed-fnd-16', 'seed-eng-5', 'seed-uni-health-nhis', 'Ghost beneficiary entries in claims data', 'fraud_risk', 'high', 'open', 'Data analytics flagged beneficiary IDs with implausible visit patterns.', 8, null],
  ['seed-fnd-17', 'seed-eng-2', 'seed-uni-health-proc', 'Stores ledger not updated for vaccine cold-chain items', 'asset_management', 'medium', 'closed', 'Cold-chain stores ledger was six weeks behind physical counts.', 220, 140],
  ['seed-fnd-18', 'seed-eng-1', 'seed-uni-fin-treasury', 'Payroll inputs not independently reviewed', 'payroll', 'medium', 'verified', 'Monthly payroll inputs lacked evidence of secondary review.', 280, 215],
  ['seed-fnd-19', 'seed-eng-3', 'seed-uni-edu-capitation', 'School improvement plans not linked to grant releases', 'programme_delivery', 'low', 'closed', 'Grant releases were made without approved SIPs on file.', 150, 110],
  ['seed-fnd-20', 'seed-eng-4', 'seed-uni-roads-contracts', 'Consultant supervision fees paid without timesheets', 'financial_management', 'medium', 'in_progress', 'Supervision consultant invoices lacked supporting timesheets.', 20, null],
];

insert(
  'findings',
  ['id', 'engagement_id', 'universe_id', 'title', 'description', 'category', 'severity',
   'condition', 'criteria', 'cause', 'effect', 'status', 'closed_at', 'created_at'],
  FINDINGS.map(([id, eng, uni, title, cat, sev, status, desc, createdAgo, closedAgo]) => [
    id,
    eng,
    uni,
    title,
    desc,
    cat,
    sev,
    desc, // condition
    'Public Financial Management Act 2016 (Act 921) and applicable regulations', // criteria
    'Weak supervisory controls and manual processes', // cause
    'Risk of loss, misstatement and reduced service delivery', // effect
    status,
    closedAgo === null ? null : iso(closedAgo),
    iso(createdAgo),
  ]),
);

// ─── recommendations (some overdue) ──────────────────────────────────────

insert(
  'recommendations',
  ['id', 'finding_id', 'text', 'owner', 'due_date', 'status', 'created_at'],
  [
    ['seed-rec-01', 'seed-fnd-01', 'Complete monthly bank reconciliations for all treasury accounts within 15 days of month-end.', 'Chief Accountant, MoF', dateOnly(-30), 'implemented', iso(285)],
    ['seed-rec-02', 'seed-fnd-02', 'Enforce voucher completeness checklist before payment release.', 'Director of Finance, MoF', dateOnly(-60), 'implemented', iso(283)],
    ['seed-rec-03', 'seed-fnd-03', 'Retire all outstanding imprest and suspend new advances to defaulters.', 'Chief Accountant, MoF', dateOnly(45), 'overdue', iso(280)],
    ['seed-rec-04', 'seed-fnd-04', 'Retroactively regularise or terminate the three single-sourced contracts with PPA.', 'Chief Director, MoH', dateOnly(-90), 'implemented', iso(232)],
    ['seed-rec-05', 'seed-fnd-05', 'Require signed evaluation reports as a payment milestone condition.', 'Head of Procurement, MoH', dateOnly(-15), 'verified', iso(230)],
    ['seed-rec-06', 'seed-fnd-06', 'Renew or re-tender expired framework agreements within 60 days.', 'Head of Procurement, MoH', dateOnly(30), 'overdue', iso(226)],
    ['seed-rec-07', 'seed-fnd-07', 'Institute mandatory inspection and certification before stores receipt.', 'Director, Central Medical Stores', dateOnly(20), 'in_progress', iso(222)],
    ['seed-rec-08', 'seed-fnd-08', 'Recover or account for unretired capitation grants from the 14 schools.', 'Director-General, GES', dateOnly(-100), 'implemented', iso(162)],
    ['seed-rec-09', 'seed-fnd-09', 'Align all procurement with the approved annual procurement plan.', 'Head of Procurement, MoE', dateOnly(-75), 'verified', iso(158)],
    ['seed-rec-10', 'seed-fnd-10', 'Deploy duplicate-invoice detection in the GIFMIS payables module.', 'Controller, CAGD', dateOnly(-40), 'implemented', iso(152)],
    ['seed-rec-11', 'seed-fnd-11', 'Seek Head of Entity approval for variations above 15% as interim control.', 'Chief Director, MRH', dateOnly(14), 'in_progress', iso(38)],
    ['seed-rec-12', 'seed-fnd-12', 'Call or renew performance securities before further interim payments.', 'Director of Contracts, MRH', dateOnly(7), 'open', iso(34)],
    ['seed-rec-13', 'seed-fnd-13', 'Recover mobilisation advances from the next three interim certificates.', 'Director of Finance, MRH', dateOnly(10), 'open', iso(28)],
    ['seed-rec-14', 'seed-fnd-14', 'Standardise and audit resident engineer site diaries monthly.', 'Director of Supervision, MRH', dateOnly(60), 'in_progress', iso(24)],
    ['seed-rec-15', 'seed-fnd-15', 'Configure tariff ceiling validation in the claims processing system.', 'CEO, NHIA', dateOnly(90), 'open', iso(9)],
    ['seed-rec-16', 'seed-fnd-16', 'Run quarterly beneficiary de-duplication and investigate outliers.', 'Director of Claims, NHIA', dateOnly(120), 'open', iso(7)],
  ],
);

// ─── management responses ────────────────────────────────────────────────

insert(
  'management_responses',
  ['id', 'finding_id', 'recommendation_id', 'respondent_name', 'mda_name', 'response_text', 'action_plan', 'evidence_r2_key', 'submitted_at'],
  [
    ['seed-resp-1', 'seed-fnd-07', 'seed-rec-07', 'Dr. Yaw Adu-Gyamfi', 'Ministry of Health',
     'Management accepts the finding. All deliveries at the Central Medical Stores now require inspection certificates before receipt is booked.',
     'Revised stores SOP issued; training for 24 stores officers scheduled next quarter.', null, iso(200)],
    ['seed-resp-2', 'seed-fnd-11', 'seed-rec-11', 'Ing. Abena Pokuaa', 'Ministry of Roads and Highways',
     'We concur. A variation register has been established and all pending variations above 15% submitted for approval.',
     'Variation register live; quarterly compliance review by the Contracts Unit.', null, iso(15)],
    ['seed-resp-3', 'seed-fnd-14', 'seed-rec-14', 'Ing. Kofi Boateng', 'Ministry of Roads and Highways',
     'Site diary templates have been standardised across all lots and resident engineers briefed.',
     'Monthly diary audits by the supervision consultant begin next month.', null, iso(18)],
  ],
);

// ─── IAC auditor registry (8 auditors, credentials, CPD, certificates) ───

const AUDITORS: [string, string, string, string, string, string, number, number][] = [
  // id, staff_id, name, grade, mda_name, slug, verified, createdDaysAgo
  ['seed-aud-1', 'IAC-0001', 'Yaw Osei Frimpong', 'Principal Internal Auditor', 'Ministry of Finance', 'yaw-osei-frimpong', 1, 380],
  ['seed-aud-2', 'IAC-0002', 'Akosua Mensima Asante', 'Senior Internal Auditor', 'Ministry of Health', 'akosua-mensima-asante', 1, 375],
  ['seed-aud-3', 'IAC-0003', 'Kofi Annor Mensah', 'Chief Internal Auditor', 'Ministry of Education', 'kofi-annor-mensah', 1, 370],
  ['seed-aud-4', 'IAC-0004', 'Adjoa Yaa Boatemaa', 'Internal Auditor', 'Ministry of Roads and Highways', 'adjoa-yaa-boatemaa', 1, 365],
  ['seed-aud-5', 'IAC-0005', 'Kwame Owusu Sekyere', 'Senior Internal Auditor', 'Ministry of Food and Agriculture', 'kwame-owusu-sekyere', 1, 360],
  ['seed-aud-6', 'IAC-0006', 'Esi Abena Quarcoo', 'Principal Internal Auditor', 'Ministry of Local Government, Decentralisation and Rural Development', 'esi-abena-quarcoo', 1, 355],
  ['seed-aud-7', 'IAC-0007', 'Daniel Kweku Appiah', 'Internal Auditor', 'Ministry of Finance', 'daniel-kweku-appiah', 0, 340],
  ['seed-aud-8', 'IAC-0008', 'Mawuli Kofi Agbemadzi', 'Assistant Internal Auditor', 'Ministry of Health', 'mawuli-kofi-agbemadzi', 0, 335],
];

insert(
  'auditors',
  ['id', 'staff_id', 'name', 'grade', 'mda_name', 'public_slug', 'verified', 'created_at'],
  AUDITORS.map(([id, staffId, name, grade, mda, slug, verified, createdAgo]) => [
    id, staffId, name, grade, mda, slug, verified, iso(createdAgo),
  ]),
);

insert(
  'credentials',
  ['id', 'auditor_id', 'body', 'designation', 'year', 'verified'],
  [
    ['seed-cred-01', 'seed-aud-1', 'FCCA', 'Fellow of the Association of Chartered Certified Accountants', 2019, 1],
    ['seed-cred-02', 'seed-aud-1', 'CITG', 'Chartered Institute of Taxation Ghana', 2015, 1],
    ['seed-cred-03', 'seed-aud-2', 'ACCA', 'Association of Chartered Certified Accountants', 2018, 1],
    ['seed-cred-04', 'seed-aud-2', 'IIA', 'Certified Internal Auditor (CIA)', 2021, 1],
    ['seed-cred-05', 'seed-aud-3', 'ICA-GH', 'Chartered Accountant, Institute of Chartered Accountants Ghana', 2012, 1],
    ['seed-cred-06', 'seed-aud-4', 'ACCA', 'Association of Chartered Certified Accountants', 2022, 1],
    ['seed-cred-07', 'seed-aud-5', 'CITG', 'Chartered Institute of Taxation Ghana', 2017, 1],
    ['seed-cred-08', 'seed-aud-5', 'IIA', 'Certified Internal Auditor (CIA)', 2020, 1],
    ['seed-cred-09', 'seed-aud-6', 'ICA-GH', 'Chartered Accountant, Institute of Chartered Accountants Ghana', 2014, 1],
    ['seed-cred-10', 'seed-aud-6', 'FCCA', 'Fellow of the Association of Chartered Certified Accountants', 2020, 1],
    ['seed-cred-11', 'seed-aud-7', 'ACCA', 'Association of Chartered Certified Accountants', 2023, 0],
    ['seed-cred-12', 'seed-aud-8', 'OTHER', 'BSc Accounting, University of Ghana', 2024, 0],
  ],
);

insert(
  'cpd_records',
  ['id', 'auditor_id', 'activity', 'points', 'year', 'source'],
  [
    ['seed-cpd-01', 'seed-aud-1', 'IIA Ghana National Conference', 20, lastYear, 'IIA Ghana'],
    ['seed-cpd-02', 'seed-aud-1', 'Fraud Risk Analytics Workshop', 12, thisYear, 'IAD Training Unit'],
    ['seed-cpd-03', 'seed-aud-2', 'IPSAS Refresher Course', 15, lastYear, 'ICAG'],
    ['seed-cpd-04', 'seed-aud-2', 'IT Audit Fundamentals', 18, thisYear, 'IIA Ghana'],
    ['seed-cpd-05', 'seed-aud-3', 'Public Financial Management Masterclass', 14, lastYear, 'CAGD'],
    ['seed-cpd-06', 'seed-aud-4', 'Procurement Audit Techniques', 10, thisYear, 'PPA Ghana'],
    ['seed-cpd-07', 'seed-aud-5', 'Data Analytics for Auditors (Excel to SQL)', 16, thisYear, 'IAD Training Unit'],
    ['seed-cpd-08', 'seed-aud-6', 'Leadership in Internal Audit', 12, lastYear, 'IIA Ghana'],
    ['seed-cpd-09', 'seed-aud-6', 'Ethics and Professional Scepticism', 8, thisYear, 'ICAG'],
  ],
);

insert(
  'certificates',
  ['id', 'auditor_id', 'title', 'serial', 'verify_code', 'issued_at'],
  [
    ['seed-cert-1', 'seed-aud-1', `IAD Certificate of Competence in Public Sector Auditing`, `IAD-CERT-${lastYear}-0001`, 'SEEDCRT1', iso(200)],
    ['seed-cert-2', 'seed-aud-2', `IAD Certificate in Fraud Risk Assessment`, `IAD-CERT-${lastYear}-0002`, 'SEEDCRT2', iso(180)],
    ['seed-cert-3', 'seed-aud-6', `IAD Certificate of Merit — Internal Audit Excellence`, `IAD-CERT-${thisYear}-0001`, 'SEEDCRT3', iso(60)],
  ],
);

// ─── sample notifications + audit log entries ────────────────────────────

insert(
  'notifications',
  ['id', 'user_id', 'type', 'payload_json', 'read', 'created_at'],
  [
    ['seed-ntf-1', 'seed-user-auditor', 'engagement_assigned',
     JSON.stringify({ engagement_id: 'seed-eng-5', code: `ENG-${thisYear}-002`, title: 'NHIS Claims Integrity Review', role: 'lead' }),
     0, iso(12)],
    ['seed-ntf-2', 'seed-user-manager', 'recommendation_overdue',
     JSON.stringify({ recommendation_id: 'seed-rec-03' }), 0, iso(44)],
    ['seed-ntf-3', 'seed-user-director', 'response_submitted',
     JSON.stringify({ finding_id: 'seed-fnd-11', finding_title: 'Contract variations exceeding 25% without fresh approval', mda_name: 'Ministry of Roads and Highways', respondent_name: 'Ing. Abena Pokuaa' }),
     1, iso(15)],
  ],
);

insert(
  'audit_log',
  ['id', 'user_id', 'action', 'entity', 'entity_id', 'meta_json', 'created_at'],
  [
    ['seed-log-1', 'seed-user-director', 'create', 'audit_plan', 'seed-plan-2', JSON.stringify({ year: thisYear }), iso(30)],
    ['seed-log-2', 'seed-user-manager', 'update', 'finding', 'seed-fnd-08', JSON.stringify({ fields: ['status'] }), iso(90)],
    ['seed-log-3', 'seed-user-admin', 'verify', 'auditor', 'seed-aud-6', JSON.stringify({ fields: ['verified'] }), iso(300)],
  ],
);

// ─── knowledge hub (6 documents; 5 with tiny seed PDFs uploaded to R2) ──
// The draft document is intentionally metadata-only (zero versions).
// PDFs are minimal valid single-page files generated below; file_size is
// the real byte length. Re-running is safe: INSERT OR IGNORE + R2 put
// overwrites the same keys.

const R2_BUCKET = 'iad-uploads';

function tinyPdf(label: string): Buffer {
  const body = [
    '%PDF-1.4',
    `% ${label}`,
    '1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj',
    '2 0 obj<</Type/Pages/Kids[3 0 R]/Count 1>>endobj',
    '3 0 obj<</Type/Page/Parent 2 0 R/MediaBox[0 0 612 792]>>endobj',
    'trailer<</Root 1 0 R>>',
    '%%EOF',
    '',
  ].join('\n');
  return Buffer.from(body, 'utf8');
}

interface KnowledgeSeedVersion {
  id: string;
  version: number;
  r2Key: string;
  fileName: string;
  changeNote: string | null;
  createdDaysAgo: number;
  pdf: Buffer;
}

interface KnowledgeSeedDoc {
  id: string;
  slug: string;
  title: string;
  summary: string;
  category: string;
  audience: 'public' | 'mda';
  status: 'draft' | 'published' | 'archived';
  tags: string;
  downloadCount: number;
  createdDaysAgo: number;
  publishedDaysAgo: number | null;
  versions: KnowledgeSeedVersion[];
}

function kv(
  docId: string,
  version: number,
  fileName: string,
  label: string,
  changeNote: string | null,
  createdDaysAgo: number,
): KnowledgeSeedVersion {
  return {
    id: `${docId}-v${version}`,
    version,
    r2Key: `knowledge/${docId}/v${version}.pdf`,
    fileName,
    changeNote,
    createdDaysAgo,
    pdf: tinyPdf(label),
  };
}

const KNOWLEDGE_DOCS: KnowledgeSeedDoc[] = [
  {
    id: 'seed-kd-manual',
    slug: 'internal-audit-manual-2024',
    title: 'Internal Audit Manual 2024',
    summary: 'The consolidated IAD fieldwork manual: planning, execution, reporting and follow-up standards for all internal audit units.',
    category: 'manual',
    audience: 'public',
    status: 'published',
    tags: 'manual,procedures,fieldwork',
    downloadCount: 37,
    createdDaysAgo: 120,
    publishedDaysAgo: 90,
    versions: [
      kv('seed-kd-manual', 1, 'internal-audit-manual-2024.pdf', 'IAD Internal Audit Manual 2024 (v1)', 'Initial release', 120),
      kv('seed-kd-manual', 2, 'internal-audit-manual-2024-v2.pdf', 'IAD Internal Audit Manual 2024 (v2)', 'Updated risk-based planning chapter', 90),
    ],
  },
  {
    id: 'seed-kd-template',
    slug: 'working-paper-template',
    title: 'Working Paper Template',
    summary: 'Standard working paper template for documenting audit evidence, cross-referencing and review sign-off.',
    category: 'template',
    audience: 'public',
    status: 'published',
    tags: 'template,working papers,documentation',
    downloadCount: 58,
    createdDaysAgo: 200,
    publishedDaysAgo: 195,
    versions: [kv('seed-kd-template', 1, 'working-paper-template.pdf', 'IAD Working Paper Template', null, 200)],
  },
  {
    id: 'seed-kd-standard',
    slug: 'risk-assessment-standard',
    title: 'Risk Assessment Standard',
    summary: 'Methodology for scoring likelihood and impact across the audit universe, aligned to the IAD annual planning cycle.',
    category: 'standard',
    audience: 'public',
    status: 'published',
    tags: 'risk,standard,planning',
    downloadCount: 24,
    createdDaysAgo: 150,
    publishedDaysAgo: 140,
    versions: [kv('seed-kd-standard', 1, 'risk-assessment-standard.pdf', 'IAD Risk Assessment Standard', null, 150)],
  },
  {
    id: 'seed-kd-circular',
    slug: 'circular-annual-audit-plan-submissions',
    title: 'Circular: Submission of Annual Audit Plans',
    summary: 'Circular to all MDAs on timelines and format for submitting annual internal audit plans to the IAD.',
    category: 'circular',
    audience: 'public',
    status: 'published',
    tags: 'circular,annual plan,mda',
    downloadCount: 12,
    createdDaysAgo: 60,
    publishedDaysAgo: 55,
    versions: [kv('seed-kd-circular', 1, 'circular-annual-audit-plans.pdf', 'IAD Circular — Annual Audit Plan Submissions', null, 60)],
  },
  {
    id: 'seed-kd-guideline',
    slug: 'guideline-management-responses',
    title: 'Guideline: Management Responses to Audit Findings',
    summary: 'How MDA management should respond to audit findings and recommendations within the statutory 30-day window.',
    category: 'guideline',
    audience: 'mda',
    status: 'published',
    tags: 'guideline,management response,mda',
    downloadCount: 9,
    createdDaysAgo: 80,
    publishedDaysAgo: 75,
    versions: [kv('seed-kd-guideline', 1, 'guideline-management-responses.pdf', 'IAD Guideline — Management Responses', null, 80)],
  },
  {
    id: 'seed-kd-draft',
    slug: 'procurement-audit-report-template-draft',
    title: 'Procurement Audit Report Template (Draft)',
    summary: 'Draft reporting template for procurement audits — under review by the Standards Committee.',
    category: 'report',
    audience: 'public',
    status: 'draft',
    tags: 'report,procurement,draft',
    downloadCount: 0,
    createdDaysAgo: 10,
    publishedDaysAgo: null,
    versions: [],
  },
];

insert(
  'knowledge_documents',
  ['id', 'slug', 'title', 'summary', 'category', 'audience', 'status', 'tags', 'download_count', 'created_by', 'created_at', 'updated_at', 'published_at'],
  KNOWLEDGE_DOCS.map((d) => [
    d.id,
    d.slug,
    d.title,
    d.summary,
    d.category,
    d.audience,
    d.status,
    d.tags,
    d.downloadCount,
    'seed-user-admin',
    iso(d.createdDaysAgo),
    iso(d.publishedDaysAgo ?? d.createdDaysAgo),
    d.publishedDaysAgo === null ? null : iso(d.publishedDaysAgo),
  ]),
);

insert(
  'knowledge_versions',
  ['id', 'document_id', 'version', 'r2_key', 'file_name', 'file_size', 'mime', 'change_note', 'uploaded_by', 'created_at'],
  KNOWLEDGE_DOCS.flatMap((d) =>
    d.versions.map((ver) => [
      ver.id,
      d.id,
      ver.version,
      ver.r2Key,
      ver.fileName,
      ver.pdf.byteLength,
      'application/pdf',
      ver.changeNote,
      'seed-user-admin',
      iso(ver.createdDaysAgo),
    ]),
  ),
);

// ─── apply ───────────────────────────────────────────────────────────────

const tmpFile = join(REPO_ROOT, '.seed.tmp.sql');
writeFileSync(
  tmpFile,
  `-- IAD demo seed (generated ${new Date(NOW).toISOString()}) — idempotent\n` +
    statements.join('\n') +
    '\n',
);

console.log(`Seeding ${DB_NAME} (${remote ? 'REMOTE' : 'LOCAL'}) with ${statements.length} statements…`);
try {
  execSync(`npx wrangler d1 execute ${DB_NAME} ${flag} --file="${tmpFile}"`, {
    cwd: REPO_ROOT,
    stdio: 'inherit',
  });
  console.log('✅ Seed applied. Re-running is safe (INSERT OR IGNORE).');
} finally {
  rmSync(tmpFile, { force: true });
}

// Upload the tiny knowledge-hub PDFs to R2 so seeded versions resolve.
// Note: `wrangler r2 object put` is REMOTE by default in wrangler 3 — it
// only accepts `--local` (no `--remote` flag), unlike `d1 execute`.
const r2Flag = remote ? '' : '--local';
const pdfDir = join(REPO_ROOT, '.seed-pdfs.tmp');
mkdirSync(pdfDir, { recursive: true });
try {
  const files = KNOWLEDGE_DOCS.flatMap((d) => d.versions);
  for (const f of files) {
    const path = join(pdfDir, `${f.id}.pdf`);
    writeFileSync(path, f.pdf);
    execSync(
      `npx wrangler r2 object put "${R2_BUCKET}/${f.r2Key}" --file="${path}" --content-type=application/pdf ${r2Flag}`,
      { cwd: REPO_ROOT, stdio: 'inherit' },
    );
  }
  console.log(`✅ Uploaded ${files.length} knowledge-hub PDF(s) to r2://${R2_BUCKET}.`);
} finally {
  rmSync(pdfDir, { recursive: true, force: true });
}

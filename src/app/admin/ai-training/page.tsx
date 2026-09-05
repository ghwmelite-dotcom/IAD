'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { DemoBanner } from '@/components/admin/demo-banner';
import {
  Bot, BookOpen, FileText, MessageSquare, Settings,
  Plus, Pencil, Trash2, Search, CheckCircle2,
  Clock, AlertCircle, Star, X,
  Upload, Brain, BarChart3, MessageCircle,
} from 'lucide-react';

/* ── Tab definitions ── */
const TABS = [
  { id: 'knowledge', label: 'Knowledge Base', icon: BookOpen },
  { id: 'documents', label: 'Documents', icon: FileText },
  { id: 'conversations', label: 'Conversations', icon: MessageSquare },
  { id: 'settings', label: 'Settings', icon: Settings },
] as const;

type TabId = (typeof TABS)[number]['id'];

/* ── Knowledge entry type ── */
interface KnowledgeEntry {
  id: string;
  question: string;
  answer: string;
  category: string;
  updatedAt: string;
}

/* ── Document type ── */
interface DocumentEntry {
  id: string;
  title: string;
  fileName: string;
  fileSize: string;
  status: 'processing' | 'ready' | 'error';
  uploadedAt: string;
  category: string;
}

/* ── Conversation type ── */
interface ConversationEntry {
  id: string;
  userQuestion: string;
  botAnswer: string;
  rating: number | null;
  timestamp: string;
  resolved: boolean;
}

/* ── Initial data ── */
const INITIAL_KNOWLEDGE: KnowledgeEntry[] = [
  { id: 'k1', question: 'What does the Internal Audit Department do?', answer: 'The Internal Audit Department (IAD) of the Office of the Head of Civil Service provides independent assurance, audit coordination, and advisory services that strengthen accountability, risk management, and compliance across Ghana\'s Ministries, Departments and Agencies (MDAs). It coordinates the work of Internal Audit Units and the Internal Audit Class (IAC) registry.', category: 'General', updatedAt: '2026-04-15' },
  { id: 'k2', question: 'What is the Internal Audit Class (IAC) registry?', answer: 'The IAC registry is the official register of professional internal auditors serving in Ghana\'s MDAs. Each registered auditor has a public profile showing their grade, MDA, verified professional credentials, and Continuing Professional Development (CPD) points. You can search the registry on the Registry page.', category: 'Registry', updatedAt: '2026-04-14' },
  { id: 'k3', question: 'How do I verify an internal auditor?', answer: 'Visit the Registry page and search for the auditor by name or staff ID. Only auditors whose records have been verified by the IAD appear publicly, with their credentials and CPD standing shown on their profile.', category: 'Registry', updatedAt: '2026-04-13' },
  { id: 'k4', question: 'How do I verify an IAD certificate?', answer: 'Every certificate issued by the IAD carries a unique serial number (IAD-CERT-YYYY-NNNN) and a public verify code. Enter the verify code on the Certificate Verification page to confirm the certificate\'s authenticity, title, and holder.', category: 'Certificates', updatedAt: '2026-04-13' },
  { id: 'k5', question: 'How do I report fraud or corruption?', answer: 'Use the Report Fraud page on this website. Your report is assigned a reference number immediately and routed confidentially to the appropriate review team. You can track progress with your reference number on the Track Submission page. The IAD does not charge any fees.', category: 'Fraud Reporting', updatedAt: '2026-04-12' },
  { id: 'k6', question: 'How do I request a special audit?', answer: 'MDAs and oversight bodies can request a special audit through the Special Audit Request page. Provide the MDA, scope, and justification. The IAD reviews each request and responds within 10 working days.', category: 'Services', updatedAt: '2026-04-11' },
  { id: 'k7', question: 'What consultancy services does the IAD offer?', answer: 'The IAD provides advisory services on internal controls, risk management frameworks, governance structures, and compliance reviews for MDAs. Submit a request through the Consultancy page and the department will schedule an initial scoping discussion.', category: 'Services', updatedAt: '2026-04-10' },
  { id: 'k8', question: 'What standards do internal auditors in Ghana follow?', answer: 'Internal auditors in the Ghanaian public service follow the Institute of Internal Auditors (IIA) International Professional Practices Framework (IPPF), the Public Financial Management Act, 2016 (Act 921), and directives issued under the Internal Audit Agency Act, 2003 (Act 658).', category: 'Standards', updatedAt: '2026-04-09' },
  { id: 'k9', question: 'What is the Internal Audit Agency Act?', answer: 'The Internal Audit Agency Act, 2003 (Act 658) established the Internal Audit Agency and provides the legal basis for internal auditing in Ghana\'s public service. It defines the independence of internal auditors, their reporting lines, and the role of audit committees in MDAs.', category: 'Legal', updatedAt: '2026-04-08' },
  { id: 'k10', question: 'How do I track my submission?', answer: 'Visit the Track Submission page, enter your reference number and the email or phone used when submitting. You can view the current status and full timeline of your special audit request, consultancy request, fraud report, RTI request, complaint, or feedback.', category: 'Services', updatedAt: '2026-04-08' },
  { id: 'k11', question: 'What is CPD and how many points do auditors need?', answer: 'Continuing Professional Development (CPD) keeps internal auditors\' skills current. IAC members are expected to earn CPD points each year through conferences, training, and professional courses. CPD records are maintained by the IAD and shown on each verified auditor\'s public registry profile.', category: 'CPD', updatedAt: '2026-04-07' },
  { id: 'k12', question: 'Which professional bodies are recognised for IAC credentials?', answer: 'The IAD recognises credentials from the Institute of Internal Auditors (IIA), ACCA and FCCA, the Institute of Chartered Accountants Ghana (ICA-GH), and the Chartered Institute of Taxation Ghana (CITG). Other bodies may be recorded subject to verification by the department.', category: 'Registry', updatedAt: '2026-04-06' },
  { id: 'k13', question: 'What is a risk-based annual audit plan?', answer: 'Each year the IAD prepares an annual audit plan built from the audit universe — a register of auditable units across MDAs scored by likelihood and impact of risk. High-risk units are prioritised in the plan, which is submitted for approval before engagements are scheduled by quarter.', category: 'Audit Process', updatedAt: '2026-04-05' },
  { id: 'k14', question: 'What happens after an audit finding is raised?', answer: 'Findings are classified by severity and issued with recommendations to the MDA. The MDA submits a management response with an action plan and evidence. The IAD tracks implementation through follow-up until the recommendation is verified as implemented or escalated as overdue.', category: 'Audit Process', updatedAt: '2026-04-05' },
  { id: 'k15', question: 'What is the Right to Information Act?', answer: 'Under the Right to Information Act, 2019 (Act 989), every person can request information held by public institutions without giving a reason. Institutions must respond within 14 working days. Submit an RTI request to the IAD through the RTI page.', category: 'RTI', updatedAt: '2026-04-04' },
  { id: 'k16', question: 'What is the audit universe?', answer: 'The audit universe is the complete register of auditable entities — MDAs and their internal units — maintained by the IAD. Each entry carries a risk likelihood and impact score, and the date it was last audited, which together drive annual planning.', category: 'Audit Process', updatedAt: '2026-04-04' },
  { id: 'k17', question: 'What are the phases of an IAD engagement?', answer: 'Every audit engagement moves through five phases: planning, fieldwork, reporting, follow-up, and closure. Working papers are filed at each phase, findings are raised during fieldwork and reporting, and recommendations are tracked to implementation during follow-up.', category: 'Audit Process', updatedAt: '2026-04-03' },
  { id: 'k18', question: 'What is the role of an audit committee?', answer: 'Audit committees in MDAs provide oversight of the internal audit function: they review annual plans, monitor implementation of audit recommendations, and ensure management responds to findings. The IAD coordinates with audit committees during follow-up.', category: 'Standards', updatedAt: '2026-04-03' },
  { id: 'k19', question: 'Is my fraud report confidential?', answer: 'Yes. Fraud reports are handled confidentially and only accessible to the assigned review team. Do not include your identity if you wish to remain anonymous — but keep your reference number safe, as it is the only way to track an anonymous report.', category: 'Fraud Reporting', updatedAt: '2026-04-02' },
  { id: 'k20', question: 'What are the IAD office hours?', answer: 'Monday to Friday, 8:00 AM to 5:00 PM. Closed on weekends and public holidays. The IAD is located within the Office of the Head of Civil Service, Accra. Email: info@iad.gov.gh.', category: 'Contact', updatedAt: '2026-04-01' },
];

const INITIAL_DOCUMENTS: DocumentEntry[] = [
  { id: 'd1', title: 'Internal Audit Agency Act, 2003 (Act 658)', fileName: 'internal-audit-agency-act-2003.pdf', fileSize: '1.9 MB', status: 'ready', uploadedAt: '2026-04-10', category: 'Legislation' },
  { id: 'd2', title: 'Public Financial Management Act, 2016 (Act 921)', fileName: 'pfm-act-2016.pdf', fileSize: '3.4 MB', status: 'ready', uploadedAt: '2026-04-09', category: 'Legislation' },
  { id: 'd3', title: 'Right to Information Act, 2019 (Act 989)', fileName: 'rti-act-2019.pdf', fileSize: '1.8 MB', status: 'ready', uploadedAt: '2026-04-09', category: 'Legislation' },
  { id: 'd4', title: 'IIA International Professional Practices Framework (IPPF)', fileName: 'iia-ippf-2024.pdf', fileSize: '5.6 MB', status: 'ready', uploadedAt: '2026-04-08', category: 'Standards' },
  { id: 'd5', title: 'IAD Annual Audit Plan 2026', fileName: 'iad-annual-plan-2026.pdf', fileSize: '2.2 MB', status: 'processing', uploadedAt: '2026-04-16', category: 'Plans' },
  { id: 'd6', title: 'Internal Audit Manual for MDAs', fileName: 'iad-audit-manual.pdf', fileSize: '4.7 MB', status: 'ready', uploadedAt: '2026-04-05', category: 'Guidelines' },
  { id: 'd7', title: 'Audit Committee Charter Template', fileName: 'audit-committee-charter.pdf', fileSize: '640 KB', status: 'ready', uploadedAt: '2026-04-04', category: 'Templates' },
  { id: 'd8', title: 'Fraud Reporting & Whistleblower Guide', fileName: 'fraud-reporting-guide.pdf', fileSize: '980 KB', status: 'ready', uploadedAt: '2026-04-03', category: 'Guidelines' },
  { id: 'd9', title: 'CPD Policy for the Internal Audit Class', fileName: 'iac-cpd-policy.pdf', fileSize: '720 KB', status: 'processing', uploadedAt: '2026-04-16', category: 'Policy' },
  { id: 'd10', title: 'Management Response Template', fileName: 'management-response-template.pdf', fileSize: '410 KB', status: 'ready', uploadedAt: '2026-04-01', category: 'Templates' },
];

const INITIAL_CONVERSATIONS: ConversationEntry[] = [
  { id: 'c1', userQuestion: 'How do I check if an auditor is genuinely registered?', botAnswer: 'You can search the IAC registry by name or staff ID on the Registry page. Verified auditors show their credentials and CPD standing...', rating: 5, timestamp: '2026-04-17T09:15:00', resolved: true },
  { id: 'c2', userQuestion: 'I want to submit an RTI request', botAnswer: 'Under the Right to Information Act, 2019 (Act 989), you can request information held by the IAD. Visit our RTI page to get started...', rating: 4, timestamp: '2026-04-17T08:30:00', resolved: true },
  { id: 'c3', userQuestion: 'How do I report suspected fraud at an MDA?', botAnswer: 'Use the Report Fraud page — you will receive a reference number immediately and can track your report anonymously...', rating: 5, timestamp: '2026-04-16T16:45:00', resolved: true },
  { id: 'c4', userQuestion: 'Can I visit the office on Saturday?', botAnswer: 'The IAD is open Monday to Friday, 8:00 AM to 5:00 PM. We are closed on weekends and public holidays. However, I am available 24/7 right here!', rating: 5, timestamp: '2026-04-16T14:20:00', resolved: true },
  { id: 'c5', userQuestion: 'How do I verify a certificate an auditor showed me?', botAnswer: 'Every IAD certificate has a verify code. Enter it on the Certificate Verification page to confirm authenticity...', rating: 5, timestamp: '2026-04-16T11:00:00', resolved: true },
  { id: 'c6', userQuestion: 'How do I check my submission status?', botAnswer: 'Visit the Track Submission page and enter your reference number along with the email or phone you used...', rating: 4, timestamp: '2026-04-15T15:30:00', resolved: true },
  { id: 'c7', userQuestion: 'Our MDA needs help with internal controls, who do we ask?', botAnswer: 'The IAD offers consultancy on internal controls, risk management and governance. Submit a request on the Consultancy page...', rating: null, timestamp: '2026-04-15T10:15:00', resolved: true },
  { id: 'c8', userQuestion: 'Someone asked me to pay for IAC registration, is that legitimate?', botAnswer: 'The IAD never charges fees for registry services through individuals. Please report this through the Report Fraud page immediately...', rating: 5, timestamp: '2026-04-14T13:45:00', resolved: true },
  { id: 'c9', userQuestion: 'What CPD do I need to stay on the registry?', botAnswer: 'IAC members are expected to earn CPD points each year through recognised training, conferences and professional courses. Your CPD record is maintained by the IAD and displayed on your public registry profile once verified. Recognised providers include the IIA, ICA-GH and ACCA. Would you like details on how points are recorded?', rating: 4, timestamp: '2026-04-14T10:20:00', resolved: true },
  { id: 'c10', userQuestion: 'How long does a special audit request take?', botAnswer: 'Special audit requests are reviewed within 10 working days. If approved, scoping begins with your MDA and the engagement is scheduled into the quarterly plan. Complex or multi-agency requests may take longer — you can track progress any time with your reference number.', rating: 4, timestamp: '2026-04-13T14:05:00', resolved: true },
  { id: 'c11', userQuestion: 'What law governs internal audit in Ghana?', botAnswer: 'The Internal Audit Agency Act, 2003 (Act 658) provides the legal basis for internal auditing in the public service, supported by the Public Financial Management Act, 2016 (Act 921). Auditors also follow the IIA\'s International Professional Practices Framework.', rating: 5, timestamp: '2026-04-13T09:30:00', resolved: true },
  { id: 'c12', userQuestion: 'Who sees my fraud report?', botAnswer: 'Fraud reports are confidential and accessible only to the assigned review team. If you report anonymously, keep your reference number safe — it is the only way to follow up. The IAD does not disclose reporter identities to the MDA concerned.', rating: 5, timestamp: '2026-04-12T11:15:00', resolved: true },
];

/* ── Stat card data ── */
const STATS = [
  { label: 'Knowledge Entries', value: '20', icon: Brain, color: 'bg-emerald-50 text-emerald-700 border-emerald-100', iconBg: 'bg-emerald-100', iconColor: 'text-emerald-600' },
  { label: 'Documents', value: '10', icon: FileText, color: 'bg-blue-50 text-blue-700 border-blue-100', iconBg: 'bg-blue-100', iconColor: 'text-blue-600' },
  { label: 'Conversations', value: '12', icon: MessageCircle, color: 'bg-violet-50 text-violet-700 border-violet-100', iconBg: 'bg-violet-100', iconColor: 'text-violet-600' },
  { label: 'Avg Rating', value: '4.6 / 5', icon: BarChart3, color: 'bg-amber-50 text-amber-700 border-amber-100', iconBg: 'bg-amber-100', iconColor: 'text-amber-600' },
] as const;

/* ── Main Page ── */
export default function AiTrainingPage() {
  const [activeTab, setActiveTab] = useState<TabId>('knowledge');

  return (
    <div>
      <DemoBanner message="Sample knowledge base, documents and conversations — not yet wired to a live AI backend." />
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-accent-light flex items-center justify-center">
            <Bot className="h-5 w-5 text-primary-dark" />
          </div>
          <div>
            <h1 className="text-2xl font-display font-bold text-primary-dark">Lexi Training Hub</h1>
            <p className="text-sm text-text-muted">Ask Lexi &mdash; IAD Live Engagement &amp; eXpert Intelligence AI Bot</p>
          </div>
        </div>
      </div>

      {/* Stats summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {STATS.map((stat) => (
          <div
            key={stat.label}
            className={cn('rounded-2xl border-2 p-5 flex items-center gap-4', stat.color)}
          >
            <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center shrink-0', stat.iconBg)}>
              <stat.icon className={cn('h-5 w-5', stat.iconColor)} aria-hidden="true" />
            </div>
            <div>
              <p className="text-xl font-bold leading-none">{stat.value}</p>
              <p className="text-[11px] font-medium mt-1 opacity-80">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl border-2 border-border/40 p-1.5 mb-8 overflow-x-auto">
        <div className="flex gap-1 min-w-max">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 whitespace-nowrap',
                  isActive
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-text-muted hover:text-primary-dark hover:bg-primary/5',
                )}
              >
                <tab.icon className="h-4 w-4" aria-hidden="true" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab content */}
      {activeTab === 'knowledge' && <KnowledgeBaseTab />}
      {activeTab === 'documents' && <DocumentsTab />}
      {activeTab === 'conversations' && <ConversationsTab />}
      {activeTab === 'settings' && <SettingsTab />}
    </div>
  );
}

/* ══════════════════════════════════════════
   Knowledge Base Tab
   ══════════════════════════════════════════ */
function KnowledgeBaseTab() {
  const [entries, setEntries] = useState<KnowledgeEntry[]>(INITIAL_KNOWLEDGE);
  const [search, setSearch] = useState('');
  const [editingEntry, setEditingEntry] = useState<KnowledgeEntry | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ question: '', answer: '', category: 'General' });

  const filtered = entries.filter(
    (e) =>
      e.question.toLowerCase().includes(search.toLowerCase()) ||
      e.answer.toLowerCase().includes(search.toLowerCase()) ||
      e.category.toLowerCase().includes(search.toLowerCase()),
  );

  const handleCreate = () => {
    if (!formData.question.trim() || !formData.answer.trim()) return;
    const newEntry: KnowledgeEntry = {
      id: `k-${Date.now()}`,
      question: formData.question,
      answer: formData.answer,
      category: formData.category,
      updatedAt: new Date().toISOString().slice(0, 10),
    };
    setEntries((prev) => [newEntry, ...prev]);
    setFormData({ question: '', answer: '', category: 'General' });
    setShowForm(false);
  };

  const handleEdit = () => {
    if (!editingEntry) return;
    setEntries((prev) => prev.map((e) => (e.id === editingEntry.id ? editingEntry : e)));
    setEditingEntry(null);
  };

  const handleDelete = (id: string) => {
    setEntries((prev) => prev.filter((e) => e.id !== id));
  };

  const categories = [
    'General', 'Internal Audit', 'Audit Process', 'RTI', 'Registry', 'Services',
    'Contact', 'Standards', 'Legal', 'Fraud Reporting', 'CPD', 'Certificates',
  ];

  return (
    <div>
      {/* Actions bar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted/40" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search knowledge base..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border-2 border-border/40 text-sm focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all"
          />
        </div>
        <button
          onClick={() => { setShowForm(true); setEditingEntry(null); }}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary-light transition-colors"
        >
          <Plus className="h-4 w-4" /> Add Entry
        </button>
      </div>

      {/* Create / Edit Form */}
      {(showForm || editingEntry) && (
        <div className="bg-white rounded-2xl border-2 border-primary/20 p-6 mb-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-primary-dark">{editingEntry ? 'Edit Entry' : 'New Knowledge Entry'}</h3>
            <button onClick={() => { setShowForm(false); setEditingEntry(null); }} className="text-text-muted hover:text-primary-dark"><X className="h-5 w-5" /></button>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-muted mb-1">Question</label>
              <input
                type="text"
                value={editingEntry ? editingEntry.question : formData.question}
                onChange={(e) => editingEntry ? setEditingEntry({ ...editingEntry, question: e.target.value }) : setFormData({ ...formData, question: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border-2 border-border/40 text-sm focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10"
                placeholder="What question should this answer?"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-muted mb-1">Answer</label>
              <textarea
                value={editingEntry ? editingEntry.answer : formData.answer}
                onChange={(e) => editingEntry ? setEditingEntry({ ...editingEntry, answer: e.target.value }) : setFormData({ ...formData, answer: e.target.value })}
                rows={4}
                className="w-full px-4 py-2.5 rounded-xl border-2 border-border/40 text-sm focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10 resize-none"
                placeholder="The verified answer..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-muted mb-1">Category</label>
              <select
                value={editingEntry ? editingEntry.category : formData.category}
                onChange={(e) => editingEntry ? setEditingEntry({ ...editingEntry, category: e.target.value }) : setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border-2 border-border/40 text-sm focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10 bg-white"
              >
                {categories.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="flex justify-end gap-3">
              <button onClick={() => { setShowForm(false); setEditingEntry(null); }} className="px-5 py-2.5 rounded-xl border-2 border-border/40 text-sm font-medium text-text-muted hover:bg-gray-50 transition-colors">Cancel</button>
              <button
                onClick={editingEntry ? handleEdit : handleCreate}
                className="px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary-light transition-colors"
              >
                {editingEntry ? 'Save Changes' : 'Create Entry'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Entries list */}
      <div className="space-y-3">
        {filtered.map((entry) => (
          <div key={entry.id} className="bg-white rounded-2xl border-2 border-border/40 p-5 hover:border-primary/20 transition-colors">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-primary/10 text-primary">{entry.category}</span>
                  <span className="text-[10px] text-text-muted/50">{entry.updatedAt}</span>
                </div>
                <h4 className="font-semibold text-primary-dark text-sm mb-1">{entry.question}</h4>
                <p className="text-sm text-text-muted line-clamp-2">{entry.answer}</p>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={() => { setEditingEntry(entry); setShowForm(false); }}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-text-muted/50 hover:text-primary hover:bg-primary/5 transition-colors"
                  title="Edit"
                >
                  <Pencil className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(entry.id)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-text-muted/50 hover:text-red-600 hover:bg-red-50 transition-colors"
                  title="Delete"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-12 text-text-muted/50 text-sm">No entries found matching your search.</div>
        )}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   Documents Tab
   ══════════════════════════════════════════ */
function DocumentsTab() {
  const [documents] = useState<DocumentEntry[]>(INITIAL_DOCUMENTS);

  const statusConfig = {
    ready: { label: 'Ready', icon: CheckCircle2, color: 'bg-green-100 text-green-800' },
    processing: { label: 'Processing', icon: Clock, color: 'bg-yellow-100 text-yellow-800' },
    error: { label: 'Error', icon: AlertCircle, color: 'bg-red-100 text-red-800' },
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-text-muted">Documents uploaded to feed Lexi&apos;s knowledge base.</p>
        <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary-light transition-colors">
          <Upload className="h-4 w-4" /> Upload Document
        </button>
      </div>

      <div className="bg-white rounded-2xl border-2 border-border/40 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-border/30">
              <th className="text-left px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-text-muted/50">Document</th>
              <th className="text-left px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-text-muted/50">Category</th>
              <th className="text-left px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-text-muted/50">Size</th>
              <th className="text-left px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-text-muted/50">Status</th>
              <th className="text-left px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-text-muted/50">Uploaded</th>
            </tr>
          </thead>
          <tbody>
            {documents.map((doc) => {
              const sc = statusConfig[doc.status];
              return (
                <tr key={doc.id} className="border-b border-border/20 last:border-0 hover:bg-gray-50/50 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-primary/5 flex items-center justify-center shrink-0">
                        <FileText className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-primary-dark">{doc.title}</p>
                        <p className="text-[11px] text-text-muted/50">{doc.fileName}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-xs text-text-muted">{doc.category}</span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-xs text-text-muted">{doc.fileSize}</span>
                  </td>
                  <td className="px-5 py-4">
                    <span className={cn('inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium', sc.color)}>
                      <sc.icon className="h-3 w-3" />
                      {sc.label}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-xs text-text-muted">{doc.uploadedAt}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   Conversations Tab
   ══════════════════════════════════════════ */
function ConversationsTab() {
  const [conversations] = useState<ConversationEntry[]>(INITIAL_CONVERSATIONS);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-text-muted">Recent public conversations for review and quality assurance.</p>
        <div className="flex items-center gap-2 text-xs text-text-muted/50">
          <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
          <span>{conversations.filter((c) => c.resolved).length}/{conversations.length} resolved</span>
        </div>
      </div>

      <div className="space-y-3">
        {conversations.map((conv) => (
          <div key={conv.id} className="bg-white rounded-2xl border-2 border-border/40 p-5 hover:border-primary/20 transition-colors">
            <div className="flex items-start justify-between gap-4 mb-3">
              <div className="flex items-center gap-2">
                {conv.resolved ? (
                  <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" />
                ) : (
                  <Clock className="h-4 w-4 text-yellow-500 shrink-0" />
                )}
                <span className="text-[10px] text-text-muted/50">
                  {new Date(conv.timestamp).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                  {' '}
                  {new Date(conv.timestamp).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              {conv.rating !== null && (
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={cn('h-3 w-3', i < conv.rating! ? 'fill-accent text-accent' : 'text-gray-200')}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* User question */}
            <div className="flex gap-3 mb-2">
              <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-[9px] font-bold text-primary">U</span>
              </div>
              <p className="text-sm font-medium text-primary-dark">{conv.userQuestion}</p>
            </div>

            {/* Bot answer */}
            <div className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center shrink-0 mt-0.5">
                <Bot className="h-3 w-3 text-accent" />
              </div>
              <p className="text-sm text-text-muted line-clamp-2">{conv.botAnswer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   Settings Tab
   ══════════════════════════════════════════ */
function SettingsTab() {
  const [settings, setSettings] = useState({
    botName: 'Lexi',
    botFullName: 'IAD Live Engagement & eXpert Intelligence AI Bot',
    greetingStyle: 'time-based',
    responseLength: 'detailed',
    personality: 'warm',
    signOff: 'Integrity • Accountability • Assurance',
    enableEmoji: true,
    enableFollowUp: true,
  });

  return (
    <div>
      <p className="text-sm text-text-muted mb-6">Configure Lexi&apos;s personality and behaviour settings.</p>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Bot Name */}
        <div className="bg-white rounded-2xl border-2 border-border/40 p-6">
          <label className="block text-sm font-semibold text-primary-dark mb-2">Bot Name</label>
          <input
            type="text"
            value={settings.botName}
            onChange={(e) => setSettings({ ...settings, botName: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border-2 border-border/40 text-sm focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10"
          />
          <p className="text-[11px] text-text-muted/50 mt-2">The short name displayed to users in the chat interface.</p>
        </div>

        {/* Bot Full Name / Description */}
        <div className="bg-white rounded-2xl border-2 border-border/40 p-6">
          <label className="block text-sm font-semibold text-primary-dark mb-2">Full Name / Description</label>
          <input
            type="text"
            value={settings.botFullName}
            onChange={(e) => setSettings({ ...settings, botFullName: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border-2 border-border/40 text-sm focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10"
          />
          <p className="text-[11px] text-text-muted/50 mt-2">The full descriptive name shown on the about/welcome screen.</p>
        </div>

        {/* Greeting Style */}
        <div className="bg-white rounded-2xl border-2 border-border/40 p-6">
          <label className="block text-sm font-semibold text-primary-dark mb-2">Greeting Style</label>
          <select
            value={settings.greetingStyle}
            onChange={(e) => setSettings({ ...settings, greetingStyle: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border-2 border-border/40 text-sm focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10 bg-white"
          >
            <option value="time-based">Time-based (Good morning/afternoon/evening)</option>
            <option value="formal">Formal (Welcome to the IAD)</option>
            <option value="casual">Casual (Hey there!)</option>
            <option value="ghanaian">Ghanaian (Akwaaba!)</option>
          </select>
          <p className="text-[11px] text-text-muted/50 mt-2">How Lexi greets users when they first open the chat.</p>
        </div>

        {/* Response Length */}
        <div className="bg-white rounded-2xl border-2 border-border/40 p-6">
          <label className="block text-sm font-semibold text-primary-dark mb-2">Response Length</label>
          <select
            value={settings.responseLength}
            onChange={(e) => setSettings({ ...settings, responseLength: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border-2 border-border/40 text-sm focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10 bg-white"
          >
            <option value="concise">Concise (short, direct answers)</option>
            <option value="detailed">Detailed (comprehensive with context)</option>
            <option value="verbose">Verbose (in-depth explanations)</option>
          </select>
          <p className="text-[11px] text-text-muted/50 mt-2">Controls how detailed Lexi&apos;s responses are.</p>
        </div>

        {/* Personality */}
        <div className="bg-white rounded-2xl border-2 border-border/40 p-6">
          <label className="block text-sm font-semibold text-primary-dark mb-2">Personality</label>
          <select
            value={settings.personality}
            onChange={(e) => setSettings({ ...settings, personality: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border-2 border-border/40 text-sm focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10 bg-white"
          >
            <option value="warm">Warm & Friendly (Ghanaian flavour)</option>
            <option value="professional">Professional (formal tone)</option>
            <option value="neutral">Neutral (balanced)</option>
          </select>
          <p className="text-[11px] text-text-muted/50 mt-2">The overall tone and warmth of Lexi&apos;s communication.</p>
        </div>

        {/* Sign Off */}
        <div className="bg-white rounded-2xl border-2 border-border/40 p-6">
          <label className="block text-sm font-semibold text-primary-dark mb-2">Sign-off Message</label>
          <input
            type="text"
            value={settings.signOff}
            onChange={(e) => setSettings({ ...settings, signOff: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border-2 border-border/40 text-sm focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10"
          />
          <p className="text-[11px] text-text-muted/50 mt-2">The closing message when users say goodbye.</p>
        </div>

        {/* Toggles */}
        <div className="bg-white rounded-2xl border-2 border-border/40 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-primary-dark">Enable Emoji</p>
              <p className="text-[11px] text-text-muted/50">Allow Lexi to use emoji in responses.</p>
            </div>
            <button
              onClick={() => setSettings({ ...settings, enableEmoji: !settings.enableEmoji })}
              className={cn(
                'w-11 h-6 rounded-full transition-colors relative',
                settings.enableEmoji ? 'bg-primary' : 'bg-gray-200',
              )}
            >
              <span className={cn('absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform', settings.enableEmoji ? 'left-[22px]' : 'left-0.5')} />
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-primary-dark">Enable Follow-up Questions</p>
              <p className="text-[11px] text-text-muted/50">Lexi asks follow-up questions to clarify intent.</p>
            </div>
            <button
              onClick={() => setSettings({ ...settings, enableFollowUp: !settings.enableFollowUp })}
              className={cn(
                'w-11 h-6 rounded-full transition-colors relative',
                settings.enableFollowUp ? 'bg-primary' : 'bg-gray-200',
              )}
            >
              <span className={cn('absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform', settings.enableFollowUp ? 'left-[22px]' : 'left-0.5')} />
            </button>
          </div>
        </div>
      </div>

      {/* Save */}
      <div className="flex justify-end mt-6">
        <button className="px-6 py-2.5 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary-light transition-colors">
          Save Settings
        </button>
      </div>
    </div>
  );
}

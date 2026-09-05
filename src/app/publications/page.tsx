'use client';

import { useState } from 'react';
import { PageHero } from '@/components/layout/page-hero';
import { FloatingShapes } from '@/components/home/floating-shapes';
import { KenteSectionDivider } from '@/components/kente/kente-section-divider';
import { cn } from '@/lib/utils';
import {
  FileText,
  Download,
  Search,
  BookOpen,
  Scale,
  ClipboardList,
  FolderOpen,
  Calendar,
  FileIcon,
} from 'lucide-react';

type CategoryKey = 'all' | 'report' | 'plan' | 'policy' | 'manual';

const CATEGORIES: { key: CategoryKey; label: string; icon: typeof FileText; gradient: string; count: number }[] = [
  { key: 'all', label: 'All Documents', icon: FolderOpen, gradient: 'from-primary to-emerald-600', count: 14 },
  { key: 'report', label: 'Audit Reports', icon: BookOpen, gradient: 'from-blue-500 to-indigo-600', count: 4 },
  { key: 'plan', label: 'Annual Plans', icon: Calendar, gradient: 'from-amber-500 to-yellow-600', count: 3 },
  { key: 'policy', label: 'Policies & Charters', icon: Scale, gradient: 'from-rose-500 to-pink-600', count: 3 },
  { key: 'manual', label: 'Manuals & Templates', icon: ClipboardList, gradient: 'from-purple-500 to-violet-600', count: 4 },
];

interface SampleDoc {
  id: number;
  title: string;
  category: CategoryKey;
  description: string;
  fileType: string;
  fileSize: string;
  date: string;
}

// TODO(rebrand): replace with real departmental publications and file URLs.
const SAMPLE_DOCS: SampleDoc[] = [
  // Audit Reports
  { id: 1, title: '2025 Annual Consolidated Audit Report', category: 'report', description: 'Consolidated report of internal audit activities and findings across MDAs for 2025.', fileType: 'PDF', fileSize: '3.6 MB', date: '30 Mar 2026' },
  { id: 2, title: 'Special Audit Report — Procurement Controls Review', category: 'report', description: 'Findings and recommendations from a special audit of procurement controls and processes.', fileType: 'PDF', fileSize: '1.9 MB', date: '18 Feb 2026' },
  { id: 3, title: '2025 Q4 Internal Audit Activity Report', category: 'report', description: 'Quarterly summary of audits completed, findings raised, and recommendations resolved.', fileType: 'PDF', fileSize: '1.2 MB', date: '15 Jan 2026' },
  { id: 4, title: 'Follow-Up Report on Implementation of Audit Recommendations', category: 'report', description: 'Status of management action on previously issued audit findings and recommendations.', fileType: 'PDF', fileSize: '980 KB', date: '20 Nov 2025' },
  // Annual Plans
  { id: 5, title: '2026 Annual Audit Plan', category: 'plan', description: 'Risk-based annual audit plan for the 2026 fiscal year covering OHCS and co-ordinated IAUs.', fileType: 'PDF', fileSize: '1.4 MB', date: '31 Jan 2026' },
  { id: 6, title: '2026 Internal Audit Class Training Calendar', category: 'plan', description: 'Schedule of training and professional development programmes for internal auditors.', fileType: 'PDF', fileSize: '620 KB', date: '20 Jan 2026' },
  { id: 7, title: '2025 Annual Audit Plan', category: 'plan', description: 'Risk-based annual audit plan for the 2025 fiscal year.', fileType: 'PDF', fileSize: '1.3 MB', date: '28 Jan 2025' },
  // Policies & Charters
  { id: 8, title: 'Internal Audit Charter', category: 'policy', description: 'Charter establishing the purpose, authority, and responsibility of the internal audit function.', fileType: 'PDF', fileSize: '540 KB', date: '10 Dec 2025' },
  { id: 9, title: 'Whistleblowing & Fraud Reporting Policy', category: 'policy', description: 'Policy on reporting fraud, abuse, and waste, including whistleblower protections under Act 720.', fileType: 'PDF', fileSize: '480 KB', date: '5 Oct 2025' },
  { id: 10, title: 'IAD Client Service Charter', category: 'policy', description: 'Standards of service that MDAs and stakeholders can expect from the Internal Audit Department.', fileType: 'PDF', fileSize: '390 KB', date: '14 Oct 2024' },
  // Manuals & Templates
  { id: 11, title: 'Internal Audit Manual for MDAs', category: 'manual', description: 'Standard working manual guiding the operations of Internal Audit Units in MDAs.', fileType: 'PDF', fileSize: '2.4 MB', date: '12 Dec 2025' },
  { id: 12, title: 'Audit Workpaper Template Pack', category: 'manual', description: 'Standard templates for audit planning memoranda, workpapers, and finding sheets.', fileType: 'DOCX', fileSize: '310 KB', date: '8 Jan 2026' },
  { id: 13, title: 'Risk Assessment Matrix Template', category: 'manual', description: 'Template for scoring and prioritising audit universe risks during annual planning.', fileType: 'XLSX', fileSize: '120 KB', date: '8 Jan 2026' },
  { id: 14, title: 'Audit Report Template & Style Guide', category: 'manual', description: 'Standard format and style guide for internal audit reports issued to management.', fileType: 'DOCX', fileSize: '260 KB', date: '14 Oct 2024' },
];

const FILE_TYPE_COLORS: Record<string, string> = {
  PDF: 'bg-red-100 text-red-700',
  DOCX: 'bg-blue-100 text-blue-700',
  XLSX: 'bg-green-100 text-green-700',
};

export default function PublicationsPage() {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 12;

  const filtered = SAMPLE_DOCS
    .filter((doc) => {
      const matchesCategory = activeCategory === 'all' || doc.category === activeCategory;
      const matchesSearch = !searchQuery || doc.title.toLowerCase().includes(searchQuery.toLowerCase()) || doc.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handleCategoryChange = (key: CategoryKey) => {
    setActiveCategory(key);
    setCurrentPage(1);
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  return (
    <>
      <PageHero
        title="Publications & Downloads"
        subtitle="Access audit reports, annual plans, policies and charters, and manuals and templates from the Internal Audit Department."
        breadcrumbs={[{ label: 'Publications' }]}
        accent="gold"
      >
        <div className="flex flex-wrap gap-3 mt-2">
          <div className="flex items-center gap-2 bg-white/[0.08] backdrop-blur-sm border border-white/10 rounded-full px-4 py-2">
            <FileText className="h-4 w-4 text-accent" aria-hidden="true" />
            <span className="text-sm text-white/60">Official documents only</span>
          </div>
          <div className="flex items-center gap-2 bg-white/[0.08] backdrop-blur-sm border border-white/10 rounded-full px-4 py-2">
            <Download className="h-4 w-4 text-accent" aria-hidden="true" />
            <span className="text-sm text-white/60">Free to download</span>
          </div>
        </div>
      </PageHero>

      <KenteSectionDivider />

      {/* ── Category Cards ── */}
      <section className="py-16 lg:py-20 bg-white relative overflow-hidden">
        <FloatingShapes />
        <div className="relative max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.key}
                type="button"
                onClick={() => handleCategoryChange(cat.key)}
                className={cn(
                  'group flex flex-col items-center p-5 rounded-2xl border-2 transition-all duration-300 text-center',
                  activeCategory === cat.key
                    ? 'border-primary bg-primary/5 shadow-md'
                    : 'border-border/40 bg-white hover:border-primary/20 hover:shadow-sm hover:-translate-y-0.5',
                )}
              >
                <div className={cn(
                  'w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center mb-3 shadow-sm transition-transform duration-300',
                  activeCategory === cat.key ? 'scale-110' : 'group-hover:scale-105',
                  cat.gradient,
                )}>
                  <cat.icon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <span className={cn(
                  'text-sm font-semibold mb-1',
                  activeCategory === cat.key ? 'text-primary-dark' : 'text-text-muted',
                )}>
                  {cat.label}
                </span>
                <span className={cn(
                  'text-xs',
                  activeCategory === cat.key ? 'text-primary' : 'text-text-muted/50',
                )}>
                  {cat.count} documents
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Search + Document List ── */}
      <section className="py-12 lg:py-16 relative overflow-hidden" style={{ backgroundColor: '#FFF8F0' }}>
        <FloatingShapes />
        <div className="relative max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search bar */}
          <div className="mb-10">
            <div className="relative max-w-xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-text-muted/40" aria-hidden="true" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder="Search publications by title or keyword..."
                className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-border/60 bg-white text-base focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-text-muted hover:text-primary-dark transition-colors"
                >
                  Clear
                </button>
              )}
            </div>
            <p className="text-sm text-text-muted mt-3">
              Showing {Math.min((currentPage - 1) * ITEMS_PER_PAGE + 1, filtered.length)}–{Math.min(currentPage * ITEMS_PER_PAGE, filtered.length)} of {filtered.length} document{filtered.length !== 1 ? 's' : ''}
              {activeCategory !== 'all' && ` in ${CATEGORIES.find((c) => c.key === activeCategory)?.label}`}
              {totalPages > 1 && ` • Page ${currentPage} of ${totalPages}`}
            </p>
          </div>

          {/* Document cards */}
          <div className="space-y-4">
            {paginated.map((doc) => (
              <div
                key={doc.id}
                className="group bg-white rounded-2xl border-2 border-border/40 p-6 flex flex-col sm:flex-row sm:items-center gap-5 hover:border-primary/20 hover:shadow-lg transition-all duration-300"
              >
                {/* File type badge */}
                <div className="flex items-center gap-4 sm:w-20 shrink-0">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                    <FileIcon className="h-6 w-6 text-primary" aria-hidden="true" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <span className={cn('text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md', FILE_TYPE_COLORS[doc.fileType] ?? 'bg-gray-100 text-gray-700')}>
                      {doc.fileType}
                    </span>
                    <span className="text-xs text-text-muted/50">{doc.fileSize}</span>
                    <span className="text-xs text-text-muted/50">•</span>
                    <span className="text-xs text-text-muted/50 flex items-center gap-1">
                      <Calendar className="h-3 w-3" aria-hidden="true" />
                      {doc.date}
                    </span>
                  </div>
                  <h3 className="font-semibold text-base text-primary-dark mb-1 group-hover:text-primary transition-colors line-clamp-1">
                    {doc.title}
                  </h3>
                  <p className="text-sm text-text-muted line-clamp-1 leading-relaxed">
                    {doc.description}
                  </p>
                </div>

                {/* Download button */}
                <button
                  type="button"
                  className="shrink-0 flex items-center gap-2 px-5 py-3 rounded-xl bg-primary/5 border-2 border-primary/10 text-sm font-semibold text-primary hover:bg-primary hover:text-white hover:border-primary transition-all duration-200"
                >
                  <Download className="h-4 w-4" aria-hidden="true" />
                  Download
                </button>
              </div>
            ))}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 pt-8">
                <button
                  type="button"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className={cn(
                    'px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200',
                    currentPage === 1
                      ? 'text-text-muted/30 cursor-not-allowed'
                      : 'text-primary hover:bg-primary/5 border-2 border-primary/10 hover:border-primary/30',
                  )}
                >
                  Previous
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter((p) => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1)
                  .map((page, i, arr) => {
                    const prev = arr[i - 1];
                    const showEllipsis = prev !== undefined && page - prev > 1;
                    return (
                      <span key={page} className="flex items-center gap-2">
                        {showEllipsis && <span className="text-text-muted/30 px-1">...</span>}
                        <button
                          type="button"
                          onClick={() => setCurrentPage(page)}
                          className={cn(
                            'w-10 h-10 rounded-xl text-sm font-semibold transition-all duration-200',
                            page === currentPage
                              ? 'bg-primary text-white shadow-md'
                              : 'text-text-muted hover:bg-primary/5 border-2 border-border/40 hover:border-primary/20',
                          )}
                        >
                          {page}
                        </button>
                      </span>
                    );
                  })}

                <button
                  type="button"
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className={cn(
                    'px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200',
                    currentPage === totalPages
                      ? 'text-text-muted/30 cursor-not-allowed'
                      : 'text-primary hover:bg-primary/5 border-2 border-primary/10 hover:border-primary/30',
                  )}
                >
                  Next
                </button>
              </div>
            )}

            {filtered.length === 0 && (
              <div className="text-center py-16">
                <FolderOpen className="h-12 w-12 text-text-muted/30 mx-auto mb-4" aria-hidden="true" />
                <h3 className="font-semibold text-lg text-text-muted mb-2">No documents found</h3>
                <p className="text-base text-text-muted/60">
                  Try adjusting your search or category filter.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

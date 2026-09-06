import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { KnowledgeBrowser } from '@/components/knowledge/knowledge-browser';
import type { KnowledgeItem } from '@/lib/knowledge-api';

function makeItem(overrides: Partial<KnowledgeItem>): KnowledgeItem {
  return {
    id: 'doc-1',
    slug: 'internal-audit-manual',
    title: 'Internal Audit Manual for MDAs',
    summary: 'Standard working manual guiding Internal Audit Units in MDAs.',
    category: 'manual',
    tags: ['manual', 'procedures'],
    download_count: 42,
    published_at: '2026-01-15T00:00:00.000Z',
    current_file: {
      version: 2,
      file_name: 'internal-audit-manual.pdf',
      file_size: 2_400_000,
      mime: 'application/pdf',
    },
    ...overrides,
  };
}

const ITEMS: KnowledgeItem[] = [
  makeItem({ id: 'doc-1' }),
  makeItem({
    id: 'doc-2',
    slug: 'risk-matrix-template',
    title: 'Risk Assessment Matrix Template',
    summary: 'Template for scoring audit universe risks.',
    category: 'template',
    tags: [],
    download_count: 7,
    current_file: {
      version: 1,
      file_name: 'risk-matrix.xlsx',
      file_size: 120_000,
      mime: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    },
  }),
];

function listResponse(items: KnowledgeItem[], total = items.length, page = 1, pageSize = 12) {
  return {
    ok: true,
    status: 200,
    json: () => Promise.resolve({ data: items, meta: { page, pageSize, total } }),
  } as Response;
}

function mockFetchOnce(response: Partial<Response>) {
  return vi.fn().mockResolvedValue({ json: () => Promise.resolve(null), ...response } as Response);
}

describe('KnowledgeBrowser (public)', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', mockFetchOnce(listResponse(ITEMS)));
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('renders items returned by the API', async () => {
    render(<KnowledgeBrowser mode="public" />);
    expect(await screen.findByText('Internal Audit Manual for MDAs')).toBeInTheDocument();
    expect(screen.getByText('Risk Assessment Matrix Template')).toBeInTheDocument();
    // Category badges, file chip, download count
    expect(screen.getAllByText('Manual').length).toBeGreaterThan(0);
    expect(screen.getByText(/PDF • 2\.3 MB/)).toBeInTheDocument();
    expect(screen.getByText('42 downloads')).toBeInTheDocument();
  });

  it('calls the public knowledge endpoint with default pagination', async () => {
    render(<KnowledgeBrowser mode="public" />);
    await screen.findByText('Internal Audit Manual for MDAs');
    const url = (fetch as ReturnType<typeof vi.fn>).mock.calls[0]![0] as string;
    expect(url).toContain('/api/public/knowledge?');
    expect(url).toContain('page=1');
    expect(url).toContain('pageSize=12');
  });

  it('links downloads to the public download endpoint', async () => {
    render(<KnowledgeBrowser mode="public" />);
    const links = await screen.findAllByRole('link', { name: /download/i });
    expect(links[0]).toHaveAttribute('href', '/api/public/knowledge/doc-1/download');
  });

  it('filters by category via the API when a pill is clicked', async () => {
    render(<KnowledgeBrowser mode="public" />);
    await screen.findByText('Internal Audit Manual for MDAs');
    fireEvent.click(screen.getByRole('button', { name: 'Template' }));
    await waitFor(() => {
      const calls = (fetch as ReturnType<typeof vi.fn>).mock.calls;
      const last = calls[calls.length - 1]![0] as string;
      expect(last).toContain('category=template');
    });
  });

  it('shows the empty state when no documents match', async () => {
    vi.stubGlobal('fetch', mockFetchOnce(listResponse([], 0)));
    render(<KnowledgeBrowser mode="public" />);
    expect(await screen.findByText('No documents found')).toBeInTheDocument();
  });

  it('shows an error state with retry when the API fails', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
        json: () => Promise.resolve({ error: { code: 'X', message: 'boom' } }),
      } as Response),
    );
    render(<KnowledgeBrowser mode="public" />);
    expect(await screen.findByText('Documents could not be loaded')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Try again' })).toBeInTheDocument();
  });

  it('paginates via the API using meta.total', async () => {
    vi.stubGlobal('fetch', mockFetchOnce(listResponse(ITEMS, 30)));
    render(<KnowledgeBrowser mode="public" />);
    await screen.findByText('Internal Audit Manual for MDAs');
    fireEvent.click(screen.getByRole('button', { name: '3' }));
    await waitFor(() => {
      const calls = (fetch as ReturnType<typeof vi.fn>).mock.calls;
      const last = calls[calls.length - 1]![0] as string;
      expect(last).toContain('page=3');
    });
  });

  it('shows a disabled state instead of a download link when current_file is null', async () => {
    vi.stubGlobal(
      'fetch',
      mockFetchOnce(listResponse([makeItem({ id: 'doc-9', current_file: null })])),
    );
    render(<KnowledgeBrowser mode="public" />);
    expect(await screen.findByText('File coming soon')).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /download/i })).toBeNull();
  });
});

describe('KnowledgeBrowser (portal)', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('calls the portal endpoint and shows the MDA-only badge', async () => {
    vi.stubGlobal(
      'fetch',
      mockFetchOnce(
        listResponse([makeItem({ id: 'doc-mda', title: 'MDA Circular 2026', audience: 'mda' })]),
      ),
    );
    render(<KnowledgeBrowser mode="portal" />);
    expect(await screen.findByText('MDA Circular 2026')).toBeInTheDocument();
    expect(screen.getByText('MDA only')).toBeInTheDocument();
    const url = (fetch as ReturnType<typeof vi.fn>).mock.calls[0]![0] as string;
    expect(url).toContain('/api/portal/knowledge?');
    const link = screen.getByRole('link', { name: /download/i });
    expect(link).toHaveAttribute('href', '/api/portal/knowledge/doc-mda/download');
  });
});

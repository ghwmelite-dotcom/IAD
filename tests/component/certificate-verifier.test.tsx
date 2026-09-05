import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { CertificateVerifier } from '@/components/registry/certificate-verifier';

vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: Record<string, unknown>) => (
    <a href={href as string} {...props}>{children as React.ReactNode}</a>
  ),
}));

vi.mock('next/navigation', () => ({
  useSearchParams: () => new URLSearchParams(''),
}));

function mockFetchResponse(body: unknown, ok = true, status = 200) {
  return vi.fn().mockResolvedValue({
    ok,
    status,
    statusText: ok ? 'OK' : 'Error',
    json: () => Promise.resolve(body),
  } as unknown as Response);
}

describe('CertificateVerifier', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', mockFetchResponse({ data: { valid: false } }));
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('disables the submit button while the code input is empty', () => {
    render(<CertificateVerifier />);
    const button = screen.getByRole('button', { name: /verify certificate/i });
    expect((button as HTMLButtonElement).disabled).toBe(true);
  });

  it('renders the valid result card with certificate details', async () => {
    vi.stubGlobal(
      'fetch',
      mockFetchResponse({
        data: {
          valid: true,
          title: 'IAD Certificate of Competence in Public Sector Auditing',
          serial: 'IAD-CERT-2025-0001',
          issuedAt: '2025-06-15T00:00:00.000Z',
          auditorName: 'Yaw Osei Frimpong',
        },
      }),
    );

    render(<CertificateVerifier />);
    fireEvent.change(screen.getByLabelText(/certificate verify code/i), {
      target: { value: 'SEEDCRT1' },
    });
    fireEvent.click(screen.getByRole('button', { name: /verify certificate/i }));

    await waitFor(() => {
      expect(screen.getByText('Certificate is valid')).toBeDefined();
    });
    expect(
      screen.getByText('IAD Certificate of Competence in Public Sector Auditing'),
    ).toBeDefined();
    expect(screen.getByText('IAD-CERT-2025-0001')).toBeDefined();
    expect(screen.getByText('Yaw Osei Frimpong')).toBeDefined();
  });

  it('renders the not-found result for an unknown code', async () => {
    render(<CertificateVerifier />);
    fireEvent.change(screen.getByLabelText(/certificate verify code/i), {
      target: { value: 'NOPE-123' },
    });
    fireEvent.click(screen.getByRole('button', { name: /verify certificate/i }));

    await waitFor(() => {
      expect(screen.getByText('Certificate not found')).toBeDefined();
    });
    expect(screen.getByText(/Contact IAD/)).toBeDefined();
  });

  it('shows an unavailable message when the service cannot be reached', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('network down')));

    render(<CertificateVerifier />);
    fireEvent.change(screen.getByLabelText(/certificate verify code/i), {
      target: { value: 'SEEDCRT1' },
    });
    fireEvent.click(screen.getByRole('button', { name: /verify certificate/i }));

    await waitFor(() => {
      expect(screen.getByText('Verification service unavailable')).toBeDefined();
    });
  });
});

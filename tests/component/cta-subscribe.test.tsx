import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { CtaSection } from '@/components/home/cta-section';

vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: Record<string, unknown>) => (
    <a href={href as string} {...props}>{children as React.ReactNode}</a>
  ),
}));

function mockFetchResponse(body: unknown, ok = true, status = 200) {
  return vi.fn().mockResolvedValue({
    ok,
    status,
    json: () => Promise.resolve(body),
  } as unknown as Response);
}

function fillAndSubmit(email = 'kofi.mensah@example.gov.gh') {
  fireEvent.change(screen.getByLabelText(/enter your email/i), { target: { value: email } });
  fireEvent.click(screen.getByRole('button', { name: /subscribe/i }));
}

describe('CtaSection newsletter subscribe', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', mockFetchResponse({ data: { subscribed: true, already: false } }, true, 201));
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('posts the email to the subscribe endpoint', async () => {
    render(<CtaSection />);
    fillAndSubmit();
    await waitFor(() => {
      expect(screen.getByText(/You're Subscribed!/)).toBeDefined();
    });
    const fetchMock = fetch as unknown as ReturnType<typeof vi.fn>;
    expect(fetchMock).toHaveBeenCalledWith(
      '/api/v1/subscribe',
      expect.objectContaining({ method: 'POST' }),
    );
    const body = JSON.parse((fetchMock.mock.calls[0]?.[1] as RequestInit).body as string);
    expect(body.email).toBe('kofi.mensah@example.gov.gh');
  });

  it('shows the success state after subscribing', async () => {
    render(<CtaSection />);
    fillAndSubmit();
    await waitFor(() => {
      expect(screen.getByText(/official IAD updates only/i)).toBeDefined();
    });
    expect(screen.getByText('kofi.mensah@example.gov.gh')).toBeDefined();
  });

  it('shows the already-subscribed state for duplicate emails', async () => {
    vi.stubGlobal('fetch', mockFetchResponse({ data: { subscribed: true, already: true } }));
    render(<CtaSection />);
    fillAndSubmit();
    await waitFor(() => {
      expect(screen.getByText(/already on the list/i)).toBeDefined();
    });
  });

  it('shows an error with retry when the request fails', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('network down')));
    render(<CtaSection />);
    fillAndSubmit();
    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeDefined();
    });
    expect(screen.getByText(/Please try again/i)).toBeDefined();
    expect(screen.getByRole('button', { name: /retry/i })).toBeDefined();

    // Retry recovers once the service is back.
    vi.stubGlobal('fetch', mockFetchResponse({ data: { subscribed: true, already: false } }, true, 201));
    fireEvent.click(screen.getByRole('button', { name: /retry/i }));
    await waitFor(() => {
      expect(screen.getByText(/You're Subscribed!/)).toBeDefined();
    });
  });

  it('shows an error on non-OK responses (e.g. rate limited)', async () => {
    vi.stubGlobal('fetch', mockFetchResponse({ error: { code: 'RATE_LIMITED' } }, false, 429));
    render(<CtaSection />);
    fillAndSubmit();
    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeDefined();
    });
  });
});

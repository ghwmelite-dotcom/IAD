'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import {
  ArrowUp,
  ArrowDown,
  Plus,
  Trash2,
  Upload,
  Save,
  Globe,
  Monitor,
  Smartphone,
  RefreshCw,
  Loader2,
} from 'lucide-react';
import { HeroPreview } from '@/components/admin/hero-preview';
import {
  defaultHeroSlides,
  heroManifestSchema,
  HERO_MAX_SLIDES,
  type HeroCopy,
  type HeroEditorState,
  type HeroSlide,
} from '@/lib/hero-slides';
import { loadHeroEditor, saveHeroEditor, uploadHeroImage } from '@/lib/hero-admin-api';
import { cn } from '@/lib/utils';

const INPUT =
  'mt-2 w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20';
const BUTTON =
  'inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-border bg-white px-4 py-2 text-sm font-semibold text-text hover:bg-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-50';
const CARD = 'rounded-xl border border-border bg-white p-5 sm:p-6';
const messageOf = (e: unknown) =>
  e instanceof Error ? e.message : 'Something went wrong. Please try again.';
function Field({
  label,
  value,
  onChange,
  required = false,
  maxLength = 500,
  multiline = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  maxLength?: number;
  multiline?: boolean;
}) {
  return (
    <label className="block text-sm font-semibold">
      {label}
      {multiline ? (
        <textarea
          className={INPUT}
          rows={3}
          value={value}
          required={required}
          maxLength={maxLength}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <input
          className={INPUT}
          value={value}
          required={required}
          maxLength={maxLength}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </label>
  );
}
export default function HeroManagerPage() {
  const [server, setServer] = useState<HeroEditorState | null>(null);
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [selected, setSelected] = useState('');
  const [language, setLanguage] = useState<'en' | 'fr'>('en');
  const [mode, setMode] = useState<'desktop' | 'mobile'>('desktop');
  const [busy, setBusy] = useState('');
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const formRef = useRef<HTMLFormElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const dirty = server !== null && JSON.stringify(slides) !== JSON.stringify(server.draft);
  const unpublished =
    server !== null && JSON.stringify(slides) !== JSON.stringify(server.published);
  const slide = slides.find((s) => s.id === selected) ?? slides[0];
  const copy = slide ? (slide.copy[language] ?? slide.copy.en) : null;
  function accept(data: HeroEditorState) {
    setServer(data);
    setSlides(data.draft);
    setSelected((previous) =>
      data.draft.some((s) => s.id === previous) ? previous : data.draft[0]!.id,
    );
  }
  useEffect(() => {
    let cancelled = false;
    loadHeroEditor()
      .then((data) => {
        if (!cancelled) accept(data);
      })
      .catch((e) => {
        if (!cancelled) setError(messageOf(e));
      });
    return () => {
      cancelled = true;
    };
  }, []);
  useEffect(() => {
    if (!dirty) return;
    const protect = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = '';
    };
    window.addEventListener('beforeunload', protect);
    return () => window.removeEventListener('beforeunload', protect);
  }, [dirty]);
  function patch(update: Partial<HeroSlide>) {
    if (!slide) return;
    setNotice('');
    setSlides((previous) => previous.map((s) => (s.id === slide.id ? { ...s, ...update } : s)));
  }
  function patchCopy(key: keyof HeroCopy, value: string) {
    if (slide && copy) patch({ copy: { ...slide.copy, [language]: { ...copy, [key]: value } } });
  }
  function move(index: number, delta: number) {
    setSlides((previous) => {
      const next = [...previous];
      [next[index], next[index + delta]] = [next[index + delta]!, next[index]!];
      return next;
    });
    setNotice('');
  }
  function addSlide() {
    const fresh = structuredClone(defaultHeroSlides()[0]!);
    fresh.id = crypto.randomUUID();
    fresh.enabled = false;
    fresh.copy.en = {
      label: 'New slide',
      title: 'Your slide headline',
      body: 'Add a short description for this slide.',
      buttonText: 'Read more',
      secondaryText: '',
    };
    fresh.copy.fr = null;
    fresh.buttonHref = '/about';
    fresh.secondaryHref = '';
    fresh.credit = '';
    fresh.creditUrl = '';
    setSlides((previous) => [...previous, fresh]);
    setSelected(fresh.id);
    setLanguage('en');
    setNotice('');
  }
  async function submit(action: 'save' | 'publish') {
    if (!server || !formRef.current?.reportValidity()) return;
    const parsed = heroManifestSchema.safeParse(slides);
    if (!parsed.success) {
      const issue = parsed.error.issues[0];
      const index = issue?.path[0];
      if (typeof index === 'number' && slides[index]) setSelected(slides[index]!.id);
      setError(
        `${issue?.path.join(' → ') ?? 'Slide'}: ${issue?.message ?? 'Check the slide details.'}`,
      );
      return;
    }
    if (action === 'publish' && !slides.some((s) => s.enabled)) {
      setError('Keep at least one slide enabled before publishing.');
      return;
    }
    setBusy(action);
    setError('');
    setNotice('');
    try {
      accept(await saveHeroEditor(parsed.data, server.revision, action));
      setNotice(
        action === 'publish'
          ? 'Published. The homepage updates on refresh or within one minute.'
          : 'Draft saved. The live homepage has not changed.',
      );
    } catch (e) {
      setError(messageOf(e));
    } finally {
      setBusy('');
    }
  }
  async function upload(file?: File) {
    if (!file || !slide || busy) return;
    const id = slide.id;
    setBusy('upload');
    setError('');
    setNotice('');
    try {
      const image = await uploadHeroImage(file);
      setSlides((previous) => previous.map((s) => (s.id === id ? { ...s, image } : s)));
      setNotice('Image uploaded. Preview it, then save a draft or publish when ready.');
    } catch (e) {
      setError(messageOf(e));
    } finally {
      setBusy('');
      if (fileRef.current) fileRef.current.value = '';
    }
  }
  async function reload() {
    if (dirty && !window.confirm('Discard unsaved changes and load the latest saved draft?'))
      return;
    setBusy('reload');
    setError('');
    try {
      accept(await loadHeroEditor());
      setNotice('Latest draft loaded.');
    } catch (e) {
      setError(messageOf(e));
    } finally {
      setBusy('');
    }
  }
  if (!server || !slide || !copy)
    return (
      <div className={cn(CARD, 'mx-auto max-w-2xl font-brand')}>
        {error ? (
          <>
            <h2 className="text-xl font-semibold">
              Hero management requires an authorised sign-in
            </h2>
            <p role="alert" className="mt-4 text-error">
              {error}
            </p>
            <p className="mt-4 text-sm text-text-muted">
              Use a magic-link session for an administrator, content manager or director. Demo
              accounts cannot publish.
            </p>
            <Link href="/admin/login/" className={cn(BUTTON, 'mt-6')}>
              Sign in
            </Link>
            <button className={cn(BUTTON, 'ml-3')} onClick={() => void reload()}>
              Try again
            </button>
          </>
        ) : (
          <p role="status" className="flex items-center gap-3">
            <Loader2 className="h-5 w-5 animate-spin" />
            Loading hero slides…
          </p>
        )}
      </div>
    );
  return (
    <div className="mx-auto max-w-[1440px] font-brand">
      <div className="mb-6 flex flex-wrap items-start justify-between gap-5">
        <div>
          <h2 className="font-display text-3xl font-bold">Homepage hero</h2>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-text-muted">
            Prepare images and copy in a draft. Publish when ready to update the homepage without a
            deployment.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <a href="/" target="_blank" rel="noreferrer" className={BUTTON}>
            View homepage
          </a>
          <button
            type="button"
            className={BUTTON}
            disabled={!!busy}
            onClick={() => void reload()}
            aria-label="Reload saved draft"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
          <button
            type="button"
            className={BUTTON}
            disabled={!!busy || !dirty}
            onClick={() => void submit('save')}
          >
            <Save className="h-4 w-4" />
            {busy === 'save' ? 'Saving…' : 'Save draft'}
          </button>
          <button
            type="button"
            className={cn(BUTTON, '!border-primary !bg-primary !text-white')}
            disabled={!!busy || !unpublished}
            onClick={() => void submit('publish')}
          >
            <Globe className="h-4 w-4" />
            {busy === 'publish' ? 'Publishing…' : 'Publish changes'}
          </button>
        </div>
      </div>
      <div className="mb-6 flex flex-wrap gap-x-6 gap-y-2 rounded-xl border border-border bg-white px-5 py-4 text-sm">
        <span className={cn('font-semibold', unpublished ? 'text-amber-800' : 'text-primary')}>
          {unpublished ? 'Unpublished changes' : 'Homepage is up to date'}
        </span>
        <span>
          {slides.filter((s) => s.enabled).length} enabled / {slides.length} slides
        </span>
        <span>Draft revision {server.revision}</span>
        {dirty && <span className="font-semibold text-amber-800">Unsaved edits</span>}
      </div>
      {error && (
        <p
          role="alert"
          className="mb-5 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-error"
        >
          {error}
        </p>
      )}
      {notice && (
        <p
          role="status"
          className="mb-5 rounded-lg border border-primary/20 bg-primary/5 p-4 text-sm text-primary"
        >
          {notice}
        </p>
      )}
      <div className="grid items-start gap-6 xl:grid-cols-[270px_minmax(0,1fr)]">
        <aside className={cn(CARD, 'min-w-0')} aria-label="Slide order">
          <div className="mb-4 flex justify-between">
            <h3 className="font-semibold">Your slides</h3>
            <span className="text-xs text-text-muted">Up to {HERO_MAX_SLIDES}</span>
          </div>
          <ol className="flex gap-3 overflow-x-auto pb-2 xl:block xl:space-y-3 xl:pb-0">
            {slides.map((item, index) => (
              <li
                key={item.id}
                className={cn(
                  'w-[220px] shrink-0 rounded-lg border p-2 xl:w-auto',
                  slide.id === item.id ? 'border-primary bg-primary/5' : 'border-border',
                )}
              >
                <button
                  type="button"
                  disabled={!!busy}
                  onClick={() => {
                    setSelected(item.id);
                    setError('');
                  }}
                  className="flex w-full items-center gap-3 rounded p-1 text-left focus-visible:outline-2 focus-visible:outline-primary"
                  aria-pressed={slide.id === item.id}
                >
                  <Image
                    src={item.image}
                    alt=""
                    width={64}
                    height={48}
                    className="h-12 w-16 shrink-0 rounded object-cover"
                  />
                  <span className="min-w-0">
                    <span className="block text-xs text-text-muted">
                      Slide {index + 1} · {item.enabled ? 'Enabled' : 'Disabled'}
                    </span>
                    <span className="mt-1 block truncate text-sm font-semibold">
                      {item.copy.en.label}
                    </span>
                  </span>
                </button>
                <div className="mt-2 flex justify-end gap-1">
                  <button
                    type="button"
                    aria-label={`Move slide ${index + 1} up`}
                    className="flex h-11 w-11 items-center justify-center rounded hover:bg-white disabled:opacity-30"
                    disabled={!!busy || index === 0}
                    onClick={() => move(index, -1)}
                  >
                    <ArrowUp className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    aria-label={`Move slide ${index + 1} down`}
                    className="flex h-11 w-11 items-center justify-center rounded hover:bg-white disabled:opacity-30"
                    disabled={!!busy || index === slides.length - 1}
                    onClick={() => move(index, 1)}
                  >
                    <ArrowDown className="h-4 w-4" />
                  </button>
                </div>
              </li>
            ))}
          </ol>
          <button
            type="button"
            className={cn(BUTTON, 'mt-4 w-full')}
            disabled={!!busy || slides.length >= HERO_MAX_SLIDES}
            onClick={addSlide}
          >
            <Plus className="h-4 w-4" />
            Add slide
          </button>
        </aside>
        <form
          ref={formRef}
          onSubmit={(e) => {
            e.preventDefault();
            void submit('save');
          }}
          className="min-w-0"
        >
          <fieldset disabled={!!busy} className="min-w-0 space-y-6 disabled:opacity-70">
            <div className={CARD}>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="font-semibold">Image &amp; framing</h3>
                <label className="flex min-h-11 items-center gap-3 text-sm">
                  <input
                    type="checkbox"
                    checked={slide.enabled}
                    onChange={(e) => patch({ enabled: e.target.checked })}
                    className="h-5 w-5 accent-primary"
                  />
                  Show in published carousel
                </label>
              </div>
              <label
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  void upload(e.dataTransfer.files[0]);
                }}
                className="my-5 flex cursor-pointer flex-col items-center gap-2 rounded-xl border-2 border-dashed border-border bg-surface px-5 py-6 text-center hover:border-primary"
              >
                <Upload className="h-6 w-6 text-primary" />
                <span className="text-sm font-semibold">
                  {busy === 'upload' ? 'Preparing and uploading image…' : 'Upload or replace image'}
                </span>
                <span className="text-xs leading-relaxed text-text-muted">
                  Drop a JPEG, PNG or WebP, or choose a file. Large photos are optimised
                  automatically. Recommended width: 1600px or more.
                </span>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  aria-label="Choose hero image"
                  onChange={(e) => void upload(e.target.files?.[0])}
                  className="mt-2 max-w-full text-xs file:mr-3 file:rounded-lg file:border-0 file:bg-primary file:px-4 file:py-3 file:font-semibold file:text-white"
                />
              </label>
              <div className="space-y-5">
                <Field
                  label="Image description"
                  value={slide.alt}
                  required
                  maxLength={250}
                  onChange={(value) => patch({ alt: value })}
                />
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field
                    label="Photo credit (optional)"
                    value={slide.credit}
                    maxLength={160}
                    onChange={(value) => patch({ credit: value })}
                  />
                  <Field
                    label="Credit link (optional)"
                    value={slide.creditUrl}
                    onChange={(value) => patch({ creditUrl: value })}
                  />
                </div>
                <label className="block text-sm font-semibold">
                  Image presentation
                  <select
                    className={INPUT}
                    value={slide.layout}
                    onChange={(e) => patch({ layout: e.target.value as HeroSlide['layout'] })}
                  >
                    <option value="cover">Full-bleed photo</option>
                    <option value="portrait">
                      Portrait — preserve the subject beside the text
                    </option>
                  </select>
                </label>
              </div>
              <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                <h4 className="text-sm font-semibold">Preview &amp; focal point</h4>
                <div className="flex gap-2">
                  {(['desktop', 'mobile'] as const).map((value) => (
                    <button
                      key={value}
                      type="button"
                      className={cn(BUTTON, mode === value && 'border-primary bg-primary/5')}
                      onClick={() => setMode(value)}
                      aria-pressed={mode === value}
                    >
                      {value === 'desktop' ? (
                        <Monitor className="h-4 w-4" />
                      ) : (
                        <Smartphone className="h-4 w-4" />
                      )}
                      {value === 'desktop' ? 'Desktop' : 'Mobile'}
                    </button>
                  ))}
                </div>
              </div>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {(['X', 'Y'] as const).map((axis) => {
                  const key = `${mode}${axis}` as 'desktopX' | 'desktopY' | 'mobileX' | 'mobileY';
                  return (
                    <label key={key} className="text-xs text-text-muted">
                      {axis === 'X' ? 'Horizontal position' : 'Vertical position'} · {slide[key]}%
                      <input
                        type="range"
                        min="0"
                        max="100"
                        step="1"
                        value={slide[key]}
                        onChange={(e) => patch({ [key]: Number(e.target.value) })}
                        className="mt-2 block w-full accent-primary"
                      />
                    </label>
                  );
                })}
              </div>
              <div className={cn('mt-5', mode === 'mobile' && 'mx-auto max-w-[320px]')}>
                <HeroPreview slide={slide} mode={mode} language={language} />
              </div>
            </div>
            <div className={CARD}>
              <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                <h3 className="font-semibold">Slide copy</h3>
                <div className="flex gap-2">
                  {(['en', 'fr'] as const).map((value) => (
                    <button
                      key={value}
                      type="button"
                      className={cn(BUTTON, language === value && 'border-primary bg-primary/5')}
                      onClick={() => setLanguage(value)}
                      aria-pressed={language === value}
                    >
                      {value === 'en' ? 'English' : 'French'}
                    </button>
                  ))}
                </div>
              </div>
              {language === 'fr' && !slide.copy.fr ? (
                <div className="rounded-lg bg-surface p-5 text-sm">
                  <p className="leading-relaxed text-text-muted">
                    English is used until you add a French translation.
                  </p>
                  <button
                    type="button"
                    className={cn(BUTTON, 'mt-4')}
                    onClick={() => patch({ copy: { ...slide.copy, fr: { ...slide.copy.en } } })}
                  >
                    Add French copy
                  </button>
                </div>
              ) : (
                <div className="space-y-5">
                  <Field
                    label="Short label"
                    value={copy.label}
                    required
                    maxLength={60}
                    onChange={(value) => patchCopy('label', value)}
                  />
                  <Field
                    label="Headline"
                    value={copy.title}
                    required
                    maxLength={160}
                    onChange={(value) => patchCopy('title', value)}
                  />
                  <Field
                    label="Description"
                    value={copy.body}
                    required
                    multiline
                    onChange={(value) => patchCopy('body', value)}
                  />
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field
                      label="Main button label"
                      value={copy.buttonText}
                      required
                      maxLength={60}
                      onChange={(value) => patchCopy('buttonText', value)}
                    />
                    <Field
                      label="Second button label"
                      value={copy.secondaryText}
                      maxLength={60}
                      onChange={(value) => patchCopy('secondaryText', value)}
                    />
                  </div>
                  {language === 'fr' && (
                    <button
                      type="button"
                      className="min-h-11 text-sm text-text-muted underline"
                      onClick={() => patch({ copy: { ...slide.copy, fr: null } })}
                    >
                      Remove French copy and use English
                    </button>
                  )}
                </div>
              )}
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <Field
                  label="Main button destination"
                  value={slide.buttonHref}
                  required
                  onChange={(value) => patch({ buttonHref: value })}
                />
                <Field
                  label="Second button destination (empty to hide)"
                  value={slide.secondaryHref}
                  onChange={(value) => patch({ secondaryHref: value })}
                />
              </div>
              <p className="mt-3 text-xs text-text-muted">
                Use a site path such as /about, or an HTTPS URL.
              </p>
            </div>
            <div className={cn(CARD, 'flex flex-wrap items-center justify-between gap-3')}>
              <p className="max-w-md text-xs leading-relaxed text-text-muted">
                Removing a slide changes the draft only. Publish to update the live homepage.
              </p>
              <button
                type="button"
                className={cn(BUTTON, 'text-error')}
                disabled={slides.length === 1}
                onClick={() => {
                  if (
                    window.confirm(
                      'Remove this slide from the draft? The live carousel stays unchanged until you publish.',
                    )
                  ) {
                    setSlides((previous) => previous.filter((s) => s.id !== slide.id));
                    setSelected('');
                    setNotice('');
                  }
                }}
              >
                <Trash2 className="h-4 w-4" />
                Remove slide
              </button>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  );
}

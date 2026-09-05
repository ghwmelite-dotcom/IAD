import { z } from 'zod';

// ─── Reusable field primitives ────────────────────────────────────────────────

const nameField = z.string().min(1, 'Name is required').max(200, 'Name must be 200 characters or fewer');

const optionalEmailField = z
  .string()
  .optional()
  .refine(
    (val) => !val || val === '' || z.email().safeParse(val).success,
    { message: 'Must be a valid email address' },
  );

const requiredEmailField = z.email('A valid email address is required');

const optionalPhoneField = z.string().max(20, 'Phone must be 20 characters or fewer').optional();

const optionalSubjectField = z.string().max(500, 'Subject must be 500 characters or fewer').optional();

const requiredSubjectField = z.string().min(1, 'Subject is required').max(500, 'Subject must be 500 characters or fewer');

// ─── Schemas ──────────────────────────────────────────────────────────────────

export const complaintFormSchema = z.object({
  name: nameField,
  email: optionalEmailField,
  phone: optionalPhoneField,
  subject: optionalSubjectField,
  body: z
    .string()
    .min(10, 'Complaint must be at least 10 characters')
    .max(5000, 'Complaint must be 5 000 characters or fewer'),
});

export const feedbackFormSchema = z.object({
  name: nameField,
  email: optionalEmailField,
  phone: optionalPhoneField,
  subject: optionalSubjectField,
  body: z
    .string()
    .min(10, 'Feedback must be at least 10 characters')
    .max(5000, 'Feedback must be 5 000 characters or fewer'),
});

export const rtiFormSchema = z.object({
  name: nameField,
  email: requiredEmailField,
  phone: optionalPhoneField,
  subject: requiredSubjectField,
  body: z
    .string()
    .min(20, 'Request details must be at least 20 characters')
    .max(5000, 'Request details must be 5 000 characters or fewer'),
});

export const specialAuditFormSchema = z.object({
  name: nameField,
  email: requiredEmailField,
  phone: optionalPhoneField,
  subject: requiredSubjectField,
  body: z
    .string()
    .min(20, 'Request details must be at least 20 characters')
    .max(5000, 'Request details must be 5 000 characters or fewer'),
});

export const consultancyFormSchema = z.object({
  name: nameField,
  email: requiredEmailField,
  phone: optionalPhoneField,
  subject: requiredSubjectField,
  body: z
    .string()
    .min(20, 'Request details must be at least 20 characters')
    .max(5000, 'Request details must be 5 000 characters or fewer'),
});

// Fraud/whistleblowing reports may be fully anonymous — identity fields are
// optional and only stored when the reporter volunteers them.
const optionalNameField = z.string().max(200, 'Name must be 200 characters or fewer').optional();

export const fraudReportFormSchema = z.object({
  name: optionalNameField,
  email: optionalEmailField,
  phone: optionalPhoneField,
  subject: optionalSubjectField,
  body: z
    .string()
    .min(20, 'Report details must be at least 20 characters')
    .max(5000, 'Report details must be 5 000 characters or fewer'),
});

export const trackFormSchema = z.object({
  referenceNumber: z
    .string()
    .min(1, 'Reference number is required')
    .regex(
      /^OHCS-[A-Z]{3}-\d{8}-[A-Z0-9]{4}$/,
      'Enter a valid reference number (OHCS-XXX-YYYYMMDD-XXXX)',
    ),
  contact: z.string().min(1, 'Email address or phone number is required'),
});

// ─── Inferred types ───────────────────────────────────────────────────────────

export type ComplaintFormData = z.infer<typeof complaintFormSchema>;
export type FeedbackFormData = z.infer<typeof feedbackFormSchema>;
export type RtiFormData = z.infer<typeof rtiFormSchema>;
export type SpecialAuditFormData = z.infer<typeof specialAuditFormSchema>;
export type ConsultancyFormData = z.infer<typeof consultancyFormSchema>;
export type FraudReportFormData = z.infer<typeof fraudReportFormSchema>;
export type TrackFormData = z.infer<typeof trackFormSchema>;

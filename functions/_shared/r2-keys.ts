const MIME_TO_EXT: Record<string, string> = {
  'application/pdf': 'pdf',
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'xlsx',
};

export function extensionForMime(mime: string): string {
  return MIME_TO_EXT[mime] ?? 'bin';
}

export function applicationDocKey(
  exerciseId: string,
  applicationId: string,
  docTypeId: string,
  mime: string,
): string {
  return `${exerciseId}/${applicationId}/${docTypeId}.${extensionForMime(mime)}`;
}

import * as React from 'react';
import { File } from 'insightis-kit';

export function Default() {
  return <File name="revenue-q2.csv" size="2.4 MB" onRemove={() => {}} />;
}

export function Uploading() {
  return <File name="customer-accounts.xlsx" size="Uploading…" loading />;
}

export function UploadFailed() {
  return <File name="pipeline-export.zip" size="Upload failed" error onRetry={() => {}} onRemove={() => {}} />;
}

export function LongName() {
  return <File name="salesforce-opportunities-full-history-2026.csv" size="18.7 MB" onRemove={() => {}} />;
}

import * as React from 'react';
import { DropZone } from 'insightis-kit';

export function Default() {
  return (
    <div style={{ maxWidth: 520 }}>
      <DropZone />
    </div>
  );
}

export function CsvUpload() {
  return (
    <div style={{ maxWidth: 520 }}>
      <DropZone
        title="Upload connection data"
        subtitle="CSV or Excel up to 50 MB — rows become queryable the moment the upload finishes"
        browseLabel="Choose File"
        accept=".csv,.xlsx"
      />
    </div>
  );
}

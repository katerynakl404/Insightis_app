/* OnbSourcePicker — the body of the onboarding's step 3, "Connect your first data source", inside
   IK.OnbSetup. Connecting is the main path; files are the side door, a link in the step's subtitle
   (IK.OnbUploadLink) that opens the system file picker straight away — no dialog.

     [file rows]        D.File per picked file: progress → "Uploaded" (the page then moves on to the
                        chat by itself), or the error with Retry (Continue then takes the others)
     the catalog        IK.DsCatalog, scroll: 'inner' — search, category chips with counts, the
                        tiles (popular first, the flame on them) scrolling inside the card; a tile
                        → onConnect(source) → the page opens IK.ConnectDialog

   h(IK.OnbSourcePicker, {
     sources: IK.ONB_SOURCES, categories: IK.ONB_CATS,
     files: [{ name, size, progress, done, error }], onRetryFile(i), onRemoveFile(i),
     onConnect: function (source) {}
   })
   h(IK.OnbUploadLink, { onClick })  "Upload CSV, Excel or JSON" — the subtitle's link
   IK.onbFileSize(bytes) → "2.5 MB"
   No plan gating: a new account starts on the free trial, so every source can be connected. */
(function () {
  'use strict';
  var IK = window.InsightisKit, D = window.DevartUI, R = window.React, h = IK.h;

  IK.onbFileSize = function (b) { return b >= 1e6 ? (b / 1e6).toFixed(1) + ' MB' : Math.max(1, Math.round(b / 1e3)) + ' KB'; };

  IK.OnbUploadLink = function OnbUploadLink(p) {
    return h(D.LinkButton, { href: '#', className: 'ik-onb-upload', onClick: function (e) { e.preventDefault(); if (p.onClick) p.onClick(); } },
      h(IK.Icon, { name: 'onb-upload' }), 'Upload CSV, Excel or JSON');
  };

  IK.OnbSourcePicker = function OnbSourcePicker(p) {
    var sources = p.sources || IK.ONB_SOURCES;
    var byName = R.useMemo(function () { var m = {}; sources.forEach(function (s) { m[s.name] = s; }); return m; }, [sources]);
    var connectors = R.useMemo(function () {
      return sources.map(function (s) { return { name: s.name, cats: [s.cat], popular: s.popular, sprite: s.sprite, dark: s.dark }; });
    }, [sources]);
    var files = p.files || [];
    return h('div', { className: 'flex min-w-0 flex-col gap-4' },
      files.length ? h('div', { className: 'flex flex-col gap-2', role: 'list', 'aria-label': 'Uploaded files', 'aria-live': 'polite' },
        files.map(function (f, i) {
          var uploading = !f.done && !f.error;
          return h('div', { key: f.name + i, role: 'listitem' }, h(D.File, {
            name: f.name, size: 'lg', rounded: 'md',
            fileSize: f.error ? 'Upload failed' : IK.onbFileSize(f.size) + (f.done ? ' · Uploaded' : ''),
            progress: uploading ? Math.round(f.progress || 0) : undefined,
            isError: !!f.error, onRetry: f.error ? function () { if (p.onRetryFile) p.onRetryFile(i); } : undefined,
            onDismiss: f.error && p.onRemoveFile ? function () { p.onRemoveFile(i); } : undefined,
            rightSlot: f.done ? h(IK.Icon, { name: 'check', className: 'ik-onb-done', label: 'Uploaded' }) : undefined
          }));
        })) : null,
      h(IK.DsCatalog, {
        connectors: connectors, categories: ['All'].concat(p.categories || IK.ONB_CATS),
        locked: false, scroll: 'inner',
        onConnect: function (name) { if (p.onConnect) p.onConnect(byName[name]); }
      }));
  };
})();

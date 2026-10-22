/* DsFilePreview — the preview parts File details shows (IK.FileDetails; the old split panel is gone, 2026-10-22). Port of
   dsfRenderPreview() (Files page; rules 21–22 in page-changes/data-sources_files-landing.md):
     IK.dsPreviewKind(name)                              'table' (csv / xls / xlsx) · 'text' (json / txt / md) · 'none'
     IK.DsFilePreviewBanner({ file, onDownload })        "Preview truncated. Download to see the full file." — only when a
                                                         SAMPLE of a bigger file (size in MB) is shown, flush under the head
     IK.DsFilePreviewContent({ file, bare, onDownload }) a DevartUI Table of sample rows · a mono sample · "There is no
                                                         preview available for this file type" + Download
     IK.DsFileUnavailable({ file, renewal, … })          a shared file that can't be used: why, and the way back       */
(function () {
  'use strict';
  var IK = window.InsightisKit, D = window.DevartUI, R = window.React, h = IK.h;

  IK.defineIcons({
    'ds-download': '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="3" x2="12" y2="15"/>',
    'ds-close': '<path d="M18 6 6 18M6 6l12 12"/>',
    'ds-warn': '<path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>',
    'ds-doc': '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>'
  });

  var ROWS = [
    ['2026-07-01', 'EMEA', '12,480', '+4.2%'], ['2026-07-01', 'AMER', '31,905', '+1.8%'],
    ['2026-07-01', 'APAC', '8,220', '-0.6%'], ['2026-06-01', 'EMEA', '11,970', '+2.1%'],
    ['2026-06-01', 'AMER', '31,340', '+3.0%'], ['2026-06-01', 'APAC', '8,270', '+1.1%'],
    ['2026-05-01', 'EMEA', '11,720', '-1.4%'], ['2026-05-01', 'AMER', '30,420', '+0.9%']
  ];
  IK.dsPreviewKind = function (name) {
    var ext = (String(name).split('.').pop() || '').toLowerCase();
    if (['csv', 'xls', 'xlsx'].indexOf(ext) !== -1) return 'table';
    if (['json', 'txt', 'md'].indexOf(ext) !== -1) return 'text';
    return 'none';
  };
  function truncated(f) { return IK.dsPreviewKind(f.name) !== 'none' && /MB$/i.test(f.size || ''); }

  /* The original's sample table gives its third column a 16rem floor (.cp-tbl-scroll), so in a
     28rem panel the table outgrows the column and scrolls sideways — reproduced. */
  var WIDE = { minWidth: '16rem', whiteSpace: 'normal' };
  function Sample() {
    return h(D.Table, { wrapperClassName: 'ik-dsfp-tbl' },
      h(D.TableHeader, null, h(D.TableRow, null, ['Date', 'Region', 'Revenue', 'Change'].map(function (c, j) { return h(D.TableHead, { key: c, style: j === 2 ? WIDE : undefined }, c); }))),
      h(D.TableBody, null, ROWS.map(function (r, i) {
        return h(D.TableRow, { key: i }, r.map(function (v, j) { return h(D.TableCell, { key: j, className: 'whitespace-nowrap', style: j === 2 ? WIDE : undefined }, v); }));
      })));
  }
  function Text(p) {
    /* bare — as the product shows it: the file's text itself, straight on the panel's body, no box around it */
    if (p && p.bare) return h('pre', { className: 'm-0 whitespace-pre-wrap break-all font-sans text-sm text-ink-body' },
      '[' + ROWS.map(function (r) { return '{"date":"' + r[0] + '","region":"' + r[1] + '","revenue":' + r[2].replace(/,/g, '') + '}'; }).join(',') + ']');
    var lines = ROWS.map(function (r) { return '  {"date": "' + r[0] + '", "region": "' + r[1] + '", "revenue": ' + r[2].replace(/,/g, '') + '}'; });
    return h('pre', { className: 'ik-dsfp-json' }, '[\n' + lines.join(',\n') + '\n]');
  }
  function None(p) {
    return h('div', { className: 'ik-dsfp-empty' },
      h(IK.Icon, { name: 'ds-doc', size: 40, strokeWidth: 1.5, className: 'text-ink-inactive' }),
      /* centred, as the original — Typography is text-left unless told (user, 2026-10-20: "тут було центральне вирівнювання") */
      h(D.Typography, { element: 'span', textStyle: 'title14', textColor: 'primary', align: 'center' }, p.file.name),
      h(D.Typography, { element: 'p', textStyle: 'body14', textColor: 'secondary', align: 'center', className: 'm-0 max-w-64' }, 'There is no preview available for this file type'),
      p.onDownload ? h(D.Button, { variant: 'secondary', size: 'sm', type: 'button', onClick: p.onDownload }, 'Download') : null);
  }

  /* the preview's own content and whether it is a truncated sample, for another panel to show the same file the same way (the
     details-panels concept — user, 2026-10-20: "превью в файлі мало бути реалістичним") */
  /* the "Preview truncated" strip — full-bleed, flush on top of the preview */
  IK.DsFilePreviewBanner = function DsFilePreviewBanner(p) {
    if (!p.file || !truncated(p.file)) return null;
    return h('div', { className: 'ik-dsfp-banner' },
      h(IK.Icon, { name: 'ds-warn', size: 16, className: 'ik-dsfp-banner-ic' }),
      h('span', null, 'Preview truncated. ',
        h(D.LinkButton, { asChild: true }, h('button', { type: 'button', onClick: p.onDownload }, 'Download')),
        ' to see the full file.'));
  };
  /* a shared file that can't be used, in the preview's place: why, and the way back (Ask to Renew / Upgrade) */
  IK.DsFileUnavailable = function DsFileUnavailable(p) {
    var u = { by: p.by, locked: !!p.locked, noun: 'files', feature: 'shared-files', renewal: p.renewal };
    /* the glyph in the warning tone of the mark by the name — grey read as "no preview", not as a problem (user,
       2026-10-20: "іконка виглядає наче не того кольору") */
    return h('div', { className: 'ik-dsfp-empty' },
      h(IK.Icon, { name: 'ds-doc', size: 40, strokeWidth: 1.5, className: 'text-fb-attention' }),
      h(D.Typography, { element: 'span', textStyle: 'title14', textColor: 'primary', align: 'center' }, 'Unavailable'),
      h(D.Typography, { element: 'p', textStyle: 'body14', textColor: 'secondary', align: 'center', className: 'm-0 max-w-64' }, IK.wsUnavailableReason(u)),
      IK.wsUnavailableAction(Object.assign({ size: 'sm' }, u)));
  };
  IK.DsFilePreviewContent = function DsFilePreviewContent(p) {
    var kind = IK.dsPreviewKind(p.file.name);
    return kind === 'table' ? h(Sample) : kind === 'text' ? h(Text, { bare: p.bare }) : h(None, { file: p.file, onDownload: p.onDownload });
  };
})();

/* ChatFilePreview — the chat page's file preview split panel (chat_page-charts-landing.html ".cp-fp" +
   ".cp-fp-resize"): a result file chip or chart plate in the thread opens it to the right of the chat.

     separator  a 1px rule with a centred 12×28 grip; drag it to resize (320px … 70% of the shell),
                the grip takes Text/Body + the card hover border on hover and while dragging
     head       the file name (Title/14, truncated) · Download · Close (DevartUI IconButton xs tertiary,
                tooltips "Download" / "Close")
     banner     json only: "Preview truncated. Download to see the full file." — a full-bleed warning
                strip flush under the head
     body       png → the chart (IK.ChatChart) · json → a mono sample · pdf (anything without a preview)
                → icon + name + "Unfortunately, there’s no preview available for this file type." +
                Download · csv / xls / xlsx → the ID / Value / Score table
   Esc closes it. Below 881px it stops splitting and covers the right of the chat (min(92%, width)),
   with a shadow on its left edge, and the separator goes.

   h(IK.ChatFilePreview, { file: 'random_data.csv' | null, onClose, width, onWidthChange, content })
     The page puts it LAST in the row that holds the chat column (it renders the separator + the panel).
     content(name) → nodes, to override the body; IK.CHAT_PREVIEW_TABLE is the default table data. */
(function () {
  'use strict';
  var IK = window.InsightisKit, D = window.DevartUI, R = window.React, h = IK.h;

  IK.defineIcons({
    'fp-download': '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>',
    'fp-close': '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',
    'fp-grip': { fill: true, inner: '<circle cx="9" cy="6" r="1.6"/><circle cx="15" cy="6" r="1.6"/><circle cx="9" cy="12" r="1.6"/><circle cx="15" cy="12" r="1.6"/><circle cx="9" cy="18" r="1.6"/><circle cx="15" cy="18" r="1.6"/>' },
    'fp-warn': '<path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>',
    'fp-doc': '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/>'
  });

  IK.CHAT_PREVIEW_TABLE = [[1, 166, 39.21], [2, 192, 34.32], [3, 198, 72.9], [4, 117, 43.86], [5, 183, 5.97], [6, 157, 39.8], [7, 186, 73.8], [8, 197, 18.25], [9, 196, 17.55], [10, 147, 53.16]];

  function json() {
    var rows = IK.CHAT_PREVIEW_TABLE.map(function (r) { return '  {"id": ' + r[0] + ', "value": ' + r[1] + ', "score": ' + r[2] + '}'; });
    return h('pre', { className: 'ik-fp-json' }, '[\n' + rows.join(',\n') + '\n]');
  }
  function none(name) {
    return h('div', { className: 'ik-fp-empty' },
      h(IK.Icon, { name: 'fp-doc', size: 40, strokeWidth: 1.5, className: 'text-ink-inactive' }),
      h(D.Typography, { element: 'span', textStyle: 'title14', textColor: 'primary' }, name),
      h(D.Typography, { element: 'p', textStyle: 'body14', textColor: 'secondary', className: 'm-0 max-w-64' }, 'Unfortunately, there’s no preview available for this file type.'),
      h(D.Button, { variant: 'secondary', size: 'sm', type: 'button' }, 'Download'));
  }
  IK.chatPreviewContent = function (name) {
    if (/\.png$/i.test(name)) return h(IK.ChatChart, { kind: /line/i.test(name) ? 'line' : 'bar' });
    if (/\.json$/i.test(name)) return json();
    if (/\.pdf$/i.test(name)) return none(name);
    return h(D.Table, { wrapperClassName: 'ik-result-tbl' },
      h(D.TableHeader, null, h(D.TableRow, null, ['ID', 'Value', 'Score'].map(function (c, i) {
        return h(D.TableHead, { key: c, className: i === 2 ? 'ik-col-wrap' : 'whitespace-nowrap' }, c);
      }))),
      h(D.TableBody, null, IK.CHAT_PREVIEW_TABLE.map(function (r, ri) {
        return h(D.TableRow, { key: ri }, r.map(function (v, i) { return h(D.TableCell, { key: i, className: i === 2 ? 'ik-col-wrap' : 'whitespace-nowrap' }, v); }));
      })));
  };

  IK.ChatFilePreview = function ChatFilePreview(p) {
    var ws = R.useState(null), wOwn = ws[0], setWOwn = ws[1];
    var width = p.width != null ? p.width : wOwn;
    var ds = R.useState(false), dragging = ds[0], setDragging = ds[1];
    var bodyRef = R.useRef(null), sepRef = R.useRef(null);
    var name = p.file;

    R.useEffect(function () {
      if (!name) return;
      function esc(e) { if (e.key === 'Escape' && p.onClose) p.onClose(); }
      document.addEventListener('keydown', esc);
      return function () { document.removeEventListener('keydown', esc); };
    }, [name, p.onClose]);
    R.useEffect(function () { if (bodyRef.current) bodyRef.current.scrollTop = 0; }, [name]);
    if (!name) return null;

    function setW(px) { if (p.onWidthChange) p.onWidthChange(px); if (p.width == null) setWOwn(px); }
    function down(e) {
      if (e.button) return;
      e.preventDefault();
      setDragging(true);
      var shell = (sepRef.current && sepRef.current.closest('.ik-shell')) || document.body;
      function move(ev) { var r = shell.getBoundingClientRect(); setW(Math.max(320, Math.min(r.right - ev.clientX, r.width * 0.7))); }
      function up() { setDragging(false); document.removeEventListener('pointermove', move); document.removeEventListener('pointerup', up); document.removeEventListener('pointercancel', up); }
      document.addEventListener('pointermove', move);
      document.addEventListener('pointerup', up);
      document.addEventListener('pointercancel', up);
    }
    var json = /\.json$/i.test(name);
    var style = width ? { '--ik-fp-w': width + 'px' } : undefined;
    return h(IK.Fragment, null,
      h('div', {
        ref: sepRef, className: IK.cx('ik-fp-sep', dragging && 'is-dragging'), role: 'separator',
        'aria-orientation': 'vertical', 'aria-label': 'Resize preview', onPointerDown: down
      }, h('span', { className: 'ik-fp-grip', 'aria-hidden': 'true' }, h(IK.Icon, { name: 'fp-grip', size: 12 }))),
      h('aside', { className: IK.cx('ik-fp', p.className), 'aria-label': 'File preview', style: style },
        h('div', { className: 'ik-fp-head' },
          h(D.Typography, { element: 'span', textStyle: 'title14', textColor: 'primary', className: 'min-w-0 flex-1 truncate' }, name),
          h('div', { className: 'flex flex-none items-center gap-0.5' },
            h(IK.Tip, { tip: 'Download' }, h(D.IconButton, { variant: 'tertiary', size: 'xs', type: 'button', 'aria-label': 'Download file' }, h(IK.Icon, { name: 'fp-download' }))),
            h(IK.Tip, { tip: 'Close' }, h(D.IconButton, { variant: 'tertiary', size: 'xs', type: 'button', 'aria-label': 'Close preview', onClick: p.onClose }, h(IK.Icon, { name: 'fp-close' }))))),
        json ? h('div', { className: 'ik-fp-banner' },
          h(IK.Icon, { name: 'fp-warn', size: 16, className: 'ik-fp-banner-ic' }),
          h('span', null, 'Preview truncated. ',
            h(D.LinkButton, { asChild: true }, h('button', { type: 'button' }, 'Download')),
            ' to see the full file.')) : null,
        h('div', { ref: bodyRef, className: 'ik-fp-body' }, (p.content || IK.chatPreviewContent)(name))));
  };
})();

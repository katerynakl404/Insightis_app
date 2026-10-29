/* AppScopes — what an AI assistant may do with the account (AIINS-1778): the consent screen lists it before
   Allow, Settings → Authorized apps shows it on every app's row. Names are Identity's DisplayName values; the
   one-line explanation under each is the brief's design copy. Built from existing parts only (user, 2026-10-29):

     look 'badges'     DevartUI Badge secondary sm + its 12px glyph, wrapping — the chat's attachment chip
                       (IK.QueueFileBadge). Settings → Authorized apps rows.
     look 'rows'       one bordered list, DevartUI Separator between the rows: the glyph on a round brand-tinted plate,
                       Title/14 name with the verb (Badge secondary sm) at its right, Body/14 secondary explanation under
                       both at the text's full width. The consent screen's
                       (the checklist look went on 2026-10-29: it had no room for the explanations).

   h(IK.AppScopes, { scopes: ['connections:query', 'metrics:read'], look: 'badges', label: 'Claude will be able to' })
   IK.APP_SCOPES   key → { t, d, tag, icon }
   IK.APP_SCOPES_ALL  the four a consent asks for, in order (offline_access only there: Settings gets three back) */
(function () {
  'use strict';
  var IK = window.InsightisKit, D = window.DevartUI, h = IK.h;

  /* lucide 0.562.0, the brief's own glyphs */
  IK.defineIcons({
    'scope-query': '<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5V19A9 3 0 0 0 15 21.84"/><path d="M21 5V8"/><path d="M21 12L18 17H22L19 22"/><path d="M3 12A9 3 0 0 0 14.59 14.87"/>',
    'scope-read': '<path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/>',
    'scope-manage': '<path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"/>',
    'scope-offline': '<path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/>'
  });

  /* the explanations are one line each in the consent card (≤50 characters, about as long as each other) — never a
     word left alone on a second line (user, 2026-10-29: "ніяких переносів одного рядка") */
  IK.APP_SCOPES = {
    'connections:query': { t: 'Query data in your connected sources', d: 'Run questions on your sources and read the results', tag: 'Run', icon: 'scope-query' },
    'metrics:read':      { t: 'Read metric definitions', d: 'See the names, formulas and notes of your metrics', tag: 'Read', icon: 'scope-read' },
    'metrics:manage':    { t: 'Create, change and delete your metrics', d: 'Changes show up in your metric library right away', tag: 'Change', icon: 'scope-manage' },
    'offline_access':    { t: 'Stay connected', d: 'Keep access when signed out, until you revoke it', tag: 'Ongoing', icon: 'scope-offline' }
  };
  IK.APP_SCOPES_ALL = ['connections:query', 'metrics:read', 'metrics:manage', 'offline_access'];

  IK.AppScopes = function AppScopes(p) {
    /* below 640px the plate goes and the glyph stands alone: the 44px it took is what a name needs to stay on one line */
    var narrow = D.useMaxWidth ? D.useMaxWidth(640) : false;
    var list = (p.scopes || IK.APP_SCOPES_ALL).map(function (k) { return Object.assign({ key: k }, IK.APP_SCOPES[k]); });
    if (p.look === 'rows') {
      /* as the brief's mock-up has it (user, 2026-10-29: "так виглядало і то краще"): ONE bordered list, a DevartUI
         Separator between the rows — not a panel per row ("плашки занадто контрастні") — each row the glyph on its
         round brand-tinted plate, Title/14 name over Body/14 secondary explanation (always shown: "описи мають бути"),
         the verb a DevartUI Badge secondary sm on the right */
      var items = [];
      list.forEach(function (s, i) {
        if (i) items.push(h(D.Separator, { key: 'sep-' + s.key }));
        /* the verb sits on the name's line, at its right — never a row of its own (user, 2026-10-29: "бейдж внизу краде
           весь час рядок") and never a column that narrows the explanation under it. Text wraps naturally as the width
           changes — no balancing, a word may end a line alone (user, 2026-10-29: "при ресайзі не давай обмежень").
           Below 640px no plate and 12px sides, so the text keeps its width ("мобайл мав би краще перебудовуватись") */
        items.push(h('div', { key: s.key, role: 'listitem', className: IK.cx('flex items-start gap-3 py-3', narrow ? 'px-3' : 'px-4') },
          narrow
            ? h('span', { className: 'mt-0.5 flex flex-none text-ink-highlight', 'aria-hidden': 'true' }, h(IK.Icon, { name: s.icon, size: 16 }))
            : h('span', { className: 'ik-scope-plate', 'aria-hidden': 'true' }, h(IK.Icon, { name: s.icon, size: 16 })),
          h('div', { className: 'flex min-w-0 flex-1 flex-col gap-0.5' },
            h('div', { className: 'flex items-start justify-between gap-2' },
              h(D.Typography, { element: 'span', textStyle: 'title14', textColor: 'primary', className: 'min-w-0' }, s.t),
              h(D.Badge, { variant: 'secondary', size: 'sm', className: 'flex-none' }, s.tag)),
            h(D.Typography, { element: 'span', textStyle: 'body14', textColor: 'secondary' }, s.d))));
      });
      return h('div', { role: 'list', 'aria-label': p.label, className: IK.cx('flex flex-col overflow-hidden rounded-lg border border-stroke', p.className) }, items);
    }
    return h('ul', { className: IK.cx('m-0 flex list-none flex-wrap gap-1.5 p-0', p.className), 'aria-label': p.label },
      list.map(function (s) {
        return h('li', { key: s.key, className: 'flex min-w-0' },
          h(D.Badge, { variant: 'secondary', size: 'sm', leftSlot: h(IK.Icon, { name: s.icon, size: 12 }) }, s.t));
      }));
  };
})();

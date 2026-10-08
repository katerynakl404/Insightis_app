(function () {
  var IK = window.InsightisKit, D = window.DevartUI, R = window.React, h = IK.h;
  IK.UPGRADE_NAVIGATES = false;
  /* The prompt lives in a composer card: the mention list hangs above that card. */
  function Card(p) {
    return h('div', { className: 'flex flex-col justify-end pt-80' },
      h('div', { className: 'ik-composer' }, h(IK.ChatPrompt, { plan: p.plan, seed: p.seed, placeholder: 'Ask anything about your data, or type @ to reference a metric…' })));
  }
  IK.story('ChatPrompt', { title: 'Empty — placeholder', wide: true, render: function () { return h(Card, { plan: 'paid' }); } });
  IK.story('ChatPrompt', { title: 'Seeded token @mrr', wide: true,
    description: 'Hover or Tab to the token: its card (name + definition) opens above it.',
    render: function () { return h(Card, { plan: 'paid', seed: ['mrr'] }); } });
  IK.story('ChatPrompt', { title: 'Typing "@" — the metric list', wide: true,
    description: 'Type "@c": rows whose alias contains "c", the typed run heavy; the first row is active. Up/Down move, Enter / Tab insert, Esc closes. No match: the list hides.',
    render: function () { return h(Card, { plan: 'paid' }); } });
  IK.story('ChatPrompt', { title: 'Free — locked list', wide: true,
    description: 'Type "@c": the account keeps its metrics listed, every row locked (padlock trails, hover / click opens the Metrics popover). Type "@zzz": one locked row "Metrics are on paid plans".',
    render: function () { return h(Card, { plan: 'free' }); } });
  IK.story('ChatPrompt', { title: 'Tokens side by side', render: function () {
    function T() {
      var ref = R.useRef(null);
      R.useLayoutEffect(function () {
        var el = ref.current; if (!el || el.childNodes.length) return;
        el.appendChild(IK.mentionTag(IK.CHAT_METRICS[0])); el.appendChild(document.createTextNode(' '));
        el.appendChild(IK.mentionTag(IK.CHAT_METRICS[1], true)); el.appendChild(document.createTextNode(' by month'));
      }, []);
      return h('div', { ref: ref, className: 'ik-cmp-prompt' });
    }
    return h(T);
  } });
})();

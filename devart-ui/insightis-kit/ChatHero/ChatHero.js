/* ChatHero — the new-chat landing column: a centred greeting over the composer and the suggestion
   pills (chat-landing.html ".cl-main:has(> .cl-hero)" / ".cl-hero" / ".cl-title" / ".cl-suggest").

     the column   fills the main area and centres the hero both ways; 20/24px padding
                  (12/16/48 below 640px)
     the hero     max 680px, 28px between title, composer and pills (20px below 640px); the pills
                  pull 4px closer to the composer (24px) on wide screens
     the title    Heading 30 (36 from 768px, 24 below 640px), wraps at 20.75rem; keywords in
                  Text/Highlight at 600

   h(IK.ChatHero, { title }, composer, suggestions)
     title        nodes; default the product's greeting, "What insight / are you looking for?"
   h(IK.ChatSuggestions, { items, onPick })
     items        [{ icon, label }] — default IK.CHAT_SUGGESTIONS (the three prompts)
     onPick(label)  the page puts the label into the prompt and focuses it
   IK.ChatKeyword  { children } — a highlighted keyword inside a custom title */
(function () {
  'use strict';
  var IK = window.InsightisKit, D = window.DevartUI, h = IK.h;

  IK.defineIcons({
    'sg-trend': '<line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>',
    'sg-churn': '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/>',
    'sg-movers': '<path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/>'
  });

  IK.CHAT_SUGGESTIONS = [
    { icon: 'sg-trend', label: 'Show revenue trends' },
    { icon: 'sg-churn', label: 'Analyze user churn' },
    { icon: 'sg-movers', label: 'Find top movers' }
  ];

  IK.ChatKeyword = function ChatKeyword(p) { return h('span', { className: 'ik-hero-kw' }, p.children); };

  IK.ChatHero = function ChatHero(p) {
    var title = p.title != null ? p.title : ['What ', h(IK.ChatKeyword, { key: 'a' }, 'insight'), h('br', { key: 'b' }), 'are you ', h(IK.ChatKeyword, { key: 'c' }, 'looking for'), '?'];
    return h('div', { className: IK.cx('ik-hero-col', p.className) },
      h('section', { className: 'ik-hero' },
        h('h1', { className: 'ik-hero-title' }, title),
        p.children));
  };

  IK.ChatSuggestions = function ChatSuggestions(p) {
    var items = p.items || IK.CHAT_SUGGESTIONS;
    return h('div', { className: 'ik-suggest' },
      items.map(function (s) {
        return h(D.Button, {
          key: s.label, variant: 'secondary', size: 'sm', rounded: 'full', type: 'button',
          leftSlot: h(IK.Icon, { name: s.icon, className: 'text-ink-secondary' }),
          onClick: function () { if (p.onPick) p.onPick(s.label); }
        }, s.label);
      }));
  };
})();

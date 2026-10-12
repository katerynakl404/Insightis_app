/* ChatThread — the conversation column of a chat screen and the pieces a turn is made of
   (kit-theme.css "CHAT SHELL + COMPOSER" + "ChatMessage": .cp-thread-wrap / .cp-thread / .cp-turn /
   .cp-msg-row / .cp-bubble / .cp-ai-bubble / .cp-msg-foot / .cp-scroll-btn / .cp-composer-area).

   Layout of a chat screen (inside IK.AppShell { scroll: false }):
     h(IK.ChatHeader, …)                          title + chat menu (ChatHeader/ChatHeader.js)
     h(IK.ChatThread, null, turns…)               the ONLY scroller; opens at the newest message
     h(IK.ChatComposerArea, null, h(IK.Composer, { prompt: 'rich', … }))

   IK.ChatThread { children, endKey, className }
     Masked top (10px) and bottom (32px) so a turn slides under the header and the composer
     instead of being cut across a line. Scrollbar gutter on the right, the same width mirrored
     on the left so the column stays centred on the composer. Lands at the bottom on mount and
     whenever its content grows (a notice appended under the answer). The round scroll-to-bottom
     button (tooltip "Scroll to bottom") hides while the thread is already at the end.
   IK.ChatTurn { children }                       one request: max 820px band, 24px side padding
   IK.ChatUserMessage { children, time }          right-aligned bubble; footer = Copy + time,
                                                  revealed on row hover (height always reserved)
   IK.ChatAnswer { children, time }               the answer on one card surface; footer = time
   IK.ChatAnswerGroup { children }                a tool call + what it produced, kept tight
   IK.ChatProse { children }                      an answer paragraph (Text/Primary)
   IK.ChatResultTable { title, columns, rows, wrapColumn }   a titled DevartUI Table; cells stay on
                                                  one line except column `wrapColumn` (default 2,
                                                  0-based — the free-text column, min 16rem)
   IK.ChatCopyButton { text | getText, label }    IconButton 2xs: copies, shows a check and
                                                  "Copied" for 1.4 s, then reverts
   IK.ChatComposerArea { children }               the composer's band under the thread
   IK.ChatPausedNotice { sources }                U6 (Free): "Your subscription ended, so this chat
                                                  can't use its connections" — a warning Alert in
                                                  the thread with "Upgrade to Unlock" (the
                                                  connections popover, on click)

   Rich answers (chat_page-charts-landing):
   IK.ChatUserMessage { foot: false }             no footer at all (a message the page appends live —
                                                  the queue's turns carry no Copy / time)
   IK.ChatAnswer { foot: false | 'row' }          false: no footer; 'row': the footer sits in the
                                                  message row, 4px under the card instead of 8 (the
                                                  original's last two charts turns close their card
                                                  one level early — reproduced)
   IK.ChatHeading { children }                    a section title inside an answer (Title/16)
   IK.ChatList { ordered, items }                 an ol / ul in the answer's prose voice
   IK.ChatCode { children }                       an inline code chip inside prose
   IK.ChatFileChips { files, onOpen }             result files: a wrapping row of DevartUI File chips;
                                                  each one is a button that opens the file (onOpen(name))
   IK.ChatDataCard { title, columns, rows }       a titled data table, 8px off what precedes it
   IK.ChatTurnState { kind, children }            what a turn shows when it is not prose:
                                                  'tool' (spinner + "Running Python…"), 'stopped'
                                                  (italic "Stopped"), 'error' (circled ! in red)
   IK.ChatStreamCaret                             the reply being written: a blinking 1px caret */
(function () {
  'use strict';
  var IK = window.InsightisKit, D = window.DevartUI, R = window.React, h = IK.h;

  IK.defineIcons({
    copy: '<rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>',
    'chat-chevron': '<polyline points="6 9 12 15 18 9"/>',
    'chat-check': '<polyline points="20 6 9 17 4 12"/>'
  });

  /* The scroller's scrollbar width, mirrored as left padding (the original's --sb-w). */
  function gutter(el) { return el ? Math.max(0, el.offsetWidth - el.clientWidth) : 0; }

  IK.ChatThread = function ChatThread(p) {
    var ref = R.useRef(null), inner = R.useRef(null);
    var s = R.useState(true), atEnd = s[0], setAtEnd = s[1];
    var g = R.useState(0), sb = g[0], setSb = g[1];
    function check() { var el = ref.current; if (el) setAtEnd(el.scrollHeight - el.scrollTop - el.clientHeight < 4); }
    function toEnd() { var el = ref.current; if (el) el.scrollTop = el.scrollHeight; check(); }
    R.useLayoutEffect(function () {
      setSb(gutter(ref.current));
      var ro = window.ResizeObserver ? new ResizeObserver(function () { setSb(gutter(ref.current)); check(); }) : null;
      if (ro && inner.current) ro.observe(inner.current);
      return function () { if (ro) ro.disconnect(); };
    }, []);
    /* Land on the newest message on mount, and again whenever the page says the end moved
       (endKey — e.g. a notice appended under the answer). Opening a tool call does not jump. */
    R.useLayoutEffect(function () {
      toEnd();
      var t = setTimeout(toEnd, 150), alive = true;
      /* Web fonts and late layout change the content height after mount — land again once they
         are in (the original re-scrolls on load and 150 ms later for the same reason). */
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { if (alive) { toEnd(); setTimeout(function () { if (alive) toEnd(); }, 150); } });
      function onLoad() { toEnd(); setTimeout(function () { if (alive) toEnd(); }, 150); }
      if (document.readyState !== 'complete') window.addEventListener('load', onLoad);
      return function () { alive = false; clearTimeout(t); window.removeEventListener('load', onLoad); };
    }, [p.endKey]);
    return h('div', { className: IK.cx('ik-thread-wrap', p.className) },
      h('div', { ref: ref, className: 'ik-thread', style: { paddingLeft: sb }, onScroll: check },
        h('div', { ref: inner, className: 'ik-thread-inner' }, p.children)),
      h('div', { className: IK.cx('ik-thread-end', atEnd && 'is-hidden') },
        h(IK.Tip, { tip: 'Scroll to bottom' },
          h(D.IconButton, { variant: 'secondary', size: 'sm', rounded: 'full', type: 'button', 'aria-label': 'Scroll to bottom',
            tabIndex: atEnd ? -1 : undefined, className: 'shadow-card-hover', onClick: toEnd },
            h(IK.Icon, { name: 'chat-chevron' })))));
  };

  IK.ChatTurn = function ChatTurn(p) {
    return h('div', { className: 'ik-turn' }, h('div', { className: 'ik-turn-inner' }, p.children));
  };

  IK.ChatCopyButton = function ChatCopyButton(p) {
    var c = R.useState(false), copied = c[0], setCopied = c[1];
    var tp = R.useState(false), tipOpen = tp[0], setTipOpen = tp[1];
    var over = R.useRef(false);
    var t = R.useRef(0);
    R.useEffect(function () { return function () { clearTimeout(t.current); }; }, []);
    function copy() {
      if (copied) return;
      var text = p.getText ? p.getText() : p.text;
      if (text && navigator.clipboard) { try { navigator.clipboard.writeText(String(text).trim()); } catch (e) {} }
      setCopied(true);
      t.current = setTimeout(function () { setCopied(false); }, 1400);
    }
    /* "Copied" answers the click under the pointer (the original re-tips when the glyph swaps);
       a keyboard press gets the check alone. */
    return h(D.Tooltip, { open: tipOpen || (copied && over.current), onOpenChange: setTipOpen },
      h(D.TooltipTrigger, { asChild: true },
        h(D.IconButton, {
          variant: 'tertiary', size: p.size || '2xs', type: 'button', 'aria-label': p.label || 'Copy', onClick: copy, className: p.className,
          onPointerEnter: function () { over.current = true; }, onPointerLeave: function () { over.current = false; }
        }, h(IK.Icon, { name: copied ? 'chat-check' : 'copy' }))),
      h(D.TooltipContent, { side: 'top' }, copied ? 'Copied' : (p.tip || 'Copy')));
  };

  IK.ChatUserMessage = function ChatUserMessage(p) {
    var bubble = R.useRef(null);
    return h('div', { className: 'ik-msg is-user' },
      h('div', { ref: bubble, className: 'ik-bubble' }, p.children),
      p.foot === false ? null : h('div', { className: 'ik-msg-foot' },
        h(IK.ChatCopyButton, { getText: function () { return bubble.current ? bubble.current.textContent : ''; } }),
        p.time ? h(D.Typography, { element: 'span', textStyle: 'body12', textColor: 'secondary', className: 'tabular-nums' }, p.time) : null));
  };

  IK.ChatAnswer = function ChatAnswer(p) {
    /* The answer and its time sit in their own column, 8px apart (.cp-ai-wrap) — not the row's 4px. */
    var foot = p.foot === false ? null : h('div', { className: 'ik-msg-foot' },
      p.time ? h(D.Typography, { element: 'span', textStyle: 'body12', textColor: 'secondary', className: 'tabular-nums' }, p.time) : null);
    return h('div', { className: 'ik-msg is-ai' },
      h('div', { className: 'ik-answer-wrap' },
        h('div', { className: 'ik-answer' }, p.children),
        p.foot === 'row' ? null : foot),
      p.foot === 'row' ? foot : null);
  };

  IK.ChatHeading = function ChatHeading(p) {
    return h(D.Typography, { element: 'h3', textStyle: 'title16', textColor: 'primary', className: 'm-0' }, p.children);
  };

  IK.ChatList = function ChatList(p) {
    return h(p.ordered ? 'ol' : 'ul', { className: 'ik-list' },
      (p.items || []).map(function (it, i) { return h('li', { key: i }, it); }));
  };

  IK.ChatCode = function ChatCode(p) { return h('code', { className: 'ik-code-chip' }, p.children); };

  IK.defineIcons({
    'chat-file': '<path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"/><path d="M14 2v5a1 1 0 0 0 1 1h5"/>',
    'chat-err': '<circle cx="12" cy="12" r="9"/><path d="M12 8v5"/><path d="M12 16h.01"/>'
  });

  /* Result files — the composer's file chip, without the size and the ✕, opening the file. */
  IK.ChatFileChips = function ChatFileChips(p) {
    return h('div', { className: 'ik-file-chips' },
      (p.files || []).map(function (f) {
        return h('div', { key: f, className: 'ik-file-chip' },
          h(D.File, {
            name: f,
            icon: h(IK.Icon, { name: 'chat-file', size: 20, className: 'shrink-0 text-brand-primary' }),
            onClick: p.onOpen ? function () { p.onOpen(f); } : undefined
          }));
      }));
  };

  IK.ChatDataCard = function ChatDataCard(p) {
    return h('div', { className: 'ik-data-card' },
      h(IK.ChatResultTable, { title: p.title, columns: p.columns, rows: p.rows, wrapColumn: p.wrapColumn }));
  };

  /* Prod's streaming caret: a 1px hairline in the text's own colour, one line tall, blinking. */
  IK.ChatStreamCaret = function ChatStreamCaret() { return h('span', { className: 'ik-caret', 'aria-hidden': 'true' }); };

  IK.ChatTurnState = function ChatTurnState(p) {
    if (p.kind === 'tool') return h('div', { className: 'ik-turn-tool' }, h(D.Spinner, { size: 'xs', color: 'inherit', 'aria-hidden': true }), p.children);
    if (p.kind === 'error') return h('div', { className: 'ik-turn-err' }, h(IK.Icon, { name: 'chat-err', size: 16 }), p.children);
    return h('div', { className: 'ik-turn-stopped' }, p.children || 'Stopped');
  };

  IK.ChatAnswerGroup = function ChatAnswerGroup(p) { return h('div', { className: 'ik-answer-group' }, p.children); };

  IK.ChatProse = function ChatProse(p) { return h('p', { className: 'ik-prose' }, p.children); };

  IK.ChatResultTable = function ChatResultTable(p) {
    var wrap = p.wrapColumn == null ? 2 : p.wrapColumn;
    return h(IK.Fragment, null,
      p.title ? h(D.Typography, { element: 'h3', textStyle: 'title16', textColor: 'primary', className: 'm-0' }, p.title) : null,
      h(D.Table, { wrapperClassName: 'ik-result-tbl' },
        h(D.TableHeader, null,
          h(D.TableRow, null, p.columns.map(function (c, i) {
            return h(D.TableHead, { key: c, className: i === wrap ? 'ik-col-wrap' : 'whitespace-nowrap' }, c);
          }))),
        h(D.TableBody, null, p.rows.map(function (r, ri) {
          return h(D.TableRow, { key: ri }, r.map(function (v, i) {
            return h(D.TableCell, { key: i, className: i === wrap ? 'ik-col-wrap' : 'whitespace-nowrap' }, v);
          }));
        }))));
  };

  IK.ChatComposerArea = function ChatComposerArea(p) {
    return h('div', { className: 'ik-composer-area' }, h('div', { className: 'ik-composer-inner' }, p.children));
  };

  IK.ChatPausedNotice = function ChatPausedNotice(p) {
    return h('div', { className: 'ik-paused-notice' },
      h(D.Alert, {
        variant: 'warning', role: 'note', actionsClassName: 'ik-paused-notice-acts',
        icon: h(IK.Icon, { name: 'connections' }),
        title: "Your subscription ended, so this chat can't use its connections",
        description: 'Answers here came from ' + (p.sources || 'Salesforce and HubSpot') + '. Now the assistant can only use files you upload.',
        actions: h(IK.Locked, { feature: 'connections', locked: true, clickOnly: true, marker: 'none' },
          h(D.Button, { variant: 'secondary', size: 'xs', type: 'button' }, 'Upgrade to Unlock'))
      }));
  };
})();

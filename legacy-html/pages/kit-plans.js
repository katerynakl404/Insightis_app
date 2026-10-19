/* ============================================================================================
   PLAN FEATURES — the one place the product says what a plan opens.

   Every locked control answers with the same two surfaces: the popover on hover, the modal on a
   press. Both were hand-written per page, which meant 14 popovers and 4 modals for SIX features —
   and they had already drifted: the same panel said "Connections" on one page and "Data
   connections" on another, and the metrics benefit was worded two different ways.

   A trigger now names the FEATURE, not a DOM id:

       data-upgrade="connections"          → popover, built on first use
       data-upgrade-modal="connections"    → modal, same entry, one rung louder

   `kit-kit.js` renders them. A page writes no panel markup at all unless the panel carries live
   data (the storage meter on the Files page is the one such exception, and it stays in the page).

   Copy rule: every line here is derivable from the subscription matrix — Free: 20 credits/day, no
   connections, Insightis Light, metrics read-only, 50 MB · Starter: 5 connections, all models,
   full metrics, 500 MB · Pro: unlimited connections, 1 GB. Nothing is invented here.
   ============================================================================================ */
window.KIT_PLAN_FEATURES = {
  connections: {
    plan: 'Starter',
    name: 'Data connections',                       /* popover head */
    title: 'Connect your data sources',             /* modal headline */
    lead: 'Ask questions about live data from your business tools, not just the files you upload.',
    benefits: [
      'Ask about today’s numbers without exporting anything',
      'Five connections on Starter, no limit on Pro',
      'Read-only, and your login details stay with you'
    ]
  },
  metrics: {
    plan: 'Starter',
    name: 'Metrics',
    title: 'Make your own metrics',
    lead: 'Name a number once, like MRR or win rate, and use it in any question by typing @.',
    benefits: [
      'One definition, used the same way by everyone',
      'Built-in metrics for every source you connect',
      'Edit, duplicate and turn them on per chat'
    ]
  },
  'connection-edit': {
    plan: 'Starter',
    name: 'Change a connection',
    title: 'Change a connection',
    lead: 'Rename a source, update its login, choose what it syncs.',
    benefits: [
      'Rename it, update its login, choose what it syncs',
      'Five connections on Starter, no limit on Pro'
    ]
  },
  'connection-test': {
    plan: 'Starter',
    name: 'Test a connection',
    title: 'Test a connection',
    lead: 'Check that a source still answers before you rely on it.',
    benefits: [
      'Check that a source still answers before you rely on it',
      'Run the check any time, on any source you have connected'
    ]
  },
  'model-medium': {
    plan: 'Starter',
    name: 'Insightis Medium',
    title: 'Insightis Medium',
    lead: 'A step up on big tables and questions that take several steps.',
    benefits: [
      'Better with big tables and questions that take several steps',
      'Comes with every other model on the plan'
    ]
  },
  'model-pro': {
    plan: 'Pro',
    name: 'Insightis Pro',
    title: 'Insightis Pro',
    lead: 'The model that holds a long question together.',
    benefits: [
      'Keeps track of a long question from start to finish',
      'Keeps up with wide tables and data joined from several sources'
    ]
  },
  /* The chat's own summary: a Free account meets three limits at once, so this one panel names
     all three rather than sending the person round three separate explanations. */
  plan: {
    plan: 'Starter',
    name: 'Your plan',
    title: 'Ask about your live data',
    lead: 'On Free the assistant answers from uploaded files and the Insightis Light model.',
    benefits: [
      'Five connections on Starter, no limit on Pro',
      'Every model, not only Insightis Light',
      'Write a metric once and use it in any question with @'
    ]
  }
};

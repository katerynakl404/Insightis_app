/* PlanFeatures — the one place the product says what a plan opens.
   Port of pages/kit-plans.js (window.KIT_PLAN_FEATURES), copy verbatim.

   Every locked control answers with the same two surfaces: the UpgradePopover on hover, the
   UpgradeModal on a press. A trigger names the FEATURE, never a panel:

     h(IK.Locked, { feature: 'connections' }, trigger)        // see Locked/Locked.js

   Copy rule (from the original): every line here is derivable from the subscription matrix —
   Free: 20 credits/day, no connections, Insightis Light, metrics read-only, 50 MB · Starter:
   5 connections, all models, full metrics, 500 MB · Pro: unlimited connections, 1 GB.

   API
     IK.PLAN_FEATURES                 { key: { plan, name, title, lead, benefits[] } }
                                        plan     — the plan that opens it ('Starter' | 'Pro')
                                        name     — popover head
                                        title    — modal headline
                                        lead     — modal sentence
                                        benefits — the popover shows the first two, the modal all
     IK.planFeature(keyOrObject)      → the entry, or null (warns once for an unknown key).
                                        An object is passed through, so a page can gate something
                                        the catalogue does not hold yet without editing this file.
     IK.planUrl()                     → Settings → Manage plan (approved/user_profile-modal.html
                                        ?section=manage-plan), where EVERY upgrade CTA leads.

   Usage
     var f = IK.planFeature('metrics');   // f.plan === 'Starter', f.name === 'Metrics'
*/
(function () {
  'use strict';
  var IK = window.InsightisKit;

  IK.PLAN_FEATURES = {
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

  var warned = {};
  IK.planFeature = function (key) {
    if (!key) return null;
    if (typeof key === 'object') return key;
    var cat = IK.PLAN_FEATURES;
    if (Object.prototype.hasOwnProperty.call(cat, key)) return cat[key];
    if (!warned[key]) { warned[key] = 1; console.warn('[InsightisKit] unknown plan feature "' + key + '"'); }
    return null;
  };

  /* One destination for every upgrade CTA — the brief's rule, so it lives here, not per page. */
  IK.planUrl = function () {
    return IK.pageHref ? IK.pageHref('approved/user_profile-modal.html?section=manage-plan')
                       : 'user_profile-modal.html?section=manage-plan';
  };
})();

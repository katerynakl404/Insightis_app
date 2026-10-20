/* WsConnections — connections in a workspace or shared with the person. No search (user, 2026-10-19:
   "забери пошук з конекшенів" — as My Connections, which has none).

     variant 'workspace'  the Owner's tab — IK.DsConnections 'workspace' + menu(c) (Remove from Workspace)
     variant 'shared'     a Member's — IK.DsConnections 'shared': who · which workspace, no actions

   h(IK.WsConnections, { variant, noWs, connections, onOpen(c), selected, menu(c), label })   noWs: no Workspace column (a workspace's own page)                 */
(function () {
  'use strict';
  var IK = window.InsightisKit, R = window.React, h = IK.h;

  IK.WsConnections = function WsConnections(p) {
    return h(IK.DsConnections, { metricsHref: p.metricsHref || IK.wsMetricsHref, variant: p.variant, noWs: p.noWs, tag: p.tag, ownerMark: p.ownerMark, connections: p.connections || [], 'aria-label': p.label, onOpen: p.onOpen, selected: p.selected, menu: p.menu });
  };
})();

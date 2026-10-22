/* WsConnections — connections in a workspace or shared with the person. No search (user, 2026-10-19:
   "забери пошук з конекшенів" — as My Connections, which has none).

     variant 'workspace'  the Owner's tab — IK.DsConnections 'workspace': Data Sources' cells and ⋮ (its handlers,
                          each given the row's id) + Remove from Workspace (onRemoveHere)
     variant 'shared'     a Member's — IK.DsConnections 'shared': who · which workspace, no actions

   h(IK.WsConnections, { variant, noWs, connections, onOpen(c), selected, label,
     onEdit, onTest, onDetails, onDisconnect, onAddMetric, onAddToWorkspace, wsLocked, locked, onRemoveHere })   noWs: no Workspace column (a workspace's own page)                 */
(function () {
  'use strict';
  var IK = window.InsightisKit, h = IK.h;

  IK.WsConnections = function WsConnections(p) {
    return h(IK.DsConnections, { metricsHref: p.metricsHref || IK.wsMetricsHref, variant: p.variant, noWs: p.noWs, tag: p.tag, ownerMark: p.ownerMark, connections: p.connections || [], 'aria-label': p.label, onOpen: p.onOpen, selected: p.selected, menu: p.menu,
      onEdit: p.onEdit, onTest: p.onTest, onDetails: p.onDetails, onDisconnect: p.onDisconnect, onAddMetric: p.onAddMetric, onAddToWorkspace: p.onAddToWorkspace,
      wsLocked: p.wsLocked, locked: p.locked, onRemoveHere: p.onRemoveHere });
  };
})();

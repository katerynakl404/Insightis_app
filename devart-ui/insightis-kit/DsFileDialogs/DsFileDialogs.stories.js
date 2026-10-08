(function () {
  var IK = window.InsightisKit, D = window.DevartUI, R = window.React, h = IK.h;
  function Opener(p) {
    var s = R.useState(false), open = s[0], setOpen = s[1];
    return h(IK.Fragment, null,
      h(D.Button, { variant: 'secondary', size: 'sm', type: 'button', onClick: function () { setOpen(true); } }, p.label),
      p.render(open, setOpen));
  }
  IK.story('DsFileDialogs', { title: 'Rename file — basename preselected, Enter saves', render: function () {
    return h(Opener, { label: 'Rename "quarterly-report.csv"', render: function (o, set) {
      return h(IK.DsRenameFileDialog, { open: o, onOpenChange: set, name: 'quarterly-report.csv', onSave: function (n) { console.log('[story] rename', n); set(false); } });
    } });
  } });
  IK.story('DsFileDialogs', { title: 'Delete file? — one file', render: function () {
    return h(Opener, { label: 'Delete one', render: function (o, set) { return h(IK.DsDeleteFilesDialog, { open: o, onOpenChange: set, count: 1, onConfirm: function () { set(false); } }); } });
  } });
  IK.story('DsFileDialogs', { title: 'Delete N files? — the bulk action', render: function () {
    return h(Opener, { label: 'Delete three', render: function (o, set) { return h(IK.DsDeleteFilesDialog, { open: o, onOpenChange: set, count: 3, onConfirm: function () { set(false); } }); } });
  } });
})();

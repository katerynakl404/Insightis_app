(function () {
  var IK = window.InsightisKit, h = IK.h;
  IK.story('ChatChart', { title: 'Bar chart', description: 'matplotlib-style: skyblue bars, black axes, a white ground in both themes (it is an image).',
    render: function () { return h(IK.ChatChart, { kind: 'bar' }); } });
  IK.story('ChatChart', { title: 'Line chart', description: 'Coral line + markers over a light grid.',
    render: function () { return h(IK.ChatChart, { kind: 'line' }); } });
  IK.story('ChatChart', { title: 'Image plates in an answer', wide: true,
    description: 'Five to a row, 8:5; the file name on a frosted strip. Hover: the card hover border + lift. Click / Enter / Space opens the file (onOpen).',
    render: function () {
      return h(IK.ChatAnswer, { foot: false },
        h(IK.ChatImagePlates, { items: [{ file: 'random_bar_chart.png', kind: 'bar' }, { file: 'random_line_chart.png', kind: 'line' }] }));
    } });
})();

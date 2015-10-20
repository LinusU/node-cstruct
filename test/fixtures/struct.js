let fixtures = []
export default fixtures

fixtures.push({
  name: 'PointWithFlags',
  byteLength: 9,
  examples: [{
    data: { x: 893, y: 536, flags: 6 },
    hexLE: '7d0300001802000006',
    hexBE: '0000037d0000021806'
  }, {
    data: { x: 6269, y: 4630, flags: 18 },
    hexLE: '7d1800001612000012',
    hexBE: '0000187d0000121612'
  }, {
    data: { x: 3828274095, y: 1616079560, flags: 126 },
    hexLE: 'afd32ee4c86a53607e',
    hexBE: 'e42ed3af60536ac87e'
  }, {
    data: { x: 3384557906, y: 3581296030, flags: 144 },
    hexLE: '5241bcc99e3d76d590',
    hexBE: 'c9bc4152d5763d9e90'
  }],
  linkedTypes: new Map(),
  attributes: [
    { name: 'x', type: 'uint32', offset: 0, isArray: false, count: 1 },
    { name: 'y', type: 'uint32', offset: 4, isArray: false, count: 1 },
    { name: 'flags', type: 'char', offset: 8, isArray: false, count: 1 }
  ],
  struct: `
    uint32 x, y;
    char flags;
  `
})

fixtures.push({
  name: 'UglyWhitespace',
  byteLength: 10,
  examples: [{
    data: { x: 893, y: 536, flags: 6, _padding: 0 },
    hexLE: '7d030000180200000600',
    hexBE: '0000037d000002180600'
  }, {
    data: { x: 6269, y: 4630, flags: 18, _padding: 0 },
    hexLE: '7d180000161200001200',
    hexBE: '0000187d000012161200'
  }, {
    data: { x: 3828274095, y: 1616079560, flags: 126, _padding: 0 },
    hexLE: 'afd32ee4c86a53607e00',
    hexBE: 'e42ed3af60536ac87e00'
  }, {
    data: { x: 3384557906, y: 3581296030, flags: 144, _padding: 0 },
    hexLE: '5241bcc99e3d76d59000',
    hexBE: 'c9bc4152d5763d9e9000'
  }],
  linkedTypes: new Map(),
  attributes: [
    { name: 'x', type: 'uint32', offset: 0, isArray: false, count: 1 },
    { name: 'y', type: 'uint32', offset: 4, isArray: false, count: 1 },
    { name: 'flags', type: 'char', offset: 8, isArray: false, count: 1 },
    { name: '_padding', type: 'uint8', offset: 9, isArray: false, count: 1 }
  ],
  struct: `
    uint32 x,

    y;char flags;uint8

    _padding;
  `
})

fixtures.push({
  name: 'FourNumbers',
  byteLength: 8,
  examples: [{
    data: { n: [ 1, 2, 3, 4 ] },
    hexLE: '0100020003000400',
    hexBE: '0001000200030004'
  }, {
    data: { n: [ 59844, 40238, 21319, 54269 ] },
    hexLE: 'c4e92e9d4753fdd3',
    hexBE: 'e9c49d2e5347d3fd'
  }, {
    data: { n: [ 43727, 57425, 39193, 62867 ] },
    hexLE: 'cfaa51e0199993f5',
    hexBE: 'aacfe0519919f593'
  }, {
    data: { n: [ 15057, 18882, 60199, 583 ] },
    hexLE: 'd13ac24927eb4702',
    hexBE: '3ad149c2eb270247'
  }],
  linkedTypes: new Map(),
  attributes: [
    { name: 'n', type: 'uint16', offset: 0, isArray: true, count: 4 }
  ],
  struct: `
    uint16 n[4];
  `
})

fixtures.push({
  name: 'Floats',
  byteLength: 12,
  examples: [{
    data: { a: 3.453094482421875, b: 0.1992 },
    hexLE: '80ff5c40567daeb6627fc93f',
    hexBE: '405cff803fc97f62b6ae7d56'
  }, {
    data: { a: 0.13449113070964813, b: -2.622335082234501e-164 },
    hexLE: '0bb8093e41c5ed0c5f29f89d',
    hexBE: '3e09b80b9df8295f0cedc541'
  }],
  linkedTypes: new Map(),
  attributes: [
    { name: 'a', type: 'float32', offset: 0, isArray: false, count: 1 },
    { name: 'b', type: 'float64', offset: 4, isArray: false, count: 1 }
  ],
  struct: `
    float32 a;
    float64 b;
  `
})

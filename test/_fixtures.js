let fixtures = []
export default fixtures

fixtures.push({
  name: 'PointWithFlags',
  byteLength: 9,
  examples: [{
    data: { x: 893, y: 536, flags: 6 },
    hex: '7d0300001802000006'
  }, {
    data: { x: 6269, y: 4630, flags: 18 },
    hex: '7d1800001612000012'
  }, {
    data: { x: 3828274095, y: 1616079560, flags: 126 },
    hex: 'afd32ee4c86a53607e'
  }, {
    data: { x: 3384557906, y: 3581296030, flags: 144 },
    hex: '5241bcc99e3d76d590'
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
    hex: '7d030000180200000600'
  }, {
    data: { x: 6269, y: 4630, flags: 18, _padding: 0 },
    hex: '7d180000161200001200'
  }, {
    data: { x: 3828274095, y: 1616079560, flags: 126, _padding: 0 },
    hex: 'afd32ee4c86a53607e00'
  }, {
    data: { x: 3384557906, y: 3581296030, flags: 144, _padding: 0 },
    hex: '5241bcc99e3d76d59000'
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
    hex: '0100020003000400'
  }, {
    data: { n: [ 59844, 40238, 21319, 54269 ] },
    hex: 'c4e92e9d4753fdd3'
  }, {
    data: { n: [ 43727, 57425, 39193, 62867 ] },
    hex: 'cfaa51e0199993f5'
  }, {
    data: { n: [ 15057, 18882, 60199, 583 ] },
    hex: 'd13ac24927eb4702'
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
    hex: '80ff5c40567daeb6627fc93f'
  }, {
    data: { a: 0.13449113070964813, b: -2.622335082234501e-164 },
    hex: '0bb8093e41c5ed0c5f29f89d'
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

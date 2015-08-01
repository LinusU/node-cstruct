let fixtures = []
export default fixtures

fixtures.push({
  name: 'int8',
  examples: [
    { hex: 'b3', value: -77 },
    { hex: '19', value: 25 },
    { hex: '2c', value: 44 },
    { hex: '51', value: 81 },
    { hex: 'ee', value: -18 }
  ]
})

fixtures.push({
  name: 'int16',
  examples: [
    { hex: 'f7fa', value: -1289 },
    { hex: 'ae4b', value: 19374 },
    { hex: 'fa5f', value: 24570 },
    { hex: '139f', value: -24813 },
    { hex: '14e6', value: -6636 },
    { hex: 'efcd', value: -12817 },
    { hex: 'fb67', value: 26619 },
    { hex: '8c15', value: 5516 },
    { hex: 'be3d', value: 15806 }
  ]
})

fixtures.push({
  name: 'int32',
  examples: [
    { hex: '13447af5', value: -176536557 },
    { hex: '08904c29', value: 692883464 },
    { hex: 'bafddde7', value: -404881990 },
    { hex: 'ad8ee290', value: -1864200531 },
    { hex: '3240561d', value: 492191794 },
    { hex: '5cf8a675', value: 1973876828 },
    { hex: 'f3483ddf', value: -549631757 },
    { hex: 'c869a6ca', value: -895063608 },
    { hex: '4db33cab', value: -1422085299 }
  ]
})

fixtures.push({
  name: 'uint8',
  examples: [
    { hex: 'b3', value: 179 },
    { hex: '89', value: 137 },
    { hex: '8f', value: 143 },
    { hex: '17', value: 23 },
    { hex: 'ee', value: 238 },
    { hex: '5f', value: 95 },
    { hex: '55', value: 85 },
    { hex: '54', value: 84 },
    { hex: '0e', value: 14 },
    { hex: 'e4', value: 228 },
    { hex: '8a', value: 138 },
    { hex: 'd3', value: 211 },
    { hex: '4d', value: 77 }
  ]
})

fixtures.push({
  name: 'uint16',
  examples: [
    { hex: 'f77a', value: 31479 },
    { hex: 'fcde', value: 57084 },
    { hex: 'af9e', value: 40623 },
    { hex: '5803', value: 856 },
    { hex: '6b08', value: 2155 },
    { hex: '657e', value: 32357 },
    { hex: '9e5c', value: 23710 },
    { hex: 'b110', value: 4273 },
    { hex: 'cd85', value: 34253 }
  ]
})

fixtures.push({
  name: 'uint32',
  examples: [
    { hex: '13447af5', value: 4118430739 },
    { hex: '511a6b4d', value: 1298864721 },
    { hex: '5e32974e', value: 1318531678 },
    { hex: '7f9c8cf1', value: 4052524159 },
    { hex: '88ab964e', value: 1318497160 },
    { hex: 'a3f2ccc7', value: 3352097443 },
    { hex: 'ab16d0d2', value: 3536852651 },
    { hex: '586030c4', value: 3291504728 },
    { hex: '0bc5f101', value: 32621835 }
  ]
})

fixtures.push({
  name: 'float',
  examples: [
    { hex: '80ff5c40', value: 3.453094482421875 },
    { hex: '96e2ed5e', value: 8570714029234848000 },
    { hex: 'c546dc73', value: 3.4904195724424225e+31 },
    { hex: 'd1e0408d', value: -5.943518079706739e-31 },
    { hex: '02e2bc5e', value: 6805221611445158000 },
    { hex: 'a8b80d6d', value: 2.741288880824242e+27 },
    { hex: '79ff3aca', value: -3063774.25 },
    { hex: '77d550c6', value: -13365.3662109375 },
    { hex: 'e2b221ed', value: -3.127708914497068e+27 }
  ]
})

fixtures.push({
  name: 'double',
  examples: [
    { hex: '567daeb6627fc93f', value: 0.1992 },
    { hex: '9792d529d669434e', value: 1.0467697580399084e+69 },
    { hex: '4297a8682de6961b', value: 9.041521738567626e-176 },
    { hex: 'fc3823d8d69852c5', value: -8.99297105441835e+25 },
    { hex: '20989fae54f4e970', value: 8.252355009595507e+235 },
    { hex: 'ac819eb1156225f1', value: -1.0878227967963215e+237 },
    { hex: '9ad02eda5b822219', value: 1.3293541263765827e-187 },
    { hex: '8c764e6a41944f07', value: 1.8242065766058435e-273 },
    { hex: '76b611b2e05a6de5', value: -3.806531016287498e+180 }
  ]
})

fixtures.push({
  name: 'bool',
  examples: [
    { hex: '00', value: false },
    { hex: '01', value: true }
  ]
})

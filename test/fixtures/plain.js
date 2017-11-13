'use strict'

/**
 * @typedef Example
 * @property {string} hexLE
 * @property {string} hexBE
 * @property {any} value
 */

/**
 * @typedef Fixture
 * @property {string} name
 * @property {Example[]} examples
 */

/**
 * @type {Fixture[]}
 */
let fixtures = []

fixtures.push({
  name: 'int8',
  examples: [
    { hexLE: 'b3', hexBE: 'b3', value: -77 },
    { hexLE: '19', hexBE: '19', value: 25 },
    { hexLE: '2c', hexBE: '2c', value: 44 },
    { hexLE: '51', hexBE: '51', value: 81 },
    { hexLE: 'ee', hexBE: 'ee', value: -18 }
  ]
})

fixtures.push({
  name: 'int16',
  examples: [
    { hexLE: 'f7fa', hexBE: 'faf7', value: -1289 },
    { hexLE: 'ae4b', hexBE: '4bae', value: 19374 },
    { hexLE: 'fa5f', hexBE: '5ffa', value: 24570 },
    { hexLE: '139f', hexBE: '9f13', value: -24813 },
    { hexLE: '14e6', hexBE: 'e614', value: -6636 },
    { hexLE: 'efcd', hexBE: 'cdef', value: -12817 },
    { hexLE: 'fb67', hexBE: '67fb', value: 26619 },
    { hexLE: '8c15', hexBE: '158c', value: 5516 },
    { hexLE: 'be3d', hexBE: '3dbe', value: 15806 }
  ]
})

fixtures.push({
  name: 'int32',
  examples: [
    { hexLE: '13447af5', hexBE: 'f57a4413', value: -176536557 },
    { hexLE: '08904c29', hexBE: '294c9008', value: 692883464 },
    { hexLE: 'bafddde7', hexBE: 'e7ddfdba', value: -404881990 },
    { hexLE: 'ad8ee290', hexBE: '90e28ead', value: -1864200531 },
    { hexLE: '3240561d', hexBE: '1d564032', value: 492191794 },
    { hexLE: '5cf8a675', hexBE: '75a6f85c', value: 1973876828 },
    { hexLE: 'f3483ddf', hexBE: 'df3d48f3', value: -549631757 },
    { hexLE: 'c869a6ca', hexBE: 'caa669c8', value: -895063608 },
    { hexLE: '4db33cab', hexBE: 'ab3cb34d', value: -1422085299 }
  ]
})

fixtures.push({
  name: 'uint8',
  examples: [
    { hexLE: 'b3', hexBE: 'b3', value: 179 },
    { hexLE: '89', hexBE: '89', value: 137 },
    { hexLE: '8f', hexBE: '8f', value: 143 },
    { hexLE: '17', hexBE: '17', value: 23 },
    { hexLE: 'ee', hexBE: 'ee', value: 238 },
    { hexLE: '5f', hexBE: '5f', value: 95 },
    { hexLE: '55', hexBE: '55', value: 85 },
    { hexLE: '54', hexBE: '54', value: 84 },
    { hexLE: '0e', hexBE: '0e', value: 14 },
    { hexLE: 'e4', hexBE: 'e4', value: 228 },
    { hexLE: '8a', hexBE: '8a', value: 138 },
    { hexLE: 'd3', hexBE: 'd3', value: 211 },
    { hexLE: '4d', hexBE: '4d', value: 77 }
  ]
})

fixtures.push({
  name: 'uint16',
  examples: [
    { hexLE: 'f77a', hexBE: '7af7', value: 31479 },
    { hexLE: 'fcde', hexBE: 'defc', value: 57084 },
    { hexLE: 'af9e', hexBE: '9eaf', value: 40623 },
    { hexLE: '5803', hexBE: '0358', value: 856 },
    { hexLE: '6b08', hexBE: '086b', value: 2155 },
    { hexLE: '657e', hexBE: '7e65', value: 32357 },
    { hexLE: '9e5c', hexBE: '5c9e', value: 23710 },
    { hexLE: 'b110', hexBE: '10b1', value: 4273 },
    { hexLE: 'cd85', hexBE: '85cd', value: 34253 }
  ]
})

fixtures.push({
  name: 'uint32',
  examples: [
    { hexLE: '13447af5', hexBE: 'f57a4413', value: 4118430739 },
    { hexLE: '511a6b4d', hexBE: '4d6b1a51', value: 1298864721 },
    { hexLE: '5e32974e', hexBE: '4e97325e', value: 1318531678 },
    { hexLE: '7f9c8cf1', hexBE: 'f18c9c7f', value: 4052524159 },
    { hexLE: '88ab964e', hexBE: '4e96ab88', value: 1318497160 },
    { hexLE: 'a3f2ccc7', hexBE: 'c7ccf2a3', value: 3352097443 },
    { hexLE: 'ab16d0d2', hexBE: 'd2d016ab', value: 3536852651 },
    { hexLE: '586030c4', hexBE: 'c4306058', value: 3291504728 },
    { hexLE: '0bc5f101', hexBE: '01f1c50b', value: 32621835 }
  ]
})

fixtures.push({
  name: 'float',
  examples: [
    { hexLE: '80ff5c40', hexBE: '405cff80', value: 3.453094482421875 },
    { hexLE: '96e2ed5e', hexBE: '5eede296', value: 8570714029234848000 },
    { hexLE: 'c546dc73', hexBE: '73dc46c5', value: 3.4904195724424225e+31 },
    { hexLE: 'd1e0408d', hexBE: '8d40e0d1', value: -5.943518079706739e-31 },
    { hexLE: '02e2bc5e', hexBE: '5ebce202', value: 6805221611445158000 },
    { hexLE: 'a8b80d6d', hexBE: '6d0db8a8', value: 2.741288880824242e+27 },
    { hexLE: '79ff3aca', hexBE: 'ca3aff79', value: -3063774.25 },
    { hexLE: '77d550c6', hexBE: 'c650d577', value: -13365.3662109375 },
    { hexLE: 'e2b221ed', hexBE: 'ed21b2e2', value: -3.127708914497068e+27 }
  ]
})

fixtures.push({
  name: 'double',
  examples: [
    { hexLE: '567daeb6627fc93f', hexBE: '3fc97f62b6ae7d56', value: 0.1992 },
    { hexLE: '9792d529d669434e', hexBE: '4e4369d629d59297', value: 1.0467697580399084e+69 },
    { hexLE: '4297a8682de6961b', hexBE: '1b96e62d68a89742', value: 9.041521738567626e-176 },
    { hexLE: 'fc3823d8d69852c5', hexBE: 'c55298d6d82338fc', value: -8.99297105441835e+25 },
    { hexLE: '20989fae54f4e970', hexBE: '70e9f454ae9f9820', value: 8.252355009595507e+235 },
    { hexLE: 'ac819eb1156225f1', hexBE: 'f1256215b19e81ac', value: -1.0878227967963215e+237 },
    { hexLE: '9ad02eda5b822219', hexBE: '1922825bda2ed09a', value: 1.3293541263765827e-187 },
    { hexLE: '8c764e6a41944f07', hexBE: '074f94416a4e768c', value: 1.8242065766058435e-273 },
    { hexLE: '76b611b2e05a6de5', hexBE: 'e56d5ae0b211b676', value: -3.806531016287498e+180 }
  ]
})

fixtures.push({
  name: 'bool',
  examples: [
    { hexLE: '00', hexBE: '00', value: false },
    { hexLE: '01', hexBE: '01', value: true }
  ]
})

module.exports = fixtures

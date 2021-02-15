let lod = require('lodash');
let moment = require('moment');

const mom = moment().format('LT');
console.log(mom);
let a = lod.difference([2, 1], [2, 3]);
console.log(a);

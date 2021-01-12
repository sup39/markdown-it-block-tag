const mdi = require('markdown-it');
const mia = require('@sup39/markdown-it-attr');
const mit = require('@sup39/markdown-it-inline-tag');
const mbt = require('..');
const test = require('./test.js');

describe('Common', () => {
  const md = mdi().use(mbt);
  test(md, 'common.txt');
});
describe('w/Extension', () => {
  const md = mdi().use(mbt).use(mia).use(mit);
  test(md, 'common.txt');
});

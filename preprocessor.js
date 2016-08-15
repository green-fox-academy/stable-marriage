var husbands = require('./husbands.js');
var wives = require('./wives.js');

var unengagedMen = [];
var engagements = [];
var nextCandidateIndex = [];

function createOneItemList(identifier) {
  return [ { name: identifier } ];
}

function createIndexedItems(identifier, indexValue) {
  return [ { name: identifier, index: indexValue } ];
}

function createUnengagedMen() {
  for (var i = 0; i < husbands.length; ++i) {
    unengagedMen.push(createOneItemList(husbands[i].name));
  }
}

createUnengagedMen();

function createNextCandidateIndex() {
  for (var i = 0; i < husbands.length; ++i) {
    nextCandidateIndex.push(createIndexedItems(husbands[i].name, 0));
  }
}

createNextCandidateIndex();

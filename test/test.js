var test = require('tape');

// var main = require('../main.js')
var main = require('../main_refactor.js')
// var proposers = require('../proposers.js');
// var receivers = require('../receivers.js');
// var originalProposers = require('../proposers.js');
// var originalReceivers = require('../receivers.js');
var empty_proposers = require('../test_empty_proposers.js');

// *************************preprocessor tests**********************************

test('preprocessor functions are functions', function(t){
  t.equal(typeof main.createOneItemList, 'function');
  t.equal(typeof main.createTwoItemsList, 'function');
  t.equal(typeof main.createIndexedItems, 'function');
  t.equal(typeof main.createFourItemsList, 'function');
  t.end();
});

test('preprocessor functions return objects', function(t){
  t.equal(typeof main.createOneItemList(3), 'object');
  t.equal(typeof main.createTwoItemsList(3, 4), 'object');
  t.equal(typeof main.createIndexedItems(3, 4), 'object');
  t.equal(typeof main.createFourItemsList(3, 4, 5, 6), 'object');
  t.end();
});

test('preprocessor functions return the required format', function(t) {
  t.deepEqual(main.createOneItemList(1), [{ ID: 1 }]);
  t.deepEqual(main.createTwoItemsList(1, 2), [{ ID: 1, preferenceList: 2 }]);
  t.deepEqual(main.createIndexedItems(1, 2), [{ ID: 1, index: 2 }]);
  t.deepEqual(main.createFourItemsList(3, 2 , 1, 2), [{proposerID: 3, proposerPreferenceAt: 2,  receiverID: 1, receiverPreferenceAt: 2 }]);
  t.end();
});

test('preprocessor functions can accept strings as input', function(t) {
  t.deepEqual(main.createOneItemList('Pista'), [{ ID: 'Pista' }]);
  t.deepEqual(main.createTwoItemsList('Pista', 2), [{ ID: 'Pista', preferenceList: 2 }]);
  t.deepEqual(main.createIndexedItems('Pista', 2), [{ ID: 'Pista', index: 2 }]);
  t.deepEqual(main.createFourItemsList('vidampark', 2 ,'Pista', 2), [{proposerID: 'vidampark', proposerPreferenceAt: 2,  receiverID: 'Pista', receiverPreferenceAt: 2 }]);
  t.end();
});

// *****************************************************************************

test('proposers is an object', function(t){
  t.equal(typeof main.proposers, 'object');
  t.deepEqual(main.proposers, [ [ { ID: 1, preferenceList: [ 1, 4, 3, 2 ] } ], [ { ID: 2, preferenceList
: [ 1, 4, 3, 2 ] } ], [ { ID: 3, preferenceList: [ 3, 2, 1, 4 ] } ], [ { ID: 4,
preferenceList: [ 4, 3, 2, 1 ] } ] ]);
  t.end();
});

test('receivers is an object', function(t){
  t.equal(typeof main.receivers, 'object');
  t.deepEqual(main.receivers, [ [ { ID: 1, preferenceList: [ 3, 2, 4, 1 ] } ], [ { ID: 2, preferenceList
: [ 2, 3, 4, 1 ] } ], [ { ID: 3, preferenceList: [ 4, 1, 2, 3 ] } ], [ { ID: 4,
preferenceList: [ 4, 1, 2, 3 ] } ] ]);
  t.end();
});

test('unengagedProposers is an object', function(t){
  t.equal(typeof main.unengagedProposers, 'object');
  t.deepEqual(main.unengagedProposers, [ [ { ID: 1 } ], [ { ID: 2 } ], [ { ID: 3 } ], [ { ID: 4 } ] ]);
  t.end();
});

test('nextCandidateIndex is an object', function(t){
  t.equal(typeof main.nextCandidateIndex, 'object');
  t.deepEqual(main.nextCandidateIndex, [ [ { ID: 1, index: 0 } ], [ { ID: 2, index: 0 } ], [ { ID: 3, index: 0 }
], [ { ID: 4, index: 0 } ] ]);
  t.end();
});

// *****************************************************************************

test('isUnengagedproposerLeft returns a boolean', function(t){
  t.equal(typeof main.isUnengagedproposerLeft(), 'boolean');
  t.end();
});

test('isUnengagedproposerLeft returns true initially', function(t){
  t.equal(main.isUnengagedproposerLeft(), true);
  t.end();
});

// *****************************************************************************

test('getCurrentUnengagedproposer returns the proper ID, which is a number', function(t){
  t.equal(main.getCurrentUnengagedproposer(), 1);
  t.deepEqual(main.unengagedProposers, [ [ { ID: 2 } ], [ { ID: 3 } ], [ { ID: 4 } ] ]);
  t.equal(main.getCurrentUnengagedproposer(), 2);
  t.end();
});

test('searchCurrentCandidateIndex returns the proper item, which is an object', function(t){
  t.deepEqual(main.searchCurrentCandidateIndex(4), [ [ { ID: 4, index: 0 } ] ]);
  t.equal(typeof main.searchCurrentCandidateIndex(), 'object');
  t.end();
});

test('getCurrentCandidateIndex returns the proper item, which is an object', function(t){
  t.equal(main.getCurrentCandidateIndex(1), 0);
  t.end();
});

test('incrementCurrentCandidateIndex returns the proper item, which is a number', function(t){
  t.equal(main.incrementCurrentCandidateIndex(1), 1);
  t.end();
});

test('getCurrentCandidate returns the proper item, which is a number', function(t){
  t.equal(main.getCurrentCandidate(1, 1), 4);
  t.end();
});

test('getreceiverPreferredIndex returns the proper item, which is a number', function(t){
  t.equal(main.getreceiverPreferredIndex(1, 1), 3);
  t.end();
});

test('isEngaged returns the proper item, which is a boolean', function(t){
  t.equal(main.isEngaged(1), false);
  t.equal(typeof main.isEngaged(1), 'boolean');
  t.end();
});

test('unengageproposer returns the proper item', function(t){
  main.unengageproposer(2);
  t.equal(main.nextCandidateIndex[1][0].index, 1);
  t.end();
});

// test('reEngage returns the proper item', function(t){
//   main.engagements = [ [ { proposerID: 3, proposerPreferenceAt: 0, receiverID: 2, receiverPreferenceAt:1} ] ];
//   main.reEngage(3, 1, 2, 1);
//   t.deepEqual(main.engagements, [ [ { proposerID: 3, proposerPreferenceAt: 1, receiverID: 2, receiverPreferenceAt:1} ] ]);
//   t.end();
// });

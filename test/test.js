var test = require('tape');
var main = require('../main.js')
var proposers = require('../proposers.js');
var receivers = require('../receivers.js');
var empty_proposers = require('../test_empty_proposers.js');

// *************************preprocessor tests**********************************

test('preprocessor functions are functions', function(t){
  t.equal(typeof main.createOneItemList, 'function');
  t.equal(typeof main.createTwoItemsList, 'function');
  t.equal(typeof main.createIndexedItems, 'function');
  t.equal(typeof main.createFourItemsList, 'function');
  t.end();
})

test('preprocessor functions return objects', function(t){
  t.equal(typeof main.createOneItemList(3), 'object');
  t.equal(typeof main.createTwoItemsList(3, 4), 'object');
  t.equal(typeof main.createIndexedItems(3, 4), 'object');
  t.equal(typeof main.createFourItemsList(3, 4, 5, 6), 'object');
  t.end();
})

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

// *************************basic main functions tests***************************

test('main functions are functions', function(t){
  t.equal(typeof main.isUnengagedproposerLeft, 'function');
  t.equal(typeof main.getCurrentUnengagedproposer, 'function');
  t.equal(typeof main.getCurrentCandidateIndex, 'function');
  t.equal(typeof main.incrementCurrentCandidateIndex, 'function');
  t.equal(typeof main.getCurrentCandidate, 'function');
  t.equal(typeof main.getreceiverPreferredIndex, 'function');
  t.equal(typeof main.isEngaged, 'function');
  t.equal(typeof main.getMarriedreceiverIndex, 'function');
  t.equal(typeof main.unengageproposer, 'function');
  t.equal(typeof main.reEngage, 'function');
  t.equal(typeof main.engage, 'function');
  t.equal(typeof main.solution, 'function');
  t.end();
})

// ******************************************************************************

test('isUnengagedproposerLeft returns a boolean', function(t){
  t.equal(typeof main.isUnengagedproposerLeft(), 'boolean');
  t.end();
})

test('isUnengagedproposerLeft returns false if unengagedproposers is empty', function(t){
  main.createUnengagedproposers(empty_proposers);
  t.deepEqual(main.isUnengagedproposerLeft(), false);
  t.end();
})

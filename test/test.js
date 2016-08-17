var test = require('tape');
var prep = require('../preprocessor.js');
var husbands = require('../husbands.js');
var wives = require('../wives.js');

test('basic datastructure', function(t) {

  t.deepEqual(prep.createOneItemList('Pista'), [{ name: 'Pista' }]);

  t.deepEqual(prep.createIndexedItems('Pista', 2), [{ name: 'Pista', index: 2 }]);

  t.deepEqual(prep.createFourItemsList('vidampark', 2 ,'Pista', 2), [{companyName: 'vidampark', companyPreferenceAt: 2,  studentName: 'Pista', studentPreferenceAt: 2 }]);

  t.end();
});

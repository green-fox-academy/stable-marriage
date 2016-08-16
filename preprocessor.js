var proposers = require('./proposers.js');
var receivers = require('./receivers.js');

var unengagedMen = [];
var engagements = [];
var nextCandidateIndex = [];

var preprocess = (function () {

  function createOneItemList(identifier) {
    return [ { name: identifier } ];
  }

  function createIndexedItems(identifier, indexValue) {
    return [ { name: identifier, index: indexValue } ];
  }

  function createFourItemsList(company, companyIndex, student, studentIndex) {
    return [ { companyName: company, companyPreferenceAt: companyIndex, studentName: student, studentPreferenceAt: studentIndex } ];
  }

  function createProposers() {
    
  }

  function createUnengagedMen() {
    for (var i = 0; i < proposers.length; ++i) {
      unengagedMen.push(createOneItemList(proposers[i].name));
    }
  }

  function createNextCandidateIndex() {
    for (var i = 0; i < proposers.length; ++i) {
      nextCandidateIndex.push(createIndexedItems(proposers[i].name, 0));
    }
  }

  return {
    createOneItemList: createOneItemList,
    createIndexedItems: createIndexedItems,
    createFourItemsList: createFourItemsList,
    createUnengagedMen: createUnengagedMen,
    createNextCandidateIndex: createNextCandidateIndex
  }
}) ();

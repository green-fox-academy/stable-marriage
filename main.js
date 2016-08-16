var originalProposers = require('./proposers.js');
var originalReceivers = require('./receivers.js');

function createOneItemList(identifier) {
  return [ { id: identifier } ];
}

function createTwoItemsList(identifier, list) {
  return [ { id: identifier, preferenceList: list } ];
}

function createIndexedItems(identifier, indexValue) {
  return [ { id: identifier, index: indexValue } ];
}

function createFourItemsList(proposer, proposerIndex, receiver, receiverIndex) {
  return [ { proposerid: proposer, proposerPreferenceAt: proposerIndex, receiverid: receiver, receiverPreferenceAt: receiverIndex } ];
}

var unengagedProposers = [];
var proposers = [];
var receivers = [];
var engagements = [];
var nextCandidateIndex = [];

// ***************create lists****************************

function createProposers() {
  for (var i = 0; i < originalProposers.length; ++i) {
    proposers.push(createTwoItemsList(originalProposers[i].id, originalProposers[i].priority_list));
  }
}

createProposers()

function createReceivers() {
  for (var i = 0; i < originalReceivers.length; ++i) {
    receivers.push(createTwoItemsList(originalReceivers[i].id, originalReceivers[i].priority_list));
  }
}

createReceivers()

function createunengagedProposers() {
  for (var i = 0; i < proposers.length; ++i) {
    unengagedProposers.push(createOneItemList(proposers[i][0].id));
  }
  return unengagedProposers;
};

createunengagedProposers();

function createNextCandidateIndex() {
  for (var i = 0; i < proposers.length; ++i) {
    nextCandidateIndex.push(createIndexedItems(proposers[i][0].id, 0));
  }
  return nextCandidateIndex;
};

createNextCandidateIndex();

// ********************************************************

function isUnengagedproposerLeft() {
  return unengagedProposers.length > 0;
}

function getCurrentUnengagedproposer() {
  var proposerid = unengagedProposers[0][0].id;
  unengagedProposers.shift();
  return proposerid;
}

function getCurrentCandidateIndex(proposerid) {
  var currentCandidateIndex = -1;
  for (var i = 0; i < nextCandidateIndex.length; ++i) {
    if (nextCandidateIndex[i][0].id = proposerid) {
      currentCandidateIndex = nextCandidateIndex[i][0].index;
      break;
    }
  }
  return currentCandidateIndex;
}

function incrementCurrentCandidateIndex(proposerid) {
  for (var i = 0; i < nextCandidateIndex.length; ++i) {
    if (nextCandidateIndex[i][0].id == proposerid) {
      ++nextCandidateIndex[i][0].index;
      break;
    }
  }
};

function getCurrentCandidate(proposerid) {
  var currentCandidate = 'Undefined';
  var currentCandidateIndex = getCurrentCandidateIndex(proposerid);
  for (var i = 0; i < proposers.length; ++i) {
    if (proposers[i][0].id == proposerid) {
      currentCandidate = proposers[i][0].preferenceList[currentCandidateIndex];
      break;
    }
  }
  return currentCandidate;
}

function getreceiverPrefersproposerAtIndex(proposerid) {
  var receiverPrefersproposerAtIndex = -1;
  var receiver = getCurrentCandidate(proposerid);
  for (var i = 0; i < receivers.length; ++i) {
    if (receivers[i][0].id == receiver) {
      receiverPrefersproposerAtIndex = receivers[i][0].preferenceList.indexOf(proposerid);
      break;
    }
  }
  return receiverPrefersproposerAtIndex;
}

function isreceiverEngaged(receiver) {
  for (var i = 0; i < engagements.length; ++i) {
    if (engagements[i][0].receiverid == receiver) {
      return true;
    } else {
      return false;
    }
  }
}

function getMarriedreceiverIndex(receiver) {
  var receiverPreferenceAt = -1;
  for (var i = 0; i < engagements.length; ++i) {
    if (engagements[i][0].receiverid == receiver) {
      receiverPreferenceAt = engagements[i][0].receiverPreferenceAt;
      break;
    }
  }
  return receiverPreferenceAt;
}

function setproposerBackOnMarket(proposerid) {
  unengagedProposers.push(createOneItemList(proposerid));
  incrementCurrentCandidateIndex(proposerid);
}

function reEngage(newproposerid, proposerPreferenceAt, currentCandidate, receiverPreferenceAt) {
  for (var i = 0; i < engagements.length; ++i) {
    if (engagements[i][0].receiverid == currentCandidate) {
      setproposerBackOnMarket(engagements[i][0].proposerid);
      engagements[i][0].proposerid = newproposerid;
      engagements[i][0].proposerPreferenceAt = proposerPreferenceAt;
      engagements[i][0].receiverPreferenceAt = receiverPreferenceAt;
      break;
    }
  }
}

function engage(proposerid, proposerPreferenceAt, currentCandidate, receiverPreferenceAt) {
  if (isreceiverEngaged(currentCandidate)) {
    var marriedreceiverIndex = getMarriedreceiverIndex(currentCandidate);
    if (marriedreceiverIndex > receiverPreferenceAt) {
      reEngage(proposerid, proposerPreferenceAt, currentCandidate, receiverPreferenceAt)
    } else {
      setproposerBackOnMarket(proposerid)
    }
  } else {
    engagements.push(createFourItemsList(proposerid, proposerPreferenceAt, currentCandidate, receiverPreferenceAt))
  }
}
// ********************************************************

function solve() {
  while (isUnengagedproposerLeft()) {
    var proposerid = getCurrentUnengagedproposer();
    var proposerPreferenceAt = getCurrentCandidateIndex(proposerid);
    var currentCandidate = getCurrentCandidate(proposerid);
    var receiverPreferenceAt = getreceiverPrefersproposerAtIndex(proposerid)
    engage(proposerid, proposerPreferenceAt, currentCandidate, receiverPreferenceAt)
    console.log('***********************************************');
    for (var i = 0; i < engagements.length; ++i) {
      console.log(engagements[i][0]);
    }
  }
}

solve();

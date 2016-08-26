var originalProposers = require('./proposers.js');
var originalReceivers = require('./receivers.js');

function createOneItemList(identifier) {
  return [ { ID: identifier } ];
}

function createTwoItemsList(identifier, list) {
  return [ { ID: identifier, preferenceList: list } ];
}

function createIndexedItems(identifier, indexValue) {
  return [ { ID: identifier, index: indexValue } ];
}

function createFourItemsList(proposer, proposerIndex, receiver, receiverIndex) {
  return [ { proposerID: proposer, proposerPreferenceAt: proposerIndex, receiverID: receiver, receiverPreferenceAt: receiverIndex } ];
}

var engagements = [];

var proposers = originalProposers.map(function(proposer) {
  return createTwoItemsList(proposer.id, proposer.priority_list);
});

var receivers = originalReceivers.map(function(receiver) {
  return createTwoItemsList(receiver.id, receiver.priority_list);
});

var unengagedProposers = proposers.map(function(proposer) {
  return createOneItemList(proposer[0].ID);
});

var nextCandidateIndex = proposers.map(function(proposer) {
  return createIndexedItems(proposer[0].ID, 0);
});

function isUnengagedproposerLeft() {
  return unengagedProposers.length > 0;
}

function getCurrentUnengagedproposer() {
  var proposerID = unengagedProposers[0][0].ID;
  unengagedProposers.shift();
  return proposerID;
}

function searchCurrentCandidateIndex(proposerID) {
  var toFind = nextCandidateIndex.filter(function(listItem) {
    return listItem[0].ID === proposerID;
  });
  return toFind;
}

function getCurrentCandidateIndex(proposerID) {
  var currentCandidateIndex = -1;
  var toFind = searchCurrentCandidateIndex(proposerID);
  currentCandidateIndex = toFind[0][0].index;
  return currentCandidateIndex;
}

function incrementCurrentCandidateIndex(proposerID) {
  var toIncrement = nextCandidateIndex.filter(function(listItem) {
    return listItem[0].ID === proposerID;
  });
  return ++toIncrement[0][0].index;
}

function getCurrentCandidate(proposerID, currentCandidateIndex) {
  var currentCandidate = 'Undefined';
  var currentObject = proposers.filter(function(listItem) {
    return listItem[0].ID === proposerID;
  });
  currentCandidate = currentObject[0][0].preferenceList[currentCandidateIndex];
  return currentCandidate;
}

function getRecWithPrefInd(receiverID) {
  var recToFind = receivers.filter(function(receiver) {
    return receiver[0].ID === receiverID;
  });
  return recToFind;
}

function getFoundRecPrefInd(receiver, proposerID) {
  var propIndex = receiver[0][0].preferenceList.indexOf(proposerID);
  return propIndex;
}

function getreceiverPreferredIndex(receiverID, proposerID) {
  var receiverToFind = getRecWithPrefInd(receiverID);
  var searchedIndex = getFoundRecPrefInd(receiverToFind, proposerID);
  return searchedIndex;
}

function checkEngagementsList(currentCandidate) {
  var toFindPref = engagements.filter(function(engagement) {
    return engagement[0].receiverID === currentCandidate;
  });
  return toFindPref;
}

function isEngaged(currentCandidate) {
  var toCheck = checkEngagementsList(currentCandidate);
  if (toCheck.length > 0) {
    return true;
  }
  return false;
}

function findMarriedReceiverIndex(receiverID) {
  var getIndex = engagements.filter(function(engagement) {
    return engagement[0].receiverID === receiverID;
  });
  return getIndex;
}

function getMarriedreceiverIndex(receiverID) {
  var getPrefIndex = findMarriedReceiverIndex(receiverID);
  return getPrefIndex[0][0].receiverPreferenceAt;
}

function unengageproposer(proposerID) {
  unengagedProposers.push(createOneItemList(proposerID));
  incrementCurrentCandidateIndex(proposerID);
}

function getCandidateToUnengage(current) {
  var candToFind = engagements.filter(function(engagement) {
    return engagement[0].receiverID === current;
  });
  return candToFind[0];
}

function reEngage(proposerID, currentCandidateIndex, currentCandidate, receiverPreferredIndex) {
  var toReEngage = getCandidateToUnengage(currentCandidate);
  unengageproposer(toReEngage[0].proposerID);
  toReEngage[0].proposerID = proposerID;
  toReEngage[0].proposerPreferenceAt = currentCandidateIndex;
  toReEngage[0].receiverPreferenceAt = receiverPreferredIndex;
  return;
}

function engage(proposerID, currentCandidateIndex, currentCandidate, receiverPreferredIndex) {
  if (isEngaged(currentCandidate)) {
    var marriedreceiverIndex = getMarriedreceiverIndex(currentCandidate);
    if (receiverPreferredIndex < marriedreceiverIndex) {
      reEngage(proposerID, currentCandidateIndex, currentCandidate, receiverPreferredIndex);
    } else {
      unengageproposer(proposerID);
    }
  } else {
    engagements.push(createFourItemsList(proposerID, currentCandidateIndex, currentCandidate, receiverPreferredIndex));
  }
}

function solution() {
  while (isUnengagedproposerLeft()) {
    var proposerID = getCurrentUnengagedproposer();
    var currentCandidateIndex = getCurrentCandidateIndex(proposerID);
    var currentCandidate = getCurrentCandidate(proposerID, currentCandidateIndex);
    var receiverPreferredIndex = getreceiverPreferredIndex(currentCandidate, proposerID);
    engage(proposerID, currentCandidateIndex, currentCandidate, receiverPreferredIndex);
    console.log('****************************************************');
    for (var i = 0; i < engagements.length; ++i) {
      console.log(engagements[i][0]);
    }
  }
}

solution();

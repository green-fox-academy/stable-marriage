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

var numberOfReceivers = originalReceivers.length;
var unengagedproposers = [];
var proposers = [];
var receivers = [];
var engagements = [];
var nextCandidateIndex = [];

function createProposers(){
  for (var i = 0; i < originalProposers.length; ++i) {
    proposers.push(createTwoItemsList(originalProposers[i].id, originalProposers[i].priority_list));
  }
}

createProposers()

function createReceivers(){
  for (var i = 0; i < originalReceivers.length; ++i) {
    receivers.push(createTwoItemsList(originalReceivers[i].id, originalReceivers[i].priority_list));
  }
}

createReceivers()

function createUnengagedproposers(proposers) {
  for (var i = 0; i < proposers.length; ++i) {
    unengagedproposers.push(createOneItemList(proposers[i][0].ID));
  }
  return unengagedproposers;
};

createUnengagedproposers(proposers);

function createNextCandidateIndex() {
  for (var i = 0; i < proposers.length; ++i) {
    nextCandidateIndex.push(createIndexedItems(proposers[i][0].ID, 0));
  }
  return nextCandidateIndex;
};

createNextCandidateIndex();

function isUnengagedproposerLeft() {
  return unengagedproposers.length > 0;
};

// function hasUndefinedProperty() {
//   for (var i = 0; i < engagements.length; i++) {
//     if (engagements[i][0].receiverID == undefined) {
//       engagements[i][0]
//     };
//   };
// };

function getCurrentUnengagedproposer() {
  var proposerID = unengagedproposers[0][0].ID;
  unengagedproposers.shift();
  return proposerID;
};

function getCurrentCandidateIndex (proposerID) {
  var currentCandidateIndex = -1;
  for (var j = 0; j < nextCandidateIndex.length; ++j) {
    if (nextCandidateIndex[j][0].ID == proposerID) {
      currentCandidateIndex = nextCandidateIndex[j][0].index;
      break;
    }
  }
  return currentCandidateIndex;
}

// function incrementCurrentCandidateIndex(proposerID) {
//   for (var j = 0; j < nextCandidateIndex.length; ++j) {
//     if (nextCandidateIndex[j][0].ID == proposerID) {
//       ++nextCandidateIndex[j][0].index;
//       break;
//     }
//   }
// }

function incrementCurrentCandidateIndex(proposerID) {
  for (var j = 0; j < nextCandidateIndex.length; ++j) {
    if (nextCandidateIndex[j][0].ID == proposerID) {
      ++nextCandidateIndex[j][0].index;
      if (nextCandidateIndex[j][0].index === numberOfReceivers + 1) {
        engagements.push(createFourItemsList(proposerID, nextCandidateIndex[j][0].index, 'null', 'null'))
        var index = unengagedproposers.indexOf(proposerID);
        unengagedproposers.splice(index, 1);
      };
      break;
    }
  }
}

function getCurrentCandidate(proposerID, currentCandidateIndex) {
  var currentCandidate = 'Undefined';
  // var currentCandidate = -1;
  for (var j = 0; j < proposers.length; ++j) {
    if (proposers[j][0].ID == proposerID) {
      currentCandidate = proposers[j][0].preferenceList[currentCandidateIndex];
      break;
    }
  }
  // if (currentCandidate == undefined) {
  //   currentCandidate = 'null';
  // }
  return currentCandidate;
};

function getreceiverPreferredIndex (receiverID, proposerID) {
  for (var j = 0; j < receivers.length; ++j) {
    if (receivers[j][0].ID == receiverID) {
      for (var i = 0; i < receivers[j][0].preferenceList.length; ++i) {
        if (receivers[j][0].preferenceList[i] == proposerID) {
          return i;
        }
      }
    }
  }
  return -1;
};

function isEngaged (currentCandidate) {
  for (var j = 0; j < engagements.length; ++j) {
    if (engagements[j][0].receiverID == currentCandidate) {
      return true;
    }
  }
  return false;
};

function getMarriedreceiverIndex(receiverID) {
  for (var j = 0; j < engagements.length; ++j) {
    if (engagements[j][0].receiverID == receiverID) {
      return engagements[j][0].receiverPreferenceAt;
    }
  }
  return -1;
};

function unengageproposer(proposerID){
  unengagedproposers.push(createOneItemList(proposerID));
  incrementCurrentCandidateIndex(proposerID);
}

function reEngage(proposerID, currentCandidateIndex, currentCandidate, receiverPreferredIndex) {
  for (var j = 0; j < engagements.length; ++j) {
    if (engagements[j][0].receiverID == currentCandidate) {
      unengageproposer(engagements[j][0].proposerID);
      engagements[j][0].proposerID = proposerID;
      engagements[j][0].proposerPreferenceAt = currentCandidateIndex;
      engagements[j][0].receiverPreferenceAt = receiverPreferredIndex;
      break;
    }
  }
}

function engage (proposerID, currentCandidateIndex, currentCandidate, receiverPreferredIndex) {
  if (isEngaged(currentCandidate)) {
    var marriedreceiverIndex = getMarriedreceiverIndex(currentCandidate);
    if (marriedreceiverIndex > receiverPreferredIndex) {
      reEngage(proposerID, currentCandidateIndex, currentCandidate, receiverPreferredIndex);
    } else {
      unengageproposer(proposerID);
    }
  } else {
    engagements.push(createFourItemsList(proposerID, currentCandidateIndex, currentCandidate, receiverPreferredIndex));
  }
}

function solution () {
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
};

solution();

module.exports = {
  createOneItemList: createOneItemList,
  createTwoItemsList: createTwoItemsList,
  createIndexedItems: createIndexedItems,
  createFourItemsList: createFourItemsList,
  isUnengagedproposerLeft: isUnengagedproposerLeft,
  getCurrentUnengagedproposer: getCurrentUnengagedproposer,
  getCurrentCandidateIndex: getCurrentCandidateIndex,
  incrementCurrentCandidateIndex: incrementCurrentCandidateIndex,
  getCurrentCandidate: getCurrentCandidate,
  getreceiverPreferredIndex: getreceiverPreferredIndex,
  isEngaged: isEngaged,
  getMarriedreceiverIndex: getMarriedreceiverIndex,
  unengageproposer: unengageproposer,
  reEngage: reEngage,
  engage: engage,
  solution: solution,
  createUnengagedproposers: createUnengagedproposers
}

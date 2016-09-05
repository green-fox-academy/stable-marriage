var receivers = require('./receivers.js');
var proposers = require('./proposers.js');
var nullId = proposers.length;
var diffReciverProposerList = receivers.length-  proposers.length;
var lengthOfReceiverList = receivers.length;
var priorityList = [];
var receiversNullId = receivers.length;
var diffProposerReciverList = proposers.length - receivers.length;
var lengthOfProposerList = proposers.length;
var receiverPriorityList = [];

function createOneNullProposerElement () {
  var nullElement = {};
  priorityList = [];
  nullId +=1;
  nullElement.id = nullId;
  nullElement.name = 'null';
  nullElement.priority_list = createProposerPriorityList(lengthOfReceiverList);
  proposers.push(nullElement);
}

function createOneNullReceiverElement () {
  var receiversNullElement = {};
  receiverPriorityList = [];
  receiversNullId +=1;
  receiversNullElement.id = receiversNullId;
  receiversNullElement.name = 'null';
  receiversNullElement.priority_list = createReceiverPriorityList();
  receiversNullElement.participants_number = 0;
  receivers.push(receiversNullElement);
}

function fillTheProposerListFixElem (diffOfTheLists) {
  for (var i = 0; i < diffOfTheLists; i++) {
    createOneNullProposerElement();
  }
}

function fillTheReceiverListFixElem () {
  for (var i = 0; i < diffProposerReciverList; i++) {
    createOneNullReceiverElement();
  }
}

function createProposerPriorityList (lengthOfTheList) {
  for (var listElement = 0; listElement < lengthOfTheList; listElement++) {
    priorityList.push('null')
  }
  return priorityList;
}

function createReceiverPriorityList () {
  for (var listElement = 0; listElement < lengthOfProposerList; listElement++) {
    receiverPriorityList.push('null')
  }
  return receiverPriorityList;
}

function increaseProposerPriorityList (fillProposers, list) {
  while (fillProposers.priority_list.length < list) {
    fillProposers.priority_list.push('null');
  }
}

function increaseAllProposerPriorityList (list) {
  for (var listElement = 0; listElement < lengthOfProposerList; listElement++) {
    increaseProposerPriorityList(proposers[listElement], list);
  }
}

function increaseReceiverPriorityList (fillReceiver, list) {
  while (fillReceiver.priority_list.length < list) {
    fillReceiver.priority_list.push('null');
  }
}

function increaseAllReceiverPriorityList (list) {
  for (var listElement = 0; listElement < lengthOfReceiverList; listElement++) {
    increaseReceiverPriorityList(receivers[listElement], list);
  }
}

function createSameLengthList () {
  if (proposers.length - receivers.length > 0 ) {
    fillTheReceiverListFixElem();
    increaseAllReceiverPriorityList(lengthOfProposerList);
    increaseAllProposerPriorityList(lengthOfProposerList);
  } else {
    fillTheProposerListFixElem(diffReciverProposerList);
    increaseAllProposerPriorityList(lengthOfReceiverList);
    increaseAllReceiverPriorityList(lengthOfReceiverList);
  }
}

createSameLengthList();
console.log(receivers);
console.log(proposers);

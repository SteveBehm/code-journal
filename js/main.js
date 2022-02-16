/* global data */
/* exported data */
var $photoInput = document.querySelector('#url');
var $image = document.querySelector('img');
$photoInput.addEventListener('input', handlePhotoInput);

function handlePhotoInput(event) {
  $image.setAttribute('src', $photoInput.value);

}

var $form = document.querySelector('form');
$form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  var formObj = {};
  var title = $form.elements.title.value;
  var photoAddress = $form.elements.url.value;
  var notes = $form.elements.notes.value;
  formObj.title = title;
  formObj.photoAddress = photoAddress;
  formObj.notes = notes;
  formObj.entryId = data.nextEntryId;
  data.nextEntryId++;
  data.entries.unshift(formObj);
  $image.setAttribute('src', 'images/placeholder-image-square.jpg');
  $form.reset();
  var $entry = newEntry(formObj);
  $unorderedList.appendChild($entry);
  var $newEntryDiv = document.querySelector('.new-entry');
  $newEntryDiv.className = 'container new-entry hidden';
  var $entriesList = document.querySelector('.entries-list');
  $entriesList.className = 'entries-list container';
}

function newEntry(entry) {
  var newListItem = document.createElement('li');
  newListItem.className = 'row';

  var imgDiv = document.createElement('div');
  imgDiv.className = 'column-half';
  newListItem.appendChild(imgDiv);

  var imgElement = document.createElement('img');
  imgElement.setAttribute('src', entry.photoAddress);
  imgDiv.appendChild(imgElement);

  var textHalf = document.createElement('div');
  textHalf.className = 'column-half';
  newListItem.appendChild(textHalf);

  var entryTitle = document.createElement('h2');
  var entryTitleText = document.createTextNode(entry.title);
  entryTitle.appendChild(entryTitleText);
  textHalf.appendChild(entryTitle);

  var firstPara = document.createElement('p');
  var firstParaText = document.createTextNode(entry.notes);
  firstPara.appendChild(firstParaText);
  textHalf.appendChild(firstPara);

  return newListItem;
}

var $unorderedList = document.querySelector('ul');

for (var i = 0; i < data.entries.length; i++) {
  var $entries = newEntry(data.entries[i]);
  $unorderedList.appendChild($entries);
}

/* global data */
/* exported data */
var $photoInput = document.querySelector('#url');
var $image = document.querySelector('img');
$photoInput.addEventListener('input', handlePhotoInput);

function handlePhotoInput(event) {
  $image.setAttribute('src', $photoInput.value);
}

var $entriesNav = document.querySelector('.nav-entries');
$entriesNav.addEventListener('click', handleEntriesNavClick);
function handleEntriesNavClick(event) {
  var $newEntryDiv = document.querySelector('.new-entry');
  $newEntryDiv.className = 'container new-entry hidden';
  var $entriesList = document.querySelector('.entries-list');
  $entriesList.className = 'entries-list container';
  data.view = 'entries';
}

var $newButton = document.querySelector('.new-button');
$newButton.addEventListener('click', handleNewClick);
function handleNewClick(event) {
  var $newEntryDiv = document.querySelector('.new-entry');
  $newEntryDiv.className = 'container new-entry';
  var $entriesList = document.querySelector('.entries-list');
  $entriesList.className = 'entries-list container hidden';
  // taking away the delete entry link
  var $deleteEntry = document.querySelector('.delete-link');
  $deleteEntry.className = 'delete-link hidden';
  data.view = 'entry-form';

  // making the title of the page New Entry
  var $newEntry = document.querySelector('h1');
  $newEntry.textContent = 'New Entry';
}

var $form = document.querySelector('form');
$form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  // update the entry form's submit handler function to conditionally
  // add a new entry object or update the existing one.
  if (data.editing !== null) {
    data.editing.title = $form.elements.title.value;
    data.editing.photoAddress = $form.elements.url.value;
    data.editing.notes = $form.elements.notes.value;
    var $listItems = document.querySelectorAll('li');
    for (var i = 0; i < $listItems.length; i++) {
      var $listItemsId = $listItems[i].getAttribute('data-entry-id');
      var $idInteger = parseInt($listItemsId);
      if ($idInteger === data.editing.entryId) {
        $listItems[i].replaceWith(newEntry(data.editing));
      }
    }
    $image.setAttribute('src', 'images/placeholder-image-square.jpg');
    $form.reset();
    data.editing = null;
  } else {

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
    $unorderedList.prepend($entry);
  }
  var $newEntryDiv = document.querySelector('.new-entry');
  $newEntryDiv.className = 'container new-entry hidden';
  var $entriesList = document.querySelector('.entries-list');
  $entriesList.className = 'entries-list container';
  data.view = 'entries';

  var $noEntries = document.querySelector('.no-entries-para');
  $noEntries.className = 'no-entries-para hidden';
}

function newEntry(entry) {
  var newListItem = document.createElement('li');
  newListItem.className = 'row';
  newListItem.setAttribute('data-entry-id', entry.entryId);

  var imgDiv = document.createElement('div');
  imgDiv.className = 'column-half';
  newListItem.appendChild(imgDiv);

  var imgElement = document.createElement('img');
  imgElement.setAttribute('src', entry.photoAddress);
  imgDiv.appendChild(imgElement);

  var textHalf = document.createElement('div');
  textHalf.className = 'column-half';
  newListItem.appendChild(textHalf);

  var iconDiv = document.createElement('div');
  iconDiv.className = 'edit-icon';
  textHalf.appendChild(iconDiv);

  var entryTitle = document.createElement('h2');
  var entryTitleText = document.createTextNode(entry.title);
  entryTitle.appendChild(entryTitleText);
  iconDiv.appendChild(entryTitle);

  var icon = document.createElement('i');
  icon.className = 'fas fa-pencil-alt';
  iconDiv.appendChild(icon);

  var firstPara = document.createElement('p');
  var firstParaText = document.createTextNode(entry.notes);
  firstPara.appendChild(firstParaText);
  textHalf.appendChild(firstPara);

  return newListItem;
}

var $unorderedList = document.querySelector('ul');

function handleRefresh(event) {
  var $entriesList = document.querySelector('.entries-list');
  var $newEntryDiv = document.querySelector('.new-entry');

  for (var i = 0; i < data.entries.length; i++) {
    var $entries = newEntry(data.entries[i]);
    $unorderedList.appendChild($entries);
  }
  if (data.view === 'entries') {
    $newEntryDiv.className = 'container new-entry hidden';
    $entriesList.className = 'entries-list container';
    data.view = 'entries';
  } else if (data.view === 'entry-form') {
    $newEntryDiv.className = 'container new-entry';
    $entriesList.className = 'entries-list container hidden';
    data.view = 'entry-form';
  }

  if (data.entries.length > 0) {
    var $noEntries = document.querySelector('.no-entries-para');
    $noEntries.className = 'no-entries-para hidden';
  }
  var $deleteEntry = document.querySelector('.delete');
  $deleteEntry.className = 'hidden delete';

}
window.addEventListener('DOMContentLoaded', handleRefresh);

function handleEditClick(event) {
  // if you click the edit button switch to the blank form view
  if (event.target && event.target.nodeName === 'I') {
    var $entriesList = document.querySelector('.entries-list');
    var $newEntryDiv = document.querySelector('.new-entry');
    var $deleteEntry = document.querySelector('.delete');
    $newEntryDiv.className = 'container new-entry';
    $entriesList.className = 'entries-list container hidden';
    $deleteEntry.className = 'delete';
    data.view = 'entry-form';
  }
  // find the matching entry object and assign it to the data model's
  // editing property if the icon was clicked.
  var $closestLi = event.target.closest('li');
  var $closestLiId = parseInt($closestLi.getAttribute('data-entry-id'));
  for (var i = 0; i < data.entries.length; i++) {
    if ($closestLiId === data.entries[i].entryId) {
      data.editing = data.entries[i];
    }
  }

  // Switching the title of the page to Edit Entry while Editing
  var $newEntry = document.querySelector('h1');
  $newEntry.textContent = 'Edit Entry';

  // pre-populate the entry form with the clicked entry's values
  // from the object found in the data model.
  $form.elements.title.value = data.editing.title;
  $form.elements.url.value = data.editing.photoAddress;
  $form.elements.notes.value = data.editing.notes;
  $image.setAttribute('src', data.editing.photoAddress);
}
$unorderedList.addEventListener('click', handleEditClick);

// Confirmation modal when the user clicks delete entry
var $deleteLink = document.querySelector('.delete-link');
function handleDeleteClick(event) {
  document.querySelector('.bg-modal').style.display = 'flex';
}
$deleteLink.addEventListener('click', handleDeleteClick);

// Hide the modal if the user clicks cancel
var $cancelClick = document.querySelector('.cancel-button');
function handleCancelClick(event) {
  document.querySelector('.bg-modal').style.display = 'none';
}
$cancelClick.addEventListener('click', handleCancelClick);

// Remove the entry from the data model and the entry's DOM tree
// from the page if the user clicks delete.
var $confirmClick = document.querySelector('.confirm-button');
function handleConfirmClick(event) {
// remove the modal window
  document.querySelector('.bg-modal').style.display = 'none';
  // splice the entry out of the data.entries array
  for (var i = 0; i < data.entries.length; i++) {
    if (data.entries[i].entryId === data.editing.entryId) {
      data.entries.splice(i, 1);

    }
  }
  // remove the entry from the DOM
  var $listItems = document.querySelectorAll('li');
  for (var j = 0; j < $listItems.length; j++) {
    var $listItemsId = $listItems[j].getAttribute('data-entry-id');
    var $idInteger = parseInt($listItemsId);
    if ($idInteger === data.editing.entryId) {
      $listItems[j].remove();
    }
  }
  // show the entries list if the user clicked confirm
  var $entriesList = document.querySelector('.entries-list');
  var $newEntryDiv = document.querySelector('.new-entry');
  $newEntryDiv.className = 'container new-entry hidden';
  $entriesList.className = 'entries-list container';

  // if there are no entries left show no entries
  if (data.entries.length === 0) {
    var $noEntries = document.querySelector('.no-entries-para');
    $noEntries.className = 'no-entries-para';
  }

  data.editing = null;
  $image.setAttribute('src', 'images/placeholder-image-square.jpg');
  $form.reset();
}
$confirmClick.addEventListener('click', handleConfirmClick);

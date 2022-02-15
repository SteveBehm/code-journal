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
}

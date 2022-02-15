/* global data */
/* exported data */
var $photoInput = document.querySelector('#url');
var $image = document.querySelector('img');
$photoInput.addEventListener('input', handlePhotoInput);

function handlePhotoInput(event) {
  if ($photoInput.value !== '') {
    $image.setAttribute('src', $photoInput.value);
  }
}

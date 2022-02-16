/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

var previousDataJSON = localStorage.getItem('local-storage');

if (previousDataJSON !== null) {
  data = JSON.parse(previousDataJSON);
}

function handleBeforeUnload(event) {
  var localStorageData = JSON.stringify(data);
  localStorage.setItem('local-storage', localStorageData);
}

window.addEventListener('beforeunload', handleBeforeUnload);

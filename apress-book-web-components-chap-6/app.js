const formModal = document.querySelector('simple-form-modal-component');
formModal.addEventListener('addEvent', function(e) {
  const noteList = document.querySelector('note-list-component');
  let notes = noteList.notes;

  notes.push({"title": e.detail.title, "description": e.detail.description});
  noteList.notes = notes;
});


const myBtn = document.getElementById('myBtn');
myBtn.addEventListener('click', function() {
  formModal.open = !formModal.open;
});
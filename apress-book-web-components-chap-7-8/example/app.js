import { notesDataApi } from './utils/notes-data-api.js';
const formModal = document.querySelector('simple-form-modal-component');
const noteList = document.querySelector('note-list-component');

notesDataApi.getTasks(1)
  .then((res) => res.json())
  .then((items) => {
    const allNotes = items.map((item)=>({title: item.title, description: item.body}));
    noteList.notes = allNotes;
  });

formModal.addEventListener('add-event', function(e) {
  let notes = noteList.notes;

  notes.push({"title": e.detail.title, "description": e.detail.description});
  noteList.notes = notes;
});

const myBtn = document.getElementById('myBtn');
myBtn.addEventListener('click', function() {
  formModal.open = !formModal.open;
});

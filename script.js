
const noteContainer = document.getElementById('note-container');
const addNoteButton = document.getElementById('add-note');

let noteCount = 0;

// Load saved notes on page load
window.addEventListener('DOMContentLoaded', loadNotes);

addNoteButton.addEventListener('click', createNote);

function createNote() {
  const noteCard = document.createElement('div');
  noteCard.className = 'note-card';

  const noteHeading = document.createElement('h2');
  noteHeading.textContent = `Note ${noteCount + 1}`;

  const noteContent = document.createElement('div');
  noteContent.className = 'note-content';

  const noteTextArea = document.createElement('textarea');

  const deleteNoteButton = document.createElement('span');
  deleteNoteButton.className = 'delete-note';
  deleteNoteButton.innerHTML = '<i class="fas fa-trash"></i>';
  deleteNoteButton.addEventListener('click', () => {
    noteContainer.removeChild(noteCard);
    noteCount--;
    updateNoteHeadings();
    saveNotes();
  });

  const expandNoteButton = document.createElement('span');
  expandNoteButton.className = 'expand-note';
  expandNoteButton.innerHTML = '<i class="fas fa-plus"></i>';
  expandNoteButton.addEventListener('click', () => {
    toggleNoteContent(noteContent, noteTextArea, expandNoteButton);
    saveNotes();
  });

  noteCard.appendChild(noteHeading);
  noteCard.appendChild(noteContent);
  noteContent.appendChild(noteTextArea);
  noteCard.appendChild(deleteNoteButton);
  noteCard.appendChild(expandNoteButton);

  noteContainer.appendChild(noteCard);

  noteCount++;
  updateNoteHeadings();

  saveNotes();
}

function updateNoteHeadings() {
  const noteCards = document.querySelectorAll('.note-card');

  noteCards.forEach((noteCard, index) => {
    const noteHeading = noteCard.querySelector('h2');
    noteHeading.textContent = `Note ${index + 1}`;
  });
}

function toggleNoteContent(noteContent, noteTextArea, expandNoteButton) {
  noteContent.classList.toggle('show');
  noteTextArea.classList.toggle('show');
  expandNoteButton.innerHTML = noteContent.classList.contains('show') ? '<i class="fas fa-minus"></i>' : '<i class="fas fa-plus"></i>';
}

function saveNotes() {
  const notes = [];
  const noteCards = document.querySelectorAll('.note-card');

  noteCards.forEach((noteCard) => {
    const noteTextArea = noteCard.querySelector('textarea');
    const noteText = noteTextArea.value.trim();

    if (noteText !== '') {
      notes.push(noteText);
    }
  });

  localStorage.setItem('notes', JSON.stringify(notes));
}

function loadNotes() {
  const savedNotes = localStorage.getItem('notes');

  if (savedNotes) {
    const notes = JSON.parse(savedNotes);

    notes.forEach((noteText) => {
      const noteCard = document.createElement('div');
      noteCard.className = 'note-card';

      const noteHeading = document.createElement('h2');
      noteHeading.textContent = `Note ${noteCount + 1}`;

      const noteContent = document.createElement('div');
      noteContent.className = 'note-content';

      const noteTextArea = document.createElement('textarea');
      noteTextArea.value = noteText;

      const deleteNoteButton = document.createElement('span');
      deleteNoteButton.className = 'delete-note';
      deleteNoteButton.innerHTML = '<i class="fas fa-trash"></i>';
      deleteNoteButton.addEventListener('click', () => {
        noteContainer.removeChild(noteCard);
        noteCount--;
        updateNoteHeadings();
        saveNotes();
      });

      const expandNoteButton = document.createElement('span');
      expandNoteButton.className = 'expand-note';
      expandNoteButton.innerHTML = '<i class="fas fa-plus"></i>';
      expandNoteButton.addEventListener('click', () => {
        toggleNoteContent(noteContent, noteTextArea, expandNoteButton);
        saveNotes();
      });

      noteCard.appendChild(noteHeading);
      noteCard.appendChild(noteContent);
      noteContent.appendChild(noteTextArea);
      noteCard.appendChild(deleteNoteButton);
      noteCard.appendChild(expandNoteButton);

      noteContainer.appendChild(noteCard);

      noteCount++;
      updateNoteHeadings();
    });
  }
}

document.addEventListener('DOMContentLoaded', function () {
    const noteInput = document.getElementById('noteInput');
    const addNoteButton = document.getElementById('addNote');
    const notesContainer = document.getElementById('notes');
  
    addNoteButton.addEventListener('click', function () {
      const noteText = noteInput.value;
      if (noteText) {
        saveNote(noteText);
        noteInput.value = '';
      }
    });
  
    function saveNote(noteText) {
      chrome.storage.local.get(['notes'], function (result) {
        const notes = result.notes || [];
        notes.push(noteText);
        chrome.storage.local.set({ notes: notes }, function () {
          displayNotes(notes);
        });
      });
    }
  
    function displayNotes(notes) {
      notesContainer.innerHTML = '';
      notes.forEach((note, index) => {
        const noteElement = document.createElement('div');
        noteElement.textContent = note;
        notesContainer.appendChild(noteElement);
      });
    }
  
    chrome.storage.local.get(['notes'], function (result) {
      const notes = result.notes || [];
      displayNotes(notes);
    });
  });
  
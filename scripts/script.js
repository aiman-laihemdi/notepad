
// ARRAYS

// Normale Notizen
let notesTitles = [];
let notes = [];

// Papierkorb
let trashNotesTitles = [];
let trashNotes = [];

// Archiv
let archivNotesTitles = [];
let archivNotes = [];


// INITIALISIERUNG

function init() {
    getFromLocalStorage();

    renderNotes();
    renderTrashNotes();
    renderArchivNotes();
}

// LOCAL STORAGE

// Alle Arrays im LocalStorage speichern
function saveToLocalStorage() {

    localStorage.setItem('notesTitles', JSON.stringify(notesTitles));
    localStorage.setItem('notes', JSON.stringify(notes));

    localStorage.setItem('trashNotesTitles', JSON.stringify(trashNotesTitles));
    localStorage.setItem('trashNotes', JSON.stringify(trashNotes));

    localStorage.setItem('archivNotesTitles', JSON.stringify(archivNotesTitles));
    localStorage.setItem('archivNotes', JSON.stringify(archivNotes));
}

// Alle Arrays aus dem LocalStorage laden
function getFromLocalStorage() {

    let savedNotesTitles = JSON.parse(localStorage.getItem('notesTitles'));
    let savedNotes = JSON.parse(localStorage.getItem('notes'));

    let savedTrashNotesTitles = JSON.parse(localStorage.getItem('trashNotesTitles'));
    let savedTrashNotes = JSON.parse(localStorage.getItem('trashNotes'));

    let savedArchivNotesTitles = JSON.parse(localStorage.getItem('archivNotesTitles'));
    let savedArchivNotes = JSON.parse(localStorage.getItem('archivNotes'));

    if (savedNotesTitles !== null) {
        notesTitles = savedNotesTitles;
    }

    if (savedNotes !== null) {
        notes = savedNotes;
    }

    if (savedTrashNotesTitles !== null) {
        trashNotesTitles = savedTrashNotesTitles;
    }

    if (savedTrashNotes !== null) {
        trashNotes = savedTrashNotes;
    }

    if (savedArchivNotesTitles !== null) {
        archivNotesTitles = savedArchivNotesTitles;
    }

    if (savedArchivNotes !== null) {
        archivNotes = savedArchivNotes;
    }
}

// NOTIZEN ANZEIGEN

function renderNotes() {

    let contentRef = document.getElementById('content');
    contentRef.innerHTML = "";

    for (let indexNote = 0; indexNote < notes.length; indexNote++) {

        contentRef.innerHTML += getNoteTemplate(indexNote);
    }
}

function getNoteTemplate(indexNote) {

    return `
        <p class="noteParam">
            𐙚 title: ${notesTitles[indexNote]} ->
            ${notes[indexNote]}

            <button
                class="removeNotes"
                onclick="moveToTrash(${indexNote})">
                x
            </button>
        </p>
    `;
}

// NOTIZEN HINZUFÜGEN

function addNote() {

    let noteInputRef = document.getElementById('note_input');
    let titleInputRef = document.getElementById('title_input');

    let noteInput = noteInputRef.value;
    let titleInput = titleInputRef.value;

    if (noteInput.trim() === "" || titleInput.trim() === "") {
        return;
    }

    notes.push(noteInput);
    notesTitles.push(titleInput);

    saveToLocalStorage();

    renderNotes();

    noteInputRef.value = "";
    titleInputRef.value = "";
}

// IN DEN PAPIERKORB VERSCHIEBEN

function moveToTrash(indexNote) {

    let trashNote = notes.splice(indexNote, 1);
    trashNotes.push(trashNote[0]);

    let trashNoteTitle = notesTitles.splice(indexNote, 1);
    trashNotesTitles.push(trashNoteTitle[0]);

    saveToLocalStorage();

    renderNotes();
    renderTrashNotes();
}

// PAPIERKORB ANZEIGEN

function renderTrashNotes() {

    let trashContentRef = document.getElementById('trash_content');
    trashContentRef.innerHTML = "";

    for (let indexTrashNote = 0; indexTrashNote < trashNotes.length; indexTrashNote++) {

        trashContentRef.innerHTML += getTrashNoteTemplate(indexTrashNote);
    }
}

function getTrashNoteTemplate(indexTrashNote) {

    return `
        <p class="noteParam">
            𐙚 title: ${trashNotesTitles[indexTrashNote]} ->
            ${trashNotes[indexTrashNote]}

            <button
                class="removeNotes"
                onclick="deleteNote(${indexTrashNote})">
                x
            </button>

            <button
                onclick="moveToArchiv(${indexTrashNote})">
                A
            </button>
        </p>
    `;
}

// ENDGÜLTIG LÖSCHEN

function deleteNote(indexTrashNote) {

    trashNotes.splice(indexTrashNote, 1);
    trashNotesTitles.splice(indexTrashNote, 1);

    saveToLocalStorage();

    renderTrashNotes();
}

// INS ARCHIV VERSCHIEBEN

function moveToArchiv(indexTrashNote) {

    let archivNote = trashNotes.splice(indexTrashNote, 1);
    archivNotes.push(archivNote[0]);

    let archivNoteTitle = trashNotesTitles.splice(indexTrashNote, 1);
    archivNotesTitles.push(archivNoteTitle[0]);

    saveToLocalStorage();

    renderTrashNotes();
    renderArchivNotes();
}

// ARCHIV ANZEIGEN

function renderArchivNotes() {

    let contentArchivRef = document.getElementById('archiv_content');
    contentArchivRef.innerHTML = "";

    for (let indexArchivNote = 0; indexArchivNote < archivNotes.length; indexArchivNote++) {

        contentArchivRef.innerHTML += getArchivNoteTemplate(indexArchivNote);
    }
}

function getArchivNoteTemplate(indexArchivNote) {

    return `
        <p class="noteParam">
            𐙚 title: ${archivNotesTitles[indexArchivNote]} ->
            ${archivNotes[indexArchivNote]}

            <button
                class="removeNotes"
                onclick="deleteArchivNote(${indexArchivNote})">
                x
            </button>

            <button
                onclick="restoreArchivNote(${indexArchivNote})">
                Restore
            </button>
        </p>
    `;
}

// ENDGÜLTIG AUS DEM ARCHIV LÖSCHEN

function deleteArchivNote(indexArchivNote) {

    archivNotes.splice(indexArchivNote, 1);
    archivNotesTitles.splice(indexArchivNote, 1);

    saveToLocalStorage();

    renderArchivNotes();
}

//  AUS DEM ARCHIV WIEDERHERSTELLEN

function restoreArchivNote(indexArchivNote) {

    let restoredNote = archivNotes.splice(indexArchivNote, 1);
    notes.push(restoredNote[0]);

    let restoredTitle = archivNotesTitles.splice(indexArchivNote, 1);
    notesTitles.push(restoredTitle[0]);

    saveToLocalStorage();

    renderArchivNotes();
    renderNotes();
}


// Normale Notizen
let notesTitles = [];
let notes = [];

// Papierkorb
let trashNotesTitles = [];
let trashNotes = [];

// Archiv
let archivhNotesTitles = [];
let archivNotes = [];


// NOTIZEN ANZEIGEN

function renderNotes(){
    let contentRef = document.getElementById('content');
    contentRef.innerHTML = "";

    for (let indexNote = 0; indexNote < notes.length; indexNote++) {

        const note = notes[indexNote];
        contentRef.innerHTML += getNoteTemplate(indexNote);
    }
}

function getNoteTemplate(indexNote){

    return `
        <p class="noteParam">
            + title: ${notesTitles[indexNote]} ->
            ${notes[indexNote]}

            <button
                class="removeNotes"
                onclick="moveToTrash(${indexNote})">
                x
            </button>
        </p>
    `;
}

// notizen hinzufügen
function addNote(){
    let noteInputRef = document.getElementById('note_input');
    let noteInput = noteInputRef.value; // eingabe auslesen

    notes.push(noteInput);

    renderNotes();
    noteInputRef.value = " ";
}


// notizen löschen
function moveToTrash(indexNote){
    let trashNote = notes.splice(indexNote, 1);
    trashNotes.push(trashNote[0]);
    let trashNoteTitle = notesTitles.splice(indexNote, 1);
    trashNoteTitle.push(trashNoteTitle[0]);

    renderNotes();
    renderTrashNotes();
}
// notizen archivieren
function renderTrashNotes(){
    let trashContentRef = document.getElementById('trash_content');
    trashContentRef.innerHTML = " ";

    for (let indexTrashNote = 0; indexTrashNote < trashNotes.length; indexTrashNote++) {

        const note = notes[indexTrashNote];
        trashContentRef.innerHTML += getTrashNoteTemplate(indexTrashNote);
    }
}

function getTrashNoteTemplate(indexTrashNote){
    return `<p class="noteParam"> + title: ${trashNotesTitles[indexTrashNote]} ->     ${trashNotes[indexTrashNote]}<button class="removeNotes" onclick="deleteNote(${indexTrashNote})">x</button></p>`;
}

function deleteNote(indexTrashNote){
    trashNotes.splice(indexTrashNote, 1);

    renderTrashNotes();
    renderTrashNotes();
}

function renderArchivNotes(){
    let contentArchivRef = document.getElementById('archiv_content');
    contentArchivRef.innerHTML = "";

    for (let indexArchivNote = 0; indexArchivNote < archivNotes.length; indexArchivNote++) {
        contentArchivRef.innerHTML += getArchivNoteTemplate(indexArchivNote);
    }
}


function archivNotes(indexTrashNote){

    let archivNote = trashNotes.splice(indexTrashNote, 1);
    archivNotes.push(archivNote[0]);

    let archivNoteTitle = trashNotesTitles.splice(indexTrashNote, 1);
    archivhNotesTitles.push(archivNoteTitle[0]);

    renderNotes();
    renderTrashNotes();
    renderArchivNotes();
}


function getArchivNoteTemplate(indexArchivNote){
    return `<p class="noteParam">+ title: ${archivhNotesTitles[indexArchivNote]} -> ${archivNotes[indexArchivNote]}</p>`;
}
let titles = [];
let notes = [];



function render() {
    load();
    let content = document.getElementById('input');
    content.innerHTML = '';
    content.innerHTML =
        `<input id="title" class="inputTitle d-none" type="text" placeholder="Titel">
            <textarea id="note" type="text" placeholder="Notiz schreiben..." onclick="openTitle()"></textarea>

            <div class="flex">
                <button onclick="addNote()" id="saveButton" class="button d-none">
                    <img id="icon" class="icon" src="img/plus.ico">
                </button>
                <button id="closeButton" class="closeButton d-none" onclick="closeTitle()">Verwerfen</button>
            </div>`;

    let pinNote = document.getElementById('pinNote')
    pinNote.innerHTML = '';

    for (let i = 0; i < notes.length; i++) {
        const title = titles[i];
        const note = notes[i];

        pinNote.innerHTML +=
            `<div class="output" id="output">
                <p id="newNote" type= "text">
                <b>${title}</b></p>
                <p id="newNote" type= "text">
                ${note}</p>
                <div class="action">
                <button class="button" onclick="openDialog(${[i]})">
                    <img class="icon" src="img/edit.ico"
                </button>
                <button class="button" onclick="moveElementToTrash(${[i]})">
                    <img class="icon" src="img/remove.ico">
                </button></div>
            </div>`;
    }

    showStartNote();
}


function addNote() {
    let title = document.getElementById('title').value;
    let note = document.getElementById('note').value;

    if (note == '') {
        alert();
        return false
    }

    if (title.length < 1) {
        title = '';
    }

    titles.push(title);
    notes.push(note);

    save();
    load();
    render();
}

function alert() {
    document.getElementById('dialog').classList.remove('d-none');
    let dialog = document.getElementById('dialog');
    dialog.innerHTML = '';

    dialog.innerHTML +=
        `<textarea class="alert" type="text">Notizeingabe erforderlich</textarea>
        <button id="closeButton" class="closeButton" onclick="closeDialog()">Ok</button>`
}


function save() {
    let titleText = JSON.stringify(titles);
    localStorage.setItem('title', titleText);

    let noteText = JSON.stringify(notes);
    localStorage.setItem('note', noteText);

    let delTitleText = JSON.stringify(delTitles);
    localStorage.setItem('delTitle', delTitleText);

    let delNoteText = JSON.stringify(delNotes);
    localStorage.setItem('delNote', delNoteText);
}


function load() {
    let titleText = localStorage.getItem('title');
    let noteText = localStorage.getItem('note');
    if (titleText && noteText) {
        titles = JSON.parse(titleText);
        notes = JSON.parse(noteText);
    }
    let delTitleText = localStorage.getItem('delTitle');
    let delNoteText = localStorage.getItem('delNote');
    if (delTitleText && delNoteText) {
        delTitles = JSON.parse(delTitleText);
        delNotes = JSON.parse(delNoteText);
    }
}

function showStartNote() {
    if (notes.length < 1) {
        document.getElementById('startNote').classList.remove('d-none');
    } else {
        document.getElementById('startNote').classList.add('d-none');
    }
}


function openTitle() {
    document.getElementById('title').classList.remove('d-none');
    document.getElementById('saveButton').classList.remove('d-none');
    document.getElementById('closeButton').classList.remove('d-none');
}


function closeTitle() {
    document.getElementById('title').classList.add('d-none');
    document.getElementById('saveButton').classList.add('d-none');
    document.getElementById('closeButton').classList.add('d-none');
    // document.getElementById('title').innerHTML = '';
    // document.getElementById('note').innerHTML = '';

    // render();
}


//------------------ trash ------------------

let delTitles = [];
let delNotes = [];


function trashRender() {
    load();
    trashNote.innerHTML = '';

    for (let i = 0; i < delNotes.length; i++) {
        const title = delTitles[i];
        const note = delNotes[i];

        trashNote.innerHTML +=
            `<div class="output">
                <b>${title}</b> <br>
                <br>
                ${note}<br>
                <br>
                <div class="action">
                <button class="button" onclick="returnNote(${[i]})">
                    <img class="icon" src="img/arrow.ico"
                </button>
                <button class="button" onclick="deleteNote(${[i]})">
                    <img class="icon" src="img/remove.ico">
                </button></div>
            </div>`;
    }

    showTrashNote();
}

function showTrashNote() {
    if (delNotes.length < 1) {
        document.getElementById('trashStartNote').classList.remove('d-none');
    } else {
        document.getElementById('trashStartNote').classList.add('d-none');
    }
}


function moveElementToTrash(i) {
    let element1 = notes[i];
    let element2 = titles[i];
    notes.splice(i, 1);
    titles.splice(i, 1);
    delNotes.push(element1);
    delTitles.push(element2);

    save();
    load();
    render();
}


function returnNote(i) {
    let element1 = delNotes[i];
    let element2 = delTitles[i];
    delNotes.splice(i, 1);
    delTitles.splice(i, 1);
    notes.push(element1);
    titles.push(element2);

    save();
    load();
    trashRender();
}


function deleteNote(i) {
    delTitles.splice(i, 1);
    delNotes.splice(i, 1);

    save();
    load();
    trashRender();
}



// -------Edit---------------


function openDialog(i) {
    document.getElementById('dialog').classList.remove('d-none');

    let title = titles[i];
    let note = notes[i];
    titles.splice(i, 1);
    notes.splice(i, 1);

    let input = document.getElementById('dialog');
    input.innerHTML = '';

    input.innerHTML =
        `<textarea id="editTitle" class="inputTitle" type="text">${title}</textarea>
        
            <textarea id="editNote" type="text">${note}</textarea>
            <button id="closeButton" class="closeButton" onclick="newNote()">Speichern</button>`
    
    save();
    load();
    render();
}


function newNote() {
    let title = document.getElementById('editTitle').value;
    let note = document.getElementById('editNote').value;

    if (note == '') {
        alert('Eingabe erforderlich');
        return false
    }

    if (title.length < 1) {
        title = '';
    }

    titles.push(title);
    notes.push(note);

    closeDialog();
    save();
    load();
    render();
}


function closeDialog() {
    document.getElementById('dialog').classList.add('d-none');
}


function filter() {
    let input = document.getElementById('filter');
    let filter = input.value.toLowerCase();
    let search = document.getElementsByClassName('output');
  
    for (i = 0; i < search.length; i++) {
      if (search[i].innerText.toLowerCase().includes(filter)) {
        search[i].style.display = '';
      } else {
        search[i].style.display = "none";
      }
    }
  }
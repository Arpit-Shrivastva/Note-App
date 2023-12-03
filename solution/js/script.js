let noteList = [];

let view = "grid"; //default view is grid-view

const todoURL = "http://localhost:3000/todos";

//task-1 : add note
function saveNote() {

    const noteId = document.getElementById('note-id').value;
    const noteTitle = document.getElementById('note-title').value;
    const noteContent = document.getElementById('note-content').value;

    //populate note object with data from HTML
    const note = {
        Title: noteTitle,
        Content: noteContent
    };

    // call saveNoteToServer() with note data to persist note to the server
    // displayNotes(note);
    saveNoteToServer(note);
}


function saveNoteToServer(note) {
    // use axios to make HTTP POST request to save note to server
    axios.post(todoURL, note)
        .then((response)=>{
            noteList.push(note);
            // displayNotes(note)
            document.getElementById('note-id').value = '';
            document.getElementById('note-title').value = '';
            document.getElementById('note-content').value = '';
        })
        .catch((error)=>{
            alert("Failed to save note. Please try again !!!", error)
        })

    // const request = new XMLHttpRequest();
    // request.open("POST", "http://localhost:3000/todos", true);
    // request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    // request.send(JSON.stringify(note));
    // displayNotes(note);
    // the saved note should also be pushed to noteList array and displayed on the web page
}

//task-2 : display notes
function displayNotes() {
    // call fetchNotesFromServer() to fetch notes from server and display the notes
    fetchNotesFromServer();
}

function fetchNotesFromServer() {
    // use axios to make HTTP GET request to fetch notes from server;
    axios.get(todoURL).then(res => 
    {
        noteList = res.data;
        const mainId = document.getElementById("note-container");
        mainId.innerHTML = ' ';
        noteList.forEach((note) => {
            const noteDiv = document.createElement('div');
            noteDiv.classList.add('card','m-auto');


            const titleHeading = document.createElement('h3');
            titleHeading.classList.add('card-header');
            titleHeading.textContent = note.Title;

            const contentPara = document.createElement('p');
            contentPara.textContent = note.Content;

            const addBtn = document.createElement('button');
            addBtn.classList.add("btn-primary");
            addBtn.innerHTML = "Delete";

            noteDiv.appendChild(titleHeading);
            noteDiv.appendChild(contentPara);
            noteDiv.appendChild(addBtn);

            mainId.appendChild(noteDiv);
        })
    })
        .catch(function (error) {
            console.error('Error fetching notes:', error);
        });
}
// const req = new XMLHttpRequest();
// req.open('GET', "http://localhost:3000/todos", true);
// req.addEventListener('load', () => {

//     if (req.status === 200) {
//         console.log(req.response[1]);
//         const res = JSON.parse(req.response);
//         const mainId = document.getElementById("note-container");
//         console.log(res);
//         res.forEach( (note) =>{
//             console.log("Hello");
//             const noteDiv = document.createElement('div');

//             const titleHead = document.createElement('h3').textContent = note.title;
//             // noteDiv.appendChild(titleHead);
//             console.log(titleHead);


//             const contentBody = document.createElement('p').textContent = note.content;
//             // noteDiv.appendChild(contentBody);
//             console.log(contentBody);

//             mainId.appendChild(noteDiv);
//         });
//     }
//     else {
//         alert('Error loading notes: ' + req.status)
//     }
// });
// req.send();
// the fetched notes should also be pushed to the noteList array and displayed on the web page
// }

//task-3 : delete note
function deleteNote() {

}

//task-4 : toggle note view
function toggleView() {

}

//do not delete the code given below, it is written to make export the functions to be tested
module.exports = {
    saveNote,
    displayNotes,
    deleteNote,
    toggleView,
    saveNoteToServer,
    fetchNotesFromServer
}

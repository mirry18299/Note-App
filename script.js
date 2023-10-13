const addBox = document.querySelector(".add-box")
const popupBox = document.querySelector(".popup-box")
const closeIcon = document.querySelector("header i")
const titleTag = document.querySelector("input")
const descTag = document.querySelector("textarea")
const addBtn = document.querySelector("button")


const months = ["January", "February", "March", "April", "May", "June", "July",
                 "August", "September", "October", "November", "December"];
//getting localstorage notes if exist and passing them
//to js object else passing an empty array to notes
const notes = JSON.parse(localStorage.getItem("notes") || "[]");
let isUpdate = false, UpdateId;

addBox.addEventListener("click", () =>{
    titleTag.focus();
    popupBox.classList.add("show");
    console.log("addBox");
});


closeIcon.addEventListener("click", () =>{
    isUpdate = false;
    titleTag.value = "false";
    descTag.value = "";
    addBtn.innerText = "Add Note";
    popupTitle.innerText = "Add a new Note";
    popupBox.classList.remove("show");
});

function ShowNotes(note, index) {
    document.querySelectorAll(".note").forEach(note => note.remove());
    notes.forEach((note, index) => {
        let liTag = `<li class="note">
        <div class="details">
            <p>${note.title}</p>
            <span>${note.description}</span>
        </div>
        <div class="bottom-content">
            <span>${note.date}</span>
            <div class="settings">
                <i class="fa fa-ellipsis-h"></i>
                <ul class="menu">
                    <li><i class="fa fa-pencil-square-o">Edit</i></li>
                    <li><i class="fa fa-trash-o">Delete</i></li>
                </ul>
            </div>
        </div>
    </li>`;
    addBox.insertAdjacentHTML("afterend", liTag);
    });
};
ShowNotes();

function showMenu(elem) {
    elem.parentElement.classList.add("show");
    document.addEventListener("click", e => {
        //removing show class from the settings menu on document click
        if(e.target.tagname != "I" || e.target != elem){
            elem.parentElement.classList.remove("show");
        }
    });
}
addBtn.addEventListener("click", e  =>{
    e.preventDefault();
    let noteTitle = titleTag.value,
    noteDesc = descTag.value; 

    if(noteTitle || noteDesc) {
        //getting month, day, year from the current date
        let dateObj = new Date(),
        month = dateObj.getMonth(),
        day = dateObj.getDate(),
        year = dateObj.getFullYear();
        
        let noteInfo = {
            title: noteTitle, description: noteDesc,
            date: `${month} ${day}, ${year}`
        }
        notes.push(noteInfo); //adding new note to notes
        //saving notes to localstorage
        localStorage.setItem("notes", JSON.stringify(notes));
        closeIcon.click();
    }
});

function deleteNote(noteId){
    let confirmDel = confirm("are you sure you want to delete this note?")
    if(!confirmDel) return;
    notes.splice("noteId, 1"); //removing selected note from arrays/tasks
    //saving updated notes to local storage
    localStorage.setItem("notes", JSON.stringify(notes));
    showNotes();
}

function updateNote(noteId, title, desc){
    isUpdate = true;
    update = 
    addBox.click();
    titleTag.value = title;
    descTag.value = desc;
    addBtn.innertext = "Update Note";
    popupTitle.innerText = "Update a Note";
    console.log(noteId, title, desc);
}


const addNoteBtn = document.querySelector('.add');
const notes = JSON.parse(localStorage.getItem('notes'));


if (notes) {
    notes.forEach((note) => {
        addNote(note);
    })
}

addNoteBtn.addEventListener('click', function () {
    addNote();
})


function addNote(text = '') {
    const note = document.createElement('div');
    note.classList.add('note');
    note.innerHTML = `
        <div class="note__top">
            <button class="edit">&#9998</button>
            <button class="delete">&#11199</button>
        </div>
        <div class="main ${text ? "" : "hidden"}">${text}</div>
        <textarea class="textarea ${text ? "hidden" : ""}">${text}</textarea>  
    `
    document.querySelector('body').appendChild(note);

    note.addEventListener('click', function (event) {
        const target = event.target;
        const note = target.closest('.note');
        if (target.classList.contains('edit')) {
            note.querySelector('.textarea').classList.toggle('hidden');
            note.querySelector('.main').classList.toggle('hidden');
        }

        if (target.classList.contains('delete')) {
            note.remove();
            updateLS();
        }
    });


    document.querySelectorAll('.textarea').forEach((el) => {
        el.addEventListener('input', function (event) {
            const note = event.target.closest('.note');
            const value = note.querySelector('.textarea').value;
            note.querySelector('.main').innerHTML = value;
            updateLS();
        });
    });

}


function updateLS() {
    const notesText = document.querySelectorAll('textarea');

    const notes = [];

    notesText.forEach((note) => {
        notes.push(note.value);
    });


    localStorage.setItem('notes', JSON.stringify(notes));
}



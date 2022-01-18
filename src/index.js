import {notes} from './notes-store/notes'
import {addNote, deleteNote, editNote} from './notes-store/actions'
import {createStore} from "./createStore";
import {getRandomDigit, renderTableRow} from "./helpers/utils";

import './styles.css'

const archivedNotesTable = document.getElementById('archivedNotesTable')
const activeNotesTable = document.getElementById('activeNotesTable')
const addNoteBtn = document.getElementById('addNoteBtn')
const viewArchivedBtn = document.getElementById('viewArchivedBtn')
const collapsedElements = document.getElementById('collapse')

const noteStore = createStore(notes)

// subscribe method will be executed every time the notes list changed
noteStore.subscribe(() => {
    const {notes} = noteStore.getState()

    activeNotesTable.innerHTML = notes.map(elem => {
        if (elem.status === 'Active')
            return renderTableRow(elem)
    }).join('')

    archivedNotesTable.innerHTML = notes.map(elem => {
            if (elem.status === 'Archived')
                return renderTableRow(elem)
        }
    ).join('')

    const editBtn = document.querySelectorAll('[id="editBtn"]');
    const saveBtn = document.querySelectorAll('[id="saveBtn"]');
    const deleteBtn = document.querySelectorAll('[id="deleteBtn"]');
    const archiveBtn = document.querySelectorAll('[id="archiveBtn"]');

    const editButtons = [...editBtn, ...saveBtn]

    editButtons.forEach(btn => {
        btn.addEventListener('click', () => {

            if (btn.id === 'saveBtn') {
                const id = btn.parentElement.id

                let note = noteStore.getState().notes.find(elem => elem.id === +id)

                note.isEditing = !note.isEditing

                const inputs = document.querySelectorAll('[type="text"]');
                const category = document.querySelectorAll('[name="category"]')
                const rowValues = [...inputs, ...category]

                rowValues.forEach(elem => {
                    note = {...note, [elem.name]: elem.value}
                })

                noteStore.dispatch(editNote(note));
            } else {
                const id = btn.parentElement.id

                const note = noteStore.getState().notes.find(elem => elem.id === +id)

                note.isEditing = !note.isEditing

                noteStore.dispatch(editNote(note));
            }

        })

    })

    deleteBtn.forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.parentElement.id
            noteStore.dispatch(deleteNote(+id));
        })
    })

    archiveBtn.forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.parentElement.id

            let note = noteStore.getState().notes.find(elem => elem.id === +id)

            note.status = note.status === "Active"
                ? "Archived"
                : "Active"

            noteStore.dispatch(editNote(note));
        })
    })

})

addNoteBtn.addEventListener('click', () => {
    const id = getRandomDigit();
    const emptyNote = {
        id,
        name: '',
        created: '',
        category: 'Idea',
        status: 'Active',
        content: '',
        dates: '',
        isEditing: true
    };

    noteStore.dispatch(addNote(emptyNote));
})

viewArchivedBtn.addEventListener('click', () => {
    const classes = collapsedElements.classList
    classes.value.search(/show/) !== -1
        ? classes.remove('show')
        : classes.add('show')
})


// we need to launch note store
noteStore.dispatch({type: 'INIT_APPLICATION'})





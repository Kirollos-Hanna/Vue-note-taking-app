import { createStore } from 'vuex'

// Create a new store instance.
const store = createStore({
    state() {
        return {
            noteData: [],
            displayAddNoteModal: false,
            displayDeleteActionPanel: false,
            checkedNotesCheckbox: false,
            deleteSelected: false,
        }
    },
    mutations: {
        showNoteDialog(state) {
            state.displayAddNoteModal = true
        },
        cancelNoteDialog(state) {
            state.displayAddNoteModal = false
        },
        showDeleteActionPanel(state) {
            state.displayDeleteActionPanel = true
            state.checkedNotesCheckbox = true
        },
        cancelDeleteActionPanel(state) {
            state.displayDeleteActionPanel = false
            state.checkedNotesCheckbox = false
        },
        saveDataInStore(state, payload) {
            state.noteData = payload
        },
        saveNoteDialog(state, payload) {
            const noteID = state.noteData.length ?
                state.noteData[state.noteData.length - 1]["id"] + 1 : 1
            state.noteData.push({
                "id": noteID,
                "title": payload["title"],
                "content": payload["content"],
                "status": "New"
            })
        },
        deleteSelectedNotes(state) {
            state.deleteSelected = true
        },
        stopDeletion(state) {
            state.deleteSelected = false
        },
        deleteNote(state, noteId) {
            const ind = state.noteData.findIndex(elm => elm["id"] === noteId)
            
            state.noteData.splice(ind, 1)
        }
    }
})

export default store
<template>
    <div class="notes-table-container">
        <table class="notes-table">
            <thead>
                <tr class="head-row">
                    <td>
                        <label class="form-control">
                            <input class="note-item-checkbox" v-model="mainCheckBoxCheck" type="checkbox"
                                @click="showAllDeleteAction" />ID
                        </label>
                    </td>
                    <td>Title</td>
                    <td>Content</td>
                    <td class="last-column">Status</td>
                </tr>
            </thead>
            <tbody>
                <tr class="body-row" v-for="note in notes">
                    <td>
                        <label class="form-control">
                            <input class="note-item-checkbox" v-model="allCheckedBoxes[note['id']]" type="checkbox"
                                @click="showDeleteAction(note['id'])" />{{note["id"]}}
                        </label>
                    </td>
                    <td>{{note["title"]}}</td>
                    <td>{{note["content"]}}</td>
                    <td>{{note["status"]}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style>
.notes-table-container {
    max-width: 1050px;
}

.notes-table {
    width: 100%;
    border-collapse: collapse;
}

.head-row {
    background-color: #989898;
}

.head-row td {
    border-right: 1px solid white;
    color: #eee;
}

.head-row .last-column {
    border-right: none;
}

.body-row {
    background-color: #fff;
}

.body-row td {
    color: #2d2d2d;
}

.head-row td,
.body-row td {
    padding: 8px 12px;
}

.form-control {
    display: grid;
    grid-template-columns: 1em auto;
    gap: 0.5em;
}

.body-row .form-control {

    color: #0070A2;
}

.note-item-checkbox {
    /* Add if not using autoprefixer */
    -webkit-appearance: none;
    appearance: none;
    /* For iOS < 15 to remove gradient background */
    background-color: #fff;
    /* Not removed via appearance */
    margin: 0;
    margin-right: 10px;
    font: inherit;
    color: black;
    width: 1em;
    height: 1em;
    border: 1px solid gray;
    border-radius: 5px;
    transform: translateY(-0.075em);
    place-content: center;
    display: grid;
    place-content: center;
}

.note-item-checkbox::before {
    content: "";
    width: 0.65em;
    height: 0.65em;
    transform: scale(0);
    transition: 60ms transform ease-in-out;
    box-shadow: inset 1em 1em #0070A2;
    transform-origin: bottom left;
    clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);

}

.note-item-checkbox:checked::before {
    transform: scale(1);
}
</style>

<script>
export default {
    data() {
        return {
            mainCheckBoxCheck: false,
            allCheckedBoxes: [],
        }
    },
    props: {
        notes: Array
    },
    mounted() {
        for (let i = 0; i < this.notes.length; i++) {
            this.allCheckedBoxes[this.notes[i]["id"]] = false
        }
    },
    methods: {
        showAllDeleteAction() {
            if (!this.$store.state.checkedNotesCheckbox) {
                this.$store.commit('showDeleteActionPanel')
            }
            this.checkAllBoxes()
        },
        showDeleteAction(noteID) {
            if (!this.$store.state.checkedNotesCheckbox) {
                this.$store.commit('showDeleteActionPanel')
            }
            this.allCheckedBoxes[noteID] = !this.allCheckedBoxes[noteID]

            if (!this.allCheckedBoxes[noteID]) {
                this.mainCheckBoxCheck = false

                let allNotChecked = this.areAllUnchecked()
                if (allNotChecked) {
                    this.$store.commit('cancelDeleteActionPanel')
                }
            } else {
                let allChecked = true

                this.allCheckedBoxes.forEach(
                    (checkbox, i) => {
                        if (!checkbox) {
                            allChecked = false
                            return
                        }
                    }
                );

                if (allChecked) {
                    this.mainCheckBoxCheck = true
                }
            }
        },
        areAllUnchecked() {
            let allNotChecked = true

            this.allCheckedBoxes.forEach(
                (checkbox, i) => {
                    if (checkbox) {
                        allNotChecked = false
                        return
                    }
                }
            );
            return allNotChecked
        },
        checkAllBoxes() {
            if (this.mainCheckBoxCheck) {
                this.allCheckedBoxes.forEach(
                    (checkbox, i) => this.allCheckedBoxes[i] = false
                );
            } else {
                this.allCheckedBoxes.forEach(
                    (checkbox, i) => this.allCheckedBoxes[i] = true
                );
            }

            this.mainCheckBoxCheck = !this.mainCheckBoxCheck;
            if (!this.mainCheckBoxCheck) {
                this.$store.commit('cancelDeleteActionPanel')
            }
        },
        noteIdIsChecked(noteID, idsToDelete) {
            let noteMatch = false
            idsToDelete.forEach((id, i) => {
                if (id === noteID) {
                    noteMatch = true
                    return
                }
            })
            return noteMatch
        }
    },
    computed: {
        checkedCheckboxes() {
            return this.$store.state.checkedNotesCheckbox
        },
        deleteSelected() {
            return this.$store.state.deleteSelected
        }
    },
    watch: {
        checkedCheckboxes(newVal, oldVal) {
            if (newVal === false) {
                this.allCheckedBoxes.forEach(
                    (checkbox, i) => this.allCheckedBoxes[i] = false
                );
                this.mainCheckBoxCheck = false
            }
        },
        notes: {
            handler(newVal, oldVal) {
                if (newVal.length) {
                    this.allCheckedBoxes[newVal[newVal.length - 1]["id"]] = false
                }
            },
            deep: true,
            immediate: true,
        },
        deleteSelected: {
            handler(newVal) {
                if (newVal) {
                    let noteIdsToDelete = []

                    this.allCheckedBoxes.forEach(
                        (checkbox, i) => {
                            if (checkbox) {
                                noteIdsToDelete.push(i)
                            }
                        }
                    );

                    let currentNotes = [...this.notes]
                    currentNotes.forEach((note, i) => {
                        if (this.noteIdIsChecked(note["id"], noteIdsToDelete)) {
                            this.$store.commit('deleteNote', note["id"])
                            this.allCheckedBoxes.splice(note["id"], 1)
                        }
                    })
                    
                    this.$store.commit('stopDeletion')
                    this.$store.commit('cancelDeleteActionPanel')
                }
            },
            deep: true,
            immediate: true,
        }
    },
}
</script>
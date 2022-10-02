<template>
    <div class="notes-table-container">
        <table class="notes-table">
            <thead>
                <tr class="head-row">
                    <td>
                        <div class="head-cell-container">
                            <label class="form-control">
                                <input class="note-item-checkbox" v-model="mainCheckBoxCheck" type="checkbox"
                                    @click="showAllDeleteAction" />
                                <p>ID</p>
                            </label>
                            <div class="sorting-arrows" @click="sortColumn('id')">
                                <div class="up-arrow" :class="{'sorted-up-arrow': sortingColumn === 'id'}"></div>
                                <div class="down-arrow" :class="{'sorted-down-arrow': sortingColumn === 'id'}"></div>
                            </div>
                        </div>
                    </td>
                    <td>
                        <div class="head-cell-container">
                            <p>Title</p>
                            <div class="sorting-arrows" @click="sortColumn('title')">
                                <div class="up-arrow" :class="{'sorted-up-arrow': sortingColumn === 'title'}"></div>
                                <div class="down-arrow" :class="{'sorted-down-arrow': sortingColumn === 'title'}"></div>
                            </div>
                        </div>
                    </td>
                    <td>
                        <div class="head-cell-container">
                            <p>Content</p>
                            <div class="sorting-arrows" @click="sortColumn('content')">
                                <div class="up-arrow" :class="{'sorted-up-arrow': sortingColumn === 'content'}"></div>
                                <div class="down-arrow" :class="{'sorted-down-arrow': sortingColumn === 'content'}">
                                </div>
                            </div>
                        </div>
                    </td>
                    <td class="last-column">
                        <div class="head-cell-container">
                            <p>Status</p>
                            <div class="sorting-arrows" @click="sortColumn('status')">
                                <div class="up-arrow" :class="{'sorted-up-arrow': sortingColumn === 'status'}"></div>
                                <div class="down-arrow" :class="{'sorted-down-arrow': sortingColumn === 'status'}">
                                </div>
                            </div>
                        </div>
                    </td>
                </tr>
            </thead>
            <tbody>
                <tr class="body-row" v-for="note in sortedNotes">
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

.head-cell-container {
    display: flex;
    justify-content: space-between;
}

.sorting-arrows {
    cursor: pointer;
}

.up-arrow {
    width: 0;
    height: 0;
    border: solid 5px transparent;
    background: transparent;
    border-bottom: solid 7px #D8D8D8;
    border-top-width: 0;
    clip-path: polygon(0 100%, 50% 0, 100% 100%, 80% 100%, 50% 40%, 20% 100%);
}

.down-arrow {
    width: 0;
    height: 0;
    border: solid 5px transparent;
    background: transparent;
    border-top: solid 7px #adacaf;
    border-bottom-width: 0;
    margin-top: 1px;
    clip-path: polygon(0 0, 50% 100%, 100% 0, 80% 0, 50% 60%, 20% 0);
}

.sorted-up-arrow {
    border-bottom: solid 7px #adacaf;
}

.sorted-down-arrow {
    border-top: solid 7px #D8D8D8;
}
</style>

<script>
export default {
    data() {
        return {
            mainCheckBoxCheck: false,
            allCheckedBoxes: [],
            sortingColumn: "",
            sortedNotes: [],
        }
    },
    props: {
        notes: Array
    },
    mounted() {
        for (let i = 0; i < this.notes.length; i++) {
            this.allCheckedBoxes[this.notes[i]["id"]] = false
        }
        this.sortedNotes = [...this.notes]
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
        },
        sortColumn(columnName) {
            if (columnName) {
                if (this.sortingColumn != columnName) {
                    this.sortingColumn = columnName
                } else {
                    this.sortingColumn = ""
                }
            }
            
            if (this.sortingColumn && this.sortingColumn !== "id") {
                let notesToSort = [...this.notes]
                this.sortedNotes = notesToSort.sort((a, b) => {
                    const nameA = a[this.sortingColumn].toLowerCase(); // ignore upper and lowercase
                    const nameB = b[this.sortingColumn].toLowerCase(); // ignore upper and lowercase
                    if (nameA < nameB) {
                        return -1;
                    }
                    if (nameA > nameB) {
                        return 1;
                    }
                    // names must be equal
                    return 0;
                })
            } else {
                this.sortedNotes = [...this.notes]
            }
            console.log(this.sortedNotes)
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
                    this.sortColumn()
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
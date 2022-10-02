<template>
    <Transition name="show">
        <div class="add-note-modal" v-if="displayModal">
            <form method="dialog" class="add-note-form">
                <h2>Add note</h2>
                <input type="text" class="note-title" :class="{'error-input': emptyTitle}" placeholder="Add Title"
                    v-model="title">
                <p v-if="emptyTitle" class="error-text">Missing Title</p>
                <textarea placeholder="Add Content" v-model="content" name="note-content" class="note-content" cols="20"
                    rows="4" :class="{'error-input': emptyContent}"></textarea>
                <p v-if="emptyContent" class="error-text">Missing Content</p>
                <div>
                    <button class="note-save-button" @click="saveDialog" data-cy="submit">Save</button>
                    <button class="note-cancel-button" @click="cancelDialog" data-cy="cancel">Cancel</button>
                </div>
            </form>
        </div>
    </Transition>
</template>

<style scoped>
@keyframes showModal {
    from {
        bottom: -500px;
    }

    to {
        bottom: 0;
    }
}

@keyframes cancelModal {
    from {
        bottom: 0;
    }

    to {
        bottom: -500px;
    }
}

.show-enter-active {
    animation: showModal 0.2s;
    animation-timing-function: ease-in-out;
}

.show-leave-active {
    animation: cancelModal 0.2s;
    animation-timing-function: ease-in-out;
}

.add-note-modal {
    width: 425px;
    height: 300px;
    -webkit-box-shadow: 0px 0px 10px 0px #868686;
    box-shadow: 0px 0px 10px 0px #868686;
    position: fixed;
    bottom: 0;
    left: 0;
    margin-left: 70px;
    margin-bottom: 50px;
    background-color: #fff;
}

.add-note-form {
    display: flex;
    flex-direction: column;
    padding: 25px 20px;
}

.add-note-form h2 {
    font-weight: normal;
    margin-bottom: 25px;
}

.note-content {
    resize: none;
    margin-bottom: 25px;
    padding-top: 10px;
}

.note-title {
    height: 40px;
    margin-bottom: 25px;
}

.note-content,
.note-title {
    padding-left: 10px;
    border: 1px solid #b4b4b4;
    border-radius: 2px;
    -webkit-box-shadow: 0px 0px 2px 0px rgba(192, 192, 192, 0.54);
    box-shadow: 0px 0px 2px 0px rgba(192, 192, 192, 0.54);
}

.add-note-form button {
    height: 40px;
}

.add-note-form button:hover {
    cursor: pointer;
}

.note-save-button {
    background-color: #00689D;
    color: #fff;
    border: none;
    margin-right: 30px;
    width: 120px;
    border-radius: 2px;
}

.note-cancel-button {
    background-color: #fff;
    color: #00689D;
    border: none;
}

.error-input {
    border-color: red;
    margin-bottom: 2px;
}

.error-text {
    color: red;
    font-size: 12px;
    margin-bottom: 12px;
}
</style>

<script>
export default {
    data() {
        return {
            title: "",
            content: "",
            emptyTitle: false,
            emptyContent: false,
        }
    },
    methods: {
        cancelDialog() {
            this.$store.commit('cancelNoteDialog')
        },
        validInput() {
            if (this.title.length === 0) {
                this.emptyTitle = true
            }
            if (this.content.length === 0) {
                this.emptyContent = true
            }

            if (this.emptyContent || this.emptyTitle) {
                return false
            }

            return true
        },
        saveDialog() {
            if (this.validInput()) {
                this.$store.commit('saveNoteDialog',
                    {
                        "title": this.title,
                        "content": this.content
                    }
                )
                this.title = ""
                this.content = ""
                this.$store.commit('cancelNoteDialog')
            }
        }
    },
    computed: {
        displayModal() {
            return this.$store.state.displayAddNoteModal
        }
    },
    watch: {
        title(newVal) {
            if (newVal.length > 0) {
                this.emptyTitle = false
            }
        },
        content(newVal) {
            if (newVal.length > 0) {
                this.emptyContent = false
            }
        }
    }
}
</script>
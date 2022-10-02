<template>
    <Transition name="show">
        <div class="add-note-modal" v-if="displayModal">
            <form method="dialog" class="add-note-form">
                <h2>Add note</h2>
                <input type="text" class="note-title" placeholder="Add Title" v-model="title">
                <textarea placeholder="Add Content" v-model="content" name="note-content" id="note-content" cols="20"
                    rows="4"></textarea>
                <div>
                    <button class="note-save-button" @click="saveDialog">Save</button>
                    <button class="note-cancel-button" @click="cancelDialog">Cancel</button>
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

#note-content {
    resize: none;
    margin-bottom: 25px;
    padding-top: 10px;
}

.note-title {
    height: 40px;
    margin-bottom: 25px;
}

#note-content,
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
</style>

<script>
export default {
    data() {
        return {
            title: "",
            content: ""
        }
    },
    methods: {
        cancelDialog() {
            this.$store.commit('cancelNoteDialog')
        },
        saveDialog() {
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
    },
    computed: {
        displayModal() {
            return this.$store.state.displayAddNoteModal
        }
    }
}
</script>
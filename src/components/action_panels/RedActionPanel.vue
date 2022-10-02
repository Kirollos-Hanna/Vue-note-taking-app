<script setup>
import IconExclamation from '../icons/IconExclamation.vue';
</script>

<template>
    <Transition name="show">
        <div v-if="displayActionPanel" class="red-action-panel">
            <div class="red-action-text-container">
                <div class="warning-icon-container">
                    <IconExclamation />
                </div>
                <p>Do you want to delete this note?</p>
            </div>
            <div class="action-buttons-container">
                <button class="no-action-button" @click="cancelPanel" data-cy="no-delete">No</button>
                <button class="yes-action-button" @click="deleteSelected" data-cy="yes-delete">Yes</button>
            </div>
        </div>
    </Transition>
</template>

<style scoped>
@keyframes showModal {
    from {
        right: -500px;
    }

    to {
        right: 0;
    }
}

@keyframes cancelModal {
    from {
        right: 0;
    }

    to {
        right: -500px;
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
.red-action-panel {
    width: 780px;
    height: 40px;
    background-color: red;
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 4px;
    position: fixed;
    bottom: 0;
    right: 0;
    margin-right: 10%;
    margin-bottom: 50px;
}

.red-action-panel p {
    line-height: 23px;
    font-style: italic;
    margin-left: 10px;
}

.red-action-text-container {
    display: flex;
    padding: 10px;
}

.warning-icon-container {
    height: 20px;
    width: 20px;
}

.action-buttons-container {
    padding-right: 5px;
}

.action-buttons-container button {
    width: 90px;
    height: 30px;
    border-radius: 4px;
}

.action-buttons-container button:hover {
    cursor: pointer;
}

.no-action-button {
    background: red;
    border: 1px solid white;
    color: white;
    margin-right: 10px;
}

.yes-action-button {
    color: red;
    border: none;
    background-color: #fff;
}
</style>


<script>
export default {
    methods: {
        cancelPanel() {
            this.$store.commit('cancelDeleteActionPanel')
        },
        deleteSelected(){
            this.$store.commit('deleteSelectedNotes')
        }
    },
    computed: {
        displayActionPanel() {
            return this.$store.state.displayDeleteActionPanel
        }
    }
}
</script>
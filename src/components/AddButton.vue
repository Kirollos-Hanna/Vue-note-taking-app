<template>
    <button class="add-button" @click="openDialog">Add</button>
</template>

<style scoped>
.add-button {
    background-color: #00689D;
    color: #fff;
    width: 170px;
    height: 40px;
    border: none;
    border-radius: 2px;
    float: right;
    margin-top: 20px;
}

.add-button:hover {
    cursor: pointer;
}
</style>

<script>
export default {
    methods: {
        openDialog() {
            this.$store.commit('showNoteDialog')
        }
    }
}
</script>
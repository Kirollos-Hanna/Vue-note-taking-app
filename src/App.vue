<script setup>
import Statistics from './components/Statistics.vue';
import NotesTable from './components/NotesTable.vue';
import AddButton from './components/AddButton.vue';
import AddNoteDialog from './components/dialogs/AddNoteDialog.vue';
import RedActionPanel from './components/action_panels/RedActionPanel.vue';
import data from './assets/mockData.json'
</script>

<template>
  <Statistics :notes="mockData['data']" />
  <div class=" notes-table-container">
    <NotesTable :notes="mockData['data']" />
    <AddButton />
  </div>
  <AddNoteDialog />
  <RedActionPanel />
</template>

<style scoped>
.notes-table-container {
  margin-top: 25px;
  max-width: 1050px;
}
</style>

<script>
export default {
  data() {
    return {
      mockData: data
    }
  },
  mounted() {
    this.$store.commit("saveDataInStore", this.mockData["data"])
  }
}
</script>
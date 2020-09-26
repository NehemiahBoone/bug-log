<template>
  <div class="bug container-fluid">
    <div class="row">
      <div class="col-4">
        <h1>{{ bug.title }}</h1>
        <h4>Created By: {{ bug.creatorEmail }}</h4>
        <p>{{ bug.description }}</p>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <h2>Notes:</h2>
        <form @submit.prevent="addNote" class="form-inline">
          <div class="form-group">
            <input
              type="text"
              name="content"
              id="content"
              class="form-control"
              placeholder="Content..."
              v-model="newNote.content"
              aria-describedby="helpId"
            />
          </div>
          <button type="submit" class="btn btn-success">Post Note</button>
        </form>
        <note v-for="note in notes" :key="note.id" :noteProp="note" />
      </div>
    </div>
  </div>
</template>


<script>
import Note from "../components/NoteComponent.vue";
export default {
  name: "Bug",
  mounted() {
    this.$store.dispatch("getActiveBug", this.$route.params.id);
    this.$store.dispatch("getNotes", this.$route.params.id);
  },
  data() {
    return {
      newNote: {},
    };
  },
  computed: {
    bug() {
      return this.$store.state.bug;
    },
    notes() {
      return this.$store.state.notes;
    },
  },
  methods: {
    addNote() {
      this.newNote.bug = this.$route.params.id;
      this.$store.dispatch("addNote", this.newNote);
      this.newNote = {};
    },
  },
  components: {
    Note,
  },
};
</script>


<style scoped>
</style>
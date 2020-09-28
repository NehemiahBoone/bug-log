<template>
  <div class="note mt-5">
    <small>{{ noteProp.creatorEmail }}</small>
    <p>
      {{ noteProp.content }}
      <i
        v-if="noteProp.creatorEmail == this.$auth.userInfo.name"
        @click="deleteNote"
        class="fas fa-trash mx-1 text-danger"
      ></i
      ><i
        v-if="noteProp.creatorEmail == this.$auth.userInfo.name"
        @click="editToggle = !editToggle"
        class="fas fa-pencil-alt ml-1 text-info mx-1"
      ></i>
    </p>
    <form @submit.prevent="editNote" class="form-inline" v-if="editToggle">
      <div class="form-group">
        <input
          type="text"
          name="content"
          id="content"
          class="form-control"
          placeholder="Content..."
          aria-describedby="helpId"
          v-model="editedNote.content"
        />
      </div>
      <button class="btn btn-info mx-1" type="submit">Edit Note</button>
    </form>
  </div>
</template>


<script>
export default {
  mounted() {
    this.$store.dispatch("getNotes", this.noteProp.bug);
  },
  name: "Note",
  props: ["noteProp"],
  data() {
    return {
      editToggle: false,
      editedNote: {},
    };
  },
  computed: {},
  methods: {
    deleteNote() {
      let popup = confirm("Are you sure you want to delete this note?");
      if (popup) {
        this.$store.dispatch("deleteNote", this.noteProp);
      }
    },
    editNote() {
      let popup = confirm("Are you sure you want to edit this note?");
      if (popup == true) {
        this.editToggle = false;
        this.editedNote.creatorEmail = this.noteProp.creatorEmail;
        this.editedNote.bug = this.$route.params.id;
        this.editedNote.id = this.noteProp.id;
        this.$store.dispatch("editNote", this.editedNote);
      }
    },
  },
  components: {},
};
</script>


<style scoped>
</style>
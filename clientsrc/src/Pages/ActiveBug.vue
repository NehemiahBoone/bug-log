<template>
  <div class="bug container-fluid">
    <div class="row">
      <div class="col-4">
        <button
          v-if="
            this.bug.creatorEmail == this.$auth.userInfo.name &&
            this.bug.closed == false
          "
          type="button"
          class="btn btn-outline-info my-2"
          @click="editToggle = !editToggle"
        >
          Edit Bug
        </button>
        <form v-if="editToggle" @submit.prevent="editBug" class="form-inline">
          <div class="form-group">
            <input
              type="text"
              name="title"
              id="title"
              class="form-control"
              placeholder="title..."
              v-model="editedBug.title"
              aria-describedby="helpId"
            />
          </div>
          <div class="form-group">
            <input
              type="text"
              name="description"
              id="description"
              class="form-control"
              placeholder="description..."
              v-model="editedBug.description"
              aria-describedby="helpId"
            />
          </div>
          <button type="submit" class="btn btn-success my-1">Change Bug</button>
        </form>
        <h1 class="mt-1 ml-1 titleStyle">{{ bug.title }}</h1>
        <h4 class="mt-1 ml-1">Created By: {{ bug.creatorEmail }}</h4>
        <p class="mt-1 mx-3">{{ bug.description }}</p>
      </div>
    </div>
    <div class="row mt-2">
      <div class="col-12">
        <h2>Notes:</h2>
        <div class="mx-3">
          <form
            v-if="this.bug.closed == false"
            @submit.prevent="addNote"
            class="form-inline"
          >
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
            <button type="submit" class="btn btn-success mx-1">
              Post Note
            </button>
          </form>
          <note v-for="note in notes" :key="note.id" :noteProp="note" />
        </div>
      </div>
    </div>
    <div class="row fixed-row-bottom">
      <div class="col">
        <button
          v-if="
            this.bug.creatorEmail == this.$auth.userInfo.name &&
            this.bug.closed == false
          "
          @click="closeBug"
          type="button"
          class="btn btn-warning mb-2"
        >
          CLOSE BUG
        </button>
        <small v-if="this.bug.closed">THIS BUG HAS BEEN CLOSED</small>
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
    console.log(this.$store.state.bug);
    this.$store.dispatch("getNotes", this.$route.params.id);
  },
  data() {
    return {
      newNote: {},
      editToggle: false,
      editedBug: {},
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
    closeBug() {
      let popup = confirm("Are you sure you want to close this bug?");
      if (popup == true) {
        this.$store.dispatch("closeBug", {
          closed: true,
          id: this.$route.params.id,
        });
      }
    },
    editBug() {
      let popup = confirm("Are you sure you want to edit this bug?");
      if (popup == true) {
        this.editToggle = false;
        this.editedBug.id = this.$route.params.id;
        this.$store.dispatch("editBug", this.editedBug);
      }
    },
  },
  components: {
    Note,
  },
};
</script>


<style scoped>
.fixed-row-bottom {
  position: fixed;
  bottom: 0;
}
.titleStyle {
  border-bottom-width: 0.01em;
  border-bottom-style: solid;
  border-bottom-color: grey;
}
</style>
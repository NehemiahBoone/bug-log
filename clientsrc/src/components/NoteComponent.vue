<template>
  <div class="note mt-5">
    <small>{{ noteProp.creatorEmail }}</small>
    <p>
      {{ noteProp.content }}
      <i
        v-if="noteProp.creatorEmail == this.$auth.userInfo.name"
        @click="deleteNote"
        class="fas fa-trash mx-1 text-danger"
      ></i>
    </p>
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
    return {};
  },
  computed: {},
  methods: {
    deleteNote() {
      let popup = confirm("Are you sure you want to delete this note?");
      if (popup) {
        this.$store.dispatch("deleteNote", this.noteProp);
      }
    },
  },
  components: {},
};
</script>


<style scoped>
</style>
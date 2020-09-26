<template>
  <div class="note">
    <p>{{ noteProp.content }}</p>
  </div>
</template>


<script>
export default {
  name: "Note",
  props: ["noteProp"],
  data() {
    return {};
  },
  computed: {},
  methods: {},
  components: {},
};
</script>


<style scoped>
</style>
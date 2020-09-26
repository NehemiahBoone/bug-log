<template>
  <div class="bugs container-fluid">
    <div class="row">
      <div class="col-12">
        <div class="card m-2">
          <div class="card-body">
            <h4 class="card-title text-center">Post Bug</h4>
            <div class="card-text text-center">
              <form @submit.prevent="createBug" class="form">
                <div class="form-group">
                  <input
                    type="text"
                    name="title"
                    id="title"
                    class="form-control"
                    placeholder="Title..."
                    aria-describedby="helpId"
                    v-model="newBug.title"
                  />
                </div>
                <div class="form-group">
                  <input
                    type="text"
                    name="description"
                    id="description"
                    class="form-control"
                    placeholder="Description..."
                    aria-describedby="helpId"
                    v-model="newBug.description"
                  />
                </div>
                <button type="submit" class="btn btn-success">Post</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12 text-center">
        <div class="card customCard">
          <div class="card-header">BUGS</div>
          <ul class="list-group list-group-flush">
            <bug-component v-for="bug in bugs" :key="bug.id" :bugProp="bug" />
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import BugComponent from "../components/BugComponent.vue";
export default {
  name: "Bugs",
  mounted() {
    this.$store.dispatch("getBugs");
  },
  data() {
    return {
      newBug: {},
    };
  },
  computed: {
    bugs() {
      return this.$store.state.bugs;
    },
  },
  methods: {
    createBug() {
      this.$store.dispatch("createBug", this.newBug);
      this.newBug = {};
    },
  },
  components: {
    BugComponent,
  },
};
</script>


<style scoped>
.customCard {
  max-width: 50vh;
  margin: 0 auto;
  margin-bottom: 10px;
}
ul {
  list-style-type: none;
}
</style>
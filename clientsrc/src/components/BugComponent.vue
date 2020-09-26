<template>
  <div class="bug">
    <li>
      <router-link :to="{ name: 'Bug', params: { id: bugProp.id } }">{{
        bugProp.title
      }}</router-link>
      -- {{ bugProp.description }} -- <span :v-if="!bugProp.closed">Open</span>
    </li>
  </div>
</template>


<script>
export default {
  name: "Bug",
  props: ["bugProp"],
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
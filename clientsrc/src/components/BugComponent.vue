<template>
  <div class="bug">
    <li>
      <router-link
        :class="{ del: bugProp.closed }"
        :to="{ name: 'Bug', params: { id: bugProp.id } }"
        >{{ bugProp.title }}</router-link
      >
      | <span class="descriptionChar">{{ bugProp.description }}</span> |
      <span v-if="bugProp.closed == false">Open</span
      ><span v-if="bugProp.closed">Closed</span> |
      {{ bugProp.updatedAt }}
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
.del {
  text-decoration: line-through;
}
.descriptionChar {
  display: inline-block;
  max-width: 100px;
  white-space: nowrap;
  overflow: hidden !important;
  text-overflow: ellipsis;
}
</style>
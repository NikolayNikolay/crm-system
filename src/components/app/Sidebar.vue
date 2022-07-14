<template>
  <ul class="sidenav app-sidenav" :class="{ open: !props.isOpen }">
    <li v-for="link in links" :key="link.url">
      <router-link
        active-class="activeLI"
        :to="link.url"
        class="waves-effect waves-deep-purple pointer"
        :exact="link.exact"
        >{{ link.title }}</router-link
      >
    </li>
  </ul>
</template>

<script setup>
const { reactive } = require("@vue/reactivity");

const props = defineProps({
  isOpen: Boolean,
});

const links = reactive([
  {
    title: "Score",
    url: "/",
    exact: true,
  },
  {
    title: "History",
    url: "/history",
  },
  {
    title: "Planning",
    url: "/planning",
  },
  {
    title: "New entry",
    url: "/record",
  },
  {
    title: "Categories",
    url: "/categories",
  },
]);
</script>

<style lang='scss'>
</style>
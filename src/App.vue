<template>
  <component :is="layout"><router-view></router-view></component>
</template>


<script setup>
import { computed } from "@vue/runtime-core";
import { useRoute } from "vue-router";
import EmptyLayout from "./layouts/EmptyLayout.vue";
import MainLayout from "./layouts/MainLayout.vue";

const route = useRoute();

const layout = computed(() => {
  if (route.meta.layout === "Main") {
    return MainLayout;
  }
  return EmptyLayout;
});
</script>


<style lang="scss">
@import "../node_modules/materialize-css/dist/css/materialize.min.css";
@import "./index.css";
</style>

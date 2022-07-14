<template>
  <div class="app-main-layout">
    <Navbar @clickNavbar="isOpen = !isOpen" />
    <Sidebar :isOpen="isOpen" />
    <main class="app-content" :class="{ full: isOpen }">
      <div class="app-page">
        <router-view></router-view>
      </div>
    </main>

    <div class="fixed-action-btn">
      <router-link
        class="btn-floating btn-large indigo lighten-3"
        to="/record"
        v-my-directive="'Create a record'"
      >
        <i class="large material-icons">add</i>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import message from "../utils/message";
const { FirebaseError } = require("@firebase/util");
import { onMounted, ref, inject, computed, watch } from "vue";
import { useStore } from "vuex";
import Navbar from "../components/app/Navbar.vue";
import Sidebar from "../components/app/Sidebar.vue";

const isOpen = ref(false);
const store = useStore();
const messagePlugin = inject("messagePlugin");
//кастомная директива которая применятся к компонету прогресс бар при наведении
const vMyDirective = {
  mounted(el, { value }) {
    M.Tooltip.init(el, { html: value, position: "left" });
  },
  unmounted(el) {
    const tooltip = M.Tooltip.getInstance(el);
    if (tooltip.destroy) {
      tooltip.destroy();
    }
  },
};
//при загрузки страницы получаем информацию о пользователе(имя и счет)
onMounted(async () => {
  if (!Object.keys(store.getters.info).length) {
    await store.dispatch("fetchInfo");
  }
});

//вывод ошибок на экран,
const error = computed(() => store.getters.error);
watch(error, (FirebaseError) => {
  messagePlugin.error(message[FirebaseError.code] || "Unknown error");
});
</script>

<style>
</style>
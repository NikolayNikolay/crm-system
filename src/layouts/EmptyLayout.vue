<template>
  <div class="indigo lighten-5 empty-layout"><router-view></router-view></div>
</template>

<script setup>
import message from "../utils/message";
const { FirebaseError } = require("@firebase/util");
const { computed, watch, inject } = require("@vue/runtime-core");
const { useStore } = require("vuex");

const store = useStore();

const messagePlugin = inject("messagePlugin");

//вывод ошибок на экран,
const error = computed(() => store.getters.error);
watch(error, (FirebaseError) => {
  console.log(FirebaseError.code);
  messagePlugin.error(message[FirebaseError.code] || "Неизвестная ошибка");
});
</script>

<style>
</style>
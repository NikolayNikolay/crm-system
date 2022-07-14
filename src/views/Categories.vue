<template>
  <div>
    <div class="page-title">
      <h3>Categories</h3>
    </div>
    <section>
      <Loader v-if="loading" />
      <div class="row" v-else>
        <CategoryCreate @created="addNewCategory" />
        <CategoryEdit
          :category="category"
          @update="updateCategory"
          :key="current"
          v-if="category.length"
        />
        <p class="center" v-else>No categories created yet</p>
      </div>
    </section>
  </div>
</template>

<script setup>
import CategoryCreate from "@/components/CategoryCreate.vue";
import CategoryEdit from "@/components/CategoryEdit.vue";
import { reactive, ref, computed, inject, onMounted } from "@vue/runtime-core";
import { useStore } from "vuex";
const category = ref([]);
const loading = ref(true);
const store = useStore();
const current = ref(0);

onMounted(async () => {
  try {
    category.value = await store.dispatch("fetchCategories");
    loading.value = false;
  } catch (error) {
    loading.value = false;
  }
});

const updateCategory = (obj) => {
  const index = category.value.findIndex((elem) => {
    return elem.id === obj.id;
  });
  category.value[index].title = obj.title;
  category.value[index].limit = obj.limit;
  //для перерендера компонета в котором находится селект что бы он отображал коректные изменения
  category.value.push(cat);
};
const addNewCategory = (obj) => {
  const arr = { ...obj };
  category.value.push(arr);
  console.log(category.value);
  current.value++;
};
</script>

<style>
</style>
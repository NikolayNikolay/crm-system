<template>
  <div>
    <div class="page-title">
      <h3>Record History</h3>
    </div>
    <Loader v-if="loading" />
    <section v-else-if="records.length">
      <HistoryTable :records="records" />
    </section>
    <p class="center" v-else-if="records">No notes yet.</p>
  </div>
</template>

<script setup>
import HistoryTable from "@/components/HistoryTable.vue";

import { onMounted, ref } from "@vue/runtime-core";
import { useStore } from "vuex";

const loading = ref(true);
const records = ref([]);
const categories = ref([]);
const store = useStore();
onMounted(async () => {
  try {
    //получение данных которые находятся в разделе рекорд из раздела доход расход
    records.value = await store.dispatch("fetchRecords");
    //получение от сервера данных которые находятся в разделе категориес
    categories.value = await store.dispatch("fetchCategories");
    //высчитываем массив
    records.value = records.value.map((record) => {
      return {
        ...record,
        cateryName: categories.value.find((c) => c.id === record.categoryId)
          .title,
        typeClass: record.type === "income" ? "green" : "red",
        typeText: record.type === "income" ? "Income" : "Consumption",
      };
    });
    loading.value = false;
  } catch (err) {
    loading.value = false;
  }
});
</script>

<style >
.pagination-container {
  display: flex;
  column-gap: 10px;
}
.paginate-buttons {
  height: 40px;
  width: 40px;
  border-radius: 20px;
  cursor: pointer;
  background-color: rgb(242, 242, 242);
  border: 1px solid rgb(217, 217, 217);
  color: black;
}
.paginate-buttons:hover {
  background-color: #9fa8da;
}
.paginate-buttons:focus {
  background-color: #9fa8da;
}
.active-page {
  background-color: #9fa8da;
  /* border: 1px solid #3498db; */
  color: white;
}
.active-page:hover {
  background-color: #9fa8da;
}
</style>
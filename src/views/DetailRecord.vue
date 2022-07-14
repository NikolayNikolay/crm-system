<template>
  <div>
    <div>
      <div class="breadcrumb-wrap">
        <router-link to="/history" class="breadcrumb">History</router-link>
        <a @click.prevent class="breadcrumb"
          >{{ record.type === "income" ? "Revenue" : "Consumption" }}
        </a>
      </div>
      <Loader v-if="loading" />
      <div class="row" v-else-if="record">
        <div class="col s12 m6">
          <div
            class="card"
            :class="{
              red: record.type === 'outcome',
              green: record.type === 'income',
            }"
          >
            <div class="card-content white-text">
              <p>Description: {{ record.description }}</p>
              <p>Amount: {{ record.amount }} грн</p>
              <p>Category: {{ record.categorieName }}</p>
              <small>{{ record.date }}</small>
            </div>
          </div>
        </div>
      </div>
      <p class="center" v-else>There is no such entry</p>
    </div>
  </div>
</template>

<script setup>
const { onMounted, ref } = require("@vue/runtime-core");
const { useRoute } = require("vue-router");
const { useStore } = require("vuex");

const record = ref([]);
const category = ref([]);
const rout = useRoute();
const store = useStore();
const loading = ref(true);
onMounted(async () => {
  try {
    const recor = await store.dispatch("fetchRecordsById", rout.params.id);
    const categorie = await store.dispatch(
      "fetchCategoriesById",
      recor.categoryId
    );
    record.value = { ...recor, categorieName: categorie.title };
    loading.value = false;
  } catch (error) {}
});
</script>

<style>
</style>
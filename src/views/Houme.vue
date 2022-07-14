<template>
  <div>
    <div class="page-title">
      <h3>Account</h3>

      <button
        class="btn waves-effect waves-light indigo lighten-3 btn-small"
        @click="refresh"
      >
        <i class="material-icons">refresh</i>
      </button>
    </div>
    <Loader v-if="loading" />
    <div class="row" v-else>
      <HomeBill :rates="currency.rates" />
      <HomeCurrency :rates="currency.rates" :date="currency.date" />
    </div>
  </div>
</template>

<script setup>
import HomeBill from "../components/HomeBill.vue";
import HomeCurrency from "../components/HomeCurrency.vue";
import { onMounted, ref } from "vue";
import { useStore } from "vuex";

const loading = ref(true);

const currency = ref(null);
const store = useStore();

onMounted(async () => {
  try {
    currency.value = await store.dispatch("fetchCurrency");
    loading.value = false;
  } catch (err) {
    console.log(err);
    loading.value = false;
  }
});

async function refresh() {
  try {
    loading.value = true;
    currency.value = await store.dispatch("fetchCurrency");
    loading.value = false;
  } catch (error) {
    loading.value = false;
  }
}
</script>

<style>
</style>
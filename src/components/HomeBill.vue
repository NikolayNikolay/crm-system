<template>
  <div class="col s12 m6 l4">
    <div class="card indigo lighten-2 bill-card">
      <div class="card-content white-text">
        <span class="card-title">Account in currency</span>

        <p v-for="cur in currencies" :key="cur" class="currency-line">
          <span>{{
            currencyFilter.currencyFilter(getCurrency(cur), cur)
          }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
const { computed, ref, inject } = require("@vue/runtime-core");
const { useStore } = require("vuex");

const currencyFilter = inject("currencyFilter");

const props = defineProps({ rates: Object });
const store = useStore();
const currencies = ref(["UAH", "USD", "EUR"]);

//вычисляем сколько у нас в гривнах
const base = computed(() => {
  return store.getters.info.bill / (props.rates["UAH"] / props.rates["USD"]);
});
//передаем значение и вычисляем соотношение валюты
function getCurrency(params) {
  return Math.floor(base.value * props.rates[params]);
}
</script>

<style>
</style>
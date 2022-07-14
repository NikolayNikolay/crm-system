<template>
  <div>
    <div class="page-title">
      <h3>Planning</h3>
      <h4>{{ currencyFilter.currencyFilter(infoBill) }}</h4>
    </div>
    <Loader v-if="loading" />
    <p class="center" v-else-if="!categories.length">No categories yet</p>
    <section v-else>
      <div v-for="cat in categories" :key="cat.id">
        <p>
          <strong>{{ cat.title }}:</strong>
          {{ currencyFilter.currencyFilter(cat.spend) }} из
          {{ currencyFilter.currencyFilter(cat.limit) }}
        </p>
        <div class="progress" v-my-directive="cat.tooltip">
          <div
            class="determinate"
            :style="{ width: `${cat.progressPercent}%` }"
            :class="[cat.progressColor]"
          ></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import {
  reactive,
  ref,
  computed,
  inject,
  onMounted,
  onUpdated,
  onBeforeUpdate,
} from "@vue/runtime-core";
import { useStore } from "vuex";

const loading = ref(true);
const categories = ref([]);
const store = useStore();
//получение общей суммы
const infoBill = computed(() => store.getters.info.bill);
const currencyFilter = inject("currencyFilter");
//кастомная директива которая применятся к компонету прогресс бар при наведении
const vMyDirective = {
  mounted(el, { value }) {
    M.Tooltip.init(el, { html: ` ${value}грн` });
  },
  unmounted(el) {
    const tooltip = M.Tooltip.getInstance(el);
    if (tooltip.destroy) {
      tooltip.destroy();
    }
  },
};
onMounted(async () => {
  try {
    //получение данных которые находятся в разделе рекорд из раздела доход расход
    const records = await store.dispatch("fetchRecords");
    //получение от сервера данных которые находятся в разделе категориес
    const categor = await store.dispatch("fetchCategories");
    // определяем какие рекорды относятся к категории потом определяем какие являются расходами а потом просумировать по значению
    categories.value = categor.map((cat) => {
      const spend = records
        .filter((r) => r.categoryId === cat.id)
        .filter((r) => r.type === "outcome")
        .reduce((arr, record) => {
          return (arr += +record.amount);
        }, 0);
      //вычисляем процент для прогрессбара
      const precent = (100 * spend) / cat.limit;
      // что бы проценты небыли больше 100 делаем проверку
      const progressPercent = precent > 100 ? 100 : precent;
      // добавляем плоске прогресса цвет
      const progressColor =
        precent < 60 ? "green" : precent < 100 ? "yellow" : "red";

      const tooltipValue = cat.limit - spend;
      const tooltip = `${
        tooltipValue < 0 ? "The excess on the" : "Remaining"
      }${Math.abs(tooltipValue)}`;
      return { ...cat, progressPercent, progressColor, spend, tooltip };
    });
    loading.value = false;
  } catch (err) {
    loading.value = false;
  }
});
</script>

<style>
</style>
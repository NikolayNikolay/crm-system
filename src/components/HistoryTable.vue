<template>
  <table>
    <thead>
      <tr>
        <th>#</th>
        <th>Amount</th>
        <th>Date</th>
        <th>Category</th>
        <th>Type</th>
        <th>Open</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="(record, idx) in props.records" :key="record.id">
        <td>{{ idx + 1 }}</td>
        <td>{{ record.amount }}грн</td>
        <td>{{ record.date }}</td>
        <td>{{ record.cateryName }}</td>
        <td>
          <span class="white-text badge" :class="[record.typeClass]">{{
            record.typeText
          }}</span>
        </td>
        <td>
          <button
            class="btn-small btn indigo lighten-3"
            @click="$router.push('/detail/' + record.id)"
            v-my-directive="'Open history'"
          >
            <i class="material-icons">open_in_new</i>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
const props = defineProps({
  records: {
    type: Array,
    required: true,
  },
});
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
</script>

<style>
</style>
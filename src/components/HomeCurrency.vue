<template>
  <div class="col s12 m6 l8">
    <div class="card blue lighten-3 bill-card">
      <div class="card-content white-text">
        <div class="card-header">
          <span class="card-title">Exchange rate</span>
        </div>
        <table>
          <thead>
            <tr>
              <th>Currency</th>
              <th>Course</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="cur in currencies" :key="cur">
              <td>{{ cur }}</td>
              <td>{{ props.rates[cur].toFixed(4) }}</td>
              <td>{{ props.date }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
const props = defineProps({ rates: Object, date: String });

const currencies = ref(["UAH", "USD", "EUR"]);
</script>

<style>
</style>
<template>
  <div>
    <div class="page-title">
      <h3>New entry</h3>
    </div>
    <Loader v-if="loading" />
    <p class="center" v-else-if="!categories.length">No categories yet</p>
    <form class="form" v-else @submit.prevent="submitHendler">
      <div class="input-field">
        <select ref="select" v-model="category">
          <option v-for="cat in categories" :key="cat.id" :value="cat.id">
            {{ cat.title }}
          </option>
        </select>
        <label>Select category</label>
      </div>

      <p>
        <label>
          <input
            class="with-gap"
            name="type"
            type="radio"
            value="income"
            v-model="record.type"
          />
          <span>Income</span>
        </label>
      </p>

      <p>
        <label>
          <input
            class="with-gap"
            name="type"
            type="radio"
            value="outcome"
            v-model="record.type"
          />
          <span>Consumption</span>
        </label>
      </p>

      <div class="input-field">
        <input
          id="amount"
          type="number"
          v-model="record.amount"
          :class="{ invalid: v$.amount.$error }"
        />
        <label for="amount">Amount</label>
        <span class="helper-text invalid" v-if="v$.amount.$error">{{
          v$.amount.$errors[0].$message
        }}</span>
      </div>

      <div class="input-field">
        <input
          id="description"
          type="text"
          v-model="record.description"
          :class="{ invalid: v$.description.$error }"
        />
        <label for="description">Description</label>
        <span class="helper-text invalid" v-if="v$.description.$error">{{
          v$.description.$errors[0].$message
        }}</span>
      </div>

      <button
        class="btn waves-effect waves-light indigo lighten-3"
        type="submit"
      >
        Create
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script setup>
import useVuelidate from "@vuelidate/core";
import { required, minValue } from "@vuelidate/validators";
const {
  onMounted,
  ref,
  onBeforeMount,
  reactive,
  computed,
  inject,
} = require("@vue/runtime-core");
const { useStore } = require("vuex");

const loading = ref(true);
const select = ref(null);
const formSelect = ref(null);
const categories = ref([]);
const category = ref(null);
const store = useStore();
const record = reactive({ type: "outcome", amount: 1, description: "" });
//получаю информацию о начальном балансе которое записывается когда пользователь региструрется
const infoBill = computed(() => store.getters.info.bill);
const messagePlugin = inject("messagePlugin");
//параметры для проверки валидности полей инпутов
const rules = computed(() => {
  return {
    amount: { minValue: minValue(1) },
    description: { required },
  };
});
const v$ = useVuelidate(rules, record);
//проверяем на расход или доход
const canCreatedRecord = computed(() => {
  if (record.type === "income") {
    return true;
  }
  return record.amount <= infoBill.value;
});

//создаем новую категорию и заносим в новый обьект на сервере
const submitHendler = async () => {
  v$.value.$validate();
  if (v$.value.$error) {
    v$.value.$touch();
    console.log(v$.value.$error);
    return;
  }
  if (canCreatedRecord.value) {
    //создаем новую запись которая будет по пути record находиться на сервере
    try {
      await store.dispatch("createRecord", {
        categoryId: category.value,
        amount: record.amount,
        description: record.description,
        type: record.type,
        date: new Date().toJSON(),
      });
      // записываем разницу доход или расход в новую переменную
      const bill =
        record.type === "income"
          ? infoBill.value + record.amount
          : infoBill.value - record.amount;
      //обновляем данные о состоянии основного счета который на главной странице
      await store.dispatch("updateInfo", { bill });
      messagePlugin.message("This entry was created by");
      v$.value.$reset();
    } catch (err) {}
  } else {
    messagePlugin.message(
      `Insufficient funds(${record.amount - infoBill.value})`
    );
  }
  try {
  } catch (er) {}
};
//при загрузки страницы получаю категории которые были созданы и вывожу в селект
onMounted(async () => {
  try {
    categories.value = await store.dispatch("fetchCategories");
    loading.value = false;
    if (categories.value) {
      category.value = categories.value[0].id;
    }

    setTimeout(() => {
      formSelect.value = M.FormSelect.init(select.value);
      M.updateTextFields();
    }, 0);
  } catch (error) {
    loading.value = false;
  }
});

//удаляем когда мы уходим из этой страницы и очищаем утечку памяти
onBeforeMount(() => {
  if (formSelect.value) {
    formSelect.value.destroy();
  }
});
</script>

<style>
</style>
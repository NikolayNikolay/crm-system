<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Create</h4>
      </div>

      <form @submit.prevent="submitHendler">
        <div class="input-field">
          <input
            id="name"
            type="text"
            v-model="create.title"
            :class="{ invalid: v$.title.$error }"
          />
          <label for="name">Name</label>
          <span class="helper-text invalid" v-if="v$.title.$error"
            >Enter a name</span
          >
        </div>

        <div class="input-field">
          <input
            id="limit"
            type="number"
            v-model="create.limit"
            :class="{ invalid: v$.limit.$error }"
          />
          <label for="limit">Limit</label>
          <span class="helper-text invalid" v-if="v$.limit.$error"
            >Minimum value {{ v$.limit.minValue.$params.min }}</span
          >
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
  </div>
</template>

<script setup>
import useVuelidate from "@vuelidate/core";
import { required, minValue } from "@vuelidate/validators";
import { reactive, ref, computed, inject } from "@vue/runtime-core";
import { Store, useStore } from "vuex";

const create = reactive({
  title: "",
  limit: "",
});
const store = useStore();

const messagePlugin = inject("messagePlugin");

const emit = defineEmits();

const rules = computed(() => {
  return {
    title: { required },
    limit: { required, minValue: minValue(100) },
  };
});

const v$ = useVuelidate(rules, create);
//проверка на валидность созданния категории если валидно то вызываем метод из стора который отпраляет данные на сервер
const submitHendler = async () => {
  v$.value.$validate();
  if (v$.value.$error) {
    v$.value.$touch();
    return;
  }
  try {
    const category = await store.dispatch("createCategory", create);
    v$.value.$reset();
    emit("created", category);
    create.title = "";
    create.limit = "";
    messagePlugin.message("Category successfully created");
  } catch (err) {}
};
</script>

<style>
</style>
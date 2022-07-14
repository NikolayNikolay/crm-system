<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Edit</h4>
      </div>

      <form @submit.prevent="submitHendler">
        <div class="input-field">
          <select ref="select" v-model="current">
            <option v-for="c in props.category" :key="c.id" :value="c.id">
              {{ c.title }}
            </option>
          </select>

          <label>Select a category</label>
        </div>

        <div class="input-field">
          <input
            type="text"
            id="name"
            v-model="formItems.title"
            :class="{ invalid: v$.limit.$error }"
          />
          <label for="name">Title</label>
          <span class="helper-text invalid" v-if="v$.title.$error">{{
            v$.title.$errors[0].$message
          }}</span>
        </div>

        <div class="input-field">
          <input
            id="limit"
            type="number"
            v-model="formItems.limit"
            :class="{ invalid: v$.limit.$error }"
          />
          <label for="limit">Limit</label>
          <span class="helper-text invalid" v-if="v$.limit.$error">{{
            v$.limit.$errors[0].$message
          }}</span>
        </div>

        <button
          class="btn waves-effect waves-light indigo lighten-3"
          type="submit"
        >
          Update
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import useVuelidate from "@vuelidate/core";
import { required, minLength } from "@vuelidate/validators";
import { useStore } from "vuex";
const {
  onMounted,
  ref,
  onBeforeMount,
  reactive,
  computed,
  watch,
  inject,
} = require("@vue/runtime-core");
const props = defineProps({ category: Array });
const current = ref(props.category[0].id);
const emit = defineEmits();
const select = ref(null);
const formSelect = ref(null);
const formItems = reactive({
  title: props.category[0].title,
  limit: props.category[0].limit,
});
const store = useStore();
const messagePlugin = inject("messagePlugin");
const rules = computed(() => {
  return {
    title: { required },
    limit: { required, minLength: minLength(1) },
  };
});
// отслеживаем изменения в селекте и когда выбираем категорию то в current передается йди по которому ищем совпадение и записываем в инпуты формы
watch(current, (catId) => {
  const { title, limit } = props.category.find((cat) => cat.id === catId);
  formItems.title = title;
  formItems.limit = limit;
});
//валидируем и отправляем изменения формы
const v$ = useVuelidate(rules, formItems);
const submitHendler = async () => {
  v$.value.$validate();
  if (v$.value.$error) {
    v$.value.$touch();
    console.log(v$.value.$error);
    return;
  }
  try {
    const categoryData = { id: current.value, ...formItems };
    console.log("esssss");
    await store.dispatch("updateCategory", categoryData);
    emit("update", categoryData);
    messagePlugin.message("Successfully upgraded");
  } catch (er) {}
};
//загружаем правильное поведение из материал юай
onMounted(() => {
  formSelect.value = M.FormSelect.init(select.value);
  M.updateTextFields();
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
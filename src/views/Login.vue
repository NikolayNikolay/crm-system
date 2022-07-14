<template>
  <form class="card auth-card" @submit.prevent="submitHendler">
    <div class="card-content">
      <span class="card-title">Home accounting</span>
      <div class="input-field">
        <input
          v-model.trim="forms.email"
          id="email"
          type="text"
          class="validate"
          :class="{ invalid: v$.email.$error }"
        />
        <label for="email">Email</label>
        <small v-if="v$.email.$error" class="helper-text invalid">{{
          v$.email.$errors[0].$message
        }}</small>
      </div>
      <div class="input-field">
        <input
          v-model.trim="forms.password"
          id="password"
          type="password"
          class="validate"
          :class="{ invalid: v$.password.$error }"
        />
        <label for="password">Password</label>
        <small v-if="v$.password.$error" class="helper-text invalid">{{
          v$.password.$errors[0].$message
        }}</small>
      </div>
    </div>
    <div class="card-action">
      <div>
        <button
          class="btn waves-effect waves-light auth-submit indigo lighten-3"
          type="submit"
        >
          Log in
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        No account?
        <router-link to="/register">Sign up</router-link>
      </p>
    </div>
    <div>Test: email- test@gmail.com , password - 123456</div>
  </form>
</template>

<script setup>
import messages from "@/utils/message";
import { reactive } from "@vue/reactivity";
import { computed, inject, onMounted } from "@vue/runtime-core";
import useVuelidate from "@vuelidate/core";
import { required, email, minLength } from "@vuelidate/validators";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";

const router = useRouter();
const route = useRoute();
const store = useStore();

const forms = reactive({
  email: "",
  password: "",
});

const rules = computed(() => {
  return {
    email: { required, email },
    password: { required, minLength: minLength(3) },
  };
});
const v$ = useVuelidate(rules, forms);
//проверка валидности формы
const submitHendler = async () => {
  v$.value.$validate();
  if (v$.value.$error) {
    console.log(v$.value.$error);
    return;
  }
  const formData = {
    email: forms.email,
    password: forms.password,
  };
  //отправка данных на сервер фаербэйс и вход в так сказать в аккаунт
  try {
    await store.dispatch("login", formData);
    router.push("/");
  } catch (err) {}
};
// плагин message.plugin для вывода сообщения если пользователь зашел или когда вышел
const messagePlugin = inject("messagePlugin");

onMounted(() => {
  //проверка путей когда пользователь нажал на кнопку выйти из системы соответвенно будет выведенно сообщение о выходе из системы из файла import messages
  if (messages[route.query.message]) {
    messagePlugin.message(messages[route.query.message]);
  }
});
</script>

<style>
</style>
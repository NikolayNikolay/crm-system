<template>
  <form class="card auth-card" @submit.prevent="submitHendler">
    <div class="card-content">
      <span class="card-title">Home accounting</span>
      <div class="input-field">
        <input
          v-model="forms.email"
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
          v-model="forms.password"
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
      <div class="input-field">
        <input
          id="name"
          type="text"
          class="validate"
          v-model="forms.name"
          :class="{ invalid: v$.name.$error }"
        />
        <label for="name">Name</label>
        <small class="helper-text invalid" v-if="v$.name.$error">{{
          v$.name.$errors[0].$message
        }}</small>
      </div>
      <p>
        <label>
          <input type="checkbox" v-model="forms.agree" />
          <span>I agree with the rules</span>
        </label>
      </p>
    </div>
    <div class="card-action">
      <div>
        <button
          class="btn waves-effect waves-light auth-submit indigo lighten-3"
          type="submit"
        >
          Sign up
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Already have an account?
        <router-link to="/login">Enter!</router-link>
      </p>
    </div>
  </form>
</template>

<script setup>
import { reactive } from "@vue/reactivity";
import { computed } from "@vue/runtime-core";
import useVuelidate from "@vuelidate/core";
import { required, email, minLength } from "@vuelidate/validators";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const router = useRouter();

const forms = reactive({
  email: "",
  password: "",
  name: "",
  agree: false,
});

const store = useStore();

const rules = computed(() => {
  return {
    email: { required, email },
    password: { required, minLength: minLength(3) },
    name: { required },
    agree: { checked: (v) => v },
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
    name: forms.name,
  };
  console.log(formData);
  try {
    await store.dispatch("register", formData);
    router.push("/");
  } catch (error) {
    console.log(error);
  }
};
</script>

<style>
</style>
<template>
  <nav class="navbar indigo lighten-3">
    <div class="nav-wrapper">
      <div class="navbar-left">
        <a href="#" @click.prevent="$emit('clickNavbar')">
          <i class="material-icons black-text">dehaze</i>
        </a>
        <span class="black-text">{{ date }}</span>
      </div>

      <ul class="right hide-on-small-and-down">
        <li>
          <a
            class="dropdown-trigger black-text"
            href="#"
            data-target="dropdown"
            ref="dropdown"
          >
            {{ name }}
            <i class="material-icons right">arrow_drop_down</i>
          </a>

          <ul id="dropdown" class="dropdown-content">
            <li class="divider" tabindex="-1"></li>
            <li>
              <a href="#" class="black-text" @click.prevent="logout">
                <i class="material-icons">assignment_return</i>Log out
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
const {
  onMounted,
  ref,
  onBeforeUnmount,
  onDeactivated,
  computed,
} = require("@vue/runtime-core");
const { useRouter } = require("vue-router");
const { useStore } = require("vuex");

const dropdown = ref(null); //управление дроп дауном с помощью материал юаи
const router = useRouter();
const store = useStore();

const interval = ref(null);
const date = ref(
  new Date().toLocaleString("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
);

//выход и редирект на страницу регистрации
const logout = async () => {
  await store.dispatch("logout");
  router.push("/login?message=logout");
  setTimeout(() => {
    router.push("/login");
  }, 0);
};
//имя пользователи берется из стора infoUser
const name = computed(() => store.getters.info.name);

onMounted(() => {
  //кога DOM дерево загрузиться сработает метод и подлючит необходимые стили для анимации
  dropdown.value = M.Dropdown.init(dropdown.value, {
    constrainWidth: false,
  });
});
onBeforeUnmount(() => {
  if (dropdown.value) {
    clearInterval(interval.value);
  }
});
</script>

<style>
</style>
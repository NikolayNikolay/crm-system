import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import Loader from "./components/app/Loader.vue";
import VueAwesomePaginate from "vue-awesome-paginate";
import "vue-awesome-paginate/dist/style.css";

import currencyFilter from "./utils/currency.plugin";
import messagePlug from "./utils/message.plugin.js";
import "materialize-css/dist/js/materialize.min.js";

import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
const firebaseApp = initializeApp({
  apiKey: "AIzaSyDlt-WCAZpT8K9vvAObA7D42cVIGAReKOI",
  authDomain: "crm-project-335a6.firebaseapp.com",
  projectId: "crm-project-335a6",
  storageBucket: "crm-project-335a6.appspot.com",
  messagingSenderId: "1084417000894",
  appId: "1:1084417000894:web:a10bada4e08f56073fa5ef",
});
const auth = getAuth(firebaseApp);
const user = auth.currentUser;
let app;
onAuthStateChanged(auth, () => {
  if (!user) {
    createApp(App)
      .use(store)
      .use(router)
      .use(messagePlug)
      .use(currencyFilter)
      .use(VueAwesomePaginate)
      .component("Loader", Loader)
      .mount("#app");
  } else {
    router.push("/login");
    createApp(App)
      .use(store)
      .use(router)
      .use(messagePlug)
      .use(currencyFilter)
      .use(VueAwesomePaginate)
      .component("Loader", Loader)
      .mount("#app");
  }
});

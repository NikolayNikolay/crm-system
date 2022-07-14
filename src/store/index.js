import { createStore } from "vuex";
import auth from "./auth";
import infoUser from "./infoUser";
import category from "./category";
import record from "./record";

export default createStore({
  state: {
    error: null,
  },
  getters: {
    error: (state) => state.error,
  },
  mutations: {
    setError(state, error) {
      state.error = error;
    },
    clearError(state) {
      state.error = null;
    },
  },
  actions: {
    async fetchCurrency() {
      const key = process.env.VUE_APP_FIXER;
      const myHeaders = new Headers();
      myHeaders.append("apikey", `${key}`);
      const requestOptions = {
        method: "GET",
        redirect: "follow",
        headers: myHeaders,
      };
      const data = await fetch(
        `https://api.apilayer.com/fixer/latest?&base=USD&symbols=UAH,USD,EUR`,
        requestOptions
      );
      return await data.json();
    },
  },
  modules: {
    infoUser,
    auth,
    category,
    record,
  },
});

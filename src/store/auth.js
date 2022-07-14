import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";

export default {
  actions: {
    async login({ dispatch, commit, state }, { email, password }) {
      try {
        const auth = getAuth();
        await signInWithEmailAndPassword(auth, email, password);
      } catch (err) {
        commit("setError", err);
        throw err;
      }
    },
    async register({ dispatch, commit }, { email, password, name }) {
      try {
        const auth = getAuth();
        const database = getDatabase();
        await createUserWithEmailAndPassword(auth, email, password);
        const uid = await dispatch("getUid");
        await set(ref(database, "users/" + uid + "/info"), {
          bill: 10000,
          name,
        });
      } catch (err) {
        commit("setError", err);
        throw err;
      }
    },
    getUid() {
      const user = getAuth().currentUser;
      return user ? user.uid : null;
    },
    async logout({ state, commit }) {
      try {
        const auth = getAuth();
        await signOut(auth);
        commit("clearInfo");
      } catch (err) {}
    },
  },
};

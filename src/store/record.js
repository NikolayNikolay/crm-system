import {
  getDatabase,
  ref,
  set,
  push,
  get,
  child,
  update,
} from "firebase/database";

export default {
  actions: {
    async createRecord({ dispatch, commit }, record) {
      try {
        const uid = await dispatch("getUid");
        const db = getDatabase();
        const postListRef = ref(db, `users/${uid}/record`);
        const newPostRef = push(postListRef);
        return set(newPostRef, record);
      } catch (err) {
        commit("setError", err);
        throw err;
      }
    },
    //получаем из поля records информацию
    async fetchRecords({ dispatch, commit }) {
      try {
        const uid = await dispatch("getUid");
        const dbRef = ref(getDatabase());
        const record = (await get(child(dbRef, `users/${uid}/record`))).val();
        return Object.keys(record).map((key) => {
          return { id: key, ...record[key] };
        });
      } catch (err) {
        commit("setError", err);
        throw err;
      }
    },
    //при нажати на открыть категорию берется фйди из роута и через запрос к серверу забирает нужную информацию
    async fetchRecordsById({ dispatch, commit }, id) {
      try {
        const uid = await dispatch("getUid");
        const dbRef = ref(getDatabase());
        const record = (
          await get(child(dbRef, `users/${uid}/record/${id}`))
        ).val();
        return { ...record, id };
      } catch (err) {
        commit("setError", err);
        throw err;
      }
    },
  },
};

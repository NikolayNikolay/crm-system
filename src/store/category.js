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
    async fetchCategories({ commit, dispatch }) {
      //получение в компонет категориес все обькты с данными созданных категорий юзера
      try {
        const uid = await dispatch("getUid");
        const dbRef = ref(getDatabase());
        const categories = (
          await get(child(dbRef, `users/${uid}/categories`))
        ).val();
        return Object.keys(categories).map((key) => {
          return { id: key, ...categories[key] };
        });
      } catch (err) {
        commit("setError", err);
        throw err;
      }
    },
    async updateCategory({ commit, dispatch }, obj) {
      try {
        const uid = await dispatch("getUid");
        const db = getDatabase();
        const newPostKey = ref(db, `users/${uid}/categories/${obj.id}`);
        await update(newPostKey, { title: obj.title, limit: obj.limit });
      } catch (err) {
        commit("setError", err);
        throw err;
      }
    },
    async createCategory({ commit, dispatch }, obj) {
      try {
        //записываем новое поле с данными которые создал пользователь!
        const uid = await dispatch("getUid");
        const db = getDatabase();
        const postListRef = ref(db, `users/${uid}/categories`);
        const newPostRef = push(postListRef);
        await set(newPostRef, obj);
        obj.key = newPostRef.key;
        //возвращяем обькт
        return obj;
      } catch (err) {
        commit("setError", err);
        throw err;
      }
    },
    async fetchCategoriesById({ commit, dispatch }, id) {
      //получение данных категории пользователи по айди которое передается когда получаем данные из рекордс
      try {
        const uid = await dispatch("getUid");
        const dbRef = ref(getDatabase());
        const categories = (
          await get(child(dbRef, `users/${uid}/categories/${id}`))
        ).val();
        return {
          ...categories,
          id,
        };
      } catch (err) {
        commit("setError", err);
        throw err;
      }
    },
  },
};

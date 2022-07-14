import { getDatabase, onValue, ref, set, update } from "firebase/database";

export default {
  state: {
    info: {},
  },
  getters: {
    info(context) {
      return context.info;
    },
  },
  mutations: {
    //запись информации и передача ее в гетерс а потом в компонент маинЛояут
    setInfo(context, data) {
      context.info = data;
    },
    clearInfo(context) {
      context.info = {};
    },
  },
  actions: {
    //получение данных пользователи который сейчас залогининеный
    async fetchInfo({ commit, dispatch }) {
      try {
        const uid = await dispatch("getUid");
        const db = getDatabase();
        const starCountRef = ref(db, "users/" + uid + "/info");
        onValue(starCountRef, (snapshot) => {
          commit("setInfo", snapshot.val());
        });
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    //обновление данных на основной ветке пользователя 'info'
    async updateInfo({ commit, dispatch, getters }, toUpdate) {
      try {
        const uid = await dispatch("getUid");
        //получаем информацию от сервера с обькта инфо потом канкатенируем их с той информацией которую передал в параметрах для того что бы в дальнейшем добавлять и обновлять то что передаю в параметрах
        const updateData = { ...getters.info, ...toUpdate };
        const db = getDatabase();
        const newPostKey = ref(db, `users/${uid}/info`);
        await update(newPostKey, updateData);
      } catch (err) {
        commit("setError", err);
        throw err;
      }
    },
  },
};

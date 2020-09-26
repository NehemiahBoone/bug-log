import Vue from "vue";
import Vuex from "vuex";
import router from "../router";
import { api } from "./AxiosService"

Vue.use(Vuex);



export default new Vuex.Store({
  state: {
    profile: {},
    bugs: [],
    notes: [],
    bug: {}
  },
  mutations: {
    setProfile(state, profile) {
      state.profile = profile;
    },
    setBugs(state, bugs) {
      state.bugs = bugs
    },
    addBug(state, bug) {
      state.bugs.push(bug)
    }
  },
  actions: {
    setBearer({ }, bearer) {
      api.defaults.headers.authorization = bearer;
    },
    resetBearer() {
      api.defaults.headers.authorization = "";
    },
    async getProfile({ commit }) {
      try {
        let res = await api.get("profile");
        commit("setProfile", res.data);
      } catch (error) {
        console.error(error);
      }
    },
    async getBugs({ commit }) {
      try {
        let res = await api.get("/bugs")
        commit("setBugs", res.data)
      } catch (error) {
        console.error(error);
      }
    },
    async createBug({ commit }, newBug) {
      try {
        let res = await api.post("/bugs", newBug)
        commit("addBug", res.data)
      } catch (error) {
        console.error(error);
      }
    }
  },
});

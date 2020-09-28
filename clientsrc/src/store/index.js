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
    },
    setActiveBug(state, bug) {
      state.bug = bug
    },
    setNotes(state, notes) {
      state.notes = notes
    },
    addNote(state, note) {
      state.notes.push(note)
    },
    deleteNote(state, id) {
      state.notes.filter(n => n.id != id)
    },
    editBug(state, bug) {
      state.bug = bug
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

    //BUGS
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
        commit("setActiveBug", res.data)
        router.push({ name: "Bug", params: { id: res.data.id } })
      } catch (error) {
        console.error(error);
      }
    },
    async getActiveBug({ commit }, id) {
      try {
        let res = await api.get("bugs/" + id)
        commit("setActiveBug", res.data)
      } catch (error) {
        console.error(error);
      }
    },
    sortByStatus({ commit }, bugs) {
      try {
        if (!bugs.status) {
          bugs.sort((a, b) => (a.closed - b.closed))
          bugs.status = true
        } else {
          bugs.sort((a, b) => (b.closed - a.closed))
          bugs.status = false
        }
      } catch (error) {
        console.error(error);
      }
    },
    async closeBug({ commit }, bug) {
      try {
        let res = await api.delete("bugs/" + bug.id, bug)
        commit("setActiveBug", bug)
      } catch (error) {
        console.error(error);
      }
    },
    async editBug({ dispatch }, bug) {
      try {
        let res = await api.put("bugs/" + bug.id, { closed: bug.closed })
        dispatch("getActiveBug", bug.id)
      } catch (error) {
        console.error(error);
      }
    },

    //NOTES
    async getNotes({ commit }, id) {
      try {
        let res = await api.get("bugs/" + id + "/notes")
        commit("setNotes", res.data)
      } catch (error) {
        console.error(error);
      }
    },
    async addNote({ commit }, newNote) {
      try {
        let res = await api.post("notes", newNote)
        commit("addNote", res.data)
      } catch (error) {
        console.error(error);
      }
    },
    async deleteNote({ commit, dispatch }, noteProp) {
      try {
        let res = await api.delete("notes/" + noteProp.id)
        commit("deleteNote", res.data)
        dispatch("getNotes", noteProp.bug)
      } catch (error) {
        console.error(error);
      }
    },
  },
});

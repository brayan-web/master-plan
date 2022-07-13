import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import createPersistedStaste from 'vuex-persistedstate'
const apiUrl = "https://gn3bbxdche.execute-api.us-west-2.amazonaws.com/Production/api";
const apiDev = "https://gn3bbxdche.execute-api.us-west-2.amazonaws.com/sandbox/api"

import developmentModule from "./development";
import financialModule from "./financial";
import functionsModule from "./functions";
import infoMessageModule from "./info_message"

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedStaste()],
  state: {
  },
  getters: {
    api(){
      return Axios.create({
            baseURL: apiUrl
      })
    },
    apiDev(){
      return Axios.create({
          baseURL: apiDev
      })
    }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    development: developmentModule,
    financial: financialModule,
    functions: functionsModule,
    info_message: infoMessageModule
  }
})

import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import createPersistedStaste from 'vuex-persistedstate'
const apiUrl = "https://gn3bbxdche.execute-api.us-west-2.amazonaws.com/Production/api";
const apiDev = "https://gn3bbxdche.execute-api.us-west-2.amazonaws.com/sandbox/api"

import developmentModule from "./development";
import financialModuel from "./financial"
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
    financial: financialModuel
  }
})

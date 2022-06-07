import Axios from "axios";

export default {
    state: {
        financialData: {},
        loadingFinancial: true
    },
    mutations: {
        _getFinancial(state, financialData) {
            state.financialData = financialData
        },
        _setLoadingFinancial(state, loader){
            state.loadingFinancial = loader
        }
    },
    getters: {
        getSelectedStatusFinancial: (state) => {
            return state.financialData
        },
        getStatusLoadingFinancial: (state) => {
            return state.loadingFinancial
        }
    },
    actions: {
        async getFinancial(context, financialData) {
            context.dispatch("getLoadingFinancial", true)
            try {
              let response = await Axios.post("https://gn3bbxdche.execute-api.us-west-2.amazonaws.com/Production/api/locations/pre-financial-run", financialData);
                    context.commit("_getFinancial", response.data)

            } catch (e) {
                console.log(e);
            }finally {
                context.dispatch("getLoadingFinancial", false)
            }
        },
        async sendFinancial(context, body) {
            return await Axios.post('https://gn3bbxdche.execute-api.us-west-2.amazonaws.com/Production/api/locations/financial-run', body);
        },
        async getLoadingFinancial(context, loader){
            context.commit("_setLoadingFinancial", loader)
        },
    }
}
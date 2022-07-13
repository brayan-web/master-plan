


export default{
    state: {
        filterModelos: [],
        imgMapData: [],
        openMapaDetalle: false,
        modal: false,
        urlVideo: ""

    },
    mutations: {
        _setFilterModelos(state, arrFilterModelos){
            state.filterModelos = arrFilterModelos
        },
        RESET_STATE(state) {
            state.filterModelos = '';
        },
        _setDataImageMap(state, arrDataImageMap){
            state.imgMapData = arrDataImageMap
        },
        _setMapDetail(state){
            state.openMapaDetalle = !state.openMapaDetalle
        },
        _setToggleModal(state){
            state.modal = !state.modal
        },
        _setUrlVideo(state, urlVideo){
            state.urlVideo = urlVideo
        },

    },
    getters: {
        getStatusFilterModelos:(status) => {
            return status.filterModelos
        },
        getStatusDataImageMap: (state) => {
            return state.imgMapData
        },
        getStatusMapDetail: (state) => {
            return state.openMapaDetalle
        },
        getStatusToggleModal: (state) => {
            return state.modal
        },
        getStatusUrlVide: (state) => {
            return state.urlVideo
        }

    },
    actions: {
        resetState({commit}) {
            commit('RESET_STATE');
        },
        getFilterModelos(context, arrFilterModelos){
            context.commit("_setFilterModelos", arrFilterModelos)
        },
        getDataImageMap(context, arrDataImageMap){
            context.commit("_setDataImageMap", arrDataImageMap)
        },
        getMapDetail(context){
            context.commit("_setMapDetail")
        },
        getToggleModal(context){
            context.commit("_setToggleModal")
        },
        getUrlVide(context, urlVideo){
            context.commit("_setUrlVideo", urlVideo)
        }

    }
}


const LOCATIONS_URL = "/locations";
const TOWER_STAGE_LEVELS_URL = "/towerStageLevels"

export default {
  state: {
    locations: [],
    selectedLocation: {},
    urlImageLocation: "",
    loading: true
  },
  mutations: {
    _setLocations(state, data) {
      state.locations = data;
    },
    _clearCoords(state) {
      state.locations = [];
    },
    _selectedLocation(state, location){
      state.selectedLocation = location
    },
    _setAvailableImageLocation(state, urlImageLocation){
      state.urlImageLocation = urlImageLocation;

    },
    _setLoading(state, stateLoading){
        state.loading = stateLoading
    }

  },
  getters: {
    getLocations: (state) => {
      return state.locations;
    },
    getSelectedLocation: (state) => {
      return state.selectedLocation;
    },
    getUrlImageLocation: (state) => {
      return state.urlImageLocation
    },
    getStatusLoading: (state) => {
      return state.loading
    }
  },
  actions: {
    async getAvailableLocations(context, development) {
      try {
        let AVAILABLE_LOCATIONS_URL = `${LOCATIONS_URL}/availability/${development.id}`;
        let response = await context.rootGetters.api.get(
          `${AVAILABLE_LOCATIONS_URL}`
        );
        let arr = [];
        for (let i = 0; i < response.data.length; i++) {
          let obj = {};
          let response_obj = response.data[i];
          obj.id = response_obj.locationId;
          obj.name = response_obj.locationName;
          obj.type = response_obj.prototypeName;
          obj.status = response_obj.statusLocationID;
          obj.m2c = response_obj.m2c;
          obj.coords = response_obj.coordinates;
          obj.shape = response_obj.shape;
          obj.m2t = response_obj.m2t;
          obj.value = response_obj.value;
          obj.totalMeters2 = response_obj.totalMeters2;
          obj.available = response_obj.available;
          obj.reserved = response_obj.reserved;
          obj.unavailable = response_obj.unavailable;
          if (response_obj.statusLocationID == 2) {
            obj.color = "31af67";
            obj.statusText = "Disponible";
          } else if (response_obj.statusLocationID == 3) {
            obj.color = "FAF142";
            obj.statusText = "Reservado";
          } else if (response_obj.statusLocationID == 4) {
            obj.color = "B00000";
            obj.status = 0;
            obj.statusText = "Vendido";
          } else {
            obj.status = 4;
            obj.color = "5C5656";
            obj.statusText = "Bloqueado";
          }
          obj.m2t = response_obj.m2t;
          arr.push(obj);
        }
        context.commit("_setLocations", arr);
      } catch (e) {
        console.log(e);
      }
    },
    async getTowerStageLevels(context, development){
      let AVAILABLE_TOWERS_URL = `${TOWER_STAGE_LEVELS_URL}/${development.id}`;
      if(development.level > 0){
        AVAILABLE_TOWERS_URL += `?towerStageLevelId=${development.level}`
      }
      let response = await context.rootGetters.api.get(`${AVAILABLE_TOWERS_URL}`);
      let arr = [];
      for (let i = 0; i < response.data.length; i++) {
        let obj = {};
        let response_obj = response.data[i];
        obj.id = response_obj.id;
        obj.type = response_obj.prototypeName;
        obj.name = response_obj.description;
        obj.coords = response_obj.coordinates;
        obj.reserved = response_obj.reserved;
        obj.type = response_obj.prototypeName;
        obj.unavailable = response_obj.unavailable;
        obj.shape = 'poly';
        obj.m2t = response_obj.m2t;
        obj.available = response_obj.available;
        if (response_obj.available == 0) {
          if (response_obj.reserved == 0) {
            obj.color = 'B00000';
            obj.status = 0;
          } else {
            obj.color = 'FAF142';
          }
          obj.color = 'CB3234';
        } else {
          obj.color = '31af67';

        }
        arr.push(obj);
      }
      context.commit("_setLocations",arr);
    },

   async getAvailableImageLocation(context, development){
     context.dispatch("getLoading", true)
     try{
          let AVAILABLE_IMAGE_LOCATION = `${LOCATIONS_URL}/image/${development.id}`;
          let response = await context.rootGetters.api.get(`${AVAILABLE_IMAGE_LOCATION}`);
          context.commit("_setAvailableImageLocation", response.data, )
        }catch(e){
        console.log(e)
     }finally {
          context.dispatch("getLoading", false)
        }
    },

   async getLoading(context, stateLoading){
        context.commit("_setLoading", stateLoading)
    },
    selectedLocation(context, location){
      context.commit("_selectedLocation", location);
    },
    async clearCoords(context) {
      await context.commit("_clearCoords");
    },
  },
};

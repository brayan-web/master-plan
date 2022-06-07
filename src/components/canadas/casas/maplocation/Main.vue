<template>
  <div>
    <sub-header :micrositeUrl="micrositeUrl" />
    <div v-if="locations.length > 0" class="map_filter">
      <div class="maphighlight__box">
        <map-highlight v-for="(img, index) in imgSet" :key="img.width" :index="index" :img="img"  :existFilter="existFilter" :desarrollo="desarrollo" :url="url" :nivel="nivel" :indicators="indicators"/>
        <Button v-for="(img, index) in imgSet" :key="img.url" :index="index" :img="img" :id="id" :desarrollo="desarrollo"/>
        <div class="line_horizontal"></div>
        <Availables
            class="availables-mobile"
            :type="type"
            :amountAvailables="amountAvailables"
        />
      </div>
      <div class="select__box" :class="selectHide">
        <Select
            v-if="locations.length > 0 && rangeFilter.length > 0"
            :locations="locations"
            @change="changeRange"
            :rangeFilter="rangeFilter"
        />
        <Availables
            class="availables-desk"
            :amountAvailables="amountAvailables"
            :type="type"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import SubHeader from "../../../core/SubHeader.vue";
import MapHighlight from "../../../core/MapHighlight";
import Select from "../../../core/Select.vue";
import Availables from "../../../core/Availables.vue";
import Button from "../../../core/Button.vue";
export default {
  name: "Main",
  components: {
    SubHeader,
    MapHighlight,
    Select,
    Availables,
    Button,
  },
  data() {
    return {
      id: 51,
      type: "casas",
      nivel: "towerStage",
      desarrollo: "canadas_casas",
      arrFilteredLocations: [],
      url: "canadas_casas/",
      micrositeUrl: "https://www.tresmarias.com.mx/lindavista/terrenos",
      imgSet: [
        {
          name: 'canadas_casas',
          url: '/imgs/canadas/casas/MainCasasCanadas.png',
          width: '1200',
          height: '1959',
          transform: true
        }
      ],
      indicators: [
        {id: 233, text: 'PRIVADA 16', transform: 'matrix(1 0 0 1 426.1255 1319.479)',cxB: 656, cyB: 1304, rB: 20, cxW: 656.5, cyW: 1304.5, rW: 9.5, x1: 673, y1: 1305, x2: 828, y2: 1307,  status: true },
        {id: 178, text: 'PRIVADA 20', transform: 'matrix(1 0 0 1 79.1255 882.479)', cxB: 302, cyB: 871, rB: 20, cxW: 302.5, cyW: 871.5, rW: 9.5, x1: 319, y1: 871, x2: 457, y2: 873, status: true },
        {id: 233, text: 'PRIVADA 17', transform: 'matrix(1 0 0 1 368.1255 1470.479)',cxB: 593, cyB: 1460, rB: 20, cxW: 592.5, cyW: 1460.5, rW: 9.5, x1: 610, y1: 1460, x2: 765, y2: 1462, status: true },
        {id: 233, text: 'PRIVADA 21', transform: 'matrix(1 0 0 1 40.1255 1025.479)', cxB: 265, cyB: 1013, rB: 20, cxW: 265.5, cyW: 1013.5, rW: 9.5, x1: 280, y1: 1012, x2: 418, y2: 1014, status: true },
      ],
      // si no hay filtro volver rangeFilter a false
      rangeFilter: false
    };
  },

  computed: {
    ...mapGetters({
      locations: "getLocations",
    }),
    development() {
      return { id: this.id, level: 0 };
    },
    amountAvailablesUnique() {
      const filteredAvailables = this.existFilter;
      const newArrfiltered = filteredAvailables.filter(
          (item) => item.status == 2
      );
      return newArrfiltered;
    },
    existFilter() {
      let arrExistFilter;
      if (this.rangeFilter) {
        arrExistFilter = this.arrFilteredLocations;
      } else if (this.rangeFilter === false) {
        arrExistFilter = this.locations;
      }
      return arrExistFilter;
    },
    amountAvailablesPrivates(){
      const filteredAvailables = this.existFilter;
      const newArrfiltered = filteredAvailables.filter(
          (item) => item.available > 0
      );
      return newArrfiltered;
    },
    amountAvailables(){
      let amount_uniques = this.amountAvailablesUnique;
      let amount_privates = this.amountAvailablesPrivates;
      if(this.type === "casas"){
        return amount_privates
      }else{
        return  amount_uniques
      }
    },
    selectHide(){
      if(this.rangeFilter == false){
        return 'u__dipslay--none'
      }else{
        return ''
      }
    }
  },
  methods: {
    ...mapActions(["getTowerStageLevels", "clearCoords"]),
    changeRange(arrFilter) {
      this.arrFilteredLocations = arrFilter;
    },
  },
  async created() {
    await this.getTowerStageLevels(this.development);
  },
  async beforeDestroy(){
    await this.clearCoords()
  }
};
</script>

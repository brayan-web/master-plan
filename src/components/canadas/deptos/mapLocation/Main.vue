<template>
  <div>
    <div class="line__vertical-mains"></div>

    <sub-header :micrositeUrl="micrositeUrl" />
    <div v-if="locations.length > 0" class="map_filter">
      <div class="maphighlight__box">
          <h1 class="caption__select">
                  <span>Seleccione una torre, clic para ver detalles</span>
                </h1>
        <map-highlight v-for="(img, index) in imgSet" :key="img.width" :index="index" :img="img"  :existFilter="existFilter" :desarrollo="desarrollo" :url="url" :nivel="nivel" :indicators="indicators"/>
        <Button v-for="(img, index) in imgSet" :key="img.url" :index="index" :img="img" :id="id" :nivel="nivel"  :desarrollo="desarrollo" :levelId="levelId" :url="url"/>
        <div class="line_horizontal"></div>
        <Availables
            class="availables-mobile"
            :amountAvailables="amountAvailables"
            :nivel="nivel"

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
            :nivel="nivel"
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
      id: 35,
      nivel: "towerStage",
      levelId: 0,
      desarrollo: "canadas_deptos",
      arrFilteredLocations: [],
      url: "canadas_deptos",
      micrositeUrl: "https://www.tresmarias.com.mx/canadas/departamentos",
      imgSet: [
        {
          name: 'canadas_casas',
          url: 'https://kiritek-web-documents.s3.us-west-2.amazonaws.com/masterplan-dashboard/imgs/ca%C3%B1adas/deptos/MainDeptosCanadas.png',
          width: '1218',
          height: '1706',
          id: 35,
          levelId: 0,
          route: 'canadas_deptos',
          nivel: 'towerStage',
          transform: 'matrix(1 0 0 1 123.16 -0.28)',
          viewBox: '0 0 1432 1706'
        }
      ],
      indicators: [
        {id: 83, text: 'TORRE Y', transform: 'matrix(1 0 0 1 870.7441 177.9448)',cxB: 988, cyB: 171, rB: 20, cxW: 988.5, cyW: 170.5, rW: 9.5, x1: 1056, y1: 219, x2: 998.5, y2: 181.9,  status: true },
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
    existFilter() {
      let arrExistFilter;
      if (this.rangeFilter) {
        arrExistFilter = this.arrFilteredLocations;
      } else if (this.rangeFilter === false) {
        arrExistFilter = this.locations;
      }
      return arrExistFilter;
    },
    amountAvailables(){
      const filteredAvailables = this.existFilter;
      const newArrfiltered = filteredAvailables.filter(
          (item) => item.available > 0
      );
      return newArrfiltered;
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
    ...mapActions(["getTowerStage", "clearCoords"]),
    changeRange(arrFilter) {
      this.arrFilteredLocations = arrFilter;
    },
  },
  async created() {
    await this.getTowerStage(this.development);
  },
  async beforeDestroy(){
    await this.clearCoords()
  }
};
</script>

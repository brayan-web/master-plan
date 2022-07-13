<template>
  <div>
    <div class="line__vertical-mains"></div>

    <sub-header :micrositeUrl="micrositeUrl" />
    <div v-if="locations.length > 0" class="map_filter">
      <div class="maphighlight__box">
          <h1 class="caption__select">
                  <span>Seleccione una etapa, clic para ver detalles</span>
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
import SubHeader from "../../core/SubHeader.vue";
import MapHighlight from "../../core/MapHighlight";
import Select from "../../core/Select.vue";
import Availables from "../../core/Availables.vue";
import Button from "../../core/Button.vue";
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
      id: 33,
      nivel: "towerStage",
      levelId: 0,
      desarrollo: "paseodelparque",
      arrFilteredLocations: [],
      url: "paseodelparque",
      micrositeUrl: "https://tresmarias.com.mx/paseodelparque/terrenos",
      imgSet: [
        {
          name: 'paseodelparque',
          url: 'https://kiritek-web-documents.s3.us-west-2.amazonaws.com/masterplan-dashboard/imgs/paseodelparque/pdp-main.png',
          width: '1420',
          height: '713',
          id: 33,
          levelId: 0,
          route: 'paseodelparque',
          nivel: 'towerStage',
          transform: '',
          viewBox: '0 0 1420 713'
        }
      ],
      indicators: [
        {id: 14, text: 'ETAPA 5', transform: 'matrix(1.0714 0 0 1 750.6547 123.6883)',cxB: 920.6, cyB: 116.5, rB: 8.5, cxW: 920.8, cyW: 116.7, rW: 4.1, x1: 929.1, y1: 116.1, x2: 1164.2, y2: 117.4,  status: true },
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

<template>
  <div>
    <div class="line__vertical-mains"></div>

    <sub-header :micrositeUrl="micrositeUrl" />
    <div v-if="locations.length > 0" class="map_filter">
      <div class="maphighlight__box">
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
      id: 49,
      nivel: "towerStage",
      levelId: 0,
      desarrollo: "torrespaseodelparque",
      arrFilteredLocations: [],
      url: "torrespaseodelparque",
      micrositeUrl: "https://tresmarias.com.mx/torrespaseodelparque/departamentos",
      imgSet: [
        {
          name: 'torrespaseodelparque',
          url: 'https://kiritek-web-documents.s3.us-west-2.amazonaws.com/masterplan-dashboard/imgs/torrespasodelparque/MainTorresPaseoParque.png',
          width: '1041',
          height: '663',
          id: 35,
          levelId: 0,
          route: 'torrespaseodelparque',
          nivel: 'towerStage',
          transform: '',
          viewBox: '0 0 1041 663'
        }
      ],
      indicators: [
        {id: 83, text: 'TORRE B', transform: 'matrix(1 0 0 1 860 445)',cxB: 845.71, cyB: 438.62, rB: 10.29, cxW: 845.71, cyW: 438.62, rW: 5.29, x1: 738, y1: 438.62, x2: 838, y2: 438.62,  status: true },
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

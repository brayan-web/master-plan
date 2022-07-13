<template>
  <div>
    <div class="line__vertical-mains"></div>
    <button-back/>

    <div v-if="locations.length > 0" class="map_filter">
      <div class="maphighlight__box">
          <h1 class="caption__select">
                  <span>Seleccione una etapa, clic para ver detalles</span>
                </h1>
        <map-highlight v-for="(img, index) in imgSet" :key="img.width" :index="index" :img="img"  :existFilter="existFilter" :desarrollo="desarrollo" :url="url" :nivel="nivel" :indicators="indicators"/>
        <Button v-for="(img, index) in imgSet" :key="img.url" :index="index" :img="img"/>
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
import MapHighlight from "../../core/MapHighlight";
import Select from "../../core/Select.vue";
import Availables from "../../core/Availables.vue";
import Button from "../../core/Button.vue";
import ButtonBack from "../../core/ButtonBack";

export default {
  name: "SubMain",
  components: {
    MapHighlight,
    Select,
    Availables,
    Button,
    ButtonBack
  },
  data() {
    return {
      id: this.$route.params.id,
      nivel: "towerStageLevel",
      levelId: 0,
      type: "terreno",
      desarrollo: "paseodelparqueSubMenu",
      arrFilteredLocations: [],
      url: `cve_torre_etapa=${this.$route.params.id}`,
      imgSet: [
        {
          name: 'paseodelparque',
          url: 'https://kiritek-web-documents.s3.us-west-2.amazonaws.com/masterplan-dashboard/imgs/paseodelparque/etapas/pdp-etapa5.png',
          width: '720',
          height: '815',
          id: this.$route.params.id,
          levelId: 0,
          route: `cve_torre_etapa=${this.$route.params.id}`,
          nivel: 'towerStageLevel',
          transform: '',
          viewBox: '0 0 720 815'
        }
      ],
      indicators: [

        {id: 196, text: 'BIS', transform: 'matrix(1 0 0 1 140.4176 155.0908)',cxB: 220.3, cyB: 144.5, rB: 13.1, cxW: 220.3, cyW: 144.5, rW: 6.2, x1: 227.5, y1: 144.5, x2: 574.3, y2: 144.5,  status: true },
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

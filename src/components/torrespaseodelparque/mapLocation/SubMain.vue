<template>
  <div>
    <div class="line__vertical-mains"></div>
    <button-back/>
    <div v-if="locations.length > 0" class="map_filter">
      <div class="maphighlight__box">
        <map-highlight-deptos :img="img"
                              :existFilter="existFilter" :desarrollo="desarrollo" :url="url" :type="type"
                              :nivel="nivel"/>
        <!-- <Button :img="img" :id="id" :desarrollo="desarrollo" :nivel="nivel"  :levelId="levelId" :url="url"/>-->
        <div class="line_horizontal"></div>
        <Availables
            class="availables-mobile"
            :type="type"
            :existFilter="existFilter"
            @onUpdateModel="updateActiveModel"

        />
      </div>
      <div class="select__box">
        <Availables
            class="availables-desk"
            :type="type"
            :existFilter="existFilter"
            @onUpdateModel="updateActiveModel"
        />
      </div>
    </div>
  </div>
</template>
<script>
import {mapActions, mapGetters} from "vuex";
import MapHighlightDeptos from "../../core/MapHighlightDeptos";
import ButtonBack from "../../core/ButtonBack";
//import Button from "../../../core/Button.vue";
import Availables from "../../core/Availables.vue";

export default {
  name: "Main",
  components: {
    MapHighlightDeptos,
    //Button,
    ButtonBack,
    Availables
  },
  data() {
    return {
      id: this.$route.params.id,
      levelId: 0,
      type: "departamentos",
      desarrollo: "torrespaseodelparque",
      arrFilteredLocations: [],
      nivel: "towerStageLevel",
      url: `cve_torre_etapa=${this.$route.params.id}`,
      micrositeUrl: "https://www.tresmarias.com.mx/senderos/terrenos",
      torres: {
        TORREB: {
          name: 'torrespaseodelparque',
          url: 'https://kiritek-web-documents.s3.us-west-2.amazonaws.com/masterplan-dashboard/imgs/torrespasodelparque/FachadaPrincipal.png',
          width: '1000',
          id: this.$route.params.id,
          levelId: 0,
          nivel: 'towerStageLevel',
          route: `cve_torre_etapa=${this.$route.params.id}`,
          height: '563',
          transform: '',
          viewBox: '0 0 1000 563'
        },
      },
      // si no hay filtro volver rangeFilter a false
      rangeFilter: false,
      activeModel: "",
    };
  },
  computed: {
    ...mapGetters({
      locations: "getLocations",
      filterModelos: "getStatusFilterModelos"
    }),
    development() {
      return {id: this.id, level: this.levelId};
    },
    img() {
      const torre = this.$route.params.torre;
      const torreSeleccionada = this.torres[torre];
      return torreSeleccionada;
    },
    amountAvailables() {
      const filteredAvailables = this.existFilter;
      const newArrfiltered = filteredAvailables.filter(
          (item) => item.status == 2
      );
      return newArrfiltered;
    },
    existFilter() {
      return this.locations
    },
  },
  methods: {
    ...mapActions(["getTowerStageLevels", "clearCoords", "getFilterModelos"]),
    changeRange(arrFilter) {
      this.arrFilteredLocations = arrFilter;
    },
    updateActiveModel(model) {
      this.getFilterModelos(model);
    }
  },
  async created() {
    await this.getTowerStageLevels(this.development);
    this.getFilterModelos(this.existFilter)
  },
  async beforeDestroy() {
    await this.clearCoords();
  },
  mounted() {
  }
};
</script>

<template>
  <div>
    <div class="line__vertical-mains"></div>
    <button-back/>
    <div v-if="locations.length > 0" class="map_filter">
      <div class="maphighlight__box">
          <h1 class="caption__select">
                  <span>Seleccione una casa, clic para ver detalles</span>
                </h1>
        <map-highlight :img="img"
                       :existFilter="existFilter" :desarrollo="desarrollo" :url="url" :type="type"
                       :nivel="nivel"/>
        <Button :img="img" :id="id"
                :desarrollo="desarrollo" :nivel="nivel"  :levelId="levelId" :url="url"/>
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
import MapHighlight from "../../../core/MapHighlight";
import ButtonBack from "../../../core/ButtonBack";
import Button from "../../../core/Button.vue";
import Availables from "../../../core/Availables.vue";

export default {
  name: "SubMain",
  components: {
    MapHighlight,
    Button,
    ButtonBack,
    Availables
  },
  data() {
    return {
      id: 34,
      levelId: this.$route.params.id,
      type: "casas",
      desarrollo: "canadas_casas-priv",
      arrFilteredLocations: [],
      nivel: "availability",
      url: `nombre_nivel_te=${this.$route.params.privada}/detalles`,
      privadas: {
        PRIVADA16: {
          name: 'privada16',
          url: 'https://kiritek-web-documents.s3.us-west-2.amazonaws.com/masterplan-dashboard/imgs/ca%C3%B1adas/casas/privadas/privada16.png',
          width: '1199',
          id: 34,
          levelId: this.$route.params.id,
          nivel: 'availability',
          route: `nombre_nivel_te=${this.$route.params.privada}/detalles`,
          height: '542',
          transform: '',
          viewBox: '0 0 1199 542'
        },
        PRIVADA17: {
          name: 'privada17',
          url: '/https://kiritek-web-documents.s3.us-west-2.amazonaws.com/masterplan-dashboard/imgs/ca%C3%B1adas/casas/privadas/privada17.png',
          width: '2635',
          id: 34,
          levelId: this.$route.params.id,
          nivel: 'availability',
          route: `nombre_nivel_te=${this.$route.params.privada}/detalles`,
          height: '1358',
          transform: '',
          viewBox: '0 0 2635 1358'
        },
        PRIVADA20: {
          name: 'privada20',
          url: 'https://kiritek-web-documents.s3.us-west-2.amazonaws.com/masterplan-dashboard/imgs/ca%C3%B1adas/casas/privadas/privada20.png',
          width: '754',
          height: '600',
          id: 34,
          levelId: this.$route.params.id,
          nivel: 'availability',
          route: `nombre_nivel_te=${this.$route.params.privada}/detalles`,
          transform: '',
          viewBox: '0 0 754 600'
        },
        PRIVADA21: {
          name: 'privada21',
          url: 'https://kiritek-web-documents.s3.us-west-2.amazonaws.com/masterplan-dashboard/imgs/ca%C3%B1adas/casas/privadas/privada21.png',
          width: '2233',
          height: '1383',
          id: 34,
          levelId: this.$route.params.id,
          nivel: 'availability',
          route: `nombre_nivel_te=${this.$route.params.privada}/detalles`,
          transform: '',
          viewBox: '0 0 2233 1383'
        }
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
      const privada = this.$route.params.privada;
      const privadaSeleccionada = this.privadas[privada];
      return privadaSeleccionada;
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
    ...mapActions(["getAvailableLocations", "clearCoords", "getFilterModelos"]),
    changeRange(arrFilter) {
      this.arrFilteredLocations = arrFilter;
    },
    updateActiveModel(model) {
      this.getFilterModelos(model);
    }
  },
  async created() {
    await this.getAvailableLocations(this.development);
    this.getFilterModelos(this.existFilter)
  },
  async beforeDestroy() {
    await this.clearCoords();
  },
  mounted() {
  }
};
</script>

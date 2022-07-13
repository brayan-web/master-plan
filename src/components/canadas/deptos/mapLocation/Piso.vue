<template>
  <div>
    <button-back/>
    <div v-if="locations.length > 0" class="map_filter">
      <div class="maphighlight__box">
          <h1 class="caption__select">
          <span>{{img.name}}</span>
                  <span>Seleccione un departamento, clic para ver detalles</span>
                </h1>
        <map-highlight :img="img"
                       :existFilter="existFilter" :desarrollo="desarrollo" :url="url" :type="type"
                       :nivel="nivel"/>
        <Button :img="img" :id="id"
                :desarrollo="desarrollo" :nivel="nivel"  :levelId="levelId" :url="url"/>
        <div class="line_horizontal"></div>
      </div>
    </div>
  </div>
</template>
<script>
import {mapActions, mapGetters} from "vuex";
import MapHighlight from "../../../core/MapHighlight";
import ButtonBack from "../../../core/ButtonBack";
import Button from "../../../core/Button.vue";

export default {
  name: "Piso",
  components: {
    MapHighlight,
    Button,
    ButtonBack,
  },
  data() {
    return {
      id: 35,
      levelId: this.$route.params.idPiso,
      type: "departamentos",
      desarrollo: "canadas_deptos-piso",
      arrFilteredLocations: [],
      nivel: "availability",
      url: `nombre_nivel_te=${this.$route.params.piso}/detalles`,
      micrositeUrl: "https://www.tresmarias.com.mx/senderos/terrenos",
      privadas: {
        NIVEL1: {
          name: 'NIVEL 1',
          url: 'https://kiritek-web-documents.s3.us-west-2.amazonaws.com/masterplan-dashboard/imgs/ca%C3%B1adas/deptos/Depa.png',
          width: '1058',
          id: 35,
          levelId: this.$route.params.idPiso,
          nivel: 'availability',
          route: `nombre_nivel_te=${this.$route.params.piso}/detalles`,
          height: '1275',
          transform: '',
          viewBox: '0 0 1058 1275'
        },
        NIVEL2: {
          name: 'NIVEL 2',
          url: 'https://kiritek-web-documents.s3.us-west-2.amazonaws.com/masterplan-dashboard/imgs/ca%C3%B1adas/deptos/Depa.png',
          width: '1058',
          id: 35,
          levelId: this.$route.params.idPiso,
          nivel: 'availability',
          route: `nombre_nivel_te=${this.$route.params.piso}/detalles`,
          height: '1275',
          transform: '',
          viewBox: '0 0 1058 1275'
        },
        NIVEL3: {
          name: 'NIVEL 3',
          url: 'https://kiritek-web-documents.s3.us-west-2.amazonaws.com/masterplan-dashboard/imgs/ca%C3%B1adas/deptos/Depa.png',
          width: '1058',
          id: 35,
          levelId: this.$route.params.idPiso,
          nivel: 'availability',
          route: `nombre_nivel_te=${this.$route.params.piso}/detalles/`,
          height: '1275',
          transform: '',
          viewBox: '0 0 1058 1275'
        },
        NIVEL4: {
          name: 'NIVEL 4',
          url: 'https://kiritek-web-documents.s3.us-west-2.amazonaws.com/masterplan-dashboard/imgs/ca%C3%B1adas/deptos/Depa.png',
          width: '1058',
          id: 35,
          levelId: this.$route.params.idPiso,
          nivel: 'availability',
          route: `nombre_nivel_te=${this.$route.params.piso}/detalles`,
          height: '1275',
          transform: '',
          viewBox: '0 0 1058 1275'
        },
        NIVEL5: {
          name: 'NIVEL 5',
          url: 'https://kiritek-web-documents.s3.us-west-2.amazonaws.com/masterplan-dashboard/imgs/ca%C3%B1adas/deptos/Depa.png',
          width: '1058',
          id: 35,
          levelId: this.$route.params.idPiso,
          nivel: 'availability',
          route: `nombre_nivel_te=${this.$route.params.piso}/detalles`,
          height: '1275',
          transform: '',
          viewBox: '0 0 1058 1275'
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
      const privada = this.$route.params.piso;
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

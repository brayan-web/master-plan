<template>
  <div>
    <button-back/>
    <div v-if="locations.length > 0" class="map_filter">
      <div class="maphighlight__box">
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
import MapHighlight from "../../core/MapHighlight";
import ButtonBack from "../../core/ButtonBack";
import Button from "../../core/Button.vue";

export default {
  name: "Piso",
  components: {
    MapHighlight,
    Button,
    ButtonBack,
  },
  data() {
    return {
      id: 49,
      levelId: this.$route.params.idPiso,
      type: "departamentos",
      desarrollo: "torrespaseodelparquepiso",
      arrFilteredLocations: [],
      nivel: "availability",
      url: `nombre_nivel_te=${this.$route.params.piso}/detalles`,
      pisos: {
        PLANTABAJA: {
          name: 'PLANTA BAJA',
          url: 'https://kiritek-web-documents.s3.us-west-2.amazonaws.com/masterplan-dashboard/imgs/torrespasodelparque/pisos/PLANTABAJA.png',
          width: '938',
          id: 49,
          levelId: this.$route.params.idPiso,
          nivel: 'availability',
          route: `nombre_nivel_te=${this.$route.params.piso}/detalles`,
          height: '964',
          transform: '',
          viewBox: '0 0 938 964'
        },
        PISO1: {
          name: 'PISO 1',
          url: 'https://kiritek-web-documents.s3.us-west-2.amazonaws.com/masterplan-dashboard/imgs/torrespasodelparque/pisos/PISO1.png',
          width: '938',
          id: 49,
          levelId: this.$route.params.idPiso,
          nivel: 'availability',
          route: `nombre_nivel_te=${this.$route.params.piso}/detalles`,
          height: '964',
          transform: '',
          viewBox: '0 0 938 964'
        },
        PISO2: {
          name: 'PISO 2',
          url: 'https://kiritek-web-documents.s3.us-west-2.amazonaws.com/masterplan-dashboard/imgs/torrespasodelparque/pisos/RESTO.png',
          width: '938',
          id: 49,
          levelId: this.$route.params.idPiso,
          nivel: 'availability',
          route: `nombre_nivel_te=${this.$route.params.piso}/detalles`,
          height: '895',
          transform: '',
          viewBox: '0 0 938 895'
        },
        PISO3: {
          name: 'PISO 3',
          url: 'https://kiritek-web-documents.s3.us-west-2.amazonaws.com/masterplan-dashboard/imgs/torrespasodelparque/pisos/RESTO.png',
          width: '938',
          id: 49,
          levelId: this.$route.params.idPiso,
          nivel: 'availability',
          route: `nombre_nivel_te=${this.$route.params.piso}/detalles`,
          height: '895',
          transform: '',
          viewBox: '0 0 938 895'
        },
        PISO4: {
          name: 'PISO 4',
          url: 'https://kiritek-web-documents.s3.us-west-2.amazonaws.com/masterplan-dashboard/imgs/torrespasodelparque/pisos/RESTO.png',
          width: '938',
          id: 49,
          levelId: this.$route.params.idPiso,
          nivel: 'availability',
          route: `nombre_nivel_te=${this.$route.params.piso}/detalles`,
          height: '895',
          transform: '',
          viewBox: '0 0 938 895'
        },
        PISO5: {
          name: 'PISO 5',
          url: 'https://kiritek-web-documents.s3.us-west-2.amazonaws.com/masterplan-dashboard/imgs/torrespasodelparque/pisos/RESTO.png',
          width: '938',
          id: 49,
          levelId: this.$route.params.idPiso,
          nivel: 'availability',
          route: `nombre_nivel_te=${this.$route.params.piso}/detalles`,
          height: '895',
          transform: '',
          viewBox: '0 0 938 895'
        },
        PISO6: {
          name: 'PISO 6',
          url: 'https://kiritek-web-documents.s3.us-west-2.amazonaws.com/masterplan-dashboard/imgs/torrespasodelparque/pisos/RESTO.png',
          width: '938',
          id: 49,
          levelId: this.$route.params.idPiso,
          nivel: 'availability',
          route: `nombre_nivel_te=${this.$route.params.piso}/detalles`,
          height: '895',
          transform: '',
          viewBox: '0 0 938 895'
        },
        PISO7: {
          name: 'PISO 7',
          url: 'https://kiritek-web-documents.s3.us-west-2.amazonaws.com/masterplan-dashboard/imgs/torrespasodelparque/pisos/RESTO.png',
          width: '938',
          id: 49,
          levelId: this.$route.params.idPiso,
          nivel: 'availability',
          route: `nombre_nivel_te=${this.$route.params.piso}/detalles`,
          height: '895',
          transform: '',
          viewBox: '0 0 938 895'
        },
        PISO8: {
          name: 'PISO 8',
          url: 'https://kiritek-web-documents.s3.us-west-2.amazonaws.com/masterplan-dashboard/imgs/torrespasodelparque/pisos/RESTO.png',
          width: '938',
          id: 49,
          levelId: this.$route.params.idPiso,
          nivel: 'availability',
          route: `nombre_nivel_te=${this.$route.params.piso}/detalles`,
          height: '895',
          transform: '',
          viewBox: '0 0 938 895'
        },
        PISO9: {
          name: 'PISO 9',
          url: 'https://kiritek-web-documents.s3.us-west-2.amazonaws.com/masterplan-dashboard/imgs/torrespasodelparque/pisos/RESTO.png',
          width: '938',
          id: 49,
          levelId: this.$route.params.idPiso,
          nivel: 'availability',
          route: `nombre_nivel_te=${this.$route.params.piso}/detalles`,
          height: '895',
          transform: '',
          viewBox: '0 0 938 895'
        },
        PISO10: {
          name: 'PISO 10',
          url: 'https://kiritek-web-documents.s3.us-west-2.amazonaws.com/masterplan-dashboard/imgs/torrespasodelparque/pisos/RESTO.png',
          width: '938',
          id: 49,
          levelId: this.$route.params.idPiso,
          nivel: 'availability',
          route: `nombre_nivel_te=${this.$route.params.piso}/detalles`,
          height: '895',
          transform: '',
          viewBox: '0 0 938 895'
        },
        PISO11: {
          name: 'PISO 11',
          url: 'https://kiritek-web-documents.s3.us-west-2.amazonaws.com/masterplan-dashboard/imgs/torrespasodelparque/pisos/RESTO.png',
          width: '938',
          id: 49,
          levelId: this.$route.params.idPiso,
          nivel: 'availability',
          route: `nombre_nivel_te=${this.$route.params.piso}/detalles`,
          height: '895',
          transform: '',
          viewBox: '0 0 938 895'
        },
        PISO12: {
          name: 'PISO 12',
          url: 'https://kiritek-web-documents.s3.us-west-2.amazonaws.com/masterplan-dashboard/imgs/torrespasodelparque/pisos/RESTO.png',
          width: '938',
          id: 49,
          levelId: this.$route.params.idPiso,
          nivel: 'availability',
          route: `nombre_nivel_te=${this.$route.params.piso}/detalles`,
          height: '895',
          transform: '',
          viewBox: '0 0 938 895'
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
      const piso = this.$route.params.piso;
      const pisoSeleccionado = this.pisos[piso];
      return pisoSeleccionado;
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

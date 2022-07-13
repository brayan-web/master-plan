<template>
  <div>
    <div class="line__vertical-mains"></div>
    <button-back/>
    <div v-if="locations.length > 0" class="map_filter">
      <div class="maphighlight__box">
          <h1 class="caption__select">
                  <span>Seleccione un terreno, clic para ver detalles</span>
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
            :amountAvailables="amountAvailables"


        />
      </div>
      <div class="select__box">
        <Select
            v-if="locations.length > 0 && rangeFilter.length > 0"
            :locations="locations"
            @change="changeRange"
            :rangeFilter="rangeFilter"
        />
        <Availables
            class="availables-desk"
            :type="type"
            :existFilter="existFilter"
            :amountAvailables="amountAvailables"

        />
      </div>
    </div>
  </div>
</template>
<script>
import {mapActions, mapGetters} from "vuex";
import MapHighlight from "../../core/MapHighlight";
import ButtonBack from "../../core/ButtonBack";
import Button from "../../core/Button.vue";
import Availables from "../../core/Availables.vue";
import Select from "../../core/Select.vue";


export default {
  name: "Main",
  components: {
    MapHighlight,
    Button,
    ButtonBack,
    Availables,
    Select
  },
  data() {
    return {
      id: this.$route.params.id,
      levelId: 0,
      type: "terreno",
      desarrollo: "lomalta-priv",
      arrFilteredLocations: [],
      nivel: "availability",
      url: `nombre_nivel_te=${this.$route.params.privada}/detalles`,
      micrositeUrl: "https://www.tresmarias.com.mx/senderos/terrenos",
      privadas: {
        VALLESURZONACOMERCIAL: {
          name: 'privada5',
          url: 'https://kiritek-web-documents.s3.us-west-2.amazonaws.com/masterplan-dashboard/imgs/ciudadsalud/zonas/vallesur-main.png',
          width: '1100',
          id: this.$route.params.id,
          levelId: 0,
          nivel: 'availability',
          route: `nombre_nivel_te=${this.$route.params.privada}/detalles`,
          height: '500',
          transform: '',
          viewBox: '0 0 1100 500'
        },
        VALLENORTEZONACOMERCIAL: {
          name: 'privada7',
          url: 'https://kiritek-web-documents.s3.us-west-2.amazonaws.com/masterplan-dashboard/imgs/ciudadsalud/zonas/vallenorte-main.png',
          width: '900',
          id: this.$route.params.id,
          levelId: 0,
          nivel: 'availability',
          route: `nombre_nivel_te=${this.$route.params.privada}/detalles`,
          height: '700',
          transform: '',
          viewBox: '0 0 900 700'
        },

      },
      rangeFilter: false
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
      let arrExistFilter;
      if (this.rangeFilter) {
        arrExistFilter = this.arrFilteredLocations;
      } else if (this.rangeFilter === false) {
        arrExistFilter = this.locations;
      }
      return arrExistFilter;
    },
  },
  methods: {
    ...mapActions(["getAvailableLocations", "clearCoords"]),
    changeRange(arrFilter) {
      this.arrFilteredLocations = arrFilter;
    },

  },
  async created() {
    await this.getAvailableLocations(this.development);
  },
  async beforeDestroy() {
    await this.clearCoords();
  },
  mounted() {
    console.log(this.$route.params.id)
  }
};
</script>

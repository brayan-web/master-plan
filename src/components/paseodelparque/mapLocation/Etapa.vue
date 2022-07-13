<template>
  <div>
    <div class="line__vertical-mains"></div>
    <button-back/>
    <div v-if="locations.length > 0" class="map_filter">
      <div class="maphighlight__box">
          <h1 class="caption__select">
                  <span>Seleccione un terreno, clic para ver detalles</span>
                </h1>
        <map-highlight v-for="(img, index) in imgSet" :key="img.width" :index="index" :img="img"  :existFilter="existFilter" :desarrollo="desarrollo" :url="url" :nivel="nivel"/>
        <Button v-for="(img, index) in imgSet" :key="img.url" :index="index" :img="img"/>
        <div class="line_horizontal"></div>
        <Availables
            class="availables-mobile"
            :type="type"
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
            :amountAvailables="amountAvailables"
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
  name: "Etapa",
  components: {
    MapHighlight,
    Select,
    Availables,
    Button,
    ButtonBack
  },
  data() {
    return {
      id: 33,
      levelId: this.$route.params.idPiso,
      type: "terreno",
      desarrollo: "paseodelparque",
      arrFilteredLocations: [],
      nivel: "availability",
      url: `nombre_nivel_te=${this.$route.params.piso}/detalles`,
      imgSet: [
        {
          name: 'paseodelparque',
          url: 'https://kiritek-web-documents.s3.us-west-2.amazonaws.com/masterplan-dashboard/imgs/paseodelparque/etapas/pdp-etapa5x.png',
          width: '1120',
          height: '906',
          id: 55,
          route: `nombre_nivel_te=${this.$route.params.piso}/detalles`,
          nivel: 'availability',
          levelId: this.$route.params.idPiso,
          transform: '',
          viewBox: '0 0 1120 906'
        }
      ],
      // si no hay filtro volver rangeFilter a false
      rangeFilter: [
        { min: 144.17, max: 160.00 },
        { min: 217.63, max: 960.23 },
      ],
    };
  },

  computed: {
    ...mapGetters({
      locations: "getLocations",
    }),
    development() {
      return { id: this.id, level: this.levelId };
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
  async beforeDestroy(){
    await this.clearCoords()
  }
};
</script>

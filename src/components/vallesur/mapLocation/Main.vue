<template>
  <div>
    <div class="line__vertical-mains"></div>
    <sub-header :micrositeUrl="micrositeUrl" />
    <div v-if="locations.length > 0" class="map_filter">
      <div class="maphighlight__box">
          <h1 class="caption__select">
                  <span>Seleccione una terreno, clic para ver detalles</span>
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
            :amountAvailables="amountAvailables"
            :type="type"
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
      id: 61,
      levelId: 0,
      type:"terreno",
      desarrollo: "vallesur",
      arrFilteredLocations: [],
      nivel: "availability",
      url: "vallesur/detalles",
      micrositeUrl: "https://www.tresmarias.com.mx/vallesur/terrenos",
      imgSet: [
        {
          name: 'vallesur',
          url: 'https://kiritek-web-documents.s3.us-west-2.amazonaws.com/masterplan-dashboard/imgs/vallesur/vallesur-main.png',
          width: '6716',
          height: '2828',
          id: 61,
          route: 'vallenorte/detalles',
          nivel: 'availability',
          levelId: 0,
          transform: '',
          viewBox: '0 0 6716 2828'

        }
      ],
      // si no hay filtro volver rangeFilter a false
      rangeFilter: [
        { min: 140, max: 169 },
        { min: 170, max: 209 },
        { min: 210, max: 250 },
      ],
    };
  },

  computed: {
    ...mapGetters({
      locations: "getLocations",
    }),
    development() {
      return { id: this.id, level: 0 };
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

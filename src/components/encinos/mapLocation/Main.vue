<template>
  <div>
    <div class="line__vertical-mains"></div>
    <sub-header :micrositeUrl="micrositeUrl" />
    <div v-if="locations.length > 0" class="map_filter">
      <div class="maphighlight__box">
          <h1 class="caption__select">
                  <span>Seleccione un terreno, clic para ver detalles</span>
                </h1>
        <map-highlight v-for="(img, index) in imgSet" :key="img.width" :index="index" :img="img"  :existFilter="existFilter" :desarrollo="desarrollo" :url="url" :nivel="nivel"/>
        <Button v-for="(img, index) in imgSet" :key="img.url" :index="index" :img="img" :id="id" :desarrollo="desarrollo" :nivel="nivel"  :levelId="levelId"/>
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
      id: 44,
      levelId: 0,
      type: "terreno",
      desarrollo: "encinos",
      arrFilteredLocations: [],
      nivel: "availability",
      url: "encinos/detalles",
      micrositeUrl: "https://www.tresmarias.com.mx/encinos/terrenos",
      imgSet: [
        {
          name: 'encinos',
          url: 'https://kiritek-web-documents.s3.us-west-2.amazonaws.com/masterplan-dashboard/imgs/encinos/encinos-main.png',
          width: '750',
          height: '999',
          id: 44,
          levelId: 0,
          route: 'encinos/detalles',
          nivel: 'availability',
          transform: '',
          viewBox: '0 0 750 999'
        }
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

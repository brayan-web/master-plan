<template>
  <div>
    <sub-header :micrositeUrl="micrositeUrl" />
    <div v-if="locations.length > 0" class="map_filter">
      <div class="maphighlight__box">
        <map-highlight v-for="(img, index) in imgSet" :key="img.width" :index="index" :img="img"  :existFilter="existFilter" :desarrollo="desarrollo" :url="url" :nivel="nivel"/>
        <Button v-for="(img, index) in imgSet" :key="img.url" :index="index" :img="img" :id="id" :desarrollo="desarrollo"/>
        <div class="line_horizontal"></div>
        <Availables
          class="availables-mobile"
          
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
      id: 43,
      desarrollo: "lindavista",
      arrFilteredLocations: [],
      nivel: "availability",
      url: "lindavista/detalles",
      micrositeUrl: "https://www.tresmarias.com.mx/lindavista/terrenos",
      imgSet: [
        {
          name: 'lindavista',
          url: '/imgs/lindavista-main.png',
          width: '1332',
          height: '1346'
        }
      ],
      // si no hay filtro volver rangeFilter a false
      rangeFilter: [
        { min: 170, max: 191 },
        { min: 192, max: 238 },
        { min: 239, max: 326 },
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

<template>
  <div>
    <div class="line__vertical-mains"></div>
    <button-back/>
    <div v-if="locations.length > 0" class="map_filter">
      <div class="maphighlight__box">
          <h1 class="caption__select">
                  <span>Seleccione una casa, clic para ver detalles</span>
                </h1>
        <map-highlight v-for="(img, index) in imgSet" :key="index" :index="index" :img="img"
                       :existFilter="existFilter" :desarrollo="desarrollo" :url="url" :type="type"
                       :nivel="nivel"/>
        <Button v-for="(img, index) in imgSet" :key="img.width" :index="index" :img="img" :id="id"
                :desarrollo="desarrollo" :nivel="nivel" :levelId="levelId" :url="url"/>
        <div class="line_horizontal"></div>
        <Availables
            class="availables-mobile"
            :type="type"
            :existFilter="existFilter"
            @onUpdateModel="updateActiveModel"
            :desarrollo="desarrollo"
        />
      </div>
      <div class="select__box">
        <Availables
            class="availables-desk"
            :type="type"
            :desarrollo="desarrollo"
            :existFilter="existFilter"
            @onUpdateModel="updateActiveModel"
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

export default {
  name: "Main",
  components: {
    MapHighlight,
    Button,
    ButtonBack,
    Availables
  },
  data() {
    return {
      id: 23,
      levelId: 66,
      type: "casas",
      desarrollo: "bosques",
      arrFilteredLocations: [],
      nivel: "availability",
      url: `bosques/detalles`,
      imgSet: [
        {
          name: 'bosques',
          url: 'https://kiritek-web-documents.s3.us-west-2.amazonaws.com/masterplan-dashboard/imgs/bosques/casas/bosques-main.png',
          width: '2651',
          height: '3258',
          id: 23,
          levelId: 66,
          route: 'bosques/detalles',
          nivel: 'availability',
          transform: '',
          viewBox: '0 0 2651 3258'
        }
      ],
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

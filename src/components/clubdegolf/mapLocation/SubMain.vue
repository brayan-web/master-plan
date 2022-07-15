<template>
  <div>
    <div class="line__vertical-mains"></div>
    <button-back/>
    <div v-if="locations.length > 0" class="map_filter">
      <div class="maphighlight__box">
       <div class="box__svg">
          <h1 class="caption__select">
                  <span>Seleccione una sección, clic para ver detalles</span>
                </h1>
         <svg
             version="1.1"
             id="Capa_1"
             xmlns="http://www.w3.org/2000/svg"
             xmlns:xlink="http://www.w3.org/1999/xlink"
             x="0px"
             y="0px"
             viewBox="0 0 5647 3142"
             xml:space="preserve"
         >
          <image
              style="overflow: visible"
              width="5647"
              height="3142"
              xlink:href="https://kiritek-web-documents.s3.us-west-2.amazonaws.com/masterplan-dashboard/imgs/clubdegolf/PreClubdeGolf.png"
          ></image>
           <polygon
               class="polygon"
               @click="selectLocation(location)"
               v-for="(location, index) in existFilter"
               :key="index"
               :style="{ fill: '#' + location.color, opacity: 0.6 }"
               :points="location.coords"
               :shape="location.shape"
               :name="`${location.coords}`"
           />

        </svg>
         <tippy
            theme="toolMapMain" size="large"   multiple="true" :placement="`${location.position}`"   arrow="true" interactive="false" animation="fade" allowHTML="true" v-for="(location, index) in existFilter" :key="index"
            :to="`${location.coords}`">
          <div>
            <h3 style="font-size:1.3rem">{{location.type}}</h3>
          </div>
        </tippy>
       </div>
        <div class="line_horizontal"></div>
        <Availables
            class="availables-mobile"
            :type="type"
            :amountAvailables="amountAvailables"
        />
      </div>
      <div class="select__box">
        <select-club
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

import { locationsData } from "../../../utils/data_map_preclubgolf.js"

import SelectClub from "../../core/SelectClub.vue";
import Availables from "../../core/Availables.vue";
import ButtonBack from "../../core/ButtonBack";


export default {
  name: "Main",
  components: {
    SelectClub,
    Availables,
    ButtonBack
  },
  data() {
    return {
      locations : locationsData,
      levelId: 0,
      type:"terreno",
      desarrollo: "clubdegolf",
      arrFilteredLocations: [],
      // si no hay filtro volver rangeFilter a false
      rangeFilter: [
        {name: "SECCION 3" },
        {name: "SECCION 7GB"},
        {name: "SECCION 8H"}
      ],
    };
  },

  computed: {
    ...mapGetters({
      //locations: "getLocations",
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
        selectLocation(location) {
        let nameNoSpace = location.type.replace(/ /g, "");

      this.$router.push({path: `/clubdegolf/preseccion/${nameNoSpace}/cve_nivel_te=${location.id}`})

    },
  },
   created() {


  },
  async beforeDestroy(){
    await this.clearCoords()
  }
};
</script>

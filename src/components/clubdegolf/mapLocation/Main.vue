<template>
  <div>
    <sub-header :micrositeUrl="micrositeUrl"/>
    <div style="width: 100%;">
      <div style="width: 80%; margin: auto;">
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
            viewBox="0 0 6053 4562"
            style="enable-background: new 0 0 1200 750"
            xml:space="preserve"
        >
          <image
              style="overflow: visible"
              width="6053"
              height="4562"
              xlink:href="https://kiritek-web-documents.s3.us-west-2.amazonaws.com/masterplan-dashboard/imgs/clubdegolf/MainClubdeGolf.png"
          ></image>
          <polygon
              class="polygon"
              @click="selectLocation(location)"
              v-for="(location, index) in locations"
              :key="index"
              :style="{ fill: '#' + location.color, opacity: 0.6 }"
              :points="location.coords"
              :shape="location.shape"
              :name="`${location.coords}`"
          />

        </svg>
        <tippy
            theme="toolMapMain" size="large"   multiple="true" :placement="`${location.position}`"   arrow="true" interactive="false" animation="fade" allowHTML="true" v-for="(location, index) in locations" :key="index"
            :to="`${location.coords}`">
          <div>
            <h3 style="font-size:1.3rem">{{location.type}}</h3>
          </div>
        </tippy>
      </div>
    </div>
  </div>
</template>
<script>
import SubHeader from "../../core/SubHeader.vue";
import { locationsData } from "../../../utils/data_map_clubgolf.js"

export default {
  name: "Main",
  components: {
    SubHeader,
  },
  data() {
    return {
      url: "clubdegolf",
      micrositeUrl: "https://tresmarias.com.mx/clubdegolf/terrenos",
      locations : locationsData,
      name: "",
      onIndicatorN: true,
      onIndicatorS: true
    };
  },
  computed: {
    existFilter() {
      return this.locations;
    },
  },
  methods: {
    selectLocation() {
      this.$router.push({path: `/clubdegolf/preseccion`})

    },
 
  },
  created() {
  },
  async beforeDestroy() {
    this.locations = []
  }
};
</script>


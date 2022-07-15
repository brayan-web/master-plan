<template>
  <div>
    <sub-header :micrositeUrl="micrositeUrl"/>
    <div class="box__svg">
      <div style="width: 80%; margin: auto;">
          <h1 class="caption__select">
                  <span>Seleccione una zona, clic para ver detalles</span>
                </h1>
        <svg
            version="1.1"
            id="Capa_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 1600 1013"
            style="enable-background: new 0 0 1200 750"
            xml:space="preserve"
        >
          <image
              style="overflow: visible"
              width="1600"
              height="1013"
              xlink:href="https://kiritek-web-documents.s3.us-west-2.amazonaws.com/masterplan-dashboard/imgs/ciudadsalud/MainCiudadSalud.png"
          ></image>
          <polygon
              class="polygon"
              v-on:mouseover="inLocation(location, index)"
              v-on:mouseout="outLocation(location, index)"
              @click="selectLocation(location)"
              v-for="(location, index) in locations"
              :key="index"
              :style="{ fill: '#' + location.color, opacity: 0.6 }"
              :points="location.coords"
              :shape="location.shape"
              :name="`${location.name}`"
          />
          <circle v-if="onIndicatorS" cx="517.71" cy="36.62" r="10.29"/>
          <circle v-if="onIndicatorS" class="st0" cx="517.71" cy="36.62" r="5.29"/>
          <line v-if="onIndicatorS" class="st3" x1="518" y1="246.62" x2="518" y2="46.62"/>
          <text v-if="onIndicatorS" transform="matrix(1 0 0 1 270 20)" class="st1 st2">
              VALLE SUR ZONA COMERCIAL
            </text>
          <circle v-if="onIndicatorN"  cx="1282.6" cy="436.3" r="13.9"/>
          <circle v-if="onIndicatorN" class="st0" cx="1282.6" cy="436.3" r="5.9"/>
          <line v-if="onIndicatorN" class="st3" x1="1283.6" y1="428.4" x2="1289.8" y2="345.6"/>
          <text v-if="onIndicatorN" transform="matrix(1 0 0 1 1203.1542 466.8642)" class="st1 st2">
            VALLE NORTE ZONA COMERCIAL
          </text>
        </svg>
        <tippy
            theme="toolMapMain" size="large"   multiple="true" :placement="`${location.position}`"   arrow="true" interactive="false" animation="fade" allowHTML="true" v-for="(location, index) in locations" :key="index"
               :to="`${location.name}`">
          <div>
            <h3 style="font-size:1rem">{{location.type}}</h3>
          </div>
        </tippy>
      </div>
    </div>
  </div>
</template>
<script>
import SubHeader from "../../core/SubHeader.vue";
import { locationsData } from "../../../utils/data_map_ciudadsalud.js"

export default {
  name: "Main",
  components: {
    SubHeader,
  },
  data() {
    return {
      url: "ciudadsalud",
      micrositeUrl: "https://www.tresmarias.com.mx/ciudadsalud/zonacomercial",
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
    selectLocation(location) {

        let nameNoSpace = location.type.replace(/ /g, "");
        this.$router.push({path: `ciudadsalud/cve_nivel_te=${location.id}/nombre_nivel_te=${nameNoSpace}`})

    },
    inLocation(location) {
      if(location.type === 'VALLE SUR ZONA COMERCIAL'){
        this.onIndicatorS = false
      }else if(location.type === 'VALLE NORTE ZONA COMERCIAL'){
        this.onIndicatorN = false
      }
    },
    outLocation() {
      this.onIndicatorS = true
      this.onIndicatorN = true

    },
  },
  created() {
  },
  async beforeDestroy() {
    this.locations = []
  }
};
</script>
<style lang="css" scoped>
.st0 {
  fill: #ffffff;
  transition: all .5s ease-out;

}
.st1 {
  font-family: "Raleway", sans-serif;
  font-weight: 700;

}
.st2 {
  font-size: 2rem;
}
.st3 {
  fill: none;
  stroke: #000000;
  stroke-width: 4;
  stroke-miterlimit: 10;
}
</style>

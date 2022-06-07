<template>
  <div class="box__svg">
    <svg
        version="1.1"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        :viewBox="`0 0 ${updateViewBox()} ${img.height}`"
        xml:space="preserve"
    >
      <image
          style="overflow: visible"
          :width="img.width"
          :height="img.height"
          :xlink:href="`${img.url}`"
          :transform="_transform"
      >

      </image>
      <polygon
          class="polygon"
          v-on:mouseover="inLocation(location, index)"
          v-on:mouseout="outLocation(location, index)"
          @click="selectLocation(location)"
          v-for="(location, index) in filterMapAvaialbles"
          :key="location.name"
          :points="location.coords"
          :shape="location.shape"
          :style="customPolygon(index)"
          :stroke="location.color"
          :name="`${location.name}`"
      />
      <indicators v-for="indicator in setIndicators" :indicator="indicator" :key="'A' + indicator.text"/>
    </svg>
    <tippy theme="honeybee" size="large" distance="3"   ignoreAttributes="true"  arrow="true" interactive="true" animation="fade" allowHTML="true"  v-for="location in filterMapAvaialbles" :key="location.id"  :to="`${location.name}`">
      <Tooltip :location="location"/>
    </tippy>
  </div>
</template>

<script>
import Tooltip from "../core/Tooltip.vue"
import Indicators from "./Indicators";
import {mapActions} from "vuex";
export default {
  name: "MapHighlight",
  props: ["existFilter", "img", "desarrollo", "url", "nivel", "indicators"],
  components: {
    Tooltip,
    Indicators

  },
  data() {
    return {
      opacity: 0.4,
      stroke: 3,
      target: null,
      name:"",
      widthViewBox:1726,
      offIndicator: false,
      onIndicator: true

    };
  },
  computed: {
      _transform(){
        if(this.img.transform){
          return 'matrix(1 0 0 1 238 -0.42)'
        }else{
          return ''
        }
      },
    filterMapAvaialbles(){
        if(this.desarrollo === 'canadas_casas'){
          return this.existFilter.filter((location) => location.available > 0)
        }else{
          return this.existFilter
        }
    },
    setIndicators(){
        return this.indicators
    }
  },
  methods: {
    ...mapActions(["selectedLocation"]),
    selectLocation(location) {
        if(this.nivel === 'availability'){
          this.selectAvailability(location)
        }else if(this.nivel === 'towerStage'){
          this.selectTowerStage(location)
        }
    },
    selectAvailability(location){
      if (location.statusText === "Disponible") {
        this.selectedLocation(location)
        this.$router.push(`${this.url}/${location.name}`)
      } else {
        if(location.statusText === "Reservado" || location.statusText === "Vendido"){
          event.preventDefault();
        }
      }
    },
    selectTowerStage(location){
      if (location.available > 0) {
        this.selectedLocation(location)
        let nameNoSpace = location.name.replace(/ /g, "");
        this.$router.push(`${this.url}/nombre_nivel_te=${nameNoSpace}/cve_nivel_te=${location.id}`)
      } else {
        if(location.statusText === "Reservado" || location.statusText === "Vendido"){
          event.preventDefault();
        }
      }
    },
    inLocation(location, index) {
      this.name = location.name
      event.target.style.opacity = 0.3;
      event.target.style.fill = "#f8f9fa";

      if(location.name === this.setIndicators[index].text){
        this.setIndicators[index].status = this.offIndicator
      }
      console.log(this.setIndicators[index].status)

    },
    outLocation(location, index) {
      this.name = "";
      event.target.style.opacity = 0.4;
      event.target.style.fill = `#${this.filterMapAvaialbles[index].color}`;

      if(location.name === this.setIndicators[index].text){
        this.setIndicators[index].status = this.onIndicator
      }
    },
    customPolygon(index) {
      let location = this.filterMapAvaialbles[index];
      return `stroke-width:3; stroke:#${location.color}; opacity: ${this.opacity}; fill: #${location.color}`;
    },

    updateViewBox(){
      if(this.desarrollo === 'canadas_casas'){
        return this.widthViewBox
      }else{
        return this.img.width
      }
    },
  },

  mounted() {

  },

};
</script>




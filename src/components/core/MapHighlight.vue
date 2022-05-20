<template>
  <div style="width: 100%">
    <svg
        version="1.1"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        :viewBox="`0 0 ${img.width} ${img.height}`"
        xml:space="preserve"
    >
      <image
          style="overflow: visible"
          :width="img.width"
          :height="img.height"
          :xlink:href="`${img.url}`"
      >

      </image>
      <polygon
          class="polygon"
          v-on:mouseover="inLocation(location)"
          v-on:mouseout="outLocation(index)"
          @click="selectLocation(location)"
          v-for="(location, index) in existFilter"
          :key="location.name"
          :points="location.coords"
          :shape="location.shape"
          :style="customPolygon(index)"
          :stroke="location.color"
          :name="`${location.name}`"
      />
    </svg>
    <tippy theme="honeybee" size="large" distance="3"   ignoreAttributes="true"  arrow="true" interactive="true" animation="fade" allowHTML="true"  v-for="location in existFilter" :key="location.id"  :to="`${location.name}`">
      <Tooltip :location="location"/>
    </tippy>
  </div>
</template>

<script>
import Tooltip from "../core/Tooltip.vue"

import {mapActions} from "vuex";
export default {
  name: "MapHighlight",
  props: ["existFilter", "img", "desarrollo", "url"],
  components: {
    Tooltip,

  },
  data() {
    return {
      opacity: 0.4,
      stroke: 3,
      target: null,
      name:""
    };
  },
  computed: {

  },
  methods: {
    ...mapActions(["selectedLocation"]),
    selectLocation(location) {
      if (location.statusText === "Disponible") {
      this.selectedLocation(location)
          this.$router.push(`${this.url}/${location.name}`)

      } else {
        if(location.statusText === "Reservado" || location.statusText === "Vendido"){
          event.preventDefault();

        }
      }
    },
    inLocation(location) {
      this.name = location.name

      event.target.style.opacity = 0.3;
      event.target.style.fill = "#f8f9fa";
    },
    outLocation(index) {
      this.name = "";

      event.target.style.opacity = 0.4;
      event.target.style.fill = `#${this.existFilter[index].color}`;
    },
    customPolygon(index) {
      let location = this.existFilter[index];
      return `stroke-width:3; stroke:#${location.color}; opacity: ${this.opacity}; fill: #${location.color}`;
    },
  },

  mounted() {},

};
</script>




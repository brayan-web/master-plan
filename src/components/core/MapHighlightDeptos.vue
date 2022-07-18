<template>
  <div>
    <div class="box__svg">
      <svg
          version="1.1"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          :viewBox="img.viewBox"
          xml:space="preserve"
      >
      <image
          style="overflow: visible"
          :width="img.width"
          :height="img.height"
          :xlink:href="`${img.url}`"
          :transform="img.transform"
      >

      </image>
        <polygon
            class="polygon"
            v-on:mouseover="inLocation(location, index)"
            v-on:mouseout="outLocation(location, index)"
            @click="selectLocation(location)"
            v-for="(location, index) in filterIzq"
            :key="index"
            :points="location.coords_mini_izq"
            :shape="location.shape"
            :style="customPolygon(index)"
            :stroke="location.color"
            :name="`${location.name} ${location.lado}`"
        />
        <polygon
            class="polygon"
            v-on:mouseover="inLocation(location, index)"
            v-on:mouseout="outLocationDer(location, index)"
            @click="selectLocation(location)"
            v-for="(location, index) in filterDer"
            :key="'A'+index"
            :points="location.coords_mini_der"
            :shape="location.shape"
            :style="customPolygonDer(index)"
            :stroke="location.color"
            :name="`${location.name} ${location.lado}`"
        />

    </svg>
      <tippy theme="honeybee" size="large" distance="3" ignoreAttributes="true" arrow="true" interactive="true"
             animation="fade" allowHTML="true"
             v-for="(location, index) in filterDer"
             :key="'B'+index"
             :to="`${location.name} ${location.lado}`">
        <tooltip-deptos :location="location"/>
      </tippy>
      <tippy theme="honeybee" size="large" distance="3" ignoreAttributes="true" arrow="true" interactive="true"
             animation="fade" allowHTML="true"
             v-for="(location, index) in filterIzq"
             :key="'C'+index"
             :to="`${location.name} ${location.lado}`">
        <tooltip-deptos :location="location"/>
      </tippy>
    </div>
    <map-view-detail v-if="stateMapDetail"/>
  </div>
</template>
<script>
import TooltipDeptos from "../core/TooltipDeptos.vue"
import {mapActions, mapGetters} from "vuex";
import MapViewDetail from "../core/MapViewDetail";

export default {
  name: "MapHighlightDeptos",
  props: ["existFilter", "img", "url", "nivel"],
  components: {
    TooltipDeptos,
    MapViewDetail
  },
  data() {
    return {
      opacity: 0.4,
      stroke: 3,
      target: null,
      name: "",
      widthViewBox: 1726,
      offIndicator: false,
      onIndicator: true,
      locationsDer: [],
      locationsIzq: []
    };
  },
  computed: {
    ...mapGetters({
      filterModelos: "getStatusFilterModelos",
      stateMapDetail: "getStatusMapDetail"
    }),
    filterMapAvaialbles() {
      return this.filterModelos
    },
    filterDer() {
      return this.filterMapAvaialbles.filter((location) => location.lado === 'DER')
    },
    filterIzq() {
      return this.filterMapAvaialbles.filter((location) => location.lado === 'IZQ')
    }
  },
  methods: {
    ...mapActions(["selectedLocation"]),
    selectLocation(location) {
      this.selectAvailability(location)
    },
    selectAvailability(location) {
      if(location.available > 0){
        this.selectedLocation(location)
        let nameNoSpace = location.name.replace(/ /g, "");
        this.$router.push({path: `${this.url}/cve_nivel_te=${location.id}/nombre_nivel_te=${nameNoSpace}`,
        })
      }else{
        event.preventDefault();

      }
    },
    inLocation(location) {
      this.name = location.name
      event.target.style.opacity = 0.3;
      event.target.style.fill = "#"+location.color;
    },
    outLocation(location, index) {
      this.name = "";
      event.target.style.opacity = 0.4;
      event.target.style.fill = `#${this.filterIzq[index].color}`;
    },
    outLocationDer(location, index) {
      this.name = "";
      event.target.style.opacity = 0.4;
      event.target.style.fill = `#${this.filterDer[index].color}`;
    },
    customPolygon(index) {
      let location = this.filterIzq[index];
      return `stroke-width:3; stroke:#${location.color}; opacity: ${this.opacity}; fill: #${location.color}`;
    },
    customPolygonDer(index) {
      let location = this.filterDer[index];
      return `stroke-width:3; stroke:#${location.color}; opacity: ${this.opacity}; fill: #${location.color}`;
    },
    beforeDestroy() {
    }
  },
  mounted() {
  },
};
</script>




<template>
  <div class="map__detail">
    <svg
      class="map__detail-svg"
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      :viewBox="`0 0 ${width} ${height}`"
      xml:space="preserve"
    >
      <image
        style="overflow: visible"
        :width="`${width}`"
        :height="`${height}`"
        :xlink:href="`${url}`"
        :transform="_transform"

      ></image>
      <polygon
        class="polygon"
        @click="selectLocation(location)"
        v-for="(location, index) in filterMapAvaialbles"
        :key="index"
        :points="location.coords"
        :shape="location.shape"
        :style="customPolygon(index)"
        :stroke="location.color"
      />
    </svg>
    <div @click="back()" class="btn__navigation btn__navigation--close">
      <font-awesome-icon :icon="closeIcon" />
    </div>
    <div class="btn__navigation btn____navigation--up">
      <font-awesome-icon :icon="upIcon" />
    </div>
    <div class="btn__navigation btn____navigation--down">
      <font-awesome-icon :icon="downIcon" />
    </div>
    <div class="btn__navigation btn__navigation--left">
      <font-awesome-icon :icon="leftIcon" />
    </div>
    <div class="btn__navigation btn__navigation--right">
      <font-awesome-icon :icon="rightIcon" />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import {
  faXmark,
  faArrowDown,
  faArrowUp,
  faArrowLeft,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
export default {
  name: "MapViewDetail",
  data() {
    return {
      closeIcon: faXmark,
      downIcon: faArrowDown,
      upIcon: faArrowUp,
      leftIcon: faArrowLeft,
      rightIcon: faArrowRight,
      existFilter: [],
      id: this.$route.params.id,
      imgSet: [],
      width: this.$route.params.width,
      height: this.$route.params.height,
      desarrollo: this.$route.params.desarrollo,
      url: "",
      opacity: 0.4,
      stroke: 3,
      transform: false
    };
  },
  components: {

  },
  computed: {
    ...mapGetters({
      locations: "getLocations",
    }),
    development() {
      return { id: this.id, level: 0 };
    },
    _transform(){
      if(this.transform){
        return 'matrix(1 0 0 1 238 -0.42)'
      }else{
        return ''
      }
    },
    filterMapAvaialbles(){
      if(this.desarrollo === 'canadas_casas'){
        return this.locations.filter((location) => location.available > 0)
      }else{
        return this.locations;
      }
    }
  },
  methods: {
    ...mapActions(["getAvailableLocations", "getTowerStageLevels", "selectedLocation"]),
    selectLocation(location) {
      if (location.status == 2 || location.available > 0) {
        this.selectedLocation(location);
        this.$router.push(`/${this.desarrollo}/${location.name}`);
      } else {
        event.preventDefault();
      }
    },
    back() {
      this.$router.go(-1);
    },
    customPolygon(index) {
      let location = this.filterMapAvaialbles[index];
      return `stroke-width:3; stroke:#${location.color}; opacity: ${this.opacity}; fill: #${location.color}`;
    },
  },
  async created() {
    if(this.desarrollo === "canadas_casas"){
      await  this.getTowerStageLevels(this.development);
      this.transform = true;
    }else{
      await this.getAvailableLocations(this.development);
    }
    this.url = this.$route.params.url;
    this.width = this.$route.params.width;
    this.height = this.$route.params.height;
  },
  mounted() {},
};
</script>

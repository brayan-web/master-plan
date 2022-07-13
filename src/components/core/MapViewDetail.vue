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
      :viewBox="dataImg.viewBox"
      xml:space="preserve"
    >
      <image
        style="overflow: visible"
        :width="dataImg.width"
        :height="dataImg.height"
        :xlink:href="dataImg.url"
        :transform="dataImg.transform"

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
      id: "",
      levelId : "",
      nivel: "",
      url: "",
      opacity: 0.4,
      stroke: 3,
    };
  },
  components: {

  },
  computed: {
    ...mapGetters({
      locations: "getLocations",
      dataImg: "getStatusDataImageMap",
    }),
    development() {
      return { id: this.id, level: this.levelId };
    },
    filterMapAvaialbles(){
      if(this.nivel === 'towerStageLevel' || this.nivel === 'towerStage'){
        return this.locations.filter((location) => location.available > 0)
      }else{
        return this.locations;
      }
    }
  },
  methods: {
    ...mapActions(["getAvailableLocations", "getTowerStageLevels","getTowerStage", "selectedLocation", "getMapDetail"]),
    selectLocation(location) {
      if(this.nivel === 'availability'){
        this.selectAvailability(location)
      }else if(this.nivel === 'towerStageLevel'){
        this.selectTowerStageLevel(location)
      }else if(this.nivel === 'towerStage'){
        this.selectTowerStage(location)
      }
    },
    selectAvailability(location){
      if (location.statusText === "Disponible") {
        this.selectedLocation(location)
        this.$router.push(`${this.url}/${location.name}`)
      } else {
          event.preventDefault();
      }
    },
    selectTowerStageLevel(location){
      if (location.available > 0) {
        this.selectedLocation(location)
        let nameNoSpace = location.name.replace(/ /g, "");
        this.$router.push({ path: `/${this.url}/nombre_nivel_te=${nameNoSpace}/cve_nivel_te=${location.id}`, params: {privada: nameNoSpace, id: location.id}})
        this.getMapDetail()

      } else {
          event.preventDefault();
      }
    },
    selectTowerStage(location) {
      if (location.available > 0) {
        this.selectedLocation(location)
        let nameNoSpace = location.name.replace(/ /g, "");
        this.$router.push({
          path: `/${this.url}/nombre_torre_etapa=${nameNoSpace}/cve_torre_etapa=${location.id}`,
          params: {torre: nameNoSpace, id: location.id}
        })
        this.getMapDetail()

      } else {
        event.preventDefault();
      }
    },
    back() {
      this.getMapDetail()
    },
    customPolygon(index) {
      let location = this.filterMapAvaialbles[index];
      return `stroke-width:3; stroke:#${location.color}; opacity: ${this.opacity}; fill: #${location.color}`;
    },

   async onLevelServer(){
      let nivel = this.nivel;
      switch (nivel) {
        case 'availability':
          await this.getAvailableLocations(this.development);
        break;
        case 'towerStageLevel':
          await  this.getTowerStageLevels(this.development);
        break;
        case 'towerStage':
          await  this.getTowerStage(this.development);
      }
    }


  },
  async created() {
    this.id = this.dataImg.id;
    this.url = this.dataImg.route;
    this.nivel = this.dataImg.nivel;
    this.levelId = this.dataImg.levelId;

    this.onLevelServer()
  },
  mounted() {},
};
</script>

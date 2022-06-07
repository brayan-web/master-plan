<template>
    <div>
      <Header :logoUrl="logoUrl"/>
  <div class="svg__box">
    <svg
        version="1.1"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 1893 1921"
        xml:space="preserve"
    >
        <image
            width="100%"
            height="1921"
            xlink:href="../../assets/img/core/main-pin.png"
        ></image>
      <polygon

          v-for="(location, index) in locations"
          :key="index"
          :points="location.coords"
          class="polygon__map-main"
          :name="`${location.name}`"

      />
      </svg>
    <tippy
        :theme="changeTheme(location)"
        interactive="true"

        size="large"
        v-for="(location, index) in locations" :key="index"  :to="`${location.name}`"
    >
    <tooltip-map-main :location="location"/>
    </tippy>
  </div>

    </div>
</template>

<script>
import Header from "../core/Header"
import TooltipMapMain from "../core/TooltipMapMain";
import { locationsData } from "../../store/mapa_location.js"
export default {
    name: "Home",
  data(){
      return{
        logoUrl: require('../../assets/img/core/logo.png'),
        locations : locationsData,
        name:""
      }
  },
  components:{
      Header,
    TooltipMapMain

  },
  computed: {

  },
  methods: {
    inLocation(location) {
      this.name = location.name
    },
    outLocation() {
      this.name = "";
    },
    changeTheme(location){
      if(location.name === "lindavista"){
          return 'lindavista'
      }else if(location.name === "senderos"){
        return 'senderos'
      }
      else{
        return 'lindavista'
      }
    }
  },
  mounted() {

  }
}
</script>


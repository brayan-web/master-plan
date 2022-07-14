<template>
    <div class="svg__custom-boxmain">
        <Header :logoUrl="logoUrl" />
        <div style="width:100%;">
         <div class="svg__box">
             <svg  version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1893 1921" xml:space="preserve">
                <image
                    width="100%"
                    height="1921"
                    xlink:href="https://kiritek-web-documents.s3.us-west-2.amazonaws.com/masterplan-dashboard/imgs/masterplan/ciudadtresmarias.png"
                ></image>
              <polygon
                  v-for="(location, index) in locations"
                  :key="index"
                  :points="location.coords"
                  class="polygon__map-main"
                  :name="`${location.name}`"
        
              />
              </svg>
            <tippy  theme="toolMapMain"  multiple="true" arrow="true" :placement="`${location.position}`"  interactive="true" animation="fade" allowHTML="true" v-for="(location, index) in locations" :key="index" :to="`${location.name}`">
                <tooltip-map-main :location="location" />
            </tippy>
            <!-- <div class="btn__navigation-home btn__navigation-home-up">
                <font-awesome-icon :icon="upIcon" />
            </div>
            <div class="btn__navigation-home btn__navigation-home-down">
                <font-awesome-icon :icon="downIcon" />
            </div>
            <div class="btn__navigation-home btn__navigation-home-left">
                <font-awesome-icon :icon="leftIcon" />
            </div>
            <div class="btn__navigation-home btn__navigation-home-right">
                <font-awesome-icon :icon="rightIcon" />
            </div> -->
           </div>
        </div>
       
       
    
    </div>
</template>

<script>
import Header from "../core/Header"
import TooltipMapMain from "../core/TooltipMapMain";
import { locationsData } from "../../utils/data_map_home.js"
import {
    faXmark,
    faArrowDown,
    faArrowUp,
    faArrowLeft,
    faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
export default {
    name: "Home",
    data() {
        return {
            logoUrl: require('../../assets/img/core/logo.png'),
            locations: locationsData,
            name: "",
            closeIcon: faXmark,
            downIcon: faArrowDown,
            upIcon: faArrowUp,
            leftIcon: faArrowLeft,
            rightIcon: faArrowRight,
        }
    },
    components: {
        Header,
        TooltipMapMain

    },
    computed: {

    },
    methods: {

    },
    mounted() {

    }
}
</script>

<style lang="css" scoped>

    
</style>


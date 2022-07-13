<template>
    <div>
        <div :class="widthSvg">
            
            <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" :viewBox="img.viewBox" xml:space="preserve">
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
                v-for="(location, index) in filterMapAvaialbles"
                :key="location.name"
                :points="location.coords"
                :shape="location.shape"
                :style="customPolygon(index)"
                :stroke="location.color"
                :name="`${location.name}`"
            />
            <indicators v-for="indicator in setIndicators" :indicator="indicator" :key="'A' + indicator.text"
                        :filterMapAvaialbles="filterMapAvaialbles"/>
        </svg>
            <tippy theme="honeybee" size="large" distance="3" ignoreAttributes="true" arrow="true" interactive="true" animation="fade" allowHTML="true" v-for="location in filterMapAvaialbles" :key="location.id" :to="`${location.name}`">
                <Tooltip :location="location" />
            </tippy>
        </div>
        <map-view-detail v-if="stateMapDetail" />
    </div>
</template>

<script>
import Tooltip from "../core/Tooltip.vue"
import Indicators from "./Indicators";
import { mapActions, mapGetters } from "vuex";
import MapViewDetail from "../core/MapViewDetail";

export default {
    name: "MapHighlight",
    props: ["existFilter", "img", "desarrollo", "url", "nivel", "indicators", "type"],
    components: {
        Tooltip,
        Indicators,
        MapViewDetail
    },
    data() {
        return {
            opacity: 0.4,
            stroke: 3,
            target: null,
            name: "",
            offIndicator: false,
            onIndicator: true
        };
    },
    computed: {
        ...mapGetters({
            filterModelos: "getStatusFilterModelos",
            stateMapDetail: "getStatusMapDetail"
        }),
        filterMapAvaialbles() {
            if (this.nivel === 'towerStage' || this.nivel === 'towerStageLevel') {
                return this.existFilter.filter((location) => location.available > 0)
            } else if (this.type === 'casas') {
                return this.filterModelos
            } else {
                return this.existFilter
            }
        },
        setIndicators() {
            return this.indicators
        },
        widthSvg() {
            if (this.desarrollo === 'canadas_deptos-piso' || this.desarrollo === 'torrespaseodelparquepiso') {
                return 'box__svg-deptos'
            } else if (this.desarrollo === 'paseodelparqueSubMenu') {
                return 'box__svg-pdp'
            } else if (this.desarrollo === 'bosques') {
                return 'box__svg-bosques'
            }
            return 'box__svg'
        },
    },
    methods: {
        ...mapActions(["selectedLocation"]),
        selectLocation(location) {
            if (this.nivel === 'availability') {
                this.selectAvailability(location)
            } else if (this.nivel === 'towerStage') {
                this.selectTowerStage(location)
            } else if (this.nivel === 'towerStageLevel') {
                this.selectTowerStageLevel(location)
            }
        },
        selectAvailability(location) {
            if (location.statusText === "Disponible") {
                this.selectedLocation(location)
                this.$router.push(`${this.url}/${location.name}`)
            } else {
                if (location.statusText === "Reservado" || location.statusText === "Vendido") {
                    event.preventDefault();
                }
            }
        },
        selectTowerStageLevel(location) {
            if (location.available > 0) {
                this.selectedLocation(location)
                let nameNoSpace = location.name.replace(/ /g, "");
                this.$router.push({ path: `${this.url}/cve_nivel_te=${location.id}/nombre_nivel_te=${nameNoSpace}` })
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
                    params: { torre: nameNoSpace, id: location.id }
                })
            } else {
                event.preventDefault();
            }
        },
        inLocation(location, index) {
            this.name = location.name
            event.target.style.opacity = 0.3;
            event.target.style.fill = "#bfe479";
            if (this.nivel === 'towerStageLevel' || this.nivel === 'towerStage') {
                if (location.name === this.setIndicators[index].text) {
                    this.setIndicators[index].status = this.offIndicator
                }
            }
        },
        outLocation(location, index) {
            this.name = "";
            event.target.style.opacity = 0.4;
            event.target.style.fill = `#${this.filterMapAvaialbles[index].color}`;
            if (this.nivel === 'towerStageLevel' || this.nivel === 'towerStage') {
                if (location.name === this.setIndicators[index].text) {
                    this.setIndicators[index].status = this.onIndicator
                }
            }
        },
        customPolygon(index) {
            let location = this.filterMapAvaialbles[index];
            return `stroke-width:3; stroke:#${location.color}; opacity: ${this.opacity}; fill: #${location.color}`;
        },
        beforeDestroy() {
            this.indicators = [];
        }
    },
    mounted() {

    },
};
</script>




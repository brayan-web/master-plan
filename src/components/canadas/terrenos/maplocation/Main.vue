<template>
    <div>
        <div class="line__vertical-mains"></div>
        <sub-header :micrositeUrl="micrositeUrl" />
        <div v-if="locations.length > 0" class="map_filter">
            <div class="maphighlight__box">
                <h1 class="caption__select">
                    <span>Seleccione una privada, clic para ver detalles</span>
                </h1>
                <map-highlight v-for="(img, index) in imgSet" :key="img.width" :index="index" :img="img" :existFilter="existFilter" :desarrollo="desarrollo" :url="url" :nivel="nivel" :indicators="indicators" :type="type"/>
                <Button v-for="(img, index) in imgSet" :key="img.url" :index="index" :img="img" :id="id" :nivel="nivel" :desarrollo="desarrollo" :levelId="levelId" :url="url" />
                <div class="line_horizontal"></div>
                <Availables class="availables-mobile" :amountAvailables="amountAvailables" :nivel="nivel" />
            </div>
            <div class="select__box" :class="selectHide">
                <Select v-if="locations.length > 0 && rangeFilter.length > 0" :locations="locations" @change="changeRange" :rangeFilter="rangeFilter" />
                <Availables class="availables-desk" :amountAvailables="amountAvailables" :nivel="nivel" />
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import SubHeader from "../../../core/SubHeader.vue";
import MapHighlight from "../../../core/MapHighlight";
import Select from "../../../core/Select.vue";
import Availables from "../../../core/Availables.vue";
import Button from "../../../core/Button.vue";
export default {
    name: "Main",
    components: {
        SubHeader,
        MapHighlight,
        Select,
        Availables,
        Button,
    },
    data() {
        return {
            id: 29,
            nivel: "towerStageLevel",
            levelId: 0,
            type: "terreno",
            desarrollo: "canadas_terrenos",
            arrFilteredLocations: [],
            url: "canadas_terrenos",
            micrositeUrl: "https://www.tresmarias.com.mx/canadas/terrenos",
            imgSet: [{
                name: 'canadas_terrenos',
                url: 'https://kiritek-web-documents.s3.us-west-2.amazonaws.com/masterplan-dashboard/imgs/ca%C3%B1adas/terrenos/MainTerrenosCanadas.png',
                width: '1200',
                height: '1959',
                id: 29,
                levelId: 0,
                route: 'canadas_terrenos',
                nivel: 'towerStageLevel',
                transform: 'matrix(1 0 0 1 113.3651 0)',
                viewBox: '0 0 1472.5 1959'
            }],
            indicators: [
                {},
                { id: 210, text: 'PRIVADA 15', transform: 'matrix(1.1092 0 0 1 1265.9661 1600.532)', cxB: 1248, cyB: 1591.7, rB: 15, cxW: 1248, cyW: 1591.7, rW: 6, x1: 1240.6, y1: 1591.7, x2: 1100.8, y2: 1582.8, status: true },
                { id: 211, text: 'PRIVADA 22', transform: 'matrix(1.1092 0 0 1 175.6289 1135.8673)', cxB: 318.6, cyB: 1128.8, rB: 15, cxW: 318.6, cyW: 1128.8, rW: 6, x1: 327.4, y1: 1128.8, x2: 455.9, y2: 1134.9, status: true },
            ],
            // si no hay filtro volver rangeFilter a false
            rangeFilter: false
        };
    },

    computed: {
        ...mapGetters({
            locations: "getLocations",
        }),
        development() {
            return { id: this.id, level: 0 };
        },
        existFilter() {
            let arrExistFilter;
            if (this.rangeFilter) {
                arrExistFilter = this.arrFilteredLocations;
            } else if (this.rangeFilter === false) {
                arrExistFilter = this.locations;
            }
            return arrExistFilter;
        },
        returnAvailable() {
            const filteredAvailables = this.existFilter;
            const newArrfiltered = filteredAvailables.filter(
                (item) => item.available > 0
            );
            return newArrfiltered;
        },
        amountAvailables() {
            return this.returnAvailable.filter(function(location) {
                return location.id == 211 || location.id == 210;
            });
        },

        selectHide() {
            if (this.rangeFilter == false) {
                return 'u__dipslay--none'
            } else {
                return ''
            }
        }
    },
    methods: {
        ...mapActions(["getTowerStageLevels", "clearCoords"]),
        changeRange(arrFilter) {
            this.arrFilteredLocations = arrFilter;
        },
    },
    async created() {
        await this.getTowerStageLevels(this.development);
    },
    async beforeDestroy() {
        await this.clearCoords()
    }
};
</script>

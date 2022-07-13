<template>
    <div>
        <div class="line__vertical-mains"></div>
        <sub-header :micrositeUrl="micrositeUrl" />
        <div v-if="locations.length > 0" class="map_filter">
            <div class="maphighlight__box">
                  <h1 class="caption__select">
                  <span>Seleccione una privada, clic para ver detalles</span>
                </h1>
                <map-highlight v-for="(img, index) in imgSet" :key="img.width" :index="index" :img="img" :existFilter="existFilter" :desarrollo="desarrollo" :url="url" :nivel="nivel" :indicators="indicators" />
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
import SubHeader from "../../core/SubHeader.vue";
import MapHighlight from "../../core/MapHighlight";
import Select from "../../core/Select.vue";
import Availables from "../../core/Availables.vue";
import Button from "../../core/Button.vue";
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
            id: 53,
            nivel: "towerStageLevel",
            levelId: 0,
            desarrollo: "lomalta",
            arrFilteredLocations: [],
            url: "lomalta",
            micrositeUrl: "https://www.tresmarias.com.mx/lomalta/terrenos",
            imgSet: [{
                name: 'lomalta',
                url: 'https://kiritek-web-documents.s3.us-west-2.amazonaws.com/masterplan-dashboard/imgs/lomalta/MainLomAlta.png',
                width: '900',
                height: '719',
                id: 53,
                levelId: 0,
                route: 'lomalta',
                nivel: 'towerStageLevel',
                transform: '',
                viewBox: '0 0 948 899.78'
            }],
            indicators: [
                { id: 150, text: 'PRIVADA 1', transform: 'matrix(1.1092 0 0 1 1265.9661 1600.532)', cxB: 1248, cyB: 1591.7, rB: 15, cxW: 1248, cyW: 1591.7, rW: 6, x1: 1240.6, y1: 1591.7, x2: 1100.8, y2: 1582.8, status: true },
                { id: 153, text: 'PRIVADA 8', transform: 'matrix(1 0 0 1 800 255)', cxB: 785.71, cyB: 249.62, rB: 10.29, cxW: 785.71, cyW: 249.62, rW: 5.29, x1: 658, y1: 249.62, x2: 778, y2: 249.62, status: true },
                { id: 177, text: 'PRIVADA 5', transform: 'matrix(1 0 0 1 30 655)', cxB: 147.71, cyB: 646.62, rB: 10.29, cxW: 147.71, cyW: 646.62, rW: 5.29, x1: 158, y1: 646.62, x2: 258, y2: 646.62, status: true },
                { id: 198, text: 'PRIVADA 7', transform: 'matrix(1 0 0 1 830 445)', cxB: 815.71, cyB: 439.62, rB: 10.29, cxW: 815.71, cyW: 439.62, rW: 5.29, x1: 708, y1: 439.62, x2: 808, y2: 439.62, status: true },
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
            const filteredAvailables = this.existFilter;
            const newArrfiltered = filteredAvailables.filter(
                (item) => item.available > 0
            );
            return newArrfiltered;
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

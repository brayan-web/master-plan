<template>
    <div>
        <div class="line__vertical-mains"></div>
        <button-back />
        <div v-if="locations.length > 0" class="map_filter">
            <div class="maphighlight__box">
                <h1 class="caption__select">
                    <span>Seleccione un terreno, clic para ver detalles</span>
                </h1>
                <map-highlight :img="img" :existFilter="existFilter" :desarrollo="desarrollo" :url="url" :type="type" :nivel="nivel" />
                <Button :img="img" :id="id" :desarrollo="desarrollo" :nivel="nivel" :levelId="levelId" :url="url" />
                <div class="line_horizontal"></div>
                <Availables class="availables-mobile" :type="type" :existFilter="existFilter" :amountAvailables="amountAvailables" />
            </div>
            <div class="select__box">
                <Select v-if="locations.length > 0 && rangeFilter.length > 0" :locations="locations" @change="changeRange" :rangeFilter="rangeFilter" />
                <Availables class="availables-desk" :type="type" :existFilter="existFilter" :amountAvailables="amountAvailables" />
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import MapHighlight from "../../core/MapHighlight";
import ButtonBack from "../../core/ButtonBack";
import Button from "../../core/Button.vue";
import Availables from "../../core/Availables.vue";
import Select from "../../core/Select.vue";

export default {
    name: "Main",
    components: {
        MapHighlight,
        Button,
        ButtonBack,
        Availables,
        Select,
    },
    data() {
        return {
            id: 52,
            levelId: this.$route.params.id,
            type: "terreno",
            desarrollo: "canadas_terrenos-priv",
            arrFilteredLocations: [],
            nivel: "availability",
            url: `cve_nivel_te=${this.$route.params.id}/detalles`,
            micrositeUrl: "https://www.tresmarias.com.mx/senderos/terrenos",
            secciones: {
                SECCION3: {
                    name: "seccion3",
                    url: "https://kiritek-web-documents.s3.us-west-2.amazonaws.com/masterplan-dashboard/imgs/clubdegolf/secciones/seccion3.png",
                    width: "1590",
                    id: 52,
                    levelId: this.$route.params.id,
                    nivel: "availability",
                    route: `cve_nivel_te=${this.$route.params.id}/detalles`,
                    height: "1378",
                    transform: "",
                    viewBox: "0 0 1590 1378",
                },
                SECCION7GB: {
                    name: "seccion7gb",
                    url: "https://kiritek-web-documents.s3.us-west-2.amazonaws.com/masterplan-dashboard/imgs/clubdegolf/secciones/seccion7gb.png",
                    width: "1800",
                    id: 52,
                    levelId: this.$route.params.id,
                    nivel: "availability",
                    route: `cve_nivel_te=${this.$route.params.id}/detalles`,
                    height: "1455",
                    transform: "",
                    viewBox: "0 0 1800 1455",
                },
                SECCION8H: {
                    name: "seccion8h",
                    url: "https://kiritek-web-documents.s3.us-west-2.amazonaws.com/masterplan-dashboard/imgs/clubdegolf/secciones/seccion8h.png",
                    width: "1500",
                    id: 52,
                    levelId: this.$route.params.id,
                    nivel: "availability",
                    route: `cve_nivel_te=${this.$route.params.id}/detalles`,
                    height: "909",
                    transform: "",
                    viewBox: "0 0 1500 909",
                },
            },
            rangeFilter: [
                { min: 900, max: 1500 },
                { min: 1501, max: 3000 },
                { min: 3001, max: 5000 },
            ],
        };
    },
    computed: {
        ...mapGetters({
            locations: "getLocations",
            filterModelos: "getStatusFilterModelos",
        }),
        development() {
            return { id: this.id, level: this.levelId };
        },
        img() {
            const seccion = this.$route.params.seccion;
            const seccionSeleccionada = this.secciones[seccion];
            return seccionSeleccionada;
        },
        amountAvailables() {
            const filteredAvailables = this.existFilter;
            const newArrfiltered = filteredAvailables.filter(
                (item) => item.status == 2
            );
            return newArrfiltered;
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
    },
    methods: {
        ...mapActions(["getAvailableLocations", "clearCoords"]),
        changeRange(arrFilter) {
            this.arrFilteredLocations = arrFilter;
        },
    },
    async created() {
        await this.getAvailableLocations(this.development);
    },
    async beforeDestroy() {
        await this.clearCoords();
    },
    mounted() {},
};
</script>

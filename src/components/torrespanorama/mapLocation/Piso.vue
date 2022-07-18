<template>
    <div>
        <button-back/>
        <div v-if="locations.length > 0" class="map_filter">
            <div class="maphighlight__box">
                <h1 class="caption__select">
                    <span>{{img.name}}</span>
                    <span>Seleccione un departamento, clic para ver detalles</span>
                </h1>
                <map-highlight :img="img" :existFilter="existFilter" :desarrollo="desarrollo" :url="url" :type="type" :nivel="nivel" />
                <Button :img="img" :id="id" :desarrollo="desarrollo" :nivel="nivel" :levelId="levelId" :url="url" />
                <div class="line_horizontal"></div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import MapHighlight from "../../core/MapHighlight";
import ButtonBack from "../../core/ButtonBack";
import Button from "../../core/Button.vue";

export default {
    name: "Piso",
    components: {
        MapHighlight,
        Button,
        ButtonBack,
    },
    data() {
        return {
            id: 53,
            levelId: this.$route.params.idPiso,
            type: "departamentos",
            desarrollo: "torrespanorama",
            arrFilteredLocations: [],
            nivel: "availability",
            url: `nombre_nivel_te=${this.$route.params.piso}/detalles`,
            pisos: {
                PISO1: {
                    name: 'PISO 1',
                    url: 'https://kiritek-web-documents.s3.us-west-2.amazonaws.com/masterplan-dashboard/imgs/torrespanorama/pisos/PISO1.png',
                    width: '1080',
                    id: 53,
                    levelId: this.$route.params.idPiso,
                    nivel: 'availability',
                    route: `nombre_nivel_te=${this.$route.params.piso}/detalles`,
                    height: '470',
                    transform: '',
                    viewBox: '0 0 1080 470'
                },
                PISO2: {
                    name: 'PISO 2',
                    url: 'https://kiritek-web-documents.s3.us-west-2.amazonaws.com/masterplan-dashboard/imgs/torrespanorama/pisos/PISO2.png',
                    width: '1080',
                    id: 53,
                    levelId: this.$route.params.idPiso,
                    nivel: 'availability',
                    route: `nombre_nivel_te=${this.$route.params.piso}/detalles`,
                    height: '412',
                    transform: '',
                    viewBox: '0 0 1080 412'
                },
                PISO3: {
                    name: 'PISO 3',
                    url: 'https://kiritek-web-documents.s3.us-west-2.amazonaws.com/masterplan-dashboard/imgs/torrespanorama/pisos/PISO3.png',
                    width: '1080',
                    id: 53,
                    levelId: this.$route.params.idPiso,
                    nivel: 'availability',
                    route: `nombre_nivel_te=${this.$route.params.piso}/detalles`,
                    height: '412',
                    transform: '',
                    viewBox: '0 0 1080 412'
                },
                PISO4: {
                    name: 'PISO 4',
                    url: 'https://kiritek-web-documents.s3.us-west-2.amazonaws.com/masterplan-dashboard/imgs/torrespanorama/pisos/PISO4.png',
                    width: '1080',
                    id: 53,
                    levelId: this.$route.params.idPiso,
                    nivel: 'availability',
                    route: `nombre_nivel_te=${this.$route.params.piso}/detalles`,
                    height: '412',
                    transform: '',
                    viewBox: '0 0 1080 412'
                },
                PISO5: {
                    name: 'PISO 5',
                    url: 'https://kiritek-web-documents.s3.us-west-2.amazonaws.com/masterplan-dashboard/imgs/torrespanorama/pisos/PISO5.png',
                    width: '1080',
                    id: 53,
                    levelId: this.$route.params.idPiso,
                    nivel: 'availability',
                    route: `nombre_nivel_te=${this.$route.params.piso}/detalles`,
                    height: '416',
                    transform: '',
                    viewBox: '0 0 1080 416'
                },
                PISO6: {
                    name: 'PISO 6',
                    url: 'https://kiritek-web-documents.s3.us-west-2.amazonaws.com/masterplan-dashboard/imgs/torrespanorama/pisos/PISO6.png',
                    width: '1080',
                    id: 53,
                    levelId: this.$route.params.idPiso,
                    nivel: 'availability',
                    route: `nombre_nivel_te=${this.$route.params.piso}/detalles`,
                    height: '397',
                    transform: '',
                    viewBox: '0 0 1080 397'
                },
                PISO7: {
                    name: 'PISO 7',
                    url: 'https://kiritek-web-documents.s3.us-west-2.amazonaws.com/masterplan-dashboard/imgs/torrespanorama/pisos/PISO7.png',
                    width: '1080',
                    id: 53,
                    levelId: this.$route.params.idPiso,
                    nivel: 'availability',
                    route: `nombre_nivel_te=${this.$route.params.piso}/detalles`,
                    height: '397',
                    transform: '',
                    viewBox: '0 0 1080 397'
                },
            },
            // si no hay filtro volver rangeFilter a false
            rangeFilter: false,
            activeModel: "",
        };
    },
    computed: {
        ...mapGetters({
            locations: "getLocations",
            filterModelos: "getStatusFilterModelos"
        }),
        development() {
            return { id: this.id, level: this.levelId };
        },
        img() {
            const piso = this.$route.params.piso;
            const pisoSeleccionado = this.pisos[piso];
            return pisoSeleccionado;
        },
        amountAvailables() {
            const filteredAvailables = this.existFilter;
            const newArrfiltered = filteredAvailables.filter(
                (item) => item.status == 2
            );
            return newArrfiltered;
        },
        existFilter() {
            return this.locations
        },
    },
    methods: {
        ...mapActions(["getAvailableLocations", "clearCoords", "getFilterModelos"]),
        changeRange(arrFilter) {
            this.arrFilteredLocations = arrFilter;
        },
        updateActiveModel(model) {
            this.getFilterModelos(model);
        }
    },
    async created() {
        await this.getAvailableLocations(this.development);
        this.getFilterModelos(this.existFilter)
    },
    async beforeDestroy() {
        await this.clearCoords();
    },
    mounted() {

    }
};
</script>

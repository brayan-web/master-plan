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
            id: 48,
            levelId: this.$route.params.idPiso,
            type: "departamentos",
            desarrollo: "torreaireaplus",
            arrFilteredLocations: [],
            nivel: "availability",
            url: `nombre_nivel_te=${this.$route.params.piso}/detalles`,
            niveles: {
                NIVEL1: {
                    name: 'NIVEL 1',
                    url: 'https://kiritek-web-documents.s3.us-west-2.amazonaws.com/masterplan-dashboard/imgs/torreaireaplus/niveles/1N.png',
                    width: '1020',
                    id: 48,
                    levelId: this.$route.params.idPiso,
                    nivel: 'availability',
                    route: `nombre_nivel_te=${this.$route.params.piso}/detalles`,
                    height: '444',
                    transform: '',
                    viewBox: '0 0 1202 444'
                },
                NIVEL2: {
                    name: 'NIVEL 2',
                    url: 'https://kiritek-web-documents.s3.us-west-2.amazonaws.com/masterplan-dashboard/imgs/torreaireaplus/niveles/2N.png',
                    width: '1087',
                    id: 48,
                    levelId: this.$route.params.idPiso,
                    nivel: 'availability',
                    route: `nombre_nivel_te=${this.$route.params.piso}/detalles`,
                    height: '395',
                    transform: '',
                    viewBox: '0 0 1087 395'
                },
                NIVEL3: {
                    name: 'NIVEL 3',
                    url: 'https://kiritek-web-documents.s3.us-west-2.amazonaws.com/masterplan-dashboard/imgs/torreaireaplus/niveles/3N.png',
                    width: '1087',
                    id: 48,
                    levelId: this.$route.params.idPiso,
                    nivel: 'availability',
                    route: `nombre_nivel_te=${this.$route.params.piso}/detalles`,
                    height: '395',
                    transform: '',
                    viewBox: '0 0 1087 395'
                },
                NIVEL4: {
                    name: 'NIVEL 4',
                    url: 'https://kiritek-web-documents.s3.us-west-2.amazonaws.com/masterplan-dashboard/imgs/torreaireaplus/niveles/4N.png',
                    width: '1087',
                    id: 48,
                    levelId: this.$route.params.idPiso,
                    nivel: 'availability',
                    route: `nombre_nivel_te=${this.$route.params.piso}/detalles`,
                    height: '395',
                    transform: '',
                    viewBox: '0 0 1087 395'
                },
                NIVEL5: {
                    name: 'NIVEL 5',
                    url: 'https://kiritek-web-documents.s3.us-west-2.amazonaws.com/masterplan-dashboard/imgs/torreaireaplus/niveles/5N.png',
                    width: '1087',
                    id: 48,
                    levelId: this.$route.params.idPiso,
                    nivel: 'availability',
                    route: `nombre_nivel_te=${this.$route.params.piso}/detalles`,
                    height: '393',
                    transform: '',
                    viewBox: '0 0 1087 393'
                },
                NIVEL6: {
                    name: 'NIVEL 6',
                    url: 'https://kiritek-web-documents.s3.us-west-2.amazonaws.com/masterplan-dashboard/imgs/torreaireaplus/niveles/6N.png',
                    width: '1087',
                    id: 48,
                    levelId: this.$route.params.idPiso,
                    nivel: 'availability',
                    route: `nombre_nivel_te=${this.$route.params.piso}/detalles`,
                    height: '402',
                    transform: '',
                    viewBox: '0 0 1087 402'
                },
                NIVEL7: {
                    name: 'NIVEL 7',
                    url: 'https://kiritek-web-documents.s3.us-west-2.amazonaws.com/masterplan-dashboard/imgs/torreaireaplus/niveles/7N.png',
                    width: '1087',
                    id: 48,
                    levelId: this.$route.params.idPiso,
                    nivel: 'availability',
                    route: `nombre_nivel_te=${this.$route.params.piso}/detalles`,
                    height: '402',
                    transform: '',
                    viewBox: '0 0 1087 402'
                },
                NIVEL8: {
                    name: 'NIVEL 8',
                    url: 'https://kiritek-web-documents.s3.us-west-2.amazonaws.com/masterplan-dashboard/imgs/torreaireaplus/niveles/8N.png',
                    width: '1087',
                    id: 48,
                    levelId: this.$route.params.idPiso,
                    nivel: 'availability',
                    route: `nombre_nivel_te=${this.$route.params.piso}/detalles`,
                    height: '402',
                    transform: '',
                    viewBox: '0 0 1087 402'
                },
                NIVEL9: {
                    name: 'NIVEL 9',
                    url: 'https://kiritek-web-documents.s3.us-west-2.amazonaws.com/masterplan-dashboard/imgs/torreaireaplus/niveles/9N.png',
                    width: '1087',
                    id: 48,
                    levelId: this.$route.params.idPiso,
                    nivel: 'availability',
                    route: `nombre_nivel_te=${this.$route.params.piso}/detalles`,
                    height: '402',
                    transform: '',
                    viewBox: '0 0 1087 402'
                },
                NIVEL10: {
                    name: 'NIVEL 10',
                    url: 'https://kiritek-web-documents.s3.us-west-2.amazonaws.com/masterplan-dashboard/imgs/torreaireaplus/niveles/10N.png',
                    width: '1087',
                    id: 48,
                    levelId: this.$route.params.idPiso,
                    nivel: 'availability',
                    route: `nombre_nivel_te=${this.$route.params.piso}/detalles`,
                    height: '402',
                    transform: '',
                    viewBox: '0 0 1087 402'
                },
                NIVEL11: {
                    name: 'NIVEL 11',
                    url: 'https://kiritek-web-documents.s3.us-west-2.amazonaws.com/masterplan-dashboard/imgs/torreaireaplus/niveles/11N.png',
                    width: '1087',
                    id: 48,
                    levelId: this.$route.params.idPiso,
                    nivel: 'availability',
                    route: `nombre_nivel_te=${this.$route.params.piso}/detalles`,
                    height: '402',
                    transform: '',
                    viewBox: '0 0 1087 402'
                },
                NIVEL12: {
                    name: 'NIVEL 12',
                    url: 'https://kiritek-web-documents.s3.us-west-2.amazonaws.com/masterplan-dashboard/imgs/torreaireaplus/niveles/12N.png',
                    width: '1087',
                    id: 48,
                    levelId: this.$route.params.idPiso,
                    nivel: 'availability',
                    route: `nombre_nivel_te=${this.$route.params.piso}/detalles`,
                    height: '402',
                    transform: '',
                    viewBox: '0 0 1087 402'
                },
                NIVEL13: {
                    name: 'NIVEL 13',
                    url: 'https://kiritek-web-documents.s3.us-west-2.amazonaws.com/masterplan-dashboard/imgs/torreaireaplus/niveles/13N.png',
                    width: '1087',
                    id: 48,
                    levelId: this.$route.params.idPiso,
                    nivel: 'availability',
                    route: `nombre_nivel_te=${this.$route.params.piso}/detalles`,
                    height: '402',
                    transform: '',
                    viewBox: '0 0 1087 402'
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
            const nivel = this.$route.params.piso;
            const nivelSeleccionado = this.niveles[nivel];
            return nivelSeleccionado;
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

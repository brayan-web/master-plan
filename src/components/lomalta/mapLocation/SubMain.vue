<template>
  <div>
    <div class="line__vertical-mains"></div>
    <button-back/>
    <div v-if="locations.length > 0" class="map_filter">
      <div class="maphighlight__box">
          <h1 class="caption__select">
                  <span>Seleccione un terreno, clic para ver detalles</span>
                </h1>
        <map-highlight :img="img"
                       :existFilter="existFilter" :desarrollo="desarrollo" :url="url" :type="type"
                       :nivel="nivel"/>
        <Button :img="img" :id="id"
                :desarrollo="desarrollo" :nivel="nivel"  :levelId="levelId" :url="url"/>
        <div class="line_horizontal"></div>
        <Availables
            class="availables-mobile"
            :type="type"
            :existFilter="existFilter"
            :amountAvailables="amountAvailables"


        />
      </div>
      <div class="select__box">
        <Select
            v-if="locations.length > 0 && rangeFilter.length > 0"
            :locations="locations"
            @change="changeRange"
            :rangeFilter="rangeFilter"
        />
        <Availables
            class="availables-desk"
            :type="type"
            :existFilter="existFilter"
            :amountAvailables="amountAvailables"

        />
      </div>
    </div>
  </div>
</template>
<script>
import {mapActions, mapGetters} from "vuex";
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
    Select
  },
  data() {
    return {
      id: 47,
      levelId: this.$route.params.id,
      type: "terreno",
      desarrollo: "lomalta-priv",
      arrFilteredLocations: [],
      nivel: "availability",
      url: `nombre_nivel_te=${this.$route.params.privada}/detalles`,
      micrositeUrl: "https://www.tresmarias.com.mx/senderos/terrenos",
      privadas: {
        PRIVADA5: {
          name: 'privada5',
          url: 'https://kiritek-web-documents.s3.us-west-2.amazonaws.com/masterplan-dashboard/imgs/lomalta/privadas/privada5.png',
          width: '900',
          id: 47,
          levelId: this.$route.params.id,
          nivel: 'availability',
          route: `nombre_nivel_te=${this.$route.params.privada}/detalles`,
          height: '516',
          transform: '',
          viewBox: '0 0 900 516'
        },
        PRIVADA7: {
          name: 'privada7',
          url: 'https://kiritek-web-documents.s3.us-west-2.amazonaws.com/masterplan-dashboard/imgs/lomalta/privadas/privada7.png',
          width: '700',
          id: 47,
          levelId: this.$route.params.id,
          nivel: 'availability',
          route: `nombre_nivel_te=${this.$route.params.privada}/detalles`,
          height: '574',
          transform: '',
          viewBox: '0 0 700 574'
        },
        PRIVADA8: {
          name: 'privada8',
          url: 'https://kiritek-web-documents.s3.us-west-2.amazonaws.com/masterplan-dashboard/imgs/lomalta/privadas/privada8.png',
          width: '1000',
          id: 47,
          levelId: this.$route.params.id,
          nivel: 'availability',
          route: `nombre_nivel_te=${this.$route.params.privada}/detalles`,
          height: '1091',
          transform: '',
          viewBox: '0 0 1000 1091'
        },
      },
      rangeFilters:[
        { min: 92, max: 109.49 },
        { min: 112, max: 232.87 },
      ],
      rangeFilterPriv5:[
        { min: 137.06, max: 184.58 },
        { min: 203.60, max: 882.19 },
      ],
      rangeFilterPriv7:[
        { min: 120.80, max: 168.74 },
        { min: 175.26, max: 843.93 },
      ],
      rangeFilterPriv8:[
        { min: 115.34, max: 191.35 },
        { min: 192.21, max: 1350.10 },
      ],
    };
  },
  computed: {
    ...mapGetters({
      locations: "getLocations",
      filterModelos: "getStatusFilterModelos"
    }),
    development() {
      return {id: this.id, level: this.levelId};
    },
    img() {
      const privada = this.$route.params.privada;
      const privadaSeleccionada = this.privadas[privada];
      return privadaSeleccionada;
    },
    amountAvailables() {
      const filteredAvailables = this.existFilter;
      const newArrfiltered = filteredAvailables.filter(
          (item) => item.status == 2
      );
      return newArrfiltered;
    },
    rangeFilter(){
      let selectRangeFileter
      if(this.$route.params.id == 177){
        selectRangeFileter = this.rangeFilterPriv5
      }else if(this.$route.params.id == 198){
        selectRangeFileter = this.rangeFilterPriv7
      }else if(this.$route.params.id == 153){
        selectRangeFileter = this.rangeFilterPriv8
      }
      return selectRangeFileter
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
  mounted() {
    console.log(this.$route.params.id)
  }
};
</script>

<template>
  <div class="select__container">
    <h2 class="center-text select__container--title">
      Filtrar por M <sup>2</sup> de Terreno
    </h2>
    <select
      v-model="range"
      @change="changeRange"


    >
      <option value="" selected>Seleccione una opcion</option>
      <option value="all">TODOS</option>
      <option
        v-for="(range, index) in rangeFilter"
        :key="index"
        :value="{ min: range.min, max: range.max }"
      >
        {{ range.min }} m² a {{ range.max }} m²
      </option>
    </select>
    <font-awesome-icon class="arrow" :icon="closeIcon" />
  </div>
</template>

<script>
import {
  faSortDown,
} from "@fortawesome/free-solid-svg-icons";
export default {
  name: "SelectLocation",
  components:{
  },
  props: ["locations", "rangeFilter"],
  data() {
    return {
      range: "",
      closeIcon: faSortDown,

    };
  },
  computed: {
    filterLocations: function () {
      if (this.range === "") {
        return this.locations;
      } else {
        return this.filterLocationsByRange(this.locations);
      }
    },
  },

  methods: {
    changeRange() {
      this.$emit("change", this.filterLocations);
    },
    filterLocationsByRange: function (locations) {
      if (this.range === "all") {
        return locations;
      } else {
        return locations.filter((location) =>
          location.m2t >= this.range.min && location.m2t <= this.range.max
            ? location
            : ""
        );
      }
    },
  },
  mounted() {
    this.changeRange();
  
    
  },
};
</script>

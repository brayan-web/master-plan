<template>
  <div class="select__container">
    <h2 class="center-text select__container--title">
      Filtrar por Sección
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
          :value="{ name: range.name }"
      >
        {{ range.name }}
      </option>
    </select>
    <font-awesome-icon class="arrow" :icon="closeIcon"/>
  </div>
</template>
<script>
import {
  faSortDown,
} from "@fortawesome/free-solid-svg-icons";

export default {
  name: "SelectClub",
  components: {},
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
        return locations.filter((location) => location.type === this.range.name ? location
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

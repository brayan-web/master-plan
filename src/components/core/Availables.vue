<template>
<div>
  <availables-casas v-if="type === 'casas'" :setAmountAvailables="setAmountAvailables"/>
  <div v-else class="availables">
      <div class="availables__count">{{amountAvailables.length}}</div>
      <div class="availables__text">
        <h2>TERRENOS DISPONIBLES</h2>
      </div>
  </div>
</div>
</template>

<script>
import AvailablesCasas from "./AvailablesCasas";
export default {
    name: "Availables",
  components: {
    AvailablesCasas
  },
    props: ["amountAvailables", "type"],
    computed: {
      setAmountAvailables(){
        return this.amountAvailables
      }
    },
  mounted() {

  }
}
</script>

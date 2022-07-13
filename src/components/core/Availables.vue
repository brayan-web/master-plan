<template>
<div>
  <availables-casas v-if="type === 'casas'"  v-on="$listeners" :desarrollo="desarrollo"   :existFilter="existFilter" />
  <availables-deptos v-if="type === 'departamentos'"  v-on="$listeners"   :existFilter="existFilter" />
  <availables-privadas v-if="nivel === 'towerStage' || nivel === 'towerStageLevel'" :setAmountAvailables="setAmountAvailables"/>
  <div v-if="type === 'terreno'" class="availables">
      <div :class="changeColorCount" class="availables__count">{{amountAvailables.length}}</div>
      <div class="availables__text">
        <h2>TERRENOS DISPONIBLES</h2>
      </div>
  </div>
</div>
</template>

<script>
import AvailablesPrivadas from "./AvailablesPrivadas";
import AvailablesCasas from "./AvailablesCasas";
import AvailablesDeptos from "./AvailablesDeptos";
export default {
    name: "Availables",
  data() {
      return {


      }
  },
  components: {
    AvailablesPrivadas,
    AvailablesCasas,
    AvailablesDeptos
  },
    props: ["amountAvailables", "type", "existFilter", "nivel", "desarrollo"],
    computed: {
      setAmountAvailables(){
        return this.amountAvailables
      },
      changeColorCount() {
        if(this.setAmountAvailables >= 0){
          return 'count__unavailable'
        }else{
          return 'count__available'
        }
      },
    },
  methods: {



  },
  mounted() {

  }
}
</script>

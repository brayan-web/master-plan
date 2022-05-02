<template>
  <div class="tool">
    <div class="tool__header">
      <h1 class="tool__header--title">terreno</h1>
    </div>
    <div class="tool__content">
    <p>UBICACIÓN: <b>{{selected.name}}</b></p>
      <p>STATUS: <b :class="statusColor">{{selected.statusText}}</b></p>
      <p>M<sup>2</sup> DE TERRENO: <b>{{selected.m2t}}</b></p>
    </div>
    <div  class="btn__vermas--box">
      <a v-if="selected.status > 0" class="btn__vermas" href="">Ver más</a>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex"

export default {
    name: "Tooltip",
     computed:{
        ...mapGetters({
      selected: "getSelectedLocation"
    }),
       statusColor(){
         if(this.selected.status == 1 || (this.selected.status == 2)){
           return 'disponible';
         } else {
           if(this.selected.status == 3){
             return 'reservado';
           } else if(this.selected.status == 4){
             return 'bloqueado';
           }
         }
         return 'vendido';
       }
    }
}
</script>
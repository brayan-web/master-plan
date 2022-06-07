<template>
  <div class="tool">
    <div class="tool__header">
      <h1 class="tool__header--title">terreno</h1>
    </div>
    <div class="tool__content">
      <p>UBICACIÓN: <b>{{location.name}}</b></p>
      <p v-if="!location.statusText">DISPONIBLE: <b :class="statusColorPrivates">{{location.available}}</b></p>
      <p v-if="location.statusText">STATUS: <b :class="statusColor">{{location.statusText}}</b></p>
      <p v-if="location.m2t">M<sup>2</sup> DE TERRENO: <b>{{location.m2t}}</b></p>
    </div>
    <div  class="btn__vermas--box">
      <a v-if="location.status > 0" class="btn__vermas" href="">Ver más</a>
    </div>
  </div>
</template>

<script>


export default {
    name: "Tooltip",
    props:["location"],
  computed:{
    statusColor(){
      if(this.location.status == 1 || (this.location.status == 2)){
        return 'disponible';
      } else {
        if(this.location.status == 3){
          return 'reservado';
        } else if(this.location.status == 4){
          return 'bloqueado';
        }
      }
      return 'vendido';
    },
    statusColorPrivates(){
      if(this.location.available == 0){
        if(this.location.reserved == 0){
          return 'vendido';
        }else{
          return 'reservado';

        }
      }else{
        return 'disponible';

      }
    }
  }
}
</script>
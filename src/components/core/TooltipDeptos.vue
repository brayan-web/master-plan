<template>
  <div class="tool">
    <div class="tool__header">
      <h1 class="tool__header--title">departamento</h1>
    </div>
    <div class="tool__content">
      <p>UBICACIÓN: <b>{{location.name}}</b></p>
      <p v-if="!location.statusText">DISPONIBLE: <b class="disponible">{{location.available}}</b></p>
      <p v-if="!location.statusText">RESERVADO: <b class="reservado">{{location.reserved}}</b></p>
      <p v-if="!location.statusText">VENDIDO: <b class="vendido">{{location.unavailable}}</b></p>
    </div>
  </div>
</template>

<script>


export default {
  name: "TooltipDeptos",
  props:["location"],
  computed:{

  }
}
</script>
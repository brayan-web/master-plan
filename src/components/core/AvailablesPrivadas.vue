<template>
  <div class="availables__privates-box">
    <div v-for="(location, index) in setAmountAvailables" class="availables__privates" :key="index">
       <h2 class="availables__privates-title">{{location.name}}</h2>
       <div class="availables__privates-subtitle">
         <div class="count">{{location.available}}</div>
         <div class="text">
           <h2>DISPONIBLE</h2>
         </div>
     </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "AvailablesPrivadas",
  props: ["setAmountAvailables"]
}
</script>
<style scoped>
</style>
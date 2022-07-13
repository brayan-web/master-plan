<template>
  <div @click="goToMasterPlan(location.url)">
    {{location.type}}
  </div>
</template>
<script>
export default {
  name: "TooltipMapMain",
  props:["location"],
  methods: {
    goToMasterPlan(nameMicrositio){
      this.$router.push('/' + nameMicrositio)
    }
  }
}
</script>
<style scoped>
</style>
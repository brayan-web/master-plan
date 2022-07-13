<template>

 <fragment v-if="textIndicator">
   <text  :transform="indicator.transform" class="st1 st2" :class="[indicator.status == true ? activeClass :  desactiveClass]">
     {{indicator.text}}
   </text>
   <circle  :cx="indicator.cxB" :cy="indicator.cyB" :r="indicator.rB" :class="[indicator.status == true ? activeClass :  desactiveClass]"/>
   <circle   class="st0" :cx="indicator.cxW" :cy="indicator.cyW" :r="indicator.rW" :class="[indicator.status == true ? activeClass :  desactiveClass]"/>
   <line    class="st3" :x1="indicator.x1" :y1="indicator.y1" :x2="indicator.x2" :y2="indicator.y2" :class="[indicator.status == true ? activeClass :  desactiveClass]"/>
 </fragment>



</template>
<script>


export default {
  name: "Indicators",
  data() {
    return{
      activeClass: 'aparece',
      desactiveClass: 'desaparece',
      textIndicator: ""
    }
  },
  props: ["indicator", "filterMapAvaialbles"],
  computed: {
  },
  methods: {

  },
  mounted() {
   this.textIndicator = this.filterMapAvaialbles.find( location => location.name === this.indicator.text );
  }
}
</script>
<style scoped>
</style>
<template>

 <fragment >
  <!-- <text transform="matrix(1 0 0 1 426.1255 1319.479)" class="st1 st2">
     PRIVADA 16
   </text>
   <line   class="st3" x1="673" y1="1305" x2="828" y2="1307" />
   <circle   cx="656" cy="1304" r="20" />
   <circle   class="st0" cx="656.5" cy="1304.5" r="9.5" />-->

   <text :transform="indicator.transform" class="st1 st2" :class="[indicator.status == true ? activeClass :  desactiveClass]">
     {{indicator.text}}
   </text>
   <circle  :cx="indicator.cxB" :cy="indicator.cyB" :r="indicator.rB" :class="[indicator.status == true ? activeClass :  desactiveClass]"/>
   <circle   class="st0" :cx="indicator.cxW" :cy="indicator.cyW" :r="indicator.rW" :class="[indicator.status == true ? activeClass :  desactiveClass]"/>
   <line    class="st3" :x1="indicator.x1" :y1="indicator.y1" :x2="indicator.x2" :y2="indicator.y2" :class="[indicator.status == true ? activeClass :  desactiveClass]"/>

   <!--<circle  cx="265" cy="1013" r="20"/>
   <circle  class="st0" cx="265.5" cy="1013.5" r="9.5"/>
   <line  class="st3" x1="280" y1="1012" x2="418" y2="1014"/>
   <text  transform="matrix(1 0 0 1 40.1255 1025.479)" class="st1 st2">PRIVADA 21</text>

   <circle  cx="593" cy="1460" r="20"/>
   <circle  class="st0" cx="592.5" cy="1460.5" r="9.5"/>
   <line  class="st3" x1="610" y1="1460" x2="765" y2="1462"/>
   <text  transform="matrix(1 0 0 1 368.1255 1470.479)" class="st1 st2">PRIVADA 17</text>-->
 </fragment>



</template>
<script>
export default {
  name: "Indicators",
  data() {
    return{
      activeClass: 'aparece',
      desactiveClass: 'desaparece'
    }
  },
  props: ["indicator"],
  methods: {

  },
  mounted() {
  }
}
</script>
<style scoped>
</style>
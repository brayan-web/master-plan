<template>
 <div class="main__details">
   <main>
     <div class="item1 item">
      <detail-location/>
       <div class="line_horizontal"></div>
       <amenities-location/>
       <btn-recibir-info v-if="stateForm !== 0" @click="showFormRecibirInfo"/>
     </div>
     <div class="item2 item">
       <form-quote :stateForm="stateForm" @click="hiddeRecibirInfo"/>
     </div>
   </main>
 </div>
</template>

<script>

import DetailLocation from "../../core/datalocation/DetailLocation";
import AmenitiesLocation from "../../core/datalocation/AmenitiesLocation";
import FormQuote from "../../core/quotelocation/FormQuote";
import BtnRecibirInfo from "../../core/BtnRecibirInfo";
export default {
    name: "Main",
  data() {
      return{
        stateForm: 1
      }
  },
    components: {
      DetailLocation,
      AmenitiesLocation,
      BtnRecibirInfo,
      FormQuote
    },
    computed:{

    },
  methods: {
    showFormRecibirInfo(stateForm){
        console.log(stateForm)
      this.stateForm = stateForm;
    },
    hiddeRecibirInfo(stateForm){
      this.stateForm = stateForm;
          console.log(stateForm)
    }
  },
  mounted() {

  }
}
</script>
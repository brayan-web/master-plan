<template>
  <div class="main__details">
    <div class="icon__close-box">
      <font-awesome-icon class="icon__close" :icon="closeIcon" />
    </div>
    <main>
      <div class="item1 item">
        <detail-location/>
        <div class="line_horizontal"></div>
       <div v-if="stateForm == 2">
         <amenities-location/>
         <div class="buttons__box">
           <btn-quote @click="showFormQuote"/>
           <btn-recibir-info  @click="showFormRecibirInfo"/>
         </div>
       </div>
        <image-location class="image__location-small" v-else/>
      </div>
      <div class="item2 item">
        <image-location v-if="stateForm == 2"/>
        <form-quote v-else :stateForm="stateForm" @click="hiddeRecibirInfo"/>
      </div>
    </main>
  </div>
</template>

<script>
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import DetailLocation from "../../core/datalocation/DetailLocation";
import AmenitiesLocation from "../../core/datalocation/AmenitiesLocation";
import FormQuote from "../../core/quotelocation/FormQuote";
import BtnRecibirInfo from "../../core/BtnRecibirInfo";
import BtnQuote from "../../core/BtnQuote";
import ImageLocation from "../../core/datalocation/ImageLocation";
export default {
  name: "Main",
  data() {
    return{
      //estado 2 es la imagen 1 el cotizador y 0 recibir info
      stateForm: 2,
      closeIcon: faXmark,

    }
  },
  components: {
    DetailLocation,
    AmenitiesLocation,
    BtnRecibirInfo,
    FormQuote,
    ImageLocation,
    BtnQuote
  },
  computed:{

  },
  methods: {
    showFormRecibirInfo(stateForm){
      this.stateForm = stateForm;
    },
    showFormQuote(stateForm){
      this.stateForm = stateForm
    },
    hiddeRecibirInfo(stateForm){
      this.stateForm = stateForm;
    }
  },
  mounted() {

  }
}
</script>
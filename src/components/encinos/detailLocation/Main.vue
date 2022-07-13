<template>
  <div class="main__details">
    <div class="line__vertical"></div>
    <div @click="goBack()" class="icon__close-box">
      <font-awesome-icon class="icon__close" :icon="closeIcon" />
    </div>
    <main class="main__box" :class="columnReverse">
      <div class="item1 item">
        <div :class="showLineHorizontal"  class="line_horizontal-quote"></div>
        <detail-location/>
        <div :class="hideLineHorizontal" class="line_horizontal"></div>
        <div v-if="stateForm == 2">
          <amenities-location :amenitiesData="amenitiesData"/>
          <div class="buttons__box">
            <btn-quote @click="showFormQuote"/>
            <btn-recibir-info  @click="showFormRecibirInfo"/>
          </div>
        </div>
        <div v-else>
          <image-location class="image__location-small"  :typeImage="typeImage"/>
        </div>
      </div>
      <div class="item2 item">
        <image-location v-if="stateForm == 2" :typeImage="typeImage"/>
        <form-quote :desarrollo="desarrollo"  v-else :stateForm="stateForm" @click="hiddeRecibirInfo"/>
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
      //estado 2 es la imagen, 1 el cotizador y 0 recibir info
      stateForm: 2,
      closeIcon: faXmark,
      deviceWidth: 0,
      typeImage: "terreno",
      desarrollo: "Encinos",
      amenitiesData: [
        {
          icon: "https://kiritek-web-documents.s3.us-west-2.amazonaws.com/masterplan-dashboard/imgs/icons/vigilancia.svg",
          description: "Seguridad"
        },
        {
          icon: "https://kiritek-web-documents.s3.us-west-2.amazonaws.com/masterplan-dashboard/imgs/icons/social.svg",
          description: "Social Room"
        },
        {
          icon: "https://kiritek-web-documents.s3.us-west-2.amazonaws.com/masterplan-dashboard/imgs/icons/areasverdes.svg",
          description: "Rodeada del área natural más grande de la ciudad"
        },
        {
          icon: "https://kiritek-web-documents.s3.us-west-2.amazonaws.com/masterplan-dashboard/imgs/icons/Acc_tag_terrenos.svg",
          description: "Caseta de control de accesos con Tag de Seguridad"
        },
        {
          icon: "https://kiritek-web-documents.s3.us-west-2.amazonaws.com/masterplan-dashboard/imgs/icons/circuitocerrado.svg",
          description: "Circuito Cerrado"
        },
        {
          icon: "https://kiritek-web-documents.s3.us-west-2.amazonaws.com/masterplan-dashboard/imgs/icons/juegosinfantiles.svg",
          description: "Juegos Infantiles"
        },
        {
          icon: "https://kiritek-web-documents.s3.us-west-2.amazonaws.com/masterplan-dashboard/imgs/icons/club.svg",
          description: "Casa Club"
        },
        {
          icon: "https://kiritek-web-documents.s3.us-west-2.amazonaws.com/masterplan-dashboard/imgs/icons/snack.svg",
          description: "Snack and Coffee"
        },
        {
          icon: "https://kiritek-web-documents.s3.us-west-2.amazonaws.com/masterplan-dashboard/imgs/icons/gym.svg",
          description: "Gimnasio"
        },
        {
          icon: "https://kiritek-web-documents.s3.us-west-2.amazonaws.com/masterplan-dashboard/imgs/icons/vistapanoramica.svg",
          description: "Vistas Panorámicas"
        },
        {
          icon: "https://kiritek-web-documents.s3.us-west-2.amazonaws.com/masterplan-dashboard/imgs/icons/alberca.svg",
          description: "Alberca y Chapoteadero"
        },
        {
          icon: "https://kiritek-web-documents.s3.us-west-2.amazonaws.com/masterplan-dashboard/imgs/icons/pets.svg",
          description: "Pet Friendly"
        },
      ]

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
    columnReverse(){
      if(this.deviceWidth <= 1200){
        if (this.stateForm == 1 || this.stateForm == 0){
          return 'main-reverse'
        }
      }else {
        return 'main__box'
      }
      return 'main__box'
    },
    hideLineHorizontal(){
      if(this.deviceWidth <= 1200){
        if (this.stateForm == 1 || this.stateForm == 0){
          return 'hide__line'
        }
      }
      return ''
    },
    showLineHorizontal(){
      if(this.deviceWidth <= 1200){
        if (this.stateForm == 1 || this.stateForm == 0){
          return 'show__line'
        }
      }
      return ''
    }
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
    },
    goBack(){
      this.$router.go(-1)
    },
    getWidthWindow() {
      this.deviceWidth = window.innerWidth;
    },
  },
  mounted() {
    this.columnReverse;
  },
  created(){
    this.deviceWidth = innerWidth;
    window.addEventListener("resize", this.getWidthWindow);
  },
  destroyed() {
    window.removeEventListener("resize", this.getWidthWindow);

  },
}
</script>
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
        <div>
          <amenities-location/>
          <div class="buttons__box">
            <btn-quote v-if="stateForm == 0"  @click="showFormQuote"/>
            <btn-recibir-info v-if="stateForm == 1"  @click="showFormRecibirInfo"/>
          </div>
        </div>
      </div>
      <div class="item2 item">
        <form-quote  :stateForm="stateForm" @click="hiddeRecibirInfo"/>
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
export default {
  name: "Main",
  data() {
    return{
      //estado 2 es la imagen, 1 el cotizador y 0 recibir info
      stateForm: 1,
      closeIcon: faXmark,
      deviceWidth: 0

    }
  },
  components: {
    DetailLocation,
    AmenitiesLocation,
    BtnRecibirInfo,
    FormQuote,
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
      stateForm = 1;
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
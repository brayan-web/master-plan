<template>
<div class="image__location--box u__padding">

<div v-if="loading" class="loading__box">
  <div class="loading show">
    <div class="spin"></div>
  </div>
</div>
  <div v-else>
    <div class="image__container"  v-for="(image, imageIndex) in items" :key="imageIndex" @click="index = imageIndex">
      <div class="icon__glass-container" @click="index = imageIndex" >
        <font-awesome-icon class="icon__glass" :icon="iconGlass" />
      </div>
      <img  class="image__location" :src="image.src" :alt="image.title">
    </div>
  </div>

  <CoolLightBox
      :items="items"
      :index="index"
      :useZoomBar="true"
      @close="index = null">
  </CoolLightBox>

</div>
</template>

<script>
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import {mapActions, mapGetters} from "vuex"

export default {
  name: "ImageLocation",
  props: ["typeImage", "urlImg"],
  data() {
    return{
      planta: true,
      plantaF: false,
      plantaUrl: "https://kiritek-web-documents.s3.us-west-2.amazonaws.com/masterplan-dashboard/imgs/ca%C3%B1adas/casas/modelos/ENCINO.jpeg",
      iconGlass: faMagnifyingGlass,
      baseUrl: 'https://kiritek-web-documents.s3.us-west-2.amazonaws.com/masterplan-dashboard/imgs/',
      id: "",
      items: [],
      modelos : [],
      index: null
    }
  },
  computed: {
    ...mapGetters({
      selected : 'getSelectedLocation',
      urlImage: 'getUrlImageLocation',
      loading: 'getStatusLoading'
    }),
    development(){
      return { id: this.id }
    },
    formatImage(){
      let formato;
      if(this.urlImg === 'bosques/casas/modelos'){
        formato = '.png'
      }else{
        formato = '.jpeg'
      }
      return formato;
    },
    typeModel(){
      let src;
      if(this.typeImage === "modeloCasas"){
        src = `https://kiritek-web-documents.s3.us-west-2.amazonaws.com/masterplan-dashboard/imgs/${this.urlImg}/${this.selected.type}${this.formatImage}`
      }else if(this.typeImage === "modeloDeptos"){
        src = `https://kiritek-web-documents.s3.us-west-2.amazonaws.com/masterplan-dashboard/imgs/${this.urlImg}/${this.selected.imagePrototype}`
      }else if(this.typeImage === 'modeloDeptosTP'){
        src = `${this.urlImg}/${this.selected.imagePrototype}`
      }
      return src
    },


  },
  methods: {
      ...mapActions(["getAvailableImageLocation"])
  },
 async created(){
   this.id = this.selected.id;
   if(this.typeImage === "terreno"){
     await this.getAvailableImageLocation(this.development);
     this.items.push({
       title: this.selected.name,
       src: this.urlImage
     })
   }else{
     this.items.push({
       title: this.selected.name,
       src : this.typeModel
     })
   }
  },
  mounted() {

  },
  beforeDestroy(){

  }
}
</script>

<style>
:root {
  --animate-duration: 800ms;
  --animate-delay: 0.9s;
}
.quick {
  transition-duration: "0ms" !important;
}
</style>
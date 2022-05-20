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
      <img class="image__location" :src="image.src" alt="">
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
  data() {
    return{
      iconGlass: faMagnifyingGlass,
      id: "",
      items: [

      ],
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

  },
  methods: {
      ...mapActions(["getAvailableImageLocation"])
  },
 async created(){
   this.id = this.selected.id;
   await this.getAvailableImageLocation(this.development);
   this.items.push({
     title: this.selected.name,
     src: this.urlImage
   })
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
<template>
  <div id="app">
    <transition enter-active-class="animated animate__fadeIn" leave-active-class="animated animate__fadeOut" mode="out-in">
    <router-view/>
    </transition>

    <div @click="closeModal()" v-if="modal" class="modal__overlay">

    </div>

    <transition   enter-active-class="animate__animated animate__fadeIn quick"
                  leave-active-class="animate__animated animate__fadeOut quick"
                  mode="out-in"
                  appear
                  appear-active-class="animate__animated animate__fadeIn">
      <div v-if="modal" class="modal">
        <iframe class=" modal__frame" :src="urlVideo"
                allowfullscreen></iframe>
      </div>
    </transition>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex"
export default{
  name: "App",
  data(){
    return{
      showModal: false
    }
  },
  computed: {
    ...mapGetters({
      modal: "getStatusToggleModal",
      urlVideo: "getStatusUrlVide"
    })
  },
  methods: {
    ...mapActions(["getToggleModal"]),
    closeModal(){
      this.getToggleModal()
    }
  }
}
</script>
<style lang="scss">

@import './scss/main.scss';
:root {
  --animate-duration: 800ms;
  --animate-delay: 0.9s;
}
.quick {
  transition-duration: "0ms" !important;
}
</style>

<template>
  <div>
    <Header :logoUrl="logoUrl" :desarrollo="desarrollo"/>
    <transition
        enter-active-class="animate__animated animate__fadeIn quick"
        leave-active-class="animate__animated animate__fadeOut quick"
        mode="out-in"
        appear
        appear-active-class="animate__animated animate__fadeIn"
    >
      <router-view />
    </transition>
    <Footer />
  </div>
</template>

<script>
import Header from "../core/Header";
import Footer from "../core/Footer.vue";
export default {
  name: "Bosques",
  data() {
    return {
      desarrollo: "bosques",
      logoUrl: "https://kiritek-web-documents.s3.us-west-2.amazonaws.com/masterplan-dashboard/imgs/bosques/terrenoLogo/bosques_logo.png",
    };
  },
  components: {
    Header,
    Footer,
  },
};
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

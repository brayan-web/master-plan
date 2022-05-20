<template>
  <div class="heading__primary">
<span class="heading__primary-btn">
  <router-link to="/">
<a href="#" class="btn__text">Volver al plan maestro</a>
  
  </router-link>

</span>
<span class="heading__primary-btn">
<a href="" @click.prevent="goToMicrosite()" target="_blank" class="btn__text">Ir al micrositio</a>

</span>

  </div>
</template>

<script>
export default {
  name: "SubHeader",
  props: ["micrositeUrl"],
  methods: {
    goToMicrosite(){
      window.open(this.micrositeUrl, "_blank")
    }
  }
};
</script>

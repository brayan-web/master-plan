<template>
  <div class="button__back-box ">
    <font-awesome-icon @click="back()" class="icon__back" :icon="backIcon" />
    <div>
     <h2 @click="back()" class="back__title">volver</h2>
    </div>
  </div>
</template>
<script>
import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";
export default {
  name: "ButtonBack",
  data() {
    return {
      backIcon: faCircleArrowLeft,

    }
  },
  components: {

  },
  methods: {
    back(){
      this.$router.back(-1)
    }
  }
}
</script>
<template>
    <div class="btn_box">
        <a @click.prevent="openMap()" class="btn__view-plan" href="">ver plano a detalle</a>
    </div>
</template>

<script>
import  { mapActions, mapGetters } from "vuex"
export default {
    name: "Button",
    data() {
        return {
        }
    },
    props: ["img"],
  computed: {
      ...mapGetters({
      })
  },
    methods: {
      ...mapActions(["getDataImageMap", "getMapDetail"]),
        openMap(){
          this.getMapDetail();
          this.getDataImageMap(this.img);
        },
        mounted() {

        },
    },
}
</script>
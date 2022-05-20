<template>
<div class="btn_box">
  <a href="" @click.prevent="showFormRecibirInfo" class="btn btn__recibir--info">recibir información</a>
</div>
</template>

<script>
export default {
  name: "BtnRecibirInfo",
  data() {
    return {
      formRecibirInfo: 0
    }
  },
  methods: {
    showFormRecibirInfo(){

      this.$emit('click', this.formRecibirInfo)
    }
  }
}
</script>


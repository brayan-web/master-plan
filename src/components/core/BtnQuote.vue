<template>
  <div class="btn_box">
    <a href="" @click.prevent="showFormQuote" class="btn btn__quote">Cotizar</a>
  </div>
</template>

<script>
export default {
  name: "BtnQuote",
  data() {
    return{
      formQuote: 1

    }
  },
  methods: {
    showFormQuote(){
      this.$emit('click', this.formQuote)
    }
  }
}
</script>


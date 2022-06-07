<template>
    <div class="detail__quote-content" :class="content">
      <div @click="updateActivePlan" class="radio__button" :class="fillActive"></div>
      <h5 @click="updateActivePlan"  class="radio__text-primary">
        <span class="radio__text-primary-main">{{text}}</span>
        <span v-if="interes > 0" class="radio__text-primary-sub">{{interes}}% interes</span>
      </h5>
    </div>
</template>

<script>
  export default {
    name: "RadioButtonQuote",
    props:["text", "interes", "content", "activePlan", "value"],
    computed: {
      fillActive() {
        if(this.activePlan === this.value){
          return 'fillRadio'
        }
        return 'radio__button'
      }

    },
    methods: {
      updateActivePlan(){
        this.$emit('onUpdatePlan', this.value, this.interes)
      }
    }
  }

</script>
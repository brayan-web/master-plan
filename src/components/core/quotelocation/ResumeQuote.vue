<template>
  <div class="resume__quote-content">
    <h2 class="resume__quote-subtitle">Detalle de cotización</h2>
    <div class="radio__button-box">
      <radio-button-quote @onUpdatePlan="updateActivePlan" :activePlan="activePlan" content="content1" value="12" interes="9" text="12 meses"/>
      <radio-button-quote @onUpdatePlan="updateActivePlan"  :activePlan="activePlan" content="content2" value="24" interes="12" text="24 meses"/>
      <radio-button-quote @onUpdatePlan="updateActivePlan"  :activePlan="activePlan" content="content3" value="36" interes="14" text="36 meses"/>
      <radio-button-quote @onUpdatePlan="updateActivePlan"  :activePlan="activePlan" content="content4" value="60" interes="14" text="60 meses"/>

      <!--solo mostrar en desarrollos que cuenten con este plan (lomalta)
      <radio-button-quote content="content5" value="constructor" interes="0" text="plan contructor"/>
      <radio-button-quote content="content6" value="casa" interes="0" text="plan construye tu casa"/>-->

    </div>
  </div>
</template>
<script>
import RadioButtonQuote from "./RadioButtonQuote";

export default {
  name: "ResumeQuote",
  data(){
    return {
      activePlan: ""
    }
  },
  components: {
    RadioButtonQuote
  },
  methods: {
    updateActivePlan(plan){
        this.activePlan = plan;
    }
  }
}
</script>
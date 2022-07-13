<template>
  <div class="resume__quote-content">
    <h2 class="resume__quote-subtitle">Detalle de cotización</h2>
    <div class="radio__button-box">
      <radio-button-quote :class="disabled" @onUpdatePlan="updateActivePlan" :activePlan="activePlan" content="content1"
                          value="12" :interes="9" text="12 meses"/>
      <radio-button-quote :class="disabled" @onUpdatePlan="updateActivePlan" :activePlan="activePlan" content="content2"
                          value="24" :interes="12" text="24 meses"/>
      <radio-button-quote :class="disabled" @onUpdatePlan="updateActivePlan" :activePlan="activePlan" content="content3"
                          value="36" :interes="14" text="36 meses"/>
      <radio-button-quote :class="disabled" @onUpdatePlan="updateActivePlan" :activePlan="activePlan" content="content4"
                          value="60" :interes="14" text="60 meses"/>
      <!--solo mostrar en desarrollos que cuenten con este plan (lomalta)
      <radio-button-quote content="content5" value="constructor" interes="0" text="plan contructor"/>
      <radio-button-quote content="content6" value="casa" interes="0" text="plan construye tu casa"/>-->
    </div>
    <div class="btn_box">
      <a href="" :class="disabled" @click.prevent="_getFinancial()"
         class="btn btn__resume">{{ (loaderFinancial == true ? 'cotizando...' : 'cotizar') }}</a>
    </div>
    <div class="line_horizontal"></div>
    <loader-resume v-if="loaderFinancial"/>
    <div class="content__resume" v-if="resumeBox">
      <h2 class="content__resume-subtitle">Resumen</h2>
      <p>Precio menos el 20% de enganche: <span>${{ formatValue(financial.financedAmount) }}</span></p>
      <p>Monto del enganche (20% del valor del inmueble): <span>${{ formatValue(financial.advanceAmount) }}</span></p>
      <p>Monto a financiar con interés:
        <span>${{ formatValue(financial.interestAmount + financial.financedAmount) }}</span></p>
      <p>Interés ({{ interes }}%): <span>${{ formatValue(financial.interestAmount) }}</span></p>
      <p>Parcialidades: <span>${{ formatValue(financial.partialAmount) }}</span></p>
      <p class="consulta"><span>*Consulta nuestras promociones de 12 meses sin intereses</span></p>
    </div>
    <div class="btn__box">
      <a :class="disabled" href="" @click.prevent="updateStepper" class="btn btn__back">atras</a>
      <a v-if="resumeBox" @click.prevent="_sendFinancial()" href="" class="btn btn__send">enviar</a>
    </div>
  </div>
</template>
<script>
import RadioButtonQuote from "./RadioButtonQuote";
import LoaderResume from "./LoaderResume";
import {mapActions, mapGetters} from "vuex"
import Swal from "sweetalert2";

export default {
  name: "ResumeQuote",
  data() {
    return {
      activePlan: "12",
      interes: "9",
      name: "",
      lastName: "",
      email: "",
      cp: "",
      stepper: 2,
      spin: false,
      resumeBox: false,
      reset: 2,
      value: 'I am the child.'
    }
  },
  props: ["user", "onResetQuote"],
  components: {
    RadioButtonQuote,
    LoaderResume
  },
  computed: {
    ...mapGetters({
      selected: 'getSelectedLocation',
      financial: 'getSelectedStatusFinancial',
      loaderFinancial: 'getStatusLoadingFinancial'
    }),
    disabled() {
      if (this.loaderFinancial) {
        return 'btn__disabled'
      } else {
        return ''
      }
    }
  },
  methods: {
    ...mapActions(["getFinancial", "sendFinancial"]),
    async _getFinancial() {
      this.resumeBox = false;
      try {
        let financialData = {
          locationId: this.selected.id,
          months: this.activePlan,
        };
        await this.getFinancial(financialData)
      } catch (e) {
        console.log(e)
      } finally {
        this.resumeBox = true;
      }
    },
    async _sendFinancial() {
      try {
        Swal.fire({
          icon: "success",
          title: "Mensaje enviado correctamante",
          text: "La cotizacion te la enviaremos en breve al correo electronico que proporcionaste en el paso anterior.",
          confirmButtonColor: "#14274a",
          allowOutsideClick: false,
          confirmButtonText: "OK",
          showClass: {
            popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
          }
        }).then(() => {
          this.onResetQuote()
        });
        await this.sendFinancial({
          locationId: this.selected.id,
          email: this.email,
          customerName: `${this.name} ${this.lastName}`,
          months: this.activePlan,
          city: this.cp,
        });
      } catch (e) {
        console.log(e)
        Swal.fire({
          icon: "error",
          title: "Ha ocurrido un error, intente mas tarde",
          confirmButtonColor: "#822013",
          allowOutsideClick: false,
          confirmButtonText: "OK",
          showClass: {
            popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
          }
        }).then(() => {
          this.onResetQuote()
        })
      }
    },
    formatValue(value) {
      let val = (value / 1).toFixed(2).replace('.', ',')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    },
    updateActivePlan(plan, interes) {
      this.activePlan = plan;
      this.interes = interes;
      this._getFinancial()
    },
    updateStepper() {
      this.$emit('onUpdateStepper', this.stepper -= 1)
    },
   userElements(element) {
      this.name = element.name;
      this.lastName = element.lastName;
      this.email = element.email;
      this.cp = element.cp;
    }
  },
  mounted() {
    this.user.forEach(this.userElements);
  }
}
</script>
<template>
  <div class="form__location--box u__padding">
    <h1 class="form__title">{{ (stateForm == 0 ? 'FORMULARIO PARA INFORMACIÓN' : 'Cotizar') }}</h1>
    <p class="form__ubication">Ubicaciòn: <span>{{ selected.name }}</span></p>
    <div class="form__content-inputs" v-if="stepper == 1">
      <h2 class="form__subtitle">Datos personales</h2>
      <div class="form">
        <input v-model="name" type="text" id="name" class="form__input" autocomplete="off"
               :class="{'invalid__input':  $v.name.$error}" placeholder=" ">
        <font-awesome-icon v-if="$v.name.$error" class="icon__error-input" :icon="errorInput"/>
        <font-awesome-icon v-if="!$v.name.$invalid" class="icon__success-input" :icon="successInput"/>
        <validation-error message="Introduzca su nombre" type="required" :validation="$v.name"/>
        <label for="name" class="form__label" :class="{'invalid__label':  $v.name.$error}">Nombre</label>
      </div>
      <div v-if="stateForm !== 0" class="form">
        <input v-model="lastName" type="text" id="lastName" class="form__input" autocomplete="off"
               :class="{'invalid__input':  $v.lastName.$error}" placeholder=" ">
        <font-awesome-icon v-if="$v.lastName.$error" class="icon__error-input" :icon="errorInput"/>
        <font-awesome-icon v-if="!$v.lastName.$invalid" class="icon__success-input" :icon="successInput"/>
        <validation-error message="Introduzca su apellido" type="required" :validation="$v.lastName"/>
        <label for="lastName" class="form__label" :class="{'invalid__label':  $v.lastName.$error}">Apellido</label>
      </div>
      <div class="form">
        <input v-model="email" type="text" id="mail" class="form__input" autocomplete="off"
               :class="{'invalid__input':  $v.email.$error}" placeholder=" ">
        <font-awesome-icon v-if="$v.email.$error" class="icon__error-input" :icon="errorInput"/>
        <font-awesome-icon v-if="!$v.email.$invalid" class="icon__success-input" :icon="successInput"/>
        <validation-error message="Introduzca su correo" type="required" :validation="$v.email"/>
        <label for="mail" class="form__label">Correo</label>
      </div>
      <div class="form">
        <input v-model="telephone" type="text" v-mask="'(###) ###-##-##'" id="telephone" class="form__input"
               autocomplete="off" :class="{'invalid__input':  $v.telephone.$error}" placeholder=" ">
        <font-awesome-icon v-if="$v.telephone.$error" class="icon__error-input" :icon="errorInput"/>
        <font-awesome-icon v-if="!$v.telephone.$invalid" class="icon__success-input" :icon="successInput"/>
        <validation-error message="Introduzca su telefono" type="required" :validation="$v.telephone"/>
        <label for="telephone" class="form__label" :class="{'invalid__label':  $v.telephone.$error}">Telefono</label>
      </div>
      <div class="form">
        <input v-model="cp" type="text" v-mask="'#####'" id="cp" class="form__input" autocomplete="off"
               :class="{'invalid__input':  $v.cp.$error}" placeholder=" ">
        <font-awesome-icon v-if="$v.cp.$error" class="icon__error-input" :icon="errorInput"/>
        <font-awesome-icon v-if="!$v.cp.$invalid" class="icon__success-input" :icon="successInput"/>
        <validation-error message="Introduzca su codigo postal" type="required" :validation="$v.cp"/>
        <label for="cp" class="form__label" :class="{'invalid__label':  $v.cp.$error}">Codigo postal</label>
      </div>
      <div class="btn_box">
        <a href="" @click.prevent="next()" class="btn btn__enviar">{{ textButton }}</a>
      </div>
      <div class="btn_box">
        <a href="" @click.prevent="hiddeRecibirInfo" class="btn btn__cancel">cancelar</a>
      </div>
    </div>
    <resume-quote :onResetQuote="onResetQuote" :user="user" @onUpdateStepper="updateStepper" v-if="stepper == 2"/>
  </div>
</template>
<script>
import {required, helpers, minLength, email,} from "vuelidate/lib/validators";
import ValidationError from "../ValidationError";
import {mapGetters, mapActions} from "vuex";
import {faCircleExclamation, faCheck} from "@fortawesome/free-solid-svg-icons";
import {mask} from "vue-the-mask";
import ResumeQuote from "./ResumeQuote"
import Swal from "sweetalert2";

const alpha = helpers.regex("alpha", /^[A-Za-z\s\w´'\u00f1\u00d1\u00E0-\u00FC][^0-9^$%&=?¿()<>{};!¡¨Ç*+|ª@#¢∞¬÷“”≠,:_\r/\r[]*$/
);
export default {
  name: "FormQuote",
  components: {
    ValidationError,
    ResumeQuote
  },
  data() {
    return {
      formQuote: 2,
      name: "Brayan",
      lastName: "Sandoval",
      email: "brayan@gmail.com",
      telephone: "7861127450",
      cp: "61110",
      contactType: "Mensaje",
      message: "Solicitud de información desde plan maestro de Lindavista terrenos",
      subbmited: false,
      errorInput: faCircleExclamation,
      successInput: faCheck,
      stepper: 1,
      user: []
    }
  },
  props: ["stateForm", "typeImage", "desarrollo"],
  computed: {
    ...mapGetters({
      selected: 'getSelectedLocation',
      dataImg: "getStatusDataImageMap",
    }),
    state() {
      return this.formQuote;
    },
    textButton() {
      let textType;
      if (this.stateForm == 0 || this.typeImage === 'modeloDeptos' || this.typeImage === 'modeloCasas') {
        textType = 'enviar'
      } else {
        textType = 'siguiente'
      }
      return textType;
    }
  },
  methods: {
    ...mapActions(["sendInfoMessage", "sendFinancial"]),
    hiddeRecibirInfo() {
      this.$emit('click', this.state)
    },
    next() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        if (this.stateForm == 0) {
          this.sendMoreInfoMessage()
        }else if(this.typeImage === 'modeloDeptos' ||  this.typeImage === 'modeloCasas'){
          this.sendCotizacion()
        }else {
          this.stepper += 1;
          let users = {
            name: this.name,
            lastName: this.lastName,
            email: this.email,
            telephone: this.telephone,
            cp: this.cp,
          }
          this.user.push(users)
        }
      } else {
        //console.log("no validado")
      }
    },
    async sendMoreInfoMessage() {
      try {
        await this.sendInfoMessage({
          name: this.name,
          telefono: this.telephone,
          email: this.email,
          codigoPostal: this.cp,
          desarrollo: this.desarrollo + " " + this.selected.name,
          contactType: this.contactType,
          message: `Solicitud de información desde plan maestro de ${this.desarrollo} terrenos`,
        });
        Swal.fire({
          icon: "success",
          title: "Mensaje enviado correctamante",
          text: "En un momento recibirás un correo con la información solicitada.",
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
        })
      } catch (e) {
        console.log(e);
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

    async sendCotizacion(){
        try {
          Swal.fire({
            icon: "success",
            title: "Mensaje enviado correctamante",
            text: "la cotizacion te la enviaremos al correo electronico que proporcionaste en el paso anterior.",
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
            city: this.cp,
          });
        }catch (e){
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
    updateStepper(step) {
      this.stepper = step;
    },
    onResetQuote() {
      this.hiddeRecibirInfo();
    }
  },
  mounted() {

  },
  validations: {
    name: {
      required,
      alpha,
      minLength: minLength(3)
    },
    lastName: {
      required,
      alpha,
      minLength: minLength(3)
    },
    telephone: {
      required,
      minLength: minLength(15)
    },
    email: {
      required,
      email
    },
    cp: {
      required,
      minLength: minLength(5)
    }
  },
  directives: {
    mask
  },
}
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
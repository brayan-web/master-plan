<template>
  <div class="main__details">
    <div class="line__vertical"></div>
    <div @click="goBack()" class="icon__close-box">
      <font-awesome-icon class="icon__close" :icon="closeIcon"/>
    </div>
    <main class="main__box" :class="columnReverse">
      <div class="item1 item">
        <div :class="showLineHorizontal" class="line_horizontal-quote"></div>
        <detail-location :amenitiesData="amenitiesData"/>
        <div :class="hideLineHorizontal" class="line_horizontal"></div>
        <div v-if="stateForm == 2">
          <amenities-location/>
          <div class="buttons__box">
            <btn-quote @click="showFormQuote"/>
            <btn-recibir-info v-if="stateForm == 1" @click="showFormRecibirInfo"/>
          </div>
        </div>
        <div v-else>
          <image-location class="image__location-small" :typeImage="typeImage" :urlImg="urlImg"/>
        </div>
      </div>
      <div class="item2 item">
        <image-location v-if="stateForm == 2" :typeImage="typeImage" :urlImg="urlImg"/>
        <form-quote :desarrollo="desarrollo" :typeImage="typeImage" v-else :stateForm="stateForm"
                    @click="hiddeRecibirInfo"/>
      </div>
    </main>
  </div>
</template>
<script>
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import DetailLocation from "../../core/datalocation/DetailLocation";
import AmenitiesLocation from "../../core/datalocation/AmenitiesLocation";
import FormQuote from "../../core/quotelocation/FormQuote";
import BtnRecibirInfo from "../../core/BtnRecibirInfo";
import BtnQuote from "../../core/BtnQuote";
import ImageLocation from "../../core/datalocation/ImageLocation";

export default {
  name: "Main",
  data() {
    return {
      //estado 2 es la imagen, 1 el cotizador y 0 recibir info
      stateForm: 2,
      closeIcon: faXmark,
      deviceWidth: 0,
      typeImage: "modeloDeptos",
      desarrollo: "Torres Paseo del Parque",
      urlImg: 'torrespasodelparque/modelos',
      amenitiesData: [
        {
          icon: "https://kiritek-web-documents.s3.us-west-2.amazonaws.com/masterplan-dashboard/imgs/icons/barda.svg",
          description: "Totalmente bardeado"
        },
        {
          icon: "https://kiritek-web-documents.s3.us-west-2.amazonaws.com/masterplan-dashboard/imgs/icons/areasverdes.svg",
          description: "Areas verdes y Lagos"
        },
        {
          icon: "https://kiritek-web-documents.s3.us-west-2.amazonaws.com/masterplan-dashboard/imgs/icons/vistapanoramica.svg",
          description: "Vistas panorámicas"
        },
        {
          icon: "https://kiritek-web-documents.s3.us-west-2.amazonaws.com/masterplan-dashboard/imgs/icons/terraza.svg",
          description: "Terraza social"
        },
        {
          icon: "https://kiritek-web-documents.s3.us-west-2.amazonaws.com/masterplan-dashboard/imgs/icons/pets.svg",
          description: "Pet friendly"
        },
        {
          icon: "https://kiritek-web-documents.s3.us-west-2.amazonaws.com/masterplan-dashboard/imgs/icons/ciclopista.svg",
          description: "Ciclopista a lo largo de la vialidad"
        },
        {
          icon: "https://kiritek-web-documents.s3.us-west-2.amazonaws.com/masterplan-dashboard/imgs/icons/circuitocerrado.svg",
          description: "Circuito Cerrado las 24 horas del día"
        },
        {
          icon: "https://kiritek-web-documents.s3.us-west-2.amazonaws.com/masterplan-dashboard/imgs/icons/Acc_tag_terrenos.svg",
          description: "Caseta de control con acceso a través de tag de seguridad"
        },
      ]
    }
  },
  components: {
    DetailLocation,
    AmenitiesLocation,
    BtnRecibirInfo,
    FormQuote,
    ImageLocation,
    BtnQuote
  },
  computed: {
    columnReverse() {
      if (this.deviceWidth <= 1200) {
        if (this.stateForm == 1 || this.stateForm == 0) {
          return 'main-reverse'
        }
      } else {
        return 'main__box'
      }
      return 'main__box'
    },
    hideLineHorizontal() {
      if (this.deviceWidth <= 1200) {
        if (this.stateForm == 1 || this.stateForm == 0) {
          return 'hide__line'
        }
      }
      return ''
    },
    showLineHorizontal() {
      if (this.deviceWidth <= 1200) {
        if (this.stateForm == 1 || this.stateForm == 0) {
          return 'show__line'
        }
      }
      return ''
    }
  },
  methods: {
    showFormRecibirInfo(stateForm) {
      this.stateForm = stateForm;
    },
    showFormQuote(stateForm) {
      this.stateForm = stateForm
    },
    hiddeRecibirInfo(stateForm) {
      this.stateForm = stateForm;
    },
    goBack() {
      this.$router.go(-1)
    },
    getWidthWindow() {
      this.deviceWidth = window.innerWidth;
    },
  },
  mounted() {
    this.columnReverse;
  },
  created() {
    this.deviceWidth = innerWidth;
    window.addEventListener("resize", this.getWidthWindow);
  },
  destroyed() {
    window.removeEventListener("resize", this.getWidthWindow);
  },
}
</script>
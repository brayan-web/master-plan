<template>
  <div class="main__details">
    <div class="line__vertical"></div>
    <div @click="goBack()" class="icon__close-box">
      <font-awesome-icon class="icon__close" :icon="closeIcon" />
    </div>
    <main class="main__box" :class="columnReverse">
      <div class="item1 item">
        <div :class="showLineHorizontal" class="line_horizontal-quote"></div>
        <detail-location />
        <div :class="hideLineHorizontal" class="line_horizontal"></div>
        <div>
          <amenities-location :amenitiesData="amenitiesData" />
          <div class="buttons__box">
            <btn-quote v-if="stateForm == 0" @click="showFormQuote" />
            <btn-recibir-info
              v-if="stateForm == 1"
              @click="showFormRecibirInfo"
            />
          </div>
        </div>
      </div>
      <div class="item2 item">
        <form-quote
          :desarrollo="desarrollo"
          :stateForm="stateForm"
          @click="hiddeRecibirInfo"
        />
      </div>
    </main>
  </div>
</template>

<script>
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import DetailLocation from "../../core/datalocation/DetailLocation";
import AmenitiesLocation from "../../core/datalocation/AmenitiesLocation";
import FormQuote from "../../core/quotelocation/FormQuote";
import BtnRecibirInfo from "../../core/BtnRecibirInfo";
import BtnQuote from "../../core/BtnQuote";
export default {
  name: "Main",
  data() {
    return {
      //estado 2 es la imagen, 1 el cotizador y 0 recibir info
      stateForm: 1,
      closeIcon: faXmark,
      deviceWidth: 0,
      desarrollo: "Club de Golf Tres Marías",
      amenitiesData: [
        {
          icon: "https://kiritek-web-documents.s3.us-west-2.amazonaws.com/masterplan-dashboard/imgs/icons/club.svg",

          description: "Casa Club",
        },
        {
          icon: "https://kiritek-web-documents.s3.us-west-2.amazonaws.com/masterplan-dashboard/imgs/icons/privacidad.svg",

          description: "Privacidad",
        },
        {
          icon: "https://kiritek-web-documents.s3.us-west-2.amazonaws.com/masterplan-dashboard/imgs/icons/Acc_huella_terrenos.svg",

          description: "Control de acceso por huella digital",
        },
        {
          icon: "https://kiritek-web-documents.s3.us-west-2.amazonaws.com/masterplan-dashboard/imgs/icons/vistapanoramica.svg",

          description: "Majestuosas Vistas",
        },
        {
          icon: "https://kiritek-web-documents.s3.us-west-2.amazonaws.com/masterplan-dashboard/imgs/icons/casetaTag.svg",

          description: "Acceso seguro y ágil de visitantes con App MyFrac",
        },
        {
          icon: "https://kiritek-web-documents.s3.us-west-2.amazonaws.com/masterplan-dashboard/imgs/icons/Acc_tag_terrenos.svg",

          description: "Control de acceso por lector de tag",
        },
        {
          icon: "https://kiritek-web-documents.s3.us-west-2.amazonaws.com/masterplan-dashboard/imgs/icons/metros2.svg",

          description:
            " Exclusivos lotes residenciales desde 1,000m² hasta 30,000m²",
        },
        {
          icon: "https://kiritek-web-documents.s3.us-west-2.amazonaws.com/masterplan-dashboard/imgs/icons/club.svg",

          description: "Campo de Golf con 27 hoyos diseñado por Jack Nicklaus",
        },
        {
          icon: "https://kiritek-web-documents.s3.us-west-2.amazonaws.com/masterplan-dashboard/imgs/icons/pets.svg",

          description: "Pet Friendly",
        },
      ],
    };
  },
  components: {
    DetailLocation,
    AmenitiesLocation,
    BtnRecibirInfo,
    FormQuote,
    BtnQuote,
  },
  computed: {
    columnReverse() {
      if (this.deviceWidth <= 1200) {
        if (this.stateForm == 1 || this.stateForm == 0) {
          return "main-reverse";
        }
      } else {
        return "main__box";
      }
      return "main__box";
    },
    hideLineHorizontal() {
      if (this.deviceWidth <= 1200) {
        if (this.stateForm == 1 || this.stateForm == 0) {
          return "hide__line";
        }
      }
      return "";
    },
    showLineHorizontal() {
      if (this.deviceWidth <= 1200) {
        if (this.stateForm == 1 || this.stateForm == 0) {
          return "show__line";
        }
      }
      return "";
    },
  },
  methods: {
    showFormRecibirInfo(stateForm) {
      this.stateForm = stateForm;
    },
    showFormQuote(stateForm) {
      this.stateForm = stateForm;
    },
    hiddeRecibirInfo(stateForm) {
      stateForm = 1;
      this.stateForm = stateForm;
    },
    goBack() {
      this.$router.go(-1);
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
};
</script>

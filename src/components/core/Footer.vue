<template>
    <div class="footer__bg-custom">
        <footer class="footer">
            <div class="footer__direccion">
                <h3 class="footer__direccion-title-main">Tres Marías</h3>
                <h4 class="footer__direccion-title-sub">Av. Tres Marías No. 600 - Fracc Tres Marías, Morelia, Michoacán, México - C.P. 58254</h4>
            </div>
    
            <div class="footer__contacto">
                <h3 class="footer__contacto-heading">
                    <span class="footer__contacto-heading-main">Oficina Ventas</span>
                    <span class="footer__contacto-heading-sub">+52 (443) 340 49 49 ó 01 (800) 223 627 427</span>
                </h3>
                <h3 class="footer__contacto-heading">
                    <span class="footer__contacto-heading-main">WhatsApp</span>
                    <span class="footer__contacto-heading-sub">+52 (443) 170 78 78</span>
                </h3>
            </div>
    
            <div class="footer__line">
                <div class="footer__line-left"></div>
                <div class="footer__line-right"></div>
            </div>
    
            <div class="footer__options">
                <div class="footer__options-descargas">
                    <a v-if="urlVideo" @click.prevent="openModal()" class="footer__options-descargas--btn" href="">Videos de desarrollo</a>
                    <a v-if="brochureUrl" @click.prevent="openBrochure()" class="footer__options-descargas--btn u__margin-left" href="">Descarga Brochure</a>
                </div>
                <div class="footer__options-terminos">
                    <a @click="openTerm()"  class="footer__options-descargas--btn" href="">Términos y condiciones</a>
                    <span class="footer__options-descargas--txt u__margin-left">2022 Tres Marías</span>
                </div>
            </div>
    
            <div class="footer__devby">
                <span>Desarrollado por Kiritek</span>
            </div>
    
    
    
        </footer>
    
    </div>
</template>

<script>
import { mapActions } from "vuex"

export default {
    name: "Footer",
    props: ["urlVideo", "brochureUrl"],
    data() {
        return {
            urlTerm: 'https://tresmarias.com.mx/terms',

        }
    },
    methods: {
        ...mapActions(["getToggleModal", "getUrlVide"]),
        openModal() {
            this.getUrlVide(this.urlVideo)
            this.getToggleModal();
        },
        openBrochure() {
            window.open(this.brochureUrl, "_blank")
        },
        openTerm() {
            window.open(this.urlTerm, "_self")
        },
    }
}
</script>
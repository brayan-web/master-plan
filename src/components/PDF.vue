<template>
    <div>
        <button @click="Print" class="btn btn-primary">Imprimir</button>
        <pdf v-if="show" ref="pdf" src="/7eb5c325-2437-4df3-83b9-23a5de766ebb.pdf" :page="page" :rotate="rotate"    @num-pages="numPages = $event" @link-clicked="page = $event"></pdf>
    </div>
</template>

<script>
import pdf from 'vue-pdf'
// import printJS from 'print-js'
export default {
    components: {
        pdf
    },
    data() {
        return {
            src: '',
            show: true,
            urlPdf: "../assets/img/core/7eb5c325-2437-4df3-83b9-23a5de766ebb.pdf",
            page: 1,
            numPages: 0,
            rotate: 0,
            url: "https://cdn.jsdelivr.net/gh/mozilla/pdf.js@c6e8ca86/test/pdfs/annotation-link-text-popup.pdf"
        }
    },
    computed:{
       
    },
    mounted() {

    },
    methods: {
            Print(){
                this.$refs.pdf.print()
            }
    }
}
</script>
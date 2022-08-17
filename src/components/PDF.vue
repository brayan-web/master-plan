
<template>
    <div>
    
        <!-- <button class="btn btn-success" @click="printWindow()">Print</button> -->
        <button class="btn btn-primary mt-5" @click="imprimir()">IMPRIMIR PDF</button>
        <button class="btn btn-primary mt-5" @click="imprimirTest()">IMPRIMIR TEST</button>
        <div style="width: 50%">
            <pdf v-if="show" ref="pdf" style="border: 1px solid red" :src="src" :page="page" :rotate="rotate" @progress="loadedRatio = $event" @num-pages="numPages = $event" @link-clicked="page = $event"></pdf>
        </div>
    
        <div style="width: 50%">
            <pdf v-if="show" ref="pdfTest" style="border: 1px solid red" :src="srcTest" :page="page" :rotate="rotate" @progress="loadedRatio = $event" @num-pages="numPages = $event" @link-clicked="page = $event"></pdf>
        </div>
    </div>
</template>

<script>
import pdf from 'vue-pdf'

export default {
    components: {
        pdf: pdf
    },
    data() {
        return {
            show: true,
            src: '/files/7eb5c325-2437-4df3-83b9-23a5de766ebb.pdf',
            srcTest: 'https://cdn.jsdelivr.net/gh/mozilla/pdf.js@c6e8ca86/test/pdfs/annotation-link-text-popup.pdf',
            loadedRatio: 0,
            page: 1,
            numPages: 0,
            rotate: 0,
        }
    },
    mounted() {
       
        // that.src.promise.then(pdf => {
        //   that.numPages = pdf.numPages;
        // });
    },
    methods: {
        // password: function(updatePassword) {

        //     updatePassword(prompt('password is "test"'));
        // },
        // error: function(err) {

        //     console.log(err);
        // },
        imprimir() {

            setTimeout(this.$refs.pdf.print(), 1000);


        },
        imprimirTest() {

            setTimeout(this.$refs.pdfTest.print(), 1000);


        },
        // isMobile() {
        //     if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        //         return true
        //     } else {
        //         return false
        //     }
        // },
        printWindow: function() {
            setTimeout(window.print(), 1000)
        }
    }
}
</script>
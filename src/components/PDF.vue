<template>
    <div style="background: #000; height: 100vh">
        <button class="btn" @click="imprimir">IMPRIMIR PRINTJS</button>
        <button class="btn" @click="imprimir">IMPRIMIR NATIVO</button>
    </div>
</template>

<script>
// import print from 'print-js'
import printJS from 'print-js'
export default {
    components: {
       
    },
    data() {
        return {
            url: "https://cdn.jsdelivr.net/gh/mozilla/pdf.js@c6e8ca86/test/pdfs/annotation-link-text-popup.pdf"
        }
    },
    methods: {
      imprimir(){
        printJS(this.url)
      },
       imprimirNativo(){
        window.print(printJS(this.url))
      }
    }
}
</script>
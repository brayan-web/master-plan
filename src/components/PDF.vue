<template>
    <div>
        <button class="btn btn-primary" @click="downoaldPdf()">descarga local</button>
      <iframe id="reportBGID" src="/files/7eb5c325-2437-4df3-83b9-23a5de766ebb.pdf" width="100%" frameborder="0"></iframe>
    </div>
</template>

<script>


export default {
    components: {

    },
    data() {
        return {
            dataUrl: 'https://cdn.rawgit.com/mozilla/pdf.js/c6e8ca86/test/pdfs/freeculture.pdf'
        }
    },
    computed: {

    },
    mounted() {},
    methods: {
        downoaldPdf() {
           document.getElementById("reportBGID").contentWindow.print()
        }
    }
}
</script>
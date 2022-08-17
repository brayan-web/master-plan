<template>
    <div>
        <button @click="$refs.pdf.print()">print</button>
        <iframe src="/files/7eb5c325-2437-4df3-83b9-23a5de766ebb.pdf" frameborder="0"></iframe>
        <h1>File</h1>
        <vue-pdf-embed ref="pdf" :source="src" />
    </div>
</template>

<script>
// import pdf from 'vue-pdf'
import VuePdfEmbed from 'vue-pdf-embed/dist/vue2-pdf-embed'
export default {
    components: {
        // pdf: pdf
        VuePdfEmbed,
    },
    data() {
        return {
            // show: true,
            // pdfList: [
            // 	'',
            // 	'/files/7eb5c325-2437-4df3-83b9-23a5de766ebb.pdf',

            // ],
            src: '/files/7eb5c325-2437-4df3-83b9-23a5de766ebb.pdf',
            // loadedRatio: 0,
            // page: 1,
            // numPages: 0,
            // rotate: 0,
        }
    },
    methods: {
        // password: function(updatePassword) {

        // 	updatePassword(prompt('password is "test"'));
        // },
        // error: function(err) {

        // 	console.log(err);
        // }
    }
}
</script>
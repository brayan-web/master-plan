
<template>
    <div>
 
        <button class="btn btn-success" @click="printWindow()">Print</button>
        <!-- <button class="btn btn-primary mt-5" @click="window.print()">print</button>
        <div style="width: 50%">
            <pdf v-if="show" ref="pdf" style="border: 1px solid red" :src="src" :page="page" :rotate="rotate" @password="password" @progress="loadedRatio = $event" @error="error" @num-pages="numPages = $event" @link-clicked="page = $event"></pdf>
        </div> -->
    </div>
</template>

<script>
// import pdf from 'vue-pdf'

export default {
    components: {
        // pdf: pdf
    },
    data() {
        return {
            // show: true,
            // src: '/files/09a343eb-987e-45c1-a0b4-8810a81e71d6',
            // loadedRatio: 0,
            // page: 1,
            // numPages: 1,
            // rotate: 0,
        }
    },
    methods: {
        // password: function(updatePassword) {

        //     updatePassword(prompt('password is "test"'));
        // },
        // error: function(err) {

        //     console.log(err);
        // },
        // imprimir() {
        //     alert("hola")
        //     if (navigator.userAgent.toLowerCase().indexOf('chrome') > -1) {
        //         window.location.reload();
        //         setTimeout(this.$refs.pdf.print(), 1000);

        //     }
        // },
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
<template>
    <div>
        <Header :logoUrl="logoUrl" />
        <transition enter-active-class="animate__animated animate__fadeIn quick" leave-active-class="animate__animated animate__fadeOut quick" mode="out-in" appear appear-active-class="animate__animated animate__fadeIn">
            <router-view />
        </transition>
        <Footer :urlVideo="urlVideo" :brochureUrl="brochureUrl" />
    </div>
</template>

<script>
import Header from "../core/Header";
import Footer from "../core/Footer.vue";
export default {
    name: "Encinos",
    data() {
        return {
            logoUrl: "https://kiritek-web-documents.s3.us-west-2.amazonaws.com/masterplan-dashboard/imgs/encinos/terrenoLogo/encinos_logo.svg",
            brochureUrl: 'https://tresmarias.s3-us-west-2.amazonaws.com/assets/brochure/Encinos.pdf',
            urlVideo: 'https://tresmarias.s3.us-west-2.amazonaws.com/videos/44.mp4'
        };
    },
    components: {
        Header,
        Footer,
    },
};
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

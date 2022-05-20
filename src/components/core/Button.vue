<template>
    <div class="btn_box">
        <a @click.prevent="openMap()" class="btn__view-plan" href="">ver plano a detalle</a>
    </div>
</template>

<script>

export default {
    name: "Button",
    data() {
        return {
        }
    },
    props: ["id", "img", "desarrollo"],
    methods: {
        openMap(){   
            let idDev = this.id;


            this.$router.push({ name: 'detalle', params: {desarrollo: this.desarrollo, id: idDev, url: this.img.url, width:this.img.width, height: this.img.height } })
        
        },
        mounted() {
        },
    },
}
</script>
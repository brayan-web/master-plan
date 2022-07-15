<template>
    <div @click="goToMasterPlan(location)">
        {{location.type}}
    </div>
</template>

<script>
export default {
    name: "TooltipMapMain",
    props: ["location"],
    methods: {
        goToMasterPlan(location) {
            let type = location.type
            switch (type) {
                case 'sitio web':
                    window.open(location.url);
                    break;
                default:
                    this.$router.push('/' + location.url)

            }
        },


    }
}
</script>

<style scoped>

</style>
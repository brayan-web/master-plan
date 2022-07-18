<template>
    <div class="availables__deptos-box">
        <div class="availables__deptos-title">
            <div :class="changeColorCount" class="count">{{ availables.length }}</div>
            <div class="text">
                <h2>DEPARTAMENTOS DISPONIBLE</h2>
            </div>
        </div>
        <div class="box__availables__deptos-buttons">
            <div class="availables__deptos-buttons">
                <!-- <div @click="showAllModels()" :class="fillAll" class="availables__casas-buttons-btn"></div> -->
                <div class="availables__casas-buttons-text">
                  <font-awesome-icon :class="fillAll" @click="showAllModels()" :icon="iconCircle" class="availables__deptos-buttons-btn" />TODOS

                </div>
            </div>
        </div>


        <div class="box__availables__deptos-buttons">
            <div class="availables__deptos-buttons" v-for="(model, index) in setModels" :key="index">
                <!-- <div @click="updateActiveModel(model)" :class="fillActive(model)" class="availables__casas-buttons-btn"></div> -->
                  <div class="availables__deptos-buttons-text" >
                    <font-awesome-icon :class="fillActive(model)" @click="updateActiveModel(model)" :icon="iconCircle" class="availables__deptos-buttons-btn" />{{ model.name }}</div>
    
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"
import {
    faCircle,

} from "@fortawesome/free-solid-svg-icons";
export default {
    name: "AvailablesDeptos",
    props: ["existFilter", "activeModel"],
    data() {
        return {
            fillAll: "active__btn-deptos",
            mutateModel: "",
            iconCircle: faCircle
        }
    },
    computed: {
        ...mapGetters({
            filterModelos: "getStatusFilterModelos"
        }),
        setModels() {
            let personasMap = this.existFilter.map((item) => {
                return [item.name, item];
            });
            var personasMapArr = new Map(personasMap);
            return [...personasMapArr.values()];
        },
        availables() {
            return this.filterModelos.filter((i) => i.available > 0)
        },
        changeColorCount() {
            if (this.available >= 0) {
                return 'count__unavailable'
            } else {
                return 'count__available'
            }
        },




    },
    methods: {
        ...mapActions(["getFilterModelos"]),
        updateActiveModel(model) {
            let typeModel;
            let arrModel;
            typeModel = model.name
            arrModel = this.existFilter.filter((i) => i.name === typeModel)
            this.$emit('onUpdateModel', arrModel)

            this.mutateModel = model.name;
            this.fillAll = '';


        },
        showAllModels() {
            this.getFilterModelos(this.existFilter)
            this.fillAll = 'active__btn-casas'
            this.mutateModel = ''


        },
        fillActive(model) {
            if (this.mutateModel === model.name) {
                return 'active__btn-deptos'
            } else {
                return 'desactive__btn-casas'
            }
        },

    },
    created() {},
    updated() {}
}
</script>

<style scoped>

</style>
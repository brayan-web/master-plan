<template>
    <div class="detail__location--box u__padding">
        <h1 class="detail__title u__padding--title">Datos del inmueble</h1>
        <div class="detail__content">
            <p>Ubicacíon: <span>{{selected.name}}</span></p>
            <p>Estatus: <b :class="statusColor">{{selected.statusText}}</b></p>
            <p>Tipo: <span>{{selected.type}}</span></p>
            <p v-if="selected.m2t">M² de terreno: <span>{{selected.m2t}}</span></p>
            <p v-if="selected.m2c">M² de contruscción <span>{{selected.m2c}}</span></p>
            <p>Precio: <span>${{formatValue(selected.value)}}</span></p>
            <p v-if="typeImage">Monto Enganche: <span>${{formatValue(amountEnganche)}}</span></p>
    
        </div>
    
    </div>
</template>

<script>
import { mapGetters } from "vuex"

export default {
    name: "DetailLocation",
    props: ["typeImage"],
    data() {
        return {
            amountEnganche: ""
        }
    },
    computed: {
        ...mapGetters({
            selected: 'getSelectedLocation'
        }),
        statusColor() {
            if (this.selected.status == 1 || (this.selected.status == 2)) {
                return 'disponible';
            } else {
                if (this.selected.status == 3) {
                    return 'reservado';
                } else if (this.selected.status == 4) {
                    return 'bloqueado';
                }
            }
            return 'vendido';
        }
    },
    methods: {
        formatValue(value) {
            let val = (value / 1).toFixed(2).replace('.', ',')
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        },
        montoEnganche() {
            this.amountEnganche = this.selected.value * 20 / 100;
        },
    },
    mounted() {
        this.montoEnganche()
    }

}
</script>
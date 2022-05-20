<template>
  <div class="amenities__location--box u__padding">
    <h1 class="amenities__title u__padding--title">Amenities</h1>
    <div class="amenities__content">

      <div class="flexContainer" v-for="(amenitie, index) in amenitiesData" :key="index">
            <div class="customIcon">
                <img :src="amenitie.icon" :alt="amenitie.description">
            </div>
            <div class="customSpan">
              {{amenitie.description}}
            </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
      name: "AmenitiesLocation",
      data(){
        return{
          amenitiesData:[
            {icon: "https://kiritek-web-documents.s3.us-west-2.amazonaws.com/masterplan-dashboard/imgs/icons/salon.svg", description: "Salón de Usos Múltiples"},
            {icon: "https://kiritek-web-documents.s3.us-west-2.amazonaws.com/masterplan-dashboard/imgs/icons/ciclopista.svg", description: "Ciclopista"},
            {icon: "https://kiritek-web-documents.s3.us-west-2.amazonaws.com/masterplan-dashboard/imgs/icons/nucleobanos.svg", description: "Núcleo de baños"},
            {icon: "https://kiritek-web-documents.s3.us-west-2.amazonaws.com/masterplan-dashboard/imgs/icons/alberca.svg", description: "Alberca y Chapoteadero"},
            {icon: "https://kiritek-web-documents.s3.us-west-2.amazonaws.com/masterplan-dashboard/imgs/icons/areasverdes.svg", description: "Áreas verdes"},
            {icon: "https://kiritek-web-documents.s3.us-west-2.amazonaws.com/masterplan-dashboard/imgs/icons/pets.svg", description: "Pet Friendly"},
            {icon: "https://kiritek-web-documents.s3.us-west-2.amazonaws.com/masterplan-dashboard/imgs/icons/trotapista.svg", description: "Trotapista"},
            {icon: "https://kiritek-web-documents.s3.us-west-2.amazonaws.com/masterplan-dashboard/imgs/icons/gym.svg", description: "Gimnasio"},
            {icon: "https://kiritek-web-documents.s3.us-west-2.amazonaws.com/masterplan-dashboard/imgs/icons/administracion.svg", description: "Administración"},
            {icon: "https://kiritek-web-documents.s3.us-west-2.amazonaws.com/masterplan-dashboard/imgs/icons/snack.svg", description: "Snack bar & coffee"},
            {icon: "https://kiritek-web-documents.s3.us-west-2.amazonaws.com/masterplan-dashboard/imgs/icons/Acc_tag_terrenos.svg", description: "Control de acceso por lector de tag"},
          ]
        }
      }
}
</script>
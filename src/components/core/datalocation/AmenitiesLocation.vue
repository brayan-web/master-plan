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
  props: ["amenitiesData"],
      data(){
        return{

        }
      }
}
</script>
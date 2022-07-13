<template>
        <header  class="header">
            <div v-if="desarrollo !== 'torrespanorama'" class="header__logo-box-tm">
              <router-link to="/">
                <img src="../../assets/img/core/logo-tm.png" alt="logo-tm" class="header__logo-box-tm-img">
              </router-link>
            </div>
            <div class="header__logo-box-development" :class="sizeLogo">
                <img :src="logoUrl" alt="logo-development" class="header__logo-box-development-img">
            </div>
        </header>
</template>

<script>
export default {
    name: "Header",
    props: ["logoUrl", "desarrollo"],
    computed: {
      sizeLogo(){
       let  classWidth
        if(this.desarrollo === 'bosques'){
          classWidth = 'header__logo-box-bosques'
        }else{
          classWidth = 'header__logo-box-development'
        }
        return classWidth
      }
    }
  
}
</script>


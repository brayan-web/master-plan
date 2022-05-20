<template>
        <header  class="header">
            <div class="header__logo-box-tm">
              <router-link to="/">
                <img src="../../assets/img/core/logo-tm.png" alt="logo-tm" class="header__logo-box-tm-img">
              </router-link>
            </div>
            <div class="header__logo-box-development">
                <img :src="logoUrl" alt="logo-development" class="header__logo-box-development-img">
            </div>
        </header>
</template>

<script>
export default {
    name: "Header",
    props: ["logoUrl"]
  
}
</script>


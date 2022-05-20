<template>
    <div>
        <h1>Home</h1>
        <router-link to="/lindavista">
        <a href="">lindavista</a>
        </router-link><br>
         <router-link to="/alamos">
        <a href="">alamos</a>
        </router-link>
      <router-link to="/senderos">
        <a href="">senderos</a>
      </router-link>
    </div>
</template>

<script>
export default {
    name: "Home"
}
</script>
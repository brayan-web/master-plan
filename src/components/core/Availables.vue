<template>
<div class="availables">
    <div class="availables__count">{{amountAvailables.length}}</div>
    <div class="availables__text">
        <h2>terrenos disponibles</h2>
      
    </div>
</div>
</template>

<script>
export default {
    name: "Availables",
    props: ["amountAvailables"],
    computed: {
        
    }
}
</script>

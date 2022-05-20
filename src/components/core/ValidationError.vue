<template>
  <div v-if="show" class="validation__error-box">
    <span v-for="m in messages" v-bind:key="m">*{{ m }}</span>
  </div>
</template>

<script>
export default {
  name: "ValidationError",
  props: ["validation", "message", "type"],
  computed: {
    show() {
      return this.validation.$dirty && this.validation.$invalid
    },
    messages() {
      let messages = [];
      if (this.validation.$dirty) {
        if (this.hasValidationError("required")) {
          if (this.message && this.type === 'required') {
            messages.push(this.message);
          } else {
            messages.push("Introduzca el campo solicitado");
          }
        } else if (this.hasValidationError("email")) {
          messages.push("Introduzca un email válido");
        } else if (this.hasValidationError("alpha")) {
          messages.push(`${this.message} de manera correcta`);
        } else if (this.hasValidationError("minLength")) {
          if(this.message === "Introduzca su telefono"){
            messages.push(`Se requiere introducir al menos 10 caracteres`);
          }else{
            messages.push(`Se requiere introducir al menos ${this.validation.$params.minLength.min} caracteres`);

          }
        } else if (this.hasValidationError("maxLength")) {
          messages.push("Solo se permite introducir maximo 60 caracteres");
        }
      }
      return messages;
    }
  },
  methods: {
    hasValidationError(type) {
      return {}.propertyIsEnumerable.call(this.validation, type) && !this.validation[type];
    }
  }
}
</script>

<style scoped>

</style>
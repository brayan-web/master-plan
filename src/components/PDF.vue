<template>
    <div>
		<div style="width: 50%">
			<pdf v-show="show" ref="pdf" style="border: 1px solid red" :src="src" :page="page"  ></pdf>
		</div>
       <button class="btn btn-success" @click="$refs.pdf.print()">print</button>
    </div>
</template>

<script>
import pdf from 'vue-pdf'
export default {
   components: {
    pdf: pdf
   },
    data() {
        return {
            show: true,
			page: 1,
			numPages: null,
            src: '7eb5c325-2437-4df3-83b9-23a5de766ebb.pdf',
          
        }
    },
    computed:{
       
    },
    mounted() {
               
    },
    methods: {
           printMe(){
             var wspFrame = this.$refs.myiframe.contentWindow.document
            wspFrame.focus();
            wspFrame.print();
          }
    }
}
</script>

<style lang="">
    
</style>
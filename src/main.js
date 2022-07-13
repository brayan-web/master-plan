import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import store from './store'
import 'animate.css';
import "tippy.js/themes/light.css";
import "tippy.js/themes/light-border.css";
import "tippy.js/themes/google.css";
import "tippy.js/themes/translucent.css";
import VueTippy, { TippyComponent } from "vue-tippy";
import CoolLightBox from 'vue-cool-lightbox'
import 'vue-cool-lightbox/dist/vue-cool-lightbox.min.css'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Vuelidate from 'vuelidate'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';


import Fragment from 'vue-fragment'
Vue.use(Fragment.Plugin)

Vue.use(VueSweetalert2);

Vue.config.productionTip = false
Vue.use(VueTippy);
Vue.use(CoolLightBox);
Vue.use(Vuelidate);
Vue.component("tippy", TippyComponent);
Vue.component('font-awesome-icon', FontAwesomeIcon)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from "../components/home/Home"


//LINDA VISTA ROUTES
import Lindavista from '../components/lindavista/Lindavista';
import MenuLindavista from '../components/lindavista/Menu';
import detailLocationLindavista from '../components/lindavista/detaillocation/Main'

//ALAMOS ROUTES
import Alamos from '../components/alamos/Alamos';
import MenuAlamos from '../components/alamos/Menu';
import detailLocationALamos from '../components/alamos/detaillocation/Main'

//SENDEROS ROUTES
import Senderos from '../components/senderos/Senderos';
import MenuSenderos from '../components/senderos/Menu';
import detailLocationSenderos from '../components/senderos/detaillocation/Main'


import MapDetail from '../components/core/MapViewDetail'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/lindavista',
    component: Lindavista,
    children: [
      {
        path: '/',
        component: MenuLindavista
      },
      {
        path: '/lindavista/detalles/:idLocation',
        component: detailLocationLindavista
      },
    ]
  },
  {
    path: '/alamos',
    component: Alamos,
    children:[
      {
        path: '/',
        component: MenuAlamos
      },
      {
        path: '/alamos/detalles/:idLocation',
        component: detailLocationALamos
                   
      },
    ]
  },

  {
    path: '/senderos',
    component: Senderos,
    children:[
      {
        path: '/',
        component: MenuSenderos
      },
      {
        path: '/senderos/detalles/:idLocation',
        component: detailLocationSenderos

      },
    ]
  },


  {
    path: '/detalle/:desarrollo/:id/:url/:width/:height',
    component: MapDetail,
    name: 'detalle',
    props: true
  }
]

const router = new VueRouter({
  mode: 'history',
  scrollBehavior (from) {
    if(from.path.toLowerCase() === "/senderos/detalles/:idLocation") {
      return {x: 0, y: 0}
    }
  },
  base: process.env.BASE_URL,
  routes
})

export default router

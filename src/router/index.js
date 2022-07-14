import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from "../components/home/Home"
//CANADAS CASAS ROUTES
import CanadasCasas from '../components/canadas/casas/CanadasCasas';
import MenuCanadasCasas from '../components/canadas/casas/Menu';
import SubMenuCanadasCasas from '../components/canadas/casas/SubMenu';
import detailLocationCanadasCasas from '../components/canadas/casas/dataillocation/Main';
//CANADAS TERRENOS ROUTES
import CanadasTerrenos from '../components/canadas/terrenos/CanadasTerrenos';
import MenuCanadasTerrenos from '../components/canadas/terrenos/Menu';
import SubMenuCanadasTerrenos from '../components/canadas/terrenos/SubMenu';
import detailLocationCanadasTerrenos from '../components/canadas/terrenos/detailLocation/Main';
//CANADAS DEPTOS ROUTES
import CanadasDeptos from '../components/canadas/deptos/CanadasDeptos';
import MenuCanadasDeptos from '../components/canadas/deptos/Menu';
import SubMenuCanadasDeptos from '../components/canadas/deptos/SubMenu';
import pisoCanadasDeptos from '../components/canadas/deptos/PisoMenu';
import detailLocationCanadasDeptos from '../components/canadas/deptos/detailLocation/Main'
//TPDP ROUTES
import TPDP from '../components/torrespaseodelparque/TPDP';
import MenuTPDP from '../components/torrespaseodelparque/Menu';
import SubMenuTPDP from '../components/torrespaseodelparque/SubMenu';
import pisoTPDP from '../components/torrespaseodelparque/PisoMenu';
import detailLocationTPDP from '../components/torrespaseodelparque/detailLocation/Main'

//TORRE AIREA PLUS ROUTES
import TorreAireaPlus from '../components/torreaireaplus/TorreAireaPlus';
import MenuTorreAireaPlus from '../components/torreaireaplus/Menu';
import SubMenuTorreAireaPlus from '../components/torreaireaplus/SubMenu';
import pisoTorreAireaPlus from '../components/torreaireaplus/PisoMenu';
import detailLocationTorreAireaPlus from '../components/torreaireaplus/detailLocation/Main'



//TORRES PANORAMA ROUTES
import TorresPanorama from '../components/torrespanorama/TorresPanorama';
import MenuTorresPanorama from '../components/torrespanorama/Menu';
import SubMenuTorresPanorama from '../components/torrespanorama/SubMenu';
import pisoTorresPanorama from '../components/torrespanorama/PisoMenu';
import detailLocationTorresPanorama from '../components/torrespanorama/detailLocation/Main'
//PASEO DEL PARQUE ROUTES
import PaseoDelParque from '../components/paseodelparque/PaseoDelParque';
import MenuPaseoDelParque from '../components/paseodelparque/Menu';
import SubMenuPaseoDelParque from '../components/paseodelparque/SubMenu';
import etapaPaseoDelParque from '../components/paseodelparque/EtapaMenu';
import detailLocationPaseoDelParque from '../components/paseodelparque/detailLocation/Main'
//LINDA VISTA ROUTES
import Lindavista from '../components/lindavista/Lindavista';
import MenuLindavista from '../components/lindavista/Menu';
import detailLocationLindavista from '../components/lindavista/detaillocation/Main'
//VALLE NORTE ROUTES
import ValleNorte from '../components/vallenorte/ValleNorte';
import MenuValleNorte from '../components/vallenorte/Menu';
import detailLocationValleNorte from '../components/vallenorte/detailLocation/Main'
//VALLE SUR ROUTES
import ValleSur from '../components/vallesur/ValleSur';
import MenuValleSur from '../components/vallesur/Menu';
import detailLocationValleSur from '../components/vallesur/detailLocation/Main'
//ALAMOS ROUTES
import Alamos from '../components/alamos/Alamos';
import MenuAlamos from '../components/alamos/Menu';
import detailLocationALamos from '../components/alamos/detaillocation/Main'
//BOSQUES ROUTES
import Bosques from '../components/bosques/Bosques';
import MenuBosques from '../components/bosques/Menu';
import detailLocationBosques from '../components/bosques/detailLocation/Main'
//Encinos ROUTES
import Encinos from '../components/encinos/Encinos';
import MenuEncinos from '../components/encinos/Menu';
import detailLocationEncinos from '../components/encinos/detailLocation/Main'
//SENDEROS ROUTES
import Senderos from '../components/senderos/Senderos';
import MenuSenderos from '../components/senderos/Menu';
import detailLocationSenderos from '../components/senderos/detaillocation/Main'
//LomAlta ROUTES
import LomALta from "../components/lomalta/LomALta";
import MenuLomAlta from '../components/lomalta/Menu';
import SubMenuLomAlta from '../components/lomalta/SubMenu';
import detailLocationLomAlta from '../components/lomalta/detailLocation/Main';
//CIUDAD SALUD ROUTES
import CiudadSalud from "../components/ciudadsalud/CiudadSalud";
import MenuCiudadSalud from '../components/ciudadsalud/Menu';
import SubMenuCiudadSalud from '../components/ciudadsalud/SubMenu';
import detailLocationCiudadSalud from '../components/ciudadsalud/detailLocation/Main';

//CIUDAD SALUD ROUTES
import ClubDeGolf from "../components/clubdegolf/ClubDeGolf";
import MenuClubDeGolf from '../components/clubdegolf/Menu';
import SubMenuClubDeGolf from '../components/clubdegolf/SubMenu';
import Seccion from '../components/clubdegolf/SeccionMenu';
import detailLocationClubdeGolf from '../components/clubdegolf/detailLocation/Main';

Vue.use(VueRouter)
const routes = [
    {
        path: '/',
        component: Home
    },
    {
        path: '/canadas_casas',
        component: CanadasCasas,
        children: [
            {
                path: '/',
                component: MenuCanadasCasas
            },
            {
                path: '/canadas_casas/cve_nivel_te=:id/nombre_nivel_te=:privada',
                component: SubMenuCanadasCasas,
                props: true,
            },
            {
                path: '/canadas_casas/cve_nivel_te=:id/nombre_nivel_te=:privada/detalles/:idLocation',
                component: detailLocationCanadasCasas,
            },
        ]
    },
    {
        path: '/canadas_terrenos',
        component: CanadasTerrenos,
        children: [
            {
                path: '/',
                component: MenuCanadasTerrenos
            },
            {
                path: '/canadas_terrenos/cve_nivel_te=:id/nombre_nivel_te=:privada',
                component: SubMenuCanadasTerrenos,
                props: true,
            },
            {
                path: '/canadas_terrenos/cve_nivel_te=:id/nombre_nivel_te=:privada/detalles/:idLocation',
                component: detailLocationCanadasTerrenos,
            },
        ]
    },
    {
        path: '/canadas_deptos',
        component: CanadasDeptos,
        children: [
            {
                path: '/',
                component: MenuCanadasDeptos
            },
            {
                path: '/canadas_deptos/nombre_torre_etapa=:torre/cve_torre_etapa=:id',
                component: SubMenuCanadasDeptos,
                props: true,
            },
            {
                path: '/canadas_deptos/nombre_torre_etapa=:torre/cve_torre_etapa=:id/cve_nivel_te=:idPiso/nombre_nivel_te=:piso',
                component: pisoCanadasDeptos,
            },
            {
                path: '/canadas_deptos/nombre_torre_etapa=:torre/cve_torre_etapa=:id/cve_nivel_te=:idPiso/nombre_nivel_te=:piso/detalles/:idLocation',
                component: detailLocationCanadasDeptos,
            },
        ]
    },
    {
        path: '/torrespaseodelparque',
        component: TPDP,
        children: [
            {
                path: '/',
                component: MenuTPDP
            },
            {
                path: '/torrespaseodelparque/nombre_torre_etapa=:torre/cve_torre_etapa=:id',
                component: SubMenuTPDP,
                props: true,
            },
            {
                path: '/torrespaseodelparque/nombre_torre_etapa=:torre/cve_torre_etapa=:id/cve_nivel_te=:idPiso/nombre_nivel_te=:piso',
                component: pisoTPDP,
            },
            {
                path: '/torrespaseodelparque/nombre_torre_etapa=:torre/cve_torre_etapa=:id/cve_nivel_te=:idPiso/nombre_nivel_te=:piso/detalles/:idLocation',
                component: detailLocationTPDP,
            },
        ]
    },

    {
        path: '/torreaireaplus',
        component: TorreAireaPlus,
        children: [
            {
                path: '/',
                component: MenuTorreAireaPlus
            },
            {
                path: '/torreaireaplus/nombre_torre_etapa=:torre/cve_torre_etapa=:id',
                component: SubMenuTorreAireaPlus,
                props: true,
            },
            {
                path: '/torreaireaplus/nombre_torre_etapa=:torre/cve_torre_etapa=:id/cve_nivel_te=:idPiso/nombre_nivel_te=:piso',
                component: pisoTorreAireaPlus,
            },
            {
                path: '/torreaireaplus/nombre_torre_etapa=:torre/cve_torre_etapa=:id/cve_nivel_te=:idPiso/nombre_nivel_te=:piso/detalles/:idLocation',
                component: detailLocationTorreAireaPlus,
            },
        ]
    },




    {
        path: '/torrespanorama',
        component: TorresPanorama,
        children: [
            {
                path: '/',
                component: MenuTorresPanorama
            },
            {
                path: '/torrespanorama/nombre_torre_etapa=:torre/cve_torre_etapa=:id',
                component: SubMenuTorresPanorama,
                props: true,
            },
            {
                path: '/torrespanorama/nombre_torre_etapa=:torre/cve_torre_etapa=:id/cve_nivel_te=:idPiso/nombre_nivel_te=:piso',
                component: pisoTorresPanorama,
            },
            {
                path: '/torrespanorama/nombre_torre_etapa=:torre/cve_torre_etapa=:id/cve_nivel_te=:idPiso/nombre_nivel_te=:piso/detalles/:idLocation',
                component: detailLocationTorresPanorama,
            },
        ]
    },
    {
        path: '/paseodelparque',
        component: PaseoDelParque,
        children: [
            {
                path: '/',
                component: MenuPaseoDelParque
            },
            {
                path: '/paseodelparque/nombre_torre_etapa=:torre/cve_torre_etapa=:id',
                component: SubMenuPaseoDelParque,
                props: true,
            },
            {
                path: '/paseodelparque/nombre_torre_etapa=:torre/cve_torre_etapa=:id/cve_nivel_te=:idPiso/nombre_nivel_te=:piso',
                component: etapaPaseoDelParque,
            },
            {
                path: '/paseodelparque/nombre_torre_etapa=:torre/cve_torre_etapa=:id/cve_nivel_te=:idPiso/nombre_nivel_te=:piso/detalles/:idLocation',
                component: detailLocationPaseoDelParque,
            },
        ]
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
        path: '/vallenorte',
        component: ValleNorte,
        children: [
            {
                path: '/',
                component: MenuValleNorte
            },
            {
                path: '/vallenorte/detalles/:idLocation',
                component: detailLocationValleNorte
            },
        ]
    },
    {
        path: '/vallesur',
        component: ValleSur,
        children: [
            {
                path: '/',
                component: MenuValleSur
            },
            {
                path: '/vallesur/detalles/:idLocation',
                component: detailLocationValleSur
            },
        ]
    },
    {
        path: '/alamos',
        component: Alamos,
        children: [
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
        path: '/bosques',
        component: Bosques,
        children: [
            {
                path: '/',
                component: MenuBosques
            },
            {
                path: '/bosques/detalles/:idLocation',
                component: detailLocationBosques
            },
        ]
    },
    {
        path: '/encinos',
        component: Encinos,
        children: [
            {
                path: '/',
                component: MenuEncinos
            },
            {
                path: '/encinos/detalles/:idLocation',
                component: detailLocationEncinos
            },
        ]
    },
    {
        path: '/lomalta',
        component: LomALta,
        children: [
            {
                path: '/',
                component: MenuLomAlta
            },
            {
                path: '/lomalta/cve_nivel_te=:id/nombre_nivel_te=:privada',
                component: SubMenuLomAlta,
                props: true,
            },
            {
                path: '/lomalta/cve_nivel_te=:id/nombre_nivel_te=:privada/detalles/:idLocation',
                component: detailLocationLomAlta,
            },
        ]
    },
    {
        path: '/ciudadsalud',
        component: CiudadSalud,
        children: [
            {
                path: '/',
                component: MenuCiudadSalud
            },
            {
                path: '/ciudadsalud/cve_nivel_te=:id/nombre_nivel_te=:privada',
                component: SubMenuCiudadSalud,
                props: true,
            },
            {
                path: '/ciudadsalud/cve_nivel_te=:id/nombre_nivel_te=:privada/detalles/:idLocation',
                component: detailLocationCiudadSalud,
            },
        ]
    },
  {
    path: '/clubdegolf',
    component: ClubDeGolf,
    children: [
      {
        path: '/',
        component: MenuClubDeGolf
      },
        {
            path: '/clubdegolf/preseccion',
            component: SubMenuClubDeGolf,
            props: true,
        },
        {
            path: '/clubdegolf/preseccion/:seccion/cve_nivel_te=:id',
            component: Seccion,
            props: true,
        },
        {
            path: '/clubdegolf/preseccion/:seccion/cve_nivel_te=:id/detalles/:idLocation',
            component: detailLocationClubdeGolf,
        },
    
    ]
  },
    {
        path: '/senderos',
        component: Senderos,
        children: [
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
    /*{
      path: '/mapa_detalle',
      component: MapDetail,
      name: 'detalle',
      props: true
    }*/
]
const router = new VueRouter({
    mode: 'history',
    scrollBehavior() {
      
            return {x: 0, y: 0}
     
    },
    base: process.env.BASE_URL,
    routes
})
export default router

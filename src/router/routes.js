import Home from '@/views/Home'
import ItemMusic from '@/views/ItemMusic'
import Search from '@/views/Search'
import Login from '@/views/Login'
import InfoUser from '@/views/InfoUser'
import store from '@/store/index.js'

const routes = [
    {
        path: '/home',
        name:'Home',
        component:Home,
        meta: { show: true },
    },
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/itemmusic',
        name:'ItemMusic',
        component:ItemMusic,
        meta: { show: true },
       
    },
    {
        path: '/search',
        name:'Search',
        component:Search,
        meta: { show: true },
    },
    {
        path: '/infouser',
        name:'InfoUser',
        component:InfoUser,
        beforeEnter:(to,from,next)=>{
            if(store.state.isLogin || store.state.token || localStorage.getItem('token')){
              next()
            }else{
              next('/login')
            }
          },
          meta: { show: true },

    },
    {
        path: '/login',
        name:'Login',
        component:Login,
        meta: { show: false },
    },

]
export default routes
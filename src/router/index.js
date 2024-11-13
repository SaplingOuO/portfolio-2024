import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
      path: '/',  // 根路徑重定向到 /home
      redirect: '/Home'
    },
    {
        path: '/Home',
        name: 'Home',
        component: () => import('../App.vue')
    },
    {
        path: '/Layout',
        children:[
            // {
            //     path: '/Layout/AnimatedText',
            //     name: 'AnimatedText',
            //     component: () => import('../views/Layout/animatedText.vue')
            // },
        ],
    },
    {
        path: '/Components',
        children:[
            {
                path: '/Components/AnimatedText',
                name: 'AnimatedText',
                component: () => import('../views/Components/animatedText.vue')
            },
            {
                path: '/Components/BackgroundColorChange',
                name: 'BackgroundColorChange',
                component: () => import('../views/Components/BackgroundColorChange.vue')
            },
            {
                path: '/Components/HomeViewSlide',
                name: 'HomeViewSlide',
                component: () => import('../views/Components/HomeViewSlide.vue')
            },
            {
                path: '/Components/ThreeJS/ThreeExample',
                name: 'ThreeExample',
                component: () => import('../views/Components/ThreeJS/ThreeExample.vue')
            },
            {
                path: '/Components/ThreeJS/ThreeInteractive',
                name: 'ThreeInteractive',
                component: () => import('../views/Components/ThreeJS/ThreeInteractive.vue')
            },
        ],
    },
    {
        path: '/Project',
        children:[
            // {
            //     path: '/Project/AnimeList',
            //     name: 'AnimeList',
            //     component: () => import('../views/Project/AnimeList.vue')
            // },
            // {
            //     path: '/Project/InProduction',
            //     name: 'InProduction',
            //     component: () => import('../views/Project/InProduction.vue')
            // },
            // {
            //     path: '/Project/PokemonTypeFighting',
            //     name: 'PokemonTypeFighting',
            //     component: () => import('../views/Project/PokemonTypeFighting.vue')
            // },
            // {
            //     path: '/Project/ShopDemo',
            //     name: 'ShopDemo',
            //     component: () => import('../views/Project/ShopDemo.vue')
            // },
        ],
    },

]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    base: process.env.BASE_URL,
    routes
});


export default router;
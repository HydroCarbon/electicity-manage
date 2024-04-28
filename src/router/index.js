import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
            children: [
                {
                    path: '/user',
                    name: 'home-user',
                    component: () => import('../views/UserView.vue')
                },
                {
                    path: '/building',
                    name: 'home-building',
                    component: () => import('../views/BuildingView.vue')
                },
                {
                    path: '/electricity',
                    name: 'home-electricity',
                    children: [
                        {
                            path: '/electricity/record',
                            name: 'home-electricity-usage',
                            component: () => import('../views/ElectricityRecordView.vue')
                        }
                    ]
                },
                {
                    path: '/payment',
                    name: 'home-payment',
                    children: [
                        {
                            path: '/payment/record',
                            name: 'home-payment-record',
                            component: () => import('../views/PaymentRecordView.vue')
                        }
                    ]
                }
            ]
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('../views/LoginView.vue')
        },
        {
            path: '/register',
            name: 'register',
            component: () => import('../views/RegisterView.vue')
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'not-found',
            component: () => import('../views/NotFoundView.vue')
        }
    ]
})

export default router

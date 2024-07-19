import { createWebHistory, createRouter } from 'vue-router'
import Layout from "./components/Layout.vue";
import {useUserStore} from "./stores/user";
import Login from "./components/Login.vue";
import Signup from "./components/Signup.vue";
import Index from "./pages/index.vue";

const routes = [
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/signup',
        name: 'signup',
        component: Signup
    },
    {
        path: '/',
        component: Layout,
        name: 'index',
        meta: {
            requiresAuth: true
        },
        children: [
            {
              path: '/',
              name: 'dashboard',
              component: Index
            },
        ]
    },
    {
      
    },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, from, next) => {
    const userStore = useUserStore();
    if (to.meta.requiresAuth) {
        const token = localStorage.getItem('token');
        if (token) {
            userStore.setDatas(token);
            next();
        } else {
            next({name: 'login'});
        }
    } else {
        next();
    }
});

export default router;
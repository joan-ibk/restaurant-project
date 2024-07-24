import Home from "./components/Home.vue";
import SignUp from "./components/SignUp.vue";
import { createRouter, createWebHistory } from "vue-router";
import AddPage from "./components/AddPage.vue";
import UpdatePage from "./components/UpdatePage.vue";
import LoginPage from "./components/LoginPage.vue"


const routes = [
    {
        name: 'Home',
        component: Home,
        path: '/'
    },
    {
        name: 'SignUp',
        component: SignUp,
        path: '/sign-up'
    },   
    {
        name:'LoginPage',
        component: LoginPage,
        path: '/login-page',
    },
    {
        name:'AddPage',
        component: AddPage,
        path: '/add',
    },
    {
        name:'UpdatePage',
        component: UpdatePage,
        path: '/update/:id',
    },

];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
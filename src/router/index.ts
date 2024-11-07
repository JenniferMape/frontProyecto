import { createRouter, createWebHistory } from 'vue-router';
import isAuthenticatedGuard from '@/modules/auth/guards/is-authenticated.guard';
import NotFound404 from '@/modules/common/pages/NotFound404.vue';
import HomePage from '@/modules/landing/pages/HomePage.vue';
import LandingLayout from '@/modules/landing/layouts/LandingLayout.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: LandingLayout,
      children: [
        {
          path: '', // Dejar vacío para que coincida con la ruta '/'
          name: 'home',
          component: HomePage,
        },
        {
          path: 'contact',
          name: 'contact',
          component: () => import('@/modules/landing/pages/ContactPage.vue'),
        },
        // {
        //   path: 'pokemon/:id',
        //   name: 'pokemon',
        //   beforeEnter: [isAuthenticatedGuard],
        //   props: (router) => {
        //     const id = Number(router.params.id);
        //     return isNaN(id) ? { id: 1 } : { id };
        //   },
        //   component: () => import('@/modules/pokemons/pages/PokemonPage.vue')
        // }
      ],
    },

    // Authb
    {
      path: '/auth',
      name: 'auth',
      redirect: { name: 'login' },
      component: () => import('@/modules/auth/layouts/AuthLayout.vue'),
      children: [
        {
          path: 'login',
          name: 'login',
          component: () => import('@/modules/auth/pages/LoginPage.vue'),
        },
        {
          path: 'register',
          name: 'register',
          component: () => import('@/modules/auth/pages/RegisterPage.vue'),
          beforeEnter: (to, from, next) => {
            const token = localStorage.getItem('token');

            if (token) {
              next({ name: 'home' }); // Redirige si está autenticado
            } else {
              next();
            }
          },
        },
      ],
    },
    // User
    {
      path: '/user',
      name: 'user',
      component: () => import('@/modules/user/layouts/UserLayout.vue'),
      children: [
        {
          path: 'clientProfile',
          name: 'clientProfile',
          beforeEnter: [isAuthenticatedGuard],
          component: () => import('@/modules/user/pages/clientPages/ClientProfilePage.vue'),
        },
        {
          path: 'companyProfile',
          name: 'companyProfile',
          beforeEnter: [isAuthenticatedGuard],
          component: () => import('@/modules/user/pages/companyPages/CompanyProfilePage.vue'),
        },
        {
          path: 'companyOffers',
          name: 'companyOffers',
          beforeEnter: [isAuthenticatedGuard],
          component: () => import('@/modules/user/pages/companyPages/CompanyOffers.vue'),
        },
        {
          path: '/offer/:offerId?',
          name: 'formOffer',
          beforeEnter: [isAuthenticatedGuard],
          component: () => import('@/modules/user/pages/companyPages/EditOffers.vue'),
          props: (route) => ({
            offerId: route.params.offerId || null,
            isEditMode: !!route.params.offerId, // isEditMode será true si offerId está presente
          }),
        },
      ],
    },

    // Not found
    {
      path: '/:pathMatch(.*)*',
      component: NotFound404,
    },
  ],
});

export default router;

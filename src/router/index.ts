import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import ProductsPage from '../pages/ProductsPage.vue'
import ProductDetailsPage from '../pages/ProductDetailsPage.vue'
import CartPage from '../pages/CartPage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Products',
    component: ProductsPage,
    meta: {
      title: 'Products'
    }
  },
  {
    path: '/products/:id',
    name: 'ProductDetails',
    component: ProductDetailsPage,
    meta: {
      title: 'Product Details'
    },
    props: true
  },
  {
    path: '/cart',
    name: 'Cart',
    component: CartPage,
    meta: {
      title: 'Shopping Cart'
    }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  // Optional: configure scroll behavior
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// Optional: Update document title based on route meta
router.beforeEach((to, from, next) => {
  document.title = to.meta.title as string || 'My Shop'
  next()
})

export default router
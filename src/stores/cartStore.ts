import { defineStore } from 'pinia'
import type { Product } from '@/types/ecwid'

export const useCartStore = defineStore('cart', {
    state: () => ({
        products: [] as Product[],
    }),
    actions: {
        addToCart(product: Product) {
            const existing = this.products.find(p => p.id === product.id)
            if (!existing) {
                this.products.push(product)
            }
        },
        removeFromCart(productId: number) {
            this.products = this.products.filter(p => p.id !== productId)
        },
        clearCart() {
            this.products = []
        },
    },
    getters: {
        totalItems: (state) => state.products.length,
        totalPrice: (state) => state.products.reduce(
            (sum, product) => sum + (product.price), 0
        )
    },
    persist: true
})
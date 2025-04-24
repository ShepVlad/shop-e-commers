<script setup lang="ts">
import { useCartStore } from '@/stores/cartStore'
import { useRouter } from 'vue-router'
import { ArrowLeftIcon, TrashIcon } from '@heroicons/vue/24/solid'
import BaseButton from '@/components/shared/BaseButton.vue'
import CartItem from '@/features/cart/CartItem.vue'
import SuccessModal from '@/components/shared/SuccessModal.vue'
import { ref } from 'vue'

const cart = useCartStore()
const router = useRouter()
const isModalShown = ref(false);

const placeOrder = () => {
    cart.clearCart()
    isModalShown.value = true;
}

const deleteItem = (id: number) => {
    cart.removeFromCart(id)
}

const goBack = () => {
    router.back()
}

const goProducts = () => {
    router.push({ name: 'Products' })

}

</script>

<template>
    <div class="max-w-3xl mx-auto px-4 py-6">
        <BaseButton :icon="ArrowLeftIcon" type="ghost" rounded aria-label="Go Back" @click="goBack" />

        <h1 class="text-2xl font-bold mb-6 text-primary">Shopping Cart</h1>

        <div v-if="cart.products.length === 0" class=" text-lg text-primary">
            Your cart is empty.
        </div>

        <ul v-else class="space-y-4">
            <div class="space-y-4">
                <CartItem v-for="product in cart.products" :key="product.id" :product="product" @delete="deleteItem" />
            </div>
        </ul>

        <div v-if="cart.products.length > 0" class="mt-6 flex justify-between items-center">
            <span class="text-[1.2rem] font-bold text-primary">${{ cart.totalPrice.toFixed(2) }}</span>

            <BaseButton label="Place Order" type="secondary" @click="placeOrder" />
        </div>
    </div>

    <SuccessModal v-if="isModalShown" @show-all-products="goProducts" />
</template>

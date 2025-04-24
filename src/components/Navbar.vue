<script setup lang="ts">
import { useCartStore } from '@/stores/cartStore'
import { storeToRefs } from 'pinia'
import { ShoppingCartIcon } from '@heroicons/vue/24/outline'
import BaseButton from './shared/BaseButton.vue'

const cartStore = useCartStore()
const { totalItems } = storeToRefs(cartStore)

</script>
<template>
    <nav class="bg-white shadow p-4 flex justify-between items-center">
        <!-- Logo -->
        <router-link to="/" class="text-xl font-bold text-primary">
            MyShop
        </router-link>

        <!-- Right Side -->
        <div class="flex items-center space-x-4">
            <!-- Cart Button -->
            <router-link to="/cart" class="relative">

                <BaseButton :icon="ShoppingCartIcon" type="primary" />

                <span
                    class="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {{ totalItems }}
                </span>
            </router-link>
        </div>
    </nav>
</template>
<style scoped>
.button-icon {
    width: 1.8rem;
    height: 1.8rem;
    margin-right: 0.3rem;
}
</style>
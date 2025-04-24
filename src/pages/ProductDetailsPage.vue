<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { productService } from '@/services/productService'
import { useCartStore } from '@/stores/cartStore'
import type { Product } from '@/types/ecwid'
import SafeHtml from '@/components/shared/SafeHtml.vue'
import BaseButton from '@/components/shared/BaseButton.vue'
import { ShoppingCartIcon, CheckIcon, ArrowLeftIcon } from '@heroicons/vue/24/outline'
import LoadingSpinner from '@/components/shared/LoadingSpinner.vue'

const route = useRoute()
const router = useRouter()
const cartStore = useCartStore()

const product = ref<Product | null>(null)
const isLoading = ref(true)

onMounted(async () => {
    try {
        const productId = Number(route.params.id)
        product.value = await productService.getProductById(productId)
    } finally {
        isLoading.value = false
    }
})

const isInCart = computed(() => {
    return cartStore.products.some(item => item.id === +route.params.id)
})

const addToCart = () => {
    if (product.value) {
        cartStore.addToCart(product.value)
    }
}

const goBack = () => {
    router.back()
}
</script>

<template>
    <button @click="goBack" class="p-2 mt-2 rounded-full hover:bg-gray-200 cursor-pointer">
        <ArrowLeftIcon class="w-5" />
    </button>
    <div class="max-w-screen-xl mx-auto p-8">
        <div v-if="isLoading">
            <LoadingSpinner />
        </div>

        <div v-else-if="product" class="grid grid-cols-1 gap-8 md:grid-cols-2 items-center">

            <div class="flex justify-center items-center">
                <img :src="product.thumbnailUrl || '/placeholder-product.png'" :alt="product.name"
                    class="object-contain max-w-[400px] h-auto" />
            </div>

            <div class="flex flex-col gap-6">
                <h1 class="text-3xl font-semibold text-gray-800">{{ product.name }}</h1>

                <p v-if="product.description" class="text-lg text-gray-600 leading-relaxed">
                    <SafeHtml :html="product.description" />
                </p>

                <div class="flex justify-between items-center">
                    <div class="text-2xl font-bold text-blue-600">
                        ${{ product.price.toFixed(2) }}
                    </div>

                    <BaseButton :label="isInCart ? 'Added' : 'Add to Cart'" :type="isInCart ? 'secondary' : 'primary'"
                        @click.stop="addToCart" :icon="isInCart ? CheckIcon : ShoppingCartIcon"
                        class="flex items-center gap-2 px-4 py-2 rounded-lg" />
                </div>
            </div>
        </div>

        <div v-else class="text-center text-lg py-16">
            Product not found
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Product } from '@/types/ecwid'
import { useCartStore } from '@/stores/cartStore'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { ShoppingCartIcon, CheckIcon } from '@heroicons/vue/24/outline'
import BaseButton from '@/components/shared/BaseButton.vue'
import SafeHtml from '@/components/shared/SafeHtml.vue'

const props = defineProps<{
    product: Product
}>()

const emit = defineEmits<{
    (e: 'image-click', product: Product): void
}>()

const cartStore = useCartStore()
const { addToCart } = cartStore
const { products } = storeToRefs(cartStore)

const isInCart = computed(() => {
    return products.value.some(item => item.id === props.product.id)
})

</script>
<template>
    <article
        class="flex flex-col h-full rounded-2xl overflow-hidden shadow-md bg-white transition-transform hover:-translate-y-1 hover:shadow-lg">

        <div class="relative pt-[75%] overflow-hidden cursor-pointer" @click="emit('image-click', product)">
            <img :src="product.thumbnailUrl || '/placeholder-product.png'" :alt="product.name"
                class="absolute top-0 left-0 w-full h-full object-cover transition-transform hover:scale-105" />
        </div>

        <div class="flex flex-col flex-grow p-4">
            <h3 class="text-lg font-semibold text-gray-800 mb-2">
                {{ product.name }}
            </h3>

            <SafeHtml v-if="product.description" :html="product.description" :line-clamp="3"
                class="text-sm grow mb-3 leading-relaxed" />

            <p v-else class="text-sm text-gray-600 line-clamp-3 grow mb-4 leading-relaxed">
                {{ 'No description available' }}
            </p>

            <div class="flex justify-between items-center mt-auto">
                <span class="text-lg font-bold text-primary">
                    ${{ product.price.toFixed(2) }}
                </span>

                <BaseButton v-if="isInCart" type="secondary" :icon="CheckIcon" label="Added" />
                <BaseButton v-else type="primary" :icon="ShoppingCartIcon" @click.stop="addToCart(product)"
                    label="Add" />
            </div>
        </div>
    </article>
</template>
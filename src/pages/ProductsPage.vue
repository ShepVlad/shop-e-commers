<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { productService } from '@/services/productService'
import type { Product, Category } from '@/types/ecwid'
import ProductCard from '@/features/product/ProductCard.vue'
import CategoriesCarousel from '@/features/categories/CategoriesCarousel.vue'
import LoadingSpinner from '@/components/shared/LoadingSpinner.vue'
import EmptyState from '@/features/product/EmptyState.vue'
import ErrorState from '@/features/product/ErrorState.vue'

const router = useRouter()
const products = ref<Product[]>([])
const isLoading = ref(true)
const error = ref<string | null>(null)
const selectedCategory = ref<Category | null>(null)
const categoryDisabled = computed(() => error.value !== null)

onMounted(() => {
    loadProducts(null)
})

const handleCrashed = () => {
    error.value = null
    handleCategorySelect(null)
}

const loadProducts = async (category: Category | null) => {
    try {
        isLoading.value = true
        products.value = category
            ? await productService.getProductsByCategory(category.id)
            : await productService.getAllProducts()

    } catch (err) {
        error.value = err instanceof Error ? err.message : 'Failed to load products'
        console.error('Error loading products:', err)
    } finally {
        isLoading.value = false
    }
}

const handleCategorySelect = (category: Category | null) => {
    selectedCategory.value = category
    loadProducts(category)
}

const goToProduct = (product: Product) => {
    router.push({ name: 'ProductDetails', params: { id: product.id } })
}

</script>

<template>
    <div class="product-list-page p-6">
        <section class="mb-6">
            <CategoriesCarousel :selected-category="selectedCategory" :disabled="categoryDisabled"
                @select="handleCategorySelect" />
        </section>

        <div v-if="isLoading">
            <LoadingSpinner />
        </div>

        <div v-else-if="error">
            <ErrorState :error="error" @handle-crashed="handleCrashed" />
        </div>

        <div v-else class="product-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-4">
            <ProductCard v-for="product in products" :key="product.id" :product="product" @image-click="goToProduct"
                class="product-card transition-transform duration-200 ease-in-out hover:translate-y-[-5px] hover:shadow-xl" />
        </div>

        <div v-if="!isLoading && !error && products.length === 0">
            <EmptyState @show-all-products="handleCategorySelect" />
        </div>
    </div>
</template>

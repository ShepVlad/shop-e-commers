<script setup lang="ts">
import BaseButton from '@/components/shared/BaseButton.vue'

const emit = defineEmits(['ShowAllProducts'])

</script>
<template>
    <div class="flex justify-center items-center min-h-[300px] text-center">
        <div class="max-w-md">
            <span class="icon is-large">
                <i class="fas fa-box-open fa-2x"></i>
            </span>
            <p class="title is-4 mt-4">No products found</p>
            <p class="subtitle"> Try selecting a different category </p>
            <BaseButton label="Show All Products" type="primary" class="mt-4" @click="emit('ShowAllProducts', null)" />
        </div>
    </div>
</template>

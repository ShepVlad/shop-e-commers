<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import { TrashIcon } from '@heroicons/vue/24/solid'

import BaseButton from '@/components/shared/BaseButton.vue'
import type { Product } from '@/types/ecwid';

const props = defineProps<{
    product: Product
}>()

const emit = defineEmits(['delete'])
</script>

<template>
    <div class="flex items-center justify-between py-4 border-b">
        <div class="flex items-center gap-4">
            <img :src="props.product.thumbnailUrl" alt="Product image" class="w-16 h-16 object-cover rounded-xl" />
            <div>
                <h3 class="text-base font-medium">{{ props.product.name }}</h3>
            </div>
        </div>
        <div class="flex items-center gap-4">
            <span class="text-[1.2rem] font-bold text-primary">
                ${{ (props.product.price).toFixed(2) }}
            </span>
            <BaseButton type="danger" :icon="TrashIcon" @click="emit('delete', props.product.id)" />
        </div>
    </div>
</template>
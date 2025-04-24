<script setup lang="ts">
import type { Category } from '@/types/ecwid';
import { onMounted, ref, watch } from 'vue';
import { categoryService } from '@/services/categoryService';
import BaseButton from '@/components/shared/BaseButton.vue';

const props = defineProps<{
    selectedCategory: Category | null;
    disabled: boolean;
}>();

const emit = defineEmits(['select']);

const categories = ref<Category[]>([]);
const categoryHistory = ref<Category[]>([]);

onMounted(async () => {
    categories.value = await categoryService.getAllCategories();
});

watch(() => props.selectedCategory, async () => {
    if (props.selectedCategory !== null) {
        categories.value = await categoryService.getSubcategoriesFake(props.selectedCategory.id);
        categoryHistory.value.push(props.selectedCategory);
    } else {
        categories.value = await categoryService.getAllCategories();
        categoryHistory.value = [];
    }
});

const goBackTo = (category: Category) => {
    const toDeleteIndex = categoryHistory.value.findIndex((ch) => ch.id == category.id);
    categoryHistory.value = categoryHistory.value.slice(0, toDeleteIndex + 1);
    emit('select', category);
};

const isSelected = (category: Category | null) =>
    props.selectedCategory?.id === category?.id ||
    (category === null && props.selectedCategory === null)

const getType = (category: Category | null): 'primary' | 'ghost' =>
    isSelected(category) ? 'primary' : 'ghost'

</script>

<template>
    <div class="mb-4 text-sm text-gray-600 space-x-1">
        <span class="cursor-pointer hover:underline"
            :class="{ 'cursor-not-allowed text-gray-400 hover:no-underline': disabled }"
            @click="!disabled && emit('select', null)">
            All
        </span>
        <template v-for="(crumb, index) in categoryHistory" :key="crumb.id">
            <span>›</span>
            <span class="cursor-pointer hover:underline"
                :class="{ 'cursor-not-allowed text-gray-400 hover:no-underline': disabled }"
                @click="!disabled && goBackTo(crumb)">
                {{ crumb.name }}
            </span>
        </template>
    </div>

    <div class="flex gap-3 overflow-x-auto py-2 no-scrollbar">
        <BaseButton label="All" :type="getType(null)" :rounded="true" :disabled="disabled" @click="emit('select', null)"
            class="text-sm px-5 py-2 whitespace-nowrap flex-shrink-0" />

        <BaseButton v-for="category in categories" :key="category.id" :label="category.name" :type="getType(category)"
            :rounded="true" :disabled="disabled" @click="emit('select', category)"
            class="text-sm px-5 py-2 whitespace-nowrap flex-shrink-0" />
    </div>

</template>

<script setup lang="ts">
import BaseButton from '@/components/shared/BaseButton.vue';

const props = defineProps<{
    error: string | null
}>();

const emit = defineEmits(['HandleCrashed'])

</script>

<template>
    <div class="flex justify-center items-center min-h-[300px] text-center">
        <div class="max-w-md">
            <p class="title is-4 mt-4">{{ props.error }}</p>

            <BaseButton label="Back To All Products" type="danger" class="mt-4" @click="emit('HandleCrashed')" />
        </div>
    </div>
</template>

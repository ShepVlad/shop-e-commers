<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { CheckCircleIcon, XMarkIcon } from '@heroicons/vue/24/solid'
import BaseButton from '@/components/shared/BaseButton.vue'

defineProps({
    modelValue: {
        type: Boolean,
        default: false,
    },
})

const emit = defineEmits(['ShowAllProducts'])

const modalCardRef = ref(null)

const closeModal = () => {
    emit('ShowAllProducts')
}

const handleKeyboard = (e: KeyboardEvent) => {
    if (e.key === 'Escape') closeModal()
}

onMounted(() => {
    document.addEventListener('keyup', handleKeyboard)
})

onUnmounted(() => {
    document.removeEventListener('keyup', handleKeyboard)
})

onClickOutside(modalCardRef, closeModal)
</script>

<template>
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-green-100/60 p-4">
        <div class="bg-white rounded-2xl shadow-2xl w-full max-w-md border border-green-300" ref="modalCardRef">
            <header class="flex items-center justify-between border-b border-green-200 bg-green-50 p-4 rounded-t-2xl">
                <h2 class="text-lg font-bold text-green-700 flex items-center gap-2">
                    <CheckCircleIcon class="w-6 h-6 text-green-600" />
                    Success
                </h2>

                <BaseButton type="secondary" @click="closeModal" :icon="XMarkIcon" />
            </header>

            <section class="p-5 text-green-700 text-base">
                Your order has been placed successfully!
            </section>

            <footer class="flex justify-end gap-2 border-t border-green-200 bg-green-50 p-4 rounded-b-2xl">
                <BaseButton type="secondary" @click="closeModal" label="Continue" />
            </footer>
        </div>
    </div>
</template>
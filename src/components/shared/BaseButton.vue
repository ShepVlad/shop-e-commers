<script setup lang="ts">
import { defineProps, computed } from 'vue'

const props = defineProps<{
    label?: string
    icon?: any
    type?: 'primary' | 'secondary' | 'danger' | 'ghost'
    iconPosition?: 'left' | 'right'
    rounded?: boolean
    ariaLabel?: string
    disabled?: boolean
}>()

const classes = computed(() => {
    const base = 'inline-flex items-center justify-center font-medium transition focus:outline-none'
    const round = props.rounded ? 'rounded-full' : 'rounded-xl'
    const spacing = props.label && props.icon ? 'gap-2 p-2' : ''
    const cursor = props.disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'

    const onlyText = props.label && !props.icon

    const variantMap: Record<string, string> = {
        primary: props.label
            ? 'bg-primary text-white hover:bg-primary/50'
            : 'p-2 text-primary hover:bg-ghost',
        secondary: onlyText
            ? 'bg-secondary text-white hover:bg-secondary/50'
            : 'p-2 text-secondary hover:bg-ghost',
        danger: onlyText
            ? 'bg-danger text-white hover:bg-danger/90'
            : 'p-2 text-red-600 hover:bg-ghost',
        ghost: onlyText
            ? 'bg-ghost text-gray-900 hover:bg-ghost/80'
            : 'p-2 text-gray-600 hover:bg-ghost'
    }


    let variantClass = variantMap[props.type ?? 'primary']

    // Remove hover if disabled
    if (props.disabled) {
        variantClass = variantClass.replace(/hover:[^\s]+/g, '')
    }

    return [base, round, spacing, cursor, variantClass].filter(Boolean).join(' ')
})
</script>

<template>
    <button :aria-label="ariaLabel" :class="classes" :disabled="disabled">
        <template v-if="iconPosition !== 'right' && icon">
            <component :is="icon" class="w-5 h-5" />
        </template>
        <span v-if="label" class="px-4">{{ label }}</span>
        <template v-if="iconPosition === 'right' && icon">
            <component :is="icon" class="w-5 h-5" />
        </template>
    </button>
</template>

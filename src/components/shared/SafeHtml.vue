<template>
    <div v-html="sanitizedHtml" class="prose max-w-none" />
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import DOMPurify from 'dompurify'

interface Props {
    html: string,
    lineClamp?: number
}

const props = defineProps<Props>()

const toSanitize = props.lineClamp ? `<div class='line-clamp-3'>${props.html}</div>` : props.html;
const sanitizedHtml = computed(() => DOMPurify.sanitize(toSanitize))
</script>
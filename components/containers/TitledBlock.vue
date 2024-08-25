<script setup lang="ts">
const props = defineProps({
	title: {
		type: String,
		required: true,
	},
});
</script>

<template>
	<div class="flex gap-1 flex-col">
		<p class="opacity-70 text-xs">{{ title }}</p>
		<slot />
	</div>
</template>

<script setup lang="ts">
const props = defineProps({
	icon: {
		type: String,
		required: true,
	},
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
});
</script>

<template>
	<div class="flex flex-col gap-1">
		<div class="flex gap-2 items-center">
			<UIcon class="w-5 h-5" :name="icon" />
			<p class="font-bold text-xl">{{ title }}</p>
			<slot name="tabs" />
		</div>
		<p class="opacity-70 font-bold text-sm">{{ description }}</p>
	</div>
</template>

<style scoped></style>

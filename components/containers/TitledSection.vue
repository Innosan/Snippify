<script setup lang="ts">
const props = defineProps({
	title: {
		type: String,
		required: true,
	},
	icon: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	spacing: {
		type: String,
		default: "gap-4",
	},
	isDivided: {
		type: Boolean,
		default: true,
	},
});
</script>

<template>
	<section class="flex flex-col" :class="spacing">
		<IconTitle :icon="icon" :title="title" :description="description">
			<template #tabs>
				<slot name="switcher" />
			</template>
		</IconTitle>
		<slot />
	</section>

	<UDivider v-if="isDivided" />
</template>

<style scoped></style>

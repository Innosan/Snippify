<script setup lang="ts">
import type { PropType } from "vue";

const props = defineProps({
	title: {
		type: String,
		required: true,
	},
	icon: {
		type: String,
		default: "",
	},
	description: {
		type: String,
		default: "",
	},
	spacing: {
		type: String,
		default: "gap-4",
	},
	isDivided: {
		type: Boolean,
		default: true,
	},
	titleSize: {
		type: String as PropType<"sm" | "md" | "lg" | "xl">,
		default: "lg",
	},
});
</script>

<template>
	<section class="flex flex-col" :class="spacing">
		<IconTitle
			:size="titleSize"
			:icon="icon"
			:title="title"
			:description="description"
		>
			<template #tabs>
				<slot name="switcher" />
			</template>
		</IconTitle>
		<slot />
	</section>

	<UDivider v-if="isDivided" />
</template>

<style scoped></style>

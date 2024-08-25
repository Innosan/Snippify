<script setup lang="ts">
import type { PropType } from "vue";

const props = defineProps({
	icon: {
		type: String,
		default: "",
	},
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		default: "",
	},
	size: {
		type: String as PropType<"sm" | "md" | "lg" | "xl">,
		default: "lg",
	},
});
</script>

<template>
	<div class="flex flex-col gap-1">
		<div class="flex gap-2 items-center">
			<UIcon
				v-if="icon !== ''"
				:class="TitleSizes[size].icon"
				:name="icon"
			/>
			<p :class="'font-bold ' + TitleSizes[size].text">{{ title }}</p>
			<slot name="tabs" />
		</div>
		<p
			v-if="description !== ''"
			:class="'opacity-70 font-bold ' + TitleSizes[size].description"
		>
			{{ description }}
		</p>
	</div>
</template>

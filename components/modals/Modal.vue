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
	tooltip: {
		type: String,
		required: true,
	},
});

const isOpen = ref(false);
</script>

<template>
	<UTooltip :text="tooltip">
		<UButton @click="isOpen = true" :icon="icon" color="gray" />
	</UTooltip>

	<UModal v-model="isOpen">
		<UCard>
			<template #header>
				<div class="flex justify-between items-center">
					<p class="font-bold text-xl">{{ title }}</p>

					<UButton
						icon="i-heroicons-x-mark"
						@click="isOpen = false"
						color="gray"
						variant="ghost"
					/>
				</div>
			</template>
			<slot />
		</UCard>
	</UModal>
</template>

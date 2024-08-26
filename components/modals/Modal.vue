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
	isSaveDisabled: {
		type: Boolean,
		default: false,
	},
	saveStatusMessage: {
		type: String,
		default: "",
	},
	onSave: {
		type: Function,
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
		<UCard :ui="CardSizes.md">
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
			<template #footer>
				<div class="flex gap-2 flex-col">
					<UButton
						@click="onSave()"
						:disabled="isSaveDisabled"
						label="Save"
						class="w-full"
						color="gray"
					/>
					<p
						:class="
							saveStatusMessage === ''
								? 'font-bold'
								: 'text-red-400 '
						"
						class="opacity-70 text-sm"
					>
						{{
							saveStatusMessage === ""
								? "All done!"
								: saveStatusMessage
						}}
					</p>
				</div>
			</template>
		</UCard>
	</UModal>
</template>

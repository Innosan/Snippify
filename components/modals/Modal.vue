<script setup lang="ts">
import type { PropType } from "vue";
import type { ModalStatus } from "~/types/ui/ModalStatus";

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
	isSaveLoading: {
		type: Boolean,
		default: false,
	},
	modalCompletionStatus: {
		type: Object as PropType<ModalStatus>,
		required: true,
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
				<UProgress
					class="mt-4"
					:value="modalCompletionStatus.progress"
					:max="100"
					color="blue"
				>
					<template #indicator="{ percent }">
						<div
							class="text-right"
							:style="{ width: `${percent}%` }"
						>
							<p class="opacity-70 text-nowrap text-sm">
								{{ modalCompletionStatus.message }}
							</p>
						</div>
					</template>
				</UProgress>
			</template>
			<slot />
			<template #footer>
				<div class="flex gap-2 flex-col">
					<UButton
						@click="
							() => {
								onSave();
								isOpen = false;
							}
						"
						:disabled="modalCompletionStatus.isSubmitDisabled"
						:loading="isSaveLoading"
						label="Save"
						class="w-full"
						color="gray"
					/>
				</div>
			</template>
		</UCard>
	</UModal>
</template>

<script setup lang="ts">
import { getGenericSnippet, getSaveStatusMessage } from "~/types/Snippet";
import type { ModalStatus } from "~/types/ui/ModalStatus";

const toast = useToast();
const snippetStore = useSnippetsStore();

const newSnippet = ref(getGenericSnippet());

const saveSnippetStatus = computed(() => {
	const { steps, message } = getSaveStatusMessage(newSnippet.value);

	const completedSteps = steps.filter((step) => step.isCompleted).length;
	const progress = (completedSteps / steps.length) * 100;

	return <ModalStatus>{
		isSubmitDisabled: !steps.every((step) => step.isCompleted),
		message: message,
		completionSteps: steps,
		progress: progress,
	};
});
</script>

<template>
	<Modal
		title="Your new snippet"
		tooltip="Add snippet"
		icon="i-heroicons-code-bracket-square-solid"
		:on-save="
			async () => {
				const resultToast =
					await snippetStore.createSnippet(newSnippet);
				toast.add(resultToast);
			}
		"
		:modal-completion-status="saveSnippetStatus"
		:is-save-loading="snippetStore.isLoading"
	>
		<SnippetModal @update:snippet="(val) => (newSnippet = val)" />
	</Modal>
	<Modal
		title="Your new guide"
		tooltip="Create new guide"
		icon="i-heroicons-bookmark-square-solid"
		:modal-completion-status="saveSnippetStatus"
		:is-save-loading="snippetStore.isLoading"
		:on-save="() => console.log('save guide')"
	>
		<GuideModal />
	</Modal>
</template>

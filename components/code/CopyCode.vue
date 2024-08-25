<script setup lang="ts">
const message = ref("Copy code");

const showMessage = () => {
	message.value = "Copied!";
};
const resetMessage = () => {
	message.value = "Copy code";
};
</script>

<template>
	<div>
		<UTooltip :text="message">
			<UButton
				@click="showMessage"
				@mouseout="resetMessage"
				color="gray"
				size="sm"
				class="opacity-70"
				variant="link"
				:padded="true"
				icon="i-heroicons-clipboard-solid"
			/>
		</UTooltip>
	</div>
</template>

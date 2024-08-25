<script setup lang="ts">
const props = defineProps({
	onClick: {
		type: Function,
		required: true,
	},
});
</script>

<template>
	<div>
		<UTooltip text="Clear code area">
			<UButton
				@click="onClick()"
				color="gray"
				size="sm"
				class="opacity-70"
				variant="link"
				:padded="true"
				icon="i-heroicons-trash-solid"
			/>
		</UTooltip>
	</div>
</template>

<style scoped></style>

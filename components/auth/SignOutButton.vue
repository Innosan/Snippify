<script setup lang="ts">
import { useAuthManager } from "~/composables/useAuthManager";

const { signOut } = useAuthManager();

const handleSignOut = async () => {
	const success = await signOut();
	if (success) {
		navigateTo("/login");
	}
};
</script>

<template>
	<UButton
		@click="handleSignOut"
		color="gray"
		variant="ghost"
		label="Log out"
		icon="i-heroicons-arrow-left-on-rectangle-solid"
	/>
</template>

<style scoped></style>

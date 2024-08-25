<script setup lang="ts">
import SignOutButton from "~/components/auth/SignOutButton.vue";
</script>

<template>
	<TitledSection
		title="Settings"
		icon="i-heroicons-cog-8-tooth-solid"
		description="Here you can change behaviour of an app!"
	>
		<div class="flex gap-4 items-center">
			<ThemeSwitch />
			<ColorSwitch />
		</div>
		<SignOutButton />
	</TitledSection>
</template>

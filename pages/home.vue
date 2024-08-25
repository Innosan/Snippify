<script setup lang="ts">
const tabs = [
	{ name: "Snippets", to: "snippets" },
	{ name: "Guides", to: "guides" },
];

const selectedFavTab = ref("snippets");
const selectedCommTab = ref("snippets");
</script>

<template>
	<TitledSection
		title="Favorite"
		icon="i-heroicons-star-solid"
		description="Only yours"
	>
		<template #switcher>
			<Tabs @update:selected-tab="selectedFavTab = $event" :tabs="tabs" />
		</template>
		<p v-if="selectedFavTab === 'snippets'">Snippets</p>
		<p v-else>Guides</p>
	</TitledSection>

	<TitledSection
		title="Community"
		icon="i-heroicons-users-solid"
		description="Find something new for you"
	>
		<template #switcher>
			<Tabs
				@update:selected-tab="selectedCommTab = $event"
				:tabs="tabs"
			/>
		</template>
		<p v-if="selectedCommTab === 'snippets'">Snippets</p>
		<p v-else>Guides</p>
	</TitledSection>

	<TitledSection
		title="Project startups"
		icon="i-heroicons-bolt-solid"
		description="Start developing with ease"
		:is-divided="false"
	/>
</template>

<script setup lang="ts">
import themesData from "public/data/themes.json";
import type { Theme } from "~/types/utils/Theme";
import TitledBlock from "~/components/containers/TitledBlock.vue";

const themes = themesData as Theme[];
const settingsStore = useSettingsStore();
</script>

<template>
	<TitledSection
		title="Settings"
		icon="i-heroicons-cog-8-tooth-solid"
		description="Here you can change behaviour of an app!"
	>
		<div class="grid grid-cols-3">
			<TitledSection
				title="App theme"
				spacing="gap-2"
				:is-divided="false"
			>
				<div class="flex gap-4 items-center">
					<TitledBlock title="Theme">
						<ThemeSwitch />
					</TitledBlock>
					<TitledBlock title="Color">
						<ColorSwitch />
					</TitledBlock>
				</div>
			</TitledSection>
			<TitledSection
				title="Code editor"
				spacing="gap-2"
				:is-divided="false"
			>
				<div class="flex gap-4 items-center">
					<TitledBlock title="Font size">
						<UInput
							v-model="settingsStore.fontSize"
							type="number"
							placeholder="16px"
						/>
					</TitledBlock>
					<TitledBlock title="Theme">
						<USelect
							:options="themes"
							option-attribute="name"
							value-attribute="name"
							v-model="settingsStore.theme"
							placeholder="Themes"
						/>
					</TitledBlock>
				</div>
			</TitledSection>
		</div>
	</TitledSection>
	<TitledSection
		title="Danger zone"
		icon="i-heroicons-exclamation-circle-solid"
		:is-divided="false"
		description="Here you can do something dangerous!"
	>
		<SignOutButton />
	</TitledSection>
</template>

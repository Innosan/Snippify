<script lang="ts" setup>
import SnippetModal from "~/components/modals/SnippetModal.vue";
import GuideModal from "~/components/modals/GuideModal.vue";
import Modal from "~/components/modals/Modal.vue";
import { getGenericSnippet, type Snippet } from "~/types/Snippet";

const user = useSupabaseUser();

const newSnippet: Snippet = reactive(getGenericSnippet());
</script>

<template>
	<header class="flex justify-between items-center gap-4">
		<div class="flex gap-6 items-center">
			<h1 class="font-black text-2xl text-nowrap text-primary">
				Snippify
			</h1>
			<div class="md:flex md:items-center gap-4 hidden" v-if="user">
				<TopNavigation :links="navigation" />
			</div>
		</div>
		<div v-if="user" class="flex gap-2">
			<Modal
				title="Your new snippet"
				tooltip="Add snippet"
				icon="i-heroicons-code-bracket-square-solid"
				:on-save="() => console.log('save snippet')"
				:is-save-disabled="
					newSnippet.title === '' ||
					newSnippet.description === '' ||
					newSnippet.code === ''
				"
			>
				<SnippetModal @save-snippet="(val) => (newSnippet = val)" />
			</Modal>
			<Modal
				title="Your new guide"
				tooltip="Create new guide"
				icon="i-heroicons-bookmark-square-solid"
				:on-save="() => console.log('save guide')"
			>
				<GuideModal />
			</Modal>

			<SidebarNavigation
				class="block md:hidden"
				:navigation="navigation"
			/>
		</div>
	</header>
</template>

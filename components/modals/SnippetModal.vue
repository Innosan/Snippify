<script setup lang="ts">
import { getGenericSnippet, type Snippet } from "~/types/Snippet";

import stacksData from "public/data/stacks.json";
import languagesData from "public/data/languages.json";
import tagsData from "public/data/tags.json";

import { type Language } from "~/types/utils/Language";
import { type Stack } from "~/types/utils/Stack";
import { type Tag } from "~/types/utils/Tag";

const stacks: Stack[] = stacksData;
const languages: Language[] = languagesData;
const tags: Tag[] = tagsData.sort((a, b) => a.name.localeCompare(b.name));

const emits = defineEmits(["update:snippet"]);

const snippet: Snippet = reactive(getGenericSnippet());

onMounted(() => {
	emits("update:snippet", snippet);
});
watch(snippet, (newVal) => {
	emits("update:snippet", newVal);
});
</script>

<template>
	<div class="flex flex-col gap-4">
		<div class="flex gap-2 flex-wrap">
			<UButton
				@click="snippet.is_public = !snippet.is_public"
				:icon="
					snippet.is_public
						? 'i-heroicons-lock-open-solid'
						: 'i-heroicons-lock-closed-solid'
				"
				:label="snippet.is_public ? 'Public' : 'Private'"
				:color="snippet.is_public ? 'white' : 'gray'"
			/>
			<USelectMenu
				searchable
				searchable-placeholder="JavaScript, Kotlin..."
				placeholder="Choose language"
				class="w-36"
				v-model="snippet.language"
				:options="languages"
				option-attribute="name"
				by="id"
				:search-attributes="['name', 'highlight']"
			>
				<template #option="{ option: lang }: { option: Language }">
					<div class="flex gap-2 items-center">
						<UIcon
							:name="`i-devicon-${lang.highlight}`"
							dynamic
							class="w-4 h-4"
						/>
						<p class="truncate">{{ lang.name }}</p>
					</div>
				</template>
			</USelectMenu>
			<USelectMenu
				searchable
				searchable-placeholder="Front-end, React..."
				placeholder="Choose stack"
				class="w-36"
				v-model="snippet.stack"
				:options="stacks as Stack[]"
				option-attribute="name"
				by="id"
				:search-attributes="['name']"
			>
				<template #option="{ option: stack }: { option: Stack }">
					<div class="flex gap-2 items-center">
						<UIcon
							:name="`i-devicon-${stack.deviconName}`"
							dynamic
							class="w-4 h-4"
						/>
						<p class="truncate">{{ stack.name }}</p>
					</div>
				</template>
			</USelectMenu>
			<USelectMenu
				searchable
				multiple
				searchable-placeholder="#component, #hook..."
				placeholder="Pick tags"
				class="w-36"
				v-model="snippet.tags"
				:options="tags"
				option-attribute="name"
				by="id"
				:search-attributes="['name']"
			>
				<template #option="{ option: tag }: { option: Tag }">
					<span class="truncate">{{ tag.name }}</span>
				</template>
			</USelectMenu>
		</div>
		<CodeEditor
			width="100%"
			placeholder="// Write your code here..."
			:language="snippet.language"
			height="20rem"
			:tab-spaces="4"
			:line-nums="true"
			v-model="snippet.code"
			:copy-code="false"
		/>
		<UInput
			icon="i-heroicons-bars-2-solid"
			v-model="snippet.title"
			placeholder="Name your snippet"
		/>
		<UTextarea v-model="snippet.description" placeholder="Describe it" />
	</div>
</template>

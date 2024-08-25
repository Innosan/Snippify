<script setup lang="ts">
import { getGenericSnippet, type Snippet } from "~/types/Snippet";

import stacksData from "public/data/stacks.json";
import languagesData from "public/data/languages.json";

import { type Language } from "~/types/utils/Language";
import { type Stack } from "~/types/utils/Stack";
import { type Tag, tags } from "~/types/utils/Tag";

const stacks: Stack[] = stacksData as Stack[];
const languages: Language[] = languagesData as Language[];

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
				searchable-placeholder="#component, #hook..."
				placeholder="Pick tags"
				class="w-36"
				v-model="snippet.tags[0]"
				:options="tags"
				option-attribute="title"
				by="id"
				:search-attributes="['title']"
			>
				<template #option="{ option: tag }: { option: Tag }">
					<span class="truncate">{{ tag.title }}</span>
				</template>
			</USelectMenu>
		</div>
		<CodeEditor
			width="100%"
			placeholder="// Write your code here..."
			:language="snippet.language"
			height="20rem"
			font-size="14px"
			:tab-spaces="4"
			class="h-64"
			:line-nums="true"
			v-model="snippet.code"
			:copy-code="false"
		/>
		<UInput v-model="snippet.title" placeholder="Title" />
		<UTextarea v-model="snippet.description" placeholder="Description" />
	</div>
</template>

<script setup lang="ts">
import hljs from "highlight.js";
import { getGenericSnippet, type Snippet } from "~/types/Snippet";

import { type Language, languages } from "~/types/utils/Language";
import { type Stack, stacks } from "~/types/utils/Stack";
import { type Tag, tags } from "~/types/utils/Tag";

const snippet: Snippet = reactive(getGenericSnippet());
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
				option-attribute="title"
				by="id"
				:search-attributes="['title']"
			>
				<template #option="{ option: lang }: { option: Language }">
					<div class="flex gap-2 items-center">
						<UIcon
							:name="`i-devicon-${lang.title.toLowerCase()}`"
							dynamic
							class="w-4 h-4"
						/>
						<p class="truncate">{{ lang.title }}</p>
					</div>
				</template>
			</USelectMenu>
			<USelectMenu
				searchable
				searchable-placeholder="Front-end, React..."
				placeholder="Choose stack"
				class="w-36"
				v-model="snippet.stack"
				:options="stacks"
				option-attribute="title"
				by="id"
				:search-attributes="['title']"
			>
				<template #option="{ option: stack }: { option: Stack }">
					<div class="flex gap-2 items-center">
						<UIcon
							:name="`i-devicon-${stack.title.toLowerCase()}`"
							dynamic
							class="w-4 h-4"
						/>
						<p class="truncate">{{ stack.title }}</p>
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
			:language="snippet.language"
			height="24rem"
			font-size="14px"
			:tab-spaces="4"
			class="h-64"
			:line-nums="true"
			v-model="snippet.code"
		/>
	</div>
</template>

<style scoped></style>

import type { Language } from "~/types/utils/Language";
import type { Tag } from "~/types/utils/Tag";
import type { Stack } from "~/types/utils/Stack";

import languages from "public/data/languages.json";
import stacks from "public/data/stacks.json";
import tags from "public/data/tags.json";

export type Snippet = {
	id: number;
	created_at: string;
	updated_at?: string;
	title: string;
	code: string;
	language: Language;
	tags: Tag[];
	description: string;
	stack: Stack;
	is_public: boolean;
	user: string;
};

export type DatabaseSnippet = {
	id: number;
	created_at: string;
	updated_at?: string;
	title: string;
	code: string;
	language: number;
	tags: number[];
	description: string;
	stack: number;
	is_public: boolean;
	user: string;
};

export const transformSnippets = (snippets: DatabaseSnippet[]): Snippet[] => {
	return snippets.map((snippet) => {
		const language = languages.find((lang) => lang.id === snippet.language);
		const stack = stacks.find((stack) => stack.id === snippet.stack);
		const snippetTags = tags.filter((tag) => snippet.tags.includes(tag.id));

		return {
			id: snippet.id,
			created_at: snippet.created_at,
			updated_at: snippet.updated_at,
			title: snippet.title,
			code: snippet.code,
			language: language as Language,
			tags: snippetTags as Tag[],
			description: snippet.description,
			stack: stack as Stack,
			is_public: snippet.is_public,
			user: snippet.user,
		};
	});
};

export const getGenericSnippet = (): Snippet => ({
	id: 0,
	created_at: "",
	updated_at: "",
	title: "",
	description: "",
	code: "",
	language: {
		id: 1,
		name: "JavaScript",
		highlight: "javascript",
	},
	tags: [],
	stack: {
		id: 0,
		name: "",
		deviconName: "",
		description: "",
	},
	is_public: false,
	user: "",
});

export const getSaveStatusMessage = (snippet: Snippet) => {
	if (snippet.title === "") return "Title is required";
	if (snippet.code === "") return "Code is required";
	if (snippet.description === "") return "Description is required";
	if (snippet.tags.length === 0) return "Tags are required";
	if (snippet.stack.id === 0) return "Stack is required";
	return "";
};

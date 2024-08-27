import type { Language } from "~/types/utils/Language";
import type { Tag } from "~/types/utils/Tag";
import type { Stack } from "~/types/utils/Stack";

import languages from "public/data/languages.json";
import stacks from "public/data/stacks.json";
import tags from "public/data/tags.json";
import type { ModalStep } from "~/types/ui/ModalStatus";

export type Snippet = {
	id: number;
	created_at?: string;
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
	created_at?: string;
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

export const getDatabaseSnippet = (snippet: Snippet): DatabaseSnippet => ({
	id: snippet.id,
	title: snippet.title,
	code: snippet.code,
	language: snippet.language.id,
	tags: snippet.tags.map((tag) => tag.id),
	description: snippet.description,
	stack: snippet.stack.id,
	is_public: snippet.is_public,
	user: snippet.user,
});

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

export const exampleSnippet: Snippet = {
	id: 0,
	title: "Example Snippet",
	code:
		"/**\n" +
		" * Generates a random number within the given range [min, max].\n\n" +
		" * @param { number } min - The minimum value of the range.\n" +
		" * @param { number } max - The maximum value of the range.\n\n" +
		" * @returns {number} - A random number within the specified range.\n" +
		" */\n" +
		"function getRandomNumberInRange(min: number, max: number): number {\n" +
		"\treturn Math.floor(Math.random() * (max - min + 1)) + min;\n" +
		"}",
	description: "Generates a random number within the given range [min, max].",
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
};

export const getSaveStatusMessage = (snippet: Snippet) => {
	const steps: ModalStep[] = [
		{ name: "Stack", isCompleted: snippet.stack.id !== 0 },
		{ name: "Tags", isCompleted: snippet.tags.length > 0 },
		{ name: "Code", isCompleted: snippet.code !== "" },
		{ name: "Title", isCompleted: snippet.title !== "" },
		{ name: "Description", isCompleted: snippet.description !== "" },
	];

	const incompleteStep = steps.find((step) => !step.isCompleted);
	const message = incompleteStep
		? `${incompleteStep.name} is required`
		: "You all set!";

	return { steps, message };
};

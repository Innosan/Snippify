import type { Language } from "~/types/utils/Language";
import type { Tag } from "~/types/utils/Tag";
import type { Stack } from "~/types/utils/Stack";

export type Snippet = {
	id: number;
	created_at: string;
	updated_at: string;
	title: string;
	description: string;
	code: string;
	language: Language;
	tags: Tag[];
	stack: Stack;
	is_public: boolean;
	user: string;
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

export const exampleSnippets: Snippet[] = [
	{
		id: 1,
		created_at: "2021-08-01T00:00:00Z",
		updated_at: "2021-08-01T00:00:00Z",
		title: "Example Snippet",
		description: "This is an example snippet.",
		code: "console.log('Hello, world!');",
		language: {
			id: 1,
			name: "JavaScript",
			highlight: "javascript",
		},
		tags: [
			{
				id: 1,
				title: "Example",
			},
		],
		stack: {
			id: 1,
			name: "Frontend",
			deviconName: "html5",
			description: "Frontend development",
		},
		is_public: true,
		user: "example",
	},
	{
		id: 2,
		created_at: "2021-08-01T00:00:00Z",
		updated_at: "2021-08-01T00:00:00Z",
		title: "Example Snippet 2",
		description: "This is an example snippet 2.",
		code: "console.log('Hello, world!');",
		language: {
			id: 1,
			name: "JavaScript",
			highlight: "javascript",
		},
		tags: [
			{
				id: 1,
				title: "Example",
			},
		],
		stack: {
			id: 1,
			name: "Frontend",
			deviconName: "html5",
			description: "Frontend development",
		},
		is_public: true,
		user: "example",
	},
];

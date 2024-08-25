import type { Language } from "~/types/utils/Language";
import type { Tag } from "~/types/utils/Tag";
import type { Stack } from "~/types/utils/Stack";
import { languages } from "~/types/utils/Language";

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
	language: languages[0],
	tags: [],
	stack: {
		id: 0,
		title: "",
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
		language: languages[0],
		tags: [
			{
				id: 1,
				title: "Example",
			},
		],
		stack: {
			id: 1,
			title: "Frontend",
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
		language: languages[0],
		tags: [
			{
				id: 1,
				title: "Example",
			},
		],
		stack: {
			id: 1,
			title: "Frontend",
		},
		is_public: true,
		user: "example",
	},
];

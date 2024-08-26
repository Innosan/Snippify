import { defineStore } from "pinia";

import {
	type DatabaseSnippet,
	type Snippet,
	transformSnippets,
} from "~/types/Snippet";

export const useSnippetsStore = defineStore("snippets", () => {
	const user = useSupabaseUser();
	const supabase = useSupabaseClient();

	const snippets = useState("snippets", () => [] as Snippet[]);

	const getUserSnippets = async () => {
		const { data, error } = await useAsyncData(
			"snippets-data",
			async () => {
				const { data } = await supabase
					.from("snippet")
					.select("*")
					.eq("user", user.value.id);

				return data;
			},
		);

		snippets.value = transformSnippets(data.value as DatabaseSnippet[]);
	};

	// const createSnippet = async (snippet: Snippet) => {
	// 	const { data, error } = await supabase
	// 		.from("snippet")
	// 		.insert([{ ...snippet, user: user.value.id }]);
	//
	// 	if (error) {
	// 		console.error(error);
	// 	} else {
	// 	}
	// };

	return {
		snippets,
		getUserSnippets,
	};
});

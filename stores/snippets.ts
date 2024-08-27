import { defineStore } from "pinia";

import {
	type DatabaseSnippet,
	type Snippet,
	getDatabaseSnippet,
	transformSnippets,
} from "~/types/Snippet";
import { getToast } from "~/utils/toasts";

export const useSnippetsStore = defineStore("snippets", () => {
	const user = useSupabaseUser();
	const supabase = useSupabaseClient();

	const isLoading = ref(false);

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

	const createSnippet = async (snippet: Snippet) => {
		isLoading.value = true;
		const databaseSnippet = getDatabaseSnippet(snippet);

		// @ts-ignore
		const { data, error } = await supabase.from("snippet").insert([
			{
				title: databaseSnippet.title,
				code: databaseSnippet.code,
				language: databaseSnippet.language,
				stack: databaseSnippet.stack,
				description: databaseSnippet.description,
				is_public: databaseSnippet.is_public,
				user: user.value.id,
				tags: databaseSnippet.tags,
			},
		]);

		await getUserSnippets();
		isLoading.value = false;

		return error
			? getToast(Toasts.ERROR, error.message)
			: getToast(Toasts.SUCCESS, "Snippet created successfully!");
	};

	return {
		snippets,
		isLoading,
		getUserSnippets,
		createSnippet,
	};
});

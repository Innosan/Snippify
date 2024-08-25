<script setup lang="ts">
definePageMeta({
	middleware: ["auth"],
});

const user = useSupabaseUser();
const supabase = useSupabaseClient();

watch(
	user,
	async () => {
		if (user.value) {
			const { data, error } = await supabase
				.from("user")
				.select("*")
				.eq("id", user.value.id)
				.single();

			if (data) {
				// Redirect to protected page
				return navigateTo("/");
			} else {
				await supabase.from("user").insert([
					{
						id: user.value.id,
						username: user.value.email,
					},
				]);

				// Redirect to protected page
				return navigateTo("/");
			}
		}
	},
	{ immediate: true },
);
</script>

<template>
	<p>Waiting for login...</p>
</template>

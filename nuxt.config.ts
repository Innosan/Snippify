export default defineNuxtConfig({
	devtools: { enabled: true },

	modules: [
		"@nuxt/ui",
		"@formkit/auto-animate/nuxt",
		"@pinia/nuxt",
		"@pinia-plugin-persistedstate/nuxt",
		"@nuxtjs/supabase",
	],

	components: [
		{
			path: "~/components",
			pathPrefix: false,
		},
	],

	supabase: {
		redirectOptions: {
			login: "/login",
			callback: "/confirm",
			include: undefined,
			exclude: [],
			cookieRedirect: false,
		},
	},

	css: ["~/assets/styles/main.css"],
});

const authProtectedRoutes = ["/login", "/confirm"];

export default defineNuxtRouteMiddleware((to, from) => {
	if (authProtectedRoutes.includes(to.path) && useSupabaseUser().value) {
		return navigateTo("/home");
	}
});

export const persistOptions = {
	persistCookies: {
		storage: persistedState.cookiesWithOptions({
			maxAge: 60 * 60 * 24 * 356, // 1 year
			sameSite: "strict",
		}),
	},
};

export const useSettingsStore = defineStore(
	"settings-store",
	() => {
		/**
		 * Theming settings
		 */
		const primaryColor = ref("violet");
		const grayColor = ref("zinc");

		const setPrimaryColor = (color: string) => {
			primaryColor.value = color;
		};

		const setGrayColor = (color: string) => {
			grayColor.value = color;
		};

		/**
		 * Editor settings
		 */
		const fontSize = ref(16);
		const theme = ref("github-dark-dimmed");

		const setFontSize = (size: number) => {
			fontSize.value = size;
		};

		const setTheme = (themeName: string) => {
			theme.value = themeName;
		};

		return {
			primaryColor,
			grayColor,
			setPrimaryColor,
			setGrayColor,

			fontSize,
			theme,
			setFontSize,
			setTheme,
		};
	},
	{
		persist: {
			storage: persistedState.cookiesWithOptions({
				maxAge: 60 * 60 * 24 * 120,
				sameSite: "strict",
			}),
		},
	},
);

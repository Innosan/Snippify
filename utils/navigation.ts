import type { NavigationLink } from "~/types/general";

export const navigation: NavigationLink[] = [
	{
		id: 1,
		to: "/home",
		label: "Home",
		icon: "i-heroicons-home-solid",
	},
	{
		id: 2,
		to: "/help",
		label: "Help",
		icon: "i-heroicons-user-group-solid",
	},
	{
		id: 3,
		to: "/settings",
		label: "Settings",
		icon: "i-heroicons-cog-8-tooth-solid",
	},
];

export const socials: NavigationLink[] = [
	{
		id: 1,
		to: "https://github.com",
		label: "GitHub",
		icon: "i-octicon-mark-github-16",
	},
	{
		id: 2,
		to: "https://telegram.com",
		label: "Telegram",
		icon: "i-streamline-telegram-solid",
	},
];

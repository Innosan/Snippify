<script setup lang="ts">
import { useAuthManager } from "~/composables/useAuthManager";

definePageMeta({
	middleware: ["auth"],
});

const { signInWithEmail, signUpWithPassword } = useAuthManager();

const isLoading = ref(false);

const isLogin = ref(true);

const formState = reactive({
	email: "",
	password: "",
	username: "",
});

watch(isLogin, (newVal) => {
	formState.email = "";
	formState.password = "";
	formState.username = "";
});

const handleAuth = async () => {
	isLoading.value = true;

	const success = isLogin.value
		? await signInWithEmail(formState.email, formState.password)
		: await signUpWithPassword(formState.email, formState.password);

	isLoading.value = false;

	if (success) navigateTo("/confirm");
};
</script>

<template>
	<UCard class="md:w-4/6 w-full m-auto">
		<template #header>
			<p class="text-2xl font-bold m-auto pb-4">I want to...</p>
			<div
				class="grid text-center md:gap-8 gap-4 grid-rows-2 md:grid-cols-2 md:grid-rows-none"
			>
				<UButton
					@click="isLogin = true"
					class="justify-center"
					label="Login"
					icon="i-heroicons-arrow-right-start-on-rectangle-solid"
					variant="solid"
					:color="isLogin ? 'gray' : 'white'"
				/>
				<UButton
					@click="isLogin = false"
					label="Create new account"
					class="justify-center"
					icon="i-heroicons-user-plus-solid"
					variant="solid"
					:color="!isLogin ? 'gray' : 'white'"
				/>
			</div>
		</template>
		<div class="flex flex-col gap-4">
			<div
				class="grid grid-rows-2 md:grid-cols-2 md:grid-rows-none gap-4"
			>
				<UInput
					type="email"
					v-model="formState.email"
					placeholder="joe@gmail.com"
					icon="i-heroicons-envelope-solid"
				/>
				<UInput
					v-model="formState.password"
					type="password"
					icon="i-heroicons-key-solid"
					placeholder="Your favorite RegEx"
				/>
			</div>
			<UInput
				v-if="!isLogin"
				v-model="formState.password"
				placeholder="Username"
			/>

			<UDivider label="Alternative options" />

			<div class="grid grid-cols-3 gap-6">
				<UButton color="white" label="GitHub" />
				<UButton color="white" label="Google" />
				<UButton color="white" label="Discord" />
			</div>
		</div>

		<template #footer>
			<UButton
				@click="handleAuth"
				:loading="isLoading"
				label="Continue"
				class="w-full justify-center"
				variant="solid"
				size="xl"
			/>
		</template>
	</UCard>
</template>

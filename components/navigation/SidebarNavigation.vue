<script setup lang="ts">
import type { NavigationLink } from "~/types/general";
import SignOutButton from "~/components/auth/SignOutButton.vue";

const props = defineProps({
	navigation: {
		type: Array<NavigationLink>,
	},
});

const isOpen = ref(false);
</script>

<template>
	<div>
		<UButton @click="isOpen = !isOpen" icon="i-heroicons-bars-3" />

		<USlideover v-model="isOpen">
			<UCard>
				<template #header>
					<div class="flex justify-between items-center">
						<p class="font-bold text-xl">Navigation</p>

						<UButton
							@click="isOpen = !isOpen"
							color="gray"
							variant="ghost"
							icon="i-heroicons-x-mark"
						/>
					</div>
				</template>
				<UVerticalNavigation :links="navigation" />
				<template #footer>
					<SignOutButton />
				</template>
			</UCard>
		</USlideover>
	</div>
</template>

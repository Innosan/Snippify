<script lang="ts" setup>
const user = useSupabaseUser();
</script>

<template>
	<header class="flex justify-between items-center gap-4">
		<div class="flex gap-6 items-center">
			<h1 class="font-black text-2xl text-nowrap text-primary">
				Snippify
			</h1>
			<div class="md:flex md:items-center gap-4 hidden" v-if="user">
				<TopNavigation :links="navigation" />
			</div>
		</div>
		<div v-if="user" class="flex gap-2">
			<ModalsContainer />

			<SidebarNavigation
				class="block md:hidden"
				:navigation="navigation"
			/>
		</div>
	</header>
</template>

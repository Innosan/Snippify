<script setup lang="ts">
import type { PropType } from "vue";
const emits = defineEmits(["update:selectedTab"]);

const props = defineProps({
	tabs: {
		type: Array as PropType<{ name: string; to: string }[]>,
		required: true,
	},
});

const selectedTab = ref(props.tabs[0].to);
const onTabSelect = (tab: string) => {
	selectedTab.value = tab;
	emits("update:selectedTab", tab);
};
</script>

<template>
	<div class="flex text-xl items-center divide-x-2">
		<div v-for="(tab, index) in tabs" :key="index">
			<UButton
				@click="onTabSelect(tab.to)"
				:label="tab.to"
				color="white"
				class="text-lg py-0 px-1.5 font-bold"
				:class="selectedTab === tab.to ? 'underline' : ' opacity-70'"
				variant="link"
			/>
		</div>
	</div>
</template>

<style scoped></style>

<script setup>
import hljs from "highlight.js/lib/core";
import "./themes/themes-base16.css";
import "./themes/themes.css";

const props = defineProps({
	lineNums: {
		type: Boolean,
		default: false,
	},
	placeholder: {
		type: String,
		default: "// Write your code here...",
	},
	modelValue: {
		type: String,
	},
	value: {
		type: String,
	},
	theme: {
		type: String,
		default: "github-dark",
	},
	tabSpaces: {
		type: Number,
		default: 2,
	},
	wrap: {
		type: Boolean,
		default: false,
	},
	readOnly: {
		type: Boolean,
		default: false,
	},
	autofocus: {
		type: Boolean,
		default: false,
	},
	header: {
		type: Boolean,
		default: true,
	},
	width: {
		type: String,
		default: "540px",
	},
	height: {
		type: String,
		default: "auto",
	},
	maxWidth: {
		type: String,
	},
	minWidth: {
		type: String,
	},
	maxHeight: {
		type: String,
	},
	minHeight: {
		type: String,
	},
	borderRadius: {
		type: String,
		default: "12px",
	},
	language: {
		type: Object,
		default: {
			id: 1,
			title: "JavaScript",
			highlight: "javascript",
		},
	},
	displayLanguage: {
		type: Boolean,
		default: true,
	},
	copyCode: {
		type: Boolean,
		default: true,
	},
	zIndex: {
		type: String,
		default: "0",
	},
	fontSize: {
		type: String,
		default: "17px",
	},
	padding: {
		type: String,
		default: "20px",
	},
});

const emits = defineEmits(["update:modelValue", "lang", "content", "textarea"]);

// Directives
const vHighlight = {
	mounted(el, binding) {
		el.textContent = binding.value;
		hljs.highlightElement(el);
		el.dataset.highlighted = true;
	},
	updated(el, binding) {
		if (el.scrolling) {
			el.scrolling = false;
		} else {
			el.textContent = binding.value;
			if (el.dataset.highlighted) {
				delete el.dataset.highlighted;
			}
			hljs.highlightElement(el);
			el.dataset.highlighted = true;
		}
	},
};

// Props
const scrollBarWidth = ref(0);
const scrollBarHeight = ref(0);
const top = ref(0);
const left = ref(0);
const content = ref(props.value);
const cursorPosition = ref(0);
const insertTab = ref(false);
const lineNum = ref(0);
const lineNumsWidth = ref(0);
const scrolling = ref(false);
const textareaHeight = ref(0);
const showLineNums = ref(props.wrap ? false : props.lineNums);

// DOM refs
const textarea = ref(null);
const code = ref(null);
const lineNums = ref(null);

// Computed refs
const tabWidth = computed(() => {
	let result = "";
	for (let i = 0; i < props.tabSpaces; i++) {
		result += " ";
	}
	return result;
});

const contentValue = computed(() => {
	return props.modelValue == undefined
		? content.value + "\n"
		: props.modelValue + "\n";
});

const scroll = computed(() => {
	return props.height == "auto" ? false : true;
});

// Functions
const removeLeadingTabs = (text) => {
	const lines = text.split("\n");
	const minLeadingTabs = Math.min(
		...lines
			.filter((line) => line.trim())
			.map((line) => line.match(/^\t*/)[0].length),
	);

	return lines.map((line) => line.slice(minLeadingTabs)).join("\n");
};

const updateValue = (e) => {
	const text = e.target.value;
	const processedText = removeLeadingTabs(text);
	if (props.modelValue == undefined) {
		content.value = processedText;
	} else {
		emits("update:modelValue", processedText);
	}
};

const tab = () => {
	if (document.execCommand("insertText")) {
		document.execCommand("insertText", false, tabWidth.value);
	} else {
		const localCursorPosition = textarea.value.selectionStart;
		content.value =
			content.value.substring(0, localCursorPosition) +
			tabWidth.value +
			content.value.substring(localCursorPosition);
		cursorPosition.value = localCursorPosition + tabWidth.value.length;
		insertTab.value = true;
	}
};

const calsScrollDistance = (e) => {
	code.value.scrolling = true;
	scrolling.value = true;
	top.value = -e.target.scrollTop;
	left.value = -e.target.scrollLeft;
};

const resizer = () => {
	// textareaResizer
	const textareaResizer = new ResizeObserver((entries) => {
		scrollBarWidth.value =
			entries[0].target.offsetWidth - entries[0].target.clientWidth;
		scrollBarHeight.value =
			entries[0].target.offsetHeight - entries[0].target.clientHeight;
		textareaHeight.value = entries[0].target.offsetHeight;
	});
	textareaResizer.observe(textarea.value);
	// lineNumsResizer
	const lineNumsResizer = new ResizeObserver((entries) => {
		lineNumsWidth.value = entries[0].target.offsetWidth;
	});
	if (lineNums.value) {
		lineNumsResizer.observe(lineNums.value);
	}
};

const copy = () => {
	if (document.execCommand("copy")) {
		textarea.value.select();
		document.execCommand("copy");
		window.getSelection().removeAllRanges();
	} else {
		navigator.clipboard.writeText(textarea.value.value);
	}
};

const getLineNum = () => {
	// lineNum
	const str = textarea.value.value;
	let localLineNum = 0;
	let position = str.indexOf("\n");
	while (position !== -1) {
		localLineNum++;
		position = str.indexOf("\n", position + 1);
	}
	// heightNum
	const singleLineHeight = lineNums.value.firstChild.offsetHeight;
	const heightNum = parseInt(textareaHeight.value / singleLineHeight) - 1;
	// displayed lineNum
	lineNum.value =
		props.height == "auto"
			? localLineNum
			: localLineNum > heightNum
			  ? localLineNum
			  : heightNum;
};

// Lifecycle
onMounted(() => {
	emits("lang", props.language);
	emits("content", content.value);
	emits("textarea", textarea.value);

	resizer();
});

onUpdated(() => {
	if (insertTab.value) {
		textarea.value.setSelectionRange(
			cursorPosition.value,
			cursorPosition.value,
		);
		insertTab.value = false;
	}
	if (lineNums.value) {
		if (scrolling.value) {
			scrolling.value = false;
		} else {
			getLineNum();
		}
	}
});
</script>

<template>
	<div
		:theme="theme"
		class="code-editor"
		:class="{
			'hide-header': !header,
			scroll: scroll,
			'read-only': readOnly,
			wrap: wrap,
		}"
		:style="{
			width: width,
			height: height,
			zIndex: zIndex,
			maxWidth: maxWidth,
			minWidth: minWidth,
			maxHeight: maxHeight,
			minHeight: minHeight,
		}"
	>
		<div class="hljs" :style="{ borderRadius: borderRadius }">
			<div
				class="header items-center border-0 flex justify-between ring-1 ring-gray-700"
				:class="{ border: showLineNums }"
				v-if="header"
				:style="{
					borderRadius: borderRadius + ' ' + borderRadius + ' 0 0',
				}"
			>
				<p class="text-sm opacity-70 pl-3">{{ language.title }}</p>
				<CopyCode @click="copy" v-if="copyCode" />
			</div>
			<div
				class="code-area ring-1 ring-gray-700"
				:style="{
					borderRadius: header
						? '0 0 ' + borderRadius + ' ' + borderRadius
						: borderRadius,
				}"
			>
				<div
					v-if="showLineNums"
					ref="lineNums"
					class="line-nums hljs"
					:style="{
						fontSize: fontSize,
						paddingTop: header ? '10px' : padding,
						paddingBottom: padding,
						top: top + 'px',
					}"
				>
					<div>1</div>
					<div v-for="num in lineNum">{{ num + 1 }}</div>
					<div>&nbsp;</div>
				</div>
				<textarea
					title="textarea"
					:placeholder="placeholder"
					:readOnly="readOnly"
					:style="{
						fontSize: fontSize,
						padding: !header
							? padding
							: lineNums
							  ? '10px ' + padding + ' ' + padding
							  : '0 ' + padding + ' ' + padding,
						marginLeft: showLineNums ? lineNumsWidth + 'px' : '0',
						width: showLineNums
							? 'calc(100% - ' + lineNumsWidth + 'px)'
							: '100%',
					}"
					ref="textarea"
					:autofocus="autofocus"
					spellcheck="false"
					@keydown.tab.prevent.stop="tab"
					@scroll="calsScrollDistance"
					:value="modelValue == undefined ? content : modelValue"
					@input="updateValue"
				/>
				<pre
					:style="{
						paddingRight: scrollBarWidth + 'px',
						paddingBottom: scrollBarHeight + 'px',
						marginLeft: showLineNums ? lineNumsWidth + 'px' : '0',
						width: showLineNums
							? 'calc(100% - ' + lineNumsWidth + 'px)'
							: '100%',
					}"
				>
					<code
						ref="code"
						:class="'language-' + language.highlight"
						v-highlight="contentValue"
						:style="{
						top: top + 'px',
						left: left + 'px',
						fontSize: fontSize,
						padding: !header ? padding : lineNums ? '10px ' + padding + ' ' + padding : '0 ' + padding + ' ' + padding,
					  }">
					</code>
				</pre>
			</div>
		</div>
	</div>
</template>

<style scoped>
.code-editor {
	position: relative;
}
.code-editor > div {
	width: 100%;
	height: 100%;
}
/* header */
.code-editor .header {
	box-sizing: border-box;
	position: relative;
	z-index: 1;
	height: 34px;
}
.code-editor .header > .dropdown {
	top: 12px;
	left: 18px;
}
.code-editor .header > .copy-code {
	position: absolute;
	top: 10px;
	right: 12px;
}
/* code-area */
.code-editor .code-area {
	position: relative;
	z-index: 0;
	text-align: left;
	overflow: hidden;
}
/* font style */
.code-editor .code-area > textarea,
.code-editor .code-area > pre > code,
.code-editor .line-nums > div {
	font-family: Consolas, Monaco, monospace;
	line-height: 1.5;
}
.code-editor .code-area > textarea:hover,
.code-editor .code-area > textarea:focus-visible {
	outline: none;
}
.code-editor .code-area > textarea {
	position: absolute;
	z-index: 1;
	top: 0;
	left: 0;
	overflow-y: hidden;
	box-sizing: border-box;
	caret-color: rgb(127, 127, 127);
	color: transparent;
	white-space: pre;
	word-wrap: normal;
	border: 0;
	width: 100%;
	height: 100%;
	background: none;
	resize: none;
}
.code-editor .code-area > pre {
	box-sizing: border-box;
	position: relative;
	z-index: 0;
	overflow: hidden;
	font-size: 0;
	margin: 0;
}
.code-editor .code-area > pre > code {
	background: none;
	display: block;
	position: relative;
	overflow-x: visible !important;
	border-radius: 0;
	box-sizing: border-box;
	margin: 0;
}
/* wrap code */
.code-editor.wrap .code-area > textarea,
.code-editor.wrap .code-area > pre > code {
	white-space: pre-wrap;
	word-wrap: break-word;
}
/* hide-header */
.code-editor.hide-header.scroll .code-area {
	height: 100%;
}
/* scroll */
.code-editor.scroll .code-area {
	height: calc(100% - 34px);
}
.code-editor.scroll .code-area > textarea {
	overflow: auto;
}
.code-editor.scroll .code-area > pre {
	width: 100%;
	height: 100%;
	overflow: hidden;
}

/* line-nums */
.code-editor .line-nums {
	min-width: 36px;
	text-align: right;
	box-sizing: border-box;
	position: absolute;
	left: 0;
	padding-right: 8px;
	padding-left: 8px;
	opacity: 0.3;
}
.code-editor .line-nums::after {
	content: "";
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	border-right: 1px solid currentColor;
	opacity: 0.5;
}
.code-editor .header.border::after {
	content: "";
	position: absolute;
	width: 100%;
	height: 1px;
	bottom: 0;
	left: 0;
	background: currentColor;
	opacity: 0.15;
}
</style>

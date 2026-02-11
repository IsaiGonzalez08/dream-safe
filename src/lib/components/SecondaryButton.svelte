<script lang="ts">
	import type { MouseEventHandler } from 'svelte/elements';

	let {
		label,
		className = '',
		onClick = () => {},
		toggleable = false,
		selected = false,
		icon = ''
	}: {
		label: string;
		className?: string;
		active?: boolean;
		onClick?: MouseEventHandler<HTMLButtonElement>;
		toggleable?: boolean;
		selected?: boolean;
		icon?: string;
	} = $props();
</script>

<button
	class="flex w-full items-center justify-center rounded-lg border border-primary py-3 font-dm-sans text-lg font-bold {toggleable &&
	selected
		? 'bg-primary text-white'
		: 'bg-white text-primary'} {className}"
	onclick={onClick}
>
	{#if icon}
		<img src={icon} alt="icon" />
	{/if}
	{label}
</button>

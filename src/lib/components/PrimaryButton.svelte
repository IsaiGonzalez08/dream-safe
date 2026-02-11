<script lang="ts">
	import type { MouseEventHandler } from 'svelte/elements';

	let {
		label,
		className = '',
		active = true,
		onClick = () => {}
	}: {
		label: string;
		className?: string;
		active?: boolean;
		onClick?: MouseEventHandler<HTMLButtonElement>;
	} = $props();
</script>

<button
	class="flex w-full items-center justify-center rounded-md border-none py-3 font-dm-sans text-lg font-bold
        {className}
        {active
		? 'cursor-pointer bg-primary text-white'
		: 'cursor-not-allowed bg-secondary text-softBlue'}"
	disabled={!active}
	onclick={onClick}
>
	{label}
</button>

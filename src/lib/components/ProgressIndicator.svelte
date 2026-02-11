<script>
	import { step } from '$lib/stores/form';

	let { username, policyNumber, steps = 7 } = $props();
</script>

<div class="flex w-full items-center justify-between font-dm-sans text-sm">
	<h2>{username}</h2>
	<h2 class="text-[#00000050]">Policy Number: {policyNumber}</h2>
</div>
<div class="mb-8 flex w-full items-center gap-1">
	{#each Array.from({ length: steps }) as _, i}
		<div
			class="h-3 w-full {i + 1 <= $step ? 'bg-[#9BB1FF]' : 'bg-secondary'} {i === 0
				? 'rounded-l-sm'
				: ''} {i === steps - 1 ? 'rounded-r-sm' : ''}"
		></div>
	{/each}
</div>

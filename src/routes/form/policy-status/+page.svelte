<script lang="ts">
	import { onMount } from 'svelte';
	import { step, isFormValid, lossType } from '$lib/stores/form';
	import Heading from '$lib/components/Heading.svelte';

	onMount(() => {
		step.set(5);
		isFormValid.set(true);
	});
</script>

<Heading title="Coverage and policy status" />
<p class="font-dm-sans">Please review them to make sure everything looks good before continuing.</p>
<div class="mb-6 px-2">
	<div class="rounded-xl bg-[#E1E6F850] px-3 py-7">
		<div class="flex flex-col items-center gap-3 font-dm-sans">
			<p class="text-sm text-[#00000060]">Insured</p>
			<p class="text-lg">Michael Brown</p>
		</div>
		<hr class="my-6 text-[#DCE4FF]" />
		<div class="flex flex-row">
			<div class="flex w-1/2 flex-col items-start gap-3 font-dm-sans">
				<p class="text-sm text-[#00000060]">Policy Number</p>
				<p class="text-lg">HNA00489</p>
			</div>
			<div class="flex w-1/2 flex-col items-start gap-3 font-dm-sans">
				<p class="text-sm text-[#00000060]">Policy Type</p>
				{#if $lossType === 'autoloss'}
					<span class="flex items-center gap-2 text-lg"
						><img src="/car.svg" alt="car" /> Auto Loss</span
					>
				{/if}
				{#if $lossType === 'homeloss'}
					<span class="flex items-center gap-2 text-lg"
						><img src="/house.svg" alt="house" /> Home Loss</span
					>
				{/if}
			</div>
		</div>
		<hr class="my-6 text-[#DCE4FF]" />
		<div class="flex flex-row">
			<div class="flex w-1/2 flex-col items-start gap-3 font-dm-sans">
				<p class="text-sm text-[#00000060]">Coverage Limits</p>
				<p class="text-sm">$40,000</p>
			</div>
			<div class="flex w-1/2 flex-col items-start gap-3 font-dm-sans">
				<p class="text-sm text-[#00000060]">Deductible</p>
				<p class="text-sm">$500</p>
			</div>
		</div>
	</div>
</div>

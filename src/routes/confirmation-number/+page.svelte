<script>
	import { goto } from '$app/navigation';
	import { lossType } from '$lib/stores/form';
	import { progressStepValues } from '$lib';
	import PrimaryButton from '$lib/components/PrimaryButton.svelte';
	import SecondaryButton from '$lib/components/SecondaryButton.svelte';
	import Heading from '$lib/components/Heading.svelte';

	function handleContinue() {
		goto('/thanks');
	}
</script>

<main class="flex h-dvh flex-col px-4 py-8">
	<div class="flex w-full justify-center">
		<img src="/images/logo.png" alt="logo" />
	</div>
	<div class="mt-14">
		<Heading title="All done!" />
		<p class="font-dm-sans">Your claim has been successfully submitted.</p>
	</div>
	<div class="my-6 px-2">
		<div class="rounded-xl bg-[#E1E6F850] px-3 py-7">
			<div class="flex flex-row">
				<div class="flex w-1/2 flex-col items-start gap-3 font-dm-sans">
					<p class="text-sm text-[#00000060]">Claim Number</p>
					<p class="text-lg">FN-525100</p>
				</div>
				<div class="flex w-1/2 flex-col items-start gap-3 font-dm-sans">
					<p class="text-sm text-[#00000060]">Insured</p>
					<p class="text-lg">Michael Brown</p>
				</div>
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
						<span class="flex items-center gap-2 text-lg"><img src="/car.svg" alt="car" /> Auto Loss</span>
					{/if}
					{#if $lossType === 'homeloss'}
						<span class="flex items-center gap-2 text-lg"><img src="/house.svg" alt="house" /> Home Loss</span>
					{/if}
				</div>
			</div>
			<hr class="my-6 text-[#DCE4FF]" />
			<div class="font-dm-sans">
				<p class="text-sm">You've successfully submitted your claim</p>
				<div class="relative mt-5 flex flex-row gap-3">
					<div class="absolute top-2 right-[12.5%] left-[12.5%] h-0.5 bg-[#00000020]"></div>
					{#each progressStepValues as option (option.id)}
						<div class="flex flex-1 flex-col items-center gap-3">
							<div
								class="relative z-10 min-h-4 min-w-4 rounded-full {option.value === 'Active'
									? 'bg-[#6BE995]'
									: 'border border-[#000000] bg-[#FFFFFF]'}"
							></div>
							<div class="flex h-full flex-col items-center justify-between gap-1">
								<p class="text-center text-sm">{option.label}</p>
								<p class="text-center text-xs text-[#00000040]">{option.description}</p>
							</div>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
	<div class="mt-auto flex flex-col gap-3">
		<PrimaryButton label="Continue" onClick={handleContinue} />
		<SecondaryButton label="Speak to an Agent" icon="/call.svg" className="gap-2" />
	</div>
</main>

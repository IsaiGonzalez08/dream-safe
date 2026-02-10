<script lang="ts">
	import { goto } from '$app/navigation';
	import PrimaryButton from '$lib/components/PrimaryButton.svelte';
</script>

<main
	class="flex h-dvh w-full flex-col bg-contain bg-no-repeat font-dm-serif-display md:bg-cover lg:flex-row lg:justify-between"
	style="background-image: url('/images/bg-init.png')"
>
	<div class="mx-5 my-10 flex flex-col items-center justify-between lg:mx-14 lg:items-start">
		<div class="flex justify-center">
			<img src="/images/white-logo.png" alt="logo" />
		</div>
		<p class="hidden font-dm-sans text-lg text-white lg:block">
			Live in Harmony. Balance your life with insurance that harmonizes with your lifestyle.
		</p>
	</div>
	<div class="absolute right-0 bottom-0 left-0 flex flex-col lg:static">
		<div
			class="rounded-t-2xl bg-white px-9 py-10 lg:flex lg:h-full lg:flex-col lg:rounded-t-none lg:rounded-l-2xl"
		>
			<div class="flex h-full flex-col justify-center">
				<h2 class="text-3xl text-black">Welcome! We're here to help you file your claim.</h2>
				<p class="mt-4 font-dm-sans text-black">Rest assured. We’ve got your back.</p>
				<PrimaryButton className="mt-6" label="Get Started" onClick={() => goto('/form')} />
			</div>
		</div>
	</div>
</main>

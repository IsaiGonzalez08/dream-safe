<script lang="ts">
	import PrimaryButton from '$lib/components/PrimaryButton.svelte';
	import ProgressIndicator from '$lib/components/ProgressIndicator.svelte';
	import Loading from '$lib/components/Loading.svelte';
	import { isFormValid, step, isLoading, customButtons } from '$lib/stores/form';
	import { goto } from '$app/navigation';
	import { formRoutes } from '$lib';
	import { setContext } from 'svelte';
	let { children } = $props();

	export function getNextRoute(currentStep: number) {
		return formRoutes[currentStep] ?? null;
	}

	let customContinueHandler: (() => void) | null = $state(null);

	function setCustomContinueHandler(handler: (() => void) | null) {
		customContinueHandler = handler;
	}

	setContext('setCustomContinueHandler', setCustomContinueHandler);

	function handleContinue() {
		if (customContinueHandler) {
			customContinueHandler();
			return;
		}

		const nextRoute = getNextRoute($step);
		if (nextRoute) {
			goto(nextRoute);
		}
	}
</script>

{#if $isLoading}
	<Loading />
{/if}

<div class="flex min-h-dvh flex-col items-center px-4 py-8">
	<div class="flex w-full flex-1 flex-col">
		<div class="mb-16 flex justify-center">
			<img src="/images/logo.png" alt="logo" />
		</div>
		<div class="flex flex-1 flex-col gap-4">
			<ProgressIndicator username="Michael Brown" policyNumber="HNA00489" />
			{@render children()}
		</div>
	</div>
	{#if !$customButtons}
		<PrimaryButton label="Continue" active={$isFormValid} onClick={handleContinue} />
	{/if}
</div>

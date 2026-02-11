<script lang="ts">
	import Heading from '$lib/components/Heading.svelte';
	import PrimaryButton from '$lib/components/PrimaryButton.svelte';
	import SecondaryButton from '$lib/components/SecondaryButton.svelte';
	import { onMount } from 'svelte';
	import { step, isFormValid, customButtons } from '$lib/stores/form';
	import { goto } from '$app/navigation';

	let random = Math.floor(Math.random() * 2) + 1;

	function handleBack() {
		goto('/form/photo-document');
	}

	function handleCreateClaim() {
		goto('/confirmation-number');
	}

	onMount(() => {
		step.set(7);
		isFormValid.set(true);
		customButtons.set(true);
	});
</script>

<img src="/images/claim-assessment-{random}.png" alt="claim-assessment" />
<Heading title="Ready to file? " />
<p class="font-dm-sans">
	With the details you've shared, we can move forward with your claim submission immediately.
</p>

<div class="mt-auto flex gap-4 pb-4">
	<SecondaryButton label="Back" onClick={handleBack} />
	<PrimaryButton label="Create Claim" onClick={handleCreateClaim} />
</div>

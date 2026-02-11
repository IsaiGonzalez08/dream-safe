<script lang="ts">
	import { customButtons, step } from '$lib/stores/form';
	import { onMount } from 'svelte';
	import { isFormValid } from '$lib/stores/form';
	import { relationValues } from '$lib';
	import * as Select from '$lib/components/ui/select/index.js';
	import Heading from '$lib/components/Heading.svelte';
	import SecondaryButton from '$lib/components/SecondaryButton.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import Textarea from '$lib/components/ui/textarea/textarea.svelte';

	let nameValue = $state('');
	let phoneValue = $state('');
	let relationValue = $state('');
	let insuranceValue = $state('');
	let descriptionValue = $state('');
	let thirdPartyAnswer = $state<string | null>(null);

	const relationTriggerContent = $derived(
		relationValues.find((f) => f.value === relationValue)?.label ?? 'Select a option'
	);

	$effect(() => {
		if (thirdPartyAnswer === 'yes') {
			isFormValid.set(
				nameValue !== '' &&
					phoneValue !== '' &&
					relationValue !== '' &&
					insuranceValue !== '' &&
					descriptionValue !== ''
			);
		} else {
			isFormValid.set(true);
		}
	});

	function handleThirdPartySelection(answer: string) {
		thirdPartyAnswer = answer;
	}

	onMount(() => {
		step.set(3);
		isFormValid.set(false);
		customButtons.set(false);
	});
</script>

<Heading title="People involved" />
<p class="font-dm-sans">Now, let's talk about third parties.</p>
<p class="mt-4 font-dm-sans">Are third parties involved?</p>
<div class="flex gap-4">
	<SecondaryButton
		label="Yes"
		className="py-2!"
		toggleable={true}
		selected={thirdPartyAnswer === 'yes'}
		onClick={() => handleThirdPartySelection('yes')}
	/>
	<SecondaryButton
		label="No"
		className="py-2!"
		toggleable={true}
		selected={thirdPartyAnswer === 'no'}
		onClick={() => handleThirdPartySelection('no')}
	/>
</div>
{#if thirdPartyAnswer === 'yes'}
	<div class="mb-6 flex flex-col gap-4 font-dm-sans">
		<div class="flex w-full flex-col gap-2">
			<label for="name">Name</label>
			<Input type="text" id="name" placeholder="First name" bind:value={nameValue} class="w-full" />
		</div>

		<div class="flex w-full flex-col gap-2">
			<label for="phone">Phone Number</label>
			<Input
				type="tel"
				id="phone"
				placeholder="(+1 8974 7287)"
				bind:value={phoneValue}
				class="w-full"
			/>
		</div>

		<div class="flex w-full flex-col gap-2">
			<label for="relation">Relation</label>
			<Select.Root type="single" name="relation" bind:value={relationValue}>
				<Select.Trigger class="w-full">
					{relationTriggerContent}
				</Select.Trigger>
				<Select.Content>
					<Select.Group>
						{#each relationValues as option (option.value)}
							<Select.Item value={option.value} label={option.label}>
								{option.label}
							</Select.Item>
						{/each}
					</Select.Group>
				</Select.Content>
			</Select.Root>
		</div>

		<div class="flex w-full flex-col gap-2">
			<label for="insurance">Provide the insurance of third party</label>
			<Input
				type="text"
				id="insurance"
				placeholder="(GEICO A123456)"
				bind:value={insuranceValue}
				class="w-full"
			/>
		</div>

		<div class="flex flex-col gap-2">
			<label for="description">Description of damage</label>
			<Textarea bind:value={descriptionValue} class="min-h-32 w-full" placeholder="Collision" />
		</div>
	</div>
{/if}

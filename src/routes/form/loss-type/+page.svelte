<script lang="ts">
	import { customButtons, isFormValid, step, lossType } from '$lib/stores/form';
	import { onMount } from 'svelte';
	import { radioOptions, formRoutes } from '$lib';
	import { goto } from '$app/navigation';
	import { forms } from '$lib';
	import * as Select from '$lib/components/ui/select/index.js';
	import Heading from '$lib/components/Heading.svelte';
	import RadioItem from '$lib/components/RadioItem.svelte';
	import PrimaryButton from '$lib/components/PrimaryButton.svelte';
	import SecondaryButton from '$lib/components/SecondaryButton.svelte';
	import Textarea from '$lib/components/ui/textarea/textarea.svelte';

	let autoLossValue = $state('');
	let homeLossValue = $state('');
	let selectedValue = $state(null);
	let autoDescriptionValue = $state('');
	let homeDescriptionValue = $state('');

	const hasAutoForm = $derived(autoLossValue !== '' && autoDescriptionValue.trim() !== '');
	const hasHomeForm = $derived(homeLossValue !== '' && homeDescriptionValue.trim() !== '');

	const autoTriggerContent = $derived(
		forms.autoLossOptions.find((f) => f.value === autoLossValue)?.label ?? 'Select a option'
	);

	const homeTriggerContent = $derived(
		forms.homeLossOptions.find((f) => f.value === homeLossValue)?.label ?? 'Select a option'
	);

	const isValid = $derived(
		selectedValue === 'autoloss' ? hasAutoForm : selectedValue === 'homeloss' ? hasHomeForm : false
	);

	function saveLossType() {
		lossType.set(selectedValue);
	}

	function getNextRoute(currentStep: number) {
		return formRoutes[currentStep] ?? null;
	}

	function handleContinue() {
		saveLossType();
		const nextRoute = getNextRoute($step);
		if (nextRoute) {
			goto(nextRoute);
		}
	}

	$effect(() => {
		isFormValid.set(isValid);
		customButtons.set(selectedValue !== null);
	});

	onMount(() => {
		step.set(2);
		isFormValid.set(false);
	});
</script>

<Heading title="What type of loss did you experience? " />
<p class="font-dm-sans">Select from the options below.</p>
<div id="radio-group" class="flex flex-col gap-4 font-dm-sans">
	{#each radioOptions as option}
		{#if selectedValue === null || selectedValue === option.value}
			<RadioItem
				label={option.label}
				value={option.value}
				bind:group={selectedValue}
				description={option.description}
				icon={option.icon}
			/>
		{/if}
	{/each}
	{#if selectedValue === 'autoloss'}
		<div class="flex flex-col gap-4 px-5">
			<div class="flex flex-col gap-2">
				<label for="autoLoss">Tell us a bit more</label>
				<Select.Root type="single" name="autoLoss" bind:value={autoLossValue}>
					<Select.Trigger class="w-full">
						{autoTriggerContent}
					</Select.Trigger>
					<Select.Content>
						<Select.Group>
							{#each forms.autoLossOptions as option (option.value)}
								<Select.Item value={option.value} label={option.label}>
									{option.label}
								</Select.Item>
							{/each}
						</Select.Group>
					</Select.Content>
				</Select.Root>
			</div>
			<div class="flex flex-col gap-2">
				<label for="description">Description of damage</label>
				<Textarea
					bind:value={autoDescriptionValue}
					class="min-h-32 w-full"
					placeholder="Collision"
				/>
			</div>
		</div>
	{/if}
	{#if selectedValue === 'homeloss'}
		<div class="flex flex-col gap-4 px-5">
			<div class="flex flex-col gap-2">
				<label for="homeLoss">Tell us a bit more</label>
				<Select.Root type="single" name="homeLoss" bind:value={homeLossValue}>
					<Select.Trigger class="w-full">
						{homeTriggerContent}
					</Select.Trigger>
					<Select.Content>
						<Select.Group>
							{#each forms.homeLossOptions as option (option.value)}
								<Select.Item value={option.value} label={option.label}>
									{option.label}
								</Select.Item>
							{/each}
						</Select.Group>
					</Select.Content>
				</Select.Root>
			</div>
			<div class="flex flex-col gap-2">
				<label for="description">Description of damage</label>
				<Textarea
					bind:value={homeDescriptionValue}
					class="min-h-32 w-full"
					placeholder="Fire damage"
				/>
			</div>
		</div>
	{/if}
</div>
{#if $customButtons}
	<div class="mt-auto flex items-center justify-center gap-3">
		<SecondaryButton
			label="Back"
			onClick={() => {
				selectedValue = null;
				customButtons.set(false);
			}}
		/>
		<PrimaryButton label="Continue" active={$isFormValid} onClick={handleContinue} />
	</div>
{/if}

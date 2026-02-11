<script lang="ts">
	import { step, isFormValid, isLoading } from '$lib/stores/form';
	import { onMount, onDestroy, getContext } from 'svelte';
	import { goto } from '$app/navigation';
	import { Calendar as CalendarIcon } from '@lucide/svelte';
	import { CalendarDate, getLocalTimeZone, today } from '@internationalized/date';
	import * as Popover from '$lib/components/ui/popover/index.js';
	import Heading from '$lib/components/Heading.svelte';
	import SecondaryButton from '$lib/components/SecondaryButton.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import Calendar from '$lib/components/ui/calendar/calendar.svelte';

	const id = $props.id();
	let open = $state(false);
	let reportNumber = $state('');
	let dateValue = $state<CalendarDate | undefined>();
	let officersName = $state('');
	let agencyResponseValue = $state('');
	let reportResponse = $state<string | null>(null);
	let departmentResponse = $state<string | null>(null);

	const setCustomContinueHandler = getContext<(handler: (() => void) | null) => void>(
		'setCustomContinueHandler'
	);

	function handleReportSelection(answer: string) {
		reportResponse = answer;
	}

	function handleDepartmentSelection(answer: string) {
		departmentResponse = answer;
	}

	function handleCustomContinue() {
		isLoading.set(true);

		setTimeout(() => {
			isLoading.set(false);
			goto('/form/policy-status');
		}, 5000);
	}

	function validateForm(): boolean {
		const bothSelected = reportResponse !== null && departmentResponse !== null;
		if (!bothSelected) return false;

		const bothYes = reportResponse === 'yes' && departmentResponse === 'yes';
		const bothNo = reportResponse === 'no' && departmentResponse === 'no';
		const reportYes = reportResponse === 'yes';
		const deptYes = departmentResponse === 'yes';

		if (bothNo) return true;

		const reportFieldsValid = !!(reportNumber && dateValue && officersName);
		const deptFieldValid = !!agencyResponseValue;

		if (bothYes) return reportFieldsValid && deptFieldValid;
		if (reportYes) return reportFieldsValid;
		if (deptYes) return deptFieldValid;

		return false;
	}

	$effect(() => {
		isFormValid.set(validateForm());
	});

	onMount(() => {
		step.set(4);
		isFormValid.set(false);
		setCustomContinueHandler(handleCustomContinue);
	});

	onDestroy(() => {
		setCustomContinueHandler(null);
	});
</script>

<Heading title="Police & emergency services" />
<p class="font-dm-sans">Please complete the following section.</p>

<div class="mb-6 flex flex-col gap-4 font-dm-sans">
	<p class="mt-4">Did the police file a report?</p>
	<div class="flex gap-4">
		<SecondaryButton
			label="Yes"
			className="py-2!"
			toggleable={true}
			selected={reportResponse === 'yes'}
			onClick={() => handleReportSelection('yes')}
		/>
		<SecondaryButton
			label="No"
			className="py-2!"
			toggleable={true}
			selected={reportResponse === 'no'}
			onClick={() => handleReportSelection('no')}
		/>
	</div>
	{#if reportResponse === 'yes'}
		<div class="flex w-full flex-col gap-2">
			<label for="reportNumber">Report number</label>
			<Input
				type="number"
				id="reportNumber"
				placeholder="9 digits"
				bind:value={reportNumber}
				class="w-full"
			/>
		</div>

		<div class="flex w-full flex-col gap-2">
			<label class="font-dm-sans" for="{id}-date">Date Filed</label>
			<Popover.Root bind:open>
				<Popover.Trigger id="{id}-date">
					{#snippet child({ props })}
						<Button
							{...props}
							variant="outline"
							class="w-full justify-between rounded-2xl border border-[#00000050] py-6 font-dm-sans font-normal text-[#00000080]"
						>
							{dateValue
								? dateValue.toDate(getLocalTimeZone()).toLocaleDateString()
								: 'Select date'}
							<CalendarIcon class="h-4 w-4" />
						</Button>
					{/snippet}
				</Popover.Trigger>
				<Popover.Content class="w-auto overflow-hidden p-0" align="start">
					<Calendar
						type="single"
						bind:value={dateValue}
						captionLayout="dropdown"
						onValueChange={() => {
							open = false;
						}}
						maxValue={today(getLocalTimeZone())}
					/>
				</Popover.Content>
			</Popover.Root>
		</div>

		<div class="flex w-full flex-col gap-2">
			<label for="officersName">Officer’s name</label>
			<Input
				type="text"
				id="officersName"
				placeholder="Steven Hoffman"
				bind:value={officersName}
				class="w-full"
			/>
		</div>
	{/if}
	<hr class="my-4 w-full text-secondary" />
	<p>Did paramedics or the fire department respond?</p>
	<div class="flex gap-4">
		<SecondaryButton
			label="Yes"
			className="py-2!"
			toggleable={true}
			selected={departmentResponse === 'yes'}
			onClick={() => handleDepartmentSelection('yes')}
		/>
		<SecondaryButton
			label="No"
			className="py-2!"
			toggleable={true}
			selected={departmentResponse === 'no'}
			onClick={() => handleDepartmentSelection('no')}
		/>
	</div>
	{#if departmentResponse === 'yes'}
		<div class="flex w-full flex-col gap-2">
			<label for="agencyResponse">Responding agency</label>
			<Input
				type="text"
				id="agencyResponse"
				placeholder="Agency Name"
				bind:value={agencyResponseValue}
				class="w-full"
			/>
		</div>
	{/if}
</div>

<script lang="ts">
	import { isFormValid, step } from '$lib/stores/form';
	import { onMount } from 'svelte';
	import { type CalendarDate, getLocalTimeZone, today } from '@internationalized/date';
	import Heading from '$lib/components/Heading.svelte';
	import PrimaryButton from '$lib/components/PrimaryButton.svelte';
	import Calendar from '$lib/components/ui/calendar/calendar.svelte';
	import * as Drawer from '$lib/components/ui/drawer/index.js';

	let dateValue = $state<CalendarDate | undefined>();
	const dateLabel = $derived(
		dateValue ? dateValue.toDate(getLocalTimeZone()).toLocaleDateString() : 'Select Date'
	);
	let timeValue = $state('Select Time');
	let locationValue = $state('Enter your Location');
	let locationDraft = $state('');
	let locationOpen = $state(false);
	let selectedHour = $state('10');
	let selectedMinute = $state('00');
	let selectedPeriod = $state<'AM' | 'PM'>('AM');
	let hoursScrollEl: HTMLDivElement | null = null;
	let hourItemHeight = 0;

	const hours = Array.from({ length: 12 }, (_, i) => String(i === 0 ? 12 : i).padStart(2, '0'));
	const minutes = ['00', '30'];
	const periods = ['AM', 'PM'] as const;
	const hoursRepeat = 3;
	const repeatedHours = Array.from({ length: hoursRepeat }).flatMap((_, idx) =>
		hours.map((h) => ({ h, key: `${idx}-${h}` }))
	);

	function handleHoursScroll() {
		if (!hoursScrollEl || !hourItemHeight) return;
		const segmentHeight = hourItemHeight * hours.length;
		while (hoursScrollEl.scrollTop < segmentHeight * 0.5) hoursScrollEl.scrollTop += segmentHeight;
		while (hoursScrollEl.scrollTop > segmentHeight * 1.5) hoursScrollEl.scrollTop -= segmentHeight;
	}

	function handleSave() {
		timeValue = `${selectedHour}:${selectedMinute} ${selectedPeriod}`;
	}

	function handleLocationSave() {
		const next = locationDraft.trim();
		if (next) locationValue = next;
		locationDraft = '';
	}

	$effect(() => {
		isFormValid.set(
			!!dateValue && timeValue !== 'Select Time'
		);
	});

	$effect(() => {
		if (locationOpen) locationDraft = '';
	});

	onMount(() => {
		step.set(1);
		isFormValid.set(false);

		requestAnimationFrame(() => {
			if (!hoursScrollEl) return;
			const firstButton = hoursScrollEl.querySelector('button');
			if (!(firstButton instanceof HTMLElement)) return;
			hourItemHeight = firstButton.offsetHeight || 0;
			if (!hourItemHeight) return;
			const segmentHeight = hourItemHeight * hours.length;
			hoursScrollEl.scrollTop = segmentHeight;
		});
	});
</script>

<Heading title="Let's start with the basic details of the incident." />
<p class="font-dm-sans">Please provide the details below.</p>

<div class="mb-6 flex flex-col gap-4">
	<Drawer.Root>
		<Drawer.Trigger
			><div
				class="flex w-full cursor-pointer items-center justify-between border-b border-b-[#9BB1FF] pb-4 font-dm-sans"
			>
				<span>Enter Date</span>
				<span>{dateLabel}</span>
			</div></Drawer.Trigger
		>
		<Drawer.Content class="flex flex-col">
			<div class="flex items-start justify-between p-4">
				<div class="flex flex-col">
					<p class="font-dm-serif-display text-2xl">Date</p>
					<p class="text-sm text-[#00000060]">{dateLabel}</p>
				</div>
				<Drawer.Close>
					<img src="/close.svg" alt="Close" />
				</Drawer.Close>
			</div>
			<div class="flex items-center justify-center">
				<Calendar
					type="single"
					bind:value={dateValue}
					class="rounded-md border shadow-sm"
					captionLayout="dropdown"
					maxValue={today(getLocalTimeZone())}
				/>
			</div>
			<Drawer.Footer class="mt-auto px-8!">
				<Drawer.Close><PrimaryButton className="mt-6" label="Save" /></Drawer.Close>
			</Drawer.Footer>
		</Drawer.Content>
	</Drawer.Root>

	<Drawer.Root>
		<Drawer.Trigger
			><div
				class="flex w-full cursor-pointer items-center justify-between border-b border-b-[#9BB1FF] pb-4 font-dm-sans"
			>
				<span>Time</span>
				<span>{timeValue}</span>
			</div></Drawer.Trigger
		>
		<Drawer.Content class="flex flex-col">
			<div class="flex items-start justify-between p-4">
				<div class="flex flex-col">
					<p class="font-dm-serif-display text-2xl">Enter Time</p>
					<p class="text-sm text-[#00000060]">{timeValue}</p>
				</div>
				<Drawer.Close>
					<img src="/close.svg" alt="Close" />
				</Drawer.Close>
			</div>

			<div class="flex items-center justify-center">
				<div class="flex items-center justify-center gap-4 text-center font-dm-sans">
					<div class="h-44 overflow-y-auto" bind:this={hoursScrollEl} onscroll={handleHoursScroll}>
						{#each repeatedHours as item (item.key)}
							<button
								type="button"
								class="block w-full text-2xl {item.h === selectedHour
									? 'text-black'
									: 'text-[#00000060]'}"
								onclick={() => (selectedHour = item.h)}
							>
								{item.h}
							</button>
						{/each}
					</div>
					<div class="overflow-y-auto">
						{#each minutes as m}
							<button
								type="button"
								class="block w-full text-2xl {m === selectedMinute
									? 'text-black'
									: 'text-[#00000060]'}"
								onclick={() => (selectedMinute = m)}
							>
								{m}
							</button>
						{/each}
					</div>
					<div class="overflow-y-auto">
						{#each periods as p}
							<button
								type="button"
								class="block w-full text-2xl {p === selectedPeriod
									? 'text-black'
									: 'text-[#00000060]'}"
								onclick={() => (selectedPeriod = p)}
							>
								{p}
							</button>
						{/each}
					</div>
				</div>
			</div>

			<Drawer.Footer class="mt-auto px-8!">
				<Drawer.Close
					><PrimaryButton className="mt-6" label="Save" onClick={handleSave} /></Drawer.Close
				>
			</Drawer.Footer>
		</Drawer.Content>
	</Drawer.Root>

	<Drawer.Root bind:open={locationOpen}>
		<Drawer.Trigger
			><div
				class="flex w-full cursor-pointer items-center justify-between border-b border-b-[#9BB1FF] pb-4 font-dm-sans"
			>
				<span>Location</span>
				<div class="flex items-center gap-1">
					<img src="/location.svg" alt="Location" />
					<span>{locationValue}</span>
				</div>
			</div></Drawer.Trigger
		>
		<Drawer.Content class="flex flex-col">
			<div class="flex items-start justify-between p-4">
				<div class="flex flex-col">
					<p class="font-dm-serif-display text-2xl">Location</p>
					<span class="flex gap-2"
						><img src="/location.svg" alt="Location" /> {locationValue}</span
					>
				</div>
				<Drawer.Close>
					<img src="/close.svg" alt="Close" />
				</Drawer.Close>
			</div>

			<Drawer.Footer class="mt-auto px-8!">
				<Drawer.Close
					><PrimaryButton
						className="mt-6"
						label="Save"
						onClick={handleLocationSave}
					/></Drawer.Close
				>
			</Drawer.Footer>
		</Drawer.Content>
	</Drawer.Root>
</div>

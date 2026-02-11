<script lang="ts">
	import Heading from '$lib/components/Heading.svelte';
	import PrimaryButton from '$lib/components/PrimaryButton.svelte';
	import SecondaryButton from '$lib/components/SecondaryButton.svelte';
	import { onMount, onDestroy } from 'svelte';
	import { step, customButtons } from '$lib/stores/form';
	import { goto } from '$app/navigation';
	import { formRoutes } from '$lib';
	import { Mic, MicOff, X } from '@lucide/svelte';

	let selectedFile: File | null = $state(null);
	let imagePreview: string | null = $state(null);
	let fileInputRef: HTMLInputElement;
	let additionalInfo = $state('');
	let stream: MediaStream | null = $state(null);
	let error = $state('');
	let recognition: any = $state(null);
	let speechActive = $state(false);
	let speechBaseText = $state('');

	const isFormComplete = $derived(additionalInfo.trim() !== '' || selectedFile !== null);

	function getNextRoute(currentStep: number) {
		return formRoutes[currentStep] ?? null;
	}

	function handleContinue() {
		const nextRoute = getNextRoute($step);
		if (nextRoute) {
			goto(nextRoute);
		}
	}

	function getSpeechRecognitionCtor(): any {
		return (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
	}

	function speechErrorMessage(code: string) {
		switch (code) {
			case 'network':
				return 'Speech recognition service unreachable. Check your internet connection and try using HTTPS.';
			case 'not-allowed':
			case 'service-not-allowed':
				return 'Speech recognition permission was blocked by the browser.';
			case 'no-speech':
				return 'No speech detected. Try speaking closer to the microphone.';
			case 'audio-capture':
				return 'Microphone is not available.';
			default:
				return code ? `Speech recognition error: ${code}` : 'Speech recognition error';
		}
	}

	function startSpeechRecognition() {
		error = '';

		if (!window.isSecureContext) {
			error = 'Speech recognition requires a secure context (HTTPS or localhost).';
			return;
		}

		const Ctor = getSpeechRecognitionCtor();
		if (!Ctor) {
			error = 'Speech recognition is not supported in this browser.';
			return;
		}

		speechBaseText = additionalInfo.trim();
		speechActive = true;

		if (!recognition) {
			recognition = new Ctor();
			recognition.continuous = true;
			recognition.interimResults = true;
			recognition.maxAlternatives = 1;
			recognition.lang = navigator.language || 'en-US';

			recognition.onresult = (event: any) => {
				let interim = '';
				let finalText = '';

				for (let i = event.resultIndex; i < event.results.length; i++) {
					const result = event.results[i];
					const text = result?.[0]?.transcript ?? '';
					if (result.isFinal) {
						finalText += text;
					} else {
						interim += text;
					}
				}

				const base = speechBaseText.trim();
				const finalClean = finalText.trim();
				const interimClean = interim.trim();

				if (finalClean) {
					speechBaseText = [base, finalClean].filter(Boolean).join(' ').trim();
				}

				additionalInfo = [speechBaseText, interimClean].filter(Boolean).join(' ').trim();
			};

			recognition.onerror = (event: any) => {
				const code = event?.error ? String(event.error) : '';
				error = speechErrorMessage(code);
				stopSpeechRecognition();
			};

			recognition.onend = () => {
				if (speechActive) {
					try {
						recognition.start();
					} catch {
						// no-op
					}
				}
			};
		}

		try {
			recognition.start();
		} catch {
			// no-op
		}
	}

	function stopSpeechRecognition() {
		speechActive = false;
		if (recognition) {
			try {
				recognition.stop();
			} catch {}
		}
	}

	async function activeMicrophone() {
		error = '';

		const permission = await navigator.permissions.query({ name: 'microphone' });

		if (permission.state === 'denied') {
			error = 'The microphone is blocked. Activate it from the browser permissions.';
			return;
		}

		try {
			stream = await navigator.mediaDevices.getUserMedia({
				audio: true
			});
			startSpeechRecognition();
		} catch (err) {
			console.error(err);
			error =
				err instanceof DOMException
					? err.name === 'NotAllowedError'
						? 'Permission to access microphone was denied'
						: err.message
					: 'Unknown error';
		}
	}

	function stopMicrophone() {
		stopSpeechRecognition();
		if (stream) {
			stream.getTracks().forEach((track) => track.stop());
			stream = null;
		}
	}

	function handleFileChange(event: Event) {
		const input = event.target as HTMLInputElement;
		const file = input.files?.[0] ?? null;
		if (file) {
			selectedFile = file;
			imagePreview = URL.createObjectURL(file);
		}
	}

	function removeFile() {
		if (imagePreview) {
			URL.revokeObjectURL(imagePreview);
		}
		selectedFile = null;
		imagePreview = null;
		if (fileInputRef) fileInputRef.value = '';
	}

	function openGallery() {
		fileInputRef?.click();
	}

	onMount(() => {
		step.set(6);
		customButtons.set(true);
	});

	onDestroy(() => {
		stopMicrophone();
		if (imagePreview) {
			URL.revokeObjectURL(imagePreview);
		}
		customButtons.set(false);
	});
</script>

<div class="flex h-full flex-col">
	<div>
		<Heading title="We’re at the final step" />
		<p class="mt-2 font-dm-sans">Add any other information to your claim.</p>

		<p class="mt-4 font-dm-sans">
			Feel free to share any other details, thoughts, or questions you have.
		</p>

		<div
			class="mt-2 flex h-full min-h-40 flex-col rounded-2xl border border-[#00000010] p-4 font-dm-sans"
		>
			<div class="flex items-start justify-between gap-2">
				<textarea
					bind:value={additionalInfo}
					class="h-full min-h-40 w-full p-1"
					name=""
					id=""
					placeholder="Add any other information..."
				></textarea>
				{#if !stream}
					<button onclick={activeMicrophone}>
						<Mic />
					</button>
				{:else}
					<button onclick={stopMicrophone}>
						<MicOff />
					</button>
				{/if}
			</div>

			{#if error}
				<p class="text-sm text-red-500">{error}</p>
			{/if}
		</div>

		<div class="mt-8 mb-6">
			{#if imagePreview}
				<div class="relative w-full">
					<img src={imagePreview} alt="Preview" class="w-full rounded-xl object-cover" />
					<button
						onclick={removeFile}
						class="absolute top-2 right-2 rounded-full bg-red-500 p-1 text-white"
					>
						<X class="h-4 w-4" />
					</button>
					<p class="mt-2 text-center font-dm-sans text-sm text-gray-600">
						{selectedFile?.name}
					</p>
				</div>
			{:else}
				<button
					onclick={openGallery}
					class="flex w-full flex-col items-center justify-center rounded-xl bg-[#E1E6F8] px-10 py-9"
				>
					<img src="/upload.svg" alt="Upload" />
					<p class="mt-6 text-center font-dm-sans">
						Take a photo with your camera or choose a file from your device.
					</p>
				</button>
			{/if}

			<input
				bind:this={fileInputRef}
				onchange={handleFileChange}
				type="file"
				class="hidden"
				accept="image/*,.pdf"
			/>
		</div>
	</div>
</div>
<div class="mt-auto flex flex-col gap-2">
	<PrimaryButton label="Submit" active={isFormComplete} onClick={handleContinue} />
	<SecondaryButton className="border-none underline" label="Skip" onClick={handleContinue} />
</div>

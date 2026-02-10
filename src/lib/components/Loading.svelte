<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { base } from '$app/paths';

	let progress = 0;
	let interval: number;

	function animateTo(target: number, speed = 20) {
		return new Promise<void>((resolve) => {
			interval = window.setInterval(() => {
				if (progress >= target) {
					progress = target;
					clearInterval(interval);
					resolve();
				} else {
					progress += 1;
				}
			}, speed);
		});
	}

	onMount(async () => {
		await animateTo(33, 25);

		await new Promise((r) => setTimeout(r, 1200));

		await animateTo(85, 20);

		await new Promise((r) => setTimeout(r, 400));

		await animateTo(100, 20);
	});

	onDestroy(() => {
		clearInterval(interval);
	});
</script>

<div class="fixed z-20 flex h-dvh w-dvw flex-col items-center justify-center bg-primary px-20">
	<img src="{base}/images/white-logo.png" alt="logo" class="w-56" />

	<div class="mt-14 h-1 w-full overflow-hidden rounded-full bg-[#F4F4F7]">
		<div
			class="h-1 rounded-full bg-[#8DA5FC] transition-all duration-200 ease-out"
			style="width: {progress}%"
		></div>
	</div>

	<p class="mt-2 font-dm-sans text-white">Loading..</p>
</div>

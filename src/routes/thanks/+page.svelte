<script>
	let random = Math.floor(Math.random() * 2) + 1;
</script>

<main
	class="flex h-dvh w-full flex-col bg-cover bg-center pb-14 font-dm-serif-display"
	style="background-image: url('/images/thank-you-{random}.png')"
>
	<div class="flex h-full w-full flex-col items-center justify-end">
		<img src="/images/white-logo.png" alt="logo" />
		<div class="mt-11 text-center text-white">
			<h1 class="text-4xl">Your claim has been processed</h1>
			<p class="mt-4 text-center font-dm-sans">Now we will redirect you...</p>
			<p class="text-center font-dm-sans">Do not end the call.</p>
		</div>
	</div>
</main>

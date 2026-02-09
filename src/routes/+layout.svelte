<script>
	import './layout.css';
	let { children } = $props();
</script>

<svelte:head>
	<title>DreamSafe</title>
	<link rel="icon" href="/dreamsafe-logo.svg" />
</svelte:head>
<main class="font-dm-serif-display">
	{@render children()}
</main>

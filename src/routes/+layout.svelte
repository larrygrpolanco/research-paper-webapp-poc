<script>
	import '../app.css';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let { children } = $props();
</script>

<div class="app-layout">
	<Header />
	
	<main class="main-content">
		<div class="container">
			{@render children()}
		</div>
	</main>
	
	<Footer />
</div>

<style>
	.app-layout {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}
	
	.main-content {
		flex: 1;
		padding: var(--spacing-4) 0;
	}
</style>

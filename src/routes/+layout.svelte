<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';

	import { page } from '$app/state';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
<header>
	<Breadcrumbs items={page.data.breadcrumbs ?? []}/>
</header>
<main>
	{@render children()}
</main>


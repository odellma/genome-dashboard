<script lang="ts">
	import type { BreadcrumbItem } from "$lib/stores/breadcrumbs.svelte";

	interface Props {
		items: BreadcrumbItem[];
		homeHref?: string;
		homeLabel?: string;
	}

	let {
		items,
		homeHref = '/',
		homeLabel = 'Home'
	}: Props = $props();
</script>

<nav class="breadcrumbs" aria-label="Breadcrumb">
	<ol>
		<li>
			<a
				class="home-link"
				href={homeHref}
				aria-label={homeLabel}
				title={homeLabel}
			>
				<svg
					aria-hidden="true"
					viewBox="0 0 24 24"
					width="20"
					height="20"
				>
					<path
						d="M3 11.5 12 4l9 7.5v8a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linejoin="round"
					/>
				</svg>

				<span class="home-text">{homeLabel}</span>
			</a>
		</li>

		{#each items as item, index}
			<li>
				<span class="separator" aria-hidden="true">›</span>

				{#if item.href && index < items.length - 1}
					<a href={item.href}>
						{item.label}
					</a>
				{:else}
					<span aria-current="page">
						{item.label}
					</span>
				{/if}
			</li>
		{/each}
	</ol>
</nav>

<style>
	.breadcrumbs {
		width: 100%;
	}

	ol {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		margin: 0;
		padding: 0;
		list-style: none;
		flex-wrap: wrap;
	}

	li {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		min-width: 0;
	}

	a {
		color: inherit;
		text-decoration: none;
	}

	a:hover {
		text-decoration: underline;
	}

	a:focus-visible {
		border-radius: 0.25rem;
		outline: 2px solid currentColor;
		outline-offset: 0.2rem;
	}

	.home-link {
		display: inline-flex;
		align-items: center;
		gap: 0.35rem;
	}

	.separator {
		color: #777;
	}

	[aria-current='page'] {
		font-weight: 600;
	}

	@media (max-width: 35rem) {
		.home-text {
			position: absolute;
			width: 1px;
			height: 1px;
			padding: 0;
			margin: -1px;
			overflow: hidden;
			clip: rect(0, 0, 0, 0);
			white-space: nowrap;
			border: 0;
		}
	}
</style>
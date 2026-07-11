<script lang="ts" generics="T">
	import type { Snippet } from 'svelte';

	interface Props {
		headers: string[];
		items: T[];
		row: Snippet<[T]>;
		getKey?: (item: T) => string | number;
		emptyMessage?: string;
		caption?: string;
	}

	let {
		headers,
		items,
		row,
		getKey,
		emptyMessage = 'No records found.',
		caption
	}: Props = $props();
</script>

<div class="table-container">
	<table>
		{#if caption}
			<caption>
				{caption}
			</caption>
		{/if}

		<thead>
			<tr>
				{#each headers as header}
					<th scope="col">{header}</th>
				{/each}
			</tr>
		</thead>

		<tbody>
			{#if items.length === 0}
				<tr>
					<td colspan={headers.length} class="empty-message">
						{emptyMessage}
					</td>
				</tr>
			{:else if getKey}
				{#each items as item (getKey(item))}
					<tr>
						{@render row(item)}
					</tr>
				{/each}
			{:else}
				{#each items as item}
					<tr>
						{@render row(item)}
					</tr>
				{/each}
			{/if}
		</tbody>
	</table>
</div>

<style>
	.table-container {
		width: 100%;
		overflow-x: auto;
	}

	table {
		width: 100%;
		border-collapse: collapse;
	}

	caption {
		margin-bottom: 0.75rem;
		font-weight: 600;
		text-align: left;
	}

	th,
	td {
		padding: 0.75rem 1rem;
		border-bottom: 1px solid #ddd;
		text-align: left;
		vertical-align: top;
	}

	th {
		background: #f5f5f5;
		font-weight: 600;
	}

	tbody tr:hover {
		background: #fafafa;
	}

	.empty-message {
		padding: 1.5rem;
		color: #666;
		text-align: center;
	}
</style>
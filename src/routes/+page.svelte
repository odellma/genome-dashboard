<script lang="ts">
	import type { SpeciesReply, GenomeAssemblyReply } from '$lib/contracts/types';
	import Card from '$lib/components/Card.svelte';
	import DataTable from '$lib/components/DataTable.svelte';
	import {getAssemblies} from '$lib/api/assemblies';
	
    import type { PageData } from './$types';

    let { data }: {data: PageData } = $props();

	let selectedSpecies = $state<SpeciesReply | null>(null);
	let assemblies = $state<GenomeAssemblyReply[]>([]);
	let isLoadingAssemblies = $state(false);
	let assemblyError = $state<string | null>(null);
	let hasLoadedAssemblies = $state(false);

	let selectedSpeciesId = $derived(selectedSpecies?.id ?? null);

	function selectSpecies(species: SpeciesReply | null): void {
		selectedSpecies = species;

		assemblies = [];
		assemblyError = null;
		hasLoadedAssemblies = false;
	}

	async function loadAssemblies(): Promise<void> {
		if (selectedSpecies === null){
			return
		}

		isLoadingAssemblies = true;
		assemblyError = null;
		hasLoadedAssemblies = false;

		try {
			assemblies = await getAssemblies(fetch, selectedSpeciesId);

			hasLoadedAssemblies = true;
		} catch (error: unknown) {
			assemblies = [];
			assemblyError = 
				error instanceof Error
					? error.message
					: 'An unexpected error occured while loading assemblies.';
		} finally {
			isLoadingAssemblies = false;
		}
	}	
</script>
<svelte:head>
	<title>Genome Assemblies</title>
</svelte:head>

<div class="page">
	<header class="page-header">
		<h1>Genome assemblies</h1>
		<p>Select a species to view its available genome assemblies.</p>
	</header>

	<section class="selection-panel" aria-labelledby="species-selection-heading">
		<div class = "selection-controls">
			<select bind:value={selectedSpecies}>
				<option value={null}>Select a species...</option>
				{#each data.species as species}
					<option value={species}>
						{species.commonName}
					</option>
				{/each}
			</select>
			<button
				type="button"
				onclick={loadAssemblies}
				disabled={selectedSpeciesId === null || isLoadingAssemblies}
			>
				{isLoadingAssemblies
					? 'Loading assemblies...'
					: 'Load assemblies'}
			</button>
		</div>
	</section>

	{#if selectedSpecies}
		<Card title={selectedSpecies.commonName ?? ""}>
			<p>
				<strong>Scientific name:</strong>
				{selectedSpecies.scientificName}
			</p>
			<p>
				<strong>Species ID:</strong>
				{selectedSpecies.id}
			</p>
		</Card>
	{/if}
	{#if assemblyError}
		<p class="error" role="alert">
			{assemblyError}
		</p>
	{/if}

	{#if hasLoadedAssemblies && selectedSpecies}
		<Card title={`Assemblies for ${selectedSpecies.commonName ?? selectedSpecies.scientificName ?? 'selected species'}`}>
			<DataTable
				headers={[
					'Assembly name',
					'Accession',
					'Default'
				]}
				items={assemblies}
				getKey={(assembly) => assembly.id}
				emptyMessage="No assemblies were found for this species."
			>
				{#snippet row(assembly)}
					<td>
						{assembly.name ?? 'Not provided'}
					</td>

					<td>
						{assembly.accession ?? 'Not provided'}
					</td>

					<td>
						{assembly.isDefault ? 'Yes' : 'No'}
					</td>
				{/snippet}
			</DataTable>
		</Card>
	{/if}
</div>

<style>
	.page {
		display: grid;
		gap: 1.5rem;
		max-width: 75rem;
		margin: 0 auto;
		padding: 2rem 1rem;
	}

	.page-header h1 {
		margin-bottom: 0.25rem;
	}

	.page-header p {
		margin: 0;
		color: #555;
	}

	.selection-panel {
		display: grid;
		gap: 1rem;
	}

	.selection-panel h2 {
		margin: 0;
		font-size: 1.125rem;
	}

	.selection-controls {
		display: flex;
		align-items: end;
		gap: 1rem;
		flex-wrap: wrap;
	}

	button {
		padding: 0.625rem 1rem;
		border: 0;
		border-radius: 0.375rem;
		font: inherit;
		font-weight: 600;
		cursor: pointer;
	}

	button:disabled {
		cursor: not-allowed;
		opacity: 0.6;
	}

	.error {
		padding: 0.75rem 1rem;
		border: 1px solid currentColor;
		border-radius: 0.375rem;
	}
</style>



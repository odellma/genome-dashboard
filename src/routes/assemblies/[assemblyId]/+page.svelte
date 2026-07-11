<script lang="ts">
    import Card from "$lib/components/Card.svelte";
    import DataTable from "$lib/components/DataTable.svelte";
    import ChromosomeVisualization from "$lib/components/ChromosomeVisualization.svelte";

    import type { ChromosomeReply } from "$lib/contracts/types";
    import type { PageData } from "./$types";

    let { data }: { data: PageData } = $props();

    let selectedChromosome = $state<ChromosomeReply | null>(null);
    let assemblyTitle = $derived(
        data.assembly.name ??
            data.assembly.accession ??
            `Assembly ${data.assembly.id}`
    )

    function setSelectedChromosome(chromosome: ChromosomeReply): void {
        selectedChromosome = chromosome;
    }
</script>

<svelte:head>
	<title>Genome Assemblies</title>
</svelte:head>

<div class="page">
	<header class="page-header">
		<h1>Assembly</h1>		
	</header>


    <Card title={assemblyTitle}>
        <p>
            <strong>Accession</strong><br>
            {data.assembly.accession}
        </p>
        <p>
            <strong>Name</strong><br>
            {data.assembly.name}
        </p>
        <p>
            <strong>Source</strong><br>
            {data.assembly.source}
        </p>
        <p>
            <strong>Default</strong><br>
            {data.assembly.isDefault ? "Yes" : "No"}
        </p>
    </Card>

    {#if selectedChromosome}
		<ChromosomeVisualization chromosome={selectedChromosome} />
	{:else}
		<section class="empty-visualization">
			<h2>Chromosome visualization</h2>
			<p>Select a chromosome from the table below.</p>
		</section>
	{/if}

    <DataTable
        headers={["Name", "Length", ""]}
        items={data.chromosomes}
        getKey={(chromosome: ChromosomeReply) => chromosome.id}
        emptyMessage="No chromosomes were found for this assembly."
        caption="Chromosomes"
    >
        {#snippet row(chromosome)}
            <td>
                {chromosome.name}
            </td>

            <td>
                {chromosome.lengthBp.toLocaleString()}
            </td>

            <td>
					<div class="actions">
						<button
							type="button"
							class:selected={
								selectedChromosome?.id === chromosome.id
							}
							aria-pressed={
								selectedChromosome?.id === chromosome.id
							}
							onclick={() => setSelectedChromosome(chromosome)}
						>
							{selectedChromosome?.id === chromosome.id
								? 'Selected'
								: 'Visualize'}
						</button>
					</div>
				</td>

        {/snippet}

    </DataTable>
</div>

<style>
	.page {
		display: grid;
		gap: 1.5rem;
		max-width: 75rem;
		margin: 0 auto;
		padding: 2rem 1rem;
	}

	h2 {
		margin-top: 0;
	}

	.empty-visualization {
		padding: 1.5rem;
		border: 1px dashed #aaa;
		border-radius: 0.5rem;
		text-align: center;
	}

	.empty-visualization p {
		margin-bottom: 0;
		color: #555;
	}

	.actions {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		flex-wrap: wrap;
	}

	button {
		padding: 0.4rem 0.75rem;
		border: 1px solid #777;
		border-radius: 0.375rem;
		background: white;
		font: inherit;
		cursor: pointer;
	}

	button.selected {
		font-weight: 600;
		background: #e8e8e8;
	}
</style>
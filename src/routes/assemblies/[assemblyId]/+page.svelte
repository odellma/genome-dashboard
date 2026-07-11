<script lang="ts">
    import Card from "$lib/components/Card.svelte";
    import DataTable from "$lib/components/DataTable.svelte";

    import type { ChromosomeReply } from "$lib/contracts/types";
    import type { PageData } from "./$types";

    let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Genome Assemblies</title>
</svelte:head>

<div class="page">
	<header class="page-header">
		<h1>Assembly</h1>		
	</header>


    <Card title={data.assembly.name}>

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
    <DataTable
        headers={["Name", "Length", ""]}
        items={data.chromosomes}
        caption="Chromosomes"
    >
        {#snippet row(chromosome)}

            <td>{chromosome.name}</td>

            <td>
                {chromosome.lengthBp.toLocaleString()}
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

	.page-header h1 {
		margin-bottom: 0.25rem;
	}
</style>
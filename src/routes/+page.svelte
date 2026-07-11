<script lang="ts">
	import type { SpeciesReply } from '$lib/contracts/types';
	import Card from '$lib/components/Card.svelte';
    import type { PageData } from './$types';

    let { data }: {data: PageData } = $props();
	let selectedSpecies = $state<SpeciesReply | null>(null);
</script>
<select bind:value={selectedSpecies}>
	<option value={null}>Select a species...</option>
	{#each data.species as species}
		<option value={species}>
			{species.commonName}
		</option>
	{/each}
</select>

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

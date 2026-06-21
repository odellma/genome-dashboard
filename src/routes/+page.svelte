<script lang="ts">
    import type { PageData } from './$types';

    let { data }: {data: PageData } = $props();
    console.log(data);
</script>
<select>
	<option value="">Select a species...</option>

	{#each data.species as species}
		<option value={species.id}>
			{species.commonName}
		</option>
	{/each}
</select>

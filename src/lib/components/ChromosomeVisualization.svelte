<script lang="ts">
	import type { ChromosomeReply } from '$lib/contracts/types';

	interface Props {
		chromosome: ChromosomeReply;
	}

	let { chromosome }: Props = $props();

	let displayName = $derived(
		chromosome.name ?? `Chromosome ${chromosome.id}`
	);

	let formattedLength = $derived(
		chromosome.lengthBp?.toLocaleString() ?? 'Unknown'
	);
</script>

<section class="visualization" aria-labelledby="chromosome-heading">
	<header>
		<h2 id="chromosome-heading">{displayName}</h2>

		<p>
			{formattedLength}
			{chromosome.lengthBp != null ? ' base pairs' : ''}
		</p>
	</header>

	<div
		class="chromosome-container"
		role="img"
		aria-label={`${displayName}, ${formattedLength} base pairs`}
	>
		<div class="chromosome">
			<div class="centromere"></div>
		</div>
	</div>
</section>

<style>
	.visualization {
		padding: 1.25rem;
		border: 1px solid #d9d9d9;
		border-radius: 0.5rem;
		background: white;
	}

	header {
		margin-bottom: 1.5rem;
	}

	h2 {
		margin: 0;
		font-size: 1.25rem;
	}

	p {
		margin: 0.25rem 0 0;
		color: #555;
	}

	.chromosome-container {
		padding: 1.5rem 0.5rem;
	}

	.chromosome {
		position: relative;
		width: 100%;
		height: 2.5rem;
		border: 2px solid #555;
		border-radius: 999px;
		background: linear-gradient(
			to right,
			#e8e8e8 0%,
			#cfcfcf 25%,
			#ededed 50%,
			#cfcfcf 75%,
			#e8e8e8 100%
		);
		overflow: hidden;
	}

	.centromere {
		position: absolute;
		top: -0.25rem;
		left: 48%;
		width: 4%;
		height: 3rem;
		border-left: 2px solid #555;
		border-right: 2px solid #555;
		background: white;
		transform: skew(-10deg);
	}
</style>
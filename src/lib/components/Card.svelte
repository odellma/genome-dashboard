<script lang="ts">
	import type { Snippet } from "svelte";

    interface Props {
        title?: string;
        children: Snippet;
    }

    let { title, children }: Props = $props();
</script>

<div class="card">
    {#if title}
        <div class="card-header">
            <h2>{title}</h2>
        </div>
    {/if}

    <div class="card-body">
        {@render children()}
    </div>
</div>

<style>
    .card {
        background: white;
        border: 1px solid #ddd;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 2px 6px rgb(0 0 0 / 0.08);
    }

    .card-header {
        padding: 1rem 1.25rem;
        border-bottom: 1px solid #eee;
        background: #f8f9fa;
    }

    .card-header h2 {
        margin: 0;
        font-size: 1.1rem;
    }

    .card-body {
        padding: 1.25rem;
    }
</style>
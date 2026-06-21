// src/lib/api/species.ts

import { PUBLIC_API_BASE_URL } from '$env/static/public';
import type { Species } from '$lib/types/species';

export async function getSpecies(
	fetchFn: typeof fetch
): Promise<Species[]> {

    console.log(`${PUBLIC_API_BASE_URL}/api/species`, 'species call');
	const response = await fetchFn(
		`${PUBLIC_API_BASE_URL}/api/species`
	);

	if (!response.ok) {
		throw new Error('Failed to load species');
	}

	return response.json();
}
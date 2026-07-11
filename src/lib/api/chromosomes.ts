import { apiGet, apiPost } from './client';
import type {
	ChromosomeReply,
	ChromosomeRequest
} from '$lib/contracts/types';

export function getChromosomes(
	fetchFn: typeof fetch,
	assemblyId?: number | null
): Promise<ChromosomeReply[]> {
	const query = assemblyId ? `?assemblyId=${assemblyId}` : '';

	return apiGet<ChromosomeReply[]>(
		fetchFn,
		`/api/chromosomes${query}`
	);
}

export function getChromosomeById(
	fetchFn: typeof fetch,
	id: number
): Promise<ChromosomeReply> {
	return apiGet<ChromosomeReply>(
		fetchFn,
		`/api/chromosomes/${id}`
	);
}

export function createChromosome(
	fetchFn: typeof fetch,
	request: ChromosomeRequest
): Promise<ChromosomeReply> {
	return apiPost<ChromosomeReply, ChromosomeRequest>(
		fetchFn,
		'/api/chromosomes',
		request
	);
}
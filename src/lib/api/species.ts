import { apiGet, apiPost, apiPut, apiDelete } from './client';
import type { SpeciesReply, SpeciesRequest } from '$lib/contracts/types';

export function getSpecies(fetchFn: typeof fetch): Promise<SpeciesReply[]> {
	return apiGet<SpeciesReply[]>(fetchFn, '/api/species');
}

export function getSpeciesById(
	fetchFn: typeof fetch,
	id: number
): Promise<SpeciesReply> {
	return apiGet<SpeciesReply>(fetchFn, `/api/species/${id}`);
}

export function createSpecies(
	fetchFn: typeof fetch,
	request: SpeciesRequest
): Promise<SpeciesReply> {
	return apiPost<SpeciesReply, SpeciesRequest>(
		fetchFn,
		'/api/species',
		request
	);
}

export function updateSpecies(
	fetchFn: typeof fetch,
	id: number,
	request: SpeciesRequest
): Promise<void> {
	return apiPut<void, SpeciesRequest>(
		fetchFn,
		`/api/species/${id}`,
		request
	);
}

export function deleteSpecies(
	fetchFn: typeof fetch,
	id: number
): Promise<void> {
	return apiDelete<void>(fetchFn, `/api/species/${id}`);
}
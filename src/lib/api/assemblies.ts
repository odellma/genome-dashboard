import { apiGet, apiPost } from './client';
import type {
	GenomeAssemblyReply,
	GenomeAssemblyRequest
} from '$lib/contracts/types';

export function getAssemblies(
	fetchFn: typeof fetch,
	speciesId?: number | null
): Promise<GenomeAssemblyReply[]> {
	const query = speciesId ? `?speciesId=${speciesId}` : '';

	return apiGet<GenomeAssemblyReply[]>(
		fetchFn,
		`/api/assemblies${query}`
	);
}

export function getAssemblyById(
	fetchFn: typeof fetch,
	id: number
): Promise<GenomeAssemblyReply> {
	return apiGet<GenomeAssemblyReply>(
		fetchFn,
		`/api/assemblies/${id}`
	);
}

export function createAssembly(
	fetchFn: typeof fetch,
	request: GenomeAssemblyRequest
): Promise<GenomeAssemblyReply> {
	return apiPost<GenomeAssemblyReply, GenomeAssemblyRequest>(
		fetchFn,
		'/api/assemblies',
		request
	);
}
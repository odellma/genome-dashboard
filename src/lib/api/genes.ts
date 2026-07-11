import { apiGet, apiPost } from './client';
import type {
	GeneReply,
	GeneRequest
} from '$lib/contracts/types';

export type GeneSearchRequest = {
	assemblyId?: number | null;
	chromosomeId?: number | null;
	symbol?: string | null;
	startBp?: number | null;
	endBp?: number | null;
};

export function getGenes(
	fetchFn: typeof fetch,
	request: GeneSearchRequest = {}
): Promise<GeneReply[]> {
	const params = new URLSearchParams();

	if (request.assemblyId) {
		params.set('assemblyId', String(request.assemblyId));
	}

	if (request.chromosomeId) {
		params.set('chromosomeId', String(request.chromosomeId));
	}

	if (request.symbol) {
		params.set('symbol', request.symbol);
	}

	if (request.startBp) {
		params.set('startBp', String(request.startBp));
	}

	if (request.endBp) {
		params.set('endBp', String(request.endBp));
	}

	const query = params.toString();

	return apiGet<GeneReply[]>(
		fetchFn,
		`/api/genes${query ? `?${query}` : ''}`
	);
}

export function getGeneById(
	fetchFn: typeof fetch,
	id: number
): Promise<GeneReply> {
	return apiGet<GeneReply>(
		fetchFn,
		`/api/genes/${id}`
	);
}

export function createGene(
	fetchFn: typeof fetch,
	request: GeneRequest
): Promise<GeneReply> {
	return apiPost<GeneReply, GeneRequest>(
		fetchFn,
		'/api/genes',
		request
	);
}
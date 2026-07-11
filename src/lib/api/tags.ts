import { apiGet, apiPost } from './client';
import type {
	FunctionalTagReply,
	FunctionalTagRequest,
	GeneFunctionalTagReply,
	GeneFunctionalTagRequest,
	GeneReply
} from '$lib/contracts/types';

export type FunctionalTagGeneReply = {
	geneId: number;
	gene: GeneReply;
	evidenceType?: string | null;
	confidence?: string | null;
	sourceReference?: string | null;
	notes?: string | null;
};

export function getFunctionalTags(
	fetchFn: typeof fetch,
	category?: string | null
): Promise<FunctionalTagReply[]> {
	const query = category
		? `?category=${encodeURIComponent(category)}`
		: '';

	return apiGet<FunctionalTagReply[]>(
		fetchFn,
		`/api/functional-tags${query}`
	);
}

export function getFunctionalTagById(
	fetchFn: typeof fetch,
	id: number
): Promise<FunctionalTagReply> {
	return apiGet<FunctionalTagReply>(
		fetchFn,
		`/api/functional-tags/${id}`
	);
}

export function getGenesForFunctionalTag(
	fetchFn: typeof fetch,
	id: number
): Promise<FunctionalTagGeneReply[]> {
	return apiGet<FunctionalTagGeneReply[]>(
		fetchFn,
		`/api/functional-tags/${id}/genes`
	);
}

export function createFunctionalTag(
	fetchFn: typeof fetch,
	request: FunctionalTagRequest
): Promise<FunctionalTagReply> {
	return apiPost<FunctionalTagReply, FunctionalTagRequest>(
		fetchFn,
		'/api/functional-tags',
		request
	);
}

export function addGeneFunctionalTag(
	fetchFn: typeof fetch,
	tagId: number,
	geneId: number,
	request: GeneFunctionalTagRequest
): Promise<GeneFunctionalTagReply> {
	return apiPost<GeneFunctionalTagReply, GeneFunctionalTagRequest>(
		fetchFn,
		`/api/functional-tags/${tagId}/genes/${geneId}`,
		request
	);
}
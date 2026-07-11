// src/lib/types/genomic-knowledge-api.ts

export interface SpeciesRequest {
	scientificName: string;
	commonName?: string | null;
	ncbiTaxonId?: number | null;
}

export interface SpeciesReply {
	id: number;
	scientificName: string;
	commonName?: string | null;
	ncbiTaxonId?: number | null;
}

export interface GenomeAssemblyRequest {
	speciesId: number;
	name: string;
	accession?: string | null;
	source?: string | null;
	isDefault: boolean;
}

export interface GenomeAssemblyReply {
	id: number;
	speciesId: number;
	name: string;
	accession?: string | null;
	source?: string | null;
	isDefault: boolean;
}

export interface ChromosomeRequest {
	assemblyId: number;
	name: string;
	lengthBp: number;
	displayOrder: number;
}

export interface ChromosomeReply {
	id: number;
	assemblyId: number;
	name: string;
	lengthBp: number;
	displayOrder: number;
}

export interface GeneRequest {
	assemblyId: number;
	chromosomeId: number;
	stableId?: string | null;
	symbol?: string | null;
	name?: string | null;
	startBp: number;
	endBp: number;
	strand?: string | null;
	biotype?: string | null;
	description?: string | null;
}

export interface GeneReply {
	id: number;
	assemblyId: number;
	chromosomeId: number;
	stableId?: string | null;
	symbol?: string | null;
	name?: string | null;
	startBp: number;
	endBp: number;
	strand?: string | null;
	biotype?: string | null;
	description?: string | null;
}

export interface FunctionalTagRequest {
	name: string;
	category: string;
	description?: string | null;
}

export interface FunctionalTagReply {
	id: number;
	name: string;
	category: string;
	description?: string | null;
}

export interface GeneFunctionalTagRequest {
	geneId: number;
	functionalTagId: number;
	evidenceType?: string | null;
	confidence?: string | null;
	sourceReference?: string | null;
	notes?: string | null;
}

export interface GeneFunctionalTagReply {
	geneId: number;
	functionalTagId: number;
	evidenceType?: string | null;
	confidence?: string | null;
	sourceReference?: string | null;
	notes?: string | null;
}
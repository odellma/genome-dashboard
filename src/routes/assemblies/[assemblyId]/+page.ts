import type {PageLoad} from './$types';
import { getAssemblyById } from '$lib/api/assemblies';
import { getChromosomes } from '$lib/api/chromosomes';

export const load: PageLoad = async ({ params, fetch }) => {
    const assemblyId = Number(params.assemblyId);

    if (!Number.isInteger(assemblyId)){
        throw new Error('Invalid assembly ID');
    }

    const assembly = await getAssemblyById(fetch, assemblyId);
    const chromosomes = await getChromosomes(fetch, Number(params.assemblyId));

    return {
        assembly,
        chromosomes,
        breadcrumbs: [{label: assembly.name}]
    };
}
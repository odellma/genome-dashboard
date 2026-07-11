import type { PageLoad } from './$types';
import { getSpecies } from '$lib/api/species';

// if your load function should always run on the server because it uses private environment variables or database access then it should go in a +page.server.js instead.
export const load: PageLoad = async ({ fetch }) => {
    return {
        species: await getSpecies(fetch)
    };
};

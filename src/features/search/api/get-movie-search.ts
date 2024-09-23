import {OMDbAPI} from "@/lib/api-client.ts";
import {useQuery, queryOptions} from "@tanstack/react-query";
import {QueryConfig} from "@/lib/tanstack-query.ts";
import {MovieSearchResults} from "@/types/api.ts";

export const getMovieSearch = async ({searchQuery}:{ searchQuery: string }): Promise<MovieSearchResults> => {
    const results = await OMDbAPI.get("", {params: {"type":"movie", "s": searchQuery}});
    return results.data
}

export const movieSearchQueryOptions = (searchQuery: string) => {
    return queryOptions({
        queryKey: ['movie-search', searchQuery],
        queryFn: () => getMovieSearch({searchQuery}),
        enabled: searchQuery.length > 0
    })
}

type useMovieSearchQueryOptions = {
    searchQuery: string;
    queryConfig?: QueryConfig<typeof movieSearchQueryOptions>
}

export const useMovieSearchQuery = ({searchQuery, queryConfig}: useMovieSearchQueryOptions) => {
    return useQuery({
        ...movieSearchQueryOptions(searchQuery),
        ...queryConfig
    })
}
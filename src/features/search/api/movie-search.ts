import {OMDbAPI} from "@/lib/api-client.ts";
import {useQuery, queryOptions} from "@tanstack/react-query";
import {QueryConfig} from "@/lib/tanstack-query.ts";
import {MovieSearchResults} from "@/types/api.ts";

export const movieSearch = async ({searchQuery}:{ searchQuery: string }): Promise<MovieSearchResults> => {
    const results = await OMDbAPI.get("", {params: {"type":"movie", "s": searchQuery}});
    return results.data
}

export const movieSearchQueryOptions = (searchQuery: string) => {
    return queryOptions({
        queryKey: ['movie-search', searchQuery],
        queryFn: () => movieSearch({searchQuery})
    })
}

type useMovieSearchQueryOptions = {
    searchQuery: string;
    queryConfig?: QueryConfig<typeof movieSearchQueryOptions>
}

export const useMovieSearchQuery = ({
    searchQuery,
    queryConfig
}: useMovieSearchQueryOptions) => {
    return useQuery({
        ...movieSearchQueryOptions(searchQuery),
        ...queryConfig
    })
}
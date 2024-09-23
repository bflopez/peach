import {OMDbAPI} from "@/lib/api-client.ts";
import {useQuery, queryOptions} from "@tanstack/react-query";
import {QueryConfig} from "@/lib/tanstack-query.ts";
import {MovieSearchResults} from "@/types/api.ts";

type GetMovieSearchProps = {
    searchQuery: string;
    page: number;
}
export const getMovieSearch = async ({searchQuery, page}: GetMovieSearchProps): Promise<MovieSearchResults> => {
    const results = await OMDbAPI.get("", {params: {"type":"movie", "s": searchQuery, "page": page}});
    return results.data
}

export const movieSearchQueryOptions = ({searchQuery, page}: GetMovieSearchProps) => {
    return queryOptions({
        queryKey: ['movie-search', searchQuery, page],
        queryFn: () => getMovieSearch({searchQuery, page}),
        enabled: searchQuery.length > 0
    })
}

type useMovieSearchQueryOptions = {
    searchQuery: string;
    page: number;
    queryConfig?: QueryConfig<typeof movieSearchQueryOptions>
}

export const useMovieSearchQuery = ({searchQuery, page, queryConfig}: useMovieSearchQueryOptions) => {
    return useQuery({
        ...movieSearchQueryOptions({searchQuery, page}),
        ...queryConfig
    })
}
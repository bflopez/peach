import {OMDbAPI} from "@/lib/api-client.ts";
import {useQuery, queryOptions} from "@tanstack/react-query";
import {QueryConfig} from "@/lib/tanstack-query.ts";
import {MovieDetails} from "@/types/api.ts";

export const getMovie = async (movieIMDbId: string ): Promise<MovieDetails> => {
    const results = await OMDbAPI.get("", {params: {"i": movieIMDbId}});
    return results.data
}

export const movieQueryOptions = (movieIMDbId: string | null) => {
    return queryOptions({
        queryKey: ['movie', movieIMDbId],
        queryFn: () => getMovie(movieIMDbId as string),
        enabled: movieIMDbId !== null
    })
}

type useMovieSearchQueryOptions = {
    movieIMDbId: string | null;
    queryConfig?: QueryConfig<typeof movieQueryOptions>
}

export const useMovieQuery = ({movieIMDbId, queryConfig}: useMovieSearchQueryOptions) => {
    return useQuery({
        ...movieQueryOptions(movieIMDbId),
        ...queryConfig
    })
}
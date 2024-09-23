import {Box, Dialog, Grid, Skeleton, Text} from "@radix-ui/themes";
import {useSearchParams} from "react-router-dom";
import {useState} from "react";
import {useMovieSearchQuery} from "@/features/search/api/get-movie-search.ts";
import {MovieSearchResultsDetail} from "@/features/search/components/movie-search-results-detail.tsx";

const MovieSearchResultsListLoading = ({searchQuery}: {searchQuery: string}) => (
    <>
        <Text as="p" size="6" weight="medium" mb="4">{`Loading search results for "${searchQuery}"`}</Text>
        <Grid columns="5" gapY="4" gapX="2" width="auto">
            {[...Array(10)].map((_element, index) => (<Skeleton key={index}><Box height="346px"></Box></Skeleton>))}
        </Grid>
    </>
)

const MovieSearchResultsListError = ({errorText}: {errorText: string}) => (
    <>
        <Text as="p" size="6" weight="medium" mb="4">Error: {errorText}</Text>
        <Text as="p" weight="medium" mb="4">Check your search or try again.</Text>
    </>
)

export const MovieSearchResultsList = () => {
    const [imdbId, setImdbId] = useState<string | null>(null)
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get("q") || "";
    const {data: movieSearchResults, isLoading} = useMovieSearchQuery({searchQuery: searchQuery});
    const handleMovieClick = (movieIMDbId: string) => {
        setImdbId(movieIMDbId)
    }
    if (isLoading) return <MovieSearchResultsListLoading searchQuery={searchQuery} />
    if(movieSearchResults?.Error) return <MovieSearchResultsListError errorText={movieSearchResults?.Error}/>
    if (!movieSearchResults?.Search) return null;
    return (
        <>
            <Grid columns="5" gapY="4" gapX="2" width="auto">
                <Dialog.Root>
                    {movieSearchResults.Search.map((movie) => (
                        <Box key={movie.imdbID}>
                            <Dialog.Trigger>
                                <a onClick={() => handleMovieClick(movie.imdbID)}>
                                    <img style={{height: "100%", objectFit: "cover", borderRadius: "8px"}}
                                         src={movie.Poster} alt={`Poster for ${movie.Title}`}/>
                                </a>
                            </Dialog.Trigger>
                        </Box>
                    ))}
                    {imdbId ? <MovieSearchResultsDetail imdbId={imdbId}/> : null}
                </Dialog.Root>
            </Grid>
        </>
    )
}
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

export const MovieSearchResultsList = () => {
    const [searchParams] = useSearchParams();
    const [movieDetailId, setMovieDetailId] = useState<string | null>(null)
    const searchQuery = searchParams.get("q") || "";
    const {data: movieSearchResults, isLoading} = useMovieSearchQuery({searchQuery: searchQuery});
    const handleMovieClick = (movieIMDbId: string) => {
        setMovieDetailId(movieIMDbId)
    }
    if (isLoading) return <MovieSearchResultsListLoading searchQuery={searchQuery} />
    if(movieSearchResults?.Response === "False"){
        return (
            <>
                <Text as="p" size="6" weight="medium" mb="4">Error: {movieSearchResults.Error}</Text>
                <Text as="p" weight="medium" mb="4">Check your search or try again.</Text>
            </>
        )
    }
    if (!movieSearchResults?.Search) return null;
    return (
        <>
            <Text as="p" size="6" weight="medium" mb="4">{`Search results for "${searchQuery}"`}</Text>
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
                    {movieDetailId ? <MovieSearchResultsDetail movieDetailId={movieDetailId}/> : null}
                </Dialog.Root>
            </Grid>
        </>
    )
}
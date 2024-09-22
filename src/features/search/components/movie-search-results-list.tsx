import {Box, Dialog, Grid, Text} from "@radix-ui/themes";
import {useSearchParams} from "react-router-dom";
import {useState} from "react";
import {useMovieSearchQuery} from "@/features/search/api/get-movie-search.ts";
import {MovieDetailDialogContent} from "@/features/movie-detail/components/movie-detail-dialog-content.tsx";

export const MovieSearchResultsList = () => {
    const [searchParams] = useSearchParams();
    const [movieDetailId, setMovieDetailId ] = useState<string | null>(null)
    const searchQuery = searchParams.get("q");
    const {data: movieSearchResults, isLoading } = useMovieSearchQuery({searchQuery: searchQuery || ""});
    const handleMovieClick = (movieIMDbId:string)=>{
        setMovieDetailId(movieIMDbId)
    }
    if(isLoading){
        return <Text>Loading...</Text>
    }
    if(!movieSearchResults) return null;
    return(
        <>
            <Text as="p" size="6" weight="medium" mb="4">{`Search results for "${searchQuery}"`}</Text>
            <Grid columns="5" gapY="4" gapX="2" width="auto">
                <Dialog.Root>
                    {movieSearchResults.Search.map((movie) => (
                        <Box key={movie.imdbID}>
                            <Dialog.Trigger>
                                <a onClick={()=>handleMovieClick(movie.imdbID)}>
                                    <img style={{height: "100%", objectFit: "cover", borderRadius: "8px"}}
                                         src={movie.Poster} alt={`Poster for ${movie.Title}`}/>
                                </a>
                            </Dialog.Trigger>
                        </Box>
                    ))}
                    {movieDetailId ? <MovieDetailDialogContent movieDetailId={movieDetailId} /> : null}
                </Dialog.Root>
            </Grid>
        </>
    )
}
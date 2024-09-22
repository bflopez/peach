import {Box, Container, Flex, Grid, Link, Text} from "@radix-ui/themes";
import {PeachflixLogo} from "@/components/ui/peachflix-logo.tsx";
import {SearchField} from "@/features/search/components/search-field.tsx";
import {useSearchParams} from "react-router-dom";
import {useMovieSearchQuery} from "@/features/search/api/movie-search.ts";

export const SearchResultsRoute = ()=>{
    const [searchParams, setSearchParams] = useSearchParams();
    const searchQuery = searchParams.get("q");
    const {data: movieSearchResults, isLoading } = useMovieSearchQuery({searchQuery: searchQuery || ""});
    if(isLoading){
        return <Text>Loading...</Text>
    }
    console.log(movieSearchResults)
    if(!movieSearchResults) return null;
    return(
        <>
            <Box pt="32px" px="32px">
                <Flex justify="between">
                    <PeachflixLogo/>
                    <Box>
                        <Flex gap="7" align="center">
                            <Link style={{color: "white"}} href="#">Movies</Link>
                            <Link style={{color: "white"}} href="#">Favorites</Link>
                            <SearchField/>
                        </Flex>
                    </Box>
                </Flex>
            </Box>
            <Box mt="130px">
                <Container size="4">
                    <Text as="p" size="6" weight="medium" mb="4">{`Search results for "${searchQuery}"`}</Text>
                    <Grid columns="5" gapY="4" gapX="2" width="auto">
                        {movieSearchResults.Search.map((result) => (
                            <Box key={result.imdbID}>
                                <img style={{height: "100%", objectFit: "cover", borderRadius: "8px"}} src={result.Poster}/>
                            </Box>
                        ))}
                    </Grid>
                </Container>
            </Box>
        </>
    )
}
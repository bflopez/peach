import {Box, Container, Flex, Grid, Link, Text} from "@radix-ui/themes";
import {PeachflixLogo} from "@/components/ui/peachflix-logo.tsx";
import {SearchField} from "@/features/search/components/search-field.tsx";
import {useSearchParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";

export const SearchResultsRoute = ()=>{
    let [searchParams, setSearchParams] = useSearchParams();
    const searchQuery = searchParams.get("q");
    const {data: results, isLoading} = useQuery({
        queryKey: ["search"],
        queryFn: async (query: string) => {
            const response = await fetch(`https://omdbapi.com/?s=${searchQuery}&apikey=d15d95d&type=movie`);
            const results = await response.json();
            return results.Search
        }
    })
    if(isLoading){
        return <Text>Loading...</Text>
    }
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
                        {results.map((result, index) => (
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
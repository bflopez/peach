import {Box, Container, Flex, Link, Text} from "@radix-ui/themes";
import {PeachflixLogo} from "@/components/ui/peachflix-logo.tsx";
import {SearchField} from "@/features/search/components/search-field.tsx";
import {useSearchParams} from "react-router-dom";

export const SearchResultsRoute = ()=>{
    let [searchParams, setSearchParams] = useSearchParams();
    const searchQuery = searchParams.get("q");
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
            <Box mt="80px">
                <Container>
                    <Text size="6" weight="medium">{`Search results for "${searchQuery}"`}</Text>
                </Container>
            </Box>
        </>
    )
}
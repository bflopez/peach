import {Box, Container, Flex} from "@radix-ui/themes";
import {PeachflixLogo} from "@/components/ui/peachflix-logo.tsx";
import {MovieSearchField} from "@/features/search/components/movie-search-field.tsx";

export const LandingRoute = () => {
    return (
        <Container size="1">
            <Box py="100px">
                <Flex direction="column" align="center" gap="5">
                    <PeachflixLogo/>
                    <MovieSearchField/>
                </Flex>
            </Box>
        </Container>
    )
}

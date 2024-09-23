import {Box, Container, Flex, Link} from "@radix-ui/themes";
import {PeachflixLogo} from "@/components/ui/peachflix-logo.tsx";
import {MovieSearchField} from "@/features/search/components/movie-search-field.tsx";
import {FavoritesList} from "@/features/favorites/components/favorites-list.tsx";

export const FavoritesRoute = () => {
    return (
        <>
            <Box pt="32px" px="32px">
                <Flex justify="between">
                    <PeachflixLogo/>
                    <Box>
                        <Flex gap="7" align="center">
                            <Link style={{color: "white"}} href="#">Movies</Link>
                            <Link style={{color: "white"}} href="/favorites">Favorites</Link>
                            <MovieSearchField/>
                        </Flex>
                    </Box>
                </Flex>
            </Box>
            <Box mt="130px">
                <Container size="4">
                    <FavoritesList/>
                </Container>
            </Box>
        </>
    )
}
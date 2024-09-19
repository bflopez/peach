import {Box, Container, Flex} from "@radix-ui/themes";
import {PeachflixLogo} from "@/components/ui/peachflix-logo.tsx";
import {SearchField} from "@/features/search/components/search-field.tsx";

export const LandingRoute = () => {
    return (
        <Container size="1">
            <Box py="100px">
                <Flex direction="column" align="center" gap="5">
                    <PeachflixLogo/>
                    <SearchField/>
                </Flex>
            </Box>
        </Container>
    )
}

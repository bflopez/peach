import {Box, Container, Flex, Link, Text} from "@radix-ui/themes";
import {PeachflixLogo} from "@/components/ui/peachflix-logo.tsx";
import {MovieSearchField} from "@/features/search/components/movie-search-field.tsx";
import {ReactNode} from "react";

type ContentLayoutProps = {
    heading: string;
    children: ReactNode;
}
export const ContentLayout = (props: ContentLayoutProps)=>{
    const {heading, children} = props;
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
                    <Text as="p" size="6" weight="medium" mb="4">{heading}</Text>
                    {children}
                </Container>
            </Box>
        </>
    )
}
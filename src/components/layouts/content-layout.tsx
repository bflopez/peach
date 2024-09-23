import {Box, Button, Container, Flex, Text} from "@radix-ui/themes";
import {PeachflixLogo} from "@/components/ui/peachflix-logo.tsx";
import {MovieSearchField} from "@/features/search/components/movie-search-field.tsx";
import {ReactNode} from "react";
import {Link, NavLink} from "react-router-dom";

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
                    <Link to="/">
                        <PeachflixLogo/>
                    </Link>
                    <Box>
                        <Flex gap="7" align="center">
                            <Link style={{color: "white", textDecoration: "none"}} to="/"><Button variant="ghost" style={{color: "white", background: "none"}}><Text size="3">Movies</Text></Button></Link>
                            <NavLink to="/favorites">
                                {({isActive})=> {
                                    if(isActive) return <Button variant="solid" style={{background: "#fafafa", color: "#252528"}}>Favorites</Button>
                                    return <Button variant="ghost" style={{color: "white", background: "none"}}><Text size="3">Favorites</Text></Button>
                                }}
                            </NavLink>
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
import {Box, Container, Flex} from "@radix-ui/themes";
import {ReactNode} from "react";

export const SearchLayout = ({children}: {children: ReactNode}) => {
    return (
        <Container size="1">
            <Box py="100px">
                <Flex direction="column" align="center" gap="5">
                    {children}
                </Flex>
            </Box>
        </Container>
    )
}
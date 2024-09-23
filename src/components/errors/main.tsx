import {Box, Heading, Text} from "@radix-ui/themes";

export const MainErrorFallback = () =>{
    return (
        <Box>
            <Heading size="2">Oops, something went wrong :(</Heading>
            <Text>Please refresh or try again later.</Text>
        </Box>
    )
}
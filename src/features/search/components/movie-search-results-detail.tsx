import {Box, Button, Dialog, Flex, Text} from "@radix-ui/themes";
import {StarFilledIcon, StarIcon} from "@radix-ui/react-icons";
import {useMovieQuery} from "@/features/movie/api/get-movie.ts";
import {FavoriteButton} from "@/features/favorites/components/favorite-button.tsx";

export const MovieSearchResultsDetail = ({imdbId}: {imdbId:string}) => {
    const {data: movieDetails, isLoading} = useMovieQuery({movieIMDbId: imdbId})
    if(isLoading) { return <Dialog.Content><>Loading...</></Dialog.Content>}
    if(!movieDetails) return null
    return (
        <Dialog.Content maxWidth="1000px" minHeight="600px"
                        style={{
                            borderRadius: "24px",
                            padding: "60px",
                            backgroundImage: `linear-gradient(to top, #252528 0%, rgba(41, 41, 41, 0) 100%), url("${movieDetails.Poster.replace("SX300", "SX1000")}")`,
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "cover",
                            backgroundPosition: "center"
                        }}>
            <Flex direction="column" height="600px">
                <Box></Box>
                <Box mt="auto">
                    <Dialog.Title size={"9"}>
                        {movieDetails.Title}
                    </Dialog.Title>
                    <Dialog.Description mb={"2"}>
                        {movieDetails.Plot}
                    </Dialog.Description>
                    <Flex gapX={"2"} mb={"4"} align="center">
                        <Box height="20px">
                            {[...Array(Math.floor(Number(movieDetails.imdbRating) / 2))].map((_element, index)=>(
                                <StarFilledIcon width="19px" height="19px" color={"#FE8E4D"} key={index}/>
                            ))}
                            {[...Array(5 - Math.floor(Number(movieDetails.imdbRating) / 2))].map((_element, index)=>(
                                <StarIcon width="19px" height="19px" color={"#FE8E4D"} key={index}/>
                            ))}
                        </Box>
                        <Box>
                            <Text>
                                <Text style={{verticalAlign: "text-top", lineHeight: 1, marginRight: "8px", color: "#d9d9d920"}}>|</Text>
                                {movieDetails.Runtime}
                            </Text>
                        </Box>
                        <Box style={{border: "2px solid #FAFAFA4D", borderRadius: "6px",padding: "0 6px", height: "24px"}}>
                            <Text size="2" as="p">{movieDetails.Rated}</Text>
                        </Box>
                    </Flex>
                    <Flex gapX={"2"} mb={"4"}>
                        <Box>
                            <Button size="3" radius={"large"} style={{fontWeight: 600}}>Start watching</Button>
                        </Box>
                        <Box>
                            <FavoriteButton imdbId={imdbId}/>
                        </Box>
                    </Flex>
                    <Box>
                        <Text as="p">
                            <Text as="span" weight="bold">Cast:</Text>
                            &nbsp;{movieDetails.Actors}&nbsp;
                            <Text as="span" style={{textDecoration: "underline", textUnderlinePosition: "under"}}>See entire cast</Text>
                        </Text>
                        <Text as="p"><Text as="span" weight="bold">Genre:</Text> {movieDetails.Genre}</Text>
                    </Box>
                </Box>
            </Flex>
        </Dialog.Content>
    )
}
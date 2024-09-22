import {Box, Button, Container, Dialog, Flex, Grid, Link, Text} from "@radix-ui/themes";
import {PeachflixLogo} from "@/components/ui/peachflix-logo.tsx";
import {SearchField} from "@/features/search/components/search-field.tsx";
import {useSearchParams} from "react-router-dom";
import {useMovieSearchQuery} from "@/features/search/api/get-movie-search.ts";
import {useState} from "react";
import {useMovieQuery} from "@/features/search/api/get-movie.ts";
import {StarFilledIcon, StarIcon} from "@radix-ui/react-icons";

export const SearchResultsRoute = ()=>{
    const [searchParams, setSearchParams] = useSearchParams();
    const [movieDetailId, setMovieDetailId ] = useState<string | null>(null)
    const searchQuery = searchParams.get("q");
    const {data: movieSearchResults, isLoading } = useMovieSearchQuery({searchQuery: searchQuery || ""});
    const {data: movieDetails} = useMovieQuery({movieIMDbId: movieDetailId})
    const handleMovieClick = (movieIMDbId:string)=>{
        setMovieDetailId(movieIMDbId)
    }
    if(isLoading){
        return <Text>Loading...</Text>
    }
    if(!movieSearchResults) return null;
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
                        <Dialog.Root>
                            {movieSearchResults.Search.map((movie) => (
                                <Box key={movie.imdbID}>
                                    <Dialog.Trigger>
                                        <a onClick={()=>handleMovieClick(movie.imdbID)}>
                                            <img style={{height: "100%", objectFit: "cover", borderRadius: "8px"}}
                                                 src={movie.Poster}/>
                                        </a>
                                    </Dialog.Trigger>
                                </Box>
                            ))}
                            {movieDetails && (
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
                                                    <Button size="3" radius={"large"} variant="outline" style={{fontWeight: 600, color: "#FAFAFA", boxShadow: "inset 0 0 0 2px #FAFAFA"}}>
                                                        <StarFilledIcon height="19px" width="18px"/> Add to favorites
                                                    </Button>
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
                            )}
                        </Dialog.Root>
                    </Grid>
                </Container>
            </Box>
        </>
    )
}
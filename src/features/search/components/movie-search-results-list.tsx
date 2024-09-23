import {Box, Dialog, Flex, Grid, Skeleton, Text} from "@radix-ui/themes";
import {useSearchParams} from "react-router-dom";
import { useState} from "react";
import {useMovieSearchQuery} from "@/features/search/api/get-movie-search.ts";
import {MovieSearchResultsDetail} from "@/features/search/components/movie-search-results-detail.tsx";
import {ChevronLeftIcon, ChevronRightIcon} from "@radix-ui/react-icons";
import {Pagination} from "react-headless-pagination";


const MovieSearchResultsListLoading = ({searchQuery}: {searchQuery: string}) => (
    <>
        <Text as="p" size="6" weight="medium" mb="4">{`Loading search results for "${searchQuery}"`}</Text>
        <Grid columns="5" gapY="4" gapX="2" width="auto">
            {[...Array(10)].map((_element, index) => (<Skeleton key={index}><Box height="346px"></Box></Skeleton>))}
        </Grid>
    </>
)

const MovieSearchResultsListError = ({errorText}: {errorText: string}) => (
    <>
        <Text as="p" size="6" weight="medium" mb="4">Error: {errorText}</Text>
        <Text as="p" weight="medium" mb="4">Check your search or try again.</Text>
    </>
)

export const MovieSearchResultsList = () => {
    const [page, setPage] = useState(0);
    const [imdbId, setImdbId] = useState<string | null>(null)
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get("q") || "";

    const {data: movieSearchResults, isLoading} = useMovieSearchQuery({searchQuery: searchQuery, page: page + 1});
    const numPages = (Math.floor(Number(movieSearchResults?.totalResults || 0) / 10)) + ((Number(movieSearchResults?.totalResults || 0) % 10) > 1 ? 1 : 0)
    const handleMovieClick = (movieIMDbId: string) => {
        setImdbId(movieIMDbId)
    }
    const handlePageChange = (page: number) => {
        setPage(page);
    };

    if (isLoading) return <MovieSearchResultsListLoading searchQuery={searchQuery} />
    if(movieSearchResults?.Error) return <MovieSearchResultsListError errorText={movieSearchResults?.Error}/>
    if (!movieSearchResults?.Search) return null;

    return (
        <>
            <Grid columns="5" gapY="4" gapX="2" width="auto">
                <Dialog.Root>
                    {movieSearchResults.Search.map((movie) => (
                        <Box key={movie.imdbID}>
                            <Dialog.Trigger>
                                <a onClick={() => handleMovieClick(movie.imdbID)}>
                                    <img style={{height: "352px", objectFit: "cover", borderRadius: "8px"}}
                                         src={movie.Poster} alt={`Poster for ${movie.Title}`}/>
                                </a>
                            </Dialog.Trigger>
                        </Box>
                    ))}
                    {imdbId ? <MovieSearchResultsDetail imdbId={imdbId}/> : null}
                </Dialog.Root>
            </Grid>
            <Flex justify="between" align="center">
                <Pagination
                    className="pagination"
                    currentPage={page}
                    setCurrentPage={handlePageChange}
                    edgePageCount={2}
                    middlePagesSiblingCount={2}
                    totalPages={numPages}
                >
                    <Pagination.PrevButton className="pagination-button pagination-prev" disabled={page === 1}><ChevronLeftIcon width={"18px"} height={"18px"}/></Pagination.PrevButton>

                    <nav style={{display: "flex", background: "#3E3E40"}}>
                        <ul style={{display: "flex",
                            listStyleType: "none",
                            margin: 0,
                            padding: 0,
                            alignItems: "center",
                            alignContent: "center",
                            justifyContent: "center",
                            height: "40px"}}>
                            <Pagination.PageButton
                                activeClassName="pagination-active"
                                inactiveClassName=""
                                className="pagination-button"
                            />
                        </ul>
                    </nav>
                    <Pagination.NextButton className="pagination-button pagination-next" disabled={page === numPages}><ChevronRightIcon/></Pagination.NextButton>
                </Pagination>
                <Box>
                    <Text size="1">{movieSearchResults.Search.length} of {movieSearchResults.totalResults} results</Text>
                </Box>
            </Flex>
        </>
    )
}
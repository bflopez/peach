import {Box, Dialog, Flex, Grid, Skeleton, Text} from "@radix-ui/themes";
import {useSearchParams} from "react-router-dom";
import { useState} from "react";
import {useMovieSearchQuery} from "@/features/search/api/get-movie-search.ts";
import {MovieSearchResultsDetail} from "@/features/search/components/movie-search-results-detail.tsx";
import {ChevronLeftIcon, ChevronRightIcon} from "@radix-ui/react-icons";
import {Pagination} from "react-headless-pagination";


const MovieSearchResultsListLoading = () => (
    <>
        <Grid columns="5" gapY="4" gapX="2" width="auto">
            {[...Array(10)].map((_element, index) => (<Skeleton key={index}><Box height="352px"></Box></Skeleton>))}
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

    if (isLoading) return <MovieSearchResultsListLoading />
    if(movieSearchResults?.Error) return <MovieSearchResultsListError errorText={movieSearchResults?.Error}/>
    if (!movieSearchResults?.Search) return null;

    return (
        <>
            <Grid columns="5" gapY="4" gapX="2" width="auto">
                <Dialog.Root>
                    {movieSearchResults.Search.map((movie) => (
                        <Dialog.Trigger key={movie.imdbID}>
                            <a tabIndex={0} style={{cursor: "pointer"}} onClick={() => handleMovieClick(movie.imdbID)}>
                                <img style={{height: "352px", objectFit: "cover", borderRadius: "8px"}}
                                     src={movie.Poster === "N/A" ? "https://placehold.co/220x352?text=No+Image+Available" : movie.Poster} alt={`Poster for ${movie.Title}`}/>
                            </a>
                        </Dialog.Trigger>
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

                    <nav className="pagination-nav">
                        <ul className="pagination-button-container">
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
                    <Text size="1">{(10 * page) + (movieSearchResults.Search.length)} of {movieSearchResults.totalResults} results</Text>
                </Box>
            </Flex>
        </>
    )
}
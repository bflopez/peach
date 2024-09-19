import {useSearchParams} from "react-router-dom";

export const SearchResultsRoute = ()=>{
    const [searchParams, setSearchParams] = useSearchParams();
    const searchQuery = searchParams.get("q")
    return(
        <>
            Search Results for {searchQuery}
        </>
    )
}
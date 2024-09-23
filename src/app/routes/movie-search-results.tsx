import {MovieSearchResultsList} from "@/features/search/components/movie-search-results-list.tsx";
import {ContentLayout} from "@/components/layouts/content-layout.tsx";
import {useSearchParams} from "react-router-dom";

export const SearchResultsRoute = () => {
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get("q") || "";
    return(
        <ContentLayout heading={`Search results for "${searchQuery}"`}>
            <MovieSearchResultsList/>
        </ContentLayout>
    )
}
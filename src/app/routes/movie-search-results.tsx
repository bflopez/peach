import {MovieSearchResultsList} from "@/features/search/components/movie-search-results-list.tsx";
import {ContentLayout} from "@/components/layouts/content-layout.tsx";

export const SearchResultsRoute = ()=>{
    return(
        <ContentLayout>
            <MovieSearchResultsList/>
        </ContentLayout>
    )
}
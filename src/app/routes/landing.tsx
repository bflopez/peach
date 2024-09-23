import {PeachflixLogo} from "@/components/ui/peachflix-logo.tsx";
import {MovieSearchField} from "@/features/search/components/movie-search-field.tsx";
import {SearchLayout} from "@/components/layouts/search-layout.tsx";

export const LandingRoute = () => {
    return (
        <SearchLayout>
            <PeachflixLogo/>
            <MovieSearchField/>
        </SearchLayout>
    )
}

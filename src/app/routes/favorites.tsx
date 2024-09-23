import {FavoritesList} from "@/features/favorites/components/favorites-list.tsx";
import {ContentLayout} from "@/components/layouts/content-layout.tsx";

export const FavoritesRoute = () => {
    return (
        <ContentLayout>
            <FavoritesList/>
        </ContentLayout>
    )
}
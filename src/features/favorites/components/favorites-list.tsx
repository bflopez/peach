import {Grid, Text} from "@radix-ui/themes";
import {Favorite} from "@/features/favorites/components/favorite.tsx";
import {useFavorites} from "@/features/favorites/api/get-favorites.ts";

export const FavoritesList = () => {
    const [favorites] = useFavorites()
    return(
        <>
            <Text as="p" size="6" weight="medium" mb="4">Favorites</Text>
            <Grid columns="7" gapY="5" gapX="2" width="auto">
                {favorites.map((favoriteImdbId: string) => (
                    <Favorite key={favoriteImdbId} favoriteImdbId={favoriteImdbId}/>
                ))}
            </Grid>
        </>)
}
import {Grid, Text} from "@radix-ui/themes";
import {useLocalStorage} from "usehooks-ts";
import {Favorite} from "@/features/favorites/components/favorite.tsx";

export const FavoritesList = () => {
    const [favorites] = useLocalStorage('peachflix-favorites', [] as string[]);
    return(
        <>
            <Text as="p" size="6" weight="medium" mb="4">Favorites</Text>
            <Grid columns="7" gapY="4" gapX="2" width="auto">
                {favorites.map((favoriteImdbId: string) => (
                    <Favorite key={favoriteImdbId} favoriteImdbId={favoriteImdbId}/>
                ))}
            </Grid>
        </>)
}
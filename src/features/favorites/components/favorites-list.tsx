import { Flex, Grid, Text} from "@radix-ui/themes";
import {Favorite} from "@/features/favorites/components/favorite.tsx";
import {useFavorites} from "@/features/favorites/api/get-favorites.ts";

export const FavoritesList = () => {
    const [favorites] = useFavorites()
    if(favorites.length === 0){
        return (
            <>
                <Flex direction="column" align="center">
                    <Text size="6">You have no favorites!</Text>
                    <Text>Search for movies to add to your favorites.</Text>
                </Flex>
            </>

        )
    }
    return (
        <>
            <Grid columns="7" gapY="5" gapX="2" width="auto">
                {favorites.map((favoriteImdbId: string) => (
                    <Favorite key={favoriteImdbId} favoriteImdbId={favoriteImdbId}/>
                ))}
            </Grid>
        </>
    )
}
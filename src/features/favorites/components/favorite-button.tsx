import {Button} from "@radix-ui/themes";
import {StarFilledIcon} from "@radix-ui/react-icons";
import {useFavorites} from "@/features/favorites/api/get-favorites.ts";

export const FavoriteButton = ({imdbId}: {imdbId: string}) => {
    const [favorites, setFavorite] = useFavorites()

    const handleAddToFavorite = () => {
        favorites.push(imdbId)
        setFavorite(favorites)
    }
    const handleRemoveFromFavorite = () => {
        favorites.splice(favorites.indexOf(imdbId), 1)
        setFavorite(favorites)
    }
    return (
        <>
            {favorites.includes(imdbId) ?
                <Button size="3" radius={"large"} variant="outline" style={{fontWeight: 600, color: "#FAFAFA", boxShadow: "inset 0 0 0 2px #FAFAFA"}} onClick={handleRemoveFromFavorite}>
                    <StarFilledIcon height="19px" width="18px"/> Remove from favorites
                </Button>
                :
                <Button size="3" radius={"large"} variant="outline" style={{fontWeight: 600, color: "#FAFAFA", boxShadow: "inset 0 0 0 2px #FAFAFA"}} onClick={handleAddToFavorite}>
                    <StarFilledIcon height="19px" width="18px"/> Add to favorites
                </Button>
            }
        </>
    )
}
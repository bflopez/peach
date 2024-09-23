import {useMovieQuery} from "@/features/movie/api/get-movie.ts";
import {Box, Skeleton} from "@radix-ui/themes";

export const Favorite = ({favoriteImdbId}: {favoriteImdbId: string}) => {
    const { data: movie, isLoading } = useMovieQuery({movieIMDbId: favoriteImdbId});
    if (isLoading) return <Skeleton><Box height="248px"></Box></Skeleton>;
    if (!movie) return null;
    return (
        <Box>
            <img style={{height: "248px", objectFit: "cover", borderRadius: "8px"}}
                 src={movie.Poster} alt={`Poster for ${movie.Title}`}/>
        </Box>
    )

}
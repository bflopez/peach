import {useMovieQuery} from "@/features/movie-detail/api/get-movie.ts";

export const Favorite = ({favoriteImdbId}: {favoriteImdbId: string}) => {
    const { data: movie, isLoading } = useMovieQuery({movieIMDbId: favoriteImdbId});
    if (isLoading) return <>Loading...</>;
    if (!movie) return null;
    return (
        <>
            <img style={{height: "100%", objectFit: "cover", borderRadius: "8px"}}
                 src={movie.Poster} alt={`Poster for ${movie.Title}`}/>
        </>
    )

}
export type Movie = {
    Poster: string;
    Title: string;
    Type: string;
    Year: string;
    imdbID: string;
}

export type MovieSearchResults = {
    Response: string;
    Search: Movie[]
    totalResults: string
}
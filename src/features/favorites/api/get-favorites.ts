import {useLocalStorage} from "usehooks-ts";

export const useFavorites = () => {
    return useLocalStorage('peachflix-favorites', [] as string[]);
}
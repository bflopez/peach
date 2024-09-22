import Axios from "axios";

export const OMDbAPI = Axios.create({
    baseURL: "https://www.omdbapi.com",
    params: {'apiKey': `${import.meta.env.VITE_OMBD_API_KEY}`}
});
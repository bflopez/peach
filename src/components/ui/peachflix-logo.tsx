import peachflixLogo from "@/assets/peachflix-logo.svg";
import {Box} from "@radix-ui/themes";

export const PeachflixLogo = ()=>{
    return(
        <Box width="160px" height="40px">
            <img src={peachflixLogo} alt="Peachflix logo"/>
        </Box>
    )
}
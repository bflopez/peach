import {useSearchParams} from "react-router-dom";
import {Box, Flex, Link, TextField} from "@radix-ui/themes";
import peachflixLogo from "@/assets/peachflix-logo.svg";
import {MagnifyingGlassIcon} from "@radix-ui/react-icons";
import {useNavigate} from "react-router";
import {useState} from "react";

export const SearchResultsRoute = ()=>{
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchQuery, setSearchQuery] = useState(searchParams.get("q") ?? "")
    const handleSearch = (event: React.KeyboardEvent<HTMLInputElement>)=>{
        if(event.key === "Enter"){
            console.log(event.currentTarget.value)
            navigate(`/search-results?q=${searchQuery}`)
        }
    }
    const handleTyping = (event: React.ChangeEvent<HTMLInputElement>)=>{
        setSearchQuery(event.currentTarget.value)
    }
    return(
        <Box pt="32px" px="32px">
            <Flex justify="between">
                <Box width="160px" height="40px">
                    <img src={peachflixLogo} alt="Peachflix logo"/>
                </Box>
                <Box>
                    <Flex gap="7" align="center">
                        <Link style={{color: "white"}} href="#">Movies</Link>
                        <Link style={{color: "white"}} href="#">Favorites</Link>
                        <Box width="240px">
                            <TextField.Root type="text" variant="soft" placeholder="Search" size="3" value={searchQuery}
                                            radius="medium" style={{backgroundColor: "rgb(0 0 0 / 30%)"}} onKeyDown={handleSearch} onChange={handleTyping}>
                                <TextField.Slot>
                                    <MagnifyingGlassIcon height="18" width="18" />
                                </TextField.Slot>
                            </TextField.Root>
                        </Box>
                    </Flex>
                </Box>
            </Flex>
        </Box>
    )
}
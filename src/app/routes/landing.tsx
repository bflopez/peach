import {Box, Flex, TextField} from "@radix-ui/themes";
import {MagnifyingGlassIcon} from "@radix-ui/react-icons";
import peachflixLogo from "@/assets/peachflix-logo.svg"
import {useState} from "react";
import {useNavigate} from "react-router";

export const LandingRoute = () => {
    const navigate = useNavigate()
    const [searchQuery, setSearchQuery] = useState("")
    const handleSearch = (event: React.KeyboardEvent<HTMLInputElement>)=>{
        if(event.key === "Enter"){
            console.log(event.currentTarget.value)
            navigate(`/search-results?q=${searchQuery}`)
        }
    }
    const handleTyping = (event: React.ChangeEvent<HTMLInputElement>)=>{
        setSearchQuery(event.currentTarget.value)
    }
    return (
        <>
            <Box py="100px">
                <Flex direction="column" align="center" gap="5">
                    <Box width="160px">
                        <img src={peachflixLogo} alt="Peachflix logo"/>
                    </Box>
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
        </>
    )
}

import {Box, TextField} from "@radix-ui/themes";
import {MagnifyingGlassIcon} from "@radix-ui/react-icons";
import {useNavigate} from "react-router";
import {useState} from "react";

export const MovieSearchField = () => {
    const navigate = useNavigate()
    const [searchQuery, setSearchQuery] = useState("")
    const handleSearch = (event: React.KeyboardEvent<HTMLInputElement>)=>{
        if(event.key === "Enter"){
            navigate(`/search-results?q=${searchQuery}`)
        }
    }
    const handleTyping = (event: React.ChangeEvent<HTMLInputElement>)=>{
        setSearchQuery(event.currentTarget.value)
    }
    return(
        <Box width="240px">
            <TextField.Root type="text" variant="soft" placeholder="Search" size="3" value={searchQuery}
                            radius="medium" style={{backgroundColor: "rgb(0 0 0 / 30%)"}} onKeyDown={handleSearch} onChange={handleTyping}>
                <TextField.Slot>
                    <MagnifyingGlassIcon height="18" width="18" />
                </TextField.Slot>
            </TextField.Root>
        </Box>
    )
}
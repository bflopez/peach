import {Container, Theme} from '@radix-ui/themes';
import {ReactNode} from "react";
import '@radix-ui/themes/styles.css';
import '../index.css'

type AppProviderProps = {
    children: ReactNode;
};
export const AppProvider = ({children}: AppProviderProps) =>{
    return (
        <>
            <Theme appearance="dark">
                <Container size="1">
                    {children}
                </Container>
            </Theme>
        </>
    )
}